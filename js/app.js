import { THEMES, WORDS } from '../data/deck.js';
import { checkAnswer, checkSentence, wordDiff, copyProgress, clozeParts, plainSentence, sentenceTokens, bareNoun, isNoun, diffMarks } from './check.js';
import { dayKey, addDays, grade, planDay, streak, isLearned, isNew, LEARNED_BOX, MAX_BOX } from './srs.js';
import * as store from './store.js';
import { initSpeech, speak, hasFrenchVoice } from './speech.js';
import { heroPlate, themeIcon, tickMark, crossMark, speakerIcon, monthSketch, startBirds } from './art.js';
import { GLOSS, tokenize } from '../data/glossary.js';
import { initGloss, sentenceHtml, starButton, refresh as refreshGloss, shortZh, hide as hidePop } from './gloss.js';
import { aggregateLog, liveKeys } from './merge.js';
import * as sync from './sync.js';
import { initPwa, installState, promptInstall } from './pwa.js';
import { initLessons, renderGrammarList, renderLesson, renderReadingList, renderPassage, handleLessonClick, handleLessonKey, LESSONS, PASSAGES } from './lessons.js';

/* ---------------------------------------------------------------- state */

let S = store.load();
const byId = Object.fromEntries(WORDS.map(w => [w.id, w]));
const themeById = Object.fromEntries(THEMES.map(t => [t.id, t]));
const app = document.getElementById('app');
const DEV = store.deviceId();
// Every change is saved locally at once and synced to the other devices a few seconds later.
const persist = () => {
  S.log = aggregateLog(S.devlog);
  store.save(S);
  sync.schedule();
};

// Shown with the typographic apostrophe (l’emploi); the checker accepts either one.
const esc = s =>
  String(s).replace(/'/g, '’').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const shuffle = a => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const pickOne = a => a[Math.floor(Math.random() * a.length)];

const KIND = {
  m: ['n.m.', '阳性名词'],
  f: ['n.f.', '阴性名词'],
  'm.pl': ['n.m.pl.', '阳性复数名词'],
  'f.pl': ['n.f.pl.', '阴性复数名词'],
  v: ['v.', '动词'],
  adj: ['adj.', '形容词'],
  adv: ['adv.', '副词'],
  loc: ['loc.', '固定表达'],
  w: ['mot', '例句里标记的词'],
};
const meaning = w => (S.settings.prompt === 'en' ? w.en : w.zh);
const meaningAlt = w => (S.settings.prompt === 'en' ? w.zh : w.en);

const today = () => dayKey();
/* This device's counters for today (daily totals across devices are in S.log). */
const logToday = () => {
  const k = today();
  S.devlog[k] = S.devlog[k] || {};
  const e = (S.devlog[k][DEV] = S.devlog[k][DEV] || { new: 0, right: 0, wrong: 0, done: false });
  e.t = Date.now();
  return e;
};

/* ---------------------------------------------------------------- shell */

function setView(name) {
  document.body.dataset.view = name;
  window.scrollTo(0, 0);
}

function inkIn(root = app) {
  // Start the pen-drawing transitions after the elements are in the DOM.
  requestAnimationFrame(() => requestAnimationFrame(() => root.querySelectorAll('.plate, .draw').forEach(el => el.classList.add('on'))));
}

function route() {
  const h = location.hash.replace(/^#\/?/, '');
  const [view, arg] = h.split('/');
  if (view === 'session') return session ? renderSession() : syncFirst(() => startSession());
  if (view === 'theme' && themeById[arg]) return renderTheme(themeById[arg]);
  if (view === 'reglages') return renderSettings();
  if (view === 'exercices') return renderPractice();
  if (view === 'grammaire') return arg ? renderLesson(arg) : renderGrammarList();
  if (view === 'lecture') return arg ? renderPassage(arg) : renderReadingList();
  return renderHome();
}
window.addEventListener('hashchange', route);

/* ---------------------------------------------------------------- home */

function stats() {
  let learned = 0;
  let learning = 0;
  for (const w of WORDS) {
    const c = S.cards[w.id];
    if (isLearned(c)) learned++;
    else if (!isNew(c)) learning++;
  }
  return { learned, learning, unseen: WORDS.length - learned - learning };
}

function todayPlan() {
  const lt = S.log[today()];
  const left = Math.max(0, S.settings.dailyNew - (lt ? lt.new : 0));
  return planDay(WORDS, S.cards, {
    dailyNew: left,
    reviewCap: S.settings.reviewCap,
    themes: S.settings.themes,
    today: today(),
  });
}

function last30() {
  const out = [];
  const k0 = today();
  for (let i = 29; i >= 0; i--) {
    const k = addDays(k0, -i);
    const l = S.log[k];
    out.push({ key: k, count: l ? l.right + l.wrong : 0, done: !!(l && l.done), today: i === 0 });
  }
  return out;
}

function renderHome() {
  setView('home');
  const plan = todayPlan();
  const st = stats();
  const sk = streak(S.log, today());
  const nothing = plan.reviews.length + plan.fresh.length === 0;
  const keyCount = liveKeys(S.starred).length + liveKeys(S.marked).length;
  const boxes = Array.from({ length: MAX_BOX + 1 }, (_, b) => WORDS.filter(w => (S.cards[w.id] ? S.cards[w.id].box : -1) === b).length);
  const boxMax = Math.max(1, ...boxes);
  const themeNames = S.settings.themes.length
    ? S.settings.themes.map(id => themeById[id].fr).join(' · ')
    : 'tous les thèmes, dans l’ordre';

  app.innerHTML = `
  <section class="hero">
    <div class="copy">
      <p class="eyebrow">Carnet de vocabulaire · TCF / TEF Canada</p>
      <h1 class="big-heading">Un mot à la fois,<br><em class="accent">chaque jour.</em></h1>
      <p class="lede">像当年背高考 3000 词一样：每天一张清单，新词带冠词和例句学，再用拼写、例句填空、组句、阴阳性和听写检查是不是真的记住了。复习按间隔重复排期，进度只保存在你自己的浏览器里。</p>

      <div class="today card">
        <p class="kicker">Aujourd’hui · ${new Date().toLocaleDateString('fr-CA', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        ${
          nothing
            ? `<p class="done-line"><span class="hand">Tout est fait&nbsp;!</span> 今天的清单完成了。</p>
               <div class="actions">
                 <button class="btn" data-act="more">再学 5 个新词</button>
                 <a class="btn ghost" href="#/exercices">自由练习</a>
                 <a class="btn ghost" href="#/theme/${(THEMES.find(t => WORDS.some(w => w.theme === t.id && isNew(S.cards[w.id]))) || THEMES[0]).id}">浏览主题</a>
               </div>`
            : `<div class="nums">
                 <div><span class="big">${plan.reviews.length}</span><span class="lab">à revoir<br><i>待复习</i></span></div>
                 <div><span class="big">${plan.fresh.length}</span><span class="lab">nouveaux<br><i>新词</i></span></div>
                 <div><span class="big">${sk}</span><span class="lab">jours de suite<br><i>连续天数</i></span></div>
               </div>
               <div class="actions">
                 <a class="btn" href="#/session">Commencer la séance <span aria-hidden="true">→</span></a>
                 <a class="btn ghost" href="#/exercices">自由练习</a>
               </div>
               <p class="note">新词来自：${esc(themeNames)}。<a href="#/reglages">调整每日数量与主题</a>${keyCount ? ` · 重点词 ${keyCount} 个，<a href="#/exercices">去练</a>` : ''}</p>`
        }
      </div>
    </div>
    <figure class="plate-wrap">
      <div class="plate">${heroPlate()}</div>
      <figcaption>Pl. I — le carnet <span>FRvc</span></figcaption>
    </figure>
  </section>

  <section id="progres">
    <h2 class="numbered-heading draw">Ma progression</h2>
    <p class="chapter-lede">每个词在 0–7 号盒子之间移动：答对升一格，下次复习推迟到 1、2、4、7、15、30、60 天后；答错回到 1 号盒子，明天再见。到 5 号盒子算“掌握”。</p>
    <div class="progress-grid">
      <div class="engraved">
        <div><span class="big">${st.learned}</span><span class="lab">acquis · 已掌握</span></div>
        <div><span class="big">${st.learning}</span><span class="lab">en cours · 学习中</span></div>
        <div><span class="big">${st.unseen}</span><span class="lab">à découvrir · 未学</span></div>
      </div>
      <figure class="month-wrap draw">
        ${monthSketch(last30())}
        <figcaption>Les 30 derniers jours — 斜线越密练得越多，打勾表示当天清单完成。</figcaption>
      </figure>
      <figure class="boxes draw" aria-label="Words per review box">
        ${boxes
          .map(
            (n, b) => `<div class="box ${b >= LEARNED_BOX ? 'warm' : ''}">
              <span class="bar" style="--h:${((n / boxMax) * 100).toFixed(1)}%"></span>
              <span class="n">${n}</span><span class="b">${b}</span></div>`,
          )
          .join('')}
        <figcaption>Boîtes de Leitner · 每个盒子里的词数</figcaption>
      </figure>
    </div>
  </section>

  <section id="etudier">
    <h2 class="numbered-heading draw">Grammaire &amp; lecture</h2>
    <div class="study-grid">
      <a class="study-card draw" href="#/grammaire">
        ${themeIcon('quill')}
        <span class="sname">Grammaire</span>
        <span class="ssub">语法 · ${LESSONS.length} 课，讲解 + 当场批改的练习</span>
        <span class="sstat">${Object.keys(S.grammar || {}).length} / ${LESSONS.length} 已练</span>
      </a>
      <a class="study-card draw" href="#/lecture">
        ${themeIcon('newspaper')}
        <span class="sname">Lecture</span>
        <span class="ssub">阅读理解 · ${PASSAGES.length} 篇 TCF/TEF 风格原创短文</span>
        <span class="sstat">${Object.keys(S.reading || {}).length} / ${PASSAGES.length} 已读</span>
      </a>
    </div>
  </section>

  <section id="themes">
    <h2 class="numbered-heading draw">Les thèmes</h2>
    <p class="chapter-lede">按 TCF / TEF Canada 写作与口语最常出现的话题分组，最后一组是写观点作文必备的连接词。点开可以浏览、听发音，或只练这一个主题。</p>
    <div class="theme-grid">
      ${THEMES.map((t, i) => {
        const ws = WORDS.filter(w => w.theme === t.id);
        const l = ws.filter(w => isLearned(S.cards[w.id])).length;
        const s = ws.filter(w => !isNew(S.cards[w.id])).length;
        return `<a class="theme-card draw" href="#/theme/${t.id}" style="--d:${(i * 0.05).toFixed(2)}s">
          <span class="num">${String(i + 1).padStart(2, '0')}</span>
          ${themeIcon(t.icon)}
          <span class="tname">${esc(t.fr)}</span>
          <span class="tsub">${esc(t.zh)}</span>
          <span class="meter"><span class="seen" style="width:${(s / ws.length) * 100}%"></span><span class="got" style="width:${(l / ws.length) * 100}%"></span></span>
          <span class="tcount">${l} / ${ws.length} acquis</span>
        </a>`;
      }).join('')}
    </div>
  </section>

  <section id="methode">
    <h2 class="numbered-heading draw">La méthode</h2>
    <ol class="method">
      <li><span class="step">I</span><h3>Découvrir</h3><p>新词卡：带冠词的完整形式、词性、中英释义、原创例句和发音。</p><span class="hand">le, la, l’ — toujours&nbsp;!</span></li>
      <li><span class="step">II</span><h3>Reconnaître</h3><p>四选一认词、判断阴阳性，先把词形和意思连起来。</p><span class="hand">un coup d’œil</span></li>
      <li><span class="step">III</span><h3>Rappeler</h3><p>看中文拼写法语、例句填空、听写。重音写错会单独标出来，考试模式下算错。</p><span class="hand">é, è, ê…</span></li>
      <li><span class="step">IV</span><h3>Réutiliser</h3><p>把打乱的例句重新排好，练的是“会用”，正好对应口语和写作任务。</p><span class="hand">en contexte</span></li>
    </ol>
  </section>`;
  inkIn();
  observeDraw();
}

/* Headings, theme cards and the month sketch ink themselves in when scrolled to. */
function observeDraw() {
  const els = app.querySelectorAll('.draw:not(.on)');
  if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('on'));
  const io = new IntersectionObserver(
    entries =>
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('on');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.2 },
  );
  // inkIn() adds .on to everything; undo for below-the-fold items so they draw on scroll.
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      els.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top > window.innerHeight) {
          el.classList.remove('on');
          io.observe(el);
        }
      }),
    ),
  );
}

