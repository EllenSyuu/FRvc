/*
 * Word-by-word glosses for every form that appears in the example sentences, so any word
 * can be hovered (or tapped) for its meaning. One line per form:
 *     form | 中文 | English
 * Conjugated or agreed forms point to their dictionary form in brackets, e.g.
 *     aidée | 帮助（aider 的过去分词，阴性） | helped (aider)
 * Elided articles and pronouns (l', d', qu' …) are their own entries. Written for this
 * project; tests/glossary.test.mjs checks that every sentence word has an entry.
 */

const RAW = `
30|三十|thirty
a|有；（助动词 avoir，构成过去时）|has (avoir)
abordables|负担得起的（复数）|affordable
accessible|可到达的，方便的|accessible
accord|同意（d'accord 同意）|agreement
accueil|接待，迎接|welcome, reception
accès|进入，获得|access
achat|购买|purchase
acheter|买|to buy
actif|积极的，活跃的|active
activité|活动|activity
activités|活动（复数）|activities
adaptent|适应（s'adapter，现在时）|adapt
administratives|行政的（阴性复数）|administrative
adolescents|青少年|teenagers
adressez-vous|请前往，请咨询（s'adresser 命令式）|go to, ask at
adultes|成年人|adults
affaire|事情，事务|matter, business
agir|行动|to act
ai|有；（助动词，我）（avoir）|have (avoir, je)
aide|帮助|helps (aider)
aidée|帮助（aider 的过去分词，阴性）|helped (aider)
aime|喜欢（aimer）|like (aimer)
air|空气|air
alimentation|饮食|diet, food
aller|去|to go
allons|去；（将要）（aller，我们）|go (aller, nous)
améliore|改善（améliorer）|improves
améliorent|改善（améliorer，复数）|improve
aménagement|规划，布置|planning, layout
an|年|year
analyse|分析|analysis
annulé|取消的（annuler 的过去分词）|cancelled
année|年，一年|year
années|年（复数）；年代|years
ans|年（复数，表年龄/时长）|years
antibiotique|抗生素|antibiotic
appartement|公寓|apartment
appartements|公寓（复数）|apartments
appelé|打电话（appeler 的过去分词）|called
application|应用程序|app
apprendre|学习|to learn
apprends|学习（apprendre，我/你）|learn
apprennent|学习（apprendre，他们）|learn
apprentissage|学习；学徒|learning
après|在……之后|after
argent|钱|money
arrivant|到来者（nouvel arrivant 新移民）|arrival, newcomer
arrive|做到（arriver à 能够）|manage, arrive
arrose|浇水（arroser）|waters
artificielle|人工的（阴性）|artificial
as|有；（助动词，你）（avoir）|have (avoir, tu)
assisté|出席，观看（assister à 的过去分词）|attended
assurance|保险|insurance
atteinte|达到的（atteindre 的过去分词，阴性）|reached
attend|等待（attendre，他/她）|waits
attendent|等待（attendre，他们）|wait
attends|等待（attendre，我）|wait
attendu|等待（attendre 的过去分词）|waited
attente|等待|waiting
attire|吸引（attirer）|attracts
au|在……；到……（à + le）|to the, at the
augmente|增加（augmenter）|increases
augmenté|增加（augmenter 的过去分词）|increased
aujourd'hui|今天，如今|today
aussi|也|also
auteur|作者|author
autobus|公交车|bus
autre|另一个|other
aux|在……；给……（à + les）|to the, at the
avant|在……之前|before
avantages|优点|advantages
avec|和，用|with
avion|飞机|plane
avis|意见，看法|opinion
avons|有；（助动词，我们）（avoir）|have (avoir, nous)
avril|四月|April
aînés|老年人，长者|seniors
bail|租约|lease
baissant|调低（baisser 的现在分词）|lowering
baissé|下降（baisser 的过去分词）|dropped
bancaire|银行的|bank
banlieue|郊区|suburbs
baux|租约（bail 的复数）|leases
beaucoup|很多|a lot
besoin|需要（avoir besoin de）|need
bibliothèque|图书馆|library
bien|好；（bien que 尽管）|well
bien-être|福祉，幸福感|well-being
billet|票|ticket
biodiversité|生物多样性|biodiversity
bon|好的|good
bourse|奖学金|scholarship
bouts|端，头（joindre les deux bouts）|ends
bruyant|吵闹的|noisy
budget|预算|budget
bureau|办公室|office
bénévolat|志愿服务|volunteering
c'|这（ce 的省音）|it, this (ce)
calme|安静的|quiet
caméras|摄像头|cameras
canadien|加拿大的（阳性）|Canadian
canadienne|加拿大的（阴性）|Canadian
candidature|求职申请|application
car|因为|because
carbone|碳|carbon
carrière|职业生涯|career
carte|卡|card
cause|原因（à cause de 因为）|cause
ce|这，这个|this, that
cent|一百（pour cent 百分之）|hundred
centre|中心；市中心|centre
centre-ville|市中心|downtown
cependant|然而|however
cet|这个（阳性，元音前）|this
cette|这个（阴性）|this
chacun|每个人|everyone
changements|变化|changes
changer|改变|to change
changez|更换（changer，命令式）|change
changé|改变（changer 的过去分词）|changed
chaque|每个|each, every
charge|负担（prendre en charge 承担）|charge
chauds|热的（复数）|hot
chauffage|暖气|heating
cher|贵的|expensive
cherchent|寻找（chercher，他们）|look for
chers|贵的（复数）|expensive
chez|在……家/那里|at (someone's place)
chiffres|数字，数据|figures
chirurgie|手术|surgery
choc|冲击|shock
choix|选择|choice
chère|贵的（阴性）|expensive
chômage|失业|unemployment
cinq|五|five
cinéma|电影院|cinema
circulation|交通，车流|traffic
citoyenneté|公民身份|citizenship
clause|条款|clause
clientèle|客户（service à la clientèle 客服）|customers
climat|气候|climate
climatique|气候的|climate
climatiques|气候的（复数）|climate
clinique|诊所|clinic
clé|钥匙；关键|key
coin|角落（du coin 附近的）|corner
coincée|被困住的（阴性）|stuck
collègue|同事|colleague
colocation|合租|flat-sharing
commence|开始（commencer）|starts
comment|如何|how
commerce|商业，商店|business, shop
commerces|商店（复数）|shops
commun|共同的（transports en commun 公共交通）|common, public
compostage|堆肥|composting
comprendre|理解|to understand
compte|账户；打算（compter）|account; intend
compétences|技能|skills
concert|音乐会|concert
conciliation|协调，平衡|balance
conclure|总结，下结论|to conclude
conduire|驾驶|to drive
confirmation|确认（信）|confirmation
connecter|登录，连接（se connecter）|to log in
connue|著名的（connaître 的过去分词，阴性）|known
conscience|意识（prendre conscience 意识到）|awareness
conseillent|建议（conseiller，他们）|advise
consommation|消费|consumption
consomment|消费（consommer，他们）|consume
conséquent|（par conséquent 因此）|consequently
continue|继续（continuer）|continues
contraire|相反|opposite
contrat|合同|contract
contre|反对，对抗|against
conversation|会话，口语|conversation
correct|还可以的，正确的|decent, correct
corrige|修正（corriger）|fixes
coup|一下（du premier coup 一次就）|attempt, go
courriel|电子邮件|email
cours|课程|course, class
court|短的|short
covoiturage|拼车|carpooling
coût|成本|cost
coûte|花费（coûter）|costs
coûts|成本（复数）|costs
crise|危机|crisis
crédit|信用|credit
cuisine|厨房；做饭（cuisiner）|kitchen; cook
culturel|文化的|cultural
culturelle|文化的（阴性）|cultural
cv|简历|CV, résumé
cyclable|自行车可通行的|cycle
cyclistes|骑车人|cyclists
céder|让出（céder le passage 让路）|to give way
cégep|魁北克大学预科学院|CEGEP (Québec college)
côté|旁边（de côté 存起来）|side
d'|……的；一些（de 的省音）|of, from (de)
dans|在……里|in
date|始于（dater de）|dates from
davantage|更多|more
de|……的；从|of, from
demande|申请；要求（demander）|application; asks
demandent|要求（demander，他们）|ask for
dense|密集的|dense
dentiste|牙医|dentist
depuis|自从|since
dernier|最后的；上一个|last
des|一些；……的（de + les）|some; of the
dette|债务|debt
deux|二|two
devant|在……前面|in front of
difficile|困难的|difficult
difficiles|困难的（复数）|difficult
dimanche|星期日|Sunday
diplôme|文凭，学位|degree
diplômes|文凭（复数）|degrees
diplômés|毕业生|graduates
diversité|多样性|diversity
dix|十|ten
document|文件|document
dois|必须（devoir，我）|must
doit|必须（devoir，他/她）|must
doivent|必须（devoir，他们）|must
donne|给予（donner）|gives
données|数据|data
dossier|档案，材料|file
douze|十二|twelve
du|……的；一些（de + le）|of the; some
due|到期的（阴性）|due
durable|可持续的|sustainable
dure|持续（durer）|lasts
duré|持续（durer 的过去分词）|lasted
début|开始，初|beginning
déchets|垃圾|waste
déclaration|申报（déclaration de revenus 报税单）|declaration
découvrir|发现，体验|to discover
décrochage|辍学（décrochage scolaire）|dropping out
défi|挑战|challenge
déjà|已经|already
délai|期限；处理时间|deadline; processing time
démarches|手续|procedures
démissionné|辞职（démissionner 的过去分词）|resigned
déménagement|搬家|move
déménager|搬家|to move house
déneigement|清雪|snow removal
dépense|花钱（dépenser）|spend
dépenses|开销|expenses
déplacer|出行，移动（se déplacer）|to get around
déposer|提交|to submit
désolée|抱歉的（阴性）|sorry
détecte|发现（détecter）|detects
détendre|放松（se détendre）|to relax
développer|发展|to develop
dû|不得不（devoir 的过去分词）|had to
eau|水|water
effet|效果（en effet 事实上；effet de serre 温室效应）|effect
elle|她；它（阴性）|she, it
elles|她们；它们（阴性）|they
embauche|雇用（entretien d'embauche 求职面试）|hiring
embaucher|雇用|to hire
embouteillages|堵车|traffic jams
emménagé|搬入（emménager 的过去分词）|moved in
emploi|工作，职位|job
emplois|工作（复数）|jobs
employeur|雇主|employer
employeurs|雇主（复数）|employers
employés|员工|employees
empreinte|足迹（empreinte carbone 碳足迹）|footprint
emprunte|借（emprunter）|borrow
emprunter|借|to borrow
en|在；用；（代词）它/其中|in; of it
encore|仍然，还|still, yet
enfant|孩子|child
enfants|孩子们|children
enfin|终于|finally
engagent|参与，投身（s'engager，他们）|get involved
enrichit|丰富（enrichir）|enriches
enseignant|教师|teacher
entiers|整个的（复数）|entire
entraide|互助|mutual aid
entre|在……之间|between
entreprise|公司|company
entreprises|公司（复数）|companies
entretien|面谈，面试|interview
enverrai|发送（envoyer，我，将来时）|will send
environnement|环境|environment
envie|想要（donner envie de 让人想要）|desire
envoyé|发送（envoyer 的过去分词）|sent
essence|汽油|gasoline
essentiel|关键的，基本的|essential
est|是（être）|is
et|和|and
eux|他们（重读）|them
examen|考试|exam
examens|考试（复数）|exams
exemple|例子（par exemple 例如）|example
expire|到期（expirer）|expires
expliqué|解释（expliquer 的过去分词）|explained
exposition|展览|exhibition
expérience|经验|experience
facile|容易的|easy
facilite|使……容易（faciliter）|makes easier
facture|账单|bill
faire|做|to do, make
fais|做（faire，我）|do
fait|做（faire 的变位/过去分词）|does; done
famille|家庭|family
familles|家庭（复数）|families
fatigué|累的|tired
faudrait|应该（falloir 条件式）|it would be necessary
faut|必须（il faut）|must
favorisent|有利于（favoriser，复数）|promote
façon|方式|way
festival|节庆，艺术节|festival
feux|火（feux de forêt 森林火灾）|fires
fille|女儿；女孩|daughter, girl
film|电影|film
fin|结束；月底（fin avril 四月底）|end
fièvre|发烧|fever
fois|次；倍|time(s)
formation|培训|training
forme|状态（en forme 状态好）|shape
formidables|极好的（复数）|wonderful
formulaire|表格|form
forte|强的（阴性）|strong
forts|强的（复数）|strong
forêt|森林|forest
fracture|裂痕（fracture numérique 数字鸿沟）|divide
frais|费用|fees, costs
francisation|法语化课程|French courses (Québec)
français|法语；法国的|French
freinent|阻碍（freiner，复数）|hold back
fruits|水果|fruit
frère|兄弟|brother
fréquent|常见的|frequent
fête|节日，聚会|party, festival
fêtes|节日（复数）|holidays
gagner|赚取；赢|to earn; to win
garde|保持（garder）|keeps
garderie|托儿所|daycare
garçons|男孩们|boys
gaspille|浪费（gaspiller）|waste
gaspésie|加斯佩西（魁北克地区名）|Gaspésie (region)
gaz|气体|gas
gens|人们|people
glaciers|冰川|glaciers
gorge|喉咙|throat
grande|大的（阴性）|big
gratuit|免费的|free
gratuite|免费的（阴性）|free
gratuits|免费的（复数）|free
grippe|流感|flu
grâce|（grâce à 多亏）|thanks (to)
guichet|窗口，柜台|counter
guide|指南|guide
guérir|痊愈|to recover
habitudes|习惯|habits
heure|小时；时刻|hour
heures|小时（复数）；点钟|hours
hier|昨天|yesterday
hiver|冬天|winter
hong|香港（Hong Kong）|Hong (Kong)
horaires|工作时间，时刻表|hours, schedule
huit|八|eight
humides|潮湿的（zones humides 湿地）|wet
hôpitaux|医院（复数）|hospitals
hôtel|旅馆（hôtel de ville 市政厅）|hotel
identité|身份|identity
il|他；它（阳性）；（无人称）|he, it
ils|他们|they
immeuble|公寓楼|building
immigration|移民|immigration
important|重要的|important
impressionnants|惊人的（复数）|impressive
inclus|包含的|included
inconvénients|缺点|drawbacks
infection|感染|infection
infirmière|护士|nurse
inflation|通货膨胀|inflation
inscrire|报名，注册（s'inscrire）|to enrol
installent|定居（s'installer，他们）|settle
installés|定居（s'installer 的过去分词，复数）|settled
instant|片刻（pour l'instant 目前）|moment
intelligence|智能|intelligence
intelligent|智能的|smart
interdit|禁止的|forbidden
internationale|国际的（阴性）|international
internet|互联网|Internet
intégration|融入|integration
intégrer|融入（s'intégrer）|to integrate
intérêt|利息；兴趣|interest
investir|投资|to invest
isole|孤立（isoler）|isolates
j'|我（je 的省音）|I
jazz|爵士乐|jazz
je|我|I
jette|扔（jeter）|throw away
jeudi|星期四|Thursday
jeunes|年轻人；年轻的|young people
joindre|连接（joindre les deux bouts 维持收支）|to join
jointe|附上的（pièce jointe 附件）|attached
joue|扮演，起（作用）（jouer）|plays
jour|天|day
juillet|七月|July
juin|六月|June
jusqu'|直到（jusque 的省音）|until
kilomètres|公里|kilometres
kong|香港（Hong Kong）|Kong
l'|定冠词（le / la 的省音）|the
la|定冠词（阴性）；她/它（宾语）|the; her
laisse|留出（laisser）|leaves
langue|语言|language
le|定冠词（阳性）；他/它（宾语）|the; him
lecture|阅读|reading
lent|慢的|slow
les|定冠词（复数）；他们（宾语）|the; them
lettre|信|letter
lettres|字母（复数）|letters
leur|他们的；给他们|their; them
leurs|他们的（复数）|their
lever|起床（se lever）|to get up
libre|自由的；空闲的；开源的|free
licencier|解雇|to lay off
lien|联系|tie, link
liens|联系（复数）|ties
ligne|线（en ligne 在线）|line
limite|限制（limiter）|limits
limiter|限制|to limit
lisent|阅读（lire，他们）|read
lisez|阅读（lire，命令式）|read
livres|书|books
local|本地的|local
locataire|租客|tenant
logement|住处，住房|housing
logiciel|软件|software
logique|合乎逻辑的|logical
loi|法律|law
loisirs|休闲活动|leisure
long|长的|long
longtemps|很久|a long time
louer|租|to rent
loyer|房租|rent
loyers|房租（复数）|rents
lu|读（lire 的过去分词）|read
lundi|星期一|Monday
lutter|斗争，对抗|to fight
m'|我（me 的省音）|me, myself
ma|我的（阴性）|my
main-d'œuvre|劳动力|labour
maintenant|现在|now
mais|但是|but
maison|房子；家|house; home
majuscules|大写字母|capital letters
mal|疼；不好（avoir mal à ……疼）|pain; badly
malade|生病的|sick
maladie|疾病|illness
manque|缺少（manquer）|is missing
marche|走路（marcher）|walks
mardi|星期二|Tuesday
mars|三月|March
matin|早上|morning
matinée|上午|morning
maîtrise|硕士学位|master's degree
me|我（宾语/反身）|me, myself
menace|威胁（menacer）|threatens
mentale|心理的（阴性）|mental
mes|我的（复数）|my
mesure|措施|measure
mets|放（mettre，我）|put
mettre|放（mettre en valeur 突出）|to put
meublé|带家具的|furnished
milliers|成千（des milliers 成千上万）|thousands
minuit|午夜|midnight
minutes|分钟|minutes
mise|放置（mise à jour 更新）|putting
mode|方式（mode de vie 生活方式）|way, mode
moins|更少|less
mois|月|month
mois-ci|这个月（ce mois-ci）|this month
mon|我的（阳性）|my
monde|世界；人们（tout le monde 大家）|world; people
mondial|世界的|world
monoparentale|单亲的（阴性）|single-parent
montent|上涨（monter，复数）|rise
montrent|显示（montrer，复数）|show
montréal|蒙特利尔|Montreal
mot|词；（mot de passe 密码）|word
moyen|方法，手段|means
musée|博物馆|museum
mère|母亲|mother
médecin|医生|doctor
médicament|药|medicine
ménages|家庭，住户|households
ménagères|家务的（tâches ménagères 家务）|household
métro|地铁|subway
n'|不（ne 的省音）|not
ne|不（否定）|not
noir|黑的（il fait noir 天黑）|dark
nombreuses|众多的（familles nombreuses 多子女家庭）|numerous
non|不（non seulement 不仅）|not
notre|我们的|our
nourriture|食物|food
nous|我们|we, us
nouveau|新的|new
nouvel|新的（阳性，元音前）|new
nouvelle|新的（阴性）|new
nuit|夜晚|night
numérique|数字的；数字技术|digital
numéro|号码|number
nécessaire|必要的|necessary
obligatoire|强制的|mandatory
obligé|迫使（obliger 的过去分词）|forced
obtenu|获得（obtenir 的过去分词）|obtained
occupe|照顾（s'occuper de）|takes care
offres|职位，报价（offres d'emploi）|offers, postings
on|人们；我们|one, we
ont|有；（助动词，他们）（avoir）|have (avoir, ils)
oral|口语|speaking
ordinateur|电脑|computer
ordonnance|处方|prescription
organisme|机构|organisation
originale|原版的（阴性）|original
origine|起源（pays d'origine 原籍国）|origin
ou|或者|or
oubliez|忘记（oublier，命令式）|forget
ouverte|开着的（阴性）|open
par|通过；每（par jour 每天）|by; per
parc|公园|park
parce|（parce que 因为）|because
parcs|公园（复数）|parks
parents|父母|parents
parfois|有时|sometimes
parlent|谈论（parler，复数）|talk
parrainage|担保|sponsorship
part|方面（d'une part 一方面）|part
partage|分享（partager）|share
partageons|分担（partager，我们）|share
partager|分享，分担|to share
partagé|分享（partager 的过去分词）|shared
particuliers|私人的（cours particuliers 家教课）|private
partie|部分|part
partir|出发|to leave
parts|份（à parts égales 平分）|shares
pas|不（ne … pas）|not
passage|通行（céder le passage 让路）|way, passage
passe|度过；经过（passer）|spends; passes
passent|度过（passer，他们）|spend
passeport|护照|passport
passionne|热衷（se passionner pour）|is passionate
patrimoine|文化遗产|heritage
payer|付钱|to pay
pays|国家|country
peine|辛苦（valoir la peine 值得）|effort
pendant|在……期间|during
pense|认为（penser）|think
permanente|永久的（阴性）|permanent
permet|使能够（permettre）|allows
permettent|使能够（permettre，复数）|allow
permis|许可证；使能够（permettre 的过去分词）|permit; allowed
personnel|员工|staff
personnelles|个人的（阴性复数）|personal
personnes|人（复数）|people
petit|小的|small
petits|小的（复数）|small
peu|少|little, few
peut|能够（pouvoir）|can
pharmacie|药店|pharmacy
photo|照片|photo
photographie|摄影|photography
physique|身体的|physical
pied|脚（à pied 步行）|foot
piste|道（piste cyclable 自行车道）|lane
pièce|一件；文件（pièce d'identité 证件）|piece, document
piéton|行人|pedestrian
piétons|行人（复数）|pedestrians
place|空间；名额|room; spot
plantes|植物|plants
plastiques|塑料的（复数）|plastic
plein|满的（en plein air 露天）|full
pleins|满的（复数）|full
plus|更（plus … que 比……更）；（de plus en plus 越来越）|more
plutôt|宁可，而不是|rather
point|点（sur ce point 在这一点上）|point
pointe|顶峰（heure de pointe 高峰时段）|peak
pollue|污染（polluer）|pollutes
pollution|污染|pollution
pont|桥|bridge
population|人口|population
posent|提出（poser une question）|raise
possible|可能的|possible
poste|岗位|position
postuler|申请（职位）|to apply
potable|可饮用的|drinking
pour|为了；对于|for; to
pourquoi|为什么（c'est pourquoi 所以）|why
pouvez|能够（pouvoir，您）|can
pouvoir|购买力（pouvoir d'achat）；能够|power; to be able
pratique|方便的|convenient
premier|第一|first
prend|花费（时间）；承担（prendre）|takes
prendre|拿，乘坐|to take
prends|乘坐，拿（prendre，我）|take
presque|几乎|almost
preuve|证明|proof
printemps|春天|spring
priorité|优先事项|priority
pris|拿；花费（prendre 的过去分词）|taken
privée|私人的（vie privée 隐私）|private
prix|价格|price
problème|问题|problem
prochain|下一个|next
productivité|生产力|productivity
produisent|产生（produire，复数）|produce
produit|产品；生产（produire）|product; produces
programme|项目，计划|programme
progrès|进步|progress
projet|项目|project
prolongée|延长的（阴性）|extended
promotion|促销|sale, offer
propose|提供（proposer）|offers
proposé|提出（proposer 的过去分词）|offered
propriétaire|房东；所有者|landlord, owner
propriété|房产，所有权|ownership
protéger|保护|to protect
protégées|被保护的（阴性复数）|protected
provoquent|引起（provoquer，复数）|cause
près|在……附近|near
préfère|更喜欢（préférer）|prefer
préférés|最喜欢的（复数）|favourite
prépare|准备（préparer）|prepares
préparée|准备（se préparer 的过去分词，阴性）|prepared
présente|呈现，有（présenter）|presents
présentez|出示（présenter，命令式）|show
pèse|压在……上（peser sur）|weighs on
pédiatres|儿科医生|paediatricians
pénurie|短缺|shortage
qu'|那，什么（que 的省音）|that, what
qualité|质量|quality
quand|当……的时候|when
quarante|四十|forty
quartier|街区|neighbourhood
quatre|四|four
que|那；比（plus … que）|that; than
question|问题|question
quotidienne|日常的（阴性）|daily
québec|魁北克|Québec
randonnée|徒步|hike
rapide|快的|fast
rapidement|很快地|quickly
rare|稀少的|scarce
raté|错过（rater 的过去分词）|missed
recevoir|收到|to receive
recherche|寻找，研究|search
reconnaissance|认可，认证|recognition
reconnu|被认可（reconnaître 的过去分词）|recognised
recyclage|回收|recycling
remarquable|令人赞叹的|remarkable
rembourse|报销，偿还（rembourser）|reimburses
remboursement|退款；还款|refund
remboursé|偿还（rembourser 的过去分词）|repaid
remplir|填写|to fill in
remplissez|填写（remplir，命令式）|fill in
rencontrer|遇见，认识|to meet
rendent|使（rendre，复数）|make
rendez-vous|预约|appointment
renforcent|加强（renforcer，复数）|strengthen
renouvelable|可续签的|renewable
renouvelables|可再生的（复数）|renewable
renouveler|续签，更新|to renew
renseigner|咨询（se renseigner）|to ask for information
repos|休息|rest
reprendre|重新开始|to go back to
responsable|负责任的|responsible
restaurants|餐馆|restaurants
reste|仍然是（rester）|remains
rester|留，保持|to stay
revanche|（en revanche 相反）|(by contrast)
revenu|收入|income
revenus|收入（复数）|income
reçoit|收到（recevoir）|receives
reçu|收到（recevoir 的过去分词）|received
risqué|有风险的|risky
roman|小说|novel
rue|街道|street
rues|街道（复数）|streets
ruiné|毁掉（ruiner 的过去分词）|ruined
règle|规则（en règle 合规）|rule
réchauffement|变暖|warming
récoltes|收成|harvests
réduire|减少|to reduce
réduit|减少（réduire）|reduces
régularité|规律性，坚持|regularity
réparer|修理|to repair
répond|回应（répondre）|responds
répondu|回答（répondre 的过去分词）|answered
réseaux|网络（réseaux sociaux 社交媒体）|networks
résidence|居留；住所|residence
réuni|聚集（réunir 的过去分词）|gathered
réunir|使团聚|to bring together
réussi|成功，通过（réussir 的过去分词）|passed, succeeded
réviser|复习|to review
rôle|角色，作用|role
s'|自己（se 的省音）；如果（si 的省音）|oneself; if
sa|他/她的（阴性）|his, her
salaire|薪水|salary
salaires|薪水（复数）|salaries
salariale|工资的（阴性）|wage
samedi|星期六|Saturday
sans|没有|without
santé|健康|health
scolaire|学校的|school
scolarité|学业（frais de scolarité 学费）|schooling
se|自己（反身代词）|oneself
secondaire|中学的|secondary
semaine|星期，周|week
semaines|星期（复数）|weeks
semble|似乎（sembler）|seems
septembre|九月|September
serre|温室（effet de serre 温室效应）|greenhouse
serré|紧的|tight
service|服务|service
servir|用作（servir de）|to serve
ses|他/她的（复数）|his, her
seulement|仅仅（non seulement 不仅）|only
si|如果|if
signature|签名|signature
signer|签署|to sign
simples|简单的（复数）|simple
site|网站|website
six|六|six
social|社会的|social
sociale|社会的（阴性）|social
sociaux|社会的（复数）|social
société|社会|society
soi|自己|oneself
soigne|治疗（se soigner）|is treated
soigner|治疗（se soigner 看病）|to treat
soin|照顾（prendre soin de）|care
soir|晚上|evening
soirs|晚上（复数）|evenings
soirée|晚上，当晚|evening
soit|是（être 虚拟式）|be (subjunctive)
soixante|六十|sixty
solitude|孤独|loneliness
sommeil|睡眠|sleep
son|他/她的（阳性）|his, her
sont|是（être，复数）|are
sortie|外出活动|outing
souffrir|受苦|to suffer
sous-estimer|低估|to underestimate
soutien|支持|support
souvent|经常|often
spectacle|演出|show
sport|运动|sport
stable|稳定的|stable
stage|实习|internship
stagnent|停滞（stagner，复数）|stagnate
stationnement|停车|parking
stress|压力|stress
studio|单间公寓|studio
suffisent|足够（suffire，复数）|are enough
suis|是（être，我）|am
sujet|主题（au sujet de 关于）|subject
supplémentaires|额外的（heures supplémentaires 加班）|extra
sur|在……上；关于|on; about
surtout|尤其|especially
symptôme|症状|symptom
système|系统|system
sécheresse|干旱|drought
sécurité|安全|safety
séjour|逗留，旅居|stay
sûre|安全的（阴性）|safe
taux|比率（taux de chômage 失业率）|rate
temps|时间|time
tempête|暴风雪，风暴|storm
tendance|倾向（avoir tendance à）|tendency
terminent|结束（se terminer，复数）|end
textes|文本|texts
tisser|编织（tisser des liens 建立联系）|to weave
touche|影响（toucher）|affects
tourisme|旅游业|tourism
tous|所有（阳性复数）|all
tout|全部；一切|all, everything
toute|整个（阴性）|whole
toutes|所有（阴性复数）|all
traduit|翻译（traduire）|translates
train|火车|train
traitement|处理|processing
trajet|路程，通勤|commute
transformé|改变（transformer 的过去分词）|transformed
transports|交通|transport
travail|工作|work
travail-famille|工作与家庭|work-family
travaillent|工作（travailler，复数）|work
travailler|工作|to work
travaux|施工，工程|works, construction
traverse|穿过（traverser）|crosses
trente|三十|thirty
trier|分类|to sort
trois|三|three
trop|太，过多|too, too much
trouver|找到|to find
trouverez|找到（trouver，您，将来时）|will find
trouvé|找到（trouver 的过去分词）|found
très|很|very
tu|你|you
tâches|任务（tâches ménagères 家务）|tasks
télécharger|下载|to download
téléphone|电话|phone
télétravail|远程办公|remote work
tôt|早|early
un|一个（阳性）|a, one
une|一个（阴性）|a, one
université|大学|university
urbain|城市的|urban
urbains|城市的（复数）|urban
urgence|紧迫性|urgency
urgences|急诊室|emergency room
usine|工厂|factory
utile|有用的|useful
utilisé|使用（utiliser 的过去分词）|used
va|将要；去（aller）|is going to
vaccin|疫苗|vaccine
vais|将要；去（aller，我）|am going to
valeur|价值（mettre en valeur 突出）|value
valide|有效的|valid
variée|多样的（阴性）|varied
vas|将要；去（aller，你）|are going to
vaut|值（valoir）|is worth
verre|玻璃|glass
version|版本（version originale 原版）|version
veulent|想要（vouloir，复数）|want
veut|想要（vouloir）|wants
veux|想要（vouloir，我）|want
vidéo|视频|video
vie|生活；生命|life
vieillissement|老龄化|ageing
vieux-québec|魁北克老城|Old Québec
villages|村庄|villages
vingt|二十；（vingt heures 晚上八点）|twenty
ville|城市|city
visa|签证|visa
visiteurs|游客|visitors
vit|生活（vivre）|lives
vite|快|fast
vivant|有生气的|lively
vivre|生活；使……生存（faire vivre）|to live
vocabulaire|词汇|vocabulary
voir|看|to see
voisin|邻居|neighbour
voisinage|邻里|neighbourhood
voiture|汽车|car
voitures|汽车（复数）|cars
vol|航班|flight
vos|您的（复数）|your
votre|您的|your
voudrais|想要（vouloir 条件式，我）|would like
vous|您，你们|you
voyage|旅行（voyager）|travel
vrai|真的（il est vrai que 诚然）|true
vu|看（voir 的过去分词）|seen
vélo|自行车|bike
vérifiez|确认（vérifier，命令式）|check
wagons|车厢|cars (of a train)
week-end|周末|weekend
y|那里|there
zones|区域|zones
à|在；到；给|at, to
âgées|年老的（阴性复数）|elderly
échangé|交换（échanger 的过去分词）|exchanged
échec|失败|failure
école|学校|school
écoles|学校（复数）|schools
économies|积蓄（faire des économies 省钱）|savings
économique|经济的，省钱的|economical
économiser|节约|to save
écran|屏幕|screen
écrans|屏幕（复数）|screens
éducation|教育|education
égales|相等的（à parts égales 平分）|equal
égalité|平等|equality
égypte|埃及|Egypt
électricité|电|electricity
élevée|高的（阴性）|high
élevés|高的（复数）|high
émissions|排放|emissions
énergie|能源|energy
énergies|能源（复数）|energies
épicerie|杂货店；日常采购|groceries
équipe|团队|team
étranger|外国的|foreign
étrangers|外国的（复数）|foreign
études|学业|studies
étudiants|学生|students
étudier|学习，读书|to study
été|是（être 的过去分词）；夏天|been; summer
étés|夏天（复数）|summers
évacuer|撤离|to evacuate
être|是；处于|to be
`;

