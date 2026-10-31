export default {
  id: 'hypothese-si',
  n: 9,
  fr: "L'hypothèse avec si",
  zh: '用 si 表达假设',
  level: 'B1',
  summary: '掌握 si 引导的三种假设句的时态搭配，并记住 si 后面永远不用条件式。',
  explain: [
    {
      h: '第一类：可能实现的条件（si + 现在时）',
      p: '条件在现在或将来**很可能实现**时，从句用 *si* + **直陈式现在时**，主句用**现在时、简单将来时或命令式**。注意：即使说的是将来的事，*si* 后面也不能用将来时，不能说 *si il pleuvra*。',
      ex: [
        ["S'il pleut demain, nous resterons à la maison.", '如果明天下雨，我们就待在家里。'],
        ['Si tu as le temps, appelle-moi ce soir.', '你要是有时间，今晚给我打个电话。'],
        ['Si on chauffe la glace, elle fond.', '冰一加热就会融化。'],
      ],
      table: {
        head: ['si 从句', '主句'],
        rows: [
          ['présent', 'présent（普遍事实）'],
          ['présent', 'futur simple（将来结果）'],
          ['présent', 'impératif（建议、指令）'],
        ],
      },
    },
    {
      h: '第二类：与现在事实相反或不太可能（si + 未完成过去时）',
      p: '想象一个**现在不成立**或**不太可能**的情况，从句用 *si* + **imparfait**，主句用**条件式现在时**（conditionnel présent）。这类句子也常用来委婉地提建议：*Si on allait au cinéma ?*',
      ex: [
        ["Si j'avais plus d'argent, j'achèterais une maison à Québec.", '如果我有更多的钱，我会在魁北克城买一栋房子。'],
        ["Si elle parlait français, elle trouverait un emploi plus facilement.", '如果她会说法语，她会更容易找到工作。'],
        ['Si on allait au cinéma ce soir ?', '今晚我们去看电影怎么样？'],
      ],
    },
    {
      h: '第三类：与过去事实相反（si + 愈过去时）',
      p: '对**已经发生的事**表示遗憾或假设，从句用 *si* + **plus-que-parfait**，主句用**条件式过去时**（conditionnel passé = avoir/être 的条件式 + 过去分词）。',
      ex: [
        ["Si nous étions partis plus tôt, nous n'aurions pas raté le train.", '要是我们早点出发，就不会错过火车了。'],
        ["Si tu m'avais prévenu, je serais venu t'aider.", '你要是提前告诉我，我就会来帮你了。'],
      ],
      table: {
        head: ['类型', 'si 从句', '主句'],
        rows: [
          ['可能', 'si + présent', 'présent / futur / impératif'],
          ['现在不真实', 'si + imparfait', 'conditionnel présent'],
          ['过去不真实', 'si + plus-que-parfait', 'conditionnel passé'],
        ],
      },
    },
    {
      h: '混合句：过去的条件，现在的结果',
      p: '如果条件在过去、结果在现在，可以把第三类从句和第二类主句结合：*si* + plus-que-parfait，主句用 conditionnel présent。',
      ex: [["Si j'avais étudié la médecine, je serais médecin aujourd'hui.", '如果我当年学了医，今天就是医生了。']],
    },
    {
      h: '铁律：si 后面绝不用条件式和将来时',
      p: '表示"如果"的 *si* 后面**永远不接 conditionnel，也不接 futur**。条件式只能出现在主句里。*si* 遇到 *il* 和 *ils* 时省音为 *s\'il*、*s\'ils*，但遇到 *elle*、*on* 不省音。（注意：间接疑问句里的 *si*，意思是"是否"，后面可以用将来时或条件式，例如 *Je ne sais pas s\'il viendra*，这是另一种用法。）',
      ex: [
        ["Je ne sais pas s'il viendra demain.", '我不知道他明天会不会来。'],
        ["Si elle arrive en retard, on commencera sans elle.", '如果她迟到，我们就不等她先开始。'],
      ],
    },
  ],
  tips: [
    '最常见错误：受中文"如果……就会……"影响，把 *si* 从句也写成条件式，如 *si j\'aurais* —— 这是错的，应为 *si j\'avais*。',
    '将来的事也不能在 *si* 后面用将来时：*si tu viendras* ✗ → *si tu viens* ✓。',
    '*si* + *il/ils* 必须省音成 *s\'il / s\'ils*，但 *si elle*、*si on* 不省音。',
    'TCF/TEF 口语题常考"Si vous gagniez à la loterie, que feriez-vous ?"，回答时主句一律用条件式。',
  ],
  drills: [
    { t: 'fill', s: "Si tu [[viens]] samedi, on ira au marché ensemble.", hint: 'venir', zh: '如果你周六来，我们一起去市场。', alt: [] },
    { t: 'fill', s: 'Si nous partons maintenant, nous [[arriverons]] avant midi.', hint: 'arriver', zh: '如果我们现在出发，中午前就能到。', alt: ['arrivons'] },
    { t: 'choice', s: "S'il ___ beau demain, nous irons à la plage.", o: ['fera', 'fait', 'ferait'], a: 1, why: 'si 后面不用将来时，可能实现的条件用直陈式现在时。', zh: '如果明天天气好，我们去海滩。' },
    { t: 'choice', s: "Si j'___ une voiture, je visiterais la Gaspésie.", o: ['aurais', 'ai eu', 'avais'], a: 2, why: '主句是条件式现在时，si 从句用 imparfait；si 后面不能用条件式。', zh: '如果我有车，我会去加斯佩半岛玩。' },
    { t: 'fill', s: "Si elle avait plus de temps, elle [[ferait]] du bénévolat.", hint: 'faire', zh: '如果她有更多时间，她会去做志愿者。', alt: [] },
    { t: 'choice', s: '___ on prenait un café avant la réunion ?', o: ['Si', "S'", 'Quand'], a: 0, why: 'si 只在 il/ils 前省音，on 前不省音；Si + imparfait 表示建议。', zh: '会议前我们去喝杯咖啡怎么样？' },
    { t: 'fill', s: "Si vous [[étiez]] à ma place, que feriez-vous ?", hint: 'être', zh: '如果您处在我的位置，您会怎么做？', alt: [] },
    { t: 'conj', verb: 'pouvoir', tense: 'conditionnel présent', forms: ['je pourrais', 'tu pourrais', 'il/elle pourrait', 'nous pourrions', 'vous pourriez', 'ils/elles pourraient'] },
    { t: 'choice', s: "Si j'avais su, je ne ___ pas venu.", o: ['serais', 'aurais', 'suis'], a: 0, why: 'venir 的复合时态用助动词 être，条件式过去时为 je serais venu。', zh: '早知道，我就不来了。' },
    { t: 'fill', s: "Si tu avais écouté le professeur, tu [[aurais compris]] l'exercice.", hint: 'comprendre，条件式过去时', zh: '你要是听了老师讲的，就会懂这道练习了。', alt: [] },
    { t: 'transform', from: "Je n'ai pas d'ordinateur. Je ne peux pas travailler à la maison.", task: '用 si 改写成与现在事实相反的假设句', to: ["Si j'avais un ordinateur, je pourrais travailler à la maison."], zh: '如果我有电脑，就能在家工作了。' },
    { t: 'transform', from: "Il n'a pas réservé. Il n'a pas eu de place.", task: '用 si 改写成与过去事实相反的假设句', to: ["S'il avait réservé, il aurait eu une place.", "S'il avait réservé, il aurait eu de la place."], zh: '他要是预订了，就会有位子了。' },
    { t: 'choice', s: "Si elles ___ le bus de 8 h, elles seraient déjà là.", o: ['avaient pris', 'auraient pris', 'prendraient'], a: 0, why: '条件在过去（没赶上公交），结果在现在：si + plus-que-parfait，主句 conditionnel présent。', zh: '她们要是坐了 8 点的公交，现在应该已经到了。' },
    { t: 'fill', s: "Si nous nous étions levés plus tôt, nous [[aurions vu]] le lever du soleil.", hint: 'voir，条件式过去时', zh: '要是我们早点起床，就能看到日出了。', alt: [] },
    { t: 'transform', from: "Si je gagnerais à la loterie, je voyagerais partout.", task: '改正句中的错误', to: ['Si je gagnais à la loterie, je voyagerais partout.'], zh: '如果我中了彩票，我会到处旅行。' },
    { t: 'choice', s: "Je me demande s'il ___ demain.", o: ['neige', 'neigera', 'neigeait'], a: 1, why: '这里的 si 是"是否"（间接疑问），不是假设，所以可以用将来时。', zh: '我在想明天会不会下雪。' },
  ],
};
