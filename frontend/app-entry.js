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

const appEntryScript = document.currentScript;
const appBasePath = appEntryScript
  ? new URL('./', appEntryScript.src).pathname
  : '/frontend/';

function appPath(path) {
  return `${appBasePath}${path}`.replace(/\/{2,}/g, '/');
}

let fullRecipeDataPromise = null;
let planEnginePromise = null;

function loadFullRecipeData() {
  if (window.__TOMO_FULL_RECIPE_DATA_LOADED__) {
    return Promise.resolve(window.COOKBUDDY_LOCAL_RECIPES || []);
  }
  if (!fullRecipeDataPromise) {
    fullRecipeDataPromise = loadScript(appPath('local-recipes.js?v=mobile-mushroom-pulao-image-104')).then(() => {
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
    planEnginePromise = loadScript(appPath('mobile/plan-engine.js?v=beta4-plan-foundation-1'))
      .then(() => window.TOMO_PLAN_ENGINE);
  }
  return planEnginePromise;
}

window.TomoLoadPlanEngine = loadPlanEngine;

function startApp() {
  const root = document.querySelector('#appRoot');
  root.innerHTML = '';
  loadStylesheet(appPath('mobile/mobile-v2.css?v=beta4-mascot-polish-1'));
  window.renderMobileV2App(root);
}

startApp();
