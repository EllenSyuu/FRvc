/*
 * Drawings, in the atelier style of ellensyuu.github.io: blue-black ink and graphite on warm
 * paper, construction lines first, hand-lettered notes, orange kept for the maple leaf and
 * for what matters. Every stroke uses pathLength="1" so the page can ink it in (.ink).
 */

export const INK = '#22314a';
export const GRAPH = '#6f7b8c';
export const FAINT = '#b4bcc7';
export const ORANGE = '#cf602b';
export const AMBER = '#e0a046';

const MAPLE =
  'M0 -22 L4 -12 L11 -15 L9 -5 L18 -7 L14 0 L20 4 L9 6 L11 12 L3 9 L1 20 L-1 20 L-3 9 L-11 12 L-9 6 L-20 4 L-14 0 L-18 -7 L-9 -5 L-11 -15 L-4 -12 Z';

/* Plate I — "le carnet": an open notebook in oblique projection, a fountain pen, a few words
   written in, dimension lines and a title block. viewBox 0 0 640 520. */
export function heroPlate() {
  const t = i => `style="transition-delay:${i.toFixed(2)}s"`;
  // Ruled lines on both pages (left page skews left, right page right).
  const rules = [];
  for (let k = 0; k < 9; k++) {
    const y = 196 + k * 22;
    rules.push(`<path class="ink thin" pathLength="1" ${t(0.9 + k * 0.05)} d="M138 ${y + 14} L300 ${y - 4}"/>`);
    rules.push(`<path class="ink thin" pathLength="1" ${t(1.0 + k * 0.05)} d="M330 ${y - 4} L494 ${y + 14}"/>`);
  }
  const words = [
    ['le loyer', 152, 205, -6.3],
    ['la santé', 152, 249, -6.3],
    ["l'emploi", 152, 293, -6.3],
    ['se renseigner', 344, 205, 6.3],
    ['en revanche', 344, 249, 6.3],
    ['joindre les deux bouts', 344, 293, 6.3],
  ]
    .map(
      ([w, x, y, r], i) =>
        `<text class="write hand" ${t(2.1 + i * 0.32)} x="${x}" y="${y}" transform="rotate(${r} ${x} ${y})">${w}</text>`,
    )
    .join('');

  return `
<svg viewBox="0 0 640 520" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An open notebook drawn as an engineering plate">
  <defs>
    <pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2="5" stroke="${GRAPH}" stroke-width="0.6"/>
    </pattern>
    <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/>
    </filter>
  </defs>

  <!-- construction: centre lines, frame and grid ticks -->
  <g class="fade" ${t(0.1)} stroke="${FAINT}" stroke-width="0.6" fill="none">
    <rect x="18" y="18" width="604" height="484"/>
    <rect x="26" y="26" width="588" height="468" stroke-dasharray="1 5"/>
    <path d="M316 40 V470 M60 270 H580" stroke-dasharray="14 4 2 4"/>
    ${Array.from({ length: 13 }, (_, i) => `<path d="M${40 + i * 45} 18 v7 M${40 + i * 45} 502 v-7"/>`).join('')}
  </g>

  <g transform="translate(316 286) scale(1.16) translate(-316 -286)">
  <g filter="url(#rough)" fill="none" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round">
    <!-- shadow block under the book -->
    <path class="fade" ${t(0.4)} d="M120 400 L316 430 L512 400 L512 412 L316 444 L120 412 Z" fill="url(#hatch)" stroke="none" opacity="0.55"/>
    <!-- cover boards -->
    <path class="ink" pathLength="1" ${t(0.3)} stroke-width="1.3" d="M116 168 L316 140 L516 168 L516 402 L316 432 L116 402 Z"/>
    <!-- page block: left and right pages curving into the gutter -->
    <path class="ink" pathLength="1" ${t(0.55)} stroke-width="1.1" d="M128 172 Q220 150 306 150 Q312 152 316 160 L316 420 Q312 412 304 410 Q220 410 128 396 Z"/>
    <path class="ink" pathLength="1" ${t(0.65)} stroke-width="1.1" d="M504 172 Q412 150 326 150 Q320 152 316 160 L316 420 Q320 412 328 410 Q412 410 504 396 Z"/>
    <!-- page edges (stacked lines) -->
    <path class="ink thin" pathLength="1" ${t(0.8)} d="M128 396 L124 400 M504 396 L508 400 M132 168 Q220 146 306 146 M500 168 Q412 146 326 146"/>
    <!-- ribbon bookmark -->
    <path class="ink" pathLength="1" ${t(1.6)} stroke="${ORANGE}" stroke-width="1.6" d="M452 156 L450 240 L460 230 L466 242 L462 158"/>
  </g>

  <g fill="none" stroke="${GRAPH}" stroke-width="0.7">${rules.join('')}</g>
  <g fill="${INK}">${words}</g>

  <!-- tick marks beside learned words -->
  <g fill="none" stroke="${ORANGE}" stroke-width="1.8" stroke-linecap="round">
    <path class="ink" pathLength="1" ${t(3.9)} d="M268 196 l5 6 l11 -14"/>
    <path class="ink" pathLength="1" ${t(4.1)} d="M268 240 l5 6 l11 -14"/>
  </g>

  <!-- fountain pen, resting across the right page -->
  <g transform="translate(-6 -34)" filter="url(#rough)" fill="none" stroke="${INK}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1">
    <path class="ink" pathLength="1" ${t(1.3)} d="M548 120 L596 96 L604 110 L556 136 Z"/>
    <path class="ink" pathLength="1" ${t(1.45)} d="M556 136 L548 120 L470 166 L478 180 Z"/>
    <path class="ink" pathLength="1" ${t(1.6)} d="M470 166 L452 182 L478 180"/>
    <path class="ink thin" pathLength="1" ${t(1.7)} d="M461 175 L470 172 M560 116 L572 140 M585 104 L594 122"/>
    <path class="fade" ${t(1.9)} d="M478 180 L556 136 L548 120 Z" fill="url(#hatch)" stroke="none" opacity="0.6"/>
  </g>

  <!-- maple leaf, the one warm thing on the plate -->
  <g class="fade leaf" ${t(2.9)} transform="translate(574 398) rotate(-18) scale(1.15)">
    <path d="${MAPLE}" fill="${ORANGE}" opacity="0.85"/>
    <path d="M0 -14 V18 M0 2 L-10 -3 M0 2 L10 -3" stroke="#fffaf2" stroke-width="0.8" fill="none"/>
  </g>

  </g>
  <!-- dimension line and annotations -->
  <g class="fade" ${t(2.4)} stroke="${GRAPH}" stroke-width="0.7" fill="none">
    <path d="M84 466 V484 M548 466 V484 M86 476 H546"/>
    <path d="M86 476 l8 -3 v6 Z M546 476 l-8 -3 v6 Z" fill="${GRAPH}"/>
    <path d="M572 346 C 596 352, 600 372, 588 382" stroke-dasharray="2 3"/>
  </g>
  <g class="fade" ${t(2.6)} fill="${GRAPH}" font-family="'Cormorant Garamond', Garamond, serif">
    <text x="316" y="470" text-anchor="middle" font-size="17" font-style="italic">260 mots · 13 thèmes · B1 → B2</text>
    <text x="44" y="56" font-size="14" letter-spacing="3">PL. I</text>
    <text x="44" y="78" font-size="21" font-style="italic">le carnet</text>
    <text x="604" y="494" text-anchor="end" font-size="13" letter-spacing="2">45°30′N 73°34′O</text>
  </g>
  <text class="write hand" ${t(3.3)} x="546" y="338" fill="${ORANGE}" font-size="21" transform="rotate(-10 546 338)">un mot par jour</text>
</svg>`;
}

