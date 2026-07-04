const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

const rootDir = path.resolve(__dirname, '..');
const frontendDir = path.join(rootDir, 'frontend');
const manifestPath = path.join(frontendDir, 'mobile', 'image-derivatives.js');
const sourceRoots = [frontendDir, path.join(rootDir, 'database', 'generated')];
const sourceExtensions = new Set(['.js', '.json', '.html', '.css']);
const imageReferencePattern = /(?:\/assets\/images\/|assets\/images\/)[^'"`\s)>]+?\.(?:png|jpe?g|webp)(?:\?[^'"`\s)>]+)?/gi;

function walkSourceFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (filePath.startsWith(path.join(frontendDir, 'assets'))) continue;
      walkSourceFiles(filePath, files);
      continue;
    }
    if (sourceExtensions.has(path.extname(entry.name).toLowerCase()) && filePath !== manifestPath) files.push(filePath);
  }
  return files;
}

function referencedImages() {
  const references = new Set();
  sourceRoots.flatMap((directory) => walkSourceFiles(directory)).forEach((filePath) => {
    const source = fs.readFileSync(filePath, 'utf8');
    for (const match of source.matchAll(imageReferencePattern)) {
      const normalized = `/${match[0].replace(/^\//, '').split('?')[0]}`;
      if (!/\.(?:card|hero)\.webp$/i.test(normalized)) references.add(normalized);
    }
  });
  return [...references].sort();
}

function derivativePath(sourcePath, variant) {
  return `${sourcePath}.${variant}.webp`;
}

async function writeDerivative(sourcePath, outputPath, width, quality) {
  const temporaryPath = `${outputPath}.tmp-${process.pid}`;
  await sharp(sourcePath, { failOn: 'warning' })
    .rotate()
    .resize({ width, withoutEnlargement: true, fit: 'inside' })
    .webp({ quality, effort: 5, smartSubsample: true })
    .toFile(temporaryPath);
  fs.renameSync(temporaryPath, outputPath);
}

async function build() {
  const references = referencedImages();
  const manifest = {};
  const missing = [];
  const failures = [];
  const generatedFiles = [];
  let beforeBytes = 0;
  let afterCardBytes = 0;
  let afterHeroBytes = 0;

  for (const reference of references) {
    const sourcePath = path.join(frontendDir, reference);
    if (!fs.existsSync(sourcePath)) {
      missing.push(reference);
      continue;
    }
    const sourceStats = fs.statSync(sourcePath);
    beforeBytes += sourceStats.size;
    const cardPath = derivativePath(sourcePath, 'card');
    const heroPath = derivativePath(sourcePath, 'hero');
    try {
      await writeDerivative(sourcePath, cardPath, 600, 82);
      await writeDerivative(sourcePath, heroPath, 1200, 84);
      let cardBytes = fs.statSync(cardPath).size;
      let heroBytes = fs.statSync(heroPath).size;
      if (cardBytes > 250 * 1024) {
        await writeDerivative(sourcePath, cardPath, 600, 80);
        cardBytes = fs.statSync(cardPath).size;
      }
      if (heroBytes > 400 * 1024) {
        await writeDerivative(sourcePath, heroPath, 1200, 80);
        heroBytes = fs.statSync(heroPath).size;
      }
      const cardReference = `${reference}.card.webp`;
      const heroReference = `${reference}.hero.webp`;
      manifest[reference] = { card: cardReference, hero: heroReference };
      generatedFiles.push(cardReference, heroReference);
      afterCardBytes += cardBytes;
      afterHeroBytes += heroBytes;
    } catch (error) {
      failures.push({ reference, error: error.message });
    }
  }

  const manifestSource = `window.TOMO_OPTIMIZED_IMAGES = ${JSON.stringify(manifest, null, 2)};\n`;
  fs.writeFileSync(manifestPath, manifestSource);

  const sizes = generatedFiles.map((reference) => {
    const filePath = path.join(frontendDir, reference);
    return { reference, bytes: fs.statSync(filePath).size };
  }).sort((a, b) => b.bytes - a.bytes);

  const summary = {
    referencesFound: references.length,
    sourceImagesOptimized: Object.keys(manifest).length,
    generatedImages: generatedFiles.length,
    missingReferences: missing,
    failures,
    beforeBytes,
    afterCardBytes,
    afterHeroBytes,
    cardImagesAbove250KB: sizes.filter((item) => item.reference.endsWith('.card.webp') && item.bytes > 250 * 1024).length,
    heroImagesAbove400KB: sizes.filter((item) => item.reference.endsWith('.hero.webp') && item.bytes > 400 * 1024).length,
    largestGeneratedImages: sizes.slice(0, 20),
  };
  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
