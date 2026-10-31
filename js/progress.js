/*
 * "Ma progression": the motivation board on the home page.
 *
 *   seal      the current streak as an ink stamp, with the best streak under it
 *   ring      the share of the whole deck learned / in progress / still to discover
 *   week      the last seven days, right and wrong answers, a tick when the list was done
 *   year      twenty weeks of study as a hatched calendar, today outlined
 *   levels    coverage of the core, B1 and B2 themes
 *   stamps    milestones earned (words met, streaks, grammar lessons, readings)
 *
 * Everything is plain SVG/HTML drawn in the notebook style; numbers count up and the
 * stamps press down once the section scrolls into view (unless reduced motion is on).
 */

import { addDays, isLearned, isNew } from './srs.js';

const INK = '#22314a';
const MAPLE = '#cf602b';
const AMBER = '#e0a046';
const FAINT = '#b4bcc7';
const GRAPH = '#6f7b8c';

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const answers = l => (l ? (l.right || 0) + (l.wrong || 0) : 0);

/* Longest run of consecutive study days anywhere in the log. */
export function bestStreak(log) {
  const days = Object.keys(log).filter(k => answers(log[k]) > 0).sort();
  let best = 0;
  let run = 0;
  let prev = null;
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1;
    best = Math.max(best, run);
    prev = d;
  }
  return best;
}

/* Milestones in four families. `have` is how far she is, `steps` the thresholds. */
function milestones(m) {
  const fam = [
    { id: 'mots', label: 'mots rencontrés', zh: '个词', have: m.seen, steps: [10, 50, 100, 200, 400, 600, m.total] },
    { id: 'serie', label: 'jours de suite', zh: '天连续', have: m.best, steps: [3, 7, 14, 30, 60, 100] },
    { id: 'gram', label: 'leçons de grammaire', zh: '课语法', have: m.grammar, steps: [1, 5, 13, m.lessons] },
    { id: 'lect', label: 'textes lus', zh: '篇阅读', have: m.reading, steps: [1, 6, m.passages] },
  ];
  for (const f of fam) f.steps = [...new Set(f.steps)].filter(n => n > 0).sort((a, b) => a - b);
  return fam;
}

function nextGoal(fam) {
  let best = null;
  for (const f of fam) {
    const n = f.steps.find(s => s > f.have);
    if (n == null) continue;
    const gap = n - f.have;
    const share = gap / n;
    if (!best || share < best.share) best = { f, n, gap, share };
  }
  return best;
}

/* ---------- pieces ---------- */

function seal(cur, best) {
  const r = 70;
  const ring = 'M 90 90 m -58 0 a 58 58 0 1 1 116 0 a 58 58 0 1 1 -116 0';
  return `
  <figure class="pg-seal draw" aria-label="Série actuelle : ${cur} jours. Record : ${best} jours.">
    <svg viewBox="0 0 180 180" aria-hidden="true">
      <defs><path id="seal-path" d="${ring}"/></defs>
      <g class="seal-ink" transform="rotate(-8 90 90)">
        <circle cx="90" cy="90" r="${r + 10}" fill="none" stroke="${MAPLE}" stroke-width="1.6"/>
        <circle cx="90" cy="90" r="${r - 22}" fill="none" stroke="${MAPLE}" stroke-width="0.8"/>
        <text font-size="10.5" letter-spacing="2.2" fill="${MAPLE}" font-family="Inter, sans-serif">
          <textPath href="#seal-path" startOffset="0">· SÉRIE EN COURS · FRvc · TCF / TEF CANADA ·</textPath>
        </text>
        <text x="90" y="100" text-anchor="middle" class="seal-n" fill="${INK}" data-count="${cur}">${cur}</text>
        <text x="90" y="120" text-anchor="middle" font-size="10" letter-spacing="1.5" fill="${GRAPH}" font-family="Inter, sans-serif">${cur === 1 ? 'JOUR' : 'JOURS'}</text>
      </g>
    </svg>
    <figcaption>
      <span class="pg-k">连续打卡</span>
      <span>Record&nbsp;: <b data-count="${best}">${best}</b> jour${best === 1 ? '' : 's'}${cur && cur >= best ? ' · <i class="hand">nouveau record&nbsp;!</i>' : ''}</span>
    </figcaption>
  </figure>`;
}

