/*
 * Pronunciation through the browser's own speech synthesis (no network, no API key).
 * Prefers a Canadian French voice, then any French voice.
 */

let voice = null;
let ready = false;

const pick = () => {
  if (!('speechSynthesis' in window)) return;
  const all = window.speechSynthesis.getVoices();
  const fr = all.filter(v => /^fr/i.test(v.lang));
  voice =
    fr.find(v => /fr[-_]CA/i.test(v.lang)) ||
    fr.find(v => /fr[-_]FR/i.test(v.lang)) ||
    fr[0] ||
    null;
  ready = true;
};

export function initSpeech() {
  if (!('speechSynthesis' in window)) return;
  pick();
  window.speechSynthesis.onvoiceschanged = pick;
}

export const canSpeak = () => 'speechSynthesis' in window && (voice !== null || !ready);

export function speak(text, { rate = 0.92 } = {}) {
  if (!('speechSynthesis' in window)) return false;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : 'fr-CA';
    if (voice) u.voice = voice;
    u.rate = rate;
    window.speechSynthesis.speak(u);
    return true;
  } catch (e) {
    return false;
  }
}

export const hasFrenchVoice = () => voice !== null;
