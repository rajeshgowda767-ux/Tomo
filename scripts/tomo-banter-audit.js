const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const outputJson = path.join(root, 'banter-audit.json');
const outputMarkdown = path.join(root, 'banter-audit.md');

const sourceFiles = [
  'frontend/index.html',
  'frontend/app.js',
  'frontend/styles.css',
  'frontend/final-overrides.css',
  'frontend/desktop-reference.html',
  'frontend/mobile/mobile-shell.js',
  'frontend/mobile/mobile-v2.css'
];

const groups = [
  'Mood banters',
  'Pantry banters',
  'Recommendation banters',
  'Empty state banters',
  'Dish detail banters',
  'Journal banters',
  'Collection banters',
  'Button labels'
];

const priorityPatterns = [
  /\btomo\b/i,
  /\bi found\b/i,
  /\bgood combo\b/i,
  /\bnice start\b/i,
  /\badd one more\b/i,
  /\bno strong match\b/i,
  /\bcomfort\b/i,
  /\blet(?:'|’)?s\b/i,
  /\byou have\b/i,
  /\bmatch\b/i,
  /\bcook this\b/i,
  /\bbrowse ingredients\b/i,
  /\bunlock\b/i,
  /\balmost there\b/i,
  /\bunusual combo\b/i,
  /\bcoming soon\b/i,
  /\bno .+ yet\b/i,
  /\bwhat(?:'|’)?s in your kitchen\b/i,
  /\bhow are you feeling\b/i,
  /\bdiscover curated\b/i
];

const uiTerms = [
  'Close', 'Search recipes', 'Open shopping list', 'Tap to reveal', 'Cook Now', 'Cook This',
  'Another Pick', 'Find Dishes', 'View Dish', 'Clear', 'Browse Ingredients', 'Explore Dishes',
  'View Full Journal', 'Got It', 'Add Missing Ingredients', 'Show', 'Save', 'Not now',
  'Key Ingredients', 'Nice to have', 'Cooking notes', 'Purchased', 'Clear purchased'
];

function lineNumber(text, index) {
  return text.slice(0, index).split('\n').length;
}

function cleanCopy(value) {
  const input = String(value || '');
  let withoutTemplates = '';
  let index = 0;
  while (index < input.length) {
    if (input[index] === '$' && input[index + 1] === '{') {
      let depth = 1;
      index += 2;
      while (index < input.length && depth > 0) {
        if (input[index] === '{') depth += 1;
        if (input[index] === '}') depth -= 1;
        index += 1;
      }
      withoutTemplates += '{dynamic value}';
      continue;
    }
    withoutTemplates += input[index];
    index += 1;
  }
  return withoutTemplates
    .replace(/\\n/g, ' ')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\$\{[^}]+\}/g, '{dynamic value}')
    .replace(/\s+/g, ' ')
    .trim();
}

