#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BACKEND_RECIPES = 'database/generated/recipes.json';
const FRONTEND_RECIPES = 'frontend/local-recipes.js';
const DISH_DIR = 'frontend/assets/images/dishes';
const DEFAULT_REVIEW_DIR = 'frontend/assets/images/_generated-review';
const REPORT_DIR = 'notes/backlog';
const P0_IMAGE_PLAN = 'notes/backlog/beta-3-p0-image-production-plan.md';
const P0_IMAGE_BRIEFS = 'notes/backlog/p0-image-generation-briefs.json';
const CATALOG_HEALTH_AUDIT = 'notes/backlog/beta-3-catalog-health-audit.json';
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

const KNOWN_GENERIC_IMAGES = new Set([
  '/assets/images/dishes/homestyle-kitchen-placeholder.png',
  '/assets/images/dishes/common-kitchen-placeholder.png',
  '/assets/images/dishes/breakfast-default.png',
  '/assets/images/dishes/lunch-default.png',
  '/assets/images/dishes/dinner-default.png',
  '/assets/images/dishes/home-bowl.png',
  '/assets/images/collections/soups.webp',
  '/assets/images/collections/desserts.webp',
  '/assets/images/collections/festival-food.webp',
  '/assets/images/dishes/fish-curry.png',
  '/assets/images/dishes/chicken-curry.png',
  '/assets/images/dishes/dosa-homestyle.png',
  '/assets/images/dishes/paratha.png',
  '/assets/images/dishes/recommendation-pack-pepper-rasam.png',
  '/assets/images/snacks/bhel-puri.png',
]);