/* ---------------------------------------------------------------- theme page */

function renderTheme(t) {
  setView('theme');
  const ws = WORDS.filter(w => w.theme === t.id);
  const idx = THEMES.indexOf(t);
  app.innerHTML = `
  <section class="theme-page">
    <a class="back" href="#/">← Retour</a>
    <header class="theme-head">
      <div class="ticon-lg draw">${themeIcon(t.icon)}</div>
      <div>
        <p class="eyebrow">Thème ${String(idx + 1).padStart(2, '0')} · ${ws.length} mots</p>
        <h1 class="medium-heading">${esc(t.fr)}</h1>
        <p class="sub">${esc(t.zh)} · ${esc(t.en)}</p>
      </div>
      <div class="actions">
        <button class="btn" data-act="study-theme" data-theme="${t.id}">只练这个主题</button>
      </div>
    </header>
    <ol class="wordlist">
      ${ws
        .map(w => {
          const c = S.cards[w.id];
          const box = c ? c.box : -1;
          return `<li>
            <button class="say" data-say="${esc(w.fr)}" aria-label="Écouter ${esc(w.fr)}">${speakerIcon()}</button>
            <div class="w">
              <span class="fr">${esc(w.fr)}</span><span class="kind">${KIND[w.kind][0]}</span>${starButton(w.id)}
              <span class="mean">${esc(w.zh)} <i>${esc(w.en)}</i></span>
              <details><summary>例句</summary><p class="ex">${sentenceHtml(w)}</p><p class="tr">${esc(w.tr)}</p></details>
            </div>
            <span class="pips" title="${box < 0 ? '未学' : `第 ${box} 号盒子`}">${Array.from({ length: MAX_BOX }, (_, i) => `<i class="${i < box ? (i + 1 >= LEARNED_BOX ? 'w' : 'f') : ''}"></i>`).join('')}</span>
          </li>`;
        })
        .join('')}
    </ol>
  </section>`;
  inkIn();
}


/* ---------------------------------------------------------------- settings */

