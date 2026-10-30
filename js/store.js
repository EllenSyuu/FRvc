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

const VERSION = 2;
const empty = () => ({ version: VERSION, cards: {}, log: {}, marked: {}, starred: {}, settings: { ...DEFAULT_SETTINGS } });

/* v1 → v2: the whole-sentence translation exercise is new; switch it on for existing users. */
function migrate(data) {
  if ((data.version || 1) < 2 && data.settings && Array.isArray(data.settings.exercises) && !data.settings.exercises.includes('translate')) {
    data.settings.exercises = [...data.settings.exercises, 'translate'];
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

export const reset = () => {
  try {
    localStorage.removeItem(KEY);
  } catch (e) {
    /* ignore */
  }
  return empty();
};
