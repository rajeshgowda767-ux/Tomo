function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.append(script);
  });
}

let fullRecipeDataPromise = null;
let planEnginePromise = null;

function loadFullRecipeData() {
  if (window.__TOMO_FULL_RECIPE_DATA_LOADED__) {
    return Promise.resolve(window.COOKBUDDY_LOCAL_RECIPES || []);
  }
  if (!fullRecipeDataPromise) {
    fullRecipeDataPromise = loadScript('local-recipes.js?v=mobile-mushroom-pulao-image-104').then(() => {
      window.__TOMO_FULL_RECIPE_DATA_LOADED__ = true;
      return window.COOKBUDDY_LOCAL_RECIPES || [];
    });
  }
  return fullRecipeDataPromise;
}

window.TomoLoadFullRecipeData = loadFullRecipeData;

function loadPlanEngine() {
  if (window.TOMO_PLAN_ENGINE) return Promise.resolve(window.TOMO_PLAN_ENGINE);
  if (!planEnginePromise) {
    planEnginePromise = loadScript('mobile/plan-engine.js?v=beta4-plan-foundation-1')
      .then(() => window.TOMO_PLAN_ENGINE);
  }
  return planEnginePromise;
}

window.TomoLoadPlanEngine = loadPlanEngine;

async function renderDesktopApp(root) {
  loadStylesheet('styles.css?v=hero-content-groups-8');
  loadStylesheet('final-overrides.css?v=hero-content-groups-8');

  await Promise.all([
    loadFullRecipeData(),
    window.COOKBUDDY_LOCAL_COLLECTIONS
      ? Promise.resolve()
      : loadScript('local-collections.js?v=recommendation-image-pack-1')
  ]);

  const response = await fetch('desktop-reference.html');
  if (!response.ok) throw new Error(`Desktop shell failed to load: ${response.status}`);

  const page = new DOMParser().parseFromString(await response.text(), 'text/html');
  page.querySelectorAll('script').forEach((script) => script.remove());
  root.replaceChildren(...page.body.children);
  await loadScript('app.js?v=hero-content-groups-8');
}

let currentAppMode = '';
let resizeTimer = null;

function startApp() {
  const root = document.querySelector('#appRoot');
  const isMobile = window.innerWidth <= 768;
  const forceMobileV2 = window.location.hash.includes('#mobile-v2');
  const nextMode = isMobile || forceMobileV2 ? 'mobile' : 'desktop';

  if (currentAppMode === nextMode) return;
  currentAppMode = nextMode;

  if (nextMode === 'mobile') {
    root.innerHTML = '';
    loadStylesheet('mobile/mobile-v2.css?v=beta4-mascot-polish-1');
    window.renderMobileV2App(root);
    return;
  }

  renderDesktopApp(root);
}

startApp();

window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(startApp, 120);
});

window.addEventListener('hashchange', startApp);
