<div align="center">

# FRvc — Carnet de vocabulaire

**A daily French vocabulary notebook for the TCF Canada and TEF Canada.**

A static web app that hands you a list of words every day, teaches each one with its
article and an example sentence, and checks that you really know it: spelling, gender,
fill-in-the-blank, whole-sentence translation, copying, sentence building and dictation,
on a spaced-repetition schedule. Every word of every example sentence can be hovered for
its meaning and marked as one you do not know.

[![Test and deploy](https://github.com/EllenSyuu/FRvc/actions/workflows/site.yml/badge.svg)](https://github.com/EllenSyuu/FRvc/actions/workflows/site.yml)
![No build step](https://img.shields.io/badge/build-none-22314a)
![Dependencies: 0](https://img.shields.io/badge/runtime%20dependencies-0-22314a)
![Words: 860](https://img.shields.io/badge/words-860%20·%2043%20themes-cf602b)
![Grammar: 26 lessons](https://img.shields.io/badge/grammar-26%20lessons-22314a)
![Reading: 12 passages](https://img.shields.io/badge/reading-12%20passages-22314a)
[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)

**[Open the notebook](https://ellensyuu.github.io/FRvc/)** · [Why](#why) · [How a day works](#how-a-day-works) · [Exercises](#ways-to-check-a-word) · [Hover to translate](#every-word-hoverable-mark-what-you-do-not-know) · [Free practice](#free-practice) · [Grammar and reading](#grammar-and-reading) · [Phone app and sync](#phone-app-and-sync-across-devices) · [Answer checking](#answer-checking) · [The deck](#the-deck) · [Run locally](#run-locally)

</div>

<img alt="FRvc home page: the heading 'Un mot à la fois, chaque jour', today's count of words to review and new words, and an ink drawing of an open notebook with a fountain pen and a maple leaf" src="docs/img/home.jpg" width="100%">

## Why

Exam vocabulary is learned the way a Chinese high-school class learns its 3000-word list
for the gaokao: a fixed list, a fixed number of words a day, every word with an example,
and constant checking. Flash-card apps cover the review schedule but rarely the checking
the exam actually needs — writing the noun **with its article**, getting the **accents**
right, and **using** the word in a sentence.

FRvc does both. It is a single static page (HTML, CSS, ES modules) with no framework, no
build step, no account and no server: progress lives in the browser and can be exported
as a JSON file.

## How a day works

1. **The plan.** Every word due for review (oldest first), plus *N* new words in deck
   order (default 15, adjustable; restrict new words to chosen themes if you like).
2. **New words** come in groups of five: a word card (article, part of speech, Chinese
   and English, an example sentence, pronunciation), then a recognition question, then —
   after some reviews in between — a recall question that is graded.
3. **Reviews** pick an exercise to match how well the word is known: recognition while a
   word is young, production (spelling, dictation, sentence building) once it is settled.
4. **Misses** are asked again a few cards later (at most twice per session) and come back
   tomorrow.

The schedule is a Leitner system — the paper flash-card boxes, made exact:

| Box | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Next review after (days) | 1 | 2 | 4 | 7 | 15 | 30 | 60 |

A right answer moves a word up one box, a wrong one sends it back to box 1. From box 5 on
a word counts as *acquis* (mastered, about two weeks of right answers); from box 3 it is
*familiar*. Theme cards count all three tiers — met, familiar, mastered — so a theme you
have just worked through shows *学过 20/20* instead of an empty *0/20 acquis*.

*Ma progression* on the home page is drawn like the rest of the notebook: the current
streak as an ink seal with the record under it, a ring for the share of the deck met and
mastered, the last seven days against a daily goal (a tick when the plan was finished),
twenty weeks as a calendar, coverage of the core, B1 and B2 themes, and a sheet of
milestone stamps (words met, streaks, grammar lessons, readings) with the next one named.
Numbers count up and stamps press down when the section scrolls into view.

## Ways to check a word

| | |
| --- | --- |
| <img alt="New word card for 'un emploi' with its article, meaning and an example sentence" src="docs/img/intro.jpg"> | <img alt="Fill-in-the-blank: an example sentence with a gap, answered and marked correct" src="docs/img/cloze.jpg"> |
| **Découvrir** — the word card: article, part of speech, meaning, an original example sentence and the browser's French voice. | **En contexte** — the example sentence with the word blanked out. Asks for the form *as it appears* (conjugated, agreed), with a first-letter hint. |
| <img alt="Sentence building: shuffled word tiles being put in order under a Chinese translation" src="docs/img/build.jpg"> | <img alt="Gender question for 'salaire' answered wrongly, showing the correct form 'le salaire'" src="docs/img/gender.jpg"> |
| **Réutiliser** — rebuild the shuffled example sentence from its translation; the speaking and writing tasks reward exactly this. | **Le ou la ?** — the bare noun, masculine or feminine. Gender errors are among the most visible in written French. |

Plus **Rappeler** (see the meaning, type the French with its article), **Traduire**
(translate the whole example sentence from Chinese; missing or different words are
marked against the reference), **Recopier** (copy the word and the sentence, checked
letter by letter as you type), **Reconnaître** (four-way multiple choice in both
directions, distractors drawn from the same theme and part of speech) and **Dictée**
(listen, type; normal and slow speed). An on-screen row of
accented letters (é è ê à â ç ô î û ù ë ï œ ’) makes typing workable on any keyboard.
Every exercise type can be switched off in *Réglages*.

## Every word hoverable, mark what you do not know

<img alt="A new-word card: hovering 'trouvé' in the example sentence opens a small card with its meaning and a button to mark it; marked words are followed by their translation in brackets; below, a copying box checks the typed word and sentence letter by letter" src="docs/img/hover.jpg" width="100%">

Every word of every example sentence carries a gloss (900 forms, written for this deck,
with the dictionary form for conjugated verbs — *trouvé → trouver*). Hover a word, or tap
it on a phone, to see it. **☆ 不认识，标为重点** marks it: from then on, wherever that word
appears in any example sentence it is followed by its translation in brackets —
*Après six mois de（……的）recherche* — until you unmark it. Marking a card's own word
also puts that deck entry on the 重点 list.

New-word cards have an optional copying box: type the word and the example sentence out
once, and the first wrong character is pointed out as you type.

### Phrases

Select a few words in any example sentence, grammar example or reading passage (long-press
on a phone) and **★ 存为词组** keeps the phrase, with a meaning you can write in.
Saved phrases are underlined wherever that sentence appears, and they join *my key words*
in free practice as fill-in-the-blank items: the phrase is the gap in its own sentence.

### Keyboard

| Key | In a session or a grammar drill |
|---|---|
| Enter / Space | check, then go on to the next question |
| 1–4 | pick an option; M / F for gender |
| ← | look back at the questions already answered (read-only) |
| → / Esc | return to the current question |

## Free practice

<img alt="The practice page: eight exercise types (spelling, fill-in-the-blank, whole-sentence translation, copying, sentence building, dictation, gender, mixed), the words to practise and how many" src="docs/img/practice.jpg" width="100%">

*Exercices* lets you drill as much as you like, outside the schedule: pick an exercise
(or *mixed*), the words — learned today, everything learned so far, **my key words**,
the whole deck or one theme — and how many. Words you marked inside sentences become
practice items of their own, with the sentence you found them in as the gap. Free
practice counts towards the day's activity but never moves the review schedule.

<img alt="Whole-sentence translation answered with one word missing: the reference sentence is shown with the missing word underlined" src="docs/img/translate.jpg" width="100%">

## Grammar and reading

**Grammaire** — 26 lessons from the present tense to the subjunctive, the passive,
indirect speech and relative pronouns, grouped A2 / B1 / B2. Each lesson explains the point
in Chinese with French examples (every word hoverable), tables and the traps Chinese
speakers fall into, then runs at least 14 drills marked on the spot: fill in the right
form, choose, rewrite a sentence, conjugate a whole tense. Redo only the ones you missed.

**Lecture** — 12 passages in the style of the TCF / TEF reading tests (an ad, an email, a
voicemail, a forum thread, rules, articles, an editorial), A2 to B2, each with 5–6
multiple-choice questions. Every word can be hovered and marked; each paragraph can be
read aloud or translated. After submitting, each answer says where in the text it is.

All lessons, drills and passages were written for this project; published textbooks were
used only as a checklist of what an exam syllabus should cover. Best scores sync across
devices like the rest of the progress.

## Phone app and sync across devices

FRvc is an installable web app (PWA): on a phone, *Add to Home Screen* (Safari) or
*Install app* (Chrome) gives it its own icon, a full-screen window and offline use. The
service worker fetches the app's own files network-first, so an update is picked up on
the next open and the cached copy is only used offline.

Progress can follow you between the computer, the phone's browser and the installed app
(on iOS the home-screen app and Safari do not share storage, so this matters). There is no
FRvc server: each device connects once with the same fine-grained GitHub token that can
only read and write Gists, and the progress is kept in a private Gist in your own account.
Syncing happens on open, on return to the app, a few seconds after each answer, when the
app goes to the background, when the network comes back and every few minutes; a session
waits up to 3 s for it before handing out new words.

Every sync is pull → merge → push, and the merge ([`js/merge.js`](js/merge.js)) is built so
that studying on two devices in any order never loses or double-counts anything:

| Data | Merge rule |
| --- | --- |
| A word's review state | the most recent answer wins (timestamped on every grade) |
| Daily counts | kept per device and summed; a device only ever updates its own entry |
| Key words, starred words | the most recent change wins; un-marking leaves a dated tombstone |
| Settings | the most recently saved settings win |
| "Clear all progress" | removes everything older than it, on every device |

The token stays in the browser where it was entered, is never part of the synced data,
and can be revoked on GitHub at any time.

## Answer checking

`js/check.js` is a small pure module (no DOM) that tells kinds of mistakes apart instead of
returning right/wrong:

| Verdict | Example (expected → typed) | Counts as |
| --- | --- | --- |
| exact | `l'employeur` → `L’employeur` | right |
| accent | `la santé` → `la sante` | right, flagged — or wrong in **exam mode** |
| article | `le loyer` → `loyer` | wrong: *learn it with its article* |
| gender | `le loyer` → `la loyer` | wrong: *it is masculine* |
| typo | `déménager` → `déménnager` | wrong: *one letter away* |
| close | a sentence with ≥ 75 % of the reference words | wrong: *nearly — these words differ* |
| wrong | anything else | wrong |

Case, extra spaces, curly vs. straight apostrophes and `œ`/`oe` are normalised. `un` and
`le` (same gender) are both accepted. After a wrong answer the expected form is shown
with the wrong letters and the wrong accents marked separately. An *I was right*
button (我其实答对了) lets you overrule the checker when you typed a valid alternative.

## The deck

860 words and expressions in 43 themes. The first 13 are the topic areas that keep coming
back in the TCF and TEF Canada written and spoken tasks (work, housing, health,
environment, technology, education, transport, immigration, money, culture, daily life,
administration, giving an opinion); 30 more go deeper, B1 → B2: the body and medical
care, emotions and relationships, sport, cooking, clothing, the home, shops and services,
travel, the arts, books and language, history, civic life, the media, politics and
institutions, law, the economy, banking, office life, nature, animals and farming,
science, energy, getting around, time, space, quantities, building a written argument, and
the everyday French of Québec. Usage follows Canadian
and Québec French where it differs (*le courriel*, *le cégep*, *la garderie*,
*le stationnement*).

<img alt="The thirteen theme cards, each with a line-drawn icon, its French and Chinese name and a progress meter" src="docs/img/themes.jpg" width="100%">

Every entry is one line in [`data/deck.js`](data/deck.js):

```js
['le bail', 'm', 'the lease (pl. les baux)', '租约',
 "Au Québec, beaucoup de [[baux]] se terminent le 30 juin.", '在魁北克，很多租约在6月30日到期。'],
```

`[[…]]` marks the word inside the sentence, which is what the fill-in-the-blank asks
for. All example sentences, translations and glosses were written for this project. The
tests check that every entry is complete, every noun's article agrees with its gender,
every example has exactly one gap, no word appears twice, and every word of every
sentence has a gloss in [`data/glossary.js`](data/glossary.js) — so the deck can grow
safely towards a full exam list.

## Run locally

Any static file server works (ES modules do not load from `file://`):

```bash
git clone https://github.com/EllenSyuu/FRvc && cd FRvc
python3 -m http.server 8000      # then open http://localhost:8000
npm test                         # Node ≥ 20; no packages to install
```

```
index.html          the page shell
css/style.css       the atelier look: ink on warm paper, hairlines, pen draw-in
js/app.js           views, the session engine and the six exercises
js/check.js         answer checking, sentence diff, copy check (pure, unit-tested)
js/gloss.js         hoverable sentences, key-word marks, bracketed translations
js/srs.js           Leitner schedule and the daily plan (pure, unit-tested)
js/store.js         progress in localStorage, migrations, JSON export / import
js/merge.js         merging progress from several devices (pure, unit-tested)
js/sync.js          sync through a private Gist
js/pwa.js, sw.js    installable app, offline support
manifest.webmanifest
js/speech.js        pronunciation through the browser's speech synthesis
js/progress.js      the progress board: streak seal, deck ring, week, 20-week calendar, levels, stamps
js/art.js           the drawn plate, theme icons, the 30-day sketch, the odd passing gull
data/deck.js        the first 13 themes; data/vocab/ holds one file per further theme
data/glossary.js    glosses for every word form; data/gloss/ adds the rest
data/grammar/       one file per grammar lesson (explanation + drills)
data/reading/       one file per reading passage (text, translation, questions)
js/lessons.js       the Grammaire and Lecture pages
tools/              check-content.mjs (validates all content), build-index.mjs
tests/              node:test suites for check.js, srs.js, merge.js, the deck and the glossary
```

## Privacy

There is no analytics and no cookie. Without sync, nothing leaves the browser; with sync,
progress goes only to a private Gist in your own GitHub account. Pronunciation uses the
voices installed on the device. The site is public but progress is not shared: every
visitor starts from an empty notebook in their own browser, and nobody else can read or
change yours.

## Design

The page is drawn in the same atelier style as [ellensyuu.github.io](https://ellensyuu.github.io):
blue-black ink and graphite on warm paper, hand-lettered notes, orange only for the maple
leaf and for what matters, strokes that ink themselves in on first view, and motion that
stops for `prefers-reduced-motion`. Type: Cormorant Garamond, Inter and La Belle Aurore,
self-hosted under the SIL Open Font License (see [`fonts/`](fonts/)).

## Roadmap

- Listening comprehension with recorded audio, and timed mock tests.
- A daily reminder at a chosen time.
- Import a word list (CSV) to study your own vocabulary with the same exercises.
- Spoken answers through the browser's speech recognition, for the speaking tasks.

## License

Code and vocabulary data: [Apache-2.0](LICENSE) © 2026 Ziyi Zhou. Fonts: SIL OFL 1.1.

FRvc is an independent study tool. It is not affiliated with France Éducation
international, CCI Paris Île-de-France or IRCC.
