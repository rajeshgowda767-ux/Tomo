#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.argv[2] || path.resolve(__dirname, '..');
const outputJson = path.join(root, 'substitution-audit.json');
const outputMd = path.join(root, 'substitution-audit.md');

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function loadWindowFile(relativePath, property) {
  const fullPath = path.join(root, relativePath);
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(fullPath, 'utf8'), context, { filename: fullPath });
  return context.window[property] || [];
}

function list(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

function activeRecipes() {
  return loadWindowFile('frontend/local-recipes.js', 'COOKBUDDY_LOCAL_RECIPES')
    .filter((recipe) => norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core');
}

function recipeIngredientTerms(recipes) {
  const terms = new Set();
  for (const recipe of recipes) {
    [
      recipe.primaryIngredient1,
      recipe.primaryIngredient2,
      recipe.secondaryIngredient1,
      recipe.secondaryIngredient2,
      recipe.secondaryIngredient3,
      recipe.secondaryIngredient4,
      recipe.secondaryIngredient5,
      ...(recipe.ingredients || []).map((item) => item.name || item.ingredientName || ''),
    ].filter(Boolean).forEach((item) => {
      const value = norm(item);
      terms.add(value);
      value.split(/\bor\b|,/).map(norm).filter(Boolean).forEach((part) => terms.add(part));
    });
  }
  return terms;
}

function referenceExists(value, canonicalFor, recipeTerms) {
  const key = norm(value);
  if (!key) return false;
  if (canonicalFor.has(key) || recipeTerms.has(key)) return true;
  return [...recipeTerms].some((term) => term.includes(key) || key.includes(term));
}

function bridgeCheck(records, name, expected) {
  const record = records.find((item) => norm(item.canonicalName) === norm(name));
  const substitutions = list(record?.substitutions).map((item) => norm(item.ingredient));
  const missing = expected.filter((ingredient) => !substitutions.includes(norm(ingredient)));
  return {
    name,
    status: record && missing.length === 0 ? 'PASS' : 'FAIL',
    missing,
  };
}

function main() {
  const records = loadWindowFile('frontend/mobile/ingredient-knowledge.js', 'TOMO_INGREDIENT_KNOWLEDGE');
  const recipes = activeRecipes();
  const recipeTerms = recipeIngredientTerms(recipes);
  const canonicalFor = new Map();
  for (const record of records) {
    canonicalFor.set(norm(record.canonicalName), record.canonicalName);
    list(record.aliases).forEach((alias) => canonicalFor.set(norm(alias), record.canonicalName));
  }
  canonicalFor.set('shrimp', 'prawns');
  canonicalFor.set('black gram', 'black gram');
  canonicalFor.set('bajra', 'bajra');

  const allowedConfidence = new Set(['excellent', 'good', 'acceptable', 'emergency']);
  const ingredientsWithSubstitutions = records.filter((record) => list(record.substitutions).length > 0);
  const ingredientsMissingSubstitutions = records
    .filter((record) => !list(record.substitutions).length)
    .map((record) => record.canonicalName);

  const brokenReferences = [];
  const duplicateSubstitutions = [];
  const missingConfidence = [];
  const missingReason = [];
  const missingSuitableFor = [];
  const missingAvoidFor = [];

  for (const record of records) {
    const seen = new Set();
    for (const substitution of list(record.substitutions)) {
      const target = norm(substitution.ingredient);
      if (seen.has(target)) duplicateSubstitutions.push({ ingredient: record.canonicalName, substitution: substitution.ingredient });
      seen.add(target);
      if (!referenceExists(substitution.ingredient, canonicalFor, recipeTerms)) {
        brokenReferences.push({ ingredient: record.canonicalName, substitution: substitution.ingredient });
      }
      if (!allowedConfidence.has(norm(substitution.confidence))) missingConfidence.push({ ingredient: record.canonicalName, substitution: substitution.ingredient });
      if (!String(substitution.reason || '').trim()) missingReason.push({ ingredient: record.canonicalName, substitution: substitution.ingredient });
      if (!Array.isArray(substitution.suitableFor) || !substitution.suitableFor.length) missingSuitableFor.push({ ingredient: record.canonicalName, substitution: substitution.ingredient });
      if (!Array.isArray(substitution.avoidFor)) missingAvoidFor.push({ ingredient: record.canonicalName, substitution: substitution.ingredient });
    }
  }

  const bridgeChecks = [
    bridgeCheck(records, 'tamarind', ['raw mango', 'kokum', 'lemon']),
    bridgeCheck(records, 'coconut', ['cashew', 'peanut']),
    bridgeCheck(records, 'paneer', ['tofu']),
    bridgeCheck(records, 'ragi', ['jowar', 'bajra']),
    bridgeCheck(records, 'horse gram', ['green gram', 'black gram']),
  ];

  const failures = brokenReferences.length + duplicateSubstitutions.length + missingConfidence.length + missingReason.length + missingSuitableFor.length + missingAvoidFor.length + bridgeChecks.filter((check) => check.status === 'FAIL').length;
  const warnings = 0;
  const contentGaps = ingredientsMissingSubstitutions.length;
  const coverage = records.length ? Math.round((ingredientsWithSubstitutions.length / records.length) * 100) : 0;
  const substitutionScore = Math.max(0, Math.round(
    100
    - failures * 4
  ));
  const status = failures ? 'FAIL' : warnings ? 'WARNING' : 'PASS';

  const report = {
    generatedAt: new Date().toISOString(),
    substitutionScore,
    status,
    ingredientRecords: records.length,
    ingredientsWithSubstitutions: ingredientsWithSubstitutions.length,
    coverage,
    summary: {
      failures,
      warnings,
      contentGaps,
      brokenReferences: brokenReferences.length,
      duplicateSubstitutions: duplicateSubstitutions.length,
      missingConfidence: missingConfidence.length,
      missingReason: missingReason.length,
      missingSuitableFor: missingSuitableFor.length,
      missingAvoidFor: missingAvoidFor.length,
      missingSubstitutions: ingredientsMissingSubstitutions.length,
    },
    ingredientsMissingSubstitutions,
    contentGaps: ingredientsMissingSubstitutions.map((ingredient) => ({
      ingredient,
      opportunity: `Add verified substitutions for ${ingredient} when real cooking swaps are available.`
    })),
    brokenReferences,
    duplicateSubstitutions,
    missingConfidence,
    missingReason,
    missingSuitableFor,
    missingAvoidFor,
    bridgeChecks,
  };

  const md = `# Substitution Audit

Substitution Score: ${substitutionScore}/100

Status: ${status}

## PASS

- Ingredient records: ${records.length}
- Ingredients with substitutions: ${ingredientsWithSubstitutions.length}
- Coverage: ${coverage}%

## WARNING

- Schema/reference warnings: ${warnings}

## Content Gaps

- Ingredients missing substitutions: ${ingredientsMissingSubstitutions.length}

## FAIL

- Broken references: ${brokenReferences.length}
- Duplicate substitutions: ${duplicateSubstitutions.length}
- Missing confidence: ${missingConfidence.length}
- Missing reason: ${missingReason.length}
- Missing suitableFor: ${missingSuitableFor.length}
- Missing avoidFor: ${missingAvoidFor.length}

## Bridge Checks

${bridgeChecks.map((check) => `- ${check.name}: ${check.status}${check.missing.length ? ` (missing ${check.missing.join(', ')})` : ''}`).join('\n')}
`;

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMd, md);
  console.log(JSON.stringify({
    substitutionScore,
    ingredientRecords: records.length,
    coverage,
    failures,
    warnings,
    json: outputJson,
    markdown: outputMd,
  }, null, 2));
}

main();
