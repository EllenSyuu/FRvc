import test from 'node:test';
import assert from 'node:assert/strict';
import { bestStreak } from '../js/progress.js';

const day = n => ({ right: n, wrong: 0 });

test('bestStreak finds the longest run of study days', () => {
  const log = {
    '2026-10-01': day(3), '2026-10-02': day(1), '2026-10-03': day(5),
    '2026-10-05': day(2), '2026-10-06': day(2),
    '2026-10-30': day(1), '2026-10-31': day(4), '2026-11-01': day(1), '2026-11-02': day(1),
  };
  assert.equal(bestStreak(log), 4);
});

test('bestStreak ignores days with no answers', () => {
  assert.equal(bestStreak({ '2026-10-01': day(2), '2026-10-02': { right: 0, wrong: 0 }, '2026-10-03': day(1) }), 1);
  assert.equal(bestStreak({}), 0);
});
