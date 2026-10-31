export default {
  id: 'pronoms-cod-coi',
  n: 20,
  fr: 'Les pronoms COD et COI',
  zh: '直接宾语代词与间接宾语代词',
  level: 'B1',
  summary: '中文用“他/她/它”就够了，法语却要区分 le/la/les（直接宾语）和 lui/leur（间接宾语）：关键在于动词后面有没有 à。',
  explain: [
    {
      h: '两组代词',
      p: '**直接宾语（COD）**：动词后直接跟宾语，没有介词，用 *le, la, l\', les*。**间接宾语（COI）**：动词后有 *à + 人*，用 *lui*（他/她，阴阳同形）和 *leur*（他们/她们）。*me, te, nous, vous* 两种情况都一样。代词放在**变位动词前面**。',
      table: {
        head: ['人称', 'COD（无介词）', 'COI（à + 人）'],
        rows: [
          ['je', 'me / m\'', 'me / m\''],
          ['tu', 'te / t\'', 'te / t\''],
          ['il / elle', "le / la / l'", 'lui'],
          ['nous', 'nous', 'nous'],
          ['vous', 'vous', 'vous'],
          ['ils / elles', 'les', 'leur'],
        ],
      },
      ex: [
        ['Tu connais Julie ? Oui, je la connais bien.', '你认识朱莉吗？认识，我跟她很熟。'],
        ['Tu as écrit à Julie ? Oui, je lui ai écrit hier.', '你给朱莉写信了吗？写了，我昨天给她写的。'],
      ],
    },
    {
      h: '关键：动词怎么接宾语',
      p: '中文和英语的直觉常常靠不住，要按法语动词本身来记。直接接宾语的：*aider, appeler, attendre, écouter, regarder, chercher, remercier, inviter, rencontrer*。接 *à + 人* 的：*parler à, téléphoner à, répondre à, écrire à, demander à, dire à, donner à, envoyer à, conseiller à, ressembler à, plaire à, sourire à*。',
      table: {
        head: ['直接（le/la/les）', '间接（lui/leur）'],
        rows: [
          ['aider qqn → je l\'aide', 'téléphoner à qqn → je lui téléphone'],
          ['appeler qqn → je l\'appelle', 'parler à qqn → je lui parle'],
          ['attendre qqn → je les attends', 'répondre à qqn → je leur réponds'],
          ['écouter qqn → je l\'écoute', 'demander à qqn → je lui demande'],
        ],
      },
      ex: [
        ["J'appelle ma mère tous les soirs : je lui raconte ma journée.", '我每晚给妈妈打电话：跟她讲我这一天。'],
        ['Les clients attendent depuis une heure ; il faut leur répondre vite.', '客户们已经等了一个小时；得赶快回复他们。'],
      ],
    },
    {
      h: '代词的位置',
      p: '简单时态：代词在变位动词前，否定时被 *ne … pas* 包住：*je ne le vois pas*。复合过去时：代词在助动词前：*je l\'ai vu*，*je ne l\'ai pas vu*。动词 + 不定式：代词放在**不定式**前：*je vais le faire*，*je peux lui parler*。肯定命令式：代词放后面并加连字符，*me/te* 变 *moi/toi*：*aide-moi*，*appelle-le*；否定命令式恢复原位：*ne l\'appelle pas*。',
      ex: [
        ["Ce film ? Je ne l'ai pas encore vu, mais je vais le voir ce week-end.", '那部电影？我还没看，但这个周末要去看。'],
        ['Ton frère a besoin d\'aide : appelle-le et explique-lui la situation.', '你哥哥需要帮忙：给他打电话，跟他解释一下情况。'],
      ],
    },
    {
      h: '过去分词与前置直接宾语配合',
      p: '用 *avoir* 的复合时态中，过去分词一般不变。但如果**直接宾语（COD）放在动词前面**，过去分词要和它的性数配合：*la lettre → je l\'ai écrit**e***，*les clés → je les ai trouvé**es***。**间接宾语 lui/leur 不引起配合**：*je leur ai parlé*（不加 s）。',
      ex: [
        ["Où sont mes clés ? Je les ai cherchées partout !", '我的钥匙在哪？我到处都找过了！'],
        ['Mes voisines ? Je leur ai parlé ce matin.', '我的邻居们？我今天早上跟她们说过话了。'],
        ['Cette émission, je l\'ai regardée avec mes enfants.', '这个节目我是和孩子们一起看的。'],
      ],
    },
  ],
  tips: [
    '*lui* 既可以是“他”也可以是“她”：*je lui parle* 可能指 Paul，也可能指 Marie。不要因为对象是女性就说 *je la parle*。',
    '*leur* 作代词永远不加 s：*je leur donne*，不是 *je leurs donne*（*leurs* 是物主形容词“他们的”）。',
    '*aider, remercier, appeler* 在中文直觉里像“给某人帮助/道谢/打电话”，但法语是直接宾语：*je l\'aide*，不说 *je lui aide*。',
    '口试中过去分词配合常听不出来（*cherchées* 和 *cherché* 发音一样），但写作中会被扣分；*prise, faite, écrite, mise* 的配合则听得出来。',
  ],
  drills: [
    { t: 'choice', s: 'Tu vois Marc demain ? Oui, je ___ vois au travail.', o: ['le', 'lui', 'la'], a: 0, why: 'voir qqn 是直接宾语，Marc 阳性单数 → le。', zh: '你明天见马克吗？见，我在单位见他。' },
    { t: 'choice', s: 'Tu parles à ta directrice ? Oui, je ___ parle cet après-midi.', o: ['lui', 'la', 'leur'], a: 0, why: 'parler à qqn 是间接宾语，单数 → lui（阴阳同形）。', zh: '你跟你的主管谈吗？谈，我今天下午跟她谈。' },
    { t: 'fill', s: "Mes parents ? Je [[leur]] téléphone chaque dimanche.", hint: 'téléphoner à + 复数', zh: '我父母？我每个星期天给他们打电话。', alt: [] },
    { t: 'choice', s: "Ma grand-mère est malade, alors je ___ aide à faire les courses.", o: ["l'", 'lui', 'la'], a: 0, why: 'aider qqn 是直接宾语，元音前 la → l\'。', zh: '我奶奶病了，所以我帮她买东西。' },
    { t: 'fill', s: 'Les étudiants posent des questions et le professeur [[leur]] répond.', hint: 'répondre à + 复数', zh: '学生们提问，老师回答他们。', alt: [] },
    { t: 'choice', s: "Ces chaussures ? Je ___ ai achetées en solde.", o: ['les', 'leur', 'la'], a: 0, why: 'acheter qqch 直接宾语，复数 → les；过去分词 achetées 也给出了提示。', zh: '这双鞋？我是打折时买的。' },
    { t: 'transform', from: "J'invite Sophie et Karim à ma fête.", task: '用代词替换 Sophie et Karim', to: ["Je les invite à ma fête."], zh: '我邀请他们来我的聚会。' },
    { t: 'transform', from: 'Je vais écrire à mon propriétaire.', task: '用代词替换 à mon propriétaire', to: ['Je vais lui écrire.'], zh: '我要给我的房东写信。' },
    { t: 'transform', from: "Je n'ai pas compris la consigne.", task: '用代词替换 la consigne', to: ["Je ne l'ai pas comprise."], zh: '我没听懂这个指示。' },
    { t: 'fill', s: "La lettre de motivation ? Je l'ai [[écrite]] hier soir.", hint: 'écrire 的过去分词，注意配合', zh: '求职信？我昨晚写好了。', alt: [] },
    { t: 'choice', s: "Mes collègues ? Je leur ai ___ de la réunion.", o: ['parlé', 'parlés', 'parlées'], a: 0, why: 'leur 是间接宾语，不引起过去分词配合。', zh: '我的同事们？我跟他们说了会议的事。' },
    { t: 'fill', s: "Les photos de vacances, tu les as [[mises]] sur ton ordinateur ?", hint: 'mettre 的过去分词，les = les photos', zh: '度假的照片，你存到电脑上了吗？', alt: [] },
    { t: 'choice', s: "Tu as un problème ? Appelle-___ ce soir !", o: ['moi', 'me', 'm\''], a: 0, why: '肯定命令式中 me 放在动词后变成 moi。', zh: '你有问题吗？今晚给我打电话！' },
    { t: 'transform', from: 'Ne téléphone pas à ton patron maintenant.', task: '用代词替换 à ton patron', to: ['Ne lui téléphone pas maintenant.'], zh: '现在别给你老板打电话。' },
    { t: 'choice', s: "Cette robe ___ plaît beaucoup, à ma fille.", o: ['lui', 'la', 'le'], a: 0, why: 'plaire à qqn 是间接宾语 → lui。', zh: '我女儿很喜欢这条裙子。' },
    { t: 'transform', from: "J'ai remercié mes voisines pour leur aide.", task: '用代词替换 mes voisines', to: ["Je les ai remerciées pour leur aide."], zh: '我感谢了邻居们的帮助。' },
  ],
};
