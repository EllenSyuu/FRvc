import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeState, aggregateLog, liveKeys, fingerprint } from '../js/merge.js';

const base = () => ({ version: 3, cards: {}, devlog: {}, marked: {}, starred: {}, settings: { dailyNew: 15 }, settingsT: 0 });

test('per word, the most recent answer wins', () => {
  const pc = { ...base(), cards: { a: { box: 3, t: 100 }, b: { box: 1, t: 500 } } };
  const phone = { ...base(), cards: { a: { box: 4, t: 200 }, c: { box: 2, t: 50 } } };
  const m = mergeState(pc, phone);
  assert.equal(m.cards.a.box, 4);
  assert.equal(m.cards.b.box, 1);
  assert.equal(m.cards.c.box, 2);
  assert.deepEqual(mergeState(phone, pc).cards, m.cards, 'merge is symmetric');
});

test('daily counts from two devices add up and never double count', () => {
  const pc = { ...base(), devlog: { '2026-10-30': { pc: { new: 10, right: 20, wrong: 2, done: true, t: 10 } } } };
  const phone = { ...base(), devlog: { '2026-10-30': { ph: { new: 5, right: 8, wrong: 1, done: false, t: 20 } } } };
  let m = mergeState(pc, phone);
  // sync again and again: still the same totals
  m = mergeState(mergeState(m, phone), pc);
  assert.deepEqual(aggregateLog(m.devlog)['2026-10-30'], { new: 15, right: 28, wrong: 3, done: true });
  // the phone studies more later; its newer entry replaces its older one
  const phone2 = { ...base(), devlog: { '2026-10-30': { ph: { new: 5, right: 12, wrong: 1, done: true, t: 30 } } } };
  m = mergeState(m, phone2);
  assert.equal(m.log['2026-10-30'].right, 32);
});

test('un-marking on one device is not undone by the other', () => {
  const pc = { ...base(), marked: { mois: { from: 'travail/01', t: 100 } }, starred: { 'x/1': { t: 100 } } };
  const phone = { ...base(), marked: { mois: { del: true, t: 200 } }, starred: { 'x/1': { t: 100 }, 'x/2': { t: 300 } } };
  const m = mergeState(pc, phone);
  assert.deepEqual(liveKeys(m.marked), []);
  assert.deepEqual(liveKeys(m.starred).sort(), ['x/1', 'x/2']);
});

test('the latest saved settings win', () => {
  const pc = { ...base(), settings: { dailyNew: 15 }, settingsT: 100 };
  const phone = { ...base(), settings: { dailyNew: 30 }, settingsT: 200 };
  assert.equal(mergeState(pc, phone).settings.dailyNew, 30);
  assert.equal(mergeState(phone, pc).settings.dailyNew, 30);
});

test('clearing progress on one device clears older progress everywhere', () => {
  const pc = { ...base(), resetAt: 1000, cards: {} };
  const phone = { ...base(), cards: { a: { box: 3, t: 500 }, b: { box: 1, t: 1500 } }, devlog: { d: { ph: { new: 1, right: 1, wrong: 0, t: 400 } } } };
  const m = mergeState(pc, phone);
  assert.deepEqual(Object.keys(m.cards), ['b']);
  assert.deepEqual(m.devlog, {});
});

test('fingerprint ignores key order and derived fields', () => {
  const a = { ...base(), cards: { a: { box: 1, t: 1 }, b: { box: 2, t: 2 } }, log: { x: 1 } };
  const b = { ...base(), cards: { b: { t: 2, box: 2 }, a: { t: 1, box: 1 } } };
  assert.equal(fingerprint(a), fingerprint(b));
});

test('grammar and reading results: latest wins, best score is kept', () => {
  const pc = { ...base(), grammar: { pc1: { best: 0.9, last: 0.9, t: 100 } }, reading: { r1: { best: 4, last: 4, t: 50 } } };
  const phone = { ...base(), grammar: { pc1: { best: 0.6, last: 0.6, t: 200 } }, reading: { r2: { best: 5, last: 5, t: 60 } } };
  const m = mergeState(pc, phone);
  assert.equal(m.grammar.pc1.last, 0.6);
  assert.equal(m.grammar.pc1.best, 0.9);
  assert.deepEqual(Object.keys(m.reading).sort(), ['r1', 'r2']);
});

test('phrases merge like marks: removal on one device sticks', () => {
  const pc = { ...base(), phrases: { 'avoir du mal à': { fr: 'avoir du mal à', t: 100 }, 'au fur et à mesure': { fr: 'au fur et à mesure', t: 100 } } };
  const phone = { ...base(), phrases: { 'avoir du mal à': { del: true, t: 200 } } };
  const m = mergeState(pc, phone);
  assert.deepEqual(liveKeys(m.phrases), ['au fur et à mesure']);
});
