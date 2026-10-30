import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkAnswer, normalize, splitArticle, sentenceTokens, clozeParts, diffMarks } from '../js/check.js';

test('exact answers, case, spacing and apostrophes', () => {
  assert.equal(checkAnswer('Le loyer', 'le loyer', { kind: 'm' }).verdict, 'exact');
  assert.equal(checkAnswer('  le   loyer ', 'le loyer', { kind: 'm' }).verdict, 'exact');
  assert.equal(checkAnswer('l’employeur', "l'employeur", { kind: 'm' }).verdict, 'exact');
  assert.equal(checkAnswer("l' employeur", "l'employeur", { kind: 'm' }).verdict, 'exact');
  assert.equal(normalize('Bonjour.'), 'bonjour');
});

test('accents: right letters, wrong accents', () => {
  const r = checkAnswer('la sante', 'la santé', { kind: 'f' });
  assert.equal(r.verdict, 'accent');
  assert.equal(r.ok, true);
  assert.equal(checkAnswer('la sante', 'la santé', { kind: 'f', strictAccents: true }).ok, false);
  assert.equal(checkAnswer("la penurie de main-d'oeuvre", "la pénurie de main-d'œuvre", { kind: 'f' }).verdict, 'accent');
});

test('nouns: missing article and wrong gender are told apart', () => {
  assert.equal(checkAnswer('loyer', 'le loyer', { kind: 'm' }).verdict, 'article');
  const g = checkAnswer('la loyer', 'le loyer', { kind: 'm' });
  assert.equal(g.verdict, 'gender');
  assert.equal(g.ok, false);
  // un ↔ le carries the same gender: accepted
  assert.equal(checkAnswer('le emploi', 'un emploi', { kind: 'm' }).ok, true);
  assert.equal(checkAnswer('une emploi', 'un emploi', { kind: 'm' }).verdict, 'gender');
});

test('one-letter typos are flagged but not accepted', () => {
  const r = checkAnswer('déménnager', 'déménager', { kind: 'v' });
  assert.equal(r.verdict, 'typo');
  assert.equal(r.ok, false);
  assert.equal(checkAnswer('louer', 'payer', { kind: 'v' }).verdict, 'wrong');
  assert.equal(checkAnswer('', 'payer').ok, false);
});

test('article splitting', () => {
  assert.deepEqual(splitArticle("l'école secondaire"), { art: "l'", rest: 'école secondaire' });
  assert.deepEqual(splitArticle('les urgences'), { art: 'les', rest: 'urgences' });
  assert.deepEqual(splitArticle('gagner sa vie'), { art: '', rest: 'gagner sa vie' });
});

test('sentence helpers', () => {
  const ex = "Le centre est bruyant ; [[en revanche]], tout est accessible à pied.";
  assert.deepEqual(clozeParts(ex), { before: 'Le centre est bruyant ; ', answer: 'en revanche', after: ', tout est accessible à pied.' });
  const toks = sentenceTokens(ex);
  assert.ok(toks.includes('bruyant ;'), 'punctuation is glued to the previous word');
  assert.equal(toks.join(' '), 'Le centre est bruyant ; en revanche, tout est accessible à pied.');
});

test('diff marks accents separately from wrong letters', () => {
  const m = diffMarks('le deménagement', 'le déménagement');
  assert.equal(m[4].s, 'accent');
  assert.ok(m.filter(x => x.s === 'diff').length === 0);
});