function renderSettings() {
  setView('settings');
  const s = S.settings;
  const ex = [
    ['recall', '看释义拼写'],
    ['cloze', '例句填空'],
    ['build', '组句'],
    ['choice', '四选一'],
    ['gender', '阴阳性'],
    ['dictation', '听写'],
    ['translate', '整句翻译'],
  ];
  app.innerHTML = `
  <section class="settings">
    <a class="back" href="#/">← Retour</a>
    <h1 class="medium-heading">Réglages</h1>
    <form class="card form" id="settings">
      <label class="row"><span>每天新词</span>
        <select name="dailyNew">${[5, 10, 15, 20, 30, 40].map(n => `<option ${n === s.dailyNew ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="row"><span>每天最多复习</span>
        <select name="reviewCap">${[40, 80, 120, 200].map(n => `<option ${n === s.reviewCap ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
      <label class="row"><span>释义语言</span>
        <select name="prompt"><option value="zh" ${s.prompt === 'zh' ? 'selected' : ''}>中文</option><option value="en" ${s.prompt === 'en' ? 'selected' : ''}>English</option></select></label>
      <label class="row check"><input type="checkbox" name="strictAccents" ${s.strictAccents ? 'checked' : ''}><span>考试模式：重音写错算错</span></label>
      <label class="row check"><input type="checkbox" name="autoSpeak" ${s.autoSpeak ? 'checked' : ''}><span>自动朗读法语</span></label>
      <fieldset><legend>练习题型</legend>
        ${ex.map(([k, l]) => `<label class="chip"><input type="checkbox" name="ex" value="${k}" ${s.exercises.includes(k) ? 'checked' : ''}><span>${l}</span></label>`).join('')}
      </fieldset>
      <fieldset><legend>新词来自哪些主题（都不选 = 全部，按顺序）</legend>
        ${THEMES.map(t => `<label class="chip"><input type="checkbox" name="themes" value="${t.id}" ${s.themes.includes(t.id) ? 'checked' : ''}><span>${esc(t.fr)}</span></label>`).join('')}
      </fieldset>
      <div class="actions"><button class="btn" type="submit">Enregistrer</button><span class="saved hand" hidden>enregistré&nbsp;✓</span></div>
    </form>
    ${syncCard()}
    ${installCard()}
    <div class="card form">
      <p class="kicker">Données · 数据</p>
      <p>${sync.config() ? '进度保存在这台设备上，并同步到你的私人 Gist。导出的文件可以留作备份。' : '没有连接同步时，进度只保存在这台设备的浏览器里。也可以导出文件，再在另一台设备导入。'}${hasFrenchVoice() ? '' : '<br><b>提示：</b>这个浏览器没有找到法语语音，听写题会自动跳过。'}</p>
      <div class="actions">
        <button class="btn ghost" data-act="export">导出进度</button>
        <label class="btn ghost file">导入进度<input type="file" accept="application/json" data-act="import" hidden></label>
        <button class="btn ghost danger" data-act="reset">清空所有进度</button>
      </div>
    </div>
  </section>`;
  document.getElementById('settings').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    S.settings = {
      ...S.settings,
      dailyNew: Number(f.get('dailyNew')),
      reviewCap: Number(f.get('reviewCap')),
      prompt: f.get('prompt'),
      strictAccents: f.get('strictAccents') === 'on',
      autoSpeak: f.get('autoSpeak') === 'on',
      exercises: f.getAll('ex').length ? f.getAll('ex') : ['recall'],
      themes: f.getAll('themes'),
    };
    S.settingsT = Date.now();
    persist();
    const ok = e.target.querySelector('.saved');
    ok.hidden = false;
    setTimeout(() => (ok.hidden = true), 1800);
  });
}

/* ---------------------------------------------------------------- free practice */

/*
 * Words marked inside example sentences become practice items of their own: the form as it
 * appears, its gloss, and the sentence it was marked in with that form as the gap.
 */
const pseudoById = {};
function pseudoWord(key) {
  const info = S.marked[key];
  const g = GLOSS[key];
  if (!info || !g) return null;
  // Marked in a vocabulary example, or in a grammar / reading sentence (info.s).
  const src = byId[info.from] || (info.s ? { theme: THEMES[0].id, ex: info.s, tr: '', fr: '' } : null);
  if (!src) return null;
  const toks = tokenize(plainSentence(src.ex));
  const k = toks.findIndex(t => t.word && t.key === key);
  if (k < 0) return null;
  const ex = toks.map((t, i) => (i === k ? `[[${t.text}]]` : t.text)).join('');
  const w = { id: `g:${key}`, theme: src.theme, fr: toks[k].text.toLowerCase(), kind: 'w', zh: shortZh(g.zh), en: g.en, ex, tr: src.tr };
  pseudoById[w.id] = w;
  return w;
}

function markSource(m) {
  if (byId[m.from]) return `见于 ${byId[m.from].fr}`;
  const [kind, rest] = String(m.from || '').split(':');
  const id = (rest || '').split('#')[0];
  if (kind === 'g') return `见于语法 · ${id}`;
  if (kind === 'r') return `见于阅读 · ${id}`;
  return '';
}

function practicePools() {
  const learnedToday = WORDS.filter(w => S.cards[w.id] && S.cards[w.id].last === today());
  const seen = WORDS.filter(w => !isNew(S.cards[w.id]));
  const starred = WORDS.filter(w => liveKeys(S.starred).includes(w.id));
  const marked = liveKeys(S.marked).map(pseudoWord).filter(Boolean);
  return { today: learnedToday, seen, key: [...starred, ...marked], all: WORDS };
}

const PRACTICE_MODES = [
  ['recall', '背诵拼写', '看中文，写出法语（名词带冠词）'],
  ['cloze', '例句填空', '例句挖空，填出原句里的形式'],
  ['translate', '整句翻译', '看中文句子，写出整句法语'],
  ['copy', '抄写', '单词和例句各抄一遍，逐字检查'],
  ['build', '组句', '把打乱的例句排好'],
  ['dictation', '听写', '听发音写出来'],
  ['gender', '阴阳性', '只练名词的 le / la'],
  ['mix', '混合', '每个词随机一种题型'],
];

function renderPractice() {
  setView('practice');
  const pools = practicePools();
  const last = S.practice || { mode: 'recall', scope: pools.today.length ? 'today' : pools.seen.length ? 'seen' : 'all', theme: THEMES[0].id, count: '20' };
  const scopeRow = (v, label, n) =>
    `<label class="chip"><input type="radio" name="scope" value="${v}" ${last.scope === v ? 'checked' : ''} ${n === 0 ? 'disabled' : ''}><span>${label} <i>${n}</i></span></label>`;
  const starred = WORDS.filter(w => liveKeys(S.starred).includes(w.id));
  const marked = liveKeys(S.marked).filter(k => GLOSS[k]);
  app.innerHTML = `
  <section class="practice">
    <a class="back" href="#/">← Retour</a>
    <p class="eyebrow">Exercices libres · 自由练习</p>
    <h1 class="medium-heading">S’entraîner<em class="accent">.</em></h1>
    <p class="lede">想练多少练多少。自由练习不会改动复习排期，只记进今天的练习量和 30 天打勾图。</p>
    <form class="card form" id="practice">
      <fieldset><legend>练什么 · Exercice</legend>
        <div class="modes">${PRACTICE_MODES.map(
          ([v, l, d]) => `<label class="mode"><input type="radio" name="mode" value="${v}" ${last.mode === v ? 'checked' : ''} ${v === 'dictation' && !hasFrenchVoice() ? 'disabled' : ''}><span><b>${l}</b><i>${v === 'dictation' && !hasFrenchVoice() ? '此浏览器没有法语语音' : d}</i></span></label>`,
        ).join('')}</div>
      </fieldset>
      <fieldset><legend>练哪些词 · Mots</legend>
        ${scopeRow('today', '今天学过的', pools.today.length)}
        ${scopeRow('seen', '所有学过的', pools.seen.length)}
        ${scopeRow('key', '我的重点', pools.key.length)}
        ${scopeRow('all', '全部词库', pools.all.length)}
        <label class="chip"><input type="radio" name="scope" value="theme" ${last.scope === 'theme' ? 'checked' : ''}><span>主题</span></label>
        <select name="theme" aria-label="主题">${THEMES.map(t => `<option value="${t.id}" ${last.theme === t.id ? 'selected' : ''}>${esc(t.fr)} · ${esc(t.zh)}</option>`).join('')}</select>
      </fieldset>
      <fieldset><legend>数量</legend>
        ${['10', '20', '40', 'all'].map(n => `<label class="chip"><input type="radio" name="count" value="${n}" ${last.count === n ? 'checked' : ''}><span>${n === 'all' ? '全部' : n}</span></label>`).join('')}
      </fieldset>
      <div class="actions"><button class="btn" type="submit">Commencer <span aria-hidden="true">→</span></button><span class="note warn" hidden></span></div>
    </form>

    <div class="card form keylist">
      <p class="kicker">Mes mots difficiles · 我的重点</p>
      ${
        starred.length + marked.length
          ? `<ul>
              ${starred.map(w => `<li><span class="fr">${esc(w.fr)}</span> <span class="mean">${esc(w.zh)}</span><button type="button" class="x" data-act="unstar" data-id="${w.id}" aria-label="取消重点">×</button></li>`).join('')}
              ${marked.map(k => `<li><span class="fr">${esc(k)}</span><span class="gl">（${esc(shortZh(GLOSS[k].zh))}）</span> <span class="mean from">${esc(markSource(S.marked[k]))}</span><button type="button" class="x" data-act="unmark" data-key="${esc(k)}" aria-label="取消重点">×</button></li>`).join('')}
            </ul>`
          : '<p class="empty">还没有。学习时把鼠标移到例句里的词上（手机上点一下），选「标为重点」；或者点单词旁的 ☆。标过的词会出现在这里，并且在所有例句里一直带着（翻译）。</p>'
      }
    </div>
  </section>`;

  document.getElementById('practice').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const opt = { mode: f.get('mode'), scope: f.get('scope'), theme: f.get('theme'), count: f.get('count') };
    S.practice = opt;
    persist();
    const P = practicePools();
    let words = opt.scope === 'theme' ? WORDS.filter(w => w.theme === opt.theme) : P[opt.scope] || [];
    const kinds = {
      gender: w => isNoun(w.kind),
      dictation: () => hasFrenchVoice(),
    };
    if (kinds[opt.mode]) words = words.filter(kinds[opt.mode]);
    const warn = e.target.querySelector('.warn');
    if (!words.length) {
      warn.hidden = false;
      warn.textContent = opt.mode === 'gender' ? '这组词里没有名词。' : '这组词是空的，换一个范围试试。';
      return;
    }
    words = shuffle(words);
    if (opt.count !== 'all') words = words.slice(0, Number(opt.count));
    const mixPool = w =>
      ['recall', 'cloze', 'translate', 'build', 'copy']
        .concat(isNoun(w.kind) ? ['gender'] : [], hasFrenchVoice() ? ['dictation'] : []);
    const queue = words.map(w => ({ w, type: opt.mode === 'mix' ? pickOne(mixPool(w)) : opt.mode }));
    startSession(null, { queue, free: true });
    if (session && location.hash !== '#/session') history.replaceState(null, '', '#/session');
  });
}

