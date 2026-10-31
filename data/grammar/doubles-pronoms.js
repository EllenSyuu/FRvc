export default {
  id: 'doubles-pronoms',
  n: 22,
  fr: 'Les doubles pronoms',
  zh: '双宾语代词的顺序',
  level: 'B2',
  summary: '一个动词前出现两个代词时（*je le lui donne*），顺序是固定的：这一课给你一张顺序表，并讲清楚否定句和命令式里的变化。',
  explain: [
    {
      h: '顺序表',
      p: '陈述句、疑问句和否定命令式中，两个代词按下面五列的顺序排列，**从左到右**。同一列的两个代词不能同时出现。*me / te / nous / vous* 和 *lui / leur* 不能一起出现（这时改用 *à moi, à lui* 等）。',
      table: {
        head: ['1', '2', '3', '4', '5'],
        rows: [
          ['me / te / se / nous / vous', 'le / la / les', 'lui / leur', 'y', 'en'],
        ],
      },
      ex: [
        ['Ton vélo ? Je te le prête volontiers.', '你的自行车？我很乐意借给你。（te 在 le 前）'],
        ["Le rapport ? Je le lui envoie tout de suite.", '报告？我马上发给他。（le 在 lui 前）'],
        ["Des conseils ? Elle nous en donne souvent.", '建议？她常给我们一些。（nous 在 en 前）'],
      ],
    },
    {
      h: '记忆诀窍',
      p: '第 1 列和第 2 列：**人在前、物在后**（*il me le dit*）。第 2 列和第 3 列：**物在前、人在后**（*il le lui dit*），因为第三人称的人比物“更远”。*y* 和 *en* 永远在最后，*en* 是最后一个：*il y en a*（有一些）。',
      ex: [
        ["Il y a encore du gâteau ? Oui, il y en a.", '还有蛋糕吗？有，还有一些。'],
        ["Je vous les apporte demain matin.", '我明天早上给您带过来。'],
      ],
    },
    {
      h: '否定句和复合时态',
      p: '两个代词作为一个整体放在变位动词（复合时态中是助动词）前，*ne* 放在整组代词前，*pas* 在动词或助动词后：*je ne le lui ai pas dit*。如果 COD 在前，过去分词照样配合：*la clé ? je la lui ai rendue*。动词 + 不定式时，整组代词放在不定式前：*je vais le leur expliquer*。',
      ex: [
        ["La vérité ? Je ne la lui ai jamais dite.", '真相？我从来没告诉过他。'],
        ['Ces documents, je vais vous les envoyer par courriel.', '这些文件我会通过电子邮件发给您。'],
      ],
    },
    {
      h: '肯定命令式',
      p: '肯定命令式中代词放在动词后，用连字符连接，顺序变成：**COD 在前，COI 在后**：*donne-le-moi*，*envoie-la-leur*。*me / te* 在最后变成 *moi / toi*，但在 *en* 前变成 *m\' / t\'*：*donne-m\'en*。*y / en* 仍然在最后。否定命令式则恢复正常顺序：*ne me le donne pas*。',
      table: {
        head: ['肯定命令式', '否定命令式'],
        rows: [
          ['Donne-le-moi.', 'Ne me le donne pas.'],
          ['Envoie-la-leur.', 'Ne la leur envoie pas.'],
          ["Donne-m'en.", "Ne m'en donne pas."],
          ['Expliquez-le-nous.', 'Ne nous l\'expliquez pas.'],
        ],
      },
      ex: [
        ['Tu as fini le livre ? Alors prête-le-moi !', '你看完那本书了？那借给我吧！'],
        ["Il reste du café ? Sers-m'en une tasse, s'il te plaît.", '还有咖啡吗？请给我倒一杯。'],
      ],
    },
  ],
  tips: [
    '*le / la / les* 和 *lui / leur* 同时出现时，中文母语者容易按“给他它”的语序说 *je lui le donne*，正确的是 *je le lui donne*。',
    '*lui* 和 *y* 一般不一起用：说 *je l\'y ai rencontré*（我在那里遇见了他）没问题，但 *lui y* 几乎不用。',
    '口语中 *je le lui* 常被压缩成 /ʒəlɥi/，听力里要能识别 *je l\'lui ai dit*。',
    '命令式的连字符不能少：*donne-le-moi* 有两个连字符，*vas-y* 有一个。',
  ],
  drills: [
    { t: 'choice', s: 'Ta clé ? Je ___ rends ce soir.', o: ['te la', 'la te', 'te lui'], a: 0, why: '第 1 列 te 在第 2 列 la 之前。', zh: '你的钥匙？我今晚还给你。' },
    { t: 'choice', s: "Le dossier ? Je ___ ai envoyé hier.", o: ['le lui', 'lui le', 'lui l\''], a: 0, why: '第 2 列 le 在第 3 列 lui 之前：je le lui ai envoyé。', zh: '那份档案？我昨天发给他了。' },
    { t: 'fill', s: "Des billets pour le concert ? Je vous [[en]] apporte deux.", hint: '代替 des billets', zh: '音乐会门票？我给您带两张来。', alt: [] },
    { t: 'choice', s: "Est-ce qu'il y a des places libres ? Oui, il ___ a encore trois.", o: ['y en', 'en y', 'les y'], a: 0, why: 'y 在 en 前：il y en a。', zh: '还有空位吗？有，还有三个。' },
    { t: 'transform', from: 'Je donne le cadeau à ma sœur.', task: '用两个代词替换 le cadeau 和 à ma sœur', to: ['Je le lui donne.'], zh: '我把礼物给我姐姐。' },
    { t: 'transform', from: 'Il montre ses photos à ses amis.', task: '用两个代词替换 ses photos 和 à ses amis', to: ['Il les leur montre.'], zh: '他给朋友们看他的照片。' },
    { t: 'transform', from: 'Elle nous a expliqué la règle.', task: '用代词替换 la règle', to: ["Elle nous l'a expliquée."], zh: '她给我们解释了这条规则。' },
    { t: 'choice', s: 'La réponse ? Je ne ___ ai pas encore donnée.', o: ['la leur', 'leur la', 'les leur'], a: 0, why: '第 2 列 la 在第 3 列 leur 之前；donnée 阴性单数说明 COD 是 la。', zh: '答案？我还没告诉他们。' },
    { t: 'fill', s: "Mon stylo ? Je ne te [[le]] prête pas, j'en ai besoin.", hint: '代替 mon stylo', zh: '我的笔？我不借给你，我需要用。', alt: [] },
    { t: 'choice', s: "Tu as mon chargeur ? Rends-___, s'il te plaît.", o: ['le-moi', 'moi-le', 'me-le'], a: 0, why: '肯定命令式：COD 在前，moi 在后。', zh: '你拿着我的充电器？请还给我。' },
    { t: 'choice', s: "Ne ___ dis pas, c'est une surprise !", o: ['le lui', 'lui le', 'le-lui'], a: 0, why: '否定命令式恢复陈述句顺序，没有连字符。', zh: '别告诉他，这是个惊喜！' },
    { t: 'transform', from: 'Envoie les photos à tes parents.', task: '用两个代词替换（肯定命令式）', to: ['Envoie-les-leur.'], zh: '把照片发给你父母。' },
    { t: 'transform', from: 'Donne-moi de la soupe.', task: '用 en 替换 de la soupe', to: ["Donne-m'en."], zh: '给我一些汤。' },
    { t: 'choice', s: 'Ces informations, je vais ___ transmettre demain.', o: ['vous les', 'les vous', 'vous leur'], a: 0, why: '代词组放在不定式前，第 1 列 vous 在第 2 列 les 前。', zh: '这些信息我明天转达给您。' },
    { t: 'fill', s: "La voiture ? Mon père me l'a [[prêtée]] pour la fin de semaine.", hint: 'prêter 的过去分词，注意配合', zh: '车？我爸爸借给我周末用。（fin de semaine 是魁北克说法）', alt: [] },
    { t: 'transform', from: "Je n'ai pas parlé de ce problème à mon chef.", task: '用两个代词替换 de ce problème 和 à mon chef', to: ["Je ne lui en ai pas parlé."], zh: '我没跟我的上司说起这个问题。' },
  ],
};
