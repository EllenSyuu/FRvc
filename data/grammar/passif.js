export default {
  id: 'passif',
  n: 14,
  fr: 'La voix passive',
  zh: '被动语态',
  level: 'B2',
  summary: '学会被动语态的构成与配合、par 和 de 的选择，以及法语中更常用的替代说法 on 和 se faire。',
  explain: [
    {
      h: '构成：être + 过去分词',
      p: '被动语态 = ***être*** 的相应时态 + **过去分词**。时态由 *être* 体现：现在时 *est construit*，复合过去时 *a été construit*，将来时 *sera construit*。过去分词**一定要与主语性数配合**。只有**直接及物动词**（有直接宾语）才能变被动。',
      ex: [
        ['Le pont est réparé chaque été.', '这座桥每年夏天都会维修。'],
        ['Cette école a été construite en 1950.', '这所学校建于 1950 年。'],
        ['Les résultats seront publiés lundi.', '结果将于周一公布。'],
      ],
      table: {
        head: ['时态', '主动', '被动'],
        rows: [
          ['présent', 'on corrige les copies', 'les copies sont corrigées'],
          ['passé composé', 'on a corrigé les copies', 'les copies ont été corrigées'],
          ['imparfait', 'on corrigeait les copies', 'les copies étaient corrigées'],
          ['futur', 'on corrigera les copies', 'les copies seront corrigées'],
        ],
      },
    },
    {
      h: '施动者：par 还是 de',
      p: '动作的执行者一般用 ***par*** 引出。表示**状态、情感或描述**的动词（*aimer, respecter, connaître, entourer, couvrir, remplir, accompagner*）常用 ***de***。施动者不重要或不清楚时可以省略。',
      ex: [
        ['Le contrat a été signé par la directrice.', '合同由女主任签署了。'],
        ['Cette chanteuse est aimée de tous.', '这位女歌手受到大家的喜爱。'],
        ["La montagne est couverte de neige.", '山上覆盖着白雪。'],
      ],
    },
    {
      h: '替代说法一：用 on',
      p: '法语口语中被动语态比中文、英文少用。施动者不明确时，常用**主动句 + *on***：*On a volé mon vélo* 比 *Mon vélo a été volé* 更自然。',
      ex: [
        ['On parle français au Québec.', '魁北克说法语。'],
        ["On m'a offert un poste à Laval.", '有人给我提供了一个在拉瓦勒的职位。'],
      ],
    },
    {
      h: '替代说法二：se faire + 不定式，以及代词式被动',
      p: '*se faire* + 不定式强调主语**遭受**某事（常为不好的事）或让别人为自己做事：*il s\'est fait voler son portefeuille*。另外，代词式动词也可以表达被动含义，常用于一般性规则：*ce plat se mange froid*（这道菜冷着吃）。',
      ex: [
        ["Il s'est fait renverser par une voiture.", '他被一辆车撞倒了。'],
        ['Elle se fait couper les cheveux tous les mois.', '她每个月都去剪头发。'],
        ['Ce vin se boit frais.', '这种葡萄酒要冰着喝。'],
      ],
    },
    {
      h: '间接及物动词不能变被动',
      p: '*téléphoner à*, *répondre à*, *obéir à*, *demander à qqn* 等动词没有直接宾语，"人"不能作被动句主语。中文说"我被告知""他被要求"，法语要用 ***on*** ：*On m\'a dit que…*，*On lui a demandé de…*',
      ex: [["On m'a demandé de remplir un formulaire.", '有人要求我填一张表。']],
    },
  ],
  tips: [
    '过去分词必须配合：*la lettre a été envoyée*，*les clés ont été trouvées*。',
    '"我被告知……"不能说 *j\'ai été dit*，要说 *on m\'a dit*；"他被要求……"→ *on lui a demandé de…*。',
    '被动的复合过去时是 *a été* + 分词，不是 *est été*。',
    '口语和 TEF/TCF 口试中多用 *on*，书面报告类写作可以适量使用被动语态。',
  ],
  drills: [
    { t: 'fill', s: 'Les fenêtres sont [[nettoyées]] chaque semaine.', hint: 'nettoyer', zh: '窗户每周都会擦洗。', alt: [] },
    { t: 'fill', s: 'Ce musée a été [[ouvert]] en 1990.', hint: 'ouvrir', zh: '这座博物馆于 1990 年开放。', alt: [] },
    { t: 'choice', s: 'La réunion ___ reportée à jeudi.', o: ['a été', 'est été', 'a'], a: 0, why: '被动语态的复合过去时：avoir 的现在时 + été + 过去分词。', zh: '会议推迟到了周四。' },
    { t: 'choice', s: 'Les invitations ont été ___ hier.', o: ['envoyé', 'envoyés', 'envoyées'], a: 2, why: '被动句中过去分词与主语 les invitations（阴性复数）配合。', zh: '请柬昨天已经发出去了。' },
    { t: 'fill', s: 'Les nouveaux logements seront [[livrés]] en mars.', hint: 'livrer', zh: '新住房将于三月交付。', alt: [] },
    { t: 'choice', s: 'Le contrat a été rédigé ___ un avocat.', o: ['par', 'de', 'à'], a: 0, why: 'rédiger 是具体动作，执行者用 par 引出。', zh: '合同是由一位律师起草的。' },
    { t: 'choice', s: 'La table était couverte ___ papiers.', o: ['de', 'avec', 'des'], a: 0, why: 'couvert de 表示状态；de + des 合并为 de。', zh: '桌上堆满了纸。' },
    { t: 'transform', from: 'Le maire a inauguré la bibliothèque.', task: '改为被动语态', to: ['La bibliothèque a été inaugurée par le maire.'], zh: '图书馆由市长揭幕。' },
    { t: 'transform', from: 'Les pompiers éteindront le feu.', task: '改为被动语态', to: ['Le feu sera éteint par les pompiers.'], zh: '大火将被消防员扑灭。' },
    { t: 'transform', from: 'Ma voiture a été réparée.', task: '用 on 改写成主动句', to: ['On a réparé ma voiture.'], zh: '我的车修好了。' },
    { t: 'choice', s: "___ de revenir demain.", o: ["On m'a dit", "J'ai été dit", "J'ai été dite"], a: 0, why: "dire à qqn 是间接及物，人不能作被动句主语，应用 on m'a dit。", zh: '有人让我明天再来。' },
    { t: 'fill', s: "Elle s'est fait [[voler]] son sac dans le métro.", hint: 'voler', zh: '她在地铁里被偷了包。', alt: [] },
    { t: 'choice', s: 'Ce gâteau ___ avec de la crème.', o: ['se mange', 'est mangeant', 'se fait manger'], a: 0, why: '代词式被动用于表示一般做法：se mange = 通常是这样吃的。', zh: '这种蛋糕配奶油吃。' },
    { t: 'transform', from: 'On a refusé sa demande de visa.', task: '改为被动语态', to: ['Sa demande de visa a été refusée.'], zh: '他的签证申请被拒了。' },
    { t: 'choice', s: 'Les candidats ___ par un jury de trois personnes.', o: ['seront évalués', 'seront évalué', 'vont évaluer'], a: 0, why: '将来时被动：seront + 过去分词，与 les candidats 阳性复数配合。', zh: '考生将由三人评审团评估。' },
    { t: 'fill', s: "Les deux blessées ont été [[transportées]] à l'hôpital.", hint: 'transporter', zh: '两名女伤者被送往医院。', alt: [] },
  ],
};
