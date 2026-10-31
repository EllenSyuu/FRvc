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
    if (b.dataset.popUnphrase) {
      removePhrase(b.dataset.popUnphrase.replace(/’/g, "'"));
      hide();
    }
  });
  return pop;
}

function phraseBlock(el) {
  const k = el.dataset.phrase;
  const ph = k && S().phrases && S().phrases[k];
  if (!ph || ph.del) return '';
  return `<div class="pphrase"><p class="kicker">词组 · locution</p><p class="pf small">${esc(ph.fr)} <button type="button" class="say" data-pop-say="${esc(ph.fr)}" aria-label="Écouter">${speakerIcon()}</button></p>
    ${ph.zh ? `<p class="pz">${esc(ph.zh)}</p>` : ''}<button type="button" class="link" data-pop-unphrase="${esc(k)}">移除这个词组</button></div>`;
}

function contentFor(el) {
  return phraseBlock(el) + wordContent(el);
}

function wordContent(el) {
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

/* ------------------------------------------------------------------ phrases */
/*
 * Select a few words in any example sentence or passage to keep them as a phrase to learn
 * ("avoir du mal à", "au fur et à mesure"). Phrases are underlined wherever they appear,
 * listed on the practice page, practised like words, and synced (tombstones on removal).
 */
const SENT_SEL = '.ex, .d-sent';
const phraseKey = t => t.toLowerCase().replace(/’/g, "'").replace(/\s+/g, ' ').trim();
const plainOf = el => {
  const c = el.cloneNode(true);
  c.querySelectorAll('.gl, button, .blank, input').forEach(x => x.remove());
  return c.textContent.replace(/\s+/g, ' ').trim();
};
const livePhrases = () => Object.entries(S().phrases || {}).filter(([, v]) => v && !v.del);

export function removePhrase(k) {
  const st = S();
  st.phrases = st.phrases || {};
  st.phrases[k] = { del: true, t: Date.now() };
  ctx.persist();
  paintPhrases(document);
  ctx.onChange && ctx.onChange();
}

export function paintPhrases(root = document) {
  const list = livePhrases().map(([k, v]) => [k, tokenize(v.fr).filter(t => t.word).map(t => t.key)]);
  root.querySelectorAll(SENT_SEL).forEach(ex => {
    ex.querySelectorAll('.in-phrase').forEach(e => {
      e.classList.remove('in-phrase', 'ph-start', 'ph-end');
      delete e.dataset.phrase;
    });
    if (!list.length) return;
    // The sentence as a sequence of word keys, each pointing at its element.
    const seq = [];
    ex.querySelectorAll('.tk, mark.target').forEach(el => {
      if (el.matches('.tk')) seq.push({ key: (el.dataset.k || '').replace(/’/g, "'"), el });
      else tokenize(el.textContent).filter(t => t.word).forEach(t => seq.push({ key: t.key, el }));
    });
    for (const [k, keys] of list) {
      if (!keys.length) continue;
      for (let i = 0; i + keys.length <= seq.length; i++) {
        if (keys.every((kk, j) => seq[i + j].key === kk)) {
          const els = [...new Set(seq.slice(i, i + keys.length).map(x => x.el))];
          els.forEach(el => {
            el.classList.add('in-phrase');
            el.dataset.phrase = k;
          });
          els[0].classList.add('ph-start');
          els[els.length - 1].classList.add('ph-end');
        }
      }
    }
  });
}

let phrasePop = null;
let pending = null;

function hidePhrasePop() {
  if (phrasePop) phrasePop.hidden = true;
  pending = null;
}

function offerPhrase() {
  const sel = window.getSelection();
  if (!sel || sel.isCollapsed || !sel.rangeCount) return hidePhrasePop();
  const range = sel.getRangeAt(0);
  const host = n => (n.nodeType === 1 ? n : n.parentElement);
  const a = host(range.startContainer) && host(range.startContainer).closest(SENT_SEL);
  const b = host(range.endContainer) && host(range.endContainer).closest(SENT_SEL);
  if (!a || a !== b || a.closest('.review')) return hidePhrasePop();
  const text = sel.toString().replace(/（[^）]*）/g, ' ').replace(/[«»“”]/g, '').replace(/\s+/g, ' ').trim().replace(/^[,.;:!?]+|[,.;:!?]+$/g, '').trim();
  const words = tokenize(text).filter(t => t.word);
  if (words.length < 2 || words.length > 14) return hidePhrasePop();
  const auto = words.map(t => (GLOSS[t.key] ? shortZh(GLOSS[t.key].zh) : t.text)).join(' ');
  const firstTk = a.querySelector('.tk, mark.target');
  pending = { fr: text, s: plainOf(a), from: firstTk ? firstTk.dataset.w || firstTk.dataset.target || '' : '' };
  if (!phrasePop) {
    phrasePop = document.createElement('form');
    phrasePop.id = 'phrase-pop';
    phrasePop.autocomplete = 'off';
    document.body.append(phrasePop);
    phrasePop.addEventListener('submit', e => {
      e.preventDefault();
      if (!pending) return;
      const st = S();
      st.phrases = st.phrases || {};
      const zh = phrasePop.querySelector('input').value.trim();
      st.phrases[phraseKey(pending.fr)] = { fr: pending.fr, zh, s: pending.s, from: pending.from, at: ctx.today(), t: Date.now() };
      ctx.persist();
      window.getSelection().removeAllRanges();
      hidePhrasePop();
      paintPhrases(document);
      ctx.onChange && ctx.onChange();
    });
    phrasePop.addEventListener('click', e => {
      if (e.target.closest('[data-cancel]')) {
        window.getSelection().removeAllRanges();
        hidePhrasePop();
      }
    });
  }
  const exists = S().phrases && S().phrases[phraseKey(text)] && !S().phrases[phraseKey(text)].del;
  phrasePop.innerHTML = `<p class="kicker">${exists ? '已经存过这个词组' : '存为词组，拿来背'}</p>
    <p class="pf small" lang="fr">${esc(text)}</p>
    <input name="zh" placeholder="意思（可选）：${esc(auto)}" aria-label="词组的意思">
    <div class="row"><button class="btn" type="submit">★ 存为词组</button><button class="link" type="button" data-cancel>取消</button></div>`;
  const r = range.getBoundingClientRect();
  const w = Math.min(300, window.innerWidth - 24);
  phrasePop.style.width = `${w}px`;
  phrasePop.style.left = `${Math.max(12, Math.min(window.innerWidth - w - 12, r.left + r.width / 2 - w / 2)) + window.scrollX}px`;
  phrasePop.style.top = `${r.bottom + 12 + window.scrollY}px`;
  phrasePop.hidden = false;
  hide();
}

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
  window.addEventListener('hashchange', hidePhrasePop);
  // Phrase capture: after a mouse selection, a touch selection (long press) or Shift+arrows.
  let selTimer = 0;
  const later = () => {
    clearTimeout(selTimer);
    selTimer = setTimeout(offerPhrase, 30);
  };
  document.addEventListener('mouseup', e => !(e.target.closest && e.target.closest('#phrase-pop')) && later());
  document.addEventListener('keyup', e => e.shiftKey && later());
  document.addEventListener('selectionchange', () => {
    if (!('ontouchstart' in window)) return;
    clearTimeout(selTimer);
    selTimer = setTimeout(offerPhrase, 600);
  });
  // Underline saved phrases whenever new sentences are drawn.
  const main = document.getElementById('app');
  let paintTimer = 0;
  if (main && 'MutationObserver' in window) {
    new MutationObserver(() => {
      clearTimeout(paintTimer);
      paintTimer = setTimeout(() => paintPhrases(main), 40);
    }).observe(main, { childList: true, subtree: true });
  }
}
