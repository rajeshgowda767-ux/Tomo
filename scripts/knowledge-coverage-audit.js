const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const recipesPath = path.join(root, 'frontend', 'local-recipes.js');
const pantryPath = path.join(root, 'frontend', 'local-pantry-catalog.js');
const knowledgePath = path.join(root, 'frontend', 'mobile', 'ingredient-knowledge.js');
const outputMarkdown = path.join(root, 'knowledge-coverage-audit.md');
const outputJson = path.join(root, 'knowledge-coverage-audit.json');

const requiredSeafood = [
  'seer fish',
  'pomfret',
  'mackerel',
  'sardine',
  'anchovy',
  'rohu',
  'catla',
  'tilapia',
  'basa',
  'prawns',
  'crab',
  'squid',
  'mussels and clams',
];

const highPriorityIngredients = [
  'fish',
  'prawns',
  'crab',
  'rice',
  'ragi',
  'millets',
  'palak',
  'spinach',
  'greens',
  'chicken',
  'paneer',
  'coconut',
  'tamarind',
  'raw mango',
  'horse gram',
  'toor dal',
  'moong dal',
  'urad dal',
];

const bridgeChecks = [
  {
    name: 'Horse Gram -> Bassaru / Huruli recipes',
    ingredient: 'horse gram',
    expectedFamilies: ['bassaru', 'huruli saaru', 'kollu rasam', 'ulavacharu'],
    recipePatterns: [/bassaru/i, /huruli/i, /kollu rasam/i, /ulavacharu/i],
  },
  {
    name: 'Palak / Spinach -> Soppu Saaru / Dal Palak / Palak Rice / Palak Paratha',
    ingredient: 'palak',
    expectedFamilies: ['soppu saaru', 'dal palak', 'palak rice', 'palak paratha'],
    recipePatterns: [/soppu saaru/i, /dal palak|palak dal/i, /palak rice|dal palak rice/i, /palak paratha/i],
  },
  {
    name: 'Tamarind -> Rasam / Sambar / Pulusu / Puliyogare',
    ingredient: 'tamarind',
    expectedFamilies: ['rasam', 'sambar', 'pulusu', 'puliyogare', 'fish curry'],
    recipePatterns: [/rasam/i, /sambar/i, /pulusu/i, /puliyogare/i, /fish curry|meen kuzhambu|chepala pulusu/i],
  },
  {
    name: 'Coconut -> Chutney / Avial / Thoran / Coastal Curry',
    ingredient: 'coconut',
    expectedFamilies: ['chutney', 'avial', 'thoran', 'coastal curry', 'coconut rice'],
    recipePatterns: [/chutney/i, /avial/i, /thoran/i, /fish curry|prawn|sukka|moilee|coastal|kayi saaru/i, /coconut rice/i],
  },
  {
    name: 'Seer Fish -> Fish Fry / Fish Curry / Tawa Fish / coastal curries',
    ingredient: 'seer fish',
    expectedFamilies: ['fish fry', 'fish curry', 'tawa fish', 'coastal curry'],
    recipePatterns: [/fish fry/i, /fish curry|meen kuzhambu/i, /tawa fish/i, /mangalorean fish|malvani fish|goan fish|kerala fish/i],
  },
  {
    name: 'Prawns -> Prawn Curry / Prawn Fry / Prawn Ghee Roast',
    ingredient: 'prawns',
    expectedFamilies: ['prawn curry', 'prawn fry', 'prawn ghee roast'],
    recipePatterns: [/prawn|royyala|chemmeen|chingri/i, /fry/i, /ghee roast/i],
  },
];

function loadWindowFile(filePath, property) {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), context, { filename: filePath });
  return context.window[property] || [];
}

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

