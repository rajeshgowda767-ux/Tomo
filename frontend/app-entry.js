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

async function renderDesktopApp(root) {
  loadStylesheet('styles.css?v=hero-collection-polish-40');
  loadStylesheet('final-overrides.css?v=hero-collection-polish-40');

  const response = await fetch('desktop-reference.html');
  if (!response.ok) throw new Error(`Desktop shell failed to load: ${response.status}`);

  const page = new DOMParser().parseFromString(await response.text(), 'text/html');
  page.querySelectorAll('script').forEach((script) => script.remove());
  root.replaceChildren(...page.body.children);
  await loadScript('app.js?v=render-path-proof-1');
}

function startApp() {
  const root = document.querySelector('#appRoot');
  const isMobile = window.innerWidth <= 768;
  const forceMobileV2 = window.location.hash.includes('#mobile-v2');

  if (isMobile || forceMobileV2) {
    root.innerHTML = '';
    loadStylesheet('mobile/mobile-v2.css?v=mobile-v2-discover-regression-fix-1');
    window.renderMobileV2App(root);
    return;
  }

  renderDesktopApp(root);
}

startApp();
