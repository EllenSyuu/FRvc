export default {
  id: 'y-en',
  n: 21,
  fr: 'Les pronoms y et en',
  zh: '代词 y 和 en',
  level: 'B1',
  summary: 'y 和 en 是中文里完全没有的“副代词”，但法语口语几乎每句都有：这一课教你什么时候用 y、什么时候用 en，以及常见固定表达。',
  explain: [
    {
      h: 'y 代替地点和 à + 东西',
      p: '*y* 代替 **à / en / dans / chez / sur + 地点**（“那里”）：*je vais à Québec → j\'y vais*。它也代替 **à + 东西或想法**（不是人）：*je pense à mon examen → j\'y pense*；*je m\'intéresse à la politique → je m\'y intéresse*。如果 à 后面是**人**，用 *lui / leur* 或 *à lui / à elle*：*je pense à ma mère → je pense à elle*。',
      ex: [
        ["Tu vas chez le dentiste demain ? Oui, j'y vais à dix heures.", '你明天去看牙医吗？去，我十点去。'],
        ["Tu as réfléchi à ma proposition ? Oui, j'y ai réfléchi.", '你考虑过我的提议了吗？考虑过了。'],
        ["Tu penses souvent à ton grand-père ? Oui, je pense souvent à lui.", '你常想念你爷爷吗？是的，我常想他。'],
      ],
    },
    {
      h: 'en 代替 de + 名词',
      p: '*en* 代替 **de / du / de la / des + 名词**：部分冠词和不定复数的宾语（*je bois du café → j\'en bois*），动词 + de 的结构（*parler de, avoir besoin de, s\'occuper de*：*j\'en ai besoin*），以及“从那里来”（*je reviens de Montréal → j\'en reviens*）。',
      ex: [
        ["Tu as besoin de mon ordinateur ? Non, je n'en ai pas besoin.", '你需要我的电脑吗？不，我不需要。'],
        ['Elle revient de la piscine ? Oui, elle en revient à l\'instant.', '她从游泳池回来了吗？是的，她刚回来。'],
      ],
    },
    {
      h: 'en 和数量：数字要保留',
      p: '用 *en* 代替带**数字或数量词**的名词时，数量要留在句末：*j\'ai trois enfants → j\'en ai trois*；*il a beaucoup de livres → il en a beaucoup*；*je voudrais un kilo de pommes → j\'en voudrais un kilo*。否定时数量“一个”消失：*tu as une voiture ? Non, je n\'en ai pas.*',
      table: {
        head: ['原句', '用 en'],
        rows: [
          ["J'ai deux sœurs.", "J'en ai deux."],
          ['Il mange beaucoup de fruits.', 'Il en mange beaucoup.'],
          ['Nous avons une voiture.', 'Nous en avons une.'],
          ["Je n'ai pas de voiture.", "Je n'en ai pas."],
        ],
      },
      ex: [
        ["Combien de cours as-tu ce trimestre ? J'en ai quatre.", '你这学期有几门课？我有四门。'],
      ],
    },
    {
      h: '位置和过去时',
      p: '*y* 和 *en* 的位置和其他宾语代词一样：在变位动词前，*ne … pas* 包住它们：*je n\'y vais pas*。动词 + 不定式时放在不定式前：*je vais y aller*。复合过去时放在助动词前，**过去分词不和 en 配合**：*des pommes ? j\'en ai acheté*。肯定命令式放后面：*vas-y !*，*prends-en !*（注意 *va, mange* 等加 s 以便连读）。',
      ex: [
        ["Des fraises ? J'en ai acheté au marché ce matin.", '草莓？我今天早上在市场买了。'],
        ["Le musée est ouvert ? Alors allons-y !", '博物馆开着？那我们走吧！'],
      ],
    },
    {
      h: '带 y 和 en 的固定表达',
      p: '有些表达里 *y / en* 已经不再指具体的东西，要整体记住：*il y a*（有），*ça y est*（好了/成了），*on y va*（走吧），*s\'en aller*（离开），*en avoir marre*（受够了，口语），*s\'en sortir*（应付过来），*ne pas en revenir*（不敢相信），*en vouloir à qqn*（怨恨某人），*je n\'y peux rien*（我无能为力）。',
      table: {
        head: ['表达', '意思'],
        rows: [
          ["s'en aller", '离开，走开'],
          ['en avoir marre (de)', '受够了（口语）'],
          ["s'en sortir", '应付过来，渡过难关'],
          ['en vouloir à qqn', '怨恨某人'],
          ['ça y est', '好了，搞定了'],
        ],
      },
      ex: [
        ["Il est tard, je m'en vais.", '很晚了，我走了。'],
        ["J'en ai marre de ce bruit !", '我受够这噪音了！'],
        ["Ne t'inquiète pas, tu vas t'en sortir.", '别担心，你能应付过去的。'],
      ],
    },
  ],
  tips: [
    '先问自己：前面是 *à* 还是 *de*？à + 地点/东西 → *y*；de + 东西 → *en*。再问：是不是人？是人就不用 y/en。',
    '*en* 后数字不要丢：“我有两个” 是 *j\'en ai deux*，只说 *j\'ai deux* 是错的。',
    '*y* 不能用在 *aller* 的简单将来时和条件式前：说 *j\'irai*，不说 *j\'y irai*（因为发音重复）。',
    '*s\'en aller* 的复合过去时：*je m\'en suis allé(e)*，en 留在助动词前。',
  ],
  drills: [
    { t: 'fill', s: "Tu vas à la bibliothèque ? Oui, j'[[y]] vais cet après-midi.", hint: 'à la bibliothèque', zh: '你去图书馆吗？去，我今天下午去。', alt: [] },
    { t: 'choice', s: "Du café ? Non merci, je n'___ bois jamais.", o: ['en', 'y', 'le'], a: 0, why: 'boire du café：de + 名词用 en。', zh: '咖啡？不用了谢谢，我从来不喝。' },
    { t: 'transform', from: 'Je pense à mon voyage.', task: '用代词替换 à mon voyage', to: ["J'y pense."], zh: '我在想我的旅行。' },
    { t: 'choice', s: "Tu as des enfants ? Oui, j'___ ai trois.", o: ['en', 'les', 'y'], a: 0, why: '数量 + 名词，用 en，数字保留在句末。', zh: '你有孩子吗？有，我有三个。' },
    { t: 'fill', s: "Ton passeport ? Tu [[en]] as besoin pour le voyage.", hint: 'avoir besoin de', zh: '你的护照？旅行时你需要它。', alt: [] },
    { t: 'choice', s: "Il habite à Gatineau depuis longtemps ? Oui, il ___ habite depuis dix ans.", o: ['y', 'en', 'le'], a: 0, why: 'à + 地点 → y。', zh: '他在加蒂诺住很久了吗？是的，住了十年了。' },
    { t: 'transform', from: "J'ai acheté deux baguettes.", task: '用 en 替换 baguettes', to: ["J'en ai acheté deux."], zh: '我买了两根长棍面包。' },
    { t: 'transform', from: "Je ne vais pas au gymnase ce soir.", task: '用代词替换 au gymnase', to: ["Je n'y vais pas ce soir."], zh: '我今晚不去健身房。' },
    { t: 'choice', s: "Tu penses encore à ton ex ? Non, je ne pense plus ___.", o: ['à lui', 'y', 'lui'], a: 0, why: 'penser à + 人不能用 y，也不能用 lui，要用 à + 重读人称代词。', zh: '你还想你前任吗？不，我不再想他了。' },
    { t: 'choice', s: "Tu t'intéresses à l'histoire du Québec ? Oui, je m'___ intéresse beaucoup.", o: ['y', 'en', 'lui'], a: 0, why: "s'intéresser à + 东西 → y。", zh: '你对魁北克历史感兴趣吗？是的，我很感兴趣。' },
    { t: 'fill', s: "Des pommes ? J'en ai [[mangé]] trois aujourd'hui.", hint: 'manger 的过去分词', zh: '苹果？我今天吃了三个。', alt: [] },
    { t: 'choice', s: "Le cours de yoga, tu veux ___ aller avec moi ?", o: ['y', 'en', 'le'], a: 0, why: 'aller + 地点 → y，放在不定式 aller 前。', zh: '瑜伽课，你想跟我一起去吗？' },
    { t: 'choice', s: "Il est déjà minuit, je m'___ vais.", o: ['en', 'y', 'le'], a: 0, why: "固定表达 s'en aller（离开）。", zh: '已经午夜了，我走了。' },
    { t: 'fill', s: "Encore des travaux dans la rue ! J'en ai [[marre]] !", hint: '“受够了”', zh: '街上又在施工！我受够了！', alt: [] },
    { t: 'transform', from: 'Elle parle souvent de son nouveau travail.', task: '用代词替换 de son nouveau travail', to: ['Elle en parle souvent.'], zh: '她经常谈起她的新工作。' },
    { t: 'choice', s: "Des légumes ? ___ ! C'est bon pour la santé.", o: ['Manges-en', 'Mange-en', 'Mange-les-en'], a: 0, why: '命令式 mange 在 en 前加 s 以便连读。', zh: '蔬菜？吃点吧！对健康有好处。' },
    { t: 'transform', from: "Tu ne t'occupes pas de ce dossier ?", task: '用代词替换 de ce dossier', to: ["Tu ne t'en occupes pas ?"], zh: '你不负责这份档案吗？' },
  ],
};