import EXTRA from './gloss/index.js';

/* Base glosses first; files in data/gloss/ add the forms used by later themes, grammar and
   reading passages. The first definition of a form wins. */
const parse = raw =>
  raw
    .trim()
    .split('\n')
    .filter(l => l.includes('|'))
    .map(l => {
      const [form, zh, en] = l.split('|').map(x => x.trim());
      return [form.toLowerCase().replace(/’/g, "'"), { zh, en }];
    });

export const GLOSS = {};
for (const raw of [RAW, ...EXTRA]) for (const [k, v] of parse(raw)) if (!(k in GLOSS)) GLOSS[k] = v;

const ELISION = /^((?:jusqu|lorsqu|puisqu|qu|[ldjmnstc])['’])(.+)$/i;

/* Split a sentence into display tokens: [{ text, key, word }] where `word` is false for
   spaces and punctuation and `key` is the glossary form (lower case). Elided articles and
   pronouns become their own token ("l'" + "emploi"). */
export function tokenize(sentence) {
  const out = [];
  const re = /(\s+)|([^\s]+)/g;
  let m;
  while ((m = re.exec(sentence))) {
    if (m[1]) {
      out.push({ text: m[1], word: false });
      continue;
    }
    let t = m[2];
    const lead = t.match(/^[«(“"]+/);
    if (lead) {
      out.push({ text: lead[0], word: false });
      t = t.slice(lead[0].length);
    }
    const trail = t.match(/[».,;:!?)”"]+$/);
    if (trail) t = t.slice(0, -trail[0].length);
    const el = t.match(ELISION);
    const parts = el && !/^main-/i.test(t) ? [el[1], el[2]] : [t];
    for (const p of parts) if (p) out.push({ text: p, key: p.toLowerCase().replace(/’/g, "'"), word: true });
    if (trail) out.push({ text: trail[0], word: false });
  }
  return out;
}

export const glossFor = key => GLOSS[key] || null;
