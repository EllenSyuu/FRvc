export default {
  id: 'prepositions-temps-lieu',
  n: 26,
  fr: 'Les prépositions de temps et de lieu',
  zh: '时间介词和地点介词',
  level: 'B1',
  summary: '中文一个“在”、一个“……以来”就够了，法语却要在 depuis / pendant / il y a / dans / en 和 à / en / au / aux / chez / dans 之间做选择：这一课把它们分开讲清。',
  explain: [
    {
      h: 'depuis 和 pendant',
      p: '*depuis* 表示一个**从过去开始、现在还在继续**的动作，动词用**现在时**：*j\'habite à Montréal depuis trois ans*（我在蒙特利尔住了三年了，现在还住）。*depuis* 后面可以接时长或起点：*depuis 2022, depuis lundi*。*pendant* 表示一段**已经结束或有限的时长**，常和过去时或将来时连用：*j\'ai habité à Lyon pendant deux ans*（住过两年，现在不住了）。',
      ex: [
        ['Je travaille dans cette entreprise depuis septembre.', '我从九月起就在这家公司工作。'],
        ["Il a vécu à Toronto pendant cinq ans, puis il est venu ici.", '他在多伦多住了五年，然后来到了这里。'],
      ],
    },
    {
      h: 'il y a、dans 和 en',
      p: '*il y a* + 时长 = “……**以前**”，指过去的某个时间点，配过去时：*je suis arrivé il y a deux mois*。*dans* + 时长 = “……**以后**”，从现在算起，配将来时：*le train part dans dix minutes*。*en* + 时长 = “**用了**多长时间完成”：*j\'ai fini ce rapport en une heure*。*en* 也用于月份、年份和季节（*en mars, en 2025, en été, en hiver, en automne*），但春天是 *au printemps*。',
      table: {
        head: ['介词', '意思', '例子'],
        rows: [
          ['depuis', '……以来（仍在继续）', "J'étudie le français depuis un an."],
          ['pendant', '在……期间（有限时长）', "J'ai dormi pendant huit heures."],
          ['il y a', '……以前', 'Je suis arrivé il y a un an.'],
          ['dans', '……以后', 'Je pars dans une semaine.'],
          ['en', '用……时间完成', "J'ai lu ce livre en deux jours."],
        ],
      },
      ex: [
        ["J'ai passé le TCF il y a un mois et j'aurai les résultats dans deux semaines.", '我一个月前考了 TCF，两周后出成绩。'],
        ["Elle a appris à conduire en six semaines.", '她用六个星期学会了开车。'],
      ],
    },
    {
      h: '城市和国家：à / en / au / aux',
      p: '**城市**前用 *à*：*à Montréal, à Paris*。**国家**看性别和数：阴性国家（多以 -e 结尾）和以元音开头的国家用 *en*：*en France, en Chine, en Italie, en Iran*；阳性国家用 *au*：*au Canada, au Japon, au Mexique*；复数国家用 *aux*：*aux États-Unis, aux Pays-Bas*。省份同理：*au Québec, en Ontario, en Colombie-Britannique*。“从……来”：*de France, du Canada, des États-Unis*。',
      table: {
        head: ['类型', '去 / 在', '从……来'],
        rows: [
          ['城市', 'à Québec', 'de Québec'],
          ['阴性国家 / 元音开头', 'en Chine, en Iran', "de Chine, d'Iran"],
          ['阳性国家', 'au Canada', 'du Canada'],
          ['复数国家', 'aux États-Unis', 'des États-Unis'],
        ],
      },
      ex: [
        ['Mon cousin vit au Japon, mais il travaille souvent en Corée.', '我表哥住在日本，但经常在韩国工作。'],
        ['Elle vient de Chine et habite maintenant au Québec.', '她来自中国，现在住在魁北克。'],
      ],
    },
    {
      h: 'chez、dans 和 à + 地点',
      p: '*chez* + **人或人名**（不是地点）：*chez moi, chez le médecin, chez mes parents*。*dans* 表示**在……里面**（有明确的空间边界）：*dans la cuisine, dans le métro, dans mon sac*。*à* + **公共场所 / 机构**：*à la banque, à l\'école, au bureau, à la pharmacie*。比较：*je suis à la pharmacie*（在药店办事）vs *je suis chez le pharmacien*（在药剂师那里）。',
      ex: [
        ['Ce soir, on mange chez mes beaux-parents.', '今晚我们在我配偶的父母家吃饭。'],
        ["J'ai laissé mes lunettes dans la voiture.", '我把眼镜落在车里了。'],
        ['Je dois passer à la banque avant midi.', '中午前我得去一趟银行。'],
      ],
    },
  ],
  tips: [
    '中文说“我在这里住了三年了”，很多人写 *j\'ai habité ici depuis trois ans*。正确是**现在时**：*j\'habite ici depuis trois ans*。',
    '*il y a* 是“以前”，*dans* 是“以后”：*dans deux jours*（两天后），不是“在两天里面”。',
    '*chez* 后面只能接人：*chez le dentiste* 对，*chez la clinique* 错（应说 *à la clinique*）。',
    '*le Mexique, le Cambodge, le Mozambique* 虽以 -e 结尾却是阳性，所以是 *au Mexique*。',
  ],
  drills: [
    { t: 'choice', s: "J'apprends le français ___ deux ans.", o: ['depuis', 'pendant', 'il y a'], a: 0, why: '动作从过去持续到现在，动词用现在时 → depuis。', zh: '我学法语两年了。' },
    { t: 'choice', s: "L'été dernier, j'ai travaillé dans un camp ___ six semaines.", o: ['pendant', 'depuis', 'dans'], a: 0, why: '过去已结束的一段时长 → pendant。', zh: '去年夏天我在一个夏令营工作了六个星期。' },
    { t: 'fill', s: "Nous sommes arrivés au Canada [[il y a]] trois ans.", hint: '“……以前”', zh: '我们三年前来到加拿大。', alt: [] },
    { t: 'choice', s: "Dépêche-toi ! Le film commence ___ cinq minutes.", o: ['dans', 'il y a', 'en'], a: 0, why: '从现在算起五分钟后 → dans。', zh: '快点！电影五分钟后开始。' },
    { t: 'choice', s: "Il a écrit ce rapport ___ une seule soirée.", o: ['en', 'dans', 'depuis'], a: 0, why: '完成一件事所用的时间 → en。', zh: '他只用一个晚上就写完了这份报告。' },
    { t: 'fill', s: "Les arbres fleurissent [[au]] printemps.", hint: '春天例外', zh: '树木在春天开花。', alt: [] },
    { t: 'fill', s: "Ma meilleure amie habite [[à]] Vancouver.", hint: '城市', zh: '我最好的朋友住在温哥华。', alt: [] },
    { t: 'choice', s: "L'année prochaine, je vais étudier ___ Belgique.", o: ['en', 'au', 'à'], a: 0, why: 'la Belgique 是阴性国家 → en。', zh: '明年我要去比利时读书。' },
    { t: 'choice', s: "Beaucoup d'immigrants s'installent ___ Canada.", o: ['au', 'en', 'à'], a: 0, why: 'le Canada 是阳性 → au。', zh: '很多移民在加拿大定居。' },
    { t: 'fill', s: "Mon frère fait un stage [[aux]] États-Unis.", hint: '复数国家', zh: '我哥哥在美国实习。', alt: [] },
    { t: 'choice', s: 'Elle a déménagé ___ Ontario pour son travail.', o: ['en', 'au', 'à'], a: 0, why: "l'Ontario 以元音开头 → en。", zh: '她因为工作搬到了安大略省。' },
    { t: 'choice', s: "J'ai rendez-vous ___ le dentiste à quinze heures.", o: ['chez', 'à', 'dans'], a: 0, why: 'le dentiste 是人 → chez。', zh: '我下午三点约了牙医。' },
    { t: 'choice', s: "Les enfants jouent ___ le jardin.", o: ['dans', 'chez', 'en'], a: 0, why: '在有边界的空间里面 → dans。', zh: '孩子们在花园里玩。' },
    { t: 'fill', s: "Ce vin vient [[du]] Chili.", hint: 'de + le Chili', zh: '这瓶酒来自智利。', alt: [] },
    { t: 'transform', from: "J'habite à Laval. J'ai commencé à habiter à Laval en 2021.", task: '用 depuis 合并成一句（以 J\'habite à Laval 开头）', to: ["J'habite à Laval depuis 2021."], zh: '我从 2021 年起住在拉瓦尔。' },
    { t: 'choice', s: "Je ne l'ai pas vu ___ son mariage.", o: ['depuis', 'en', 'il y a'], a: 0, why: '从婚礼那时起到现在都没见过 → depuis + 事件。', zh: '自从他结婚后我就没见过他。' },
    { t: 'choice', s: "Il travaille ___ Mexique ___ un an.", o: ['au … depuis', 'en … depuis', 'au … il y a'], a: 0, why: 'le Mexique 阳性 → au；现在时 + 持续 → depuis。', zh: '他在墨西哥工作一年了。' },
  ],
};
