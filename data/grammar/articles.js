export default {
  id: 'articles',
  n: 18,
  fr: 'Les articles',
  zh: '冠词：定冠词、不定冠词、部分冠词',
  level: 'A2',
  summary: '中文名词前不需要冠词，法语几乎每个名词前都要有一个：这一课教你在 le/la/les、un/une/des、du/de la 和 de 之间做出正确选择。',
  explain: [
    {
      h: '三类冠词一览',
      p: '**定冠词** *le, la, l\', les* 指已知的、特定的或泛指一类的东西；**不定冠词** *un, une, des* 引出可数的、第一次提到的东西；**部分冠词** *du, de la, de l\'* 表示不可数的“一些”（食物、饮料、抽象概念）。元音或哑音 h 前 *le / la* 变成 *l\'*，*du / de la* 变成 *de l\'*。',
      table: {
        head: ['', '阳性', '阴性', '元音前', '复数'],
        rows: [
          ['定冠词', 'le', 'la', "l'", 'les'],
          ['不定冠词', 'un', 'une', 'un / une', 'des'],
          ['部分冠词', 'du', 'de la', "de l'", 'des'],
        ],
      },
      ex: [
        ["J'ai acheté un livre. Le livre est sur la table.", '我买了一本书。那本书在桌子上。'],
        ["Le matin, je bois du thé et de l'eau.", '早上我喝茶和水。'],
      ],
    },
    {
      h: '喜好动词用定冠词，吃喝用部分冠词',
      p: '*aimer, adorer, préférer, détester* 表达对一整类事物的态度，后面用**定冠词**：*j\'aime le café*。而 *manger, boire, prendre, acheter* 表示吃/喝/买“一些”，用**部分冠词**或**不定冠词**：*je bois du café*。这是中国学生最常混淆的一对。',
      ex: [
        ["J'adore le fromage, alors j'en achète souvent.", '我超爱奶酪，所以经常买。'],
        ['Ce soir, nous mangeons du poisson avec des légumes.', '今晚我们吃鱼配蔬菜。'],
      ],
    },
    {
      h: '否定和数量词后变成 de / d\'',
      p: '在否定句里，**不定冠词和部分冠词**（*un, une, des, du, de la*）变成 *de*（元音前 *d\'*）：*je n\'ai pas **de** voiture*。但定冠词不变：*je n\'aime pas **le** café*。同样，数量表达 *beaucoup de, peu de, assez de, trop de, un kilo de, une bouteille de* 后面也只用 *de*。注意 *être* 的否定不变：*ce n\'est pas un problème*。',
      table: {
        head: ['肯定', '否定 / 数量'],
        rows: [
          ["J'ai une voiture.", "Je n'ai pas de voiture."],
          ['Il boit du lait.', "Il ne boit pas de lait."],
          ['Elle a des amis.', "Elle a beaucoup d'amis."],
          ["J'aime le thé.", "Je n'aime pas le thé.（定冠词不变）"],
        ],
      },
      ex: [
        ["Désolé, il n'y a plus de pain à la boulangerie.", '抱歉，面包店已经没有面包了。'],
        ["Pour ce gâteau, il faut un kilo de farine et peu d'œufs.", '做这个蛋糕需要一公斤面粉，鸡蛋不用多少。'],
      ],
    },
    {
      h: '国家、星期、身体部位',
      p: '**国家**名前用定冠词：*le Canada, la France, les États-Unis*（以 -e 结尾的多为阴性，*le Mexique* 是例外）。**星期**：*lundi* 表示“（这个）星期一”，*le lundi* 表示“每个星期一”。**身体部位**通常用定冠词而不是物主形容词，因为反身动词或间接代词已经说明是谁的：*il s\'est cassé **le** bras*，*j\'ai mal à **la** tête*。',
      ex: [
        ['Le Canada est un grand pays, et la France est plus petite.', '加拿大是个大国，法国要小一些。'],
        ['Le samedi, je fais du sport ; mais samedi prochain, je travaille.', '每周六我做运动；但下周六我要上班。'],
        ["Elle s'est lavé les mains avant de manger.", '她吃饭前洗了手。'],
      ],
    },
  ],
  tips: [
    '中文说“我喝咖啡”不需要任何量词，法语一定要选：喝的是 *du café*，喜欢的是 *le café*。',
    '否定后用 *de* 只适用于 un/une/des/du/de la；*le/la/les* 在否定句中保持不变。',
    '*des* + 前置形容词时书面语常变成 *de*：*de bons amis*。',
    '说身体部位疼痛用 *avoir mal à + 定冠词*：*j\'ai mal au dos*（à + le = au），不要说 *mon dos*。',
  ],
  drills: [
    { t: 'choice', s: "J'aime beaucoup ___ chocolat noir.", o: ['le', 'du', 'de'], a: 0, why: 'aimer 表达喜好，后接定冠词。', zh: '我很喜欢黑巧克力。' },
    { t: 'choice', s: 'Au petit-déjeuner, je mange ___ pain avec du beurre.', o: ['du', 'le', 'de'], a: 0, why: '吃“一些”面包，pain 不可数，用部分冠词 du。', zh: '早餐我吃面包抹黄油。' },
    { t: 'fill', s: "Tu veux [[de l']]eau ou du jus ?", hint: '部分冠词，元音前', zh: '你要水还是果汁？', alt: [] },
    { t: 'fill', s: 'Ma sœur habite [[au]] Japon depuis trois ans.', hint: 'à + le', zh: '我姐姐住在日本三年了。', alt: [] },
    { t: 'choice', s: "Je n'ai pas ___ frères, mais j'ai deux sœurs.", o: ['de', 'des', 'les'], a: 0, why: '否定句中 des 变成 de。', zh: '我没有兄弟，但有两个姐妹。' },
    { t: 'choice', s: "Il ne mange jamais ___ viande : il est végétarien.", o: ['de', 'de la', 'la'], a: 0, why: 'ne … jamais 也是否定，de la 变成 de。', zh: '他从不吃肉：他是素食者。' },
    { t: 'choice', s: "Je n'aime pas ___ hiver à Montréal, il fait trop froid.", o: ["l'", "d'", 'de'], a: 0, why: '定冠词在否定句中不变：aimer + l\'hiver。', zh: '我不喜欢蒙特利尔的冬天，太冷了。' },
    { t: 'fill', s: "Elle a beaucoup [[d']]amis au cégep.", hint: 'beaucoup + ?', zh: '她在 cégep（魁省大学预科）有很多朋友。', alt: [] },
    { t: 'transform', from: "J'achète du lait.", task: '改成否定句（ne … pas）', to: ["Je n'achète pas de lait."], zh: '我不买牛奶。' },
    { t: 'transform', from: 'Nous avons des questions.', task: '改成否定句（ne … pas）', to: ["Nous n'avons pas de questions."], zh: '我们没有问题。' },
    { t: 'choice', s: "Ce n'est pas ___ bonne idée.", o: ['une', 'de', "d'"], a: 0, why: 'être 的否定句冠词不变：c\'est une idée → ce n\'est pas une idée。', zh: '这不是个好主意。' },
    { t: 'choice', s: "___ dimanche, la bibliothèque est fermée.", o: ['Le', 'Un', 'Du'], a: 0, why: '“每个星期天”用 le dimanche。', zh: '每周日图书馆都关门。' },
    { t: 'fill', s: "Après le match, j'avais mal [[aux]] jambes.", hint: 'à + les', zh: '比赛后我腿疼。', alt: [] },
    { t: 'choice', s: 'Il lève ___ main pour poser une question.', o: ['la', 'sa', 'une'], a: 0, why: '身体部位作动作对象时通常用定冠词，主语已经说明是谁的手。', zh: '他举手提问。' },
    { t: 'fill', s: "Pour la recette, il faut une bouteille [[de]] lait et deux cents grammes de sucre.", hint: '容器 + ?', zh: '这道菜需要一瓶牛奶和两百克糖。', alt: [] },
    { t: 'choice', s: "Les États-Unis et ___ Mexique sont voisins du Canada.", o: ['le', 'la', 'les'], a: 0, why: 'le Mexique 是阳性，以 -e 结尾却是例外。', zh: '美国和墨西哥是加拿大的邻国。' },
    { t: 'transform', from: "Il y a de la neige ce matin.", task: '改成否定句（il n\'y a pas …）', to: ["Il n'y a pas de neige ce matin."], zh: '今天早上没有雪。' },
  ],
};