/* Small line drawings for the themes. viewBox 0 0 64 64. */
const ICONS = {
  briefcase: 'M12 24 h40 v26 h-40 Z M24 24 v-6 h16 v6 M12 34 h40 M30 32 h4 v5 h-4 Z',
  house: 'M10 30 L32 12 L54 30 M16 26 v24 h32 v-24 M27 50 v-13 h10 v13 M41 20 v-6 h5 v10',
  cross: 'M26 12 h12 v14 h14 v12 h-14 v14 h-12 v-14 h-14 v-12 h14 Z M20 56 h24',
  leaf: 'M14 50 C 14 26, 30 12, 52 12 C 52 34, 38 50, 14 50 Z M14 50 L40 24 M26 38 h8 M32 32 v-7',
  screen: 'M10 14 h44 v28 h-44 Z M26 42 l-3 8 h18 l-3 -8 M17 21 h16 M17 27 h24 M17 33 h12',
  book: 'M32 18 C 24 12, 14 12, 8 14 v34 c 6 -2, 16 -2, 24 4 c 8 -6, 18 -6, 24 -4 v-34 c -6 -2, -16 -2, -24 4 Z M32 18 v34',
  metro: 'M18 10 h28 a6 6 0 0 1 6 6 v26 a6 6 0 0 1 -6 6 h-28 a6 6 0 0 1 -6 -6 v-26 a6 6 0 0 1 6 -6 Z M12 30 h40 M22 40 h2 M40 40 h2 M20 48 l-6 8 M44 48 l6 8',
  passport: 'M16 8 h30 a4 4 0 0 1 4 4 v40 a4 4 0 0 1 -4 4 h-30 Z M33 24 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M25 24 h16 M33 16 c -4 4, -4 12, 0 16 c 4 -4, 4 -12, 0 -16 M24 42 h18',
  coins: 'M14 22 a14 6 0 1 0 28 0 a14 6 0 1 0 -28 0 M14 22 v8 a14 6 0 0 0 28 0 v-8 M22 38 a14 6 0 1 0 28 0 a14 6 0 1 0 -28 0 M22 38 v8 a14 6 0 0 0 28 0 v-8',
  mask: 'M12 14 c 12 4, 28 4, 40 0 v14 c 0 14, -10 24, -20 24 c -10 0, -20 -10, -20 -24 Z M22 26 c 2 -2, 6 -2, 8 0 M34 26 c 2 -2, 6 -2, 8 0 M24 38 c 4 4, 12 4, 16 0',
  cup: 'M14 24 h30 v14 a12 12 0 0 1 -12 12 h-6 a12 12 0 0 1 -12 -12 Z M44 28 h4 a5 5 0 0 1 0 10 h-5 M10 54 h40 M24 18 c -2 -3, 2 -5, 0 -8 M32 18 c -2 -3, 2 -5, 0 -8',
  stamp: 'M24 10 h16 v8 c 0 6, 8 6, 8 14 v4 h-32 v-4 c 0 -8, 8 -8, 8 -14 Z M12 36 h40 v8 h-40 Z M16 54 h32',
  pen: 'M44 8 l12 12 l-30 30 l-14 2 l2 -14 Z M38 14 l12 12 M14 50 l6 -6 M28 44 c 6 6, 16 8, 24 6',
};

