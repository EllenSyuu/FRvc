/*
 * Progress lives only in this browser (localStorage). Nothing is sent anywhere.
 * Export / import gives a JSON file to move progress between devices.
 */

const KEY = 'frvc:v1';

export const DEFAULT_SETTINGS = {
  dailyNew: 15,
  reviewCap: 80,
  prompt: 'zh', // zh | en
  strictAccents: false,
  autoSpeak: true,
  themes: [], // empty = all themes, in order
  exercises: ['recall', 'cloze', 'build', 'choice', 'gender', 'dictation', 'translate'],
};

const VERSION = 3;
const empty = () => ({ version: VERSION, cards: {}, devlog: {}, log: {}, marked: {}, starred: {}, phrases: {}, grammar: {}, reading: {}, settings: { ...DEFAULT_SETTINGS }, settingsT: 0, resetAt: 0 });

/* Each browser / installed app gets its own id, so daily counts can be kept per device. */
export function deviceId() {
  try {
    let id = localStorage.getItem('frvc:device');
    if (!id) {
      id = Math.random().toString(36).slice(2, 10);
      localStorage.setItem('frvc:device', id);
    }
    return id;
  } catch (e) {
    return 'local';
  }
}

const noon = d => (d ? Date.parse(`${d}T12:00:00`) || 0 : 0);

function migrate(data) {
  const v = data.version || 1;
  // v1 → v2: the whole-sentence translation exercise is new; switch it on.
  if (v < 2 && data.settings && Array.isArray(data.settings.exercises) && !data.settings.exercises.includes('translate')) {
    data.settings.exercises = [...data.settings.exercises, 'translate'];
  }
  // v2 → v3: timestamps on everything and per-device daily counts, for multi-device sync.
  if (v < 3) {
    const dev = deviceId();
    data.devlog = data.devlog || {};
    for (const [day, e] of Object.entries(data.log || {})) {
      data.devlog[day] = { [dev]: { new: 0, right: 0, wrong: 0, done: false, ...e, t: noon(day) } };
    }
    for (const c of Object.values(data.cards || {})) c.t = c.t || noon(c.last);
    for (const [k, m] of Object.entries(data.marked || {})) data.marked[k] = { ...m, t: m.t || noon(m.at) };
    for (const [k, st] of Object.entries(data.starred || {}))
      data.starred[k] = typeof st === 'string' ? { at: st, t: noon(st) } : { ...st, t: st.t || noon(st.at) };
    // Settings someone already chose beat the defaults of a device that has just been set up.
    data.settingsT = data.settingsT || (data.settings ? 1 : 0);
  }
  data.version = VERSION;
  return data;
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const data = migrate(JSON.parse(raw));
    return {
      ...empty(),
      ...data,
      settings: { ...DEFAULT_SETTINGS, ...(data.settings || {}) },
    };
  } catch (e) {
    return empty();
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
}

export function exportFile(state) {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `frvc-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export async function importFile(file) {
  const data = JSON.parse(await file.text());
  if (!data || typeof data !== 'object' || !data.cards || !data.log) throw new Error('Not an FRvc progress file');
  migrate(data);
  return { ...empty(), ...data, settings: { ...DEFAULT_SETTINGS, ...(data.settings || {}) } };
}

/* Clear progress. resetAt travels with sync, so older progress is cleared on every device. */
export const reset = () => ({ ...empty(), resetAt: Date.now() });
