// Validates every content file and lists words that still need a gloss.
//
//   node tools/check-content.mjs                 check everything
//   node tools/check-content.mjs data/vocab/corps.js   only report problems for that file,
//                                                      and print its missing glosses
//
// Exit code 1 when anything is wrong. Run tools/build-index.mjs first if you added a file.
import { readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const only = process.argv[2] ? resolve(process.argv[2]) : null;
const errors = [];
const err = (file, msg) => (!only || file === only) && errors.push(`${file.replace(root + '/', '')}: ${msg}`);

const load = async dir => {
  const out = [];
  for (const f of readdirSync(`${root}/data/${dir}`).filter(f => f.endsWith('.js') && f !== 'index.js')) {
    const file = `${root}/data/${dir}/${f}`;
    try {
      out.push({ file, name: f.slice(0, -3), data: (await import(pathToFileURL(file))).default });
    } catch (e) {
      err(file, `does not load: ${e.message}`);
    }
  }
  return out;
};

const { BASE_THEMES } = await import(pathToFileURL(`${root}/data/deck.js`));
const { tokenize } = await import(pathToFileURL(`${root}/data/glossary.js`));
const { clozeParts, plainSentence, splitArticle } = await import(pathToFileURL(`${root}/js/check.js`));

// Glossary = base RAW + every gloss file, parsed the same way as data/glossary.js.
const glossSrc = (await import('node:fs')).readFileSync(`${root}/data/glossary.js`, 'utf8');
const baseRaw = glossSrc.slice(glossSrc.indexOf('const RAW = `') + 13, glossSrc.indexOf('`;'));
const glossFiles = await load('gloss');
const GLOSS = new Map();
const addGloss = (raw, file) =>
  raw
    .trim()
    .split('\n')
    .forEach((l, i) => {
      if (!l.trim()) return;
      const parts = l.split('|');
      if (parts.length !== 3 || !parts[0].trim() || !parts[1].trim() || !parts[2].trim()) {
        if (file) err(file, `line ${i + 1} should be "form|中文|English": ${l}`);
        return;
      }
      const k = parts[0].trim().toLowerCase().replace(/’/g, "'");
      if (k !== parts[0].trim().replace(/’/g, "'")) file && err(file, `gloss form must be lower case: ${parts[0]}`);
      if (!GLOSS.has(k)) GLOSS.set(k, file);
    });
addGloss(baseRaw, null);
for (const g of glossFiles) {
  if (typeof g.data !== 'string') err(g.file, 'must `export default` a template string');
  else addGloss(g.data, g.file);
}

const missing = new Map(); // file -> Set
const needGloss = (file, sentence) => {
  for (const t of tokenize(plainSentence(sentence))) {
    if (!t.word || GLOSS.has(t.key)) continue;
    if (!missing.has(file)) missing.set(file, new Set());
    missing.get(file).add(t.key);
  }
};

/* ---------------------------------------------------------------- vocabulary */
const KINDS = new Set(['m', 'f', 'm.pl', 'f.pl', 'v', 'adj', 'adv', 'loc']);
const ICONS = new Set(['briefcase', 'house', 'cross', 'leaf', 'screen', 'book', 'metro', 'passport', 'coins', 'mask', 'cup', 'stamp', 'pen',
  'body', 'pill', 'heart', 'people', 'ball', 'pot', 'shirt', 'hammer', 'bag', 'plane', 'palette', 'quill', 'column', 'hands', 'newspaper',
  'building', 'scales', 'chart', 'bank', 'desk', 'mountain', 'paw', 'flask', 'bolt', 'bike', 'clock', 'compass', 'ruler', 'quote', 'maple']);
const seenFr = new Map();
for (const t of BASE_THEMES) for (const w of t.words) seenFr.set(w[0], 'base:' + t.id);
const vocab = await load('vocab');
for (const { file, name, data: t } of vocab) {
  if (!t || t.id !== name) { err(file, `id must equal the file name (${name})`); continue; }
  for (const k of ['fr', 'zh', 'en', 'icon', 'level']) if (!t[k]) err(file, `theme needs "${k}"`);
  if (t.icon && !ICONS.has(t.icon)) err(file, `unknown icon "${t.icon}"`);
  if (!['A2', 'B1', 'B2'].includes(t.level)) err(file, 'level must be A2, B1 or B2');
  if (!Array.isArray(t.words) || t.words.length !== 20) err(file, `needs exactly 20 words (has ${t.words ? t.words.length : 0})`);
  (t.words || []).forEach((w, i) => {
    const at = `word ${i + 1} (${w && w[0]})`;
    if (!Array.isArray(w) || w.length !== 6 || w.some(x => typeof x !== 'string' || !x.trim())) return err(file, `${at}: must be [fr, kind, en, zh, example, translation]`);
    const [fr, kind, , , ex] = w;
    if (!KINDS.has(kind)) err(file, `${at}: unknown kind ${kind}`);
    if ((ex.match(/\[\[/g) || []).length !== 1 || !clozeParts(ex)) err(file, `${at}: example needs exactly one [[…]]`);
    if (!/[.!?»]$/.test(ex.trim())) err(file, `${at}: example should end with punctuation`);
    if (/'/.test(ex) && /’/.test(ex)) err(file, `${at}: mix of ' and ’ — use straight '`);
    if (['m', 'f', 'm.pl', 'f.pl'].includes(kind)) {
      const { art } = splitArticle(fr);
      if (!art) err(file, `${at}: noun needs its article`);
      else if (kind.endsWith('pl') && art !== 'les') err(file, `${at}: plural noun takes les`);
      else if (kind === 'm' && !['le', 'un', "l'"].includes(art)) err(file, `${at}: masculine with ${art}`);
      else if (kind === 'f' && !['la', 'une', "l'"].includes(art)) err(file, `${at}: feminine with ${art}`);
    }
    if (seenFr.has(fr)) err(file, `${at}: "${fr}" already exists in ${seenFr.get(fr)}`);
    else seenFr.set(fr, name);
    needGloss(file, ex);
  });
}

/* ---------------------------------------------------------------- grammar */
const grammar = await load('grammar');
for (const { file, name, data: g } of grammar) {
  if (!g || g.id !== name) { err(file, `id must equal the file name (${name})`); continue; }
  for (const k of ['n', 'fr', 'zh', 'level', 'summary']) if (g[k] === undefined || g[k] === '') err(file, `lesson needs "${k}"`);
  if (!Array.isArray(g.explain) || g.explain.length < 2) err(file, 'explain needs at least 2 sections');
  (g.explain || []).forEach((s, i) => {
    if (!s.h || !s.p) err(file, `explain[${i}] needs h and p`);
    (s.ex || []).forEach((e, j) => {
      if (!Array.isArray(e) || e.length !== 2) err(file, `explain[${i}].ex[${j}] must be [fr, zh]`);
      else needGloss(file, e[0]);
    });
    if (s.table) {
      const { head, rows } = s.table;
      if (!Array.isArray(head) || !Array.isArray(rows) || rows.some(r => r.length !== head.length)) err(file, `explain[${i}].table rows must match head`);
    }
  });
  if (!Array.isArray(g.drills) || g.drills.length < 12) err(file, `needs at least 12 drills (has ${g.drills ? g.drills.length : 0})`);
  (g.drills || []).forEach((d, i) => {
    const at = `drill ${i + 1}`;
    if (d.t === 'fill') {
      if ((d.s.match(/\[\[/g) || []).length !== 1 || !clozeParts(d.s)) err(file, `${at}: fill needs exactly one [[…]]`);
      if (!d.zh) err(file, `${at}: fill needs zh`);
    } else if (d.t === 'choice') {
      if (!d.s || !d.s.includes('___')) err(file, `${at}: choice sentence needs ___`);
      if (!Array.isArray(d.o) || d.o.length < 2 || !(d.a >= 0 && d.a < d.o.length)) err(file, `${at}: choice needs options o and a valid index a`);
      if (!d.why) err(file, `${at}: choice needs why`);
    } else if (d.t === 'transform') {
      if (!d.from || !d.task || !Array.isArray(d.to) || !d.to.length) err(file, `${at}: transform needs from, task, to[]`);
    } else if (d.t === 'conj') {
      if (!d.verb || !d.tense || !Array.isArray(d.forms) || d.forms.length !== 6) err(file, `${at}: conj needs verb, tense and 6 forms`);
    } else err(file, `${at}: unknown drill type ${d.t}`);
  });
}

/* ---------------------------------------------------------------- reading */
const reading = await load('reading');
for (const { file, name, data: r } of reading) {
  if (!r || r.id !== name) { err(file, `id must equal the file name (${name})`); continue; }
  for (const k of ['n', 'title', 'level', 'kind', 'zh']) if (r[k] === undefined || r[k] === '') err(file, `passage needs "${k}"`);
  if (!['A2', 'B1', 'B2'].includes(r.level)) err(file, 'level must be A2, B1 or B2');
  if (!Array.isArray(r.text) || !r.text.length) err(file, 'text must be an array of paragraphs');
  if (!Array.isArray(r.tr) || (r.text && r.tr.length !== r.text.length)) err(file, 'tr must give one Chinese paragraph per French paragraph');
  (r.text || []).forEach(p => needGloss(file, p));
  if (!Array.isArray(r.questions) || r.questions.length < 4) err(file, 'needs at least 4 questions');
  (r.questions || []).forEach((q, i) => {
    if (!q.q || !q.zh || !Array.isArray(q.o) || q.o.length !== 4 || !(q.a >= 0 && q.a < 4) || !q.why) err(file, `question ${i + 1} needs q, zh, 4 options o, index a and why`);
  });
}

/* ---------------------------------------------------------------- report */
for (const [file, set] of missing) err(file, `${set.size} word form(s) without a gloss`);
if (only && missing.has(only)) {
  console.log(`\nMissing glosses for ${only.replace(root + '/', '')} (add these to a file in data/gloss/):`);
  console.log([...missing.get(only)].sort().join('\n'));
}
if (errors.length) {
  console.log(`\n${errors.length} problem(s):\n` + errors.slice(0, 200).join('\n'));
  process.exit(1);
}
console.log(only ? `${only.replace(root + '/', '')}: OK` : `content OK — ${vocab.length} themes, ${grammar.length} lessons, ${reading.length} passages, ${GLOSS.size} glosses`);
