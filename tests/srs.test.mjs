import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grade, planDay, streak, addDays, daysBetween, INTERVALS, isLearned } from '../js/srs.js';

const T = '2026-10-30';

test('right answers climb the boxes and push the next review out', () => {
  let c;
  const dues = [];
  for (let k = 0; k < 9; k++) {
    c = grade(c, true, T);
    dues.push(daysBetween(T, c.due));
  }
  assert.deepEqual(dues, [1, 2, 4, 7, 15, 30, 60, 60, 60]);
  assert.equal(c.box, INTERVALS.length - 1);
  assert.ok(isLearned(c));
});

test('a wrong answer sends a word back to box 1, due tomorrow', () => {
  const c = grade({ box: 5, due: T, right: 5, wrong: 0, last: '2026-10-01' }, false, T);
  assert.equal(c.box, 1);
  assert.equal(c.due, addDays(T, 1));
  assert.equal(c.wrong, 1);
});

test('the day plan: due reviews oldest first, then new words in order', () => {
  const words = [1, 2, 3, 4, 5].map(i => ({ id: `t/${i}`, theme: i < 4 ? 'a' : 'b' }));
  const cards = {
    't/1': { box: 2, due: '2026-10-29', last: '2026-10-27' },
    't/2': { box: 3, due: '2026-10-20', last: '2026-10-16' },
    't/3': { box: 3, due: '2026-11-02', last: '2026-10-29' },
  };
  const p = planDay(words, cards, { dailyNew: 1, today: T });
  assert.deepEqual(p.reviews.map(w => w.id), ['t/2', 't/1']);
  assert.deepEqual(p.fresh.map(w => w.id), ['t/4']);
  assert.deepEqual(planDay(words, cards, { dailyNew: 5, themes: ['b'], today: T }).fresh.map(w => w.id), ['t/4', 't/5']);
});

test('streak counts back from today, or from yesterday before today has started', () => {
  const log = { '2026-10-28': { right: 3, wrong: 0 }, '2026-10-29': { right: 1, wrong: 1 } };
  assert.equal(streak(log, T), 2);
  assert.equal(streak({ ...log, [T]: { right: 2, wrong: 0 } }, T), 3);
  assert.equal(streak({ '2026-10-27': { right: 1, wrong: 0 } }, T), 0);
});

test('date arithmetic crosses month and DST boundaries', () => {
  assert.equal(addDays('2026-10-31', 1), '2026-11-01');
  assert.equal(addDays('2026-11-01', 1), '2026-11-02');
  assert.equal(daysBetween('2026-10-30', '2026-12-29'), 60);
});
