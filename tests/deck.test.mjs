import { test } from 'node:test';
import assert from 'node:assert/strict';
import { THEMES, WORDS } from '../data/deck.js';
import { clozeParts, splitArticle } from '../js/check.js';

const KINDS = new Set(['m', 'f', 'm.pl', 'f.pl', 'v', 'adj', 'adv', 'loc']);

test('every entry is complete and well-formed', () => {
  for (const w of WORDS) {
    for (const f of ['fr', 'kind', 'en', 'zh', 'ex', 'tr']) assert.ok(w[f] && String(w[f]).trim(), `${w.id} has no ${f}`);
    assert.ok(KINDS.has(w.kind), `${w.id}: unknown kind ${w.kind}`);
    assert.equal((w.ex.match(/\[\[/g) || []).length, 1, `${w.id}: example needs exactly one [[…]]`);
    assert.ok(clozeParts(w.ex), `${w.id}: cloze does not parse`);
    assert.ok(/[.!?»]$/.test(w.ex.trim()), `${w.id}: example should end with punctuation`);
  }
});

test('nouns carry an article that matches their gender', () => {
  for (const w of WORDS.filter(x => ['m', 'f', 'm.pl', 'f.pl'].includes(x.kind))) {
    const { art } = splitArticle(w.fr);
    assert.ok(art, `${w.id} (${w.fr}) is a noun without an article`);
    if (w.kind.endsWith('pl')) assert.equal(art, 'les', `${w.id}: plural noun should take les`);
    if (w.kind === 'm') assert.ok(['le', 'un', "l'"].includes(art), `${w.id}: masculine noun with ${art}`);
    if (w.kind === 'f') assert.ok(['la', 'une', "l'"].includes(art), `${w.id}: feminine noun with ${art}`);
  }
});

test('ids are unique and no word appears twice', () => {
  assert.equal(new Set(WORDS.map(w => w.id)).size, WORDS.length);
  assert.equal(new Set(WORDS.map(w => w.fr)).size, WORDS.length);
  assert.equal(new Set(THEMES.map(t => t.id)).size, THEMES.length);
});

test('every theme has at least 20 words', () => {
  for (const t of THEMES) assert.ok(t.words.length >= 20, `${t.id} has ${t.words.length}`);
});
