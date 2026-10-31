export default {
  id: 'noms-genre-pluriel',
  n: 19,
  fr: 'Le genre et le pluriel des noms',
  zh: '名词的阴阳性与复数',
  level: 'A2',
  summary: '法语每个名词都有性别，选错就连带冠词、形容词和过去分词一起出错：这一课教你靠词尾猜性别，并掌握不规则复数和复合名词。',
  explain: [
    {
      h: '看词尾猜性别：大多是阴性的词尾',
      p: '没有百分之百的规则，但词尾能帮你猜对大部分名词。以 **-tion, -sion, -té, -ure, -ence, -ance, -ette, -ise, -ie** 结尾的名词通常是**阴性**。最可靠的是 *-tion / -sion*，几乎没有例外。',
      table: {
        head: ['词尾', '例子', '常见例外'],
        rows: [
          ['-tion / -sion', 'la question, la décision', '—'],
          ['-té', 'la santé, la société', "l'été, le côté (m.)"],
          ['-ure', 'la culture, la voiture', 'le murmure, le mercure (m.)'],
          ['-ence / -ance', 'la différence, la chance', 'le silence (m.)'],
          ['-ette', 'la recette, la fourchette', 'le squelette (m.)'],
        ],
      },
      ex: [
        ['La décision finale sera prise demain.', '最终决定明天作出。'],
        ["L'été est une saison agréable à Québec.", '夏天是魁北克舒服的季节。'],
      ],
    },
    {
      h: '大多是阳性的词尾',
      p: '以 **-age, -ment, -isme, -eau, -oir, -ier, -et** 结尾的名词通常是**阳性**。*-age* 有几个常用的阴性例外要背：*la page, la plage, l\'image, la cage, la nage*。*-eau* 的例外：*l\'eau, la peau*。',
      table: {
        head: ['词尾', '例子', '常见例外'],
        rows: [
          ['-age', 'le voyage, le fromage', "la page, la plage, l'image (f.)"],
          ['-ment', 'le logement, le changement', '—'],
          ['-isme', 'le tourisme, le journalisme', '—'],
          ['-eau', 'le bureau, le gâteau', "l'eau, la peau (f.)"],
          ['-oir', 'le miroir, le devoir', '—'],
        ],
      },
      ex: [
        ['Le logement coûte cher dans le centre-ville.', '市中心的住房很贵。'],
        ["J'ai lu la page trois de ce document.", '我读了这份文件的第三页。'],
      ],
    },
    {
      h: '规则复数和不规则复数',
      p: '一般加 **-s**（不发音）。以 *-s, -x, -z* 结尾的不变：*un prix → des prix*。**-al → -aux**：*un journal → des journaux*（例外：*des festivals, des bals*）。**-eau / -au / -eu → +x**：*des bureaux, des tuyaux, des jeux*（例外：*des pneus*）。**-ail** 多数加 s，但 *un travail → des travaux*。七个 *-ou* 名词加 x：*bijou, caillou, chou, genou, hibou, joujou, pou*。最特殊的：*un œil → des yeux*。',
      table: {
        head: ['单数', '复数', '规则'],
        rows: [
          ['un animal', 'des animaux', '-al → -aux'],
          ['un château', 'des châteaux', '-eau → -eaux'],
          ['un cheveu', 'des cheveux', '-eu → -eux'],
          ['un genou', 'des genoux', '-ou → -oux（7 个）'],
          ['un travail', 'des travaux', '-ail → -aux（少数）'],
          ['un œil', 'des yeux', '完全不规则'],
        ],
      },
      ex: [
        ['Les journaux locaux parlent des travaux sur le pont.', '本地报纸在报道桥上的施工。'],
        ['Elle a les cheveux longs et les yeux verts.', '她长发、绿眼睛。'],
      ],
    },
    {
      h: '复合名词的复数',
      p: '基本原则：**名词和形容词**会变复数，**动词、副词、介词**不变。*un grand-parent → des grands-parents*（形容词 + 名词，都变）；*un ouvre-boîte → des ouvre-boîtes*（动词不变）；*un après-midi → des après-midi*（介词 + 名词，常不变）。*un chef-d\'œuvre → des chefs-d\'œuvre*（第二部分由 de 连接，只变第一个）。',
      ex: [
        ['Mes grands-parents viennent nous voir tous les week-ends.', '我的祖父母每个周末都来看我们。'],
        ['Ce musée possède plusieurs chefs-d\'œuvre.', '这个博物馆藏有好几件杰作。'],
      ],
    },
    {
      h: '同形异性词和成对名词',
      p: '有些名词性别不同、意思也不同：*le livre*（书）/ *la livre*（磅），*le tour*（一圈）/ *la tour*（塔），*le poste*（职位）/ *la poste*（邮局），*le mode*（方式）/ *la mode*（时尚）。表示人的名词多有阴性形式：*un étudiant → une étudiante, un acteur → une actrice, un infirmier → une infirmière*。',
      ex: [
        ['Il a obtenu un poste à la poste de son quartier.', '他在街区的邮局找到了一份工作。'],
      ],
    },
  ],
  tips: [
    '背单词时永远连冠词一起背：记 *la voiture*，不要只记 *voiture*。元音开头的词用 *un/une* 来记，因为 *l\'* 看不出性别。',
    '*le problème, le système, le programme*（-ème / -amme 结尾）是阳性，很多学生以为是阴性。',
    '*des yeux* 前面连诵读作 /de-zjø/，口试时很容易念错。',
    '*-al → -aux* 时，形容词也一样：*un problème social → des problèmes sociaux*。',
  ],
  drills: [
    { t: 'choice', s: "___ situation économique s'améliore.", o: ['La', 'Le'], a: 0, why: '-tion 结尾，阴性。', zh: '经济形势正在好转。' },
    { t: 'choice', s: "___ fromage de cette région est délicieux.", o: ['Le', 'La'], a: 0, why: '-age 结尾通常是阳性。', zh: '这个地区的奶酪很好吃。' },
    { t: 'choice', s: "Nous avons passé l'après-midi sur ___ plage.", o: ['la', 'le'], a: 0, why: 'plage 是 -age 结尾的阴性例外。', zh: '我们在海滩上度过了下午。' },
    { t: 'choice', s: "C'est ___ problème important.", o: ['un', 'une'], a: 0, why: 'problème 虽以 -e 结尾，却是阳性。', zh: '这是个重要的问题。' },
    { t: 'fill', s: 'Ce mois-ci, la ville fait des [[travaux]] dans ma rue.', hint: 'travail 的复数', zh: '这个月市政府在我那条街上施工。', alt: [] },
    { t: 'fill', s: "Il y a beaucoup d'[[animaux]] dans ce parc.", hint: 'animal 的复数', zh: '这个公园里有很多动物。', alt: [] },
    { t: 'fill', s: "Les enfants jouent à des [[jeux]] de société le soir.", hint: 'jeu 的复数', zh: '孩子们晚上玩桌游。', alt: [] },
    { t: 'fill', s: 'Il est tombé et il a mal aux deux [[genoux]].', hint: 'genou 的复数', zh: '他摔倒了，两个膝盖都疼。', alt: [] },
    { t: 'transform', from: 'Le bureau est grand.', task: '把整句改成复数', to: ['Les bureaux sont grands.'], zh: '这些办公室很大。' },
    { t: 'transform', from: 'Le journal régional est gratuit.', task: '把整句改成复数', to: ['Les journaux régionaux sont gratuits.'], zh: '这些地区报纸是免费的。' },
    { t: 'choice', s: "Ma ville organise plusieurs ___ de musique chaque été.", o: ['festivals', 'festivaux'], a: 0, why: 'festival 是 -al 的例外，复数加 s。', zh: '我的城市每年夏天举办好几个音乐节。' },
    { t: 'choice', s: "Mes ___ habitent à Trois-Rivières.", o: ['grands-parents', 'grand-parents', 'grands-parent'], a: 0, why: '形容词 grand 和名词 parent 都要变复数。', zh: '我的祖父母住在三河市。' },
    { t: 'choice', s: 'Il faut déposer ce colis à ___ poste avant midi.', o: ['la', 'le'], a: 0, why: 'la poste 是邮局，le poste 是职位。', zh: '中午前要把这个包裹送到邮局。' },
    { t: 'fill', s: "Elle a de très beaux [[yeux]] bleus.", hint: 'œil 的复数', zh: '她有一双很漂亮的蓝眼睛。', alt: [] },
    { t: 'choice', s: "Mon frère est acteur et ma cousine est ___.", o: ['actrice', 'acteure', 'acteuse'], a: 0, why: '-teur 的阴性常是 -trice。', zh: '我哥哥是演员，我表姐也是演员。' },
    { t: 'transform', from: "C'est un nouveau château.", task: '把整句改成复数（Ce sont …）', to: ['Ce sont de nouveaux châteaux.', 'Ce sont des nouveaux châteaux.'], zh: '这些是新城堡。' },
  ],
};
