#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.argv[2] || process.cwd();
const outputJson = path.join(root, 'ingredient-relationship-audit.json');
const outputMd = path.join(root, 'ingredient-relationship-audit.md');

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}
function slug(value) {
  return norm(value).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function list(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}
function loadWindowFile(relativePath, property) {
  const fullPath = path.join(root, relativePath);
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(fullPath, 'utf8'), context, { filename: fullPath });
  return context.window[property] || [];
}
function activeRecipes() {
  return loadWindowFile('frontend/local-recipes.js', 'COOKBUDDY_LOCAL_RECIPES')
    .filter((recipe) => norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core');
}
function ingredientTermsFromRecipes(recipes) {
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
    ].filter(Boolean).forEach((item) => terms.add(norm(item)));
  }
  return terms;
}
function titleMatches(recipes, terms) {
  return terms.some((term) => recipes.some((recipe) => norm(recipe.title).includes(norm(term)) || norm(recipe.sourceId).includes(norm(term))));
}
function relationshipValues(record) {
  return [...list(record.relatedIngredients), ...list(record.complements), ...list(record.avoids)];
}
function hasRelationship(record) {
  return list(record.relatedIngredients).length > 0 || list(record.complements).length > 0;
}
function connectedComponents(records, canonicalFor) {
  const adjacency = new Map(records.map((record) => [record.canonicalName, new Set()]));
  for (const record of records) {
    for (const value of list(record.relatedIngredients)) {
      const target = canonicalFor.get(norm(value));
      if (!target || !adjacency.has(target)) continue;
      adjacency.get(record.canonicalName).add(target);
      adjacency.get(target).add(record.canonicalName);
    }
  }
  const seen = new Set();
  const clusters = [];
  for (const name of adjacency.keys()) {
    if (seen.has(name)) continue;
    const stack = [name];
    const cluster = [];
    seen.add(name);
    while (stack.length) {
      const current = stack.pop();
      cluster.push(current);
      for (const next of adjacency.get(current) || []) {
        if (seen.has(next)) continue;
        seen.add(next);
        stack.push(next);
      }
    }
    clusters.push(cluster.sort());
  }
  return clusters.sort((a, b) => b.length - a.length);
}
function statusFrom(failures, warnings) {
  if (failures > 0) return 'FAIL';
  if (warnings > 0) return 'WARNING';
  return 'PASS';
}