function isUserFacing(copy) {
  if (!copy || copy.length < 2 || copy.length > 420) return false;
  const withoutDynamic = copy.replace(/\{dynamic value\}/g, '').replace(/[^A-Za-z]+/g, '');
  if (withoutDynamic.length < 2 && !uiTerms.includes(copy)) return false;
  if (/\b(?:join|map|filter|reduce|querySelector|moodScore|ingredientScore|pantryScore|finalScore)\b/.test(copy)) return false;
  if (/=>|\|\||&&|class=|data-[a-z-]+=|<\/?[a-z]/i.test(copy)) return false;
  if (/^[),.;:'"`\s[\]{}]+[A-Za-z]/.test(copy)) return false;
  if (/[{};]/.test(copy) && /\b(?:const|return|function|document|classList|querySelector|dataset|innerHTML)\b/.test(copy)) return false;
  if (/^(?:\.|#|\[|data-|aria-)[a-z0-9_:[\].="' -]+$/i.test(copy)) return false;
  if (/<\/?[a-z][^>]*>/i.test(copy)) return false;
  if (/\b(?:document\.|window\.|state\.|recipe\.|els\.|className|appendChild|createElement)\b/.test(copy)) return false;
  if (/^(?:https?:|\/|#|\.[a-z-]+|[a-z-]+:)/i.test(copy)) return false;
  if (/^[a-z0-9_-]+$/i.test(copy) && !uiTerms.includes(copy)) return false;
  if (/^(?:GET|POST|PUT|DELETE|Content-Type|application\/json)$/i.test(copy)) return false;
  if (/^(?:core|general|top|close|partial|support|exclude|active|hidden)$/i.test(copy)) return false;
  if (/^[\d\s.,%/+*-]+$/.test(copy)) return false;
  return priorityPatterns.some((pattern) => pattern.test(copy))
    || uiTerms.some((term) => copy.includes(term))
    || /[.!?]/.test(copy)
    || copy.split(/\s+/).length >= 3;
}

function areaFor(copy, context = '', file = '') {
  const haystack = `${copy} ${context} ${file}`.toLowerCase();
  if (file.includes('database/generated/recipes.json')) return 'Dish detail modal';
  if (file.includes('database/generated/collections.json')) return 'Collections';
  if (/empty|no .* yet|haven.t cooked|no cooking memories|no recipes found|no dishes found|no items waiting/.test(copy.toLowerCase())) return 'Empty state';
  if (/journal|cooking journey|cooking memories|cooked|dishes cooked this week/.test(haystack)) return 'Kitchen journal';
  if (/collection|curated recipes|tiny tummy|lunch box|sips|fresh plates|warm bowls|little sweet/.test(haystack)) return 'Collections';
  if (/pantry|ingredient|kitchen today|combo|unlock|strong match|almost there|available/.test(haystack)) return 'Pantry';
  if (/detail|key ingredients|nice to have|cooking notes|add missing/.test(haystack)) return 'Dish detail modal';
  if (/mood|feeling|rainy|quick & easy|high protein|soul food|spicy food/.test(haystack)) return 'Mood selector';
  if (/hero|comfort is calling|tap to reveal|another pick|weather/.test(haystack)) return 'Dashboard hero';
  if (/empty|no .* yet|nothing yet|no dishes found/.test(haystack)) return 'Empty state';
  if (/button|aria-label|cook now|cook this|browse|view dish|clear|close|search/.test(haystack)) return 'Button / control';
  if (/recommend|match|picked|popular|good for/.test(haystack)) return 'Recommendation';
  if (/description|instructions|recipe/.test(haystack)) return 'Dish detail modal';
  return 'General UI';
}

function groupFor(area, copy) {
  if (area === 'Mood selector' || area === 'Dashboard hero') return 'Mood banters';
  if (area === 'Pantry') return 'Pantry banters';
  if (area === 'Recommendation') return 'Recommendation banters';
  if (area === 'Empty state') return 'Empty state banters';
  if (area === 'Dish detail modal') return 'Dish detail banters';
  if (area === 'Kitchen journal') return 'Journal banters';
  if (area === 'Collections') return 'Collection banters';
  if (area === 'Button / control' || uiTerms.some((term) => copy.includes(term))) return 'Button labels';
  return 'Recommendation banters';
}

function triggerFor(copy, context = '') {
  const haystack = `${copy} ${context}`.toLowerCase();
  const current = copy.toLowerCase();
  if (/nice start/.test(current)) return 'After one pantry ingredient is selected';
  if (/good combo/.test(current)) return 'After two pantry ingredients are selected';
  if (/now we.re cooking/.test(current)) return 'After three or more pantry ingredients are selected';
  if (/almost there/.test(current)) return 'When a partial pantry match is available';
  if (/no strong match/.test(current)) return 'When no valid recommendation clears the confidence threshold';
  if (/strong match|key ingredients match/.test(current)) return 'When a real dish matches required/core pantry ingredients';
  if (/you have all ingredients/.test(current)) return 'Only when every required and optional ingredient is available';
  if (/count === 1/.test(haystack)) return 'After one pantry ingredient is selected';
  if (/count === 2/.test(haystack)) return 'After two pantry ingredients are selected';
  if (/count >= 3/.test(haystack)) return 'After three or more pantry ingredients are selected';
  if (/pantry_open|tell tomo|what.s in your kitchen/.test(haystack)) return 'When the Pantry modal opens with no selection';
  if (/unusual combo/.test(haystack)) return 'When selected ingredients are marked incompatible or unusual';
  if (/partial_match|add one more/.test(haystack)) return 'When a partial or low-confidence pantry match is available';
  if (/hasallrecipeingredients/.test(haystack)) return 'Only when every required and optional ingredient is available';
  if (/mood_selected|how are you feeling|rainy|quick & easy|high protein|soul food|spicy food/.test(haystack)) return 'When a mood is displayed or selected';
  if (/comfort is calling|tap to reveal|hero/.test(haystack)) return 'On the homepage hero or hero reveal state';
  if (/no .* yet|haven.t cooked|no cooking memories|no dishes found/.test(haystack)) return 'When the related list or state is empty';
  if (/journal/.test(haystack)) return 'In the Tomo Journal card or modal';
  if (/collection/.test(haystack)) return 'In collection navigation or collection cards';
  if (/detail|key ingredients|cooking notes/.test(haystack)) return 'When a dish detail modal is open';
  if (/button|aria-label|cook|browse|view|clear|close|search/.test(haystack)) return 'Visible action label when the control is available';
  if (/description/.test(haystack)) return 'When the corresponding recipe detail is opened';
  return 'When the containing UI component renders';
}

function toneFor(copy) {
  const lower = copy.toLowerCase();
  if (copy.length > 150 || (copy.match(/[.!?]/g) || []).length >= 3) return 'too much';
  if (/match|ingredient|available|add |missing|search|browse|cook|prep|selected/.test(lower)) return 'helpful';
  if (/🍅|🍳|✨|now we.re cooking|comfort is calling|cravings|easy win/.test(lower)) return 'playful';
  if (/comfort|warm|familiar|home|journey|memories|mood/.test(lower)) return 'warm';
  if (/best match|good ideas|tomo recommends|tell tomo|what.s in your kitchen/.test(lower)) return 'repetitive';
  return 'generic';
}

function recommendationFor(copy, tone) {
  const lower = copy.toLowerCase();
  if (/connect the dots/.test(lower)) {
    return { action: 'improve', replacement: copy.replace(/connect the dots/gi, 'suggest real dishes') };
  }
  if (/best match from your kitchen/.test(lower)) {
    return { action: 'improve', replacement: 'Strong match from your pantry.' };
  }
  if (/good combo\. i found/.test(lower)) {
    return { action: 'make conditional', replacement: 'I found a few dishes that use both ingredients.' };
  }
  if (/you have all ingredients/.test(lower)) {
    return { action: 'make conditional', replacement: 'You have all ingredients. Show only after required and optional coverage is complete.' };
  }
  if (/tomo recommends/.test(lower)) {
    return { action: 'keep', replacement: copy };
  }
  if (/no strong match yet/.test(lower)) {
    return { action: 'keep', replacement: copy };
  }
  if (/nice start/.test(lower)) {
    return { action: 'keep', replacement: 'Nice start. Add one more ingredient for better matches.' };
  }
  if (/i found \{dynamic value\} good/.test(lower)) {
    return { action: 'improve', replacement: 'I found {dynamic value} pantry matches.' };
  }
  if (/primary match|secondary match/.test(lower)) {
    return { action: 'improve', replacement: copy.replace('Primary Match', 'Key ingredients').replace('Secondary Match', 'Nice-to-have ingredients') };
  }
  if (tone === 'too much') {
    return { action: 'improve', replacement: copy.split(/[.!?]/)[0].trim() + '.' };
  }
  if (tone === 'repetitive') {
    return { action: 'make conditional', replacement: copy };
  }
  return { action: 'keep', replacement: copy };
}

function addEntry(entries, data) {
  const copy = cleanCopy(data.copy);
  if (!isUserFacing(copy)) return;
  const area = areaFor(copy, data.context, data.file);
  const tone = toneFor(copy);
  const recommendation = recommendationFor(copy, tone);
  entries.push({
    location: data.location || `${data.file}:${data.line || 1}`,
    file: data.file,
    line: data.line || 1,
    uiArea: area,
    group: groupFor(area, copy),
    currentCopy: copy,
    triggerCondition: triggerFor(copy, data.context),
    toneCategory: tone,
    recommendation: recommendation.action,
    suggestedReplacementCopy: recommendation.replacement
  });
}

function extractHtml(file, text, entries) {
  const visibleText = text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');
  const textPattern = />([^<>]+)</g;
  let match;
  while ((match = textPattern.exec(visibleText))) {
    addEntry(entries, {
      file,
      line: lineNumber(visibleText, match.index),
      copy: match[1],
      context: visibleText.slice(Math.max(0, match.index - 120), Math.min(visibleText.length, match.index + 180))
    });
  }
  const attributePattern = /\b(aria-label|title|placeholder)="([^"]+)"/gi;
  while ((match = attributePattern.exec(text))) {
    addEntry(entries, {
      file,
      line: lineNumber(text, match.index),
      copy: match[2],
      context: `${match[1]} button control`
    });
  }
}

function scanJavaScriptStrings(text) {
  const strings = [];
  let index = 0;
  let previousSignificant = '';
  const regexStarters = new Set(['', '(', '[', '{', '=', ':', ',', ';', '!', '?', '&', '|']);

  while (index < text.length) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '/' && next === '/') {
      index += 2;
      while (index < text.length && text[index] !== '\n') index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      index += 2;
      while (index < text.length && !(text[index] === '*' && text[index + 1] === '/')) index += 1;
      index += 2;
      continue;
    }
    if (char === '/' && next !== '/' && next !== '*' && regexStarters.has(previousSignificant)) {
      index += 1;
      let inClass = false;
      while (index < text.length) {
        if (text[index] === '\\') {
          index += 2;
          continue;
        }
        if (text[index] === '[') inClass = true;
        if (text[index] === ']') inClass = false;
        if (text[index] === '/' && !inClass) {
          index += 1;
          while (/[a-z]/i.test(text[index] || '')) index += 1;
          break;
        }
        index += 1;
      }
      previousSignificant = 'r';
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      const quote = char;
      const start = index;
      let value = '';
      index += 1;
      while (index < text.length) {
        const current = text[index];
        if (current === '\\') {
          value += current;
          if (index + 1 < text.length) value += text[index + 1];
          index += 2;
          continue;
        }
        if (current === quote) {
          index += 1;
          break;
        }
        value += current;
        index += 1;
      }
      strings.push({ value, index: start, quote });
      previousSignificant = 's';
      continue;
    }
    if (!/\s/.test(char)) previousSignificant = char;
    index += 1;
  }
  return strings;
}

function extractTemplateCopy(file, text, item, entries) {
  const value = item.value;
  const textPattern = />([^<>]+)</g;
  const attributePattern = /\b(?:aria-label|title|placeholder)="([^"]+)"/gi;
  let match;
  let foundMarkup = false;
  while ((match = textPattern.exec(value))) {
    foundMarkup = true;
    addEntry(entries, {
      file,
      line: lineNumber(text, item.index),
      copy: match[1],
      context: text.slice(Math.max(0, item.index - 160), Math.min(text.length, item.index + value.length + 160))
    });
  }
  while ((match = attributePattern.exec(value))) {
    foundMarkup = true;
    addEntry(entries, {
      file,
      line: lineNumber(text, item.index),
      copy: match[1],
      context: 'Template control label'
    });
  }
  if (!foundMarkup) {
    addEntry(entries, {
      file,
      line: lineNumber(text, item.index),
      copy: value,
      context: text.slice(Math.max(0, item.index - 180), Math.min(text.length, item.index + value.length + 180))
    });
  }
}