export const themeIcon = name =>
  `<svg viewBox="0 0 64 64" aria-hidden="true" class="ticon"><path class="ink" pathLength="1" d="${ICONS[name] || ICONS.book}"/></svg>`;

/* A hand-drawn tick or cross, inked in when it appears. */
export const tickMark = (color = ORANGE) =>
  `<svg viewBox="0 0 40 40" class="mark" aria-hidden="true"><path class="ink" pathLength="1" d="M9 21 l8 9 l15 -20" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
export const crossMark = (color = INK) =>
  `<svg viewBox="0 0 40 40" class="mark" aria-hidden="true"><path class="ink" pathLength="1" d="M11 11 L29 29 M29 11 L11 29" stroke="${color}" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;

export const speakerIcon = () =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9 h4 l5 -4 v14 l-5 -4 h-4 Z M16 9 c 1.5 1.5, 1.5 4.5, 0 6 M18.5 6.5 c 3 3, 3 8, 0 11" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* Last-30-days sketch: one square per day, hatched by how much was studied, ticked when the
   day's plan was finished. */
export function monthSketch(days) {
  const cell = 26;
  const gap = 6;
  const cols = 10;
  const w = cols * (cell + gap);
  const rows = Math.ceil(days.length / cols);
  const h = rows * (cell + gap) + 16;
  const parts = days.map((d, i) => {
    const x = (i % cols) * (cell + gap);
    const y = Math.floor(i / cols) * (cell + gap);
    const n = d.count;
    const hatch = n === 0 ? 0 : n < 15 ? 2 : n < 40 ? 4 : 7;
    const lines = Array.from({ length: hatch }, (_, k) => {
      const o = ((k + 1) * cell) / (hatch + 1);
      return `<path d="M${x + o} ${y + cell} L${x} ${y + cell - o}" />`;
    }).join('');
    const tick = d.done
      ? `<path class="ink" pathLength="1" style="transition-delay:${(0.3 + i * 0.03).toFixed(2)}s" d="M${x + 6} ${y + 14} l5 6 l10 -13" stroke="${ORANGE}" stroke-width="2" fill="none" stroke-linecap="round"/>`
      : '';
    const today = d.today ? `<rect x="${x - 3}" y="${y - 3}" width="${cell + 6}" height="${cell + 6}" fill="none" stroke="${ORANGE}" stroke-width="0.8" stroke-dasharray="2 2"/>` : '';
    return `<g><title>${d.key}: ${n}</title><rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="none" stroke="${d.count ? INK : FAINT}" stroke-width="0.8"/><g stroke="${GRAPH}" stroke-width="0.7">${lines}</g>${tick}${today}</g>`;
  });
  return `<svg viewBox="-4 -4 ${w + 4} ${h}" class="month" role="img" aria-label="Study activity over the last 30 days">${parts.join('')}</svg>`;
}

