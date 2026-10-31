export default {
  id: 'imparfait',
  n: 5,
  fr: "L'imparfait",
  zh: '未完成过去时',
  level: 'B1',
  summary: '学会未完成过去时的构成，并分清它和复合过去时：一个是背景和习惯，一个是事件和结果。',
  explain: [
    {
      h: '构成：nous 的词干 + 固定词尾',
      p: "取现在时 *nous* 的形式，去掉 *-ons*，加上词尾 *-ais, -ais, -ait, -ions, -iez, -aient*。所有动词都这样，**唯一例外是 *être***，词干是 *ét-*。\n*nous finissons* → *je finissais*；*nous faisons* → *je faisais*；*nous prenons* → *je prenais*。\n拼写变化的动词照样保留：*nous mangeons* → *je mangeais*（但 *nous mangions*）；*nous commençons* → *je commençais*（但 *nous commencions*）。",
      table: {
        head: ['', 'parler', 'finir', 'être', 'avoir'],
        rows: [
          ['je (j\')', 'parlais', 'finissais', 'étais', 'avais'],
          ['tu', 'parlais', 'finissais', 'étais', 'avais'],
          ['il / elle / on', 'parlait', 'finissait', 'était', 'avait'],
          ['nous', 'parlions', 'finissions', 'étions', 'avions'],
          ['vous', 'parliez', 'finissiez', 'étiez', 'aviez'],
          ['ils / elles', 'parlaient', 'finissaient', 'étaient', 'avaient'],
        ],
      },
      ex: [
        ['Quand j\'étais enfant, j\'habitais à la campagne.', '我小时候住在乡下。'],
        ['Nous mangions souvent chez nos grands-parents.', '我们以前经常在祖父母家吃饭。'],
      ],
    },
    {
      h: '用法 ①：描写背景（décor）',
      p: "讲故事时，未完成过去时负责**布景**：天气、时间、地点、人物的外貌、心情、正在进行的状态。它不告诉你动作什么时候开始或结束，就像电影的背景画面。",
      ex: [
        ['Il faisait froid et il neigeait depuis le matin.', '天很冷，从早上起就一直在下雪。'],
        ['La salle était pleine et les gens semblaient fatigués.', '大厅坐满了人，大家看起来都很累。'],
      ],
    },
    {
      h: '用法 ②：过去的习惯',
      p: "表示过去**反复发生**的事情，常和 *tous les jours, chaque été, d'habitude, souvent, autrefois, quand j'étais petit* 等连用。中文常说“以前（总是）……”。",
      ex: [
        ['Chaque été, nous allions au bord de la mer.', '以前每年夏天我们都去海边。'],
        ["D'habitude, il prenait le bus, mais aujourd'hui il est venu à pied.", '他平常坐公交车，但今天是走路来的。'],
      ],
    },
    {
      h: '用法 ③：正在进行时被打断',
      p: "一个动作正在进行（未完成过去时），另一个动作突然发生（复合过去时）。常用 *quand* 或 *pendant que* 连接：*Je dormais quand le téléphone a sonné.*\n判断方法：问自己“这个动作是**背景/过程**，还是**一个具体的点、推动了故事**？”——前者用未完成过去时，后者用复合过去时。",
      table: {
        head: ['未完成过去时 imparfait', '复合过去时 passé composé'],
        rows: [
          ['背景、描写、状态', '具体事件、动作的结果'],
          ['习惯、反复', '一次性、有明确次数'],
          ['正在进行的动作', '打断它的动作'],
          ['持续时间不明确', '有明确起止：pendant deux ans, de 2010 à 2015'],
        ],
      },
      ex: [
        ['Je préparais le dîner quand mon frère est arrivé.', '我正在做晚饭的时候，我弟弟到了。'],
        ['Pendant que nous attendions, il a commencé à pleuvoir.', '我们在等的时候，开始下雨了。'],
        ["J'ai travaillé à Toronto pendant trois ans.", '我在多伦多工作过三年。'],
      ],
    },
    {
      h: '其他常见用法',
      p: "• *si* + 未完成过去时表示建议：*Si on allait au cinéma ?*（我们去看电影怎么样？）\n• 与条件式搭配表示假设（见“条件式”一课）：*Si j'avais le temps, je voyagerais.*\n• *venir de* 和 *être en train de* 在过去叙述中用未完成过去时：*il venait de partir*（他刚走）。",
      ex: [
        ['Si on allait au restaurant ce soir ?', '今晚我们去餐馆吃饭怎么样？'],
        ['Quand je suis arrivé, le train venait de partir.', '我到的时候，火车刚刚开走。'],
      ],
    },
  ],
  tips: [
    '“有明确时长”的已结束动作用复合过去时：*j\'ai habité à Lyon pendant cinq ans*，而不是 *j\'habitais … pendant cinq ans*。',
    '*nous mangions*、*nous commencions*：*-ions* 前面是 *i*，所以不再需要 *e* 或 *ç*；但 *je mangeais*、*je commençais* 要保留。',
    '中文没有时态变化，写作时最容易全部用复合过去时。讲故事时先把“背景”挑出来改成未完成过去时。',
    '*être* 是唯一词干不规则的：*j\'étais*，不是 *je sommais*。',
  ],
  drills: [
    { t: 'fill', s: 'Quand il était jeune, il [[jouait]] au hockey.', hint: 'jouer', zh: '他年轻时打冰球。' },
    { t: 'fill', s: 'Nous [[habitions]] près de l\'université.', hint: 'habiter', zh: '我们以前住在大学附近。' },
    { t: 'fill', s: 'Vous [[faisiez]] du sport le week-end ?', hint: 'faire', zh: '你们以前周末做运动吗？' },
    { t: 'fill', s: 'Les rues [[étaient]] vides à cette heure-là.', hint: 'être', zh: '那个时候街上空无一人。' },
    { t: 'choice', s: 'Autrefois, je ___ beaucoup de café.', o: ['buvais', 'boivais', 'ai bu'], a: 0, why: '过去的习惯用未完成过去时；词干来自 *nous buvons* → *buv-*。', zh: '我以前喝很多咖啡。' },
    { t: 'choice', s: 'Nous ___ toujours à midi.', o: ['mangions', 'mangeions', 'mangeons'], a: 0, why: '*-ions* 以 *i* 开头，*g* 已经读软音，不再加 *e*：*nous mangions*。', zh: '我们以前总是中午吃饭。' },
    { t: 'choice', s: 'Il ___ beau, alors nous sommes sortis.', o: ['faisait', 'faisais', 'fera'], a: 0, why: '天气是背景描写，用未完成过去时，主语 *il* 对应词尾 *-ait*。', zh: '天气很好，所以我们出去了。' },
    { t: 'choice', s: 'Je lisais quand quelqu\'un ___ à la porte.', o: ['a frappé', 'frappait', 'frappe'], a: 0, why: '正在进行的动作（*lisais*）被一个突然的事件打断，后者用复合过去时。', zh: '我在看书的时候，有人敲了门。' },
    { t: 'choice', s: "J'___ à Vancouver de 2018 à 2021.", o: ['ai vécu', 'vivais', 'vis'], a: 0, why: '有明确的起止时间，整体看作一个已完成的事实，用复合过去时。', zh: '我 2018 年到 2021 年住在温哥华。' },
    { t: 'choice', s: 'Ce jour-là, elle ___ trois fois au bureau.', o: ['a téléphoné', 'téléphonait', 'téléphonais'], a: 0, why: '有明确次数（三次）的一次性事件，用复合过去时。', zh: '那天她给办公室打了三次电话。' },
    { t: 'choice', s: 'Quand nous sommes arrivés à la fête, tout le monde ___.', o: ['dansait', 'a dansé', 'danse'], a: 0, why: '我们到达时大家“正在跳舞”，这是背景，用未完成过去时；*a dansé* 会变成“到了以后大家跳了一次舞”。', zh: '我们到聚会的时候，大家正在跳舞。' },
    { t: 'fill', s: 'Si on [[prenait]] un café ensemble ?', hint: 'prendre', zh: '我们一起喝杯咖啡怎么样？' },
    { t: 'transform', from: 'Je travaille dans un restaurant.', task: '改成未完成过去时（以前的状态）', to: ['Je travaillais dans un restaurant.'], zh: '我以前在一家餐馆工作。' },
    { t: 'transform', from: 'Nous commençons à huit heures.', task: '改成未完成过去时', to: ['Nous commencions à huit heures.'], zh: '我们以前八点开始。' },
    { t: 'transform', from: 'Elle dort. Le réveil sonne.', task: '用 quand 合成一句过去的叙述', to: ['Elle dormait quand le réveil a sonné.'], zh: '她正在睡觉，闹钟响了。' },
    { t: 'transform', from: 'Il pleut et nous restons à la maison.', task: '改成过去叙述：下雨是背景，“待在家里”是那天做的决定', to: ['Il pleuvait et nous sommes restés à la maison.', 'Il pleuvait et nous sommes restées à la maison.'], zh: '下着雨，我们就待在家里了。' },
    { t: 'conj', verb: 'faire', tense: 'imparfait', forms: ['je faisais', 'tu faisais', 'il/elle faisait', 'nous faisions', 'vous faisiez', 'ils/elles faisaient'] },
    { t: 'conj', verb: 'commencer', tense: 'imparfait', forms: ['je commençais', 'tu commençais', 'il/elle commençait', 'nous commencions', 'vous commenciez', 'ils/elles commençaient'] },
    { t: 'conj', verb: 'être', tense: 'imparfait', forms: ["j'étais", 'tu étais', 'il/elle était', 'nous étions', 'vous étiez', 'ils/elles étaient'] },
  ],
};
