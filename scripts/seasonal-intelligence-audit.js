#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.argv[2] || process.cwd();
const outputJson = path.join(root, 'seasonal-intelligence-audit.json');
const outputMd = path.join(root, 'seasonal-intelligence-audit.md');

const allowedAvailability = new Set(['year-round', 'seasonal', 'mostly-year-round']);
const allowedSeasons = new Set(['summer', 'monsoon', 'winter', 'festival', 'year-round']);
const allowedWeather = new Set(['hot', 'rainy', 'cold', 'festive', 'everyday']);

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function valueKey(value) {
  return String(value || '').toLowerCase().trim();
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

function recipeHasStrongIngredient(recipe, term) {
  const key = norm(term);
  const titleText = norm(`${recipe.title} ${recipe.sourceId}`);
  if (titleText.includes(key)) return true;
  const primary = [
    recipe.primaryIngredient1,
    recipe.primaryIngredient2,
    ...(list(recipe.ingredients).filter((item) => item.isMain || norm(item.role) === 'required').map((item) => item.name))
  ].filter(Boolean).map(norm);
  return primary.some((item) => item.includes(key));
}

function recipeKeys(recipe) {
  return [recipe.title, recipe.sourceId, recipe.slug, recipe.id].filter(Boolean).map(norm);
}

function resolvesDish(dish, recipes) {
  const title = typeof dish === 'string' ? dish : dish.title;
  const slug = typeof dish === 'string' ? '' : dish.slug;
  return recipes.some((recipe) => {
    const keys = recipeKeys(recipe);
    return (slug && keys.includes(norm(slug))) || (title && keys.includes(norm(title)));
  });
}

function hasSeason(seasonality, season) {
  return [...list(seasonality.peakSeasons), ...list(seasonality.secondarySeasons)].some((item) => norm(item) === norm(season));
}

function hasWeather(seasonality, weather) {
  return list(seasonality.bestWeather).some((item) => norm(item) === norm(weather));
}

function statusFrom(failures, warnings) {
  if (failures > 0) return 'FAIL';
  if (warnings > 0) return 'WARNING';
  return 'PASS';
}

function main() {
  const records = loadWindowFile('frontend/mobile/ingredient-knowledge.js', 'TOMO_INGREDIENT_KNOWLEDGE');
  const recipes = activeRecipes();
  const byName = new Map(records.map((record) => [norm(record.canonicalName), record]));

  const missingSeasonality = [];
  const invalidAvailability = [];
  const invalidSeasonValues = [];
  const invalidWeatherValues = [];
  const missingReason = [];
  const brokenSignatureDishReferences = [];
  const contentGaps = [];
  const weakYearRoundOnly = [];
  const seasonalCoverage = new Map();

  for (const record of records) {
    const seasonality = record.seasonality;
    if (!seasonality) {
      missingSeasonality.push(record.canonicalName);
      continue;
    }
    if (!allowedAvailability.has(valueKey(seasonality.availability))) {
      invalidAvailability.push({ ingredient: record.canonicalName, availability: seasonality.availability });
    }
    const seasons = [...list(seasonality.peakSeasons), ...list(seasonality.secondarySeasons)];
    for (const season of seasons) {
      if (!allowedSeasons.has(valueKey(season))) invalidSeasonValues.push({ ingredient: record.canonicalName, season });
      if (!seasonalCoverage.has(season)) seasonalCoverage.set(season, new Set());
      seasonalCoverage.get(season).add(record.canonicalName);
    }
    for (const weather of list(seasonality.bestWeather)) {
      if (!allowedWeather.has(valueKey(weather))) invalidWeatherValues.push({ ingredient: record.canonicalName, weather });
    }
    if (!seasonality.reason) missingReason.push(record.canonicalName);
    for (const dish of list(seasonality.signatureDishes)) {
      if (!resolvesDish(dish, recipes)) brokenSignatureDishReferences.push({ ingredient: record.canonicalName, dish });
    }
    if (!list(seasonality.signatureDishes).length && valueKey(seasonality.availability) === 'seasonal') {
      contentGaps.push({
        ingredient: record.canonicalName,
        opportunity: `Add an active recipe that showcases ${record.canonicalName} in its ${list(seasonality.peakSeasons).join('/')} season.`
      });
    }
    if (valueKey(seasonality.availability) === 'year-round' && seasons.every((season) => valueKey(season) === 'year-round')) {
      const meaningful = ['rice', 'tomato', 'onion', 'egg'];
      if (!meaningful.includes(norm(record.canonicalName))) weakYearRoundOnly.push(record.canonicalName);
    }
  }

  const expectedSeasonalMissing = [
    { ingredient: 'jackfruit', recipeTerms: ['jackfruit'] },
    { ingredient: 'fresh turmeric', recipeTerms: ['fresh turmeric'] }
  ].filter((item) => !byName.has(norm(item.ingredient)) && item.recipeTerms.some((term) => recipes.some((recipe) => recipeHasStrongIngredient(recipe, term))))
    .map((item) => item.ingredient);

  const bridgeChecks = [
    {
      name: 'Raw Mango',
      ingredient: 'raw mango',
      check: (s) => hasSeason(s, 'summer') && hasWeather(s, 'hot')
    },
    {
      name: 'Kokum',
      ingredient: 'kokum',
      check: (s) => hasSeason(s, 'summer') && hasWeather(s, 'hot')
    },
    {
      name: 'Horse Gram',
      ingredient: 'horse gram',
      check: (s) => hasSeason(s, 'monsoon') && hasSeason(s, 'winter') && (hasWeather(s, 'rainy') || hasWeather(s, 'cold'))
    },
    {
      name: 'Ragi',
      ingredient: 'ragi',
      check: (s) => hasSeason(s, 'winter') && hasWeather(s, 'everyday')
    },
    {
      name: 'Bamboo Shoot',
      ingredient: 'bamboo shoot',
      check: (s) => hasSeason(s, 'monsoon') && hasWeather(s, 'rainy')
    },
    {
      name: 'Coconut',
      ingredient: 'coconut',
      check: (s) => valueKey(s.availability) === 'year-round' && hasSeason(s, 'year-round') && hasWeather(s, 'hot')
    },
    {
      name: 'Tamarind',
      ingredient: 'tamarind',
      check: (s) => valueKey(s.availability) === 'year-round' && /rasam|pulusu|sambar/i.test(s.reason)
    },
    {
      name: 'Sesame',
      ingredient: 'sesame',
      check: (s) => hasSeason(s, 'winter') && hasSeason(s, 'festival') && hasWeather(s, 'festive')
    },
    {
      name: 'Gongura',
      ingredient: 'gongura',
      check: (s, record) => hasSeason(s, 'monsoon') && /andhra|telangana|regional/i.test(`${s.reason} ${JSON.stringify(record.regionalStrength || [])}`)
    }
  ].map((item) => {
    const record = byName.get(norm(item.ingredient));
    const pass = record && record.seasonality && item.check(record.seasonality, record);
    return {
      name: item.name,
      status: pass ? 'PASS' : 'WARNING',
      missingRecord: !record
    };
  });

  const failures = missingSeasonality.length
    + invalidAvailability.length
    + invalidSeasonValues.length
    + invalidWeatherValues.length
    + missingReason.length
    + brokenSignatureDishReferences.length;
  const warnings = expectedSeasonalMissing.length + bridgeChecks.filter((check) => check.status !== 'PASS').length;
  const seasonalIntelligenceScore = failures || warnings ? Math.max(0, Math.round(
    100
    - missingSeasonality.length * 5
    - invalidAvailability.length * 5
    - invalidSeasonValues.length * 4
    - invalidWeatherValues.length * 4
    - missingReason.length * 3
    - brokenSignatureDishReferences.length * 6
    - expectedSeasonalMissing.length * 4
    - bridgeChecks.filter((check) => check.status !== 'PASS').length * 5
  )) : 100;

  const coverageBySeason = Object.fromEntries(
    [...seasonalCoverage.entries()].sort((a, b) => a[0].localeCompare(b[0]))
      .map(([season, ingredients]) => [season, [...ingredients].sort()])
  );

  const report = {
    generatedAt: new Date().toISOString(),
    seasonalIntelligenceScore,
    status: statusFrom(failures, warnings),
    ingredientRecords: records.length,
    recordsWithSeasonality: records.length - missingSeasonality.length,
    seasonsCovered: Object.keys(coverageBySeason),
    coverageBySeason,
    summary: {
      failures,
      warnings,
      contentGaps: contentGaps.length,
      missingSeasonality: missingSeasonality.length,
      invalidAvailability: invalidAvailability.length,
      invalidSeasonValues: invalidSeasonValues.length,
      invalidWeatherValues: invalidWeatherValues.length,
      brokenSignatureDishReferences: brokenSignatureDishReferences.length,
      expectedSeasonalMissing: expectedSeasonalMissing.length,
      bridgeWarnings: bridgeChecks.filter((check) => check.status !== 'PASS').length,
      weakYearRoundOnly: weakYearRoundOnly.length
    },
    missingSeasonality,
    invalidAvailability,
    invalidSeasonValues,
    invalidWeatherValues,
    missingReason,
    brokenSignatureDishReferences,
    weakYearRoundOnly,
    expectedSeasonalMissing,
    contentGaps,
    bridgeChecks
  };

  const md = `# Seasonal Intelligence Audit\n\nSeasonal Intelligence Score: ${seasonalIntelligenceScore}/100\n\nStatus: ${report.status}\n\n## PASS\n\n- Ingredient records: ${records.length}\n- Records with seasonality: ${report.recordsWithSeasonality}\n- Seasons covered: ${report.seasonsCovered.join(', ')}\n- Bridge checks passing: ${bridgeChecks.filter((check) => check.status === 'PASS').length}/${bridgeChecks.length}\n\n## WARNING\n\n- Knowledge warnings: ${warnings}\n- Expected seasonal ingredients missing from knowledge: ${expectedSeasonalMissing.length}${expectedSeasonalMissing.length ? ` (${expectedSeasonalMissing.join(', ')})` : ''}\n- Bridge warnings: ${bridgeChecks.filter((check) => check.status !== 'PASS').length}\n\n## FAIL\n\n- Missing seasonality: ${missingSeasonality.length}\n- Invalid availability values: ${invalidAvailability.length}\n- Invalid season values: ${invalidSeasonValues.length}\n- Invalid weather values: ${invalidWeatherValues.length}\n- Broken signature dish references: ${brokenSignatureDishReferences.length}\n\n## Content Gaps\n\nThese do not reduce the knowledge score.\n\n${contentGaps.length ? contentGaps.map((gap) => `- ${gap.ingredient}: ${gap.opportunity}`).join('\n') : '- None'}\n\n## Bridge Checks\n\n${bridgeChecks.map((check) => `- ${check.name}: ${check.status}${check.missingRecord ? ' (missing record)' : ''}`).join('\n')}\n\n## Seasonal Coverage\n\n${Object.entries(coverageBySeason).map(([season, ingredients]) => `- ${season}: ${ingredients.length} ingredients`).join('\n')}\n`;

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMd, md);
  console.log(JSON.stringify({
    seasonalIntelligenceScore,
    ingredientRecords: records.length,
    recordsWithSeasonality: report.recordsWithSeasonality,
    seasonsCovered: report.seasonsCovered.length,
    failures,
    warnings,
    contentGaps: contentGaps.length,
    json: outputJson,
    markdown: outputMd
  }, null, 2));
}

main();