/* ---------------------------------------------------------------- sync & install */

const fmtTime = t => (t ? new Date(t).toLocaleTimeString('fr-CA', { hour: '2-digit', minute: '2-digit' }) : '');

function syncLabel(st = sync.getStatus()) {
  return {
    off: '',
    syncing: '同步中…',
    ok: `已同步 ${fmtTime(st.at)}`,
    offline: '离线 · 联网后自动同步',
    auth: '同步失败：令牌失效',
    error: '同步出错，稍后重试',
  }[st.state];
}

function paintSyncStatus(st = sync.getStatus()) {
  const el = document.getElementById('syncstate');
  if (el) {
    el.textContent = syncLabel(st);
    el.dataset.state = st.state;
    el.hidden = st.state === 'off';
  }
  const box = document.getElementById('syncbox-state');
  if (box) box.textContent = syncLabel(st) || '未连接';
}

function syncCard() {
  const c = sync.config();
  if (c) {
    return `<div class="card form sync-card">
      <p class="kicker">Synchronisation · 多设备同步</p>
      <p class="sync-on"><span class="dot"></span> 已连接。电脑、手机网页、手机 App 用同一个令牌连接后，进度会自动合并。</p>
      <p class="sub">状态：<b id="syncbox-state">${esc(syncLabel() || '…')}</b></p>
      <div class="actions">
        <button class="btn ghost" data-act="sync-now">立即同步</button>
        <button class="btn ghost" data-act="sync-off">断开这台设备</button>
      </div>
      <p class="fine">什么时候同步：打开时、切回 App 时、每次答题后几秒、离开或切到后台时，以及打开期间每 4 分钟。两边同时学也不会互相覆盖：每个词以最近一次作答为准，每天的练习量按设备分别记录再相加。</p>
    </div>`;
  }
  return `<div class="card form sync-card">
    <p class="kicker">Synchronisation · 多设备同步</p>
    <p>想在电脑和手机上接着学，就在每台设备上用同一个 GitHub 令牌连接一次。进度会存进你自己 GitHub 账号里的一个私密 Gist，没有任何第三方服务器。</p>
    <ol class="steps">
      <li>打开 <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener">GitHub → 新建 fine-grained token</a>。</li>
      <li>名称写 FRvc，有效期选最长；<b>Account permissions → Gists</b> 选 <b>Read and write</b>，其他都不用勾。</li>
      <li>生成后复制令牌，粘贴到下面，点「连接」。手机上也粘贴同一个令牌。</li>
    </ol>
    <form class="token-form" id="token-form" autocomplete="off">
      <input type="password" name="token" placeholder="github_pat_…" aria-label="GitHub 令牌" spellcheck="false" autocapitalize="off">
      <button class="btn" type="submit">连接</button>
    </form>
    <p class="fine" id="token-msg">令牌只保存在这台设备上，只能读写 Gist，不能访问你的仓库。随时可以在 GitHub 上撤销。</p>
  </div>`;
}

function installCard() {
  const s = installState();
  if (s.standalone) {
    return `<div class="card form"><p class="kicker">Application · 手机 App</p><p>你正在使用已安装的 FRvc App。${sync.config() ? '' : '<b>记得在这里也连接一次同步</b>：手机主屏幕上的 App 和浏览器里的网页存储是分开的。'}</p></div>`;
  }
  return `<div class="card form install-card">
    <p class="kicker">Application · 装到手机</p>
    <p>FRvc 可以像 App 一样装到手机主屏幕：全屏打开、有图标、没网也能学（同步会在联网后补上）。</p>
    ${s.canPrompt ? '<div class="actions"><button class="btn" data-act="install">安装 FRvc</button></div>' : ''}
    <ul class="steps">
      <li><b>iPhone / iPad：</b>用 Safari 打开这个网页 → 底部「分享」 → 「添加到主屏幕」。</li>
      <li><b>Android：</b>用 Chrome 打开 → 右上角菜单 → 「安装应用」或「添加到主屏幕」。</li>
      <li><b>电脑：</b>Chrome / Edge 地址栏右侧的安装图标。</li>
    </ul>
    <p class="fine">装好后打开 App，在「Réglages」里粘贴同一个令牌连接同步。iPhone 上主屏幕 App 的存储和 Safari 是分开的，所以这一步必不可少。</p>
  </div>`;
}

/*
 * Before a session is built, pull what the other devices did (at most 3 s; offline it just
 * starts), so the same new words are not handed out twice on two devices.
 */
async function syncFirst(start) {
  const st = sync.getStatus();
  if (!sync.config() || (st.state === 'ok' && Date.now() - st.at < 20000)) return start();
  setView('session');
  app.innerHTML = '<section class="session"><p class="loading hand">un instant…</p><p class="loading-sub">正在同步其他设备的进度</p></section>';
  await Promise.race([sync.syncNow(), new Promise(r => setTimeout(r, 3000))]);
  start();
}

/* Merged progress from another device arrived: use it and refresh what is on screen. */
function applyRemote(merged) {
  S = merged;
  S.log = aggregateLog(S.devlog);
  store.save(S);
  const v = document.body.dataset.view;
  if (v === 'session' || v === 'grammar' || v === 'reading') return; // never redraw under a question
  const active = document.activeElement;
  if (v === 'settings' && active && active.closest && active.closest('form')) return;
  route();
}

/* ---------------------------------------------------------------- session */

let session = null;

const can = t => S.settings.exercises.includes(t) && (t !== 'dictation' || hasFrenchVoice());

