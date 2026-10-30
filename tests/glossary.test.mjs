import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WORDS } from '../data/deck.js';
import { GLOSS, tokenize } from '../data/glossary.js';
import { plainSentence } from '../js/check.js';

test('every word of every example sentence has a gloss', () => {
  const missing = new Set();
  for (const w of WORDS) for (const t of tokenize(plainSentence(w.ex))) if (t.word && !GLOSS[t.key]) missing.add(`${t.key} (${w.id})`);
  assert.deepEqual([...missing], []);
});

test('glosses are complete and unique', () => {
  for (const [k, g] of Object.entries(GLOSS)) {
    assert.ok(g.zh && g.en, `${k} is missing a translation`);
    assert.equal(k, k.toLowerCase(), `${k} should be lower case`);
  }
});

test('tokenizer keeps text intact and splits elisions', () => {
  const s = "L'employeur m'a dit : « Bienvenue ! » aujourd'hui, main-d'œuvre.";
  assert.equal(tokenize(s).map(t => t.text).join(''), s);
  const words = tokenize(s).filter(t => t.word).map(t => t.key);
  assert.deepEqual(words, ["l'", 'employeur', "m'", 'a', 'dit', 'bienvenue', "aujourd'hui", "main-d'œuvre"]);
});