function main() {
  const records = loadWindowFile('frontend/mobile/ingredient-knowledge.js', 'TOMO_INGREDIENT_KNOWLEDGE');
  const recipes = activeRecipes();
  const recipeIngredientTerms = ingredientTermsFromRecipes(recipes);
  const canonicalFor = new Map();
  for (const record of records) {
    canonicalFor.set(norm(record.canonicalName), record.canonicalName);
    for (const alias of list(record.aliases)) canonicalFor.set(norm(alias), record.canonicalName);
  }

  const withRelationships = records.filter(hasRelationship);
  const missingRelationships = records.filter((record) => !hasRelationship(record)).map((record) => record.canonicalName);
  const missingSeason = records.filter((record) => !record.season || !record.seasonStrength).map((record) => record.canonicalName);
  const missingFlavorProfile = records.filter((record) => !list(record.flavorProfile).length).map((record) => record.canonicalName);
  const missingTechniques = records.filter((record) => !list(record.commonTechniques).length).map((record) => record.canonicalName);
  const missingNutrition = records.filter((record) => !list(record.nutritionHighlights).length).map((record) => record.canonicalName);
  const missingFamilies = records.filter((record) => !list(record.ingredientFamilies).length).map((record) => record.canonicalName);

  const brokenIngredientReferences = [];
  const unusedIngredientReferences = [];
  for (const record of records) {
    for (const value of relationshipValues(record)) {
      const key = norm(value);
      if (canonicalFor.has(key)) continue;
      if (recipeIngredientTerms.has(key)) continue;
      if ([...recipeIngredientTerms].some((term) => term.includes(key) || key.includes(term))) continue;
      brokenIngredientReferences.push({ ingredient: record.canonicalName, reference: value });
    }
  }
  for (const record of records) {
    const referenced = records.some((other) => other !== record && relationshipValues(other).some((value) => canonicalFor.get(norm(value)) === record.canonicalName));
    if (!referenced && hasRelationship(record)) unusedIngredientReferences.push(record.canonicalName);
  }

  const oneWayRelationships = [];
  for (const record of records) {
    for (const value of list(record.relatedIngredients)) {
      const targetName = canonicalFor.get(norm(value));
      if (!targetName || targetName === record.canonicalName) continue;
      const target = records.find((item) => item.canonicalName === targetName);
      if (!target) continue;
      const reciprocal = list(target.relatedIngredients).some((item) => canonicalFor.get(norm(item)) === record.canonicalName);
      if (!reciprocal) oneWayRelationships.push({ from: record.canonicalName, to: targetName });
    }
  }

  const clusters = connectedComponents(records, canonicalFor);
  const clusterChecks = [
    { name: 'Horse Gram', ingredient: 'horse gram', requiredIngredients: ['garlic', 'coconut', 'tamarind'], recipeTerms: ['bassaru', 'kollu rasam', 'huruli'] },
    { name: 'Coconut', ingredient: 'coconut', requiredIngredients: ['fish', 'prawns'], recipeTerms: ['avial', 'thoran', 'fish curry', 'chutney'] },
    { name: 'Tamarind', ingredient: 'tamarind', requiredIngredients: ['fish', 'toor dal', 'tomato'], recipeTerms: ['rasam', 'sambar', 'pulusu', 'fish curry'] },
    { name: 'Fish', ingredient: 'fish', requiredIngredients: ['tamarind', 'coconut', 'garlic', 'curry leaves'], recipeTerms: ['fish curry', 'fish fry'] },
    { name: 'Paneer', ingredient: 'paneer', requiredIngredients: ['tomato', 'capsicum', 'palak'], recipeTerms: ['palak paneer', 'kadai paneer', 'matar paneer'] },
    { name: 'Egg', ingredient: 'egg', requiredIngredients: ['tomato', 'onion', 'pepper', 'rice'], recipeTerms: ['egg bhurji', 'egg fried rice', 'egg curry'] },
  ].map((check) => {
    const record = records.find((item) => norm(item.canonicalName) === norm(check.ingredient));
    const relationshipText = norm(relationshipValues(record || {}).join(' '));
    const missingIngredients = check.requiredIngredients.filter((item) => !relationshipText.includes(norm(item)));
    const recipePass = titleMatches(recipes, check.recipeTerms);
    return {
      name: check.name,
      status: !record || missingIngredients.length || !recipePass ? 'WARNING' : 'PASS',
      missingIngredients,
      recipePass,
    };
  });

  const warnings = missingRelationships.length + missingSeason.length + missingFlavorProfile.length + missingTechniques.length + missingNutrition.length + missingFamilies.length + oneWayRelationships.length + unusedIngredientReferences.length + clusterChecks.filter((check) => check.status !== 'PASS').length;
  const failures = brokenIngredientReferences.length;
  const relationshipScore = Math.max(0, Math.round(
    100
    - missingRelationships.length * 2
    - missingSeason.length * 1
    - missingFlavorProfile.length * 1
    - missingTechniques.length * 1
    - missingNutrition.length * 1
    - missingFamilies.length * 1
    - oneWayRelationships.length * 0.7
    - brokenIngredientReferences.length * 4
    - clusterChecks.filter((check) => check.status !== 'PASS').length * 2
  ));
  const report = {
    generatedAt: new Date().toISOString(),
    relationshipScore,
    status: statusFrom(failures, warnings),
    ingredientRecords: records.length,
    ingredientsWithRelationships: withRelationships.length,
    relationshipCoverage: records.length ? Math.round((withRelationships.length / records.length) * 100) : 0,
    summary: {
      failures,
      warnings,
      missingRelationships: missingRelationships.length,
      asymmetricRelationships: oneWayRelationships.length,
      brokenIngredientReferences: brokenIngredientReferences.length,
      unusedIngredientReferences: unusedIngredientReferences.length,
      missingSeasonalData: missingSeason.length,
      missingFlavorProfile: missingFlavorProfile.length,
      missingTechniques: missingTechniques.length,
      missingNutritionHighlights: missingNutrition.length,
      missingIngredientFamilies: missingFamilies.length,
    },
    missingRelationships,
    oneWayRelationships,
    relationshipClusters: clusters,
    missingSeasonalData: missingSeason,
    missingFlavorProfile,
    missingTechniques,
    missingNutritionHighlights: missingNutrition,
    missingIngredientFamilies: missingFamilies,
    brokenIngredientReferences,
    unusedIngredientReferences,
    bridgeChecks: clusterChecks,
  };
  const md = `# Ingredient Relationship Audit\n\nRelationship Score: ${relationshipScore}/100\n\nStatus: ${report.status}\n\n## PASS\n\n- Ingredient records: ${records.length}\n- Ingredients with relationships: ${withRelationships.length}\n- Relationship coverage: ${report.relationshipCoverage}%\n\n## WARNING\n\n- Asymmetric relationships: ${oneWayRelationships.length}\n- Missing relationships: ${missingRelationships.length}\n- Missing seasonal data: ${missingSeason.length}\n- Missing nutrition highlights: ${missingNutrition.length}\n- Missing techniques: ${missingTechniques.length}\n- Missing flavour profiles: ${missingFlavorProfile.length}\n- Missing ingredient families: ${missingFamilies.length}\n- Unused ingredient references: ${unusedIngredientReferences.length}\n\n## FAIL\n\n- Broken ingredient references: ${brokenIngredientReferences.length}\n\n## Bridge Checks\n\n${clusterChecks.map((check) => `- ${check.name}: ${check.status}${check.missingIngredients.length ? ` (missing ${check.missingIngredients.join(', ')})` : ''}${check.recipePass ? '' : ' (recipe bridge missing)'}`).join('\n')}\n\n## Relationship Clusters\n\n${clusters.slice(0, 8).map((cluster) => `- ${cluster.join(' ↔ ')}`).join('\n')}\n`;
  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMd, md);
  console.log(JSON.stringify({ relationshipScore, ingredientRecords: records.length, relationshipCoverage: report.relationshipCoverage, failures, warnings, json: outputJson, markdown: outputMd }, null, 2));
}

main();