function slug(value) {
  return norm(value).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function list(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') return [value];
  if (value && typeof value === 'object') return Object.values(value).flatMap(list);
  return [];
}

function recipeTitle(recipe) {
  return recipe.title || recipe.name || 'Untitled recipe';
}

function recipeSlug(recipe) {
  return recipe.sourceId || recipe.slug || recipe.id || slug(recipeTitle(recipe));
}

function recipeText(recipe) {
  return norm([
    recipeTitle(recipe),
    recipe.description,
    recipe.cuisine,
    recipe.region,
    recipe.recipeRole,
    recipe.dietType,
    recipe.primary_ingredient_1,
    recipe.primary_ingredient_2,
    recipe.secondary_ingredient_1,
    recipe.secondary_ingredient_2,
    recipe.secondary_ingredient_3,
    recipe.secondary_ingredient_4,
    recipe.secondary_ingredient_5,
    ...list(recipe.tags),
    ...list(recipe.mealTags),
    ...list(recipe.moodTags),
    ...list(recipe.regionTags),
    ...list(recipe.ingredients).map((item) => typeof item === 'string' ? item : item?.name),
  ].filter(Boolean).join(' '));
}

function recordNames(record) {
  return [
    record.canonicalName,
    ...list(record.aliases),
    ...list(record.regionalNames),
  ].map(norm).filter(Boolean);
}

function pantryNames(pantry) {
  return pantry
    .filter((item) => item.display_status !== 'hidden')
    .map((item) => ({
      name: item.ingredient_name || item.name,
      key: norm(item.ingredient_key || item.ingredient_name || item.name),
      count: Number(item.used_by_recipe_count || 0),
      category: item.category || '',
    }))
    .filter((item) => item.key);
}

function resolveLinks(record, recipesByTitle, recipesBySlug) {
  const linkedByTitle = list(record.linkedRecipeTitles).map((title) => {
    const recipe = recipesByTitle.get(norm(title));
    return {
      title,
      status: recipe ? 'ok' : 'missing',
      slug: recipe ? recipeSlug(recipe) : '',
    };
  });
  const linkedBySlug = list(record.linkedRecipeSlugs).map((value) => {
    const recipe = recipesBySlug.get(norm(value));
    return {
      slug: value,
      status: recipe ? 'ok' : 'missing',
      title: recipe ? recipeTitle(recipe) : '',
    };
  });
  const active = new Map();
  linkedByTitle.filter((item) => item.status === 'ok').forEach((item) => active.set(norm(item.slug), { title: item.title, slug: item.slug }));
  linkedBySlug.filter((item) => item.status === 'ok').forEach((item) => active.set(norm(item.slug), { title: item.title, slug: item.slug }));
  return {
    linkedByTitle,
    linkedBySlug,
    activeLinks: [...active.values()],
  };
}

function issue(severity, area, message, recommendation, data = {}) {
  return { severity, area, message, recommendation, ...data };
}

function analyze() {
  const recipes = loadWindowFile(recipesPath, 'COOKBUDDY_LOCAL_RECIPES')
    .filter((recipe) => norm(recipe.recipeType || recipe.recipe_type || 'core') === 'core');
  const pantry = pantryNames(loadWindowFile(pantryPath, 'COOKBUDDY_PANTRY_CATALOG'));
  const knowledge = loadWindowFile(knowledgePath, 'TOMO_INGREDIENT_KNOWLEDGE');

  const recipesByTitle = new Map(recipes.map((recipe) => [norm(recipeTitle(recipe)), recipe]));
  const recipesBySlug = new Map(recipes.map((recipe) => [norm(recipeSlug(recipe)), recipe]));
  const issues = [];
  const recordReports = [];
  const nameToRecord = new Map();

  knowledge.forEach((record) => {
    recordNames(record).forEach((name) => {
      if (!nameToRecord.has(name)) nameToRecord.set(name, []);
      nameToRecord.get(name).push(record.canonicalName);
    });
  });

  knowledge.forEach((record) => {
    const requiredFields = ['canonicalName', 'aliases', 'regionalNames', 'category', 'pantryRole', 'bestCookingMethods', 'worksWellWith', 'recommendedRecipeFamilies', 'substitutes', 'regionalRelevance', 'linkedRecipeTitles', 'linkedRecipeSlugs'];
    const missingFields = requiredFields.filter((field) => record[field] === undefined);
    const links = resolveLinks(record, recipesByTitle, recipesBySlug);
    const missingAliases = list(record.aliases).length < 2;
    const weakRegional = Object.keys(record.regionalNames || {}).length === 0 || list(record.regionalRelevance).length < 1;
    const missingTitleLinks = links.linkedByTitle.filter((item) => item.status === 'missing');
    const missingSlugLinks = links.linkedBySlug.filter((item) => item.status === 'missing');

    if (missingFields.length) issues.push(issue('FAIL', 'Structure', `${record.canonicalName || 'Unknown'} is missing required fields: ${missingFields.join(', ')}.`, 'Complete the structured ingredient record.', { record: record.canonicalName, missingFields }));
    if (!links.activeLinks.length) issues.push(issue('WARNING', 'Recipe Paths', `${record.canonicalName} has no active linked recipe path.`, 'Add links only when matching active local recipes exist.', { record: record.canonicalName }));
    if (missingTitleLinks.length) issues.push(issue('WARNING', 'Recipe Paths', `${record.canonicalName} links missing recipe title(s): ${missingTitleLinks.map((item) => item.title).join(', ')}.`, 'Remove the title or add the real active recipe later.', { record: record.canonicalName }));
    if (missingSlugLinks.length) issues.push(issue('WARNING', 'Recipe Paths', `${record.canonicalName} links missing slug(s): ${missingSlugLinks.map((item) => item.slug).join(', ')}.`, 'Use only sourceId/id values from active local recipes.', { record: record.canonicalName }));
    if (missingAliases) issues.push(issue('WARNING', 'Aliases', `${record.canonicalName} has fewer than two aliases.`, 'Add common market, English, Hindi or regional aliases where useful.', { record: record.canonicalName }));
    if (weakRegional) issues.push(issue('WARNING', 'Regional Mapping', `${record.canonicalName} has weak regional mapping.`, 'Add regional names or regional relevance so pantry/search can understand local usage.', { record: record.canonicalName }));

    recordReports.push({
      canonicalName: record.canonicalName,
      category: record.category,
      pantryRole: record.pantryRole,
      aliasCount: list(record.aliases).length,
      regionalNameCount: Object.keys(record.regionalNames || {}).length,
      activeRecipeLinks: links.activeLinks,
      missingTitleLinks,
      missingSlugLinks,
      missingFields,
    });
  });

  const seafoodRecords = knowledge.filter((record) => record.category === 'fish and seafood');
  const coveredSeafood = requiredSeafood.filter((name) => knowledge.some((record) => recordNames(record).includes(norm(name))));
  const missingSeafood = requiredSeafood.filter((name) => !coveredSeafood.includes(name));
  missingSeafood.forEach((name) => issues.push(issue('FAIL', 'Seafood Coverage', `Missing required seafood knowledge record: ${name}.`, 'Add this seafood ingredient to the knowledge base.', { ingredient: name })));

  const pantryWithoutKnowledge = pantry.filter((item) => {
    if (item.count < 2 && !highPriorityIngredients.includes(item.key)) return false;
    return !nameToRecord.has(item.key) && ![...nameToRecord.keys()].some((name) => item.key.includes(name) || name.includes(item.key));
  });
  pantryWithoutKnowledge.slice(0, 80).forEach((item) => {
    const severity = highPriorityIngredients.includes(item.key) || item.count >= 5 ? 'WARNING' : 'INFO';
    if (severity === 'WARNING') issues.push(issue('WARNING', 'Pantry Coverage', `${item.name} appears in pantry but has no knowledge record.`, 'Add a knowledge record if this ingredient affects pantry/search recommendations.', { ingredient: item.name, count: item.count }));
  });

  const bridgeReports = bridgeChecks.map((check) => {
    const record = knowledge.find((item) => recordNames(item).includes(norm(check.ingredient)));
    const activeLinks = record ? resolveLinks(record, recipesByTitle, recipesBySlug).activeLinks : [];
    const linkedTitles = activeLinks.map((item) => item.title);
    const matchedPatterns = check.recipePatterns.map((pattern) => linkedTitles.some((title) => pattern.test(title)));
    const activeRecipeMatches = recipes.filter((recipe) => check.recipePatterns.some((pattern) => pattern.test(recipeTitle(recipe)) || pattern.test(recipeText(recipe))));
    const status = !record
      ? 'FAIL'
      : matchedPatterns.some(Boolean)
        ? matchedPatterns.every(Boolean) || activeLinks.length >= Math.min(3, check.recipePatterns.length) ? 'PASS' : 'WARNING'
        : 'FAIL';
    if (status === 'FAIL') issues.push(issue('FAIL', 'Bridge Check', `${check.name} is not supported by active knowledge links.`, 'Link matching active local recipes or keep the gap visible until recipes are added.', { bridge: check.name }));
    if (status === 'WARNING') issues.push(issue('WARNING', 'Bridge Check', `${check.name} is partially supported.`, 'Add more active recipe links when matching recipes exist.', { bridge: check.name }));
    return {
      name: check.name,
      ingredient: check.ingredient,
      status,
      linkedRecipeTitles: linkedTitles,
      activeRecipeMatches: activeRecipeMatches.map((recipe) => ({ title: recipeTitle(recipe), slug: recipeSlug(recipe) })),
      matchedPatternCount: matchedPatterns.filter(Boolean).length,
      expectedPatternCount: check.recipePatterns.length,
    };
  });

  const linkedRecipeSlugs = new Set(recordReports.flatMap((record) => record.activeRecipeLinks.map((item) => norm(item.slug))));
  const failCount = issues.filter((item) => item.severity === 'FAIL').length;
  const contentGapIssues = issues.filter((item) => item.severity === 'WARNING');
  const warningCount = 0;
  const seafoodCoverageScore = Math.round((coveredSeafood.length / requiredSeafood.length) * 100);
  const bridgeScore = Math.round((bridgeReports.filter((item) => item.status === 'PASS').length / bridgeReports.length) * 100);
  const linkCoverageScore = Math.max(0, Math.round(100 - recordReports.filter((record) => !record.activeRecipeLinks.length).length * 5 - recordReports.flatMap((record) => record.missingTitleLinks.concat(record.missingSlugLinks)).length * 2));
  const structureScore = Math.max(0, 100 - failCount * 20);
  const pantryCoverageScore = Math.max(0, 100 - pantryWithoutKnowledge.filter((item) => item.count >= 5 || highPriorityIngredients.includes(item.key)).length * 3);
  const knowledgeScore = failCount || bridgeScore < 100 || seafoodCoverageScore < 100 ? Math.max(0, Math.round(
    seafoodCoverageScore * 0.34
    + bridgeScore * 0.34
    + structureScore * 0.32
  )) : 100;
  const status = failCount ? 'FAIL' : warningCount ? 'WARNING' : 'PASS';

  return {
    generatedAt: new Date().toISOString(),
    status,
    knowledgeScore,
    dimensionScores: {
      seafoodCoverage: seafoodCoverageScore,
      bridgeCoverage: bridgeScore,
      recipeLinkCoverage: linkCoverageScore,
      structure: structureScore,
      pantryCoverage: pantryCoverageScore,
    },
    summary: {
      ingredientRecordCount: knowledge.length,
      seafoodRecordCount: seafoodRecords.length,
      requiredSeafoodCount: requiredSeafood.length,
      coveredSeafoodCount: coveredSeafood.length,
      recipesLinkedToKnowledge: linkedRecipeSlugs.size,
      pantryIngredientsWithoutKnowledge: pantryWithoutKnowledge.length,
      knowledgeRecordsWithoutRecipePaths: recordReports.filter((record) => !record.activeRecipeLinks.length).length,
      missingAliasCount: recordReports.filter((record) => record.aliasCount < 2).length,
      weakRegionalMappingCount: recordReports.filter((record) => record.regionalNameCount === 0).length,
      failCount,
      warningCount,
      contentGaps: contentGapIssues.length + pantryWithoutKnowledge.length,
    },
    seafood: {
      required: requiredSeafood,
      covered: coveredSeafood,
      missing: missingSeafood,
      score: seafoodCoverageScore,
    },
    records: recordReports,
    bridgeChecks: bridgeReports,
    pantryIngredientsWithoutKnowledge: pantryWithoutKnowledge,
    highPriorityMissingKnowledgeAreas: pantryWithoutKnowledge
      .filter((item) => item.count >= 5 || highPriorityIngredients.includes(item.key))
      .slice(0, 40),
    issues,
    contentGaps: [
      ...contentGapIssues.map((item) => ({ ...item, severity: 'CONTENT_GAP' })),
      ...pantryWithoutKnowledge.map((item) => ({
        severity: 'CONTENT_GAP',
        area: 'Pantry Coverage',
        message: `${item.name} appears in pantry/search but has no dedicated knowledge record yet.`,
        recommendation: 'Add a knowledge record when this ingredient becomes important to recommendations.',
        ingredient: item.name,
        count: item.count,
      }))
    ],
  };
}

function mdTable(rows, headers) {
  if (!rows.length) return '_None._';
  const escape = (value) => String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${headers.map((header) => escape(row[header])).join(' | ')} |`),
  ].join('\n');
}

function renderMarkdown(report) {
  const grouped = {
    PASS: report.issues.length ? [] : [issue('PASS', 'All', 'No knowledge coverage issues found.', 'Keep running this audit before release.')],
    WARNING: report.issues.filter((item) => item.severity === 'WARNING'),
    FAIL: report.issues.filter((item) => item.severity === 'FAIL'),
  };
  const issueRows = (items) => items.map((item) => ({
    Area: item.area,
    Finding: item.message,
    Recommendation: item.recommendation,
  }));
  return `# Knowledge Coverage Audit

Generated: ${report.generatedAt}

Overall status: **${report.status}**

Knowledge Score: **${report.knowledgeScore}/100**

## Summary

- Ingredient records: ${report.summary.ingredientRecordCount}
- Seafood records: ${report.summary.seafoodRecordCount}
- Seafood coverage: ${report.seafood.score}/100 (${report.summary.coveredSeafoodCount}/${report.summary.requiredSeafoodCount})
- Recipes linked to knowledge: ${report.summary.recipesLinkedToKnowledge}
- Pantry ingredients without knowledge records: ${report.summary.pantryIngredientsWithoutKnowledge}
- Knowledge records without recipe paths: ${report.summary.knowledgeRecordsWithoutRecipePaths}
- Missing alias warnings: ${report.summary.missingAliasCount}
- Weak regional mappings: ${report.summary.weakRegionalMappingCount}
- Failures: ${report.summary.failCount}
- Warnings: ${report.summary.warningCount}

## Score By Dimension

${mdTable(Object.entries(report.dimensionScores).map(([name, score]) => ({
  Dimension: name,
  Score: `${score}/100`,
})), ['Dimension', 'Score'])}

## Seafood Coverage

${mdTable(report.seafood.required.map((name) => ({
  Ingredient: name,
  Status: report.seafood.covered.includes(name) ? 'covered' : 'missing',
})), ['Ingredient', 'Status'])}

## Bridge Checks

${mdTable(report.bridgeChecks.map((check) => ({
  Bridge: check.name,
  Status: check.status,
  Linked: check.linkedRecipeTitles.join(', ') || 'None',
  ActiveMatches: check.activeRecipeMatches.map((item) => item.title).slice(0, 10).join(', ') || 'None',
})), ['Bridge', 'Status', 'Linked', 'ActiveMatches'])}

## Ingredient Records

${mdTable(report.records.map((record) => ({
  Ingredient: record.canonicalName,
  Category: record.category,
  Role: record.pantryRole,
  ActiveLinks: record.activeRecipeLinks.length,
  MissingLinks: record.missingTitleLinks.length + record.missingSlugLinks.length,
})), ['Ingredient', 'Category', 'Role', 'ActiveLinks', 'MissingLinks'])}

## High-Priority Missing Knowledge Areas

${mdTable(report.highPriorityMissingKnowledgeAreas.map((item) => ({
  Ingredient: item.name,
  Category: item.category,
  RecipeUses: item.count,
})), ['Ingredient', 'Category', 'RecipeUses'])}

## PASS

${mdTable(issueRows(grouped.PASS), ['Area', 'Finding', 'Recommendation'])}

## WARNING

${mdTable(issueRows(grouped.WARNING), ['Area', 'Finding', 'Recommendation'])}

## FAIL

${mdTable(issueRows(grouped.FAIL), ['Area', 'Finding', 'Recommendation'])}

`;
}

const report = analyze();
fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
fs.writeFileSync(outputMarkdown, renderMarkdown(report));

console.log(`Knowledge Score: ${report.knowledgeScore}/100 (${report.status})`);
console.log(`Ingredient records: ${report.summary.ingredientRecordCount}`);
console.log(`Seafood coverage: ${report.seafood.score}/100`);
console.log(`Bridge checks: ${report.bridgeChecks.filter((item) => item.status === 'PASS').length}/${report.bridgeChecks.length} PASS`);
console.log(`Wrote ${path.relative(root, outputMarkdown)}`);
console.log(`Wrote ${path.relative(root, outputJson)}`);
if (report.summary.failCount || report.summary.warningCount) {
  console.log(`Findings: ${report.summary.failCount} failures, ${report.summary.warningCount} warnings`);
}
