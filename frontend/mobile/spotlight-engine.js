(function spotlightEngine(global) {
  function dayOfYear(date = new Date()) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
    return Math.floor(diff / 86400000);
  }

  function getTodaysSpotlight(entries = global.TomoIngredientSpotlightEntries || [], date = new Date()) {
    if (!Array.isArray(entries) || !entries.length) return null;
    return entries[dayOfYear(date) % entries.length] || entries[0];
  }

  global.TomoSpotlightEngine = { getTodaysSpotlight, dayOfYear };
  global.getTodaysSpotlight = getTodaysSpotlight;

  if (typeof module !== 'undefined') {
    module.exports = { getTodaysSpotlight, dayOfYear };
  }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
