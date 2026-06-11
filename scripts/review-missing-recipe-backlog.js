const fs = require('fs');
const path = require('path');
const { runPantryRecommendationAudit } = require('./pantry-recommendation-audit.js');

const root = path.resolve(__dirname, '..');
const outputJson = path.join(root, 'missing-recipe-backlog-review.json');
const outputMarkdown = path.join(root, 'missing-recipe-backlog-review.md');

const classifications = {
  'Carrot Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real home-style rice variation, but less expected than pulao, lemon rice, or tomato rice.'
  },
  'Veg Rice': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Veg Fried Rice', 'Veg Pulao'],
    reason: '“Veg Rice” is a generic family name already represented by two recognizable vegetable-rice dishes.'
  },
  'Peas Pulao': {
    classification: 'MUST_ADD',
    reason: 'A very common Indian home and restaurant dish that users will expect for rice and green peas.'
  },
  'Mushroom Rice': {
    classification: 'MUST_ADD',
    reason: 'A common, recognizable rice dish and a clear pantry match for rice and mushroom.'
  },
  'Fish Rice': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Fish Curry Rice'],
    reason: 'Fish Curry Rice is the clearer, more recognizable expression of the same fish-and-rice meal.'
  },
  'Mutton Pulao': {
    classification: 'MUST_ADD',
    reason: 'A widely recognized Indian rice dish and an expected result for rice and mutton.'
  },
  'Garlic Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real and useful rice variation, but lower priority than staple pulao and regional rice dishes.'
  },
  'Coriander Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real herb rice variation, but not a critical launch expectation.'
  },
  'Mint Rice': {
    classification: 'MUST_ADD',
    reason: 'Pudina rice is common, recognizable, and a strong pantry result for rice and mint.'
  },
  'Spinach Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A valid home-style dish, but lower-frequency than major rice staples.'
  },
  'Beetroot Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real lunch-box style rice variation, but a lower-priority database addition.'
  },
  'Corn Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A recognizable quick rice dish, but not essential for launch coverage.'
  },
  'Soya Fried Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real protein-forward fried rice variation, but less universal than vegetable or egg fried rice.'
  },
  'Palak Paratha': {
    classification: 'MUST_ADD',
    reason: 'A common Indian flatbread and an obvious result for wheat flour and spinach.'
  },
  'Garlic Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'A valid flavored paratha, but lower priority than stuffed vegetable parathas.'
  },
  'Beetroot Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real lunch-box variation, but not a core user expectation.'
  },
  'Carrot Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'A valid vegetable paratha, but relatively niche.'
  },
  'Mooli Paratha': {
    classification: 'MUST_ADD',
    reason: 'A classic and widely recognized stuffed paratha.'
  },
  'Cabbage Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real stuffed paratha variation, but less common than aloo, paneer, palak, methi, or mooli.'
  },
  'Cheese Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'Recognizable and family-friendly, but not a foundational pantry recipe.'
  },
  'Corn Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'A valid modern paratha variation, but lower priority.'
  },
  'Peas Paratha': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real seasonal stuffed paratha, but less universally expected.'
  },
  'Sweet Holige': {
    classification: 'MUST_ADD',
    reason: 'Holige/obbattu is a well-established regional sweet flatbread and should not be replaced by plain chapati.'
  },
  'Cheese Dosa': {
    classification: 'NICE_TO_HAVE',
    reason: 'A recognizable modern dosa variation, but lower priority than masala, onion, paneer, and egg dosa.'
  },
  'Cheese Uttapam': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real modern variation, but not essential to core South Indian coverage.'
  },
  'Paneer Mushroom Masala': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real restaurant-style combination, but lower priority than kadai, matar, palak, and bhurji.'
  },
  'Corn Paneer Masala': {
    classification: 'NICE_TO_HAVE',
    reason: 'A plausible and recognized paneer-corn curry, but comparatively niche.'
  },
  'Cheesy Paneer Tikka': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real fusion variation, but not required for reliable pantry coverage.'
  },
  'Garlic Paneer': {
    classification: 'NICE_TO_HAVE',
    reason: 'A recognizable Indo-Chinese style paneer dish, but lower priority than mainstream paneer curries.'
  },
  'Onion Omelette': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Egg Bhurji'],
    reason: 'Egg Bhurji already uses egg and onion as core ingredients and satisfies the same quick breakfast intent.'
  },
  'Tomato Omelette': {
    classification: 'NICE_TO_HAVE',
    reason: 'A valid egg-and-tomato omelette, but the name can also mean a besan-based dish regionally, so it needs careful naming.'
  },
  'Spanish Omelette': {
    classification: 'NICE_TO_HAVE',
    reason: 'A globally recognized egg-and-potato dish, but secondary to Indian breakfast coverage.'
  },
  'Spinach Omelette': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real protein breakfast variation, but not essential for launch.'
  },
  'Paneer Omelette': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real high-protein variation, but comparatively niche.'
  },
  'Chicken Fry': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Andhra Kodi Vepudu', 'Guntur Chicken Fry'],
    reason: 'The database already contains two specific, recognizable chicken fry dishes.'
  },
  'Chicken Egg Fried Rice': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Chicken Fried Rice'],
    reason: 'Chicken Fried Rice already lists egg as an optional ingredient and covers this pantry intent.'
  },
  'Chicken Potato Curry': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real home-style curry, but lower priority than standard chicken curry and fried preparations.'
  },
  'Chicken Mushroom Stir Fry': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real stir-fry combination, but lower priority for an Indian home-cooking launch set.'
  },
  'Coriander Chicken': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real herb-forward chicken preparation, but the name and style are less standardized.'
  },
  'Mint Chicken': {
    classification: 'NICE_TO_HAVE',
    reason: 'A recognized pudina chicken variation, but lower priority than core chicken dishes.'
  },
  'Kanda Poha': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Poha', 'Avalakki'],
    reason: 'Poha and Avalakki already use poha and onion as core ingredients; Kanda Poha is the regional name for that preparation.'
  },
  'Batata Poha': {
    classification: 'MUST_ADD',
    reason: 'A widely recognized poha variation and the obvious match for poha and potato.'
  },
  'Peanut Poha': {
    classification: 'NICE_TO_HAVE',
    reason: 'Poha already includes peanuts as optional, but a peanut-forward version could be useful later.'
  },
  'Rava Upma': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Instant Rava Upma', 'Upma'],
    reason: 'Both existing dishes already use rava and onion as core ingredients.'
  },
  'Tomato Upma': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real upma variation, but lower priority than standard and vegetable upma.'
  },
  'Vegetable Upma': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Upma'],
    reason: 'The existing Upma recipe already includes vegetables such as carrot as supporting ingredients; metadata can be broadened instead of adding a duplicate.'
  },
  'Coconut Avalakki': {
    classification: 'NICE_TO_HAVE',
    reason: 'A recognized regional poha preparation, but lower priority than kanda and batata poha.'
  },
  'Avalakki Uppittu': {
    classification: 'ALREADY_COVERED_BY_SIMILAR_DISH',
    coveredBy: ['Avalakki', 'Poha'],
    reason: 'Avalakki Uppittu is already represented by the existing onion-based Avalakki/Poha preparation.'
  },
  'Sweet Rice': {
    classification: 'NICE_TO_HAVE',
    reason: 'A real sweet rice preparation, but it should not be conflated with Sweet Pongal, which requires moong dal.'
  }
};