function extractJavaScript(file, text, entries) {
  scanJavaScriptStrings(text).forEach((item) => {
    if (item.quote === '`' && /<[^>]+>/.test(item.value)) {
      extractTemplateCopy(file, text, item, entries);
      return;
    }
    const copy = cleanCopy(item.value);
    const start = Math.max(0, item.index - 320);
    const end = Math.min(text.length, item.index + item.value.length + 320);
    const context = text.slice(start, end);
    if (/\bconsole\.(?:log|info|warn|error)\s*\([^)]*$/.test(text.slice(start, item.index))) return;
    if (!/[A-Za-z]/.test(copy)) return;
    addEntry(entries, {
      file,
      line: lineNumber(text, item.index),
      copy,
      context
    });
  });
}

function extractCss(file, text, entries) {
  const contentPattern = /content\s*:\s*(['"])(.*?)\1/g;
  let match;
  while ((match = contentPattern.exec(text))) {
    addEntry(entries, {
      file,
      line: lineNumber(text, match.index),
      copy: match[2],
      context: 'CSS generated content'
    });
  }
}

function walkJson(value, pointer, callback) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkJson(item, `${pointer}[${index}]`, callback));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, child]) => {
      const next = pointer ? `${pointer}.${key}` : key;
      if (typeof child === 'string') callback(key, child, next, value);
      else walkJson(child, next, callback);
    });
  }
}

