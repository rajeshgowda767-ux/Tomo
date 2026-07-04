(function ingredientSpotlightData(global) {
  const spotlightEntries = [
    {
      id: 'horse-gram',
      ingredient: 'Horse Gram',
      emoji: '🌾',
      title: 'Ingredient Spotlight',
      subtitle: 'Karnataka favorites',
      dishTitles: ['Bassaru', 'Kollu Rasam'],
      recipeSlugs: ['bassaru', 'kollu-rasam']
    },
    {
      id: 'coconut',
      ingredient: 'Coconut',
      emoji: '🥥',
      title: 'Ingredient Spotlight',
      subtitle: 'Coastal comfort',
      dishTitles: ['Avial', 'Coconut Rice', 'Prawn Sukka'],
      recipeSlugs: ['avial', 'coconut-rice', 'prawn-sukka']
    },
    {
      id: 'tamarind',
      ingredient: 'Tamarind',
      emoji: '🍂',
      title: 'Ingredient Spotlight',
      subtitle: 'Tangy southern classics',
      dishTitles: ['Puliyogare', 'Pepper Rasam', 'Rasam Rice'],
      recipeSlugs: ['puliyogare', 'pepper-rasam', 'rasam-rice']
    },
    {
      id: 'raw-mango',
      ingredient: 'Raw Mango',
      emoji: '🥭',
      title: 'Ingredient Spotlight',
      subtitle: 'Seasonal tang',
      dishTitles: ['Aam Panna', 'Mango Rice', 'Mamidikaya Pappu'],
      recipeSlugs: ['aam-panna', 'mango-rice', 'mamidikaya-pappu']
    },
    {
      id: 'coastal-fish',
      ingredient: 'Coastal Fish',
      emoji: '🐟',
      title: 'Ingredient Spotlight',
      subtitle: 'Coastal curries',
      dishTitles: ['Fish Fry', 'Mangalorean Fish Curry', 'Chepala Pulusu'],
      recipeSlugs: ['fish-fry', 'mangalorean-fish-curry', 'chepala-pulusu']
    },
    {
      id: 'prawns',
      ingredient: 'Prawns',
      emoji: '🦐',
      title: 'Ingredient Spotlight',
      subtitle: 'Seafood favorites',
      dishTitles: ['Prawn Ghee Roast', 'Prawn Sukka', 'Chingri Malai Curry'],
      recipeSlugs: ['prawn-ghee-roast', 'prawn-sukka', 'chingri-malai-curry']
    },
    {
      id: 'ragi',
      ingredient: 'Ragi',
      emoji: '🌾',
      title: 'Ingredient Spotlight',
      subtitle: 'Millet comfort',
      dishTitles: ['Ragi Mudde', 'Ragi Rotti', 'Ragi Malt'],
      recipeSlugs: ['ragi-mudde', 'ragi-rotti', 'ragi-malt']
    },
    {
      id: 'bamboo-shoot',
      ingredient: 'Bamboo Shoot',
      emoji: '🎍',
      title: 'Ingredient Spotlight',
      subtitle: 'Northeast and coastal notes',
      dishTitles: ['Bamboo Shoot Pork', 'Bamboo Shoot Curry', 'Smoked Pork Curry'],
      recipeSlugs: ['bamboo-shoot-pork', 'bamboo-shoot-curry', 'smoked-pork-curry']
    },
    {
      id: 'drumstick',
      ingredient: 'Drumstick',
      emoji: '🌿',
      title: 'Ingredient Spotlight',
      subtitle: 'Sambar and soup comfort',
      dishTitles: ['Drumstick Soup', 'Sambar Rice'],
      recipeSlugs: ['drumstick-soup', 'sambar-rice']
    },
    {
      id: 'curry-leaves',
      ingredient: 'Curry Leaves',
      emoji: '🍃',
      title: 'Ingredient Spotlight',
      subtitle: 'Tempered flavor',
      dishTitles: ['Bele Saaru', 'Coconut Rice', 'Andhra Egg Fry'],
      recipeSlugs: ['bele-saaru', 'coconut-rice', 'andhra-egg-fry']
    },
    {
      id: 'palak',
      ingredient: 'Palak',
      emoji: '🥬',
      title: 'Ingredient Spotlight',
      subtitle: 'Greens that travel',
      dishTitles: ['Palak Dal', 'Palak Paneer', 'Palak Paratha'],
      recipeSlugs: ['palak-dal', 'palak-paneer', 'palak-paratha']
    },
    {
      id: 'paneer',
      ingredient: 'Paneer',
      emoji: '🧀',
      title: 'Ingredient Spotlight',
      subtitle: 'Protein-rich comfort',
      dishTitles: ['Kadai Paneer', 'Matar Paneer', 'Paneer Bhurji'],
      recipeSlugs: ['kadai-paneer', 'matar-paneer', 'paneer-bhurji']
    },
    {
      id: 'banana-leaf',
      ingredient: 'Banana Leaf',
      emoji: '🌱',
      title: 'Ingredient Spotlight',
      subtitle: 'Steamed and wrapped',
      dishTitles: ['Kerala Fish Pollichathu', 'Ela Ada', 'Bhetki Paturi'],
      recipeSlugs: ['kerala-fish-pollichathu', 'ela-ada', 'bhetki-paturi']
    },
    {
      id: 'millets',
      ingredient: 'Millets',
      emoji: '🌾',
      title: 'Ingredient Spotlight',
      subtitle: 'Everyday grains',
      dishTitles: ['Millet Soup', 'Millet Salad', 'Ragi Sangati'],
      recipeSlugs: ['millet-soup', 'millet-salad', 'ragi-sangati']
    },
    {
      id: 'mango',
      ingredient: 'Mango',
      emoji: '🥭',
      title: 'Ingredient Spotlight',
      subtitle: 'Sweet and cooling',
      dishTitles: ['Mango Lassi', 'Mango Salad', 'Aam Panna'],
      recipeSlugs: ['mango-lassi', 'mango-salad', 'aam-panna']
    }
  ];

  global.TomoIngredientSpotlightEntries = spotlightEntries;
  if (typeof module !== 'undefined') module.exports = spotlightEntries;
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