function reviewType(w, box) {
  const noun = isNoun(w.kind);
  const early = ['choice', 'choiceRev', 'cloze'].concat(noun ? ['gender'] : []);
  const late = ['recall', 'cloze', 'build', 'dictation', 'recall'].concat(noun ? ['gender'] : [], box >= 4 ? ['translate'] : []);
  const pool = (box <= 2 ? early : late).filter(t => can(t === 'choiceRev' ? 'choice' : t));
  return pool.length ? pickOne(pool) : 'recall';
}

function buildQueue(fresh, reviews) {
  const q = [];
  const rq = reviews.map(w => ({ w, type: reviewType(w, S.cards[w.id].box), graded: true }));
  const chunks = [];
  for (let i = 0; i < fresh.length; i += 5) chunks.push(fresh.slice(i, i + 5));
  const per = chunks.length ? Math.ceil(rq.length / (chunks.length + 1)) : rq.length;
  q.push(...rq.splice(0, per));
  for (const ch of chunks) {
    ch.forEach(w => q.push({ w, type: 'intro' }));
    shuffle(ch).forEach(w => q.push({ w, type: can('choice') ? 'choice' : can('gender') && isNoun(w.kind) ? 'gender' : 'intro2' }));
    q.push(...rq.splice(0, per));
    shuffle(ch).forEach(w => q.push({ w, type: can('recall') ? 'recall' : can('cloze') ? 'cloze' : 'choiceRev', graded: true, fresh: true }));
  }
  q.push(...rq);
  return q.filter(it => it.type !== 'intro2');
}

function startSession(override, { queue = null, free = false } = {}) {
  const plan = override || (queue ? { fresh: [], reviews: [] } : todayPlan());
  const q = queue || buildQueue(plan.fresh, plan.reviews);
  if (!q.length) {
    location.hash = '#/';
    return;
  }
  session = { q, i: 0, right: 0, wrong: 0, missed: new Set(), state: 'ask', freshCount: plan.fresh.length, introduced: new Set(), tries: {}, free };
  renderSession();
}

function current() {
  return session.q[session.i];
}

function renderSession() {
  setView('session');
  if (session.i >= session.q.length) return renderSummary();
  const it = current();
  const w = it.w;
  const t = themeById[w.theme];
  const total = session.q.length;
  const pct = (session.i / total) * 100;
  app.innerHTML = `
  <section class="session">
    <div class="topline">
      <a class="quit" href="${session.free ? '#/exercices' : '#/'}" aria-label="Quitter la séance">× <span>quitter</span></a>
      <div class="track"><span style="width:${pct}%"></span></div>
      <span class="count">${session.i + 1}<i>/</i>${total}</span>
    </div>
    <article class="sheet card ${it.type}">
      <p class="kicker">${labelFor(it)} · ${esc(t.fr)}</p>
      <div class="ask">${askHtml(it)}</div>
      <div class="feedback" aria-live="polite"></div>
    </article>
    ${needsKeys(it.type) ? accentKeys() : ''}
    <p class="keys-hint">Entrée = valider / continuer${['choice', 'choiceRev'].includes(it.type) ? ' · 1–4 = choisir' : ''}${it.type === 'gender' ? ' · M / F' : ''}</p>
  </section>`;
  const input = app.querySelector('.answer, .copy-in.req');
  if (input && it.type !== 'intro') input.focus();
  if (S.settings.autoSpeak && ['intro', 'choice', 'dictation'].includes(it.type)) speak(it.type === 'dictation' ? w.fr : w.fr);
  if (it.type === 'build') bindBuild();
}

const needsKeys = t => ['recall', 'cloze', 'dictation', 'intro', 'translate', 'copy'].includes(t);

function labelFor(it) {
  return {
    intro: 'Nouveau mot · 新词',
    choice: 'Reconnaître · 认词',
    choiceRev: 'Reconnaître · 选出法语',
    recall: 'Rappeler · 拼写',
    cloze: 'En contexte · 例句填空',
    build: 'Réutiliser · 组句',
    gender: 'Le ou la ? · 阴阳性',
    dictation: 'Dictée · 听写',
    translate: 'Traduire · 整句翻译',
    copy: 'Recopier · 抄写',
  }[it.type];
}

function sayBtn(text, label = 'Écouter') {
  return `<button class="say" type="button" data-say="${esc(text)}" aria-label="${label}">${speakerIcon()}</button>`;
}

function distractors(w, n, field) {
  const same = WORDS.filter(x => x.theme === w.theme && x.id !== w.id && x.kind === w.kind);
  const other = WORDS.filter(x => x.id !== w.id && x.kind === w.kind && x.theme !== w.theme);
  const pool = shuffle(same).concat(shuffle(other));
  const seen = new Set([w[field]]);
  const out = [];
  for (const x of pool) {
    if (!seen.has(x[field])) {
      seen.add(x[field]);
      out.push(x);
    }
    if (out.length === n) break;
  }
  return out;
}

function askHtml(it) {
  const w = it.w;
  const k = KIND[w.kind];
  switch (it.type) {
    case 'intro':
      return `
        <div class="word"><span class="fr">${esc(w.fr)}</span>${sayBtn(w.fr)}</div>
        <p class="kind-line"><span class="kind">${k[0]}</span> ${k[1]}</p>
        <p class="mean-big">${esc(meaning(w))}</p>
        <p class="mean-alt">${esc(meaningAlt(w))}</p>
        <div class="example"><p class="ex">${sentenceHtml(w)} ${sayBtn(plainSentence(w.ex), 'Écouter la phrase')}</p><p class="tr">${esc(w.tr)}</p>
          <p class="tip">把鼠标移到例句里的任何一个词上可以看翻译；不认识就点「标为重点」，以后例句里它后面会一直写上（翻译）。</p></div>
        ${copyBox(w, false)}
        <div class="actions"><button class="btn" data-act="next">Je l’ai vu <span aria-hidden="true">→</span></button>${starButton(w.id)}</div>
        <span class="hand margin">à retenir</span>`;
    case 'copy':
      return `
        <div class="word"><span class="fr">${esc(w.fr)}</span>${sayBtn(w.fr)}</div>
        <p class="mean-alt">${esc(meaning(w))}</p>
        <div class="example"><p class="ex">${sentenceHtml(w)} ${sayBtn(plainSentence(w.ex), 'Écouter la phrase')}</p><p class="tr">${esc(w.tr)}</p></div>
        ${copyBox(w, true)}
        <div class="actions"><button class="btn" data-act="copy-done" disabled>Continuer <span aria-hidden="true">→</span></button><button class="link" data-act="skip">跳过</button></div>`;
    case 'translate':
      return `
        <p class="mean-big small">${esc(w.tr)}</p>
        <p class="kind-line">把整句翻译成法语。提示词：<span class="kind">${esc(w.fr)}</span> ${esc(meaning(w))}</p>
        <form class="answer-form" autocomplete="off">
          <textarea class="answer long" rows="3" spellcheck="false" autocapitalize="sentences" lang="fr" placeholder="Écrivez la phrase en français…" aria-label="Votre traduction"></textarea>
          <div class="actions"><button class="btn" type="submit">Valider</button><button class="link" type="button" data-act="skip">je ne sais pas</button><span class="hint-line">Entrée = valider · Maj+Entrée = nouvelle ligne</span></div>
        </form>`;
    case 'choice': {
      const opts = shuffle([w, ...distractors(w, 3, 'zh')]);
      it.opts = opts.map(o => o.id);
      return `
        <div class="word"><span class="fr">${esc(w.fr)}</span>${sayBtn(w.fr)}</div>
        <p class="q">这个词的意思是？</p>
        <div class="options">${opts.map((o, i) => `<button class="opt" data-pick="${o.id}"><b>${i + 1}</b>${esc(meaning(o))}</button>`).join('')}</div>`;
    }
    case 'choiceRev': {
      const opts = shuffle([w, ...distractors(w, 3, 'fr')]);
      it.opts = opts.map(o => o.id);
      return `
        <p class="mean-big">${esc(meaning(w))}</p>
        <p class="q">选出对应的法语：</p>
        <div class="options fr-opts">${opts.map((o, i) => `<button class="opt" data-pick="${o.id}"><b>${i + 1}</b>${esc(o.fr)}</button>`).join('')}</div>`;
    }
    case 'recall':
      return `
        <p class="mean-big">${esc(meaning(w))}</p>
        <p class="kind-line"><span class="kind">${isNoun(w.kind) ? 'n.' : k[0]}</span> ${isNoun(w.kind) ? '名词 — 连冠词一起写（le / la / l’ / les / un / une）' : k[1]}</p>
        ${answerForm('Écrivez en français…')}`;
    case 'cloze': {
      return `
        <p class="ex cloze-line">${sentenceHtml(w, { blank: true })}</p>
        <p class="tr">${esc(w.tr)}</p>
        <p class="kind-line"><span class="kind">${k[0]}</span> ${esc(meaning(w))} <button class="link" type="button" data-act="hint">提示首字母</button></p>
        ${answerForm('Le mot manquant…')}`;
    }
    case 'build': {
      const toks = sentenceTokens(w.ex);
      let order = shuffle(toks.map((_, i) => i));
      if (toks.length > 1 && order.every((v, i) => v === i)) order = order.reverse();
      it.toks = toks;
      it.placed = [];
      return `
        <p class="mean-big small">${esc(w.tr)}</p>
        <p class="q">把下面的词排成正确的法语句子（点击放入，点已放入的词可拿回）。</p>
        <div class="slots" aria-label="Votre phrase"></div>
        <div class="tokens">${order.map(i => `<button class="tok" data-tok="${i}">${esc(toks[i])}</button>`).join('')}</div>
        <div class="actions"><button class="btn" data-act="check-build">Valider</button><button class="link" data-act="skip">je ne sais pas</button></div>`;
    }
    case 'gender':
      return `
        <div class="word"><span class="fr">${esc(bareNoun(w.fr))}</span>${sayBtn(bareNoun(w.fr))}</div>
        <p class="mean-alt">${esc(meaning(w))}</p>
        <div class="options two">
          <button class="opt" data-gender="m"><b>M</b>masculin · le / un</button>
          <button class="opt" data-gender="f"><b>F</b>féminin · la / une</button>
        </div>`;
    case 'dictation':
      return `
        <div class="listen">
          <button class="say big-say" type="button" data-say="${esc(w.fr)}" aria-label="Écouter">${speakerIcon()}</button>
          <button class="link" type="button" data-say-slow="${esc(w.fr)}">plus lentement</button>
        </div>
        <p class="q">听写：写下你听到的法语（名词带冠词）。</p>
        ${answerForm('Ce que vous entendez…')}`;
    default:
      return '';
  }
}