function ring(st, total) {
  const R = 64;
  const C = 2 * Math.PI * R;
  const a = st.learned / total;
  const b = st.learning / total;
  const pct = total ? Math.round(((st.learned + st.learning) / total) * 100) : 0;
  const seg = (len, off, cls, color, w) =>
    len > 0
      ? `<circle class="${cls}" cx="90" cy="90" r="${R}" fill="none" stroke="${color}" stroke-width="${w}" stroke-dasharray="${(len * C).toFixed(2)} ${C.toFixed(2)}" stroke-dashoffset="${(-off * C).toFixed(2)}" transform="rotate(-90 90 90)" style="--len:${(len * C).toFixed(2)}"/>`
      : '';
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const ang = (i / 60) * 2 * Math.PI - Math.PI / 2;
    const r1 = R + 13;
    const r2 = R + (i % 5 ? 16 : 20);
    return `<line x1="${(90 + r1 * Math.cos(ang)).toFixed(1)}" y1="${(90 + r1 * Math.sin(ang)).toFixed(1)}" x2="${(90 + r2 * Math.cos(ang)).toFixed(1)}" y2="${(90 + r2 * Math.sin(ang)).toFixed(1)}"/>`;
  }).join('');
  return `
  <figure class="pg-ring draw" aria-label="${st.learned} acquis, ${st.learning} en cours, ${st.unseen} à découvrir sur ${total} mots">
    <svg viewBox="0 0 180 180" aria-hidden="true">
      <g stroke="${FAINT}" stroke-width="0.7">${ticks}</g>
      <circle cx="90" cy="90" r="${R}" fill="none" stroke="${FAINT}" stroke-width="0.8" stroke-dasharray="2 3"/>
      ${seg(b + a, 0, 'arc arc-b', AMBER, 7)}
      ${seg(a, 0, 'arc arc-a', MAPLE, 9)}
      <text x="90" y="92" text-anchor="middle" class="ring-n" fill="${INK}"><tspan data-count="${pct}">${pct}</tspan><tspan font-size="18">%</tspan></text>
      <text x="90" y="112" text-anchor="middle" font-size="10" letter-spacing="1.5" fill="${GRAPH}" font-family="Inter, sans-serif">DU CARNET</text>
    </svg>
    <figcaption>
      <span class="pg-k">${total} 个词</span>
      <span class="legend"><i class="sw a"></i>掌握 <b data-count="${st.learned}">${st.learned}</b></span>
      <span class="legend"><i class="sw b"></i>学习中 <b data-count="${st.learning}">${st.learning}</b></span>
      <span class="legend"><i class="sw c"></i>未学 ${st.unseen}</span>
    </figcaption>
  </figure>`;
}