function extractJson(file, text, entries) {
  const data = JSON.parse(text);
  const allowedKeys = new Set([
    'description', 'copy', 'tomoLine', 'tomo_line', 'emptyCopy', 'empty_copy',
    'helperText', 'helper_text', 'label', 'subtitle'
  ]);
  walkJson(data, '', (key, value, pointer, parent) => {
    if (!allowedKeys.has(key)) return;
    const title = parent.title || parent.name || parent.key || '';
    addEntry(entries, {
      file,
      line: 1,
      location: `${file}#${pointer}`,
      copy: value,
      context: `${pointer} ${key} ${title}`
    });
  });
}

function dedupe(entries) {
  const seen = new Map();
  for (const entry of entries) {
    const key = `${entry.uiArea}|${entry.currentCopy.toLowerCase()}`;
    if (!seen.has(key)) {
      seen.set(key, entry);
      continue;
    }
    const existing = seen.get(key);
    if (!existing.location.includes(entry.location)) {
      existing.location = `${existing.location}; ${entry.location}`;
    }
  }
  return [...seen.values()].sort((a, b) => {
    return groups.indexOf(a.group) - groups.indexOf(b.group)
      || a.uiArea.localeCompare(b.uiArea)
      || a.location.localeCompare(b.location);
  });
}