function copyBox(w, required) {
  const row = (label, target, multi) => `
    <label class="copy-row">
      <span class="cl">${label}</span>
      ${
        multi
          ? `<textarea class="copy-in${required ? ' req' : ''}" rows="2" spellcheck="false" lang="fr" data-copy="${esc(target)}" placeholder="${esc(target)}"></textarea>`
          : `<input class="copy-in${required ? ' req' : ''}" type="text" spellcheck="false" autocapitalize="off" lang="fr" data-copy="${esc(target)}" placeholder="${esc(target)}">`
      }
      <span class="cs" aria-live="polite"></span>
    </label>`;
  return `<div class="copybox${required ? ' required' : ''}">
    <p class="kicker">Recopier · ${required ? '抄写：单词和例句各抄一遍' : '在这里抄一遍（可选）'}</p>
    ${row('单词', w.fr, false)}
    ${row('例句', plainSentence(w.ex), true)}
  </div>`;
}

function updateCopy(el) {
  const p = copyProgress(el.value, el.dataset.copy);
  const row = el.closest('.copy-row');
  const cs = row.querySelector('.cs');
  row.classList.toggle('ok', p.done);
  row.classList.toggle('err', p.wrongAt >= 0);
  if (p.done) cs.innerHTML = `${tickMark()}<span>抄对了</span>`;
  else if (p.wrongAt >= 0) cs.textContent = `第 ${p.wrongAt + 1} 个字应为「${p.expectedChar === ' ' ? '空格' : p.expectedChar}」`;
  else cs.textContent = el.value ? `${p.matched} / ${p.total}` : '';
  requestAnimationFrame(() => cs.querySelectorAll('.mark').forEach(m => m.classList.add('on')));
  const box = el.closest('.copybox');
  if (box && box.classList.contains('required')) {
    const all = [...box.querySelectorAll('.copy-in')].every(x => copyProgress(x.value, x.dataset.copy).done);
    const b = app.querySelector('[data-act="copy-done"]');
    if (b) b.disabled = !all;
  }
}

function answerForm(ph) {
  return `<form class="answer-form" autocomplete="off">
    <input class="answer" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" lang="fr" placeholder="${ph}" aria-label="Votre réponse">
    <button class="btn" type="submit">Valider</button>
    <button class="link" type="button" data-act="skip">je ne sais pas</button>
  </form>`;
}

function accentKeys() {
  return `<div class="accents" aria-label="Lettres accentuées">${['é', 'è', 'ê', 'à', 'â', 'ç', 'ô', 'î', 'û', 'ù', 'ë', 'ï', 'œ', '’']
    .map(c => `<button type="button" data-key="${c}">${c}</button>`)
    .join('')}</div>`;
}

function expectedFor(it) {
  if (it.type === 'cloze') return clozeParts(it.w.ex).answer;
  if (it.type === 'translate' || it.type === 'copy') return plainSentence(it.w.ex);
  return it.w.fr;
}

const VERDICT = {
  exact: ['Parfait.', '完全正确'],
  accent: ['Presque.', '对了，注意重音'],
  accentStrict: ['Les accents comptent.', '字母对了，但重音符号写错了'],
  article: ['Et l’article ?', '名词要连冠词一起记'],
  gender: ['Mauvais genre.', '阴阳性错了'],
  typo: ['À une lettre près.', '差一个字母'],
  wrong: ['Pas encore.', '再看一眼'],
  skip: ['On le revoit bientôt.', '没关系，等会儿再考一次'],
  right: ['Exact.', '答对了'],
  close: ['Presque.', '大意对了，有几个词和参考句不一样'],
};

function submit(typed, { skipped = false, ok: forced = null } = {}) {
  if (session.state !== 'ask') return;
  const it = current();
  const w = it.w;
  let res;
  if (forced !== null) res = { ok: forced, verdict: forced ? 'right' : 'wrong' };
  else if (skipped) res = { ok: false, verdict: 'skip' };
  else if (it.type === 'translate') res = checkSentence(typed, w.ex, { strictAccents: S.settings.strictAccents });
  else res = checkAnswer(typed, expectedFor(it), { kind: it.type === 'cloze' || w.kind === 'w' ? '' : w.kind, strictAccents: S.settings.strictAccents });
  const vkey = res.verdict === 'accent' && !res.ok ? 'accentStrict' : res.verdict;
  session.state = 'shown';

  // Grade: only marked items move the schedule; learning steps just requeue on a miss.
  let prev = null;
  if (session.free && !it.retry && it.type !== 'copy') {
    const lt = logToday();
    if (res.ok) lt.right += 1;
    else lt.wrong += 1;
    persist();
  }
  if (it.graded && !it.retry && !session.free) {
    prev = S.cards[w.id] ? { ...S.cards[w.id] } : null;
    S.cards[w.id] = grade(S.cards[w.id], res.ok, today());
    const lt = logToday();
    if (it.fresh && !session.introduced.has(w.id)) {
      session.introduced.add(w.id);
      lt.new += 1;
    }
    if (res.ok) lt.right += 1;
    else lt.wrong += 1;
    persist();
  }
  if (res.ok) session.right += 1;
  else {
    session.wrong += 1;
    session.missed.add(w.id);
    requeue(it);
  }
  it.prev = prev;
  it.res = res;
  showFeedback(it, typed, vkey);
}

