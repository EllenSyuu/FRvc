export default {
  id: 'imperatif',
  n: 16,
  fr: "L'impératif",
  zh: '命令式',
  level: 'A2',
  summary: '学会命令式的构成、几个不规则形式，以及代词在肯定和否定命令式中的位置。',
  explain: [
    {
      h: '构成：现在时去掉主语',
      p: '命令式只有三个人称：*tu*、*nous*、*vous*。取直陈式现在时的形式，去掉主语即可。注意：**-er 动词**（以及 *aller*、*ouvrir*、*offrir* 等）在 *tu* 形式中**去掉词尾 -s**：*tu parles* → *parle*，*tu vas* → *va*。',
      table: {
        head: ['动词', 'tu', 'nous', 'vous'],
        rows: [
          ['parler', 'parle', 'parlons', 'parlez'],
          ['finir', 'finis', 'finissons', 'finissez'],
          ['prendre', 'prends', 'prenons', 'prenez'],
          ['aller', 'va', 'allons', 'allez'],
          ['ouvrir', 'ouvre', 'ouvrons', 'ouvrez'],
        ],
      },
      ex: [
        ["Parle plus fort, s'il te plaît.", '请大声一点说。'],
        ['Prenez la deuxième rue à gauche.', '在第二条街左转。'],
        ['Allons au marché ensemble.', '我们一起去市场吧。'],
      ],
    },
    {
      h: '不规则命令式',
      p: '四个动词的命令式来自虚拟式：*être*、*avoir*、*savoir*、*vouloir*。',
      table: {
        head: ['动词', 'tu', 'nous', 'vous'],
        rows: [
          ['être', 'sois', 'soyons', 'soyez'],
          ['avoir', 'aie', 'ayons', 'ayez'],
          ['savoir', 'sache', 'sachons', 'sachez'],
          ['vouloir', 'veuille', 'veuillons', 'veuillez'],
        ],
      },
      ex: [
        ['Sois prudent sur la route.', '路上小心。'],
        ["N'ayez pas peur.", '别害怕。'],
        ['Veuillez patienter quelques minutes.', '请稍等几分钟。'],
      ],
    },
    {
      h: '-s 回来了：va-y, donnes-en',
      p: '去掉 -s 的 *tu* 形式，后面紧跟 ***y*** 或 ***en*** 时要把 **-s 加回来**，以便连读：*va* → *vas-y*，*achète* → *achètes-en*。',
      ex: [
        ['Vas-y, tu vas réussir !', '去吧，你会成功的！'],
        ['Il reste du pain ? Achètes-en, alors.', '还有面包吗？那就买一点吧。'],
      ],
    },
    {
      h: '肯定命令式中的代词：放在动词后面，用连字符',
      p: '肯定命令式里，宾语代词放在**动词后面**，用连字符连接。*me* 和 *te* 变成 ***moi*** 和 ***toi***。两个代词时顺序是：**直接宾语（le, la, les）在前，间接宾语在后**，*y*、*en* 最后。',
      ex: [
        ['Donne-le-moi.', '把它给我。'],
        ['Envoyez-nous le document.', '把文件发给我们。'],
        ['Assieds-toi ici.', '坐这里吧。'],
        ['Expliquez-la-leur.', '把它解释给他们听。'],
      ],
      table: {
        head: ['肯定命令式顺序', '例子'],
        rows: [
          ['动词 - le/la/les - moi/toi/lui/nous/vous/leur', 'donne-le-moi'],
          ['动词 - moi/lui… - en', 'donne-m\'en'],
          ['动词 - y', 'vas-y'],
        ],
      },
    },
    {
      h: '否定命令式：代词回到动词前面',
      p: '否定命令式里，代词回到**动词前面**，顺序和陈述句一样（*me/te/nous/vous* 在 *le/la/les* 前，*le/la/les* 在 *lui/leur* 前），不用连字符，*moi/toi* 变回 *me/te*。',
      ex: [
        ['Ne me le donne pas.', '别把它给我。'],
        ["Ne t'inquiète pas.", '别担心。'],
        ['Ne leur en parlez pas.', '别跟他们说这件事。'],
      ],
      table: {
        head: ['肯定', '否定'],
        rows: [
          ['donne-le-moi', 'ne me le donne pas'],
          ['lève-toi', 'ne te lève pas'],
          ['dis-le-lui', 'ne le lui dis pas'],
          ['vas-y', "n'y va pas"],
        ],
      },
    },
  ],
  tips: [
    '-er 动词的 *tu* 命令式不加 -s：*mange*、*écoute*、*va*；但遇到 *y / en* 要加回：*manges-en*、*vas-y*。',
    '肯定命令式里用 *moi*：*aide-moi* ✓，不能说 *aide-me*；否定时变回 *ne m\'aide pas*。',
    '代词顺序常错：肯定式 *donne-le-moi*（le 在前），否定式 *ne me le donne pas*（me 在前）。',
    '*Veuillez* + 不定式是非常礼貌的书面请求，邮件和通知里很常见。',
  ],
  drills: [
    { t: 'fill', s: "[[Écoute]] bien la question, Lina.", hint: 'écouter, tu', zh: '莉娜，认真听问题。', alt: [] },
    { t: 'fill', s: '[[Finissez]] vos exercices avant midi.', hint: 'finir, vous', zh: '请在中午前做完练习。', alt: [] },
    { t: 'choice', s: '___ à la pharmacie avant 18 h, elle ferme tôt.', o: ['Vas', 'Va', 'Allez-y'], a: 1, why: 'aller 的 tu 命令式去掉 -s：va。', zh: '下午六点前去药店，它关门早。' },
    { t: 'conj', verb: 'aller', tense: 'présent（命令式 va, allons, allez 即由此而来）', forms: ['je vais', 'tu vas', 'il/elle va', 'nous allons', 'vous allez', 'ils/elles vont'] },
    { t: 'fill', s: '[[Sachez]] que le bureau sera fermé lundi.', hint: 'savoir, vous', zh: '请注意，办公室周一不开。', alt: [] },
    { t: 'choice', s: '___ patients, le médecin arrive.', o: ['Soyez', 'Êtes', 'Soyiez'], a: 0, why: 'être 的 vous 命令式是 soyez（来自虚拟式）。', zh: '请耐心等一下，医生马上到。' },
    { t: 'fill', s: "N'[[aie]] pas peur du chien, il est gentil.", hint: 'avoir, tu', zh: '别怕这只狗，它很温顺。', alt: [] },
    { t: 'choice', s: 'Tu veux des pommes ? ___ !', o: ['Prends-en', 'Prend-en', 'En prends'], a: 0, why: 'prendre 的 tu 命令式是 prends，en 放在动词后用连字符。', zh: '你想要苹果吗？拿几个吧！' },
    { t: 'fill', s: "Le parc est magnifique, [[vas-y]] dimanche !", hint: 'aller + y, tu', zh: '那个公园很美，周日去看看吧！', alt: [] },
    { t: 'choice', s: 'Ce livre ? ___.', o: ['Prête-moi-le', 'Prête-le-moi', 'Me le prête'], a: 1, why: '肯定命令式中直接宾语 le 在前，间接宾语 moi 在后：prête-le-moi。', zh: '这本书？借给我吧。' },
    { t: 'transform', from: 'Tu me donnes la clé.', task: '改为肯定命令式，用代词替换 la clé', to: ['Donne-la-moi.', 'Donne-la-moi !'], zh: '把它给我。' },
    { t: 'transform', from: 'Donne-le-moi.', task: '改为否定命令式', to: ['Ne me le donne pas.', 'Ne me le donne pas !'], zh: '别把它给我。' },
    { t: 'choice', s: 'Il est tard, ___ !', o: ['couche-te', 'couche-toi', 'te couche'], a: 1, why: '代词式动词的肯定命令式：te 变成 toi，放在动词后。', zh: '很晚了，去睡觉吧！' },
    { t: 'transform', from: 'Lève-toi.', task: '改为否定命令式', to: ['Ne te lève pas.', 'Ne te lève pas !'], zh: '别起来。' },
    { t: 'choice', s: 'Ces photos, ne ___ montrez pas !', o: ['leur les', 'les leur', 'les-leur'], a: 1, why: '否定命令式代词在动词前：le/la/les 在 lui/leur 前，不用连字符。', zh: '这些照片，别给他们看！' },
    { t: 'transform', from: 'Vous parlez de ce problème à vos collègues.', task: '改为肯定命令式，用两个代词替换', to: ['Parlez-leur-en.', 'Parlez-leur-en !'], zh: '跟你们的同事说说这个问题。' },
    { t: 'fill', s: "[[Veuillez]] agréer, Madame, mes salutations distinguées.", hint: 'vouloir, vous', zh: '此致敬礼。（正式信函结尾）', alt: [] },
  ],
};
