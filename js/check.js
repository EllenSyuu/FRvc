/*
 * Answer checking. Pure functions, no DOM, so they are unit-tested in tests/check.test.mjs.
 *
 * checkAnswer(typed, expected, { kind, strictAccents }) returns
 *   { ok, verdict, note }
 * where verdict is one of
 *   'exact'    identical after normalising spaces, case and apostrophes
 *   'accent'   right letters, wrong or missing accents (ok unless strictAccents)
 *   'article'  the noun is right but the article is missing
 *   'gender'   the noun is right but the article has the wrong gender
 *   'typo'     one letter away (counted wrong, but told so)
 *   'wrong'    anything else
 */

const ARTICLES = ['le', 'la', "l'", 'les', 'un', 'une', 'des'];
const MASC = new Set(['le', 'un']);
const FEM = new Set(['la', 'une']);

export const normalize = s =>
  String(s ?? '')
    .normalize('NFC')
    .replace(/[’‘`´]/g, "'")
    .replace(/…/g, '...')
    .replace(/\s+/g, ' ')
    .replace(/\s*'\s*/g, "'")
    .replace(/\s*([,.;:!?])\s*$/g, '')
    .replace(/[.!?]+$/, '')
    .trim()
    .toLowerCase();

export const stripAccents = s =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae');

/* "un entretien" -> { art: 'un', rest: 'entretien' }; "l'employeur" -> { art: "l'", rest: 'employeur' } */
export const splitArticle = s => {
  const n = normalize(s);
  if (n.startsWith("l'")) return { art: "l'", rest: n.slice(2) };
  const sp = n.indexOf(' ');
  if (sp > 0 && ARTICLES.includes(n.slice(0, sp))) return { art: n.slice(0, sp), rest: n.slice(sp + 1) };
  return { art: '', rest: n };
};

export const bareNoun = s => splitArticle(s).rest;

export const isNoun = kind => ['m', 'f', 'm.pl', 'f.pl'].includes(kind);

/* Levenshtein distance, capped (we only care whether it is 0, 1 or more). */
export const distance = (a, b, cap = 3) => {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > cap) return cap + 1;
    prev = cur;
  }
  return prev[b.length];
};

const genderOf = art => (MASC.has(art) ? 'm' : FEM.has(art) ? 'f' : '');

export function checkAnswer(typed, expected, { kind = '', strictAccents = false } = {}) {
  const t = normalize(typed);
  const e = normalize(expected);
  if (!t) return { ok: false, verdict: 'wrong', note: '' };
  if (t === e) return { ok: true, verdict: 'exact', note: '' };

  const ta = stripAccents(t);
  const ea = stripAccents(e);
  if (ta === ea) {
    return {
      ok: !strictAccents,
      verdict: 'accent',
      note: strictAccents ? 'Accents count in the exam.' : 'Right — mind the accents.',
    };
  }

  if (isNoun(kind)) {
    const T = splitArticle(t);
    const E = splitArticle(e);
    const sameNoun = stripAccents(T.rest) === stripAccents(E.rest);
    if (sameNoun && !T.art && E.art) {
      return { ok: false, verdict: 'article', note: `Learn it with its article: ${expected}.` };
    }
    if (sameNoun && T.art && E.art && T.art !== E.art) {
      const gt = genderOf(T.art);
      const ge = genderOf(E.art) || (kind.startsWith('f') ? 'f' : 'm');
      if (gt && ge && gt !== ge) {
        return {
          ok: false,
          verdict: 'gender',
          note: `It is ${ge === 'f' ? 'feminine' : 'masculine'}: ${expected}.`,
        };
      }
      // un ↔ le, or l' typed as le: same gender, different article. Accept.
      return { ok: true, verdict: 'accent', note: `Also right; the card says ${expected}.` };
    }
  }

  if (ea.length >= 5 && distance(ta, ea, 1) === 1) {
    return { ok: false, verdict: 'typo', note: 'One letter away.' };
  }
  return { ok: false, verdict: 'wrong', note: '' };
}

/* Character-level diff for showing where the answer went wrong (accent-aware). */
export function diffMarks(typed, expected) {
  const t = normalize(typed);
  const e = normalize(expected);
  return [...e].map((ch, i) => {
    const u = t[i];
    if (u === ch) return { ch, s: 'same' };
    if (u && stripAccents(u) === stripAccents(ch)) return { ch, s: 'accent' };
    return { ch, s: 'diff' };
  });
}

/* Example sentence helpers: "Il a [[démissionné]] hier." */
export const clozeParts = ex => {
  const m = ex.match(/^(.*?)\[\[(.+?)\]\](.*)$/);
  if (!m) return null;
  return { before: m[1], answer: m[2], after: m[3] };
};

export const plainSentence = ex => ex.replace(/\[\[(.+?)\]\]/g, '$1');

/* Tokens for sentence building: words, with stand-alone punctuation (French spacing
   before ; : ! ?) glued to the previous word so it never floats on its own. */
export const sentenceTokens = ex => {
  const raw = plainSentence(ex).split(/\s+/).filter(Boolean);
  const out = [];
  for (const w of raw) {
    if (/^[;:!?»]$/.test(w) && out.length) out[out.length - 1] += ` ${w}`;
    else out.push(w);
  }
  return out;
};

/*
 * Whole-sentence answers (the translation exercise). Punctuation spacing, case,
 * apostrophes and the final full stop are ignored; accents are judged as for single words.
 * wordDiff() marks which words of the reference were matched, in order (longest common
 * subsequence), so the feedback can underline what was missing or different.
 */
const sentenceForm = s =>
  normalize(s)
    .replace(/[«»"“”]/g, '')
    .replace(/\s*([,;:!?.])\s*/g, '$1 ')
    .replace(/\s+/g, ' ')
    .replace(/[\s,;:!?.]+$/, '')
    .trim();

const words = s => sentenceForm(s).split(/[\s,;:!?.]+/).filter(Boolean);

export function checkSentence(typed, expected, { strictAccents = false } = {}) {
  const t = sentenceForm(typed);
  const e = sentenceForm(plainSentence(expected));
  if (!t) return { ok: false, verdict: 'wrong' };
  if (t === e) return { ok: true, verdict: 'exact' };
  if (stripAccents(t) === stripAccents(e)) return { ok: !strictAccents, verdict: 'accent' };
  const d = wordDiff(typed, expected);
  const hit = d.filter(x => x.s === 'same').length;
  return { ok: false, verdict: hit / d.length >= 0.75 ? 'close' : 'wrong', score: hit / d.length };
}

export function wordDiff(typed, expected) {
  const a = words(typed).map(stripAccents);
  const bRaw = plainSentence(expected).split(/\s+/).filter(Boolean);
  const b = bRaw.map(w => stripAccents(sentenceForm(w)).replace(/[,;:!?.]/g, ''));
  const L = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = a.length - 1; i >= 0; i--)
    for (let j = b.length - 1; j >= 0; j--)
      L[i][j] = a[i] === b[j] && b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const same = new Set();
  let i = 0;
  let j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j] && b[j]) {
      same.add(j);
      i++;
      j++;
    } else if (L[i + 1][j] >= L[i][j + 1]) i++;
    else j++;
  }
  return bRaw.map((w, k) => ({ w, s: same.has(k) || !b[k] ? 'same' : 'miss' }));
}

/* Copying aid: how much of `target` has been typed correctly so far. */
export function copyProgress(typed, target) {
  const t = normalize(typed);
  const e = normalize(target);
  let n = 0;
  while (n < t.length && n < e.length && t[n] === e[n]) n++;
  return { done: t === e, matched: n, wrongAt: n < t.length ? n : -1, expectedChar: e[n] || '', total: e.length };
}
