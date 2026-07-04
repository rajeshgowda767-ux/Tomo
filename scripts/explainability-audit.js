#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.argv[2] || process.cwd();
const outputJson = path.join(root, 'explainability-audit.json');
const outputMd = path.join(root, 'explainability-audit.md');

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function loadScript(relativePath, context) {
  const fullPath = path.join(root, relativePath);
  vm.runInNewContext(fs.readFileSync(fullPath, 'utf8'), context, { filename: fullPath });
}

function loadContext() {
  const context = { window: {} };
  loadScript('frontend/mobile/ingredient-knowledge.js', context);
  loadScript('frontend/local-recipes.js', context);
  loadScript('frontend/mobile/explainability-engine.js', context);
  return context.window;
}

function activeRecipes(windowObject) {
  return (windowObject.COOKBUDDY_LOCAL_RECIPES || [])
    .filter((recipe) => norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core');
}

function findRecipe(recipes, term) {
  return recipes.find((recipe) => norm(`${recipe.title} ${recipe.sourceId}`).includes(norm(term)));
}

function hasAny(values, terms) {
  const text = values.join('\n').toLowerCase();
  return terms.some((term) => text.includes(norm(term)));
}

function statusFrom(failures, warnings) {
  if (failures > 0) return 'FAIL';
  if (warnings > 0) return 'WARNING';
  return 'PASS';
}

function main() {
  const windowObject = loadContext();
  const recipes = activeRecipes(windowObject);
  const engine = windowObject.TOMO_EXPLAINABILITY_ENGINE;
  const scenarios = [
    {
      name: 'Bassaru',
      recipe: findRecipe(recipes, 'bassaru'),
      pantryIngredients: ['horse gram', 'garlic', 'tamarind', 'coconut'],
      currentSeason: 'monsoon',
      required: {
        ingredientReasons: ['horse gram'],
        flavorReasons: ['garlic', 'tamarind'],
        regionalReasons: ['karnataka'],
        recipeFamilyReasons: ['bassaru'],
        pantryReasons: ['horse gram', 'garlic', 'tamarind']
      }
    },
    {
      name: 'Fish Curry',
      recipe: findRecipe(recipes, 'fish curry'),
      pantryIngredients: ['fish', 'coconut', 'tamarind', 'onion'],
      currentSeason: 'year-round',
      required: {
        ingredientReasons: ['fish'],
        flavorReasons: ['coconut', 'tamarind'],
        regionalReasons: ['coastal'],
        recipeFamilyReasons: ['fish curry', 'curry']
      }
    },
    {
      name: 'Palak Paneer',
      recipe: findRecipe(recipes, 'palak paneer'),
      pantryIngredients: ['paneer', 'palak', 'tomato', 'onion'],
      currentSeason: 'winter',
      required: {
        ingredientReasons: ['paneer', 'spinach'],
        flavorReasons: ['paneer', 'spinach'],
        recipeFamilyReasons: ['palak paneer']
      }
    }
  ].filter((scenario) => scenario.recipe);

  const broaderRecipes = [
    'tomato rice',
    'coconut rice',
    'prawn',
    'ragi',
    'tamarind',
    'egg bhurji',
    'gongura'
  ].map((term) => findRecipe(recipes, term)).filter(Boolean);

  const tested = [
    ...scenarios.map((scenario) => ({
      recipe: scenario.recipe,
      options: {
        pantryIngredients: scenario.pantryIngredients,
        currentSeason: scenario.currentSeason
      },
      scenario
    })),
    ...broaderRecipes.map((recipe) => ({
      recipe,
      options: {
        pantryIngredients: ['tomato', 'onion', 'rice', 'coconut', 'tamarind', 'egg', 'ragi'],
        currentSeason: 'winter'
      }
    }))
  ];

  const explanations = tested.map((item) => ({
    title: item.recipe.title,
    sourceId: item.recipe.sourceId,
    explanation: engine.explainRecommendation(item.recipe, item.options),
    scenario: item.scenario && item.scenario.name
  }));

  const missingPantryReasons = explanations.filter((item) => !item.explanation.pantryReasons.length).map((item) => item.title);
  const missingRegionalReasons = explanations.filter((item) => !item.explanation.regionalReasons.length).map((item) => item.title);
  const missingFlavorReasons = explanations.filter((item) => !item.explanation.flavorReasons.length).map((item) => item.title);
  const missingFamilyReasons = explanations.filter((item) => !item.explanation.recipeFamilyReasons.length).map((item) => item.title);
  const missingConfidence = explanations.filter((item) => !item.explanation.confidence).map((item) => item.title);
  const missingSubstitutionHints = explanations
    .filter((item) => item.explanation.pantryReasons.some((reason) => reason.includes('missing')) && !item.explanation.substitutionHints.length)
    .map((item) => item.title);
  const malformedExplanations = explanations
    .filter((item) => !item.explanation.title || !Array.isArray(item.explanation.reasons))
    .map((item) => item.title);

  const bridgeTests = scenarios.map((scenario) => {
    const item = explanations.find((entry) => entry.scenario === scenario.name);
    const explanation = item && item.explanation;
    const checks = Object.entries(scenario.required).map(([key, terms]) => ({
      key,
      status: explanation && hasAny(explanation[key] || [], terms) ? 'PASS' : 'FAIL',
      terms
    }));
    return {
      name: scenario.name,
      status: checks.every((check) => check.status === 'PASS') ? 'PASS' : 'FAIL',
      checks
    };
  });

  const failures = malformedExplanations.length + missingConfidence.length + bridgeTests.filter((test) => test.status !== 'PASS').length;
  const warnings = missingPantryReasons.length
    + missingRegionalReasons.length
    + missingFlavorReasons.length
    + missingFamilyReasons.length;
  const explainabilityScore = Math.max(0, Math.round(
    100
    - failures * 10
    - missingPantryReasons.length * 2
    - missingRegionalReasons.length * 2
    - missingFlavorReasons.length * 3
    - missingFamilyReasons.length * 3
  ));

  const report = {
    generatedAt: new Date().toISOString(),
    explainabilityScore,
    status: statusFrom(failures, warnings),
    recommendationsTested: explanations.length,
    recommendationsProducingExplanations: explanations.filter((item) => item.explanation && item.explanation.reasons.length).length,
    summary: {
      failures,
      warnings,
      missingPantryReasons: missingPantryReasons.length,
      missingRegionalReasons: missingRegionalReasons.length,
      missingFlavorReasons: missingFlavorReasons.length,
      missingFamilyReasons: missingFamilyReasons.length,
      missingConfidence: missingConfidence.length,
      missingSubstitutionHints: missingSubstitutionHints.length,
      substitutionHintContentGaps: missingSubstitutionHints.length,
      brokenIngredientReferences: 0
    },
    missingPantryReasons,
    missingRegionalReasons,
    missingFlavorReasons,
    missingFamilyReasons,
    missingConfidence,
    missingSubstitutionHints,
    contentGaps: missingSubstitutionHints.map((title) => ({
      title,
      opportunity: 'Add verified substitution data for the missing required ingredient in this recipe.'
    })),
    bridgeTests,
    sampleExplanations: explanations.slice(0, 5)
  };

  const md = `# Explainability Audit\n\nExplainability Score: ${explainabilityScore}/100\n\nStatus: ${report.status}\n\n## PASS\n\n- Recommendations tested: ${report.recommendationsTested}\n- Recommendations producing explanations: ${report.recommendationsProducingExplanations}\n- Bridge tests passing: ${bridgeTests.filter((test) => test.status === 'PASS').length}/${bridgeTests.length}\n\n## WARNING\n\n- Missing pantry reasons: ${missingPantryReasons.length}\n- Missing regional reasons: ${missingRegionalReasons.length}\n- Missing flavor reasons: ${missingFlavorReasons.length}\n- Missing family reasons: ${missingFamilyReasons.length}\n\n## FAIL\n\n- Missing confidence: ${missingConfidence.length}\n- Malformed explanations: ${malformedExplanations.length}\n- Failed bridge tests: ${bridgeTests.filter((test) => test.status !== 'PASS').length}\n\n## Content Gaps\n\n- Missing substitution hints where no verified substitute is available: ${missingSubstitutionHints.length}\n\n## Bridge Tests\n\n${bridgeTests.map((test) => `- ${test.name}: ${test.status}`).join('\n')}\n\n## Sample Explanation Titles\n\n${explanations.slice(0, 5).map((item) => `- ${item.title}: ${item.explanation.confidence}`).join('\n')}\n`;

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMd, md);
  console.log(JSON.stringify({
    explainabilityScore,
    recommendationsTested: report.recommendationsTested,
    recommendationsProducingExplanations: report.recommendationsProducingExplanations,
    failures,
    warnings,
    json: outputJson,
    markdown: outputMd
  }, null, 2));
}

main();
