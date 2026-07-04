(function initTomoExplainabilityEngine(global) {
  const TITLE_OVERRIDES = {
    palak: 'Spinach',
    'toor dal': 'Dal',
    'moong dal': 'Dal',
    'urad dal': 'Dal'
  };
  const STRENGTH_SCORE = { excellent: 4, strong: 3, primary: 3, moderate: 2, light: 1 };

  function list(value) {
    return Array.isArray(value) ? value.filter(Boolean) : [];
  }

  function norm(value) {
    return String(value || '').toLowerCase().replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function titleize(value) {
    const key = norm(value);
    if (TITLE_OVERRIDES[key]) return TITLE_OVERRIDES[key];
    return String(value || '').replace(/\s+/g, ' ').trim().replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function unique(items) {
    const seen = new Set();
    return list(items).filter((item) => {
      const key = typeof item === 'string' ? item : JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function knowledgeRecords() {
    return list(global.TOMO_INGREDIENT_KNOWLEDGE);
  }

  function canonicalMap(records = knowledgeRecords()) {
    const map = new Map();
    records.forEach((record) => {
      map.set(norm(record.canonicalName), record);
      list(record.aliases).forEach((alias) => map.set(norm(alias), record));
      Object.values(record.regionalNames || {}).flat().forEach((name) => map.set(norm(name), record));
    });
    return map;
  }

  function canonicalRecord(value, map = canonicalMap()) {
    if (!value) return null;
    return map.get(norm(value)) || null;
  }

  function recipeKey(recipe) {
    return norm(recipe && (recipe.sourceId || recipe.slug || recipe.id || recipe.title));
  }

  function dishMatchesRecipe(dish, recipe) {
    const title = typeof dish === 'string' ? dish : dish && dish.title;
    const slug = typeof dish === 'string' ? '' : dish && dish.slug;
    return Boolean(recipe && (
      (title && norm(title) === norm(recipe.title))
      || (slug && norm(slug) === recipeKey(recipe))
    ));
  }

  function recordLinksRecipe(record, recipe) {
    return list(record.linkedRecipeSlugs).some((slug) => norm(slug) === recipeKey(recipe))
      || list(record.linkedRecipeTitles).some((title) => norm(title) === norm(recipe.title))
      || list(record.seasonality && record.seasonality.signatureDishes).some((dish) => dishMatchesRecipe(dish, recipe))
      || list(record.regionalStrength).some((entry) => list(entry.signatureDishes).some((dish) => dishMatchesRecipe(dish, recipe)));
  }

  function recipeIngredientEntries(recipe) {
    const named = [
      recipe && recipe.primaryIngredient1,
      recipe && recipe.primaryIngredient2,
      recipe && recipe.secondaryIngredient1,
      recipe && recipe.secondaryIngredient2,
      recipe && recipe.secondaryIngredient3,
      recipe && recipe.secondaryIngredient4,
      recipe && recipe.secondaryIngredient5
    ].filter(Boolean).map((name, index) => ({
      name,
      role: index < 2 ? 'required' : 'support',
      isMain: index < 2
    }));
    return unique([
      ...named,
      ...list(recipe && recipe.ingredients).map((item) => ({
        name: item.name || item.ingredientName || item.ingredient || '',
        role: item.role || (item.isMain ? 'required' : 'support'),
        isMain: Boolean(item.isMain)
      })).filter((item) => item.name)
    ].map((item) => ({ ...item, key: norm(item.name) })));
  }

  function recipeCanonicalRecords(recipe, records = knowledgeRecords()) {
    const map = canonicalMap(records);
    const direct = recipeIngredientEntries(recipe).map((item) => canonicalRecord(item.name, map)).filter(Boolean);
    const linked = records.filter((record) => recordLinksRecipe(record, recipe));
    return unique([...direct, ...linked]);
  }

  function recipeFamilies(recipe, relatedRecords) {
    const fromRecords = relatedRecords.flatMap((record) => [
      ...list(record.recipeFamilies),
      ...list(record.recommendedRecipeFamilies)
    ]);
    const fromRecipe = [
      recipe && recipe.cuisine,
      ...list(recipe && recipe.tags)
    ];
    const title = norm(recipe && recipe.title);
    const inferred = [];
    ['rasam', 'sambar', 'pulusu', 'fish curry', 'coastal curry', 'palak paneer', 'bassaru', 'rice', 'pappu'].forEach((family) => {
      if (title.includes(family)) inferred.push(family);
    });
    return unique([...inferred, ...fromRecords, ...fromRecipe]).slice(0, 8);
  }

  function pairingStrength(record, target) {
    const targetKey = norm(target && target.canonicalName ? target.canonicalName : target);
    const graphPair = list(record.flavorGraph && record.flavorGraph.pairsWellWith)
      .find((pair) => norm(pair.ingredient) === targetKey);
    if (graphPair) {
      return {
        strength: graphPair.strength || 'strong',
        reason: graphPair.reason,
        recipeFamilies: list(graphPair.recipeFamilies)
      };
    }
    const related = [...list(record.relatedIngredients), ...list(record.worksWellWith)];
    if (related.some((item) => norm(item) === targetKey)) {
      return {
        strength: 'strong',
        reason: `${titleize(record.canonicalName)} pairs with ${titleize(targetKey)} in Tomo's ingredient knowledge.`,
        recipeFamilies: list(record.recipeFamilies).slice(0, 3)
      };
    }
    return null;
  }

  function currentSeasonFromOptions(options) {
    return norm(options.currentSeason || options.season || '');
  }

  function explainRecommendation(recipe, options = {}) {
    const records = knowledgeRecords();
    const map = canonicalMap(records);
    const relatedRecords = recipeCanonicalRecords(recipe, records);
    const relatedNames = new Set(relatedRecords.map((record) => record.canonicalName));
    const entries = recipeIngredientEntries(recipe);
    const pantryRecords = unique(list(options.pantryIngredients || options.pantry || []).map((item) => canonicalRecord(item, map) || { canonicalName: norm(item) }).filter(Boolean));
    const pantryNames = new Set(pantryRecords.map((record) => norm(record.canonicalName)));
    const requiredEntries = entries.filter((entry) => entry.isMain || ['required', 'core'].includes(norm(entry.role)));

    const explanation = {
      title: recipe && recipe.title || '',
      confidence: 'Low',
      reasons: [],
      ingredientReasons: [],
      regionalReasons: [],
      seasonalReasons: [],
      pantryReasons: [],
      flavorReasons: [],
      substitutionHints: [],
      recipeFamilyReasons: []
    };

    relatedRecords.forEach((record) => {
      if (recordLinksRecipe(record, recipe)) {
        explanation.ingredientReasons.push(`${titleize(record.canonicalName)} commonly appears in ${recipe.title}.`);
      } else if (entries.some((entry) => canonicalRecord(entry.name, map) === record)) {
        explanation.ingredientReasons.push(`${titleize(record.canonicalName)} is part of this recipe.`);
      }
    });

    pantryRecords.forEach((record) => {
      const name = norm(record.canonicalName);
      const isDirect = relatedNames.has(record.canonicalName) || entries.some((entry) => norm(entry.name) === name);
      const supportsRecipe = relatedRecords.some((related) => pairingStrength(related, record));
      if (isDirect || supportsRecipe) explanation.pantryReasons.push(`${titleize(record.canonicalName)} is available.`);
    });
    const missing = requiredEntries.filter((entry) => !pantryNames.has(norm((canonicalRecord(entry.name, map) || {}).canonicalName || entry.name)));
    if (missing.length === 1) explanation.pantryReasons.push(`Only ${titleize(missing[0].name)} is missing.`);
    else if (missing.length > 1 && pantryRecords.length) explanation.pantryReasons.push(`${missing.length} core ingredients are missing.`);

    relatedRecords.forEach((record) => {
      list(record.regionalStrength).forEach((entry) => {
        if (list(entry.signatureDishes).some((dish) => dishMatchesRecipe(dish, recipe)) || norm(recipe.cuisine).includes(norm(entry.region))) {
          explanation.regionalReasons.push(`${titleize(record.canonicalName)} is ${entry.strength || 'strongly'} associated with ${entry.region}.`);
        }
      });
    });
    if (recipe && recipe.cuisine) explanation.regionalReasons.push(`This recipe belongs to ${recipe.cuisine} cuisine.`);

    const season = currentSeasonFromOptions(options);
    relatedRecords.forEach((record) => {
      const seasonal = record.seasonality;
      if (!seasonal) return;
      const peak = list(seasonal.peakSeasons).map(norm);
      const secondary = list(seasonal.secondarySeasons).map(norm);
      const recipeMatch = list(seasonal.signatureDishes).some((dish) => dishMatchesRecipe(dish, recipe));
      if (recipeMatch || (season && (peak.includes(season) || secondary.includes(season)))) {
        const label = peak.includes(season) ? 'currently in peak season' : 'seasonally relevant';
        explanation.seasonalReasons.push(`${titleize(record.canonicalName)} is ${label}.`);
      }
    });

    for (let i = 0; i < relatedRecords.length; i += 1) {
      for (let j = i + 1; j < relatedRecords.length; j += 1) {
        const a = relatedRecords[i];
        const b = relatedRecords[j];
        const pair = pairingStrength(a, b) || pairingStrength(b, a);
        if (!pair) continue;
        const strength = pair.strength || 'strong';
        explanation.flavorReasons.push(`${titleize(a.canonicalName)} pairs ${strength}ly with ${titleize(b.canonicalName)}.`);
      }
    }
    pantryRecords.forEach((pantryRecord) => {
      relatedRecords.forEach((record) => {
        if (norm(pantryRecord.canonicalName) === norm(record.canonicalName)) return;
        const pair = pairingStrength(record, pantryRecord) || pairingStrength(pantryRecord, record);
        if (pair) explanation.flavorReasons.push(`${titleize(pantryRecord.canonicalName)} enhances ${titleize(record.canonicalName)}.`);
      });
    });

    relatedRecords.forEach((record) => {
      const matchingFamilies = recipeFamilies(recipe, [record]).filter((family) => {
        const key = norm(family);
        return norm(recipe.title).includes(key) || list(record.linkedRecipeSlugs).some((slug) => norm(slug) === recipeKey(recipe));
      });
      matchingFamilies.slice(0, 2).forEach((family) => {
        explanation.recipeFamilyReasons.push(`This belongs to the ${titleize(family)} family.`);
      });
    });
    recipeFamilies(recipe, relatedRecords).slice(0, 4).forEach((family) => {
      if (norm(family) && norm(recipe.title).includes(norm(family))) {
        explanation.recipeFamilyReasons.push(`This belongs to the ${titleize(family)} family.`);
      }
    });

    missing.forEach((entry) => {
      const record = canonicalRecord(entry.name, map);
      const substitutions = list(record && record.substitutions).length
        ? list(record.substitutions).map((sub) => ({ ingredient: sub.ingredient, confidence: sub.confidence || 'acceptable' }))
        : list(record && record.substitutes).map((ingredient) => ({ ingredient, confidence: 'acceptable' }));
      substitutions.slice(0, 2).forEach((sub) => {
        explanation.substitutionHints.push(`No ${titleize(record.canonicalName)}? ${titleize(sub.ingredient)} is a ${sub.confidence} substitute.`);
      });
    });

    Object.keys(explanation).forEach((key) => {
      if (Array.isArray(explanation[key])) explanation[key] = unique(explanation[key]).slice(0, key === 'reasons' ? 12 : 8);
    });
    explanation.reasons = unique([
      ...explanation.pantryReasons.slice(0, 2),
      ...explanation.ingredientReasons.slice(0, 2),
      ...explanation.regionalReasons.slice(0, 2),
      ...explanation.seasonalReasons.slice(0, 1),
      ...explanation.flavorReasons.slice(0, 2),
      ...explanation.recipeFamilyReasons.slice(0, 2)
    ]);

    let score = 0;
    score += Math.min(3, explanation.pantryReasons.length);
    score += Math.min(2, explanation.ingredientReasons.length);
    score += Math.min(2, explanation.regionalReasons.length);
    score += Math.min(2, explanation.flavorReasons.length);
    score += Math.min(1, explanation.seasonalReasons.length);
    score += Math.min(2, explanation.recipeFamilyReasons.length);
    explanation.confidence = score >= 9 ? 'Very High' : score >= 6 ? 'High' : score >= 3 ? 'Medium' : 'Low';

    return explanation;
  }

  const api = {
    explainRecommendation,
    buildRecommendationExplanation: explainRecommendation,
    _internal: {
      norm,
      titleize,
      recipeIngredientEntries,
      recipeCanonicalRecords,
      recipeFamilies,
      pairingStrength
    }
  };

  global.TOMO_EXPLAINABILITY_ENGINE = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
