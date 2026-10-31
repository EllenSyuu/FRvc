/*
 * Merging progress from several devices (computer, phone browser, installed app).
 *
 * The rule is chosen so that studying on two devices, in any order and with any number of
 * syncs in between, never loses or double-counts anything:
 *
 *   cards     per word, the most recent answer wins (card.t, a timestamp set by grade()).
 *   devlog    daily counts are kept per device: devlog[day][device] = { new, right, wrong,
 *             done, t }. A device only ever writes its own entry, and its counters only
 *             grow, so merging takes the newer entry per (day, device) and the day's total
 *             is the sum over devices.
 *   marked,   per key, the most recent change wins; un-marking leaves a tombstone
 *   starred,  { del: true, t } so it is not resurrected by the other device's copy.
 *   phrases
 *   grammar,  per lesson / passage, the most recent result wins ({ best, last, t }); the
 *   reading   best score is kept as the larger of the two.
 *   settings  the most recently saved settings win (settingsT).
 *   resetAt   "clear all progress" on any device removes everything older than it, everywhere.
 *
 * Pure functions over plain objects: see tests/merge.test.mjs.
 */

export const cardTime = c => (c && (c.t || (c.last ? Date.parse(`${c.last}T12:00:00`) : 0))) || 0;
const entryTime = e => (e && (e.t || (e.at ? Date.parse(`${e.at}T12:00:00`) : 0))) || 0;

export const liveKeys = obj => Object.keys(obj || {}).filter(k => obj[k] && !obj[k].del);

export function aggregateLog(devlog) {
  const out = {};
  for (const [day, devs] of Object.entries(devlog || {})) {
    const d = { new: 0, right: 0, wrong: 0, done: false };
    for (const e of Object.values(devs || {})) {
      d.new += e.new || 0;
      d.right += e.right || 0;
      d.wrong += e.wrong || 0;
      d.done = d.done || !!e.done;
    }
    out[day] = d;
  }
  return out;
}

function newer(x, y, time) {
  if (!x) return y;
  if (!y) return x;
  return time(y) > time(x) ? y : x;
}

function mergeKeyed(a = {}, b = {}, time, cutoff) {
  const out = {};
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const v = newer(a[k], b[k], time);
    if (v && time(v) >= cutoff) out[k] = v;
  }
  return out;
}

function mergeResults(a = {}, b = {}, cutoff = 0) {
  const out = {};
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const x = a[k];
    const y = b[k];
    const v = newer(x, y, e => (e && e.t) || 0);
    if (!v || (v.t || 0) < cutoff) continue;
    out[k] = { ...v, best: Math.max((x && x.best) || 0, (y && y.best) || 0) };
  }
  return out;
}

export function mergeState(a, b) {
  if (!b) return a;
  if (!a) return b;
  const resetAt = Math.max(a.resetAt || 0, b.resetAt || 0);
  const devlog = {};
  for (const day of new Set([...Object.keys(a.devlog || {}), ...Object.keys(b.devlog || {})])) {
    const da = (a.devlog || {})[day] || {};
    const db = (b.devlog || {})[day] || {};
    const merged = {};
    for (const dev of new Set([...Object.keys(da), ...Object.keys(db)])) {
      const x = da[dev];
      const y = db[dev];
      // Counters only grow; prefer the newer write, else the larger total.
      let v;
      if (x && y) v = (y.t || 0) > (x.t || 0) || (!x.t && !y.t && (y.right + y.wrong) > (x.right + x.wrong)) ? y : x;
      else v = x || y;
      if (!v.t || v.t >= resetAt) merged[dev] = v;
    }
    if (Object.keys(merged).length) devlog[day] = merged;
  }
  const aSet = a.settingsT || 0;
  const bSet = b.settingsT || 0;
  return {
    ...a,
    version: Math.max(a.version || 0, b.version || 0),
    resetAt,
    cards: mergeKeyed(a.cards, b.cards, cardTime, resetAt),
    devlog,
    log: aggregateLog(devlog),
    marked: mergeKeyed(a.marked, b.marked, entryTime, resetAt),
    starred: mergeKeyed(a.starred, b.starred, entryTime, resetAt),
    phrases: mergeKeyed(a.phrases, b.phrases, entryTime, resetAt),
    grammar: mergeResults(a.grammar, b.grammar, resetAt),
    reading: mergeResults(a.reading, b.reading, resetAt),
    settings: bSet > aSet ? b.settings : a.settings,
    settingsT: Math.max(aSet, bSet),
  };
}

/* The part of the state that is synced (everything except derived and device-local bits). */
export function syncable(s) {
  return {
    version: s.version,
    resetAt: s.resetAt || 0,
    cards: s.cards || {},
    devlog: s.devlog || {},
    marked: s.marked || {},
    starred: s.starred || {},
    phrases: s.phrases || {},
    grammar: s.grammar || {},
    reading: s.reading || {},
    settings: s.settings,
    settingsT: s.settingsT || 0,
  };
}

/* Order-independent fingerprint, to skip uploads when nothing changed. */
export function fingerprint(s) {
  const sort = v =>
    v && typeof v === 'object' && !Array.isArray(v)
      ? Object.fromEntries(Object.keys(v).sort().map(k => [k, sort(v[k])]))
      : v;
  return JSON.stringify(sort(syncable(s)));
}