/* Now and then a gull or a pigeon crosses the page, as on the personal site. */
export function startBirds() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const ns = 'http://www.w3.org/2000/svg';
  const sky = document.createElementNS(ns, 'svg');
  sky.setAttribute('class', 'sky');
  sky.setAttribute('aria-hidden', 'true');
  const g = document.createElementNS(ns, 'g');
  const wing = document.createElementNS(ns, 'path');
  const body = document.createElementNS(ns, 'path');
  wing.setAttribute('fill', 'none');
  wing.setAttribute('stroke', INK);
  wing.setAttribute('stroke-width', '1.3');
  wing.setAttribute('stroke-linecap', 'round');
  body.setAttribute('fill', INK);
  g.append(wing, body);
  g.style.opacity = '0';
  sky.append(g);
  document.body.append(sky);

  const gull = f => {
    const a = 4 + f * 9;
    return `M-17 ${(-a * 0.55).toFixed(1)} Q-9 ${(-a - 4).toFixed(1)} -1 0 M1 0 Q9 ${(-a - 4).toFixed(1)} 17 ${(-a * 0.55).toFixed(1)}`;
  };
  const pigeon = f => {
    const a = 3 + f * 8;
    return `M-3 -1 Q-8 ${(-a - 5).toFixed(1)} -15 ${(-a * 0.7).toFixed(1)} Q-9 ${(-a * 0.2).toFixed(1)} -2 1 M2 -1 Q7 ${(-a - 5).toFixed(1)} 13 ${(-a * 0.7).toFixed(1)} Q8 ${(-a * 0.2).toFixed(1)} 2 1`;
  };
  let n = 0;
  const fly = () => {
    if (document.hidden || document.body.dataset.view === 'session') {
      setTimeout(fly, 15000);
      return;
    }
    const kind = n++ % 3 === 2 ? 'pigeon' : 'gull';
    const W = window.innerWidth;
    const H = window.innerHeight;
    const ltr = Math.random() < 0.6;
    const y0 = H * (0.1 + Math.random() * 0.3);
    const y1 = y0 + (Math.random() - 0.5) * H * 0.16;
    const s = (kind === 'gull' ? 1 : 0.85) * (0.9 + Math.random() * 0.5) * (W < 700 ? 0.75 : 1);
    const dur = (kind === 'gull' ? 13000 : 9500) * (W < 700 ? 0.7 : 1);
    const hz = kind === 'gull' ? 2.2 : 4.4;
    body.setAttribute(
      'd',
      kind === 'gull'
        ? 'M-5 0.5 Q0 -2 6 0 Q8 0.4 9 1 Q2 2.6 -5 0.5 Z'
        : 'M-7 1 Q-2 -4 6 -1 Q9 -0.5 10 0.8 Q4 4 -7 1 Z',
    );
    g.style.opacity = '1';
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / dur);
      const x = ltr ? -60 + (W + 120) * t : W + 60 - (W + 120) * t;
      const y = y0 + (y1 - y0) * t + Math.sin(t * Math.PI * 3) * 14;
      const phase = (now - start) / 1000;
      const burst = Math.sin(phase * 0.9) > -0.2;
      const f = burst ? Math.sin(phase * hz * Math.PI * 2) : 0.75;
      wing.setAttribute('d', (kind === 'gull' ? gull : pigeon)(f));
      g.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${ltr ? s : -s} ${s})`);
      if (t < 1) requestAnimationFrame(step);
      else {
        g.style.opacity = '0';
        setTimeout(fly, 60000 + Math.random() * 40000);
      }
    };
    requestAnimationFrame(step);
  };
  setTimeout(fly, 6000);
}
