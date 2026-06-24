#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_REVIEW_DIR = 'frontend/assets/images/_generated-review';
const DISH_DIR = 'frontend/assets/images/dishes';
const BACKEND_RECIPES = 'database/generated/recipes.json';
const FRONTEND_RECIPES = 'frontend/local-recipes.js';

function argValue(name, fallback = '') {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function imagePathExists(imageUrl) {
  const value = String(imageUrl || '').split('?')[0].replace(/^\//, '');
  return value ? fs.existsSync(path.join(ROOT, 'frontend', value)) : false;
}

function isPlaceholderImage(imageUrl) {
  return /placeholder|default|home-bowl|common-kitchen/i.test(String(imageUrl || ''));
}

function readFrontendRecipes() {
  const text = fs.readFileSync(path.join(ROOT, FRONTEND_RECIPES), 'utf8');
  const start = text.indexOf('[');
  const end = text.lastIndexOf('];');
  if (start < 0 || end < 0) throw new Error(`Could not parse ${FRONTEND_RECIPES}`);
  return JSON.parse(text.slice(start, end + 1));
}

function readRecipes() {
  return {
    backend: JSON.parse(fs.readFileSync(path.join(ROOT, BACKEND_RECIPES), 'utf8')),
    frontend: readFrontendRecipes(),
  };
}

function reviewFiles(reviewDir) {
  const absolute = path.join(ROOT, reviewDir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute)
    .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
    .sort()
    .map((name) => ({
      name,
      slug: slugify(path.basename(name, path.extname(name))),
      relativePath: path.join(reviewDir, name),
      absolutePath: path.join(absolute, name),
      sizeBytes: fs.statSync(path.join(absolute, name)).size,
    }));
}

function recipeTitle(recipe) {
  return recipe.title || recipe.name || '';
}

function recipeImage(recipe) {
  return recipe.imageUrl || recipe.image_url || recipe.image || '';
}

function main() {
  const reviewDir = argValue('review-dir', DEFAULT_REVIEW_DIR);
  const batchName = argValue('batch', 'image-review-batch');
  const { backend, frontend } = readRecipes();
  const frontendByTitle = new Map(frontend.map((recipe) => [recipeTitle(recipe).toLowerCase(), recipe]));
  const files = reviewFiles(reviewDir);
  const matchedRecipeIds = new Set();

  const rows = files.map((file) => {
    const backendMatches = backend.filter((recipe) => slugify(recipeTitle(recipe)) === file.slug);
    const recipe = backendMatches[0] || null;
    if (recipe?.id) matchedRecipeIds.add(recipe.id);
    const front = recipe ? frontendByTitle.get(recipeTitle(recipe).toLowerCase()) : null;
    const currentBackendImage = recipe ? recipeImage(recipe) : '';
    const currentFrontendImage = front ? recipeImage(front) : '';
    const expectedFinalPath = `/assets/images/dishes/${file.slug}.png`;
    const destinationRelative = path.join(DISH_DIR, `${file.slug}.png`);
    const destinationExists = fs.existsSync(path.join(ROOT, destinationRelative));

    return {
      file: file.relativePath,
      slug: file.slug,
      sizeBytes: file.sizeBytes,
      recipeTitle: recipe ? recipeTitle(recipe) : '',
      matchStatus: backendMatches.length === 1 ? 'MATCH' : backendMatches.length > 1 ? 'MULTIPLE_MATCHES' : 'NO_MATCH',
      currentBackendImage,
      currentFrontendImage,
      currentPathParity: currentBackendImage === currentFrontendImage,
      currentImageExists: imagePathExists(currentBackendImage),
      currentIsPlaceholder: isPlaceholderImage(currentBackendImage),
      expectedFinalPath,
      destinationExists,
      destinationOverwriteRisk: destinationExists && currentBackendImage !== expectedFinalPath,
    };
  });

  const unmatchedRecipes = backend
    .filter((recipe) => !matchedRecipeIds.has(recipe.id))
    .filter((recipe) => isPlaceholderImage(recipeImage(recipe)))
    .map((recipe) => ({
      title: recipeTitle(recipe),
      slug: slugify(recipeTitle(recipe)),
      currentImage: recipeImage(recipe),
      collectionHome: recipe.collectionHome || null,
    }));

  const summary = {
    batchName,
    reviewDir,
    reviewFileCount: files.length,
    matchedCount: rows.filter((row) => row.matchStatus === 'MATCH').length,
    noMatchCount: rows.filter((row) => row.matchStatus === 'NO_MATCH').length,
    multipleMatchCount: rows.filter((row) => row.matchStatus === 'MULTIPLE_MATCHES').length,
    overwriteRiskCount: rows.filter((row) => row.destinationOverwriteRisk).length,
  };

  const output = { summary, rows, placeholderRecipesNotInReview: unmatchedRecipes };

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(output, null, 2));
    return;
  }

  console.log(`# ${batchName}`);
  console.log('');
  console.log(`Review folder: ${reviewDir}`);
  console.log(`Review files: ${summary.reviewFileCount}`);
  console.log(`Matched recipes: ${summary.matchedCount}`);
  console.log(`No match: ${summary.noMatchCount}`);
  console.log(`Multiple matches: ${summary.multipleMatchCount}`);
  console.log(`Destination overwrite risks: ${summary.overwriteRiskCount}`);
  console.log('');
  console.log('| File | Match | Recipe | Current image | Expected final path | Destination exists |');
  console.log('|---|---|---|---|---|---:|');
  rows.forEach((row) => {
    console.log(`| ${row.file} | ${row.matchStatus} | ${row.recipeTitle || '—'} | ${row.currentBackendImage || '—'} | ${row.expectedFinalPath} | ${row.destinationExists ? 'yes' : 'no'} |`);
  });
  console.log('');
  console.log('Tip: this script is read-only. Copy approved files and update recipe mappings only after visual style review.');
}

main();