function requeue(it) {
  // Ask a missed word again a few cards later — at most twice per session, so a hard
  // word cannot hold the session hostage. It comes back tomorrow either way.
  session.tries[it.w.id] = (session.tries[it.w.id] || 0) + 1;
  if (session.tries[it.w.id] > 2) return;
  const typedTypes = ['recall', 'cloze', 'translate', 'dictation'];
  const type = session.free && typedTypes.includes(it.type) ? it.type : can('recall') || session.free ? 'recall' : 'choiceRev';
  const again = { w: it.w, type, graded: it.graded, retry: true, fresh: it.fresh };
  const pos = Math.min(session.q.length, session.i + 4);
  session.q.splice(pos, 0, again);
}

function showFeedback(it, typed, vkey) {
  const w = it.w;
  const fb = app.querySelector('.feedback');
  const sheet = app.querySelector('.sheet');
  const ok = it.res.ok;
  sheet.classList.add(ok ? 'is-right' : 'is-wrong');
  app.querySelectorAll('.answer-form input, .answer-form button, .opt, .tok, [data-act="check-build"]').forEach(b => (b.disabled = true));
  const [fr, zh] = VERDICT[vkey] || VERDICT.wrong;
  const exp = expectedFor(it);
  const showDiff = typed && !ok && ['recall', 'cloze', 'dictation'].includes(it.type);
  const sentDiff =
    it.type === 'translate' && typed && !ok
      ? `<p class="yours">你写的：${esc(typed)}</p><p class="diff sent">参考：${wordDiff(typed, w.ex)
          .map(x => (x.s === 'same' ? esc(x.w) : `<b class="diff">${esc(x.w)}</b>`))
          .join(' ')}</p>`
      : '';
  const diff = showDiff
    ? `<p class="diff">${diffMarks(typed, exp)
        .map(m => (m.s === 'same' ? esc(m.ch) : `<b class="${m.s}">${esc(m.ch)}</b>`))
        .join('')}</p>`
    : '';
  const canOverride = (it.graded || session.free) && !it.retry && !ok && ['recall', 'cloze', 'dictation', 'build', 'translate'].includes(it.type) && typed;
  const real = !!byId[w.id];
  fb.innerHTML = `
    <div class="verdict">${ok ? tickMark() : crossMark()}<div><p class="v-fr">${fr}</p><p class="v-zh">${zh}</p></div></div>
    <div class="reveal">
      <p class="answer-line"><span class="fr">${esc(w.fr)}</span> ${sayBtn(w.fr)} <span class="kind">${KIND[w.kind][0]}</span> ${real ? starButton(w.id) : ''} <span class="mean">${esc(w.zh)} · <i>${esc(w.en)}</i></span></p>
      ${diff}${sentDiff}
      <p class="ex">${sentenceHtml(w)} ${sayBtn(plainSentence(w.ex), 'Écouter la phrase')}</p>
      <p class="tr">${esc(w.tr)}</p>
    </div>
    <div class="actions">
      <button class="btn" data-act="next">Continuer <span aria-hidden="true">→</span></button>
      ${canOverride ? '<button class="link" data-act="override">我其实答对了（算对）</button>' : ''}
    </div>`;
  requestAnimationFrame(() => requestAnimationFrame(() => fb.classList.add('on')));
  fb.querySelector('[data-act="next"]').focus({ preventScroll: true });
  if (it.type !== 'intro' && S.settings.autoSpeak && (!ok || ['cloze', 'build', 'translate'].includes(it.type)))
    speak(['build', 'translate'].includes(it.type) ? plainSentence(w.ex) : w.fr);
}

function override() {
  const it = current();
  if (!it.res || it.res.ok) return;
  if (!session.free) S.cards[it.w.id] = grade(it.prev, true, today());
  const lt = logToday();
  lt.wrong = Math.max(0, lt.wrong - 1);
  lt.right += 1;
  persist();
  session.wrong -= 1;
  session.right += 1;
  session.missed.delete(it.w.id);
  // remove the retry we queued
  const j = session.q.findIndex((x, k) => k > session.i && x.retry && x.w.id === it.w.id);
  if (j > -1) session.q.splice(j, 1);
  next();
}

function next() {
  hidePop();
  session.i += 1;
  session.state = 'ask';
  renderSession();
}

function renderSummary() {
  setView('session');
  const lt = logToday();
  if (!session.free) lt.done = true;
  persist();
  const free = session.free;
  const missed = [...session.missed].map(id => byId[id] || pseudoById[id]).filter(Boolean);
  const total = session.right + session.wrong;
  const acc = total ? Math.round((session.right / total) * 100) : 100;
  app.innerHTML = `
  <section class="summary">
    <article class="sheet card">
      <p class="kicker">${free ? 'Exercice terminé · 自由练习' : 'Séance terminée'} · ${new Date().toLocaleDateString('fr-CA')}</p>
      <h1 class="medium-heading">Bien joué<em class="accent">.</em></h1>
      <div class="nums">
        ${free ? `<div><span class="big">${session.q.filter(x => !x.retry).length}</span><span class="lab">mots<br><i>练习的词</i></span></div>` : `<div><span class="big">${session.freshCount}</span><span class="lab">nouveaux<br><i>新词</i></span></div>`}
        <div><span class="big">${session.right}</span><span class="lab">réponses justes<br><i>答对</i></span></div>
        <div><span class="big">${acc}<small>%</small></span><span class="lab">précision<br><i>正确率</i></span></div>
      </div>
      ${
        missed.length
          ? `<p class="kicker">${free ? 'À retravailler · 还要再练' : 'À revoir demain · 明天会再考'}</p>
             <ul class="missed">${missed.map(w => `<li><span class="fr">${esc(w.fr)}</span> ${sayBtn(w.fr)} <span class="mean">${esc(w.zh)}</span></li>`).join('')}</ul>`
          : '<p class="note">一个都没错。</p>'
      }
      <figure class="month-wrap draw">${monthSketch(last30())}</figure>
      <p class="hand sign">à demain&nbsp;!</p>
      <div class="actions"><a class="btn" href="#/">Retour au carnet</a>${free ? '<a class="btn ghost" href="#/exercices">再练一组</a>' : '<button class="btn ghost" data-act="more">再学 5 个新词</button><a class="btn ghost" href="#/exercices">自由练习</a>'}</div>
    </article>
  </section>`;
  session = null;
  inkIn();
}

/* ---------------------------------------------------------------- build exercise */

function bindBuild() {
  const it = current();
  const slots = app.querySelector('.slots');
  const toks = app.querySelector('.tokens');
  const draw = () => {
    slots.innerHTML = it.placed.map((i, k) => `<button class="tok placed" data-unplace="${k}">${esc(it.toks[i])}</button>`).join('');
    toks.querySelectorAll('.tok').forEach(b => (b.hidden = it.placed.includes(Number(b.dataset.tok))));
  };
  it.redraw = draw;
  draw();
}

function checkBuild() {
  const it = current();
  if (session.state !== 'ask') return;
  if (!it.placed.length) return;
  const typed = it.placed.map(i => it.toks[i]).join(' ');
  const target = it.toks.join(' ');
  // Words that repeat can swap places without changing the sentence: compare text, not indices.
  const ok = typed === target;
  submit(typed, { ok });
}

/* ---------------------------------------------------------------- events */

