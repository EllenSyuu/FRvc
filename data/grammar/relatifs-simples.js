export default {
  id: 'relatifs-simples',
  n: 23,
  fr: 'Les pronoms relatifs simples',
  zh: '简单关系代词：qui, que, dont, où',
  level: 'B1',
  summary: '中文用“的”把修饰语放在名词前（“我昨天买的书”），法语用关系代词把从句放在名词后：选哪一个，取决于它在从句里的作用。',
  explain: [
    {
      h: 'qui 和 que：主语还是宾语',
      p: '*qui* 在从句中作**主语**，后面直接跟动词：*la femme **qui** parle*。*que* 在从句中作**直接宾语**，后面跟主语 + 动词：*le livre **que** je lis*。*que* 在元音前省音为 *qu\'*，*qui* 永不省音。判断方法：看关系代词后面是动词还是主语。',
      ex: [
        ["J'ai un voisin qui joue du piano tous les soirs.", '我有个邻居每天晚上弹钢琴。'],
        ["Le film qu'on a vu hier était un peu long.", '我们昨天看的电影有点长。'],
      ],
    },
    {
      h: 'que 与过去分词配合',
      p: '*que* 代替的是前面的名词，是**前置的直接宾语**，所以 *avoir* 复合时态的过去分词要和这个名词配合：*la maison que nous avons achet**ée***，*les lettres qu\'il a écrit**es***。',
      ex: [
        ["Voici les photos que j'ai prises pendant le voyage.", '这是我旅行时拍的照片。'],
      ],
    },
    {
      h: 'dont：代替 de + 名词',
      p: '*dont* 代替 **de + 名词**。常见于：动词 + de（*parler de, avoir besoin de, se souvenir de, s\'occuper de, être fier de*），以及名词补语（*le collègue dont la fille…* = 他的女儿）。*dont* 后面的语序是正常语序：主语 + 动词 + 宾语。',
      table: {
        head: ['结构', '例子'],
        rows: [
          ['avoir besoin de', "C'est le document dont j'ai besoin."],
          ['parler de', 'Voilà le roman dont tout le monde parle.'],
          ['名词补语（de 表所属）', "J'ai un ami dont le père est médecin."],
        ],
      },
      ex: [
        ["C'est l'outil dont j'ai besoin pour réparer la porte.", '这就是我修门需要的工具。'],
        ['La collègue dont je t\'ai parlé arrive lundi.', '我跟你提过的那位同事星期一到。'],
      ],
    },
    {
      h: 'où：地点和时间',
      p: '*où* 代替**地点**：*la ville où je suis né*。它也代替**时间**，这一点和英语不同：*le jour où je suis arrivé*（我到的那天），*l\'année où…*，*au moment où…*。不要用 *quand* 代替这里的 *où*。',
      ex: [
        ['Le quartier où nous habitons est très calme.', '我们住的那个街区很安静。'],
        ["Je me souviens du jour où j'ai reçu ma résidence permanente.", '我记得我拿到永久居民身份的那一天。'],
      ],
    },
    {
      h: 'ce qui, ce que, ce dont：“……的东西 / 事”',
      p: '没有具体先行词、意思是“……的事情”时，在前面加 *ce*：*ce qui*（作主语）、*ce que*（作宾语）、*ce dont*（代替 de）。常用于间接引语和强调句：*Ce qui m\'inquiète, c\'est le prix.*',
      table: {
        head: ['形式', '作用', '例子'],
        rows: [
          ['ce qui', '主语', "Ce qui est important, c'est la santé."],
          ['ce que', '直接宾语', "Dis-moi ce que tu veux."],
          ['ce dont', 'de + 东西', "Ce dont j'ai peur, c'est l'échec."],
        ],
      },
      ex: [
        ["Je ne comprends pas ce qui se passe.", '我不明白发生了什么。'],
        ["Ce que j'aime à Montréal, c'est l'ambiance des festivals.", '我喜欢蒙特利尔的是节日的氛围。'],
        ["Explique-moi ce dont tu as besoin.", '跟我说说你需要什么。'],
      ],
    },
  ],
  tips: [
    '中文“我需要的东西”看不出介词，所以很多人写 *la chose que j\'ai besoin*，正确是 *la chose **dont** j\'ai besoin*（avoir besoin **de**）。',
    '*dont* 不能和 *de* 重复：说 *le film dont je parle*，不说 *le film dont je parle de*。',
    '“我到的那天” 是 *le jour **où** je suis arrivé*，不是 *le jour quand* 也不是 *le jour que*。',
    '*qui* 后面的动词和先行词配合：*c\'est moi qui **suis** responsable*，*c\'est nous qui **avons** gagné*。',
  ],
  drills: [
    { t: 'choice', s: "La dame ___ habite au troisième étage est infirmière.", o: ['qui', 'que', 'dont'], a: 0, why: '后面直接跟动词 habite，作主语 → qui。', zh: '住在四楼的那位女士是护士。' },
    { t: 'choice', s: "Le gâteau ___ ma mère prépare est délicieux.", o: ['que', 'qui', 'où'], a: 0, why: '后面是主语 ma mère，gâteau 是 prépare 的宾语 → que。', zh: '我妈妈做的蛋糕很好吃。' },
    { t: 'fill', s: "C'est la ville [[où]] j'ai fait mes études.", hint: '地点', zh: '这是我读书的城市。', alt: [] },
    { t: 'choice', s: "Voici le dictionnaire ___ j'ai besoin.", o: ['dont', 'que', 'où'], a: 0, why: 'avoir besoin de → dont。', zh: '这就是我需要的词典。' },
    { t: 'fill', s: "Le restaurant [[qu']]on nous a recommandé est fermé le lundi.", hint: 'que 在元音前', zh: '别人推荐给我们的那家餐馆周一关门。', alt: [] },
    { t: 'choice', s: "Je me souviens très bien du jour ___ nous nous sommes rencontrés.", o: ['où', 'quand', 'que'], a: 0, why: '表示时间的先行词（le jour）后用 où。', zh: '我清楚记得我们相遇的那一天。' },
    { t: 'choice', s: "C'est un problème ___ on parle beaucoup en ce moment.", o: ['dont', 'que', 'qui'], a: 0, why: 'parler de → dont。', zh: '这是现在大家谈论很多的一个问题。' },
    { t: 'choice', s: "J'ai une amie ___ le frère travaille à Ottawa.", o: ['dont', 'que', 'qui'], a: 0, why: 'le frère de mon amie：名词补语 de → dont。', zh: '我有个朋友，她哥哥在渥太华工作。' },
    { t: 'fill', s: "Les chansons qu'elle a [[chantées]] hier soir étaient magnifiques.", hint: 'chanter 的过去分词，注意配合', zh: '她昨晚唱的那些歌太美了。', alt: [] },
    { t: 'choice', s: "Dis-moi ___ te ferait plaisir pour ton anniversaire.", o: ['ce qui', 'ce que', 'ce dont'], a: 0, why: '从句中作主语（ferait 的主语）→ ce qui。', zh: '告诉我你生日想要什么。' },
    { t: 'choice', s: "Je ne sais pas ___ il veut faire après le cégep.", o: ['ce qu\'', 'ce qui', 'ce dont'], a: 0, why: '从句中作 faire 的宾语，后面有主语 il → ce que（省音）。', zh: '我不知道他读完 cégep 后想做什么。' },
    { t: 'fill', s: "C'est exactement ce [[dont]] je rêvais.", hint: 'rêver de', zh: '这正是我梦寐以求的。', alt: [] },
    { t: 'transform', from: "J'ai lu un article. Cet article parle de l'immigration.", task: '用关系代词合并成一句', to: ["J'ai lu un article qui parle de l'immigration."], zh: '我读了一篇讲移民的文章。' },
    { t: 'transform', from: "C'est un projet. Je suis très fier de ce projet.", task: '用关系代词合并成一句', to: ["C'est un projet dont je suis très fier."], zh: '这是一个让我很自豪的项目。' },
    { t: 'transform', from: "Voici la maison. Mes grands-parents ont vécu dans cette maison.", task: '用关系代词合并成一句', to: ['Voici la maison où mes grands-parents ont vécu.', 'Voici la maison où ont vécu mes grands-parents.', 'Voici la maison dans laquelle mes grands-parents ont vécu.', 'Voici la maison dans laquelle ont vécu mes grands-parents.'], zh: '这就是我祖父母住过的房子。' },
    { t: 'choice', s: "C'est toi qui ___ raison.", o: ['as', 'a', 'ont'], a: 0, why: 'qui 的先行词是 toi，动词用第二人称单数。', zh: '是你说得对。' },
  ],
};
