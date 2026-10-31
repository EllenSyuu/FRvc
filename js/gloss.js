/*
 * Interactive example sentences.
 *
 * Every word of an example sentence is hoverable (tap on phones): a small card shows its
 * meaning, the dictionary form when it is conjugated, and a pronunciation button. "标为重点"
 * marks it as a word you do not know: from then on, wherever it appears in any example
 * sentence, its translation is written after it in brackets — le loyer（房租）— until you
 * unmark it. Marking the card's own word (the highlighted one) also stars that deck entry,
 * so it joins the 重点 list used by the practice page.
 */
import { GLOSS, tokenize } from '../data/glossary.js';
import { clozeParts } from './check.js';
import { speakerIcon } from './art.js';

let ctx = null; // { state: () => S, persist, speak, byId, onChange }

const esc = s =>
  String(s).replace(/'/g, '’').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const keyOf = el => (el.dataset.k || '').replace(/’/g, "'");

/* "帮助（aider 的过去分词，阴性）" -> "帮助" for the bracket note. */
export const shortZh = zh => zh.split(/[（(；]/)[0].trim();

const S = () => ctx.state();
const live = (obj, k) => !!(obj && obj[k] && !obj[k].del);
export const isMarked = key => live(S().marked, key);
export const isStarred = id => live(S().starred, id);

function tokenHtml(tokens, wid) {
  return tokens
    .map(t => {
      if (!t.word) return esc(t.text);
      const g = GLOSS[t.key];
      if (!g) return esc(t.text);
      const m = isMarked(t.key);
      return `<span class="tk${m ? ' is-marked' : ''}" data-k="${esc(t.key)}" data-w="${wid}" tabindex="0">${esc(t.text)}</span>${
        m ? `<span class="gl" data-gl="${esc(t.key)}">（${esc(shortZh(g.zh))}）</span>` : ''
      }`;
    })
    .join('');
}

/*
 * Render an example sentence. The card's own word is a single hover unit (<mark>) carrying
 * the deck meaning. Options: blank — replace it by a gap (fill-in-the-blank);
 * plain — no highlight on the target.
 */
export function sentenceHtml(w, { blank = false, plain = false } = {}) {
  const p = clozeParts(w.ex);
  if (!p) return tokenHtml(tokenize(w.ex), w.id);
  const before = tokenHtml(tokenize(p.before), w.id);
  const after = tokenHtml(tokenize(p.after), w.id);
  let mid;
  if (blank) {
    mid = `<span class="blank">${'_'.repeat(Math.max(4, Math.min(14, p.answer.length)))}</span>`;
  } else {
    const st = isStarred(w.id);
    mid = `<mark class="target${plain ? ' plain' : ''}${st ? ' is-marked' : ''}" data-target="${w.id}" tabindex="0">${esc(p.answer)}</mark>${
      st ? `<span class="gl" data-gl-target="${w.id}">（${esc(shortZh(w.zh))}）</span>` : ''
    }`;
  }
  return `${before}${mid}${after}`;
}

/*
 * Any French text (grammar examples, reading passages): every word hoverable and markable.
 * `src` identifies where it comes from ("g:<lesson>", "r:<passage>"), so a word marked here
 * can be practised later in the very sentence it was found in.
 */
const SOURCES = {};
export function textHtml(text, src) {
  const sentences = String(text).match(/[^.!?…]+[.!?…»"]*\s*|.+$/g) || [text];
  return sentences
    .map((sent, i) => {
      const id = `${src}#${i}`;
      SOURCES[id] = sent.trim();
      return tokenHtml(tokenize(sent), id);
    })
    .join('');
}
export const sourceSentence = id => SOURCES[id] || null;

/* ------------------------------------------------------------------ popover */

let pop = null;
let current = null; // the element the popover is for
let hideTimer = 0;
let pinned = false;

function ensurePop() {
  if (pop) return pop;
  pop = document.createElement('div');
  pop.id = 'pop';
  pop.setAttribute('role', 'dialog');
  pop.hidden = true;
  document.body.append(pop);
  pop.addEventListener('mouseenter', () => clearTimeout(hideTimer));
  pop.addEventListener('mouseleave', () => !pinned && scheduleHide());
  pop.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    if (b.dataset.popSay) ctx.speak(b.dataset.popSay);
    if (b.dataset.popMark !== undefined) toggleFor(current);
  });
  return pop;
}

function contentFor(el) {
  if (el.dataset.target) {
    const w = ctx.byId[el.dataset.target];
    const st = isStarred(w.id);
    return `<p class="pf">${esc(w.fr)} <button type="button" class="say" data-pop-say="${esc(w.fr)}" aria-label="Écouter">${speakerIcon()}</button></p>
      <p class="pz">${esc(w.zh)}</p><p class="pe">${esc(w.en)}</p>
      <button type="button" class="pmark${st ? ' on' : ''}" data-pop-mark>${st ? '★ 已标为重点 · 点此取消' : '☆ 不认识，标为重点'}</button>
      <p class="phint">${st ? '例句里会一直在它后面写上翻译。' : '标记后，例句里会一直在它后面括号写上翻译。'}</p>`;
  }
  const key = keyOf(el);
  const g = GLOSS[key];
  const m = isMarked(key);
  return `<p class="pf">${esc(el.textContent)} <button type="button" class="say" data-pop-say="${esc(el.textContent)}" aria-label="Écouter">${speakerIcon()}</button></p>
    <p class="pz">${esc(g.zh)}</p><p class="pe">${esc(g.en)}</p>
    <button type="button" class="pmark${m ? ' on' : ''}" data-pop-mark>${m ? '★ 已标为重点 · 点此取消' : '☆ 不认识，标为重点'}</button>
    <p class="phint">${m ? '所有例句里它后面都会显示（翻译）。' : '标记后，所有例句里它后面都会显示（翻译）。'}</p>`;
}

function show(el, { pin = false } = {}) {
  ensurePop();
  clearTimeout(hideTimer);
  current = el;
  pinned = pin;
  pop.innerHTML = contentFor(el);
  pop.hidden = false;
  const r = el.getBoundingClientRect();
  const pw = Math.min(280, window.innerWidth - 24);
  pop.style.width = `${pw}px`;
  let x = r.left + r.width / 2 - pw / 2;
  x = Math.max(12, Math.min(window.innerWidth - pw - 12, x));
  const ph = pop.offsetHeight;
  const below = r.bottom + 10 + ph < window.innerHeight;
  const y = below ? r.bottom + 10 : r.top - ph - 10;
  pop.style.left = `${x + window.scrollX}px`;
  pop.style.setProperty('--ax', `${Math.max(14, Math.min(pw - 14, r.left + r.width / 2 - x))}px`);
  pop.style.top = `${y + window.scrollY}px`;
  pop.classList.toggle('up', !below);
  document.querySelectorAll('.tk.hot, .target.hot').forEach(e => e.classList.remove('hot'));
  el.classList.add('hot');
}

function scheduleHide() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(hide, 220);
}

export function hide() {
  if (!pop) return;
  pop.hidden = true;
  pinned = false;
  if (current) current.classList.remove('hot');
  current = null;
}

/* ------------------------------------------------------------------ marking */

function toggleFor(el) {
  if (!el) return;
  const st = S();
  st.marked = st.marked || {};
  st.starred = st.starred || {};
  // Un-marking leaves a dated tombstone so another device's copy does not bring it back.
  const now = Date.now();
  if (el.dataset.target) {
    const id = el.dataset.target;
    st.starred[id] = isStarred(id) ? { del: true, t: now } : { at: ctx.today(), t: now };
  } else {
    const key = keyOf(el);
    const from = el.dataset.w;
    st.marked[key] = isMarked(key)
      ? { del: true, t: now }
      : { from, at: ctx.today(), t: now, ...(ctx.byId[from] ? {} : { s: SOURCES[from] || '' }) };
  }
  ctx.persist();
  refresh();
  if (current) show(current, { pin: pinned });
  ctx.onChange && ctx.onChange();
}

export function toggleStar(id) {
  const st = S();
  st.starred = st.starred || {};
  st.starred[id] = isStarred(id) ? { del: true, t: Date.now() } : { at: ctx.today(), t: Date.now() };
  ctx.persist();
  refresh();
}

/* Re-draw the bracket notes and star buttons in place, without re-rendering the view. */
export function refresh(root = document) {
  root.querySelectorAll('.tk[data-k]').forEach(el => {
    const key = keyOf(el);
    const m = isMarked(key);
    el.classList.toggle('is-marked', m);
    const next = el.nextElementSibling;
    const has = next && next.classList.contains('gl') && next.dataset.gl !== undefined;
    if (m && !has) el.insertAdjacentHTML('afterend', `<span class="gl" data-gl="${esc(key)}">（${esc(shortZh(GLOSS[key].zh))}）</span>`);
    if (!m && has) next.remove();
  });
  root.querySelectorAll('.target[data-target]').forEach(el => {
    const id = el.dataset.target;
    const m = isStarred(id);
    el.classList.toggle('is-marked', m);
    const next = el.nextElementSibling;
    const has = next && next.classList.contains('gl') && next.dataset.glTarget !== undefined;
    if (m && !has) el.insertAdjacentHTML('afterend', `<span class="gl" data-gl-target="${id}">（${esc(shortZh(ctx.byId[id].zh))}）</span>`);
    if (!m && has) next.remove();
  });
  root.querySelectorAll('[data-star]').forEach(b => {
    const on = isStarred(b.dataset.star);
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.innerHTML = on ? '★ <span>重点</span>' : '☆ <span>标为重点</span>';
  });
}

export const starButton = id =>
  `<button type="button" class="star${isStarred(id) ? ' on' : ''}" data-star="${id}" aria-pressed="${isStarred(id)}">${
    isStarred(id) ? '★ <span>重点</span>' : '☆ <span>标为重点</span>'
  }</button>`;

/* ------------------------------------------------------------------ wiring */

export function initGloss(c) {
  ctx = c;
  const hoverable = e => e.target.closest && e.target.closest('.tk, .target');
  // Right after a click or a key press the page re-renders under a resting pointer; a word
  // sliding under it then must not pop a card over the buttons. Hover works again 0.4 s later.
  let quietUntil = 0;
  const quiet = () => (quietUntil = performance.now() + 400);
  document.addEventListener('pointerdown', quiet, true);
  document.addEventListener('keydown', quiet, true);
  document.addEventListener('mouseover', e => {
    const el = hoverable(e);
    if (el && !pinned && performance.now() > quietUntil) show(el);
  });
  document.addEventListener('mouseout', e => {
    const el = hoverable(e);
    if (el && !pinned) scheduleHide();
  });
  document.addEventListener('focusin', e => {
    const el = hoverable(e);
    if (el && el.matches(':focus-visible')) show(el);
  });
  document.addEventListener('click', e => {
    const el = hoverable(e);
    if (el) {
      e.preventDefault();
      show(el, { pin: true });
      return;
    }
    const star = e.target.closest && e.target.closest('[data-star]');
    if (star) {
      toggleStar(star.dataset.star);
      ctx.onChange && ctx.onChange();
      return;
    }
    if (pop && !pop.hidden && !e.target.closest('#pop')) hide();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hide();
    const el = e.target.closest && e.target.closest('.tk, .target');
    if (el && (e.key === ' ' || e.key === 'Enter') && !e.target.closest('input, textarea')) {
      e.preventDefault();
      e.stopPropagation();
      toggleFor(el);
    }
  }, true);
  window.addEventListener('scroll', () => !pinned && hide(), { passive: true });
  window.addEventListener('hashchange', hide);
}