function markdownEscape(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\n/g, ' ');
}

function buildSummary(entries) {
  const summary = {};
  groups.forEach((group) => {
    const rows = entries.filter((entry) => entry.group === group);
    summary[group] = {
      count: rows.length,
      keep: rows.filter((entry) => entry.recommendation === 'keep').length,
      improve: rows.filter((entry) => entry.recommendation === 'improve').length,
      remove: rows.filter((entry) => entry.recommendation === 'remove').length,
      makeConditional: rows.filter((entry) => entry.recommendation === 'make conditional').length
    };
  });
  return summary;
}

function buildPriorityFindings(entries) {
  const longDescriptions = entries.filter((entry) => entry.file.includes('recipes.json') && entry.toneCategory === 'too much');
  const pantryOnboarding = entries.filter((entry) => entry.uiArea === 'Pantry' && /what.s in your kitchen|tell tomo|pick 2.?4 ingredients/i.test(entry.currentCopy));
  const conditionalClaims = entries.filter((entry) => entry.recommendation === 'make conditional');
  const terminology = entries.filter((entry) => /primary match|secondary match/i.test(entry.currentCopy));
  const findings = [];
  if (pantryOnboarding.length > 2) {
    findings.push({
      priority: 'High',
      issue: 'Pantry onboarding repeats the same question/instruction in multiple visible locations.',
      evidence: pantryOnboarding.slice(0, 5).map((entry) => entry.location),
      recommendation: 'Keep one clear prompt near the search input and make the top Tomo line reactive.'
    });
  }
  if (conditionalClaims.length) {
    findings.push({
      priority: 'High',
      issue: 'Some confidence claims require strict trigger checks.',
      evidence: conditionalClaims.map((entry) => entry.location),
      recommendation: 'Show claims such as “You have all ingredients” only after required and optional coverage is complete.'
    });
  }
  if (terminology.length) {
    findings.push({
      priority: 'Medium',
      issue: 'Internal scoring language is still visible in pantry copy.',
      evidence: terminology.map((entry) => entry.location),
      recommendation: 'Use “Key ingredients” and “Nice-to-have ingredients.”'
    });
  }
  if (longDescriptions.length) {
    findings.push({
      priority: 'Medium',
      issue: `${longDescriptions.length} recipe descriptions are too long for compact dish-detail reading.`,
      evidence: longDescriptions.slice(0, 8).map((entry) => entry.location),
      recommendation: 'Keep the first complete recommendation sentence and move preparation detail into cooking notes.'
    });
  }
  return findings;
}