function week(log, today, goal) {
  const days = Array.from({ length: 7 }, (_, i) => addDays(today, i - 6));
  const vals = days.map(k => log[k] || {});
  const max = Math.max(goal * 1.25, ...vals.map(answers), 1);
  const H = 120;
  const bw = 26;
  const gap = 14;
  const W = 7 * (bw + gap);
  const gy = H - (goal / max) * H;
  const names = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const bars = vals
    .map((l, i) => {
      const x = i * (bw + gap) + gap / 2;
      const r = ((l.right || 0) / max) * H;
      const w = ((l.wrong || 0) / max) * H;
      const k = days[i];
      const dow = names[new Date(`${k}T12:00:00`).getDay()];
      const hatch = r >= 8 ? Array.from({ length: Math.floor((r - 6) / 5) }, (_, j) => `<line x1="${x}" y1="${H - j * 5}" x2="${x + bw}" y2="${H - j * 5 - 6}"/>`).join('') : '';
      return `<g class="wbar" style="--i:${i}">
        <title>${k} · ${l.right || 0} justes, ${l.wrong || 0} erreurs</title>
        <g class="grow" style="transform-origin:${x + bw / 2}px ${H}px">
          ${r ? `<rect x="${x}" y="${H - r}" width="${bw}" height="${r}" fill="rgba(34,49,74,0.06)" stroke="${INK}" stroke-width="0.8"/><g stroke="${INK}" stroke-width="0.5">${hatch}</g>` : ''}
          ${w ? `<rect x="${x}" y="${H - r - w}" width="${bw}" height="${w}" fill="none" stroke="${FAINT}" stroke-width="0.8" stroke-dasharray="2 2"/>` : ''}
        </g>
        ${l.done ? `<path class="ink" pathLength="1" d="M${x + 6} ${H - r - w - 14} l5 6 l10 -13" stroke="${MAPLE}" stroke-width="2" fill="none" stroke-linecap="round" style="transition-delay:${(0.6 + i * 0.08).toFixed(2)}s"/>` : ''}
        <text x="${x + bw / 2}" y="${H + 16}" text-anchor="middle" font-size="11" fill="${i === 6 ? MAPLE : GRAPH}" font-family="Inter, sans-serif">${i === 6 ? 'auj.' : dow}</text>
      </g>`;
    })
    .join('');
  const total = vals.reduce((s, l) => s + answers(l), 0);
  const right = vals.reduce((s, l) => s + (l.right || 0), 0);
  return `
  <figure class="pg-week draw">
    <svg viewBox="0 -24 ${W} ${H + 46}" aria-label="Réponses des sept derniers jours">
      <line x1="0" y1="${H}" x2="${W}" y2="${H}" stroke="${INK}" stroke-width="0.8"/>
      <line x1="0" y1="${gy.toFixed(1)}" x2="${W}" y2="${gy.toFixed(1)}" stroke="${MAPLE}" stroke-width="0.8" stroke-dasharray="4 3"/>
      <text x="${W}" y="${(gy - 5).toFixed(1)}" text-anchor="end" font-size="10" fill="${MAPLE}" font-family="Inter, sans-serif">objectif ${goal}</text>
      ${bars}
    </svg>
    <figcaption>
      <span class="pg-k">这 7 天</span>
      <span><b data-count="${total}">${total}</b> 次作答 · 正确率 <b>${total ? Math.round((right / total) * 100) : 0}%</b></span>
    </figcaption>
  </figure>`;
}

