(function () {
  function normalize(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[-_]/g, ' ')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function list(value) {
    if (value instanceof Set) return [...value];
    return Array.isArray(value) ? value : value ? [value] : [];
  }

  function uniqueNames(names) {
    const seen = new Set();
    return names.filter((name) => {
      const key = normalize(name);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function ingredientMatches(ingredientName, selectedName) {
    const ingredient = normalize(ingredientName);
    const selected = normalize(selectedName);
    if (!ingredient || !selected) return false;
    if (ingredient === selected) return true;
    const groups = [
      ['rice', 'cooked rice', 'steamed rice'],
      ['wheat', 'wheat flour', 'atta', 'whole wheat', 'flour'],
      ['egg', 'eggs'],
      ['chicken', 'country chicken'],
      ['onion', 'onions', 'shallot', 'shallots'],
      ['chana', 'chole', 'chickpea', 'chickpeas', 'kabuli chana'],
      ['peanut', 'peanuts'],
      ['moong dal', 'mung dal', 'moong'],
      ['bread', 'toast'],
      ['curd', 'yogurt', 'yoghurt']
    ];
    return groups.some((group) => group.includes(ingredient) && group.includes(selected));
  }

  function isNiceToHave(item) {
    const role = normalize(item.role);
    return ['optional', 'garnish', 'flavor base', 'flavour base', 'seasoning', 'supporting', 'nice to have', 'nice to have ingredient'].includes(role);
  }

  function ingredientIsRequired(source, role) {
    if (source.required === true || source.isRequired === true) return true;
    if (source.isMain === true) return true;
    if (source.required === false || source.isRequired === false) return false;
    return ['required', 'main'].includes(role);
  }

  function structuredIngredients(recipe) {
    return list(recipe?.ingredients).map((raw) => {
      const source = raw && typeof raw === 'object' ? raw : { name: raw };
      const name = String(source.name || source.ingredient || '').trim();
      const role = normalize(source.role);
      return {
        name,
        role,
        required: ingredientIsRequired(source, role)
      };
    }).filter((item) => item.name);
  }

  function fallbackIngredients(recipe) {
    const primary = [
      recipe?.primaryIngredient1,
      recipe?.primaryIngredient2,
      recipe?.primary_ingredient_1,
      recipe?.primary_ingredient_2
    ].filter(Boolean).map((name) => ({ name: String(name), role: 'required', required: true }));
    const secondary = [
      recipe?.secondaryIngredient1,
      recipe?.secondaryIngredient2,
      recipe?.secondaryIngredient3,
      recipe?.secondaryIngredient4,
      recipe?.secondaryIngredient5,
      recipe?.secondary_ingredient_1,
      recipe?.secondary_ingredient_2,
      recipe?.secondary_ingredient_3,
      recipe?.secondary_ingredient_4,
      recipe?.secondary_ingredient_5
    ].filter(Boolean).map((name) => ({ name: String(name), role: 'optional', required: false }));
    return [...primary, ...secondary];
  }

  function ingredientAvailability(recipe, selectedIngredients = [], cartItems = []) {
    const structured = structuredIngredients(recipe);
    const ingredients = structured.length ? structured : fallbackIngredients(recipe);
    const selected = list(selectedIngredients);
    const cartNames = list(cartItems).map((item) => item && typeof item === 'object' ? item.name : item);
    const required = ingredients.filter((item) => item.required && !isNiceToHave(item));
    const optional = ingredients.filter((item) => !item.required || isNiceToHave(item));
    const matchedRequired = uniqueNames(required
      .filter((item) => selected.some((name) => ingredientMatches(item.name, name)))
      .map((item) => item.name));
    const missingRequired = uniqueNames(required
      .filter((item) => !selected.some((name) => ingredientMatches(item.name, name)))
      .map((item) => item.name));
    const optionalNiceToHave = uniqueNames(optional.map((item) => item.name));
    const remainingToAdd = missingRequired.filter((name) => {
      return !cartNames.some((cartName) => ingredientMatches(name, cartName));
    });
    return { matchedRequired, missingRequired, optionalNiceToHave, remainingToAdd };
  }

  function debugIngredientAvailability(recipe, selectedIngredients = [], cartItems = []) {
    const structured = structuredIngredients(recipe);
    const ingredients = structured.length ? structured : fallbackIngredients(recipe);
    const availability = ingredientAvailability(recipe, selectedIngredients, cartItems);
    return {
      recipeTitle: recipe?.title || '',
      selectedIngredients: list(selectedIngredients),
      cartItems: list(cartItems).map((item) => item && typeof item === 'object' ? item.name : item),
      ingredients,
      matchedRequired: availability.matchedRequired,
      missingRequired: availability.missingRequired,
      remainingToAdd: availability.remainingToAdd,
      optionalNiceToHave: availability.optionalNiceToHave
    };
  }

  window.TomoIngredientAvailability = {
    ingredientAvailability,
    ingredientMatches,
    debugIngredientAvailability,
    normalize
  };
})();
