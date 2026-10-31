export default {
  id: 'adjectifs-comparaison',
  n: 25,
  fr: "Les adjectifs : accord, place et comparaison",
  zh: '形容词：配合、位置与比较',
  level: 'A2',
  summary: '法语形容词要和名词性数配合，大多放在名词后面，比较时还有 meilleur / mieux 这样的陷阱：这一课一次讲清。',
  explain: [
    {
      h: '性数配合',
      p: '形容词和它修饰的名词**性数一致**。一般规则：阴性加 *-e*，复数加 *-s*：*un petit appartement → une petite maison → des petites maisons*。本身以 *-e* 结尾的阴阳同形（*jeune, rapide*）；以 *-s / -x* 结尾的阳性复数不变（*gris, heureux*）。修饰阴阳两性名词时用阳性复数：*une jupe et un pull noirs*。',
      ex: [
        ['Ma nouvelle collègue est très sympathique.', '我的新同事很友好。'],
        ['Les rues sont glissantes et les trottoirs sont dangereux.', '街道很滑，人行道也很危险。'],
      ],
    },
    {
      h: '不规则的阴性',
      p: '很多形容词的阴性形式要单独记：',
      table: {
        head: ['阳性', '阴性', '规则'],
        rows: [
          ['heureux', 'heureuse', '-eux → -euse'],
          ['actif', 'active', '-if → -ive'],
          ['cher', 'chère', '-er → -ère'],
          ['bon, ancien', 'bonne, ancienne', '-on/-en → 双写 n + e'],
          ['gentil, pareil', 'gentille, pareille', '-il / -eil → -ille / -eille'],
          ['blanc, sec', 'blanche, sèche', '-c → -che'],
          ['long, public, frais', 'longue, publique, fraîche', '特殊'],
          ['beau, nouveau, vieux', 'belle, nouvelle, vieille', '特殊'],
        ],
      },
      ex: [
        ['Cette soupe est très bonne, mais elle est un peu chère.', '这汤很好喝，就是有点贵。'],
        ['La vieille dame est toujours gentille avec les enfants.', '那位老太太对孩子们总是很和善。'],
      ],
    },
    {
      h: '位置：大多数在后，BAGS 在前',
      p: '法语形容词一般放在**名词后面**（颜色、国籍、形状、长形容词）：*une voiture rouge, un étudiant chinois*。但一组短小常用的形容词放在**名词前面**，可以用 **BAGS** 记：**B**eauté（*beau, joli*），**Â**ge（*jeune, vieux, nouveau*），**G**ood/bad（*bon, mauvais, meilleur*），**S**ize（*petit, grand, gros, long*）。*beau, nouveau, vieux* 在元音开头的阳性名词前变成 *bel, nouvel, vieil*：*un bel appartement, un vieil homme*。',
      ex: [
        ['Nous avons trouvé un bel appartement dans un quartier tranquille.', '我们在一个安静的街区找到了一套漂亮的公寓。'],
        ["C'est une jeune femme brésilienne très talentueuse.", '这是一位很有才华的年轻巴西女子。'],
      ],
    },
    {
      h: '比较级',
      p: '**plus / moins / aussi + 形容词 + que**：*Montréal est plus grande que Québec.* 和名词比较用 *plus de / moins de / autant de + 名词 + que*：*il a autant de travail que moi*。和动词比较用 *plus / moins / autant*：*elle travaille plus que lui*。*que* 后接人称代词用重读形式（*moi, toi, lui*）。',
      ex: [
        ["L'hiver ici est plus long que dans mon pays.", '这里的冬天比我家乡长。'],
        ["J'ai moins de temps libre que l'année dernière.", '我的空闲时间比去年少。'],
      ],
    },
    {
      h: '最高级和 meilleur / mieux',
      p: '最高级：**le / la / les + plus / moins + 形容词**：*la ville la plus froide du pays*（名词后的形容词要重复冠词）。*bon* 的比较级是 **meilleur**（不说 *plus bon*），最高级是 *le meilleur*；*bien*（副词）的比较级是 **mieux**，最高级是 *le mieux*。区分：修饰名词用 *meilleur*，修饰动词用 *mieux*。*mauvais* 的比较级可以说 *plus mauvais* 或 *pire*。',
      table: {
        head: ['原级', '比较级', '最高级'],
        rows: [
          ['bon(ne)（形容词）', 'meilleur(e)', 'le / la meilleur(e)'],
          ['bien（副词）', 'mieux', 'le mieux'],
          ['mauvais(e)', 'plus mauvais(e) / pire', 'le / la pire'],
        ],
      },
      ex: [
        ["C'est le meilleur restaurant du quartier.", '这是这个街区最好的餐馆。'],
        ['Elle parle mieux français que moi.', '她法语说得比我好。'],
        ["C'est la saison la plus agréable de l'année.", '这是一年中最舒服的季节。'],
      ],
    },
  ],
  tips: [
    '中文“很好的书”形容词在前，法语多数在后：*un livre intéressant*。只有 BAGS 类放前面。',
    '*meilleur* 是形容词（要配合：*meilleure, meilleurs*），*mieux* 是副词（不变）。“我感觉好多了”是 *je me sens mieux*。',
    '有些形容词位置不同意思不同：*un ancien collègue*（以前的同事）/ *un meuble ancien*（古老的家具）；*mon propre bureau*（我自己的办公室）/ *un bureau propre*（干净的办公室）。',
    '“……中最……”用 *de*：*le plus grand **du** monde*，不要用 *dans*。',
  ],
  drills: [
    { t: 'fill', s: 'Ma sœur est très [[heureuse]] dans son nouveau travail.', hint: 'heureux → 阴性', zh: '我姐姐在新工作里很开心。', alt: [] },
    { t: 'fill', s: 'Les pommes de cette ferme sont toujours [[fraîches]].', hint: 'frais → 阴性复数', zh: '这家农场的苹果总是很新鲜。', alt: [] },
    { t: 'choice', s: "Elle porte une robe ___.", o: ['blanche', 'blanc', 'blance'], a: 0, why: 'blanc 的阴性是 blanche。', zh: '她穿着一条白裙子。' },
    { t: 'choice', s: "Nous habitons dans ___.", o: ['une grande maison', 'une maison grande', 'un grand maison'], a: 0, why: 'grand 属于 BAGS（Size），放在名词前；maison 是阴性。', zh: '我们住在一栋大房子里。' },
    { t: 'choice', s: "J'ai acheté ___.", o: ['une voiture rouge', 'une rouge voiture', 'un voiture rouge'], a: 0, why: '颜色形容词放在名词后。', zh: '我买了一辆红色的车。' },
    { t: 'fill', s: "C'est un [[vieil]] ami de mon père.", hint: 'vieux 在元音前', zh: '这是我父亲的一位老朋友。', alt: [] },
    { t: 'fill', s: "Ils ont acheté un [[nouvel]] ordinateur portable.", hint: 'nouveau 在元音前', zh: '他们买了一台新笔记本电脑。', alt: [] },
    { t: 'choice', s: 'Ce café est ___ que celui de la cafétéria.', o: ['meilleur', 'mieux', 'plus bon'], a: 0, why: '修饰名词 café，bon 的比较级是 meilleur。', zh: '这家咖啡比食堂的好喝。' },
    { t: 'choice', s: "Depuis qu'il fait du sport, il dort ___.", o: ['mieux', 'meilleur', 'plus bien'], a: 0, why: '修饰动词 dort，bien 的比较级是 mieux。', zh: '自从他开始运动，他睡得更好了。' },
    { t: 'choice', s: "Ma note est ___ que la note de ma voisine.", o: ['meilleure', 'meilleur', 'mieux'], a: 0, why: 'note 是阴性，meilleur 要配合成 meilleure。', zh: '我的分数比邻座同学的好。' },
    { t: 'fill', s: "Paul a [[autant]] de patience que sa mère.", hint: '和名词比较，“一样多”', zh: '保罗和他妈妈一样有耐心。', alt: [] },
    { t: 'fill', s: "Le fleuve Saint-Laurent est l'un des fleuves les plus longs [[du]] Canada.", hint: '最高级的范围：de + le', zh: '圣劳伦斯河是加拿大最长的河流之一。', alt: [] },
    { t: 'transform', from: 'Un garçon gentil et actif.', task: '改成阴性（une fille …）', to: ['Une fille gentille et active.'], zh: '一个和善又活跃的女孩。' },
    { t: 'transform', from: "Le train est rapide. L'autobus est moins rapide.", task: '用 plus … que 合并成一句（以 Le train 开头）', to: ["Le train est plus rapide que l'autobus."], zh: '火车比公共汽车快。' },
    { t: 'transform', from: "C'est une ville chère.", task: '改成最高级“国内最贵的城市”（以 C\'est la ville 开头）', to: ['C\'est la ville la plus chère du pays.'], zh: '这是国内最贵的城市。' },
    { t: 'choice', s: "Je n'ai jamais vu un film aussi mauvais ; c'est vraiment le ___ de l'année.", o: ['pire', 'pis', 'plus pire'], a: 0, why: 'mauvais 的最高级可以是 le pire；plus pire 是错的。', zh: '我从没看过这么烂的电影；真是今年最烂的。' },
  ],
};