function argValue(name, fallback = '') {
  const prefix = `--${name}=`;
  const match = process.argv.find((arg) => arg.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function recipeTitle(recipe) {
  return recipe.title || recipe.name || '';
}

function recipeSlug(recipe) {
  return slugify(recipe.slug || recipe.sourceId || recipe.id || recipeTitle(recipe));
}

function recipeMatchKeys(recipe) {
  return [
    recipe.slug,
    recipe.sourceId,
    recipe.id,
    recipeTitle(recipe),
  ].map(slugify).filter(Boolean);
}

function recipeImage(recipe) {
  return recipe.imageUrl || recipe.image_url || recipe.image || '';
}

function relativeFromRoot(...parts) {
  return path.join(ROOT, ...parts);
}

function webImageToFrontendPath(imageUrl) {
  const clean = String(imageUrl || '').split('?')[0].replace(/^\//, '');
  if (!clean) return '';
  return path.join(ROOT, 'frontend', clean.replace(/^assets\//, 'assets/'));
}

function imageExists(imageUrl) {
  const localPath = webImageToFrontendPath(imageUrl);
  return localPath ? fs.existsSync(localPath) : false;
}

function readFrontendRecipesWithWrapper() {
  const fullPath = relativeFromRoot(FRONTEND_RECIPES);
  const text = fs.readFileSync(fullPath, 'utf8');
  const start = text.indexOf('[');
  const end = text.lastIndexOf('];');
  if (start < 0 || end < 0) {
    throw new Error(`Could not parse ${FRONTEND_RECIPES}`);
  }
  return {
    fullPath,
    prefix: text.slice(0, start),
    recipes: JSON.parse(text.slice(start, end + 1)),
    suffix: text.slice(end + 2),
  };
}

function readCatalogs() {
  const backendPath = relativeFromRoot(BACKEND_RECIPES);
  return {
    backendPath,
    backend: JSON.parse(fs.readFileSync(backendPath, 'utf8')),
    frontend: readFrontendRecipesWithWrapper(),
  };
}

function writeCatalogs(catalogs) {
  fs.writeFileSync(catalogs.backendPath, JSON.stringify(catalogs.backend, null, 2) + '\n');
  fs.writeFileSync(
    catalogs.frontend.fullPath,
    catalogs.frontend.prefix + JSON.stringify(catalogs.frontend.recipes, null, 2) + ';' + catalogs.frontend.suffix,
  );
}

function reviewFiles(reviewDir) {
  const absolute = relativeFromRoot(reviewDir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .filter((entry) => IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((entry) => {
      const ext = path.extname(entry.name);
      const slug = slugify(path.basename(entry.name, ext));
      const absolutePath = path.join(absolute, entry.name);
      return {
        name: entry.name,
        slug,
        extension: ext.toLowerCase(),
        relativePath: path.join(reviewDir, entry.name),
        absolutePath,
        sizeBytes: fs.statSync(absolutePath).size,
      };
    });
}

function imageUsageCounts(recipes) {
  const counts = new Map();
  recipes.forEach((recipe) => {
    const image = recipeImage(recipe);
    if (image) counts.set(image, (counts.get(image) || 0) + 1);
  });
  return counts;
}

function loadP0ImageDebtSlugs() {
  const planPath = relativeFromRoot(P0_IMAGE_PLAN);
  const slugs = new Set();
  if (!fs.existsSync(planPath)) return slugs;

  const text = fs.readFileSync(planPath, 'utf8');
  text.split('\n').forEach((line) => {
    if (!line.includes('|')) return;
    const columns = line.split('|').slice(1, -1).map((column) => column.trim());
    if (columns.length < 2) return;
    const firstColumn = String(columns[0] || '').toLowerCase();
    const secondColumn = String(columns[1] || '').toLowerCase();
    if (firstColumn === 'title' || firstColumn === 'recipe' || secondColumn === 'slug') return;
    if (/^-+$/.test(firstColumn) || /^-+$/.test(secondColumn)) return;

    const slug = slugify(columns[1]);
    if (slug) slugs.add(slug);
  });

  return slugs;
}

function loadCatalogHealthDebtImages() {
  const auditPath = relativeFromRoot(CATALOG_HEALTH_AUDIT);
  const images = new Set();
  if (!fs.existsSync(auditPath)) return images;

  try {
    const audit = JSON.parse(fs.readFileSync(auditPath, 'utf8'));
    const priorities = Array.isArray(audit.topImageReplacementPriorities)
      ? audit.topImageReplacementPriorities
      : [];
    priorities.forEach((entry) => {
      const imageType = String(entry.imageType || '').toLowerCase();
      if (['placeholder', 'generic', 'shared'].includes(imageType) && entry.imageUrl) {
        images.add(entry.imageUrl);
      }
    });
  } catch (error) {
    console.warn(`Warning: could not read ${CATALOG_HEALTH_AUDIT}: ${error.message}`);
  }

  return images;
}

function loadBriefMappings(batchName) {
  const briefsPath = relativeFromRoot(P0_IMAGE_BRIEFS);
  const byFileName = new Map();
  const bySlug = new Map();
  if (!fs.existsSync(briefsPath)) return { byFileName, bySlug };

  try {
    const data = JSON.parse(fs.readFileSync(briefsPath, 'utf8'));
    const batches = Array.isArray(data.batches) ? data.batches : [];
    batches.forEach((batch) => {
      const items = Array.isArray(batch.items) ? batch.items : [];
      items.forEach((item) => {
        const recipeSlugValue = slugify(item.recipeSlug || item.slug || item.sourceId || item.id || item.title);
        const destinationPath = item.intendedDestinationImagePath || item.destinationImagePath || item.destination || '';
        const destinationFile = path.basename(destinationPath);
        const destinationSlug = slugify(path.basename(destinationFile, path.extname(destinationFile)));
        const mapping = {
          batch: batch.id || '',
          title: item.title || '',
          recipeSlug: recipeSlugValue,
          fileName: destinationFile,
          fileSlug: destinationSlug,
        };
        if (!recipeSlugValue) return;
        if (destinationFile) byFileName.set(destinationFile, mapping);
        if (destinationSlug) bySlug.set(destinationSlug, mapping);
      });
    });
  } catch (error) {
    console.warn(`Warning: could not read ${P0_IMAGE_BRIEFS}: ${error.message}`);
  }

  return { byFileName, bySlug };
}

function imageDebtClassification(imageUrl, usageCounts, catalogHealthDebtImages, isP0DebtRecipe) {
  const image = String(imageUrl || '');
  const usageCount = usageCounts.get(image) || 0;

  if (!image) {
    return {
      importable: true,
      status: 'IMPORTABLE_PLACEHOLDER',
      reason: 'Recipe has no current image path; treating as placeholder debt.',
    };
  }
  if (/placeholder/i.test(image)) {
    return {
      importable: true,
      status: 'IMPORTABLE_PLACEHOLDER',
      reason: 'Current image is a placeholder; safe to replace.',
    };
  }
  if (/default|home-bowl|common-kitchen/i.test(image)) {
    return {
      importable: true,
      status: 'IMPORTABLE_GENERIC',
      reason: 'Current image is a generic/default fallback; safe to replace.',
    };
  }
  if (/\/assets\/images\/collections\/(soups|desserts|festival-food)\.webp$/i.test(image)) {
    return {
      importable: true,
      status: 'IMPORTABLE_GENERIC',
      reason: 'Current image is a generic collection fallback; safe to replace.',
    };
  }
  if (KNOWN_GENERIC_IMAGES.has(image)) {
    return {
      importable: true,
      status: 'IMPORTABLE_GENERIC',
      reason: 'Current image is on the known generic/shared debt list; safe to replace.',
    };
  }
  if (catalogHealthDebtImages.has(image)) {
    return {
      importable: true,
      status: 'IMPORTABLE_GENERIC',
      reason: 'Catalog health audit classified this image as shared/generic debt.',
    };
  }
  if (usageCount > 10) {
    return {
      importable: true,
      status: 'IMPORTABLE_SHARED_REUSE',
      reason: `Current image is reused by ${usageCount} active recipes; safe to replace shared image debt.`,
    };
  }
  if (isP0DebtRecipe && usageCount > 1) {
    return {
      importable: true,
      status: 'IMPORTABLE_P0_DEBT',
      reason: `Recipe is in the P0 production plan and current image is shared by ${usageCount} recipes.`,
    };
  }

  return {
    importable: false,
    status: 'SKIP_DEDICATED_PROTECTED',
    reason: isP0DebtRecipe
      ? 'Recipe is in the P0 production plan, but current image appears to be a unique dedicated image. Use --force to replace.'
      : 'Current image appears to be a unique dedicated image. Use --force to replace.',
  };
}

function isImportableStatus(status) {
  return String(status || '').startsWith('IMPORTABLE_') || status === 'IMPORTABLE';
}

function groupedStatusCounts(rows) {
  return rows.reduce((counts, row) => {
    counts.set(row.status, (counts.get(row.status) || 0) + 1);
    return counts;
  }, new Map());
}

function findMatches(recipes, slug) {
  const normalized = slugify(slug);
  return recipes.filter((recipe) => recipeMatchKeys(recipe).includes(normalized));
}

function setRecipeImage(recipe, nextImage) {
  const before = {
    imageUrl: recipe.imageUrl,
    image_url: recipe.image_url,
    image: recipe.image,
  };
  if ('imageUrl' in recipe || (!('image_url' in recipe) && !('image' in recipe))) recipe.imageUrl = nextImage;
  if ('image_url' in recipe) recipe.image_url = nextImage;
  if ('image' in recipe && !('imageUrl' in recipe) && !('image_url' in recipe)) recipe.image = nextImage;
  return before;
}

function markdownEscape(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function validationCommand(command, args) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  return {
    command: [command, ...args].join(' '),
    status: result.status,
    ok: result.status === 0,
    stdout: result.stdout.trim(),
    stderr: result.stderr.trim(),
  };
}

function writeReport({ batchName, reviewDir, dryRun, force, rows, importedRows, skippedRows, reportPath, validationResults }) {
  const lines = [];
  lines.push(`# ${batchName} Image Import Report`);
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Mode: ${dryRun ? 'dry-run' : 'import'}`);
  lines.push(`Review folder: \`${reviewDir}\``);
  lines.push(`Force enabled: ${force ? 'yes' : 'no'}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Files found: ${rows.length}`);
  lines.push(`- Imported count: ${importedRows.length}`);
  lines.push(`- Skipped count: ${skippedRows.length}`);
  lines.push(`- Recipe mappings updated: ${importedRows.length}`);
  lines.push('');
  lines.push('## Status Breakdown');
  lines.push('');
  const statusCounts = groupedStatusCounts(rows);
  if (statusCounts.size) {
    lines.push('| Status | Count |');
    lines.push('|---|---:|');
    [...statusCounts.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([status, count]) => {
        lines.push(`| ${markdownEscape(status)} | ${count} |`);
      });
  } else {
    lines.push('No files found.');
  }
  lines.push('');
  lines.push('## Files Found');
  lines.push('');
  lines.push('| File | Slug | Status | Recipe | Reason |');
  lines.push('|---|---|---|---|---|');
  rows.forEach((row) => {
    lines.push(`| \`${markdownEscape(row.file)}\` | \`${markdownEscape(row.slug)}\` | ${row.status} | ${markdownEscape(row.recipeTitle || '—')} | ${markdownEscape(row.reason || '—')} |`);
  });
  lines.push('');
  lines.push('## Imported Mappings');
  lines.push('');
  if (importedRows.length) {
    lines.push('| Recipe | Source file | Destination | Before | After |');
    lines.push('|---|---|---|---|---|');
    importedRows.forEach((row) => {
      lines.push(`| ${markdownEscape(row.recipeTitle)} | \`${markdownEscape(row.file)}\` | \`${markdownEscape(row.destinationRelative)}\` | \`${markdownEscape(row.beforeImage)}\` | \`${markdownEscape(row.nextImage)}\` |`);
    });
  } else {
    lines.push('No images imported.');
  }
  lines.push('');
  lines.push('## Skipped Files');
  lines.push('');
  if (skippedRows.length) {
    lines.push('| File | Status | Recipe | Reason |');
    lines.push('|---|---|---|---|');
    skippedRows.forEach((row) => {
      lines.push(`| \`${markdownEscape(row.file)}\` | ${markdownEscape(row.status)} | ${markdownEscape(row.recipeTitle || '—')} | ${markdownEscape(row.reason)} |`);
    });
  } else {
    lines.push('No files skipped.');
  }
  lines.push('');
  const protectedRows = skippedRows.filter((row) => row.status === 'SKIP_DEDICATED_PROTECTED');
  lines.push('## Protected Dedicated Images');
  lines.push('');
  if (protectedRows.length) {
    lines.push('| Recipe | Current image | Reason |');
    lines.push('|---|---|---|');
    protectedRows.forEach((row) => {
      lines.push(`| ${markdownEscape(row.recipeTitle || row.slug)} | \`${markdownEscape(row.beforeImage || '—')}\` | ${markdownEscape(row.reason)} |`);
    });
  } else {
    lines.push('No dedicated images were protected in this run.');
  }
  lines.push('');
  const missingRows = skippedRows.filter((row) => row.status === 'SKIP_RECIPE_NOT_FOUND');
  lines.push('## Missing Recipe Matches');
  lines.push('');
  if (missingRows.length) {
    lines.push('| File | Slug | Reason |');
    lines.push('|---|---|---|');
    missingRows.forEach((row) => {
      lines.push(`| \`${markdownEscape(row.file)}\` | \`${markdownEscape(row.slug)}\` | ${markdownEscape(row.reason)} |`);
    });
  } else {
    lines.push('No missing recipe matches.');
  }
  lines.push('');
  lines.push('## Validation');
  lines.push('');
  lines.push('Commands to run:');
  lines.push('');
  lines.push('```text');
  lines.push('node scripts/validate_recipe_data.js');
  lines.push('npm run audit:banter');
  lines.push('```');
  lines.push('');
  if (dryRun) {
    lines.push('Dry run only. Validation was not run because no files were copied and no recipe files were edited.');
  } else if (validationResults.length) {
    validationResults.forEach((result) => {
      lines.push(`### \`${result.command}\``);
      lines.push('');
      lines.push(`Exit code: ${result.status}`);
      lines.push('');
      lines.push('```text');
      lines.push(result.stdout || result.stderr || '(no output)');
      lines.push('```');
      lines.push('');
      if (result.stderr && result.stdout) {
        lines.push('stderr:');
        lines.push('');
        lines.push('```text');
        lines.push(result.stderr);
        lines.push('```');
        lines.push('');
      }
    });
  } else {
    lines.push('No images were imported, so validation was not run.');
  }
  lines.push('');
  lines.push('## Safety Notes');
  lines.push('');
  lines.push('- Recipe metadata was not modified.');
  lines.push('- Collections were not modified.');
  lines.push('- Global Bites was not touched.');
  lines.push('- Review images were not deleted.');
  lines.push('- Existing dedicated images were not overwritten unless `--force` was used.');
  lines.push('');

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, lines.join('\n'));
}

function main() {
  const batchName = argValue('batch');
  const reviewDir = argValue('review-dir') || (batchName ? path.join(DEFAULT_REVIEW_DIR, batchName) : '');
  const dryRun = hasFlag('dry-run');
  const force = hasFlag('force');

  if (!batchName) {
    console.error('Usage: node scripts/import_recipe_images.js --batch=<batch-name> [--review-dir=<review-dir>] [--dry-run] [--force]');
    process.exit(1);
  }

  const catalogs = readCatalogs();
  const backendUsage = imageUsageCounts(catalogs.backend);
  const p0ImageDebtSlugs = loadP0ImageDebtSlugs();
  const catalogHealthDebtImages = loadCatalogHealthDebtImages();
  const briefMappings = loadBriefMappings(batchName);
  const files = reviewFiles(reviewDir);
  const slugCounts = files.reduce((counts, file) => {
    counts.set(file.slug, (counts.get(file.slug) || 0) + 1);
    return counts;
  }, new Map());

  const rows = files.map((file) => {
    const briefMapping = briefMappings.byFileName.get(file.name) || briefMappings.bySlug.get(file.slug) || null;
    const recipeLookupSlug = briefMapping?.recipeSlug || file.slug;
    const finalFileName = briefMapping?.fileName || `${file.slug}${file.extension}`;
    const finalSlug = slugify(path.basename(finalFileName, path.extname(finalFileName)));
    const backendMatches = findMatches(catalogs.backend, recipeLookupSlug);
    const frontendMatches = findMatches(catalogs.frontend.recipes, recipeLookupSlug);
    const destinationRelative = path.join(DISH_DIR, finalFileName);
    const destinationAbsolute = relativeFromRoot(destinationRelative);
    const nextImage = `/assets/images/dishes/${finalFileName}`;
    const duplicateSlug = (slugCounts.get(file.slug) || 0) > 1;

    const row = {
      file: file.relativePath,
      slug: recipeLookupSlug,
      fileSlug: file.slug,
      finalSlug,
      briefTitle: briefMapping?.title || '',
      briefBatch: briefMapping?.batch || '',
      finalFileName,
      sourceAbsolute: file.absolutePath,
      destinationRelative,
      destinationAbsolute,
      nextImage,
      status: 'SKIP',
      reason: '',
      recipeTitle: '',
      beforeImage: '',
      currentFrontendImage: '',
      currentImageUsage: 0,
      isP0DebtRecipe: false,
    };

    if (duplicateSlug) {
      row.status = 'SKIP_DUPLICATE_REVIEW_FILE';
      row.reason = 'Duplicate filename/slug in review folder.';
      return row;
    }
    if (backendMatches.length !== 1) {
      row.status = 'SKIP_RECIPE_NOT_FOUND';
      row.reason = backendMatches.length === 0 ? 'No matching backend recipe slug.' : 'Multiple backend recipe matches.';
      return row;
    }
    if (frontendMatches.length !== 1) {
      row.status = 'SKIP_RECIPE_NOT_FOUND';
      row.reason = frontendMatches.length === 0 ? 'No matching frontend recipe slug.' : 'Multiple frontend recipe matches.';
      return row;
    }

    const backendRecipe = backendMatches[0];
    const frontendRecipe = frontendMatches[0];
    row.recipeTitle = recipeTitle(backendRecipe);
    row.beforeImage = recipeImage(backendRecipe);
    row.currentFrontendImage = recipeImage(frontendRecipe);
    row.currentImageUsage = backendUsage.get(row.beforeImage) || 0;
    row.isP0DebtRecipe = p0ImageDebtSlugs.has(recipeLookupSlug) || p0ImageDebtSlugs.has(file.slug);

    if (row.beforeImage !== row.currentFrontendImage) {
      row.status = 'SKIP_BACKEND_FRONTEND_MISMATCH';
      row.reason = `Backend/frontend image mismatch: ${row.beforeImage || 'blank'} vs ${row.currentFrontendImage || 'blank'}.`;
      return row;
    }

    const destinationExists = fs.existsSync(destinationAbsolute);
    const alreadyUsingDestination = row.beforeImage === nextImage;

    if (alreadyUsingDestination) {
      row.status = 'SKIP_DESTINATION_EXISTS';
      row.reason = 'Recipe already uses this destination image.';
      return row;
    }
    if (destinationExists && !force) {
      row.status = 'SKIP_DESTINATION_EXISTS';
      row.reason = 'Destination file already exists. Use --force to overwrite.';
      return row;
    }
    if (!imageExists(row.beforeImage)) {
      row.status = 'SKIP_CURRENT_IMAGE_MISSING';
      row.reason = 'Current recipe image path does not exist; manual review required.';
      return row;
    }

    const classification = imageDebtClassification(
      row.beforeImage,
      backendUsage,
      catalogHealthDebtImages,
      row.isP0DebtRecipe,
    );

    if (!classification.importable && !force) {
      row.status = classification.status;
      row.reason = classification.reason;
      return row;
    }

    row.status = force && !classification.importable ? 'IMPORTABLE_P0_DEBT' : classification.status;
    row.reason = force && !classification.importable
      ? 'Force enabled for dedicated image replacement.'
      : classification.reason;
    row.backendRecipe = backendRecipe;
    row.frontendRecipe = frontendRecipe;
    return row;
  });

  const importableRows = rows.filter((row) => isImportableStatus(row.status));
  const skippedRows = rows.filter((row) => !isImportableStatus(row.status));
  const importedRows = [];
  const validationResults = [];

  if (!dryRun) {
    for (const row of importableRows) {
      fs.mkdirSync(path.dirname(row.destinationAbsolute), { recursive: true });
      fs.copyFileSync(row.sourceAbsolute, row.destinationAbsolute);
      setRecipeImage(row.backendRecipe, row.nextImage);
      setRecipeImage(row.frontendRecipe, row.nextImage);
      importedRows.push(row);
    }

    if (importedRows.length) {
      writeCatalogs(catalogs);
      validationResults.push(validationCommand('node', ['scripts/validate_recipe_data.js']));
      validationResults.push(validationCommand('npm', ['run', 'audit:banter']));
    }
  }

  const reportPath = relativeFromRoot(REPORT_DIR, `${batchName}-image-import-report.md`);
  writeReport({
    batchName,
    reviewDir,
    dryRun,
    force,
    rows,
    importedRows: dryRun ? [] : importedRows,
    skippedRows,
    reportPath,
    validationResults,
  });

  const failedValidation = validationResults.some((result) => !result.ok);
  console.log(`${dryRun ? 'Dry run complete' : 'Import complete'}: ${batchName}`);
  console.log(`Files found: ${rows.length}`);
  console.log(`Importable${dryRun ? ' (dry-run)' : ''}: ${importableRows.length}`);
  console.log(`Imported: ${dryRun ? 0 : importedRows.length}`);
  console.log(`Skipped: ${skippedRows.length}`);
  if (importableRows.length) {
    console.log('');
    console.log(dryRun ? 'Importable files:' : 'Imported files:');
    importableRows.forEach((row) => {
      console.log(`- ${row.recipeTitle} (${row.status})`);
    });
  }
  if (skippedRows.length) {
    console.log('');
    console.log('Skipped files:');
    skippedRows.forEach((row) => {
      console.log(`- ${row.file}: ${row.status} — ${row.reason}`);
    });
  }
  const protectedRows = skippedRows.filter((row) => row.status === 'SKIP_DEDICATED_PROTECTED');
  if (protectedRows.length) {
    console.log('');
    console.log('Protected dedicated images:');
    protectedRows.forEach((row) => {
      console.log(`- ${row.recipeTitle || row.slug}: ${row.beforeImage || 'blank'}`);
    });
  }
  const missingRows = skippedRows.filter((row) => row.status === 'SKIP_RECIPE_NOT_FOUND');
  if (missingRows.length) {
    console.log('');
    console.log('Missing recipe matches:');
    missingRows.forEach((row) => {
      console.log(`- ${row.file}: ${row.reason}`);
    });
  }
  console.log(`Report: ${path.relative(ROOT, reportPath)}`);
  if (failedValidation) {
    console.error('Validation failed. See report for details.');
    process.exit(1);
  }
}

main();
