#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.argv[2] || process.cwd();
const outputJson = path.join(root, 'regional-ingredient-audit.json');
const outputMd = path.join(root, 'regional-ingredient-audit.md');

function norm(value) {
  return String(value || '').toLowerCase().replace(/&/g, 'and').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
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

function loadRecipes() {
  return loadWindowFile('frontend/local-recipes.js', 'COOKBUDDY_LOCAL_RECIPES')
    .filter((recipe) => norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core');
}

function recipeKeys(recipe) {
  return [recipe.title, recipe.sourceId, recipe.slug, recipe.id].filter(Boolean).map(norm);
}

function resolveSignatureDish(dish, recipes) {
  const title = typeof dish === 'string' ? dish : dish.title;
  const slug = typeof dish === 'string' ? '' : dish.slug;
  return recipes.some((recipe) => {
    const keys = recipeKeys(recipe);
    return (slug && keys.includes(norm(slug))) || (title && keys.includes(norm(title)));
  });
}

function statusFrom(failures, warnings) {
  if (failures > 0) return 'FAIL';
  if (warnings > 0) return 'WARNING';
  return 'PASS';
}

function regionMatches(actual, expected) {
  const actualKey = norm(actual);
  const expectedKey = norm(expected);
  if (actualKey === expectedKey) return true;
  if (actualKey.includes(expectedKey) || expectedKey.includes(actualKey)) return true;
  if (expectedKey === 'andhra' && actualKey.includes('andhra')) return true;
  if (expectedKey === 'bengal' && actualKey.includes('bengal')) return true;
  if (expectedKey === 'coastal karnataka' && (actualKey.includes('coastal karnataka') || actualKey.includes('karnataka coast'))) return true;
  return false;
}

function strengthValue(strength) {
  return { primary: 4, strong: 3, moderate: 2, light: 1 }[norm(strength)] || 0;
}

function strongestEntry(record, expectedRegion) {
  return list(record && record.regionalStrength).find((entry) => regionMatches(entry.region, expectedRegion));
}

function hasUsefulRecipe(record, recipes) {
  return list(record.linkedRecipeTitles).some((title, index) => resolveSignatureDish({ title, slug: list(record.linkedRecipeSlugs)[index] }, recipes));
}

function main() {
  const records = loadWindowFile('frontend/mobile/ingredient-knowledge.js', 'TOMO_INGREDIENT_KNOWLEDGE');
  const recipes = loadRecipes();
  const recipeText = recipes.map((recipe) => `${recipe.title} ${recipe.sourceId} ${JSON.stringify(recipe.ingredients || [])}`.toLowerCase()).join('\n');

  const validStrengths = new Set(['primary', 'strong', 'moderate', 'light']);
  const missingRegionalStrength = records
    .filter((record) => !list(record.regionalStrength).length)
    .map((record) => record.canonicalName);
  const invalidRegionalStrength = [];
  const brokenSignatureDishReferences = [];
  const contentGaps = [];

  const regions = new Map();
  const broadOnlyMappings = [];
  for (const record of records) {
    const entries = list(record.regionalStrength);
    if (entries.length && entries.every((entry) => ['all india', 'pan indian'].includes(norm(entry.region)))) {
      broadOnlyMappings.push({
        ingredient: record.canonicalName,
        reason: 'Broad mapping is acceptable only when the ingredient is universal or mainly a substitute in the current catalog.'
      });
    }
    for (const entry of entries) {
      if (!entry.region || !validStrengths.has(norm(entry.strength)) || !entry.reason) {
        invalidRegionalStrength.push({ ingredient: record.canonicalName, entry });
      }
      const key = entry.region || 'Unknown';
      if (!regions.has(key)) regions.set(key, new Set());
      regions.get(key).add(record.canonicalName);
      const dishes = list(entry.signatureDishes);
      for (const dish of dishes) {
        if (!resolveSignatureDish(dish, recipes)) {
          brokenSignatureDishReferences.push({ ingredient: record.canonicalName, region: entry.region, dish });
        }
      }
      if (!dishes.length && strengthValue(entry.strength) >= 3) {
        contentGaps.push({
          ingredient: record.canonicalName,
          region: entry.region,
          strength: entry.strength,
          opportunity: `Add an active ${entry.region} recipe that showcases ${record.canonicalName}.`
        });
      }
    }
  }

  const ingredientsPerRegion = Object.fromEntries(
    [...regions.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([region, ingredients]) => [region, [...ingredients].sort()])
  );

  const expectedHighValue = [
    { ingredient: 'kokum', recipeTerms: ['kokum', 'sol kadhi', 'goan fish curry'] },
    { ingredient: 'mustard oil', recipeTerms: ['mustard oil', 'macher jhol', 'shorshe ilish'] },
    { ingredient: 'horse gram', recipeTerms: ['bassaru', 'kollu rasam', 'ulavacharu'] },
    { ingredient: 'coconut', recipeTerms: ['avial', 'thoran', 'fish curry', 'chutney'] },
    { ingredient: 'tamarind', recipeTerms: ['rasam', 'sambar', 'pulusu', 'puliyogare'] },
    { ingredient: 'ragi', recipeTerms: ['ragi mudde', 'ragi rotti', 'ragi dosa'] },
    { ingredient: 'gongura', recipeTerms: ['gongura pappu', 'gongura mutton'] },
    { ingredient: 'bamboo shoot', recipeTerms: ['bamboo shoot'] }
  ];
  const knownNames = new Set(records.flatMap((record) => [record.canonicalName, ...list(record.aliases)]).map(norm));
  const highValueMissing = expectedHighValue
    .filter((item) => !knownNames.has(norm(item.ingredient)) && item.recipeTerms.some((term) => recipeText.includes(norm(term))))
    .map((item) => item.ingredient);

  const recordsWithoutRecipePath = records
    .filter((record) => !hasUsefulRecipe(record, recipes))
    .map((record) => record.canonicalName);

  const bridgeChecks = [
    { name: 'Horse Gram', ingredient: 'horse gram', required: [{ region: 'Karnataka', min: 'primary' }, { region: 'Andhra', min: 'strong' }, { region: 'Tamil Nadu', min: 'strong' }] },
    { name: 'Coconut', ingredient: 'coconut', required: [{ region: 'Kerala', min: 'primary' }, { region: 'Coastal Karnataka', min: 'strong' }, { region: 'Goa', min: 'strong' }] },
    { name: 'Tamarind', ingredient: 'tamarind', required: [{ region: 'Tamil Nadu', min: 'primary' }, { region: 'Andhra', min: 'primary' }, { region: 'Karnataka', min: 'strong' }] },
    { name: 'Ragi', ingredient: 'ragi', required: [{ region: 'Karnataka', min: 'primary' }] },
    { name: 'Fish', ingredient: 'fish', required: [{ region: 'Kerala', min: 'primary' }, { region: 'Goa', min: 'primary' }, { region: 'Coastal Karnataka', min: 'primary' }, { region: 'Bengal', min: 'primary' }] },
    { name: 'Prawns', ingredient: 'prawns', required: [{ region: 'Goa', min: 'primary' }, { region: 'Kerala', min: 'primary' }, { region: 'Bengal', min: 'primary' }, { region: 'Andhra', min: 'strong' }] },
    { name: 'Bamboo Shoot', ingredient: 'bamboo shoot', required: [{ region: 'Northeast', min: 'primary' }] },
    { name: 'Kokum', ingredient: 'kokum', required: [{ region: 'Goa', min: 'primary' }, { region: 'Maharashtra coast', min: 'primary' }] },
    { name: 'Mustard Oil', ingredient: 'mustard oil', required: [{ region: 'Bengal', min: 'primary' }, { region: 'Assam', min: 'primary' }] }
  ].map((check) => {
    const record = records.find((item) => norm(item.canonicalName) === norm(check.ingredient));
    const missing = [];
    const weak = [];
    for (const requirement of check.required) {
      const entry = strongestEntry(record, requirement.region);
      if (!entry) {
        missing.push(requirement.region);
      } else if (strengthValue(entry.strength) < strengthValue(requirement.min)) {
        weak.push({ region: requirement.region, expected: requirement.min, actual: entry.strength });
      }
    }
    return {
      name: check.name,
      status: !record || missing.length || weak.length ? 'WARNING' : 'PASS',
      missing,
      weak
    };
  });

  const knowledgeWarnings = highValueMissing.length + bridgeChecks.filter((check) => check.status !== 'PASS').length;
  const failures = missingRegionalStrength.length + invalidRegionalStrength.length + brokenSignatureDishReferences.length;
  const warnings = knowledgeWarnings;
  const regionalIngredientScore = failures || warnings ? Math.max(0, Math.round(
    100
    - missingRegionalStrength.length * 8
    - invalidRegionalStrength.length * 8
    - brokenSignatureDishReferences.length * 10
    - highValueMissing.length * 5
    - bridgeChecks.filter((check) => check.status !== 'PASS').length * 5
  )) : 100;

  const report = {
    generatedAt: new Date().toISOString(),
    regionalIngredientScore,
    status: statusFrom(failures, warnings),
    ingredientRecords: records.length,
    recordsWithRegionalStrength: records.length - missingRegionalStrength.length,
    regionsCovered: [...regions.keys()].sort(),
    ingredientsPerRegion,
    summary: {
      failures,
      warnings,
      contentGaps: contentGaps.length,
      missingRegionalStrength: missingRegionalStrength.length,
      invalidRegionalStrength: invalidRegionalStrength.length,
      brokenSignatureDishReferences: brokenSignatureDishReferences.length,
      highValueRegionalIngredientsMissing: highValueMissing.length,
      bridgeWarnings: bridgeChecks.filter((check) => check.status !== 'PASS').length,
      broadOnlyMappings: broadOnlyMappings.length,
      recordsWithoutRecipePath: recordsWithoutRecipePath.length
    },
    missingRegionalStrength,
    invalidRegionalStrength,
    brokenSignatureDishReferences,
    highValueRegionalIngredientsMissing: highValueMissing,
    bridgeChecks,
    contentGaps,
    broadOnlyMappings,
    recordsWithoutRecipePath
  };

  const md = `# Regional Ingredient Audit\n\nRegional Ingredient Score: ${regionalIngredientScore}/100\n\nStatus: ${report.status}\n\n## PASS\n\n- Ingredient records: ${records.length}\n- Records with regionalStrength: ${report.recordsWithRegionalStrength}\n- Regions covered: ${report.regionsCovered.length}\n- Bridge checks passing: ${bridgeChecks.filter((check) => check.status === 'PASS').length}/${bridgeChecks.length}\n\n## WARNING\n\n- Knowledge warnings: ${warnings}\n- High-value regional ingredients missing: ${highValueMissing.length}${highValueMissing.length ? ` (${highValueMissing.join(', ')})` : ''}\n- Bridge warnings: ${bridgeChecks.filter((check) => check.status !== 'PASS').length}\n\n## FAIL\n\n- Missing regionalStrength: ${missingRegionalStrength.length}\n- Invalid regionalStrength entries: ${invalidRegionalStrength.length}\n- Broken signature dish references: ${brokenSignatureDishReferences.length}\n\n## Content Gaps\n\nThese are valid knowledge mappings where the active catalog does not yet contain a signature recipe. They do not reduce the knowledge score.\n\n${contentGaps.length ? contentGaps.map((gap) => `- ${gap.ingredient} / ${gap.region} (${gap.strength}): ${gap.opportunity}`).join('\n') : '- None'}\n\n## Bridge Checks\n\n${bridgeChecks.map((check) => `- ${check.name}: ${check.status}${check.missing.length ? ` (missing ${check.missing.join(', ')})` : ''}${check.weak.length ? ` (weak ${check.weak.map((item) => `${item.region}: ${item.actual}`).join(', ')})` : ''}`).join('\n')}\n\n## Regions Covered\n\n${report.regionsCovered.map((region) => `- ${region}: ${(ingredientsPerRegion[region] || []).length} ingredients`).join('\n')}\n`;

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMd, md);
  console.log(JSON.stringify({
    regionalIngredientScore,
    ingredientRecords: records.length,
    recordsWithRegionalStrength: report.recordsWithRegionalStrength,
    regionsCovered: report.regionsCovered.length,
    failures,
    warnings,
    contentGaps: contentGaps.length,
    json: outputJson,
    markdown: outputMd
  }, null, 2));
}

main();
