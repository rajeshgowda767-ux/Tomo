#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = process.argv[2] || process.cwd();
const outputJson = path.join(root, 'flavor-graph-audit.json');
const outputMd = path.join(root, 'flavor-graph-audit.md');
const allowedStrengths = new Set(['excellent', 'strong', 'moderate', 'light']);

function norm(value) {
  return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
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

function canonicalMap(records) {
  const map = new Map();
  for (const record of records) {
    map.set(norm(record.canonicalName), record.canonicalName);
    for (const alias of list(record.aliases)) map.set(norm(alias), record.canonicalName);
  }
  return map;
}

function pairs(record) {
  return list(record.flavorGraph && record.flavorGraph.pairsWellWith);
}

function pairTargets(record, canonicalFor) {
  return pairs(record).map((pair) => canonicalFor.get(norm(pair.ingredient))).filter(Boolean);
}

function hasPair(recordsByName, canonicalFor, from, to) {
  const sourceName = canonicalFor.get(norm(from));
  const targetName = canonicalFor.get(norm(to));
  const source = recordsByName.get(sourceName);
  if (!source || !targetName) return false;
  return pairs(source).some((pair) => canonicalFor.get(norm(pair.ingredient)) === targetName);
}

function connectedComponents(records, canonicalFor) {
  const adjacency = new Map(records.map((record) => [record.canonicalName, new Set()]));
  for (const record of records) {
    for (const target of pairTargets(record, canonicalFor)) {
      if (!adjacency.has(target)) continue;
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
  const canonicalFor = canonicalMap(records);
  const recordsByName = new Map(records.map((record) => [record.canonicalName, record]));

  const missingFlavorGraph = records.filter((record) => !record.flavorGraph).map((record) => record.canonicalName);
  const missingPrimaryFlavors = records
    .filter((record) => !list(record.flavorGraph && record.flavorGraph.primaryFlavors).length)
    .map((record) => record.canonicalName);
  const missingPairData = [];
  const brokenIngredientReferences = [];
  const invalidStrengths = [];
  const duplicatePairs = [];
  const asymmetricStrongPairings = [];
  const pairUsage = new Map();

  for (const record of records) {
    const seen = new Set();
    for (const pair of pairs(record)) {
      const target = canonicalFor.get(norm(pair.ingredient));
      if (!target) brokenIngredientReferences.push({ ingredient: record.canonicalName, reference: pair.ingredient });
      if (!allowedStrengths.has(norm(pair.strength))) invalidStrengths.push({ ingredient: record.canonicalName, pair: pair.ingredient, strength: pair.strength });
      if (!pair.reason || !list(pair.recipeFamilies).length) missingPairData.push({ ingredient: record.canonicalName, pair: pair.ingredient });
      const key = target || norm(pair.ingredient);
      if (seen.has(key)) duplicatePairs.push({ ingredient: record.canonicalName, pair: pair.ingredient });
      seen.add(key);
      if (target) pairUsage.set(target, (pairUsage.get(target) || 0) + 1);
      if (target && ['excellent', 'strong'].includes(norm(pair.strength))) {
        const reverse = recordsByName.get(target);
        const reciprocal = reverse && pairs(reverse).some((candidate) => canonicalFor.get(norm(candidate.ingredient)) === record.canonicalName);
        if (!reciprocal) asymmetricStrongPairings.push({ from: record.canonicalName, to: target, strength: pair.strength });
      }
    }
  }

  const requiredBridgeGroups = [
    { name: 'Tomato', from: 'tomato', targets: ['onion', 'garlic', 'egg', 'paneer'] },
    { name: 'Coconut', from: 'coconut', targets: ['fish', 'prawns', 'curry leaves'] },
    { name: 'Tamarind', from: 'tamarind', targets: ['fish', 'toor dal', 'tomato'] },
    { name: 'Paneer', from: 'paneer', targets: ['tomato', 'capsicum', 'palak'] },
    { name: 'Egg', from: 'egg', targets: ['onion', 'tomato', 'rice'] },
    { name: 'Fish', from: 'fish', targets: ['tamarind', 'coconut', 'curry leaves'] },
    { name: 'Horse Gram', from: 'horse gram', targets: ['garlic', 'tamarind', 'coconut'] },
    { name: 'Raw Mango', from: 'raw mango', targets: ['green chilli', 'mustard seeds', 'rice'] },
    { name: 'Kokum', from: 'kokum', targets: ['coconut', 'fish'] }
  ];
  const bridgeChecks = requiredBridgeGroups.map((group) => {
    const missing = group.targets.filter((target) => !hasPair(recordsByName, canonicalFor, group.from, target) || !hasPair(recordsByName, canonicalFor, target, group.from));
    return {
      name: group.name,
      status: missing.length ? 'WARNING' : 'PASS',
      missing
    };
  });

  const requiredPairs = [
    ['tomato', 'onion'], ['tomato', 'garlic'], ['tomato', 'ginger'], ['tomato', 'egg'], ['tomato', 'paneer'], ['tomato', 'rice'], ['tomato', 'tamarind'],
    ['coconut', 'curry leaves'], ['coconut', 'mustard seeds'], ['coconut', 'green chilli'], ['coconut', 'fish'], ['coconut', 'prawns'], ['coconut', 'tamarind'], ['coconut', 'rice'],
    ['tamarind', 'jaggery'], ['tamarind', 'curry leaves'], ['tamarind', 'fish'], ['tamarind', 'toor dal'], ['tamarind', 'tomato'], ['tamarind', 'coconut'],
    ['paneer', 'tomato'], ['paneer', 'capsicum'], ['paneer', 'palak'], ['paneer', 'peas'], ['paneer', 'cashew'],
    ['egg', 'onion'], ['egg', 'tomato'], ['egg', 'pepper'], ['egg', 'rice'], ['egg', 'bread'],
    ['fish', 'tamarind'], ['fish', 'coconut'], ['fish', 'garlic'], ['fish', 'curry leaves'], ['fish', 'green chilli'],
    ['prawns', 'coconut'], ['prawns', 'garlic'], ['prawns', 'green chilli'], ['prawns', 'tamarind'], ['prawns', 'curry leaves'],
    ['horse gram', 'garlic'], ['horse gram', 'tamarind'], ['horse gram', 'coconut'], ['horse gram', 'curry leaves'],
    ['ragi', 'ghee'], ['ragi', 'jaggery'], ['ragi', 'curd'], ['ragi', 'greens'],
    ['raw mango', 'green chilli'], ['raw mango', 'mustard seeds'], ['raw mango', 'coconut'], ['raw mango', 'toor dal'], ['raw mango', 'rice'],
    ['gongura', 'green chilli'], ['gongura', 'garlic'], ['gongura', 'toor dal'], ['gongura', 'rice'],
    ['kokum', 'coconut'], ['kokum', 'fish'], ['kokum', 'prawns'], ['kokum', 'jaggery'],
    ['mustard oil', 'fish'], ['mustard oil', 'potato'], ['mustard oil', 'greens']
  ];
  const missingRequiredFlavorPairs = requiredPairs
    .filter(([from, to]) => !hasPair(recordsByName, canonicalFor, from, to) || !hasPair(recordsByName, canonicalFor, to, from))
    .map(([from, to]) => ({ from, to }));

  const overusedGenericPairings = [...pairUsage.entries()]
    .filter(([, count]) => count > Math.max(12, Math.round(records.length * 0.35)))
    .map(([ingredient, count]) => ({ ingredient, count }));
  const flavorClusters = connectedComponents(records, canonicalFor).slice(0, 8);
  const contentGaps = records
    .filter((record) => pairs(record).length === 0 && !['light', 'support'].includes(norm(record.pantryRole)))
    .map((record) => ({ ingredient: record.canonicalName, opportunity: `Add curated flavor pairings for ${record.canonicalName}.` }));

  const failures = missingFlavorGraph.length + missingPrimaryFlavors.length + brokenIngredientReferences.length + invalidStrengths.length + duplicatePairs.length + missingPairData.length;
  const warnings = asymmetricStrongPairings.length + missingRequiredFlavorPairs.length + bridgeChecks.filter((check) => check.status !== 'PASS').length + overusedGenericPairings.length;
  const flavorGraphScore = failures || warnings ? Math.max(0, Math.round(
    100
    - missingFlavorGraph.length * 5
    - missingPrimaryFlavors.length * 4
    - brokenIngredientReferences.length * 6
    - invalidStrengths.length * 4
    - duplicatePairs.length * 3
    - missingPairData.length * 3
    - asymmetricStrongPairings.length * 2
    - missingRequiredFlavorPairs.length * 3
    - bridgeChecks.filter((check) => check.status !== 'PASS').length * 4
    - overusedGenericPairings.length * 1
  )) : 100;

  const report = {
    generatedAt: new Date().toISOString(),
    flavorGraphScore,
    status: statusFrom(failures, warnings),
    ingredientRecords: records.length,
    recordsWithFlavorGraph: records.length - missingFlavorGraph.length,
    summary: {
      failures,
      warnings,
      contentGaps: contentGaps.length,
      missingFlavorGraph: missingFlavorGraph.length,
      missingPrimaryFlavors: missingPrimaryFlavors.length,
      brokenIngredientReferences: brokenIngredientReferences.length,
      invalidStrengths: invalidStrengths.length,
      duplicatePairs: duplicatePairs.length,
      missingPairData: missingPairData.length,
      asymmetricStrongPairings: asymmetricStrongPairings.length,
      missingRequiredFlavorPairs: missingRequiredFlavorPairs.length,
      overusedGenericPairings: overusedGenericPairings.length
    },
    missingFlavorGraph,
    missingPrimaryFlavors,
    brokenIngredientReferences,
    invalidStrengths,
    duplicatePairs,
    missingPairData,
    asymmetricStrongPairings,
    missingRequiredFlavorPairs,
    overusedGenericPairings,
    flavorClusters,
    contentGaps,
    bridgeChecks
  };

  const md = `# Flavor Graph Audit\n\nFlavor Graph Score: ${flavorGraphScore}/100\n\nStatus: ${report.status}\n\n## PASS\n\n- Ingredient records: ${records.length}\n- Records with flavorGraph: ${report.recordsWithFlavorGraph}\n- Bridge checks passing: ${bridgeChecks.filter((check) => check.status === 'PASS').length}/${bridgeChecks.length}\n\n## WARNING\n\n- Asymmetric strong pairings: ${asymmetricStrongPairings.length}\n- Missing required flavor pairs: ${missingRequiredFlavorPairs.length}\n- Overused generic pairings: ${overusedGenericPairings.length}\n\n## FAIL\n\n- Missing flavorGraph: ${missingFlavorGraph.length}\n- Missing primaryFlavors: ${missingPrimaryFlavors.length}\n- Broken ingredient references: ${brokenIngredientReferences.length}\n- Invalid strength values: ${invalidStrengths.length}\n- Duplicate pairings: ${duplicatePairs.length}\n- Missing pair reason/family data: ${missingPairData.length}\n\n## Bridge Checks\n\n${bridgeChecks.map((check) => `- ${check.name}: ${check.status}${check.missing.length ? ` (missing ${check.missing.join(', ')})` : ''}`).join('\n')}\n\n## Flavor Clusters\n\n${flavorClusters.map((cluster) => `- ${cluster.join(' ↔ ')}`).join('\n')}\n\n## Content Gaps\n\nThese do not reduce the knowledge score.\n\n${contentGaps.length ? contentGaps.map((gap) => `- ${gap.ingredient}: ${gap.opportunity}`).join('\n') : '- None'}\n`;

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMd, md);
  console.log(JSON.stringify({
    flavorGraphScore,
    ingredientRecords: records.length,
    recordsWithFlavorGraph: report.recordsWithFlavorGraph,
    failures,
    warnings,
    contentGaps: contentGaps.length,
    json: outputJson,
    markdown: outputMd
  }, null, 2));
}

main();