function year(log, today) {
  const weeks = 20;
  const cell = 13;
  const gap = 3;
  // Columns are weeks ending with the current one; rows Monday → Sunday.
  const dow = (new Date(`${today}T12:00:00`).getDay() + 6) % 7;
  const start = addDays(today, -(weeks - 1) * 7 - dow);
  const months = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
  let cells = '';
  let labels = '';
  let lastMonth = -1;
  let active = 0;
  for (let c = 0; c < weeks; c++) {
    const first = addDays(start, c * 7);
    const m = Number(first.slice(5, 7)) - 1;
    if (m !== lastMonth) {
      labels += `<text x="${c * (cell + gap)}" y="-6" font-size="10" fill="${GRAPH}" font-family="Inter, sans-serif">${months[m]}</text>`;
      lastMonth = m;
    }
    for (let r = 0; r < 7; r++) {
      const k = addDays(start, c * 7 + r);
      if (k > today) continue;
      const x = c * (cell + gap);
      const y = r * (cell + gap);
      const n = answers(log[k]);
      if (n) active++;
      const lvl = n === 0 ? 0 : n < 15 ? 1 : n < 40 ? 2 : n < 80 ? 3 : 4;
      const fill = ['none', 'rgba(224,160,70,0.28)', 'rgba(224,160,70,0.55)', 'rgba(207,96,43,0.6)', 'rgba(168,74,38,0.85)'][lvl];
      cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="1.5" fill="${fill}" stroke="${n ? 'none' : FAINT}" stroke-width="0.6" style="--d:${(c * 0.025).toFixed(3)}s"><title>${k} : ${n}</title></rect>`;
      if (k === today) cells += `<rect x="${x - 2.5}" y="${y - 2.5}" width="${cell + 5}" height="${cell + 5}" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="2 1.5"/>`;
    }
  }
  const W = weeks * (cell + gap);
  const rowLab = ['L', '', 'M', '', 'V', '', 'D'].map((t, r) => (t ? `<text x="-6" y="${r * (cell + gap) + 10}" text-anchor="end" font-size="9" fill="${GRAPH}" font-family="Inter, sans-serif">${t}</text>` : '')).join('');
  const key = [0, 1, 2, 3, 4]
    .map((l, i) => `<rect x="${W - 5 * (cell + gap) + i * (cell + gap)}" y="${7 * (cell + gap) + 8}" width="${cell}" height="${cell}" rx="1.5" fill="${['none', 'rgba(224,160,70,0.28)', 'rgba(224,160,70,0.55)', 'rgba(207,96,43,0.6)', 'rgba(168,74,38,0.85)'][l]}" stroke="${l ? 'none' : FAINT}" stroke-width="0.6"/>`)
    .join('');
  return `
  <figure class="pg-year draw">
    <svg viewBox="-18 -18 ${W + 20} ${7 * (cell + gap) + 46}" aria-label="Vingt semaines d'étude">
      ${labels}${rowLab}<g class="cells">${cells}</g>
      <text x="${W - 5 * (cell + gap) - 6}" y="${7 * (cell + gap) + 18}" text-anchor="end" font-size="9" fill="${GRAPH}" font-family="Inter, sans-serif">moins</text>${key}
      <text x="${W + 1}" y="${7 * (cell + gap) + 18}" font-size="9" fill="${GRAPH}" font-family="Inter, sans-serif">plus</text>
    </svg>
    <figcaption><span class="pg-k">20 周</span><span>学习了 <b data-count="${active}">${active}</b> 天 · 颜色越深当天练得越多，虚线框是今天</span></figcaption>
  </figure>`;
}

function levels(rows) {
  return `
  <figure class="pg-levels draw">
    ${rows
      .map(
        (r, i) => `<div class="lv" style="--i:${i}">
          <span class="lv-name">${esc(r.name)}<i>${esc(r.zh)}</i></span>
          <span class="lv-bar"><span class="s" style="--w:${((r.seen / r.total) * 100).toFixed(1)}%"></span><span class="l" style="--w:${((r.learned / r.total) * 100).toFixed(1)}%"></span></span>
          <span class="lv-n"><b>${r.seen}</b>/${r.total}</span>
        </div>`,
      )
      .join('')}
    <figcaption><span class="pg-k">按级别</span><span>浅色 = 学过，深色 = 掌握</span></figcaption>
  </figure>`;
}

function stamp(f, n, got, i) {
  const rot = (((n * 37 + i * 11) % 15) - 7).toFixed(0);
  const color = got ? MAPLE : FAINT;
  const big = n >= 100 ? 22 : 26;
  return `<li class="stamp ${got ? 'got' : 'locked'}" style="--r:${rot}deg;--i:${i}" title="${n} ${esc(f.label)}${got ? ' ✓' : ''}">
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="40" r="35" fill="none" stroke="${color}" stroke-width="${got ? 1.6 : 0.9}" ${got ? '' : 'stroke-dasharray="3 3"'}/>
      <circle cx="40" cy="40" r="29" fill="none" stroke="${color}" stroke-width="0.6"/>
      <text x="40" y="${big === 22 ? 45 : 47}" text-anchor="middle" font-size="${big}" fill="${got ? INK : FAINT}" font-family="'Cormorant Garamond', serif" font-weight="600" style="font-variant-numeric: lining-nums">${n}</text>
      ${got ? `<path d="M33 60 l4 4 l10 -9" stroke="${MAPLE}" stroke-width="1.4" fill="none" stroke-linecap="round"/>` : ''}
    </svg>
    <span class="cap">${n} ${esc(f.zh)}</span>
  </li>`;
}

function stamps(fam) {
  const goal = nextGoal(fam);
  const earned = fam.reduce((s, f) => s + f.steps.filter(n => f.have >= n).length, 0);
  const all = fam.reduce((s, f) => s + f.steps.length, 0);
  return `
  <div class="pg-stamps draw">
    <div class="pg-stamps-head">
      <span class="pg-k">勋章 · ${earned} / ${all}</span>
      ${goal ? `<p class="next"><span class="hand">Plus que ${goal.gap}&nbsp;!</span> 下一枚勋章：<b>${goal.n} ${esc(goal.f.zh)}</b>，还差 ${goal.gap}</p>` : '<p class="next"><span class="hand">Tout est tamponné&nbsp;!</span></p>'}
    </div>
    ${fam
      .map(
        f => `<div class="pg-fam">
        <span class="pg-fam-name">${esc(f.label)}</span>
        <ol>${f.steps.map((n, i) => stamp(f, n, f.have >= n, i)).join('')}</ol>
      </div>`,
      )
      .join('')}
  </div>`;
}

/* ---------- the whole board ---------- */

export function progressBoard({ S, WORDS, THEMES, today, streak, goal, lessons, passages }) {
  const st = { learned: 0, learning: 0, unseen: 0 };
  for (const w of WORDS) {
    const c = S.cards[w.id];
    if (isLearned(c)) st.learned++;
    else if (!isNew(c)) st.learning++;
    else st.unseen++;
  }
  const best = Math.max(bestStreak(S.log), streak);
  const lvOf = t => t.level || 'Socle';
  const lvRows = [
    ['Socle', '基础 · A2–B1'],
    ['B1', '中级'],
    ['B2', '中高级 · 写作口语'],
  ]
    .map(([name, zh]) => {
      const ids = new Set(THEMES.filter(t => lvOf(t) === name).map(t => t.id));
      const ws = WORDS.filter(w => ids.has(w.theme));
      return {
        name,
        zh,
        total: ws.length,
        seen: ws.filter(w => !isNew(S.cards[w.id])).length,
        learned: ws.filter(w => isLearned(S.cards[w.id])).length,
      };
    })
    .filter(r => r.total);
  const done = o => Object.values(o || {}).filter(v => v && !v.del).length;
  const fam = milestones({
    seen: st.learned + st.learning,
    total: WORDS.length,
    best,
    grammar: done(S.grammar),
    lessons,
    reading: done(S.reading),
    passages,
  });
  return `
  <div class="pg">
    <div class="pg-top">${seal(streak, best)}${ring(st, WORDS.length)}${week(S.log, today, goal)}</div>
    <div class="pg-mid">${year(S.log, today)}${levels(lvRows)}</div>
    ${stamps(fam)}
  </div>`;
}

/* Numbers count up from zero the first time the board comes into view. */
export function animateBoard(root) {
  const board = root.querySelector('.pg');
  if (!board) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = () => {
    board.classList.add('go');
    if (reduce) return;
    board.querySelectorAll('[data-count]').forEach(el => {
      const to = Number(el.dataset.count) || 0;
      if (!to) return;
      const t0 = performance.now();
      const dur = 900 + Math.min(to, 400);
      const step = t => {
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = '0';
      requestAnimationFrame(step);
    });
  };
  if (!('IntersectionObserver' in window)) return run();
  const io = new IntersectionObserver(
    es => {
      if (es.some(e => e.isIntersecting)) {
        io.disconnect();
        run();
      }
    },
    { threshold: 0.2 },
  );
  io.observe(board);
}