document.addEventListener('click', e => {
  const t = e.target.closest('button, [data-act], label.file, a[data-jump]');
  if (!t) return;
  if (t.matches('a[data-jump]')) e.preventDefault();
  if (handleLessonClick(t)) return;
  if (t.dataset.say) return void speak(t.dataset.say);
  if (t.dataset.saySlow) return void speak(t.dataset.saySlow, { rate: 0.6 });
  if (t.dataset.key) {
    const inp = lastField && document.contains(lastField) ? lastField : app.querySelector('.answer');
    if (!inp || inp.disabled) return;
    const s = inp.selectionStart ?? inp.value.length;
    const c = t.dataset.key === '’' ? "'" : t.dataset.key;
    inp.value = inp.value.slice(0, s) + c + inp.value.slice(inp.selectionEnd ?? s);
    inp.focus();
    inp.setSelectionRange(s + 1, s + 1);
    if (inp.classList.contains('copy-in')) updateCopy(inp);
    return;
  }
  if (t.dataset.pick && session && session.state === 'ask') {
    const it = current();
    const ok = t.dataset.pick === it.w.id;
    t.classList.add(ok ? 'right' : 'wrong');
    if (!ok) app.querySelector(`[data-pick="${it.w.id}"]`).classList.add('right');
    return submit('', { ok });
  }
  if (t.dataset.gender && session && session.state === 'ask') {
    const it = current();
    const g = it.w.kind.startsWith('f') ? 'f' : 'm';
    const ok = t.dataset.gender === g;
    t.classList.add(ok ? 'right' : 'wrong');
    if (!ok) app.querySelector(`[data-gender="${g}"]`).classList.add('right');
    return submit('', { ok });
  }
  if (t.dataset.tok !== undefined && session && session.state === 'ask') {
    const it = current();
    it.placed.push(Number(t.dataset.tok));
    return it.redraw();
  }
  if (t.dataset.unplace !== undefined && session && session.state === 'ask') {
    const it = current();
    it.placed.splice(Number(t.dataset.unplace), 1);
    return it.redraw();
  }
  switch (t.dataset.act) {
    case 'next':
      return next();
    case 'skip':
      return submit('', { skipped: true });
    case 'copy-done':
      return submit('', { ok: true });
    case 'unmark': {
      S.marked[t.dataset.key.replace(/’/g, "'")] = { del: true, t: Date.now() };
      persist();
      return renderPractice();
    }
    case 'unstar': {
      S.starred[t.dataset.id] = { del: true, t: Date.now() };
      persist();
      return renderPractice();
    }
    case 'override':
      return override();
    case 'check-build':
      return checkBuild();
    case 'hint': {
      const inp = app.querySelector('input.answer');
      const a = expectedFor(current());
      inp.placeholder = `${a[0]}${'·'.repeat(Math.max(0, a.length - 1))}`;
      inp.focus();
      return;
    }
    case 'more': {
      const pool = S.settings.themes.length ? WORDS.filter(w => S.settings.themes.includes(w.theme)) : WORDS;
      return syncFirst(() => {
        const fresh = pool.filter(w => isNew(S.cards[w.id])).slice(0, 5);
        startSession({ fresh, reviews: [] });
        if (session && location.hash !== '#/session') history.replaceState(null, '', '#/session');
      });
    }
    case 'study-theme': {
      const id = t.dataset.theme;
      const fresh = WORDS.filter(w => w.theme === id && isNew(S.cards[w.id])).slice(0, Math.max(5, S.settings.dailyNew));
      const reviews = WORDS.filter(w => w.theme === id && !isNew(S.cards[w.id])).slice(0, 30);
      startSession({ fresh, reviews });
      if (session && location.hash !== '#/session') history.replaceState(null, '', '#/session');
      return;
    }
    case 'export':
      return store.exportFile(S);
    case 'sync-now':
      return sync.syncNow();
    case 'sync-off':
      if (confirm('断开这台设备的同步？已同步的进度会保留在这台设备和云端。')) {
        sync.disconnect();
        renderSettings();
      }
      return;
    case 'install':
      return promptInstall().then(renderSettings);
    case 'reset':
      if (confirm(sync.config() ? '清空全部学习进度？已连接同步，所有设备上的进度都会被清空，无法撤销。' : '清空全部学习进度？此操作无法撤销。')) {
        S = store.reset();
        persist();
        renderSettings();
      }
      return;
    default:
  }
});

document.addEventListener('change', async e => {
  if (e.target.dataset && e.target.dataset.act === 'import' && e.target.files[0]) {
    try {
      S = await store.importFile(e.target.files[0]);
      S.log = aggregateLog(S.devlog);
      persist();
      alert('进度已导入。');
      location.hash = '#/';
    } catch (err) {
      alert(`导入失败：${err.message}`);
    }
  }
});

document.addEventListener('submit', async e => {
  if (e.target.id === 'token-form') {
    e.preventDefault();
    const tok = e.target.token.value.trim();
    const msg = document.getElementById('token-msg');
    if (!tok) return;
    msg.textContent = '正在连接…';
    try {
      await sync.connect(tok);
      renderSettings();
    } catch (err) {
      msg.textContent = `连接失败：${err.message}。请检查令牌的 Gists 权限是否为 Read and write。`;
      msg.classList.add('warn');
    }
    return;
  }
  if (!e.target.classList.contains('answer-form')) return;
  e.preventDefault();
  const v = e.target.querySelector('.answer').value;
  if (!v.trim()) return;
  submit(v);
});

let lastField = null;
document.addEventListener('focusin', e => {
  if (e.target.matches && e.target.matches('.answer, .copy-in')) lastField = e.target;
});
document.addEventListener('input', e => {
  if (e.target.classList && e.target.classList.contains('copy-in')) updateCopy(e.target);
});

document.addEventListener('keydown', e => {
  if (document.body.dataset.view === 'grammar' && handleLessonKey(e)) return;
  if (!session || document.body.dataset.view !== 'session') return;
  const inInput = e.target.matches && e.target.matches('input, select, textarea');
  if (e.key === 'Enter' && !e.shiftKey && e.target.matches && e.target.matches('textarea.answer') && session.state === 'ask') {
    e.preventDefault();
    return e.target.form.requestSubmit();
  }
  if (e.key === 'Enter' && e.target.matches && e.target.matches('.copy-in')) {
    if (e.target.tagName === 'TEXTAREA') e.preventDefault();
    return;
  }
  if (e.key === 'Enter' && session.state === 'shown') {
    e.preventDefault();
    return next();
  }
  if (e.key === 'Enter' && current() && current().type === 'intro' && !inInput) {
    e.preventDefault();
    return next();
  }
  if (e.key === 'Enter' && current() && current().type === 'build' && !inInput) {
    e.preventDefault();
    return checkBuild();
  }
  if (inInput || session.state !== 'ask') return;
  const it = current();
  if (['choice', 'choiceRev'].includes(it.type) && /^[1-4]$/.test(e.key)) {
    const b = app.querySelectorAll('.opt')[Number(e.key) - 1];
    if (b) b.click();
  }
  if (it.type === 'gender' && /^[mfMF]$/.test(e.key)) {
    const b = app.querySelector(`[data-gender="${e.key.toLowerCase()}"]`);
    if (b) b.click();
  }
  if (it.type === 'build' && e.key === 'Backspace' && it.placed.length) {
    it.placed.pop();
    it.redraw();
  }
});

/* ---------------------------------------------------------------- boot */

// Read-only hook for the browser tests (only with ?test in the URL).
if (/[?&]test\b/.test(location.search)) {
  window.__frvc = { current: () => session && current() && { type: current().type, expected: expectedFor(current()), w: current().w, toks: current().toks }, state: () => S };
}

initSpeech();
S.marked = S.marked || {};
S.starred = S.starred || {};
S.devlog = S.devlog || {};
S.grammar = S.grammar || {};
S.reading = S.reading || {};
S.log = aggregateLog(S.devlog);
initLessons({ app, state: () => S, persist, speak, setView, accentKeys });
initGloss({
  state: () => S,
  persist,
  speak,
  byId,
  today,
  onChange: () => document.body.dataset.view === 'practice' && renderPractice(),
});
route();
startBirds();
initPwa({ onChange: () => document.body.dataset.view === 'settings' && renderSettings() });
sync.initSync({
  state: () => S,
  apply: applyRemote,
  onStatus: paintSyncStatus,
});