function getMissingRows() {
  const originalLog = console.log;
  const originalTable = console.table;
  try {
    console.log = () => {};
    console.table = () => {};
    return runPantryRecommendationAudit().filter((row) => row.status === 'MISSING_RECIPE');
  } finally {
    console.log = originalLog;
    console.table = originalTable;
  }
}

function markdownTable(rows, includeCoverage = false) {
  const headers = includeCoverage
    ? '| Missing recipe | Pantry pair | Covered by | Reason |'
    : '| Recipe | Pantry pair | Reason |';
  const divider = includeCoverage
    ? '|---|---|---|---|'
    : '|---|---|---|';
  const body = rows.map((row) => {
    if (includeCoverage) {
      return `| ${row.recipe} | ${row.pantry.join(' + ')} | ${row.coveredBy.join(', ')} | ${row.reason} |`;
    }
    return `| ${row.recipe} | ${row.pantry.join(' + ')} | ${row.reason} |`;
  });
  return [headers, divider, ...body].join('\n');
}

function runMissingRecipeBacklogReview() {
  const missingRows = getMissingRows();
  const reviewed = missingRows.map((row) => {
    const review = classifications[row.expected];
    if (!review) {
      throw new Error(`Missing backlog classification for ${row.expected}`);
    }
    return {
      recipe: row.expected,
      pantry: row.pantry,
      currentTopRecommendation: row.topRecommendation,
      currentScore: row.score,
      classification: review.classification,
      coveredBy: review.coveredBy || [],
      reason: review.reason
    };
  });

  const mustAdd = reviewed.filter((row) => row.classification === 'MUST_ADD');
  const niceToHave = reviewed.filter((row) => row.classification === 'NICE_TO_HAVE');
  const covered = reviewed.filter((row) => row.classification === 'ALREADY_COVERED_BY_SIMILAR_DISH');

  const report = {
    generatedAt: new Date().toISOString(),
    sourceBacklogCount: missingRows.length,
    summary: {
      MUST_ADD: mustAdd.length,
      NICE_TO_HAVE: niceToHave.length,
      ALREADY_COVERED_BY_SIMILAR_DISH: covered.length
    },
    mustAdd,
    niceToHave,
    coveredByExistingDish: covered,
    allReviewed: reviewed
  };

  const markdown = [
    '# Missing Recipe Backlog Review',
    '',
    `Reviewed **${missingRows.length}** current MISSING_RECIPE rows.`,
    '',
    'No recipes were added or modified by this review.',
    '',
    '## Summary',
    '',
    '| Classification | Count |',
    '|---|---:|',
    `| MUST_ADD | ${mustAdd.length} |`,
    `| NICE_TO_HAVE | ${niceToHave.length} |`,
    `| ALREADY_COVERED_BY_SIMILAR_DISH | ${covered.length} |`,
    '',
    '## Must Add List',
    '',
    markdownTable(mustAdd),
    '',
    '## Nice To Have List',
    '',
    markdownTable(niceToHave),
    '',
    '## Covered By Existing Dish List',
    '',
    markdownTable(covered, true),
    ''
  ].join('\n');

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMarkdown, markdown);

  console.log('\nMissing Recipe Backlog Review');
  console.table([
    { classification: 'MUST_ADD', count: mustAdd.length },
    { classification: 'NICE_TO_HAVE', count: niceToHave.length },
    { classification: 'ALREADY_COVERED_BY_SIMILAR_DISH', count: covered.length },
    { classification: 'TOTAL', count: reviewed.length }
  ]);
  console.log(`\nGenerated ${path.relative(root, outputJson)}`);
  console.log(`Generated ${path.relative(root, outputMarkdown)}`);
  return report;
}

if (require.main === module) runMissingRecipeBacklogReview();

module.exports = { runMissingRecipeBacklogReview };
