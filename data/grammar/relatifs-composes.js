export default {
  id: 'relatifs-composes',
  n: 24,
  fr: 'Les pronoms relatifs composés',
  zh: '复合关系代词：lequel, auquel, duquel',
  level: 'B2',
  summary: '当关系从句前面需要介词（avec, pour, sur, grâce à…）时，qui/que 就不够用了：这一课教你用 介词 + lequel 及其缩合形式写出 B2 水平的长句。',
  explain: [
    {
      h: 'lequel 的四种形式',
      p: '*lequel* 由定冠词 + *quel* 组成，要和先行词**性数一致**：*lequel*（阳单）、*laquelle*（阴单）、*lesquels*（阳复）、*lesquelles*（阴复）。它几乎总是跟在**介词**后面：*la raison pour laquelle…*（……的原因），*le stylo avec lequel…*（用来……的笔）。',
      table: {
        head: ['', '单数', '复数'],
        rows: [
          ['阳性', 'lequel', 'lesquels'],
          ['阴性', 'laquelle', 'lesquelles'],
        ],
      },
      ex: [
        ["Voici la raison pour laquelle j'ai changé d'emploi.", '这就是我换工作的原因。'],
        ['Le bureau sur lequel je travaille est trop petit.', '我工作用的那张桌子太小了。'],
      ],
    },
    {
      h: 'à + lequel → auquel',
      p: '介词 *à* 和 *lequel / lesquels / lesquelles* 缩合：*auquel, auxquels, auxquelles*；阴性单数不缩合：*à laquelle*。用于 *penser à, participer à, s\'intéresser à, faire attention à* 等动词，或 *grâce à, face à* 等短语。',
      table: {
        head: ['', '单数', '复数'],
        rows: [
          ['阳性', 'auquel', 'auxquels'],
          ['阴性', 'à laquelle', 'auxquelles'],
        ],
      },
      ex: [
        ["C'est un concours auquel beaucoup d'étudiants participent.", '这是一个很多学生参加的比赛。'],
        ['Les questions auxquelles il faut répondre sont au verso.', '需要回答的问题在背面。'],
      ],
    },
    {
      h: 'de + lequel → duquel（用于复合介词）',
      p: '*de* 和 *lequel* 缩合为 *duquel, desquels, desquelles*（阴单 *de laquelle*）。但单纯的 *de* 一般用 *dont*；*duquel* 主要用在**以 de 结尾的复合介词**之后：*près de, à côté de, au milieu de, en face de, à cause de, au cours de*。',
      table: {
        head: ['', '单数', '复数'],
        rows: [
          ['阳性', 'duquel', 'desquels'],
          ['阴性', 'de laquelle', 'desquelles'],
        ],
      },
      ex: [
        ["Le parc près duquel j'habite est magnifique en automne.", '我家附近的那个公园秋天很美。'],
        ['La réunion au cours de laquelle on a pris cette décision a duré trois heures.', '作出这个决定的那次会议开了三个小时。'],
      ],
    },
    {
      h: '指人：介词 + qui',
      p: '先行词是**人**时，介词后通常用 *qui*：*la personne **avec qui** je travaille*，*l\'ami **à qui** j\'ai prêté ma voiture*。也可以用 *lequel*（*avec laquelle*），但 *qui* 更常见。先行词是**物**时，介词后**不能**用 *qui*，必须用 *lequel*。',
      ex: [
        ["La collègue avec qui je partage mon bureau vient de Sherbrooke.", '和我共用办公室的同事来自舍布鲁克。'],
        ["Le professeur à qui j'ai envoyé mon travail ne m'a pas encore répondu.", '我把作业发给他的那位老师还没回复我。'],
      ],
    },
    {
      h: 'dont 还是 duquel？',
      p: '动词或形容词直接接 *de*（*parler de, avoir besoin de*）时用 *dont*。如果 *de* 属于一个**复合介词**（*à côté de, près de, à cause de*），或者 *de* 前面有介词 + 名词（*le mur **au pied duquel**…*），就不能用 *dont*，要用 *duquel*。',
      table: {
        head: ['用 dont', '用 duquel / de laquelle'],
        rows: [
          ["le livre dont je parle", "le livre à côté duquel j'ai posé mes clés"],
          ["l'entreprise dont je suis responsable", "l'entreprise en face de laquelle j'habite"],
        ],
      },
      ex: [
        ["C'est l'accident à cause duquel la route a été fermée.", '就是这场事故导致道路被封闭。'],
      ],
    },
  ],
  tips: [
    '“……的原因”固定说 *la raison pour laquelle*，写作考试里非常有用；不要写 *la raison pourquoi*。',
    '指物时绝不能用 *avec qui / sur qui*：*la table sur laquelle*，不是 *la table sur qui*。',
    '*à laquelle* 和 *de laquelle* 不缩合，只有含 *le / les* 的形式才缩合（au-, aux-, du-, des-）。',
    '先看介词，再看先行词的性数，最后选形式：介词 + 阴单 → *laquelle*；à + 阳复 → *auxquels*。',
  ],
  drills: [
    { t: 'choice', s: "Voilà l'ordinateur avec ___ je fais mes devoirs.", o: ['lequel', 'laquelle', 'qui'], a: 0, why: '先行词 ordinateur 阳性单数，是物，介词后用 lequel。', zh: '这就是我写作业用的电脑。' },
    { t: 'choice', s: "C'est la raison pour ___ il a déménagé.", o: ['laquelle', 'lequel', 'quoi'], a: 0, why: 'raison 阴性单数 → laquelle。', zh: '这就是他搬家的原因。' },
    { t: 'fill', s: 'Les chaises sur [[lesquelles]] nous sommes assis sont neuves.', hint: 'chaises：阴性复数', zh: '我们坐的椅子是新的。', alt: [] },
    { t: 'choice', s: "Le projet ___ je pense depuis des mois va enfin commencer.", o: ['auquel', 'à lequel', 'dont'], a: 0, why: 'penser à + 阳性单数，à + lequel 缩合为 auquel。', zh: '我想了好几个月的项目终于要开始了。' },
    { t: 'choice', s: "La conférence ___ j'ai assisté était passionnante.", o: ['à laquelle', 'auquelle', 'dont'], a: 0, why: 'assister à + 阴性单数：à laquelle 不缩合。', zh: '我参加的那场讲座非常精彩。' },
    { t: 'fill', s: 'Les sujets [[auxquels]] je m\'intéresse sont surtout scientifiques.', hint: "s'intéresser à + sujets（阳复）", zh: '我感兴趣的主要是科学类话题。', alt: [] },
    { t: 'choice', s: "L'ami ___ j'ai prêté mon vélo ne me l'a pas rendu.", o: ['à qui', 'à lequel', 'dont'], a: 0, why: 'prêter à + 人 → à qui；à + lequel 必须缩合成 auquel，不能写 à lequel。', zh: '我借自行车给他的那个朋友还没还给我。' },
    { t: 'choice', s: "La boulangerie à côté ___ j'habite ouvre à six heures.", o: ['de laquelle', 'dont', 'duquel'], a: 0, why: '复合介词 à côté de + 阴性单数 → de laquelle，不能用 dont。', zh: '我家旁边的面包店六点开门。' },
    { t: 'fill', s: "Le lac au bord [[duquel]] nous avons pique-niqué est très propre.", hint: 'au bord de + lac（阳单）', zh: '我们在湖边野餐的那个湖很干净。', alt: [] },
    { t: 'choice', s: "Les personnes avec ___ je travaille sont très sympathiques.", o: ['qui', 'que', 'dont'], a: 0, why: '介词 avec + 人 → qui。', zh: '和我一起工作的人都很友好。' },
    { t: 'choice', s: "C'est un roman ___ tout le monde parle.", o: ['dont', 'duquel', 'auquel'], a: 0, why: 'parler de 直接接 de，用 dont。', zh: '这是一本大家都在谈论的小说。' },
    { t: 'choice', s: "Les difficultés ___ nous faisons face sont nombreuses.", o: ['auxquelles', 'auxquels', 'dont'], a: 0, why: 'faire face à + difficultés（阴复）→ auxquelles。', zh: '我们面临的困难很多。' },
    { t: 'transform', from: "J'ai écrit avec ce stylo. Ce stylo ne marche plus.", task: '用 介词 + lequel 合并成一句（以 Le stylo 开头）', to: ["Le stylo avec lequel j'ai écrit ne marche plus."], zh: '我用来写字的那支笔不能用了。' },
    { t: 'transform', from: "Je compte sur cette amie. Elle est toujours là pour moi.", task: '用 介词 + qui 合并成一句（以 L\'amie 开头）', to: ["L'amie sur qui je compte est toujours là pour moi.", "L'amie sur laquelle je compte est toujours là pour moi."], zh: '我依靠的那个朋友总是在我身边。' },
    { t: 'transform', from: "Il y a un grand arbre au milieu du jardin. Les enfants jouent autour de cet arbre.", task: '合并成一句（以 Il y a un grand arbre au milieu du jardin, 开头）', to: ['Il y a un grand arbre au milieu du jardin, autour duquel les enfants jouent.', 'Il y a un grand arbre au milieu du jardin, autour duquel jouent les enfants.'], zh: '花园中央有一棵大树，孩子们在树周围玩耍。' },
    { t: 'fill', s: "Les raisons pour [[lesquelles]] elle a refusé ce poste restent un mystère.", hint: 'raisons：阴性复数', zh: '她拒绝这个职位的原因仍然是个谜。', alt: [] },
  ],
};
