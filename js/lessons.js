/*
 * Grammaire and Lecture: lesson pages with drills, and reading passages with questions.
 * Content lives in data/grammar/ and data/reading/ (one file per lesson / passage).
 * Results are saved as S.grammar[id] / S.reading[id] = { best, last, t } and synced.
 */
import GRAMMAR from '../data/grammar/index.js';
import READING from '../data/reading/index.js';
import { checkAnswer, checkSentence, clozeParts, plainSentence, wordDiff } from './check.js';
import { textHtml } from './gloss.js';
import { tickMark, crossMark, speakerIcon } from './art.js';

export const LESSONS = [...GRAMMAR].sort((a, b) => a.n - b.n);
export const PASSAGES = [...READING].sort((a, b) => a.n - b.n);
const lessonById = Object.fromEntries(LESSONS.map(l => [l.id, l]));
const passageById = Object.fromEntries(PASSAGES.map(p => [p.id, p]));

let ctx = null; // { app, state, persist, speak, setView, inkIn, accentKeys }
export const initLessons = c => (ctx = c);

const esc = s =>
  String(s ?? '').replace(/'/g, '’').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// *français* → italic term, **gras** → bold. Applied after escaping.
const md = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em class="term" lang="fr">$1</em>');
const say = (text, label = 'Écouter') =>
  `<button class="say" type="button" data-say="${esc(text)}" aria-label="${label}">${speakerIcon()}</button>`;
const pct = r => (r ? Math.round((r.best || 0) * 100) : null);
const S = () => ctx.state();

function saveResult(kind, id, score) {
  const st = S();
  st[kind] = st[kind] || {};
  const prev = st[kind][id];
  st[kind][id] = { best: Math.max(score, (prev && prev.best) || 0), last: score, t: Date.now() };
  ctx.persist();
}

/* ================================================================ Grammaire */

export function renderGrammarList() {
  ctx.setView('grammar');
  const levels = ['A2', 'B1', 'B2'];
  const done = LESSONS.filter(l => S().grammar && S().grammar[l.id]).length;
  ctx.app.innerHTML = `
  <section class="lessons">
    <a class="back" href="#/">← Retour</a>
    <p class="eyebrow">Grammaire · 语法</p>
    <h1 class="medium-heading">La grammaire, pas à pas<em class="accent">.</em></h1>
    <p class="lede">${LESSONS.length} 课，从现在时到虚拟式和关系代词。每课先看讲解（例句里的词都能指着看翻译），再做练习，系统当场批改。已经练过 ${done} 课。</p>
    ${
      LESSONS.length
        ? levels
            .map(lv => {
              const ls = LESSONS.filter(l => l.level === lv);
              if (!ls.length) return '';
              return `<h2 class="level-head"><span>${lv}</span>${{ A2: '打基础', B1: '考试核心', B2: '冲高分' }[lv]}</h2>
              <ol class="lesson-grid">${ls
                .map(l => {
                  const r = S().grammar && S().grammar[l.id];
                  return `<li><a class="lesson-card" href="#/grammaire/${l.id}">
                    <span class="num">${String(l.n).padStart(2, '0')}</span>
                    <span class="lname">${esc(l.fr)}</span>
                    <span class="lsub">${esc(l.zh)}</span>
                    <span class="lstat">${r ? `<b>${pct(r)}%</b> 最好成绩` : `${l.drills.length} 道练习`}</span>
                    <span class="meter"><span class="got" style="width:${r ? pct(r) : 0}%"></span></span>
                  </a></li>`;
                })
                .join('')}</ol>`;
            })
            .join('')
        : '<p class="empty">语法课还在准备中。</p>'
    }
  </section>`;
}

let drill = null; // { lesson, list, i, right, wrong: [], state }

export function renderLesson(id) {
  const l = lessonById[id];
  if (!l) return renderGrammarList();
  ctx.setView('grammar');
  const r = S().grammar && S().grammar[id];
  const idx = LESSONS.indexOf(l);
  const next = LESSONS[idx + 1];
  ctx.app.innerHTML = `
  <section class="lesson">
    <a class="back" href="#/grammaire">← Toutes les leçons</a>
    <p class="eyebrow">Leçon ${String(l.n).padStart(2, '0')} · ${l.level}${r ? ` · 最好 ${pct(r)}%` : ''}</p>
    <h1 class="medium-heading">${esc(l.fr)}</h1>
    <p class="sub">${esc(l.zh)}</p>
    <p class="lede">${md(l.summary)}</p>
    <nav class="toc">${l.explain.map((s, i) => `<a href="#/grammaire/${id}" data-jump="sec-${i}">${esc(s.h)}</a>`).join('')}<a href="#/grammaire/${id}" data-jump="drills" class="go">→ 直接做练习</a></nav>
    ${l.explain
      .map(
        (s, i) => `
      <article class="g-sec" id="sec-${i}">
        <h2><span>${String(i + 1).padStart(2, '0')}</span>${esc(s.h)}</h2>
        <p>${md(s.p)}</p>
        ${
          s.table
            ? `<div class="g-table"><table><thead><tr>${s.table.head.map(h => `<th>${md(h)}</th>`).join('')}</tr></thead><tbody>${s.table.rows
                .map(row => `<tr>${row.map(c => `<td lang="fr">${md(c)}</td>`).join('')}</tr>`)
                .join('')}</tbody></table></div>`
            : ''
        }
        ${
          s.ex && s.ex.length
            ? `<ul class="g-ex">${s.ex.map(([fr, zh]) => `<li><p class="ex">${textHtml(fr, `g:${id}`)} ${say(fr)}</p><p class="tr">${esc(zh)}</p></li>`).join('')}</ul>`
            : ''
        }
      </article>`,
      )
      .join('')}
    ${
      l.tips && l.tips.length
        ? `<aside class="g-tips"><p class="hand">attention&nbsp;!</p><ul>${l.tips.map(t => `<li>${md(t)}</li>`).join('')}</ul></aside>`
        : ''
    }
    <div id="drills" class="drills-anchor"></div>
    <h2 class="part-head"><span class="hand">à vous</span>Exercices</h2>
    <div class="drill-box" id="drill-box"></div>
    ${next ? `<p class="next-lesson">下一课：<a href="#/grammaire/${next.id}">${esc(next.fr)} · ${esc(next.zh)} →</a></p>` : ''}
  </section>`;
  startDrills(l, l.drills);
}

const CONJ_PRON = /^((?:que |qu')?(?:j'|je |tu |il\/elle |il\/elle\/on |il |elle |on |nous |vous |ils\/elles |ils |elles ))(.+)$/i;
const splitConj = f => {
  // A form may list accepted variants: "je m'assieds | je m'assois".
  const alts = f.split('|').map(x => x.trim());
  const m = alts[0].match(CONJ_PRON);
  if (!m) return ['', alts.join('|')];
  return [m[1], alts.map(a => (a.startsWith(m[1]) ? a.slice(m[1].length) : a)).join('|')];
};
// Put an option into the gap; an elided option (n', l', qu') joins the next word.
const fillGap = (s, o) => (/'$/.test(o) ? s.replace(/___\s*/, o) : s.replace('___', o));

function startDrills(lesson, list) {
  drill = { lesson, list, i: 0, right: 0, wrong: [], state: 'ask' };
  drawDrill();
}

function drawDrill() {
  const box = document.getElementById('drill-box');
  if (!box || !drill) return;
  const { list, i } = drill;
  if (i >= list.length) return drawDrillSummary(box);
  const d = list[i];
  let body = '';
  if (d.t === 'fill') {
    const p = clozeParts(d.s);
    const w = Math.max(5, Math.min(22, p.answer.length + 2));
    body = `<p class="d-sent" lang="fr">${esc(p.before)}<input class="answer inline" style="width:${w}ch" spellcheck="false" autocapitalize="off" autocomplete="off" lang="fr" aria-label="答案">${esc(p.after)}</p>
      ${d.hint ? `<p class="d-hint">（${esc(d.hint)}）</p>` : ''}<p class="tr">${esc(d.zh)}</p>
      <div class="actions"><button class="btn" data-drill="check">Valider</button><button class="link" data-drill="skip">je ne sais pas</button></div>`;
  } else if (d.t === 'choice') {
    body = `<p class="d-sent" lang="fr">${esc(d.s).replace('___', '<span class="blank">_____</span>')}</p>${d.zh ? `<p class="tr">${esc(d.zh)}</p>` : ''}
      <div class="options">${d.o.map((o, k) => `<button class="opt" data-pick-i="${k}" lang="fr"><b>${k + 1}</b>${esc(o)}</button>`).join('')}</div>`;
  } else if (d.t === 'transform') {
    body = `<p class="d-task">${md(d.task)}</p><p class="d-sent" lang="fr">${esc(d.from)}</p>${d.zh ? `<p class="tr">${esc(d.zh)}</p>` : ''}
      <textarea class="answer long" rows="2" spellcheck="false" lang="fr" placeholder="Écrivez la phrase…" aria-label="答案"></textarea>
      <div class="actions"><button class="btn" data-drill="check">Valider</button><button class="link" data-drill="skip">je ne sais pas</button></div>`;
  } else if (d.t === 'conj') {
    body = `<p class="d-task">把 <em class="term" lang="fr">${esc(d.verb)}</em> 变位：<b>${esc(d.tense)}</b></p>
      <div class="conj">${d.forms
        .map(f => {
          const [pr, rest] = splitConj(f);
          return `<label class="conj-row"><span class="pr" lang="fr">${esc(pr.trim())}</span><input class="answer conj-in" data-a="${esc(rest)}" spellcheck="false" autocapitalize="off" autocomplete="off" lang="fr" style="width:${Math.max(8, rest.split('|')[0].length + 3)}ch"><span class="cmark"></span></label>`;
        })
        .join('')}</div>
      <div class="actions"><button class="btn" data-drill="check">Valider</button><button class="link" data-drill="skip">je ne sais pas</button></div>`;
  }
  box.innerHTML = `
    <div class="topline small"><div class="track"><span style="width:${(i / list.length) * 100}%"></span></div><span class="count">${i + 1}<i>/</i>${list.length}</span></div>
    <article class="sheet card drill ${d.t}">
      <p class="kicker">${{ fill: 'Compléter · 填空', choice: 'Choisir · 选择', transform: 'Transformer · 改写', conj: 'Conjuguer · 变位' }[d.t]}</p>
      ${body}
      <div class="feedback" aria-live="polite"></div>
    </article>
    ${d.t === 'choice' ? '' : ctx.accentKeys()}`;
  drill.state = 'ask';
  const first = box.querySelector('.answer');
  if (first && drill.i > 0) first.focus({ preventScroll: true });
}

function checkDrill(skipped = false, pick = null) {
  if (!drill || drill.state !== 'ask') return;
  const d = drill.list[drill.i];
  const box = document.getElementById('drill-box');
  const strict = S().settings.strictAccents;
  let ok = false;
  let answerHtml = '';
  let note = '';
  if (d.t === 'fill') {
    const typed = box.querySelector('.answer').value;
    const answers = [clozeParts(d.s).answer, ...(d.alt || [])];
    const res = skipped ? { ok: false } : answers.map(a => checkAnswer(typed, a, { strictAccents: strict })).find(r => r.ok) || checkAnswer(typed, answers[0], { strictAccents: strict });
    ok = res.ok;
    if (res.verdict === 'accent' && ok) note = '对了，注意重音。';
    answerHtml = `<p class="ex" lang="fr">${esc(plainSentence(d.s).replace(clozeParts(d.s).answer, '\u0000'))
      .replace('\u0000', `<mark>${esc(clozeParts(d.s).answer)}</mark>`)} ${say(plainSentence(d.s))}</p>${d.alt && d.alt.length ? `<p class="tr">也可以：${d.alt.map(esc).join(' / ')}</p>` : ''}`;
  } else if (d.t === 'choice') {
    ok = !skipped && pick === d.a;
    box.querySelectorAll('.opt').forEach((b, k) => {
      b.disabled = true;
      if (k === d.a) b.classList.add('right');
      else if (k === pick) b.classList.add('wrong');
    });
    answerHtml = `<p class="ex" lang="fr">${esc(fillGap(d.s, d.o[d.a]))} ${say(fillGap(d.s, d.o[d.a]))}</p>`;
  } else if (d.t === 'transform') {
    const typed = box.querySelector('.answer').value;
    const results = skipped ? [] : d.to.map(t => checkSentence(typed, t, { strictAccents: strict }));
    ok = results.some(r => r.ok);
    const near = !ok && typed.trim() && d.to.length ? wordDiff(typed, d.to[0]) : null;
    answerHtml = `${near ? `<p class="yours">你写的：${esc(typed)}</p>` : ''}<p class="ex" lang="fr">${
      near ? near.map(x => (x.s === 'same' ? esc(x.w) : `<b class="diff">${esc(x.w)}</b>`)).join(' ') : esc(d.to[0])
    } ${say(d.to[0])}</p>${d.to.length > 1 ? `<p class="tr">也可以：${d.to.slice(1).map(esc).join(' / ')}</p>` : ''}`;
  } else if (d.t === 'conj') {
    let all = true;
    box.querySelectorAll('.conj-in').forEach(inp => {
      const alts = inp.dataset.a.replace(/’/g, "'").split('|');
      const good = !skipped && alts.some(a => checkAnswer(inp.value, a, { strictAccents: strict }).ok);
      all = all && good;
      const row = inp.closest('.conj-row');
      row.classList.add(good ? 'ok' : 'bad');
      if (!good) row.querySelector('.cmark').textContent = inp.dataset.a.split('|').join(' / ');
    });
    ok = all;
    answerHtml = `<p class="ex" lang="fr">${d.forms.map(f => esc(f.split('|').map(x => x.trim()).join(' / '))).join(' · ')}</p>`;
  }
  box.querySelectorAll('input, textarea, [data-drill="check"]').forEach(e => (e.disabled = true));
  drill.state = 'shown';
  if (ok) drill.right += 1;
  else drill.wrong.push(d);
  const fb = box.querySelector('.feedback');
  fb.innerHTML = `
    <div class="verdict">${ok ? tickMark() : crossMark()}<div><p class="v-fr">${ok ? 'Exact.' : skipped ? 'On le revoit.' : 'Pas encore.'}</p><p class="v-zh">${ok ? note || '答对了' : '正确答案如下'}</p></div></div>
    <div class="reveal">${answerHtml}${d.why ? `<p class="why">${md(d.why)}</p>` : ''}</div>
    <div class="actions"><button class="btn" data-drill="next">Continuer <span aria-hidden="true">→</span></button>${
      !ok && !skipped && d.t !== 'choice' ? '<button class="link" data-drill="override">我其实答对了（算对）</button>' : ''
    }</div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => fb.classList.add('on')));
  fb.querySelector('[data-drill="next"]').focus({ preventScroll: true });
}

function drawDrillSummary(box) {
  const { lesson, list, right, wrong } = drill;
  const score = list.length ? right / list.length : 0;
  const full = list === lesson.drills;
  if (full) saveResult('grammar', lesson.id, score);
  const next = LESSONS[LESSONS.indexOf(lesson) + 1];
  box.innerHTML = `
    <article class="sheet card drill-done">
      <p class="kicker">${full ? 'Leçon terminée' : 'Erreurs revues'} · ${esc(lesson.fr)}</p>
      <div class="nums">
        <div><span class="big">${right}<small>/${list.length}</small></span><span class="lab">réponses justes<br><i>答对</i></span></div>
        <div><span class="big">${Math.round(score * 100)}<small>%</small></span><span class="lab">score<br><i>得分</i></span></div>
      </div>
      <p class="hand sign">${score >= 0.85 ? 'très bien&nbsp;!' : score >= 0.6 ? 'on y est presque' : 'on recommence&nbsp;?'}</p>
      <div class="actions">
        ${wrong.length ? `<button class="btn" data-drill="redo-wrong">只重做错的 ${wrong.length} 题</button>` : ''}
        <button class="btn ghost" data-drill="redo">全部再做一遍</button>
        ${next ? `<a class="btn ghost" href="#/grammaire/${next.id}">下一课 →</a>` : ''}
      </div>
    </article>`;
}

/* ================================================================ Lecture */

export function renderReadingList() {
  ctx.setView('reading');
  ctx.app.innerHTML = `
  <section class="lessons">
    <a class="back" href="#/">← Retour</a>
    <p class="eyebrow">Compréhension écrite · 阅读理解</p>
    <h1 class="medium-heading">Lire, comprendre, répondre<em class="accent">.</em></h1>
    <p class="lede">TCF / TEF 风格的原创短文：启事、邮件、论坛、文章、社论。每个词都能指着看翻译、标为重点；每段可以朗读、看中文。读完做题，系统给出依据。</p>
    ${
      PASSAGES.length
        ? `<ol class="lesson-grid reading-grid">${PASSAGES.map(p => {
            const r = S().reading && S().reading[p.id];
            return `<li><a class="lesson-card" href="#/lecture/${p.id}">
              <span class="num">${String(p.n).padStart(2, '0')}</span>
              <span class="kind-tag">${esc(p.kind)} · ${p.level}</span>
              <span class="lname">${esc(p.title)}</span>
              <span class="lsub">${esc(p.zh)}</span>
              <span class="lstat">${r ? `<b>${Math.round(r.best * p.questions.length)}/${p.questions.length}</b> 最好成绩` : `${p.questions.length} 道题`}</span>
            </a></li>`;
          }).join('')}</ol>`
        : '<p class="empty">阅读材料还在准备中。</p>'
    }
  </section>`;
}

let answers = {};

export function renderPassage(id) {
  const p = passageById[id];
  if (!p) return renderReadingList();
  ctx.setView('reading');
  answers = {};
  const idx = PASSAGES.indexOf(p);
  const next = PASSAGES[idx + 1];
  const words = p.text.join(' ').split(/\s+/).length;
  ctx.app.innerHTML = `
  <section class="passage">
    <a class="back" href="#/lecture">← Tous les textes</a>
    <p class="eyebrow">Lecture ${String(p.n).padStart(2, '0')} · ${p.level} · ${esc(p.kind)}</p>
    <div class="p-tools">
      <button class="btn ghost" data-read="all">${speakerIcon()} 朗读全文</button>
      <button class="btn ghost" data-read="tr" aria-pressed="false">显示中文</button>
      <span class="note">${words} mots · 约 ${Math.max(1, Math.round(words / 120))} 分钟</span>
    </div>
    <article class="doc card">
      <p class="kicker">${esc(p.kind)}</p>
      <h1 class="doc-title" lang="fr">${esc(p.title)}</h1>
      ${p.text
        .map(
          (para, i) => `<div class="para"><p class="ex" lang="fr">${textHtml(para, `r:${id}`)}</p>
            <div class="para-tools">${say(para, 'Écouter ce paragraphe')}<button class="link" data-read="tr-one" data-i="${i}">译</button></div>
            <p class="ptr" data-i="${i}" hidden>${esc(p.tr[i])}</p></div>`,
        )
        .join('')}
    </article>
    <h2 class="part-head"><span class="hand">à vous</span>Questions</h2>
    <ol class="questions">
      ${p.questions
        .map(
          (q, k) => `<li class="question card" data-q="${k}">
            <p class="qn"><span>${k + 1}</span>${esc(q.q)}</p>
            <p class="tr">${esc(q.zh)}</p>
            <div class="options">${q.o.map((o, j) => `<button class="opt" data-ans="${k}:${j}" lang="fr"><b>${'ABCD'[j]}</b>${esc(o)}</button>`).join('')}</div>
            <p class="why" hidden></p>
          </li>`,
        )
        .join('')}
    </ol>
    <div class="actions center"><button class="btn" data-read="submit">提交答案</button><span class="note q-left">还有 ${p.questions.length} 题没选</span></div>
    <div class="p-result" aria-live="polite"></div>
    ${next ? `<p class="next-lesson">下一篇：<a href="#/lecture/${next.id}">${esc(next.title)} · ${esc(next.zh)} →</a></p>` : ''}
  </section>`;
}

function submitPassage(id) {
  const p = passageById[id];
  let right = 0;
  p.questions.forEach((q, k) => {
    const li = ctx.app.querySelector(`[data-q="${k}"]`);
    li.querySelectorAll('.opt').forEach((b, j) => {
      b.disabled = true;
      b.classList.remove('picked');
      if (j === q.a) b.classList.add('right');
      else if (answers[k] === j) b.classList.add('wrong');
    });
    const good = answers[k] === q.a;
    if (good) right++;
    li.classList.add(good ? 'is-right' : 'is-wrong');
    const why = li.querySelector('.why');
    why.innerHTML = `${good ? '✓ ' : `✗ 正确答案 ${'ABCD'[q.a]}。`}${md(q.why)}`;
    why.hidden = false;
  });
  saveResult('reading', id, right / p.questions.length);
  const res = ctx.app.querySelector('.p-result');
  res.innerHTML = `<article class="sheet card drill-done">
      <div class="verdict">${right === p.questions.length ? tickMark() : crossMark()}<div><p class="v-fr">${right} / ${p.questions.length}</p><p class="v-zh">每题下面写了答案在原文的哪里。</p></div></div>
      <div class="actions"><button class="btn ghost" data-read="retry">重新做一遍</button></div></article>`;
  requestAnimationFrame(() => res.querySelectorAll('.mark').forEach(m => m.closest('.verdict') && m.classList.add('on')));
  ctx.app.querySelector('[data-read="submit"]').hidden = true;
  ctx.app.querySelector('.q-left').hidden = true;
}

/* ================================================================ events */

export function handleLessonClick(t) {
  const routeId = () => location.hash.split('/')[2];
  if (t.dataset.jump) {
    const el = document.getElementById(t.dataset.jump);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }
  if (t.dataset.drill) {
    const a = t.dataset.drill;
    if (a === 'check') checkDrill(false);
    else if (a === 'skip') checkDrill(true);
    else if (a === 'next') {
      drill.i += 1;
      drawDrill();
      const box = document.getElementById('drill-box');
      if (box && box.getBoundingClientRect().top < 0) box.scrollIntoView({ block: 'start' });
    } else if (a === 'override') {
      drill.right += 1;
      drill.wrong.pop();
      drill.i += 1;
      drawDrill();
    } else if (a === 'redo') startDrills(drill.lesson, drill.lesson.drills);
    else if (a === 'redo-wrong') startDrills(drill.lesson, drill.wrong);
    return true;
  }
  if (t.dataset.pickI !== undefined && drill && drill.state === 'ask') {
    checkDrill(false, Number(t.dataset.pickI));
    return true;
  }
  if (t.dataset.ans) {
    const [k, j] = t.dataset.ans.split(':').map(Number);
    answers[k] = j;
    t.closest('.options').querySelectorAll('.opt').forEach(b => b.classList.toggle('picked', b === t));
    const p = passageById[routeId()];
    const left = p.questions.length - Object.keys(answers).length;
    const el = ctx.app.querySelector('.q-left');
    if (el) el.textContent = left ? `还有 ${left} 题没选` : '都选好了';
    return true;
  }
  if (t.dataset.read) {
    const p = passageById[routeId()];
    const a = t.dataset.read;
    if (a === 'all') ctx.speak(p.text.join(' '), { rate: 0.9 });
    else if (a === 'tr') {
      const on = t.getAttribute('aria-pressed') !== 'true';
      t.setAttribute('aria-pressed', on);
      t.textContent = on ? '隐藏中文' : '显示中文';
      ctx.app.querySelectorAll('.ptr').forEach(x => (x.hidden = !on));
    } else if (a === 'tr-one') {
      const x = ctx.app.querySelector(`.ptr[data-i="${t.dataset.i}"]`);
      x.hidden = !x.hidden;
    } else if (a === 'submit') submitPassage(p.id);
    else if (a === 'retry') renderPassage(p.id);
    return true;
  }
  return false;
}

/* Enter submits / continues inside a drill. */
export function handleLessonKey(e) {
  if (!drill || !document.getElementById('drill-box')) return false;
  if (e.key !== 'Enter' || e.shiftKey) return false;
  if (!e.target.closest || !e.target.closest('#drill-box')) return false;
  e.preventDefault();
  if (drill.state === 'ask') {
    const d = drill.list[drill.i];
    if (d.t !== 'choice') checkDrill(false);
  } else {
    drill.i += 1;
    drawDrill();
  }
  return true;
}

export const lessonCounts = () => ({ lessons: LESSONS.length, passages: PASSAGES.length });