function buildMarkdown(entries, summary, priorityFindings) {
  const lines = [
    '# Tomo Banter Audit',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `Unique user-facing copy lines: **${entries.length}**`,
    '',
    '## Priority Findings',
    '',
    '| Priority | Issue | Evidence | Recommendation |',
    '|---|---|---|---|',
    ...priorityFindings.map((finding) => `| ${finding.priority} | ${markdownEscape(finding.issue)} | ${markdownEscape(finding.evidence.join(', '))} | ${markdownEscape(finding.recommendation)} |`),
    '',
    '## Grouped Summary',
    '',
    '| Group | Total | Keep | Improve | Remove | Make conditional |',
    '|---|---:|---:|---:|---:|---:|',
    ...groups.map((group) => {
      const item = summary[group];
      return `| ${group} | ${item.count} | ${item.keep} | ${item.improve} | ${item.remove} | ${item.makeConditional} |`;
    }),
    ''
  ];

  groups.forEach((group) => {
    lines.push(`## ${group}`, '');
    const rows = entries.filter((entry) => entry.group === group);
    if (!rows.length) {
      lines.push('_No matching copy found._', '');
      return;
    }
    lines.push(
      '| Location / file | UI area | Current copy | Trigger condition | Tone | Recommendation | Suggested replacement copy |',
      '|---|---|---|---|---|---|---|'
    );
    rows.forEach((entry) => {
      lines.push(`| ${markdownEscape(entry.location)} | ${markdownEscape(entry.uiArea)} | ${markdownEscape(entry.currentCopy)} | ${markdownEscape(entry.triggerCondition)} | ${entry.toneCategory} | ${entry.recommendation} | ${markdownEscape(entry.suggestedReplacementCopy)} |`);
    });
    lines.push('');
  });
  return `${lines.join('\n')}\n`;
}

function runTomoBanterAudit() {
  const entries = [];
  const missingFiles = sourceFiles.filter((file) => !fs.existsSync(path.join(root, file)));
  if (missingFiles.length) {
    throw new Error(`Missing required banter audit target${missingFiles.length === 1 ? '' : 's'}:\n${missingFiles.map((file) => `- ${file}`).join('\n')}`);
  }

  sourceFiles.forEach((file) => {
    const absolute = path.join(root, file);
    const text = fs.readFileSync(absolute, 'utf8');
    if (file.endsWith('.html')) extractHtml(file, text, entries);
    else if (file.endsWith('.css')) extractCss(file, text, entries);
    else if (file.endsWith('.json')) extractJson(file, text, entries);
    else extractJavaScript(file, text, entries);
  });

  const uniqueEntries = dedupe(entries);
  const summary = buildSummary(uniqueEntries);
  const priorityFindings = buildPriorityFindings(uniqueEntries);
  const report = {
    generatedAt: new Date().toISOString(),
    scannedFiles: sourceFiles,
    duplicatePolicy: 'Only active frontend runtime files are scanned; root legacy shell files are intentionally excluded.',
    totalUniqueLines: uniqueEntries.length,
    priorityFindings,
    summary,
    entries: uniqueEntries
  };

  fs.writeFileSync(outputJson, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(outputMarkdown, buildMarkdown(uniqueEntries, summary, priorityFindings));

  console.log('\nTomo Banter Audit Summary');
  console.table(groups.map((group) => ({ group, ...summary[group] })));
  console.log(`\nGenerated ${path.relative(root, outputJson)}`);
  console.log(`Generated ${path.relative(root, outputMarkdown)}`);
  return report;
}

if (require.main === module) runTomoBanterAudit();

module.exports = { runTomoBanterAudit };
