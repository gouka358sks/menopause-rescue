import { useState, useEffect, useRef } from "react";

const SYMPTOMS = [
  {
    id: 1,
    keyword: "不眠",
    emoji: "🌙",
    title: "不眠レスキュー",
    color: "#4A3B76",
    lightColor: "#EDE8F5",
    selfCare: [
      "寝る1時間前からスマホ・テレビの光を減らす",
      "4秒吸って6〜8秒吐く腹式呼吸を1分",
      "寝室を涼しく（18〜22℃が目安）",
      "寝る前にぬるめのお風呂（38〜40℃）10分",
      "朝起きたらすぐ日光を浴びる（体内時計リセット）",
    ],
    acupoints: [
      { name: "安眠（あんみん）", location: "耳の後ろの骨の出っぱりの下のくぼみ", effect: "副交感神経を優位にし、眠りへ導く" },
      { name: "神門（しんもん）", location: "手首内側のシワの小指側のくぼみ", effect: "脳と精神の緊張をほぐし寝つきを良くする" },
      { name: "百会（ひゃくえ）", location: "頭のてっぺん、両耳を結ぶ線の真ん中", effect: "全身の気を整え、のぼせ・不眠に" },
    ],
    foods: [
      "大豆製品（納豆・豆腐・味噌）→ トリプトファン → セロトニン → メラトニン（睡眠ホルモン）の材料",
      "バナナ・乳製品（ヨーグルト・牛乳）→ トリプトファンが豊富。朝食べるのがおすすめ",
      "魚（鮭・サバ）・卵 → ビタミンB6がセロトニン合成を助ける",
      "キウイ・オートミール → 睡眠の質を高める研究報告あり",
    ],
    avoidFoods: "寝る前のカフェイン・アルコール・辛い物は覚醒作用で睡眠を妨げやすい",
    warning: "眠れない日が2週間以上続く、日中の生活に支障がある場合は婦人科・内科・心療内科へ",
    note: "更年期女性の約半数が不眠を経験するとされています。ホットフラッシュによる中途覚醒も多く、睡眠・運動・リラックス習慣が推奨されています。",
  },
  {
    id: 2,
    keyword: "ほてり",
    emoji: "🔥",
    title: "ほてりレスキュー",
    color: "#B5413B",
    lightColor: "#FAEAE9",
    selfCare: [
      "首元・手首を濡れタオルや保冷剤で冷やす",
      "重ね着で温度調整（脱ぎ着しやすい服を）",
      "ゆっくり深呼吸（交感神経を落ち着かせる）",
      "通気性の良い綿や麻素材の服を選ぶ",
      "室温を下げ、携帯用扇子やミニ扇風機を活用",
    ],
    acupoints: [
      { name: "三陰交（さんいんこう）", location: "内くるぶしから指4本上、骨のきわ", effect: "女性のツボ。ホルモンバランスを整える" },
      { name: "太衝（たいしょう）", location: "足の甲、親指と人差し指の骨が合うくぼみ", effect: "のぼせ・イライラを鎮める" },
      { name: "太渓（たいけい）", location: "内くるぶしとアキレス腱の間のくぼみ", effect: "ほてりを取り、足の冷えにも" },
    ],
    foods: [
      "大豆製品（豆腐・納豆・豆乳）→ イソフラボンがエストロゲン様作用",
      "亜麻仁（フラックスシード）→ 植物性エストロゲンが豊富",
      "野菜・全粒穀物 → ビタミン・ミネラルで自律神経サポート",
      "ナッツ（アーモンド）→ ビタミンEがホルモン分泌を助ける",
    ],
    avoidFoods: "辛い物・アルコール・熱い飲み物・カフェインはほてりを悪化させやすい",
    warning: null,
    note: "ほてり（ホットフラッシュ）は最も一般的な更年期症状で、エストロゲン減少による自律神経の体温調節の乱れが原因です。1〜2分で収まるものから長引くものまで個人差があります。",
  },
  {
    id: 3,
    keyword: "寝汗",
    emoji: "💧",
    title: "寝汗レスキュー",
    color: "#2E6B8A",
    lightColor: "#E3F0F6",
    selfCare: [
      "寝室の温度をやや涼しくする",
      "吸湿速乾性の寝具・パジャマに替える",
      "寝る前の入浴はぬるめ・短めに",
      "枕元に着替えと水を用意しておく",
      "就寝前のアルコールを控える",
    ],
    acupoints: [
      { name: "復溜（ふくりゅう）", location: "内くるぶしとアキレス腱の間から指3本上", effect: "水の代謝を整え、発汗を調節する" },
      { name: "三陰交（さんいんこう）", location: "内くるぶしから指4本上、骨のきわ", effect: "ホルモンバランスと冷えに" },
    ],
    foods: [
      "大豆製品（豆腐・納豆）→ イソフラボンでホルモンバランスを整える",
      "魚・卵・野菜中心の食事 → バランス良い栄養で自律神経をサポート",
    ],
    avoidFoods: "就寝前のカフェイン・アルコール・辛い物は寝汗を誘発しやすい",
    warning: null,
    note: "寝汗はホットフラッシュの夜間版です。衣類や寝具の工夫で快適さが変わります。",
  },
  {
    id: 4,
    keyword: "疲れ",
    emoji: "😮‍💨",
    title: "疲れレスキュー",
    color: "#6B7B3A",
    lightColor: "#F0F3E4",
    selfCare: [
      "朝5〜10分太陽を浴びる（ビタミンD生成・体内時計リセット）",
      "ウォーキングなど軽い有酸素運動を20分",
      "「頑張る前に休む」を意識する",
      "昼寝は20分以内にとどめる",
      "こまめな水分補給（脱水は疲労の原因に）",
    ],
    acupoints: [
      { name: "足三里（あしさんり）", location: "膝の皿の下から指4本下、すねの外側", effect: "全身の疲労回復・胃腸を整える万能ツボ" },
      { name: "湧泉（ゆうせん）", location: "足裏、指を曲げた時にできるくぼみ", effect: "元気を湧き上がらせ、だるさを解消" },
    ],
    foods: [
      "卵・鮭・鶏肉 → 良質なたんぱく質で筋肉と体力を維持",
      "納豆・豆腐 → 植物性たんぱく質＋イソフラボン",
      "たんぱく質を毎食少しずつ（1食で偏らせない）",
      "ビタミンB群（豚肉・玄米）→ エネルギー代謝に必須",
    ],
    avoidFoods: null,
    warning: null,
    note: "更年期の疲労は、ホルモン変動による自律神経の乱れ、睡眠障害、筋力低下が複合的に関係します。運動と栄養の見直しが推奨されます。",
  },
  {
    id: 5,
    keyword: "イライラ",
    emoji: "😤",
    title: "イライラレスキュー",
    color: "#C75B39",
    lightColor: "#FCEEE8",
    selfCare: [
      "息を長く吐く呼吸を1分（吐く息を吸う息の2倍に）",
      "肩を耳まで上げてストンと落とす×5回",
      "スマホ・SNSから5分離れる",
      "手のひらを開いて握る「グーパー体操」10回",
      "温かい飲み物をゆっくり飲む",
    ],
    acupoints: [
      { name: "合谷（ごうこく）", location: "手の甲、親指と人差し指の骨の付け根のくぼみ", effect: "万能ツボ。イライラ・緊張・頭痛を和らげる" },
      { name: "内関（ないかん）", location: "手首内側のシワから指3本分ひじ側の中央", effect: "神経の高ぶりを抑え、気持ちを落ち着かせる" },
      { name: "太衝（たいしょう）", location: "足の甲、親指と人差し指の骨が合うくぼみ", effect: "怒りの感情を鎮めるツボ" },
    ],
    foods: [
      "海藻・豆類・ナッツ → マグネシウムが神経の興奮を抑える",
      "青魚（サバ・サンマ）→ オメガ3脂肪酸が炎症を抑え精神安定",
      "発酵食品（味噌・ぬか漬け）→ 腸内環境改善で幸せホルモンUP",
    ],
    avoidFoods: "砂糖の多い菓子は血糖値の急上昇→急降下でイライラを助長しやすい",
    warning: null,
    note: "エストロゲンの減少でセロトニン（幸せホルモン）も不足しがちになり、感情のコントロールが難しくなります。ホルモンのせいであって、性格のせいではありません。",
  },
  {
    id: 6,
    keyword: "不安",
    emoji: "🫧",
    title: "不安レスキュー",
    color: "#5B6E8A",
    lightColor: "#E8EDF3",
    selfCare: [
      "胸を開いてゆっくり深呼吸（4-7-8呼吸法）",
      "散歩5分（歩くリズムが自律神経を整える）",
      "「今できること」を1つだけ紙に書いてやる",
      "不安な気持ちを紙に書き出す（脳の外に出す）",
      "体を温める（半身浴・靴下・腹巻き）",
    ],
    acupoints: [
      { name: "労宮（ろうきゅう）", location: "手のひらの真ん中あたり（拳を握った時の中指の先）", effect: "不安感やざわつきを鎮め、安心感をもたらす" },
      { name: "合谷（ごうこく）", location: "手の甲、親指と人差し指の骨の付け根", effect: "万能ツボ。不安感の軽減に" },
      { name: "百会（ひゃくえ）", location: "頭のてっぺん", effect: "全身の気の流れを整え、精神安定" },
    ],
    foods: [
      "ヨーグルト・味噌・ぬか漬け → 腸内環境を整え、セロトニン生成を助ける（腸で約9割生成）",
      "納豆・魚・卵 → トリプトファン＋ビタミンB6でセロトニン合成",
      "バナナ → トリプトファン・ビタミンB6・マグネシウムが一度に取れる",
    ],
    avoidFoods: "過剰なカフェインは交感神経を刺激し不安を増幅させやすい",
    warning: "強い不安が続く、パニック症状がある場合は婦人科・心療内科へ",
    note: "自律神経のバランスが乱れると「漠然とした不安」が出やすくなります。合谷・百会などのツボ押しで自律神経を整えることが推奨されています。",
  },
  {
    id: 7,
    keyword: "落ち込み",
    emoji: "🌧️",
    title: "気分レスキュー",
    color: "#5A6B7E",
    lightColor: "#E6ECF2",
    selfCare: [
      "朝日を15分浴びる（セロトニン分泌を促す）",
      "体を動かす（ヨガ・ストレッチ・散歩なんでも）",
      "信頼できる人に話す（話すだけで脳が整理される）",
      "好きな香りを嗅ぐ（ラベンダー・柑橘系）",
      "「今日できたこと」を1つ書き出す",
    ],
    acupoints: [
      { name: "膻中（だんちゅう）", location: "左右の乳頭を結んだ線の真ん中", effect: "気の巡りを良くし、憂うつ感を和らげる" },
      { name: "百会（ひゃくえ）", location: "頭のてっぺん", effect: "精神安定・ストレス緩和" },
    ],
    foods: [
      "青魚（サバ・イワシ）→ オメガ3脂肪酸が気分を安定させる",
      "卵 → トリプトファン＋コリンが脳機能をサポート",
      "発酵食品 → 腸内環境を整え、セロトニン産生を助ける",
    ],
    avoidFoods: null,
    warning: "2週間以上続く、「何も楽しめない」「朝起き上がれない」は婦人科・心療内科へ",
    note: "エストロゲン減少はセロトニン不足につながり、意欲や幸福感が低下しやすくなります。自分を責めず、ホルモンの影響と理解することが大切です。",
  },
  {
    id: 8,
    keyword: "動悸",
    emoji: "💓",
    title: "動悸レスキュー",
    color: "#9B3B5E",
    lightColor: "#F5E4EC",
    selfCare: [
      "座るか横になって、ゆっくり深呼吸",
      "カフェインを減らす（コーヒーは1日2杯まで）",
      "こまめな水分補給",
      "手首で脈を測る習慣をつける（検脈）",
      "規則正しい生活リズムを意識する",
    ],
    acupoints: [
      { name: "内関（ないかん）", location: "手首内側のシワから指3本分ひじ側の中央", effect: "動悸・胸の不快感を和らげる代表ツボ" },
      { name: "神門（しんもん）", location: "手首内側のシワの小指側のくぼみ", effect: "心を落ち着かせ、動悸を鎮める" },
    ],
    foods: [
      "味噌汁 → ミネラル補給で水分バランスを整える",
      "豆腐・卵 → たんぱく質とイソフラボン",
      "ナッツ類 → マグネシウムが心臓のリズムを整える助けに",
    ],
    avoidFoods: "カフェイン・アルコール・過度な塩分は動悸を悪化させやすい",
    warning: "胸痛、息苦しさ、失神感、脈の乱れがある時はすぐに循環器内科を受診",
    note: "動悸は更年期症状として報告されていますが、心疾患や甲状腺疾患との区別が重要です。定期的な検脈が推奨されています。",
  },
  {
    id: 9,
    keyword: "めまい",
    emoji: "🌀",
    title: "めまいレスキュー",
    color: "#4A7B6B",
    lightColor: "#E2F1EC",
    selfCare: [
      "急に立ち上がらない（ゆっくり3拍で立つ）",
      "こまめな水分補給（脱水はめまいの原因に）",
      "ゆっくり深呼吸",
      "目を閉じて安定した場所に座る",
      "睡眠不足・過労を避ける",
    ],
    acupoints: [
      { name: "百会（ひゃくえ）", location: "頭のてっぺん", effect: "めまい・頭のぼんやりに。全身の気を整える" },
      { name: "風池（ふうち）", location: "耳の後ろの骨と後頭部のくぼみの中間", effect: "頭部への血流を改善しめまいを和らげる" },
    ],
    foods: [
      "卵・魚 → 良質たんぱく質で体力維持",
      "味噌汁 → 塩分・ミネラル・水分を同時に補給",
      "鉄分を含む食品（ほうれん草・小松菜・レバー）→ 貧血によるめまい予防",
    ],
    avoidFoods: null,
    warning: "強い回転感・ろれつが回らない・手足のしびれは脳疾患の可能性あり。すぐに受診",
    note: "更年期のめまいは自律神経の乱れによるものが多いですが、貧血・耳の疾患・脳疾患の可能性もあるため、症状がくり返す場合は受診をおすすめします。",
  },
  {
    id: 10,
    keyword: "頭痛",
    emoji: "🤕",
    title: "頭痛レスキュー",
    color: "#6E5B8A",
    lightColor: "#EDE6F4",
    selfCare: [
      "首・肩を温める（蒸しタオル・カイロ）※緊張型の場合",
      "暗めの静かな場所で休む※片頭痛の場合は冷やす",
      "目を休ませる（20分ごとに20秒遠くを見る）",
      "肩・首のストレッチ",
      "十分な水分補給（脱水は頭痛の原因に）",
    ],
    acupoints: [
      { name: "百会（ひゃくえ）", location: "頭のてっぺん", effect: "頭痛・めまい・自律神経の調整に" },
      { name: "風池（ふうち）", location: "耳の後ろの骨と後頭部のくぼみの中間", effect: "後頭部〜首の緊張をほぐす" },
      { name: "合谷（ごうこく）", location: "手の甲、親指と人差し指の骨の付け根", effect: "頭痛・歯痛など上半身の痛みに万能" },
    ],
    foods: [
      "魚 → オメガ3脂肪酸が炎症を抑え、頭痛軽減に",
      "ナッツ・ほうれん草 → マグネシウムが血管の緊張を緩める",
      "野菜・果物 → ビタミン・ミネラルで体調を整える",
    ],
    avoidFoods: "赤ワイン・チョコレート・チーズなどは片頭痛を誘発する人も",
    warning: "突然の激しい頭痛、発熱を伴う頭痛、日に日に悪化する頭痛は受診",
    note: "更年期の頭痛はエストロゲン変動と自律神経の乱れが関係します。緊張型と片頭痛では対処が異なるため、見極めが大切です。",
  },
  {
    id: 11,
    keyword: "関節痛",
    emoji: "🦴",
    title: "関節レスキュー",
    color: "#7A6B4A",
    lightColor: "#F2EDE2",
    selfCare: [
      "痛む部位を温める（蒸しタオル・入浴）",
      "痛くない範囲で軽く動かす（固まるのを防ぐ）",
      "長時間同じ姿勢を避ける（30分ごとに軽く動く）",
      "ストレッチやヨガで柔軟性を保つ",
      "体重管理（関節への負担を減らす）",
    ],
    acupoints: [
      { name: "三陰交（さんいんこう）", location: "内くるぶしから指4本上", effect: "ホルモンバランスと関節痛の両方に" },
      { name: "足三里（あしさんり）", location: "膝の皿の下から指4本下、すねの外側", effect: "全身の痛み・疲労に効く万能ツボ" },
    ],
    foods: [
      "魚 → オメガ3脂肪酸が関節の炎症を和らげる",
      "豆腐・小魚・ヨーグルト → カルシウムで骨を守る",
      "きのこ・鮭 → ビタミンDがカルシウムの吸収を助ける",
      "大豆製品 → イソフラボンが骨粗しょう症予防に",
    ],
    avoidFoods: null,
    warning: "腫れ・発熱・変形がある関節痛は整形外科・リウマチ科へ",
    note: "エストロゲンは関節の炎症を抑える作用があるため、減少すると関節痛が起きやすくなります。骨密度低下も同時に進むため、カルシウムとビタミンDの摂取が重要です。",
  },
  {
    id: 12,
    keyword: "肩こり",
    emoji: "💆",
    title: "肩こりレスキュー",
    color: "#5E7A6B",
    lightColor: "#E5F0EA",
    selfCare: [
      "肩甲骨回し（前後各10回）",
      "首〜肩を蒸しタオルで温める",
      "スマホ・PCは目の高さに近づける",
      "30分ごとに立ち上がって伸びる",
      "肩を耳まで上げて5秒→脱力を繰り返す",
    ],
    acupoints: [
      { name: "肩井（けんせい）", location: "首の付け根と肩先の中間のくぼみ", effect: "肩こりの代表ツボ。血流を改善する" },
      { name: "合谷（ごうこく）", location: "手の甲、親指と人差し指の骨の付け根", effect: "上半身の痛み・コリに広く効く" },
    ],
    foods: [
      "魚・卵 → たんぱく質＋ビタミンB群が筋肉の回復を助ける",
      "豆類・ナッツ → マグネシウムが筋肉の緊張を和らげる",
      "生姜 → 血行を促進し、コリの原因を改善",
    ],
    avoidFoods: null,
    warning: null,
    note: "更年期の肩こりは、エストロゲン低下による血行不良・自律神経の乱れ・筋力低下が複合的に影響します。",
  },
  {
    id: 13,
    keyword: "朝だるい",
    emoji: "😪",
    title: "朝だるレスキュー",
    color: "#8A7B4A",
    lightColor: "#F4F0E2",
    selfCare: [
      "起きたらまずカーテンを開けて光を入れる",
      "白湯やコップ1杯の水で内臓を目覚めさせる",
      "朝5分だけ外を歩く（短くてOK）",
      "前の晩のスマホ時間を30分減らしてみる",
      "朝食を抜かない（少量でもOK）",
    ],
    acupoints: [
      { name: "足三里（あしさんり）", location: "膝の皿の下から指4本下、すねの外側", effect: "全身の元気を底上げする" },
      { name: "湧泉（ゆうせん）", location: "足裏、指を曲げた時のくぼみ", effect: "朝の気力を引き出すツボ" },
    ],
    foods: [
      "卵・納豆 → 朝のたんぱく質が1日のエネルギーを支える",
      "味噌汁 → 温かい汁物で体を内側から起こす",
      "バナナ → 手軽にエネルギー＋トリプトファン補給",
    ],
    avoidFoods: null,
    warning: null,
    note: "朝のだるさは睡眠の質低下・ホルモン変動・副腎疲労が原因の場合があります。朝の光と軽い運動でリズムをリセットしましょう。",
  },
  {
    id: 14,
    keyword: "ぼんやり",
    emoji: "🧠",
    title: "脳ぼんやりレスキュー",
    color: "#5B5B8A",
    lightColor: "#E8E8F4",
    selfCare: [
      "やることを紙やメモアプリに書き出す（脳の負担を減らす）",
      "25分集中＋5分休憩（ポモドーロ法）",
      "軽く歩く（脳への血流がアップ）",
      "新しいことに挑戦する（脳への刺激）",
      "睡眠の質を上げる（脳の回復は睡眠中に起こる）",
    ],
    acupoints: [
      { name: "百会（ひゃくえ）", location: "頭のてっぺん", effect: "物忘れ・集中力低下に。頭をスッキリさせる" },
      { name: "風池（ふうち）", location: "後頭部のくぼみ", effect: "脳への血流を改善する" },
    ],
    foods: [
      "青魚（DHA・EPA）→ 脳の神経細胞の材料になる",
      "卵 → コリンが記憶力をサポートする",
      "大豆製品 → レシチンが脳機能を助ける",
      "クルミ → オメガ3脂肪酸が豊富な「脳の食品」",
    ],
    avoidFoods: "精製糖の多い食品は血糖値スパイクを起こし、集中力低下の原因に",
    warning: null,
    note: "ブレインフォグ（集中力・記憶力の低下）は更年期で一般的な症状です。エストロゲンは脳のセロトニンやアセチルコリンにも関わっており、減少すると認知機能に影響が出ることがあります。",
  },
  {
    id: 15,
    keyword: "集中力",
    emoji: "🎯",
    title: "集中レスキュー",
    color: "#3B6B8A",
    lightColor: "#E0EEF5",
    selfCare: [
      "25分だけタイマーをセットして集中",
      "スマホの通知をオフにする",
      "深呼吸30秒で脳に酸素を送る",
      "デスクを片付ける（視覚ノイズを減らす）",
      "ガムを噛む（咀嚼が脳への血流を増やす）",
    ],
    acupoints: [
      { name: "百会（ひゃくえ）", location: "頭のてっぺん", effect: "集中力UP・頭をクリアに" },
      { name: "合谷（ごうこく）", location: "手の甲、親指と人差し指の付け根", effect: "気の巡りを整え、頭をスッキリ" },
    ],
    foods: [
      "卵 → コリン＋良質たんぱく質で脳を支える",
      "ナッツ類 → 良質な脂質＋マグネシウムで脳機能をサポート",
      "魚 → DHA・EPAが脳の働きを助ける",
    ],
    avoidFoods: null,
    warning: null,
    note: null,
  },
  {
    id: 16,
    keyword: "便秘",
    emoji: "🍵",
    title: "便秘レスキュー",
    color: "#6B8A4A",
    lightColor: "#EDF4E2",
    selfCare: [
      "朝起きたらコップ1杯の水（腸を刺激）",
      "軽い散歩（腸のぜん動運動を促す）",
      "お腹を「の」の字にやさしくさする",
      "朝食後にトイレタイムをつくる（習慣化）",
      "ストレスを溜めない（自律神経と腸は連動）",
    ],
    acupoints: [
      { name: "天枢（てんすう）", location: "おへその左右、指3本分外側", effect: "消化器系の万能ツボ。腸の動きを整える" },
      { name: "支溝（しこう）", location: "手の甲側、手首から指4本分ひじ寄りの中央", effect: "水分と気の巡りを促し、ストレス性便秘にも" },
    ],
    foods: [
      "きのこ・海藻・オートミール → 食物繊維が腸を動かす",
      "ヨーグルト・味噌 → 善玉菌を増やし腸内環境を整える",
      "オリーブオイル → 腸の潤滑剤として便の滑りを良くする",
    ],
    avoidFoods: null,
    warning: "1週間以上の頑固な便秘、血便がある場合は消化器内科へ",
    note: "更年期ではホルモン変動と自律神経の乱れで腸の動きが鈍くなりやすいです。食物繊維と水分の意識的な摂取が推奨されます。",
  },
  {
    id: 17,
    keyword: "むくみ",
    emoji: "🫧",
    title: "むくみレスキュー",
    color: "#4A7B8A",
    lightColor: "#E2F0F5",
    selfCare: [
      "足首をくるくる回す（左右各10回）",
      "30分に1回は立ち上がって少し歩く",
      "寝る前に足を高くして横になる（5分）",
      "ふくらはぎをやさしくさする（下→上）",
      "塩分を控えめにする",
    ],
    acupoints: [
      { name: "陰陵泉（いんりょうせん）", location: "膝の内側を下にたどり、太い骨にぶつかるところ", effect: "「湿気取りのツボ」。むくみ解消の代表ツボ" },
      { name: "三陰交（さんいんこう）", location: "内くるぶしから指4本上", effect: "水分代謝＋ホルモンバランスを同時に整える" },
    ],
    foods: [
      "カリウムの多い食品（バナナ・アボカド・ほうれん草）→ 余分な塩分を排出",
      "豆類・海藻 → ミネラル＋食物繊維で水分バランスを調整",
      "スイカ・きゅうり → 利尿作用で余分な水分を排出",
    ],
    avoidFoods: "塩分の摂りすぎは水分をため込む原因に",
    warning: "片足だけの急なむくみ、息苦しさを伴うむくみは受診",
    note: "更年期ではホルモン変動による水分バランスの乱れや、筋力低下によるポンプ機能の低下がむくみの原因になります。",
  },
  {
    id: 18,
    keyword: "太る",
    emoji: "⚖️",
    title: "体重レスキュー",
    color: "#7A5B4A",
    lightColor: "#F2EAE2",
    selfCare: [
      "食後10分のウォーキング（血糖値コントロール）",
      "毎食たんぱく質を手のひら1枚分とる",
      "極端な糖質制限を避ける（筋肉が落ちる）",
      "筋トレを週2〜3回（スクワットから）",
      "よく噛んで食べる（1口20回目安）",
    ],
    acupoints: [
      { name: "足三里（あしさんり）", location: "膝の皿の下から指4本下、すねの外側", effect: "代謝UP・胃腸を整える" },
      { name: "天枢（てんすう）", location: "おへその左右、指3本分外側", effect: "腸の動きを整え、代謝を促進" },
    ],
    foods: [
      "魚・卵・豆腐 → 良質たんぱく質で筋肉を維持し基礎代謝をキープ",
      "野菜（食事の最初に）→ 食物繊維で血糖値の急上昇を防ぐ",
      "玄米・もち麦 → GI値が低く、腹持ちが良い",
    ],
    avoidFoods: "甘い飲み物・菓子パン・揚げ物の頻度を減らす",
    warning: null,
    note: "更年期ではエストロゲン減少で内臓脂肪がつきやすくなり、基礎代謝も約10%低下します。激しいダイエットより「筋肉を守る食事＋軽い筋トレ」が推奨されます。",
  },
  {
    id: 19,
    keyword: "乾燥",
    emoji: "🩹",
    title: "乾燥レスキュー",
    color: "#8A5B6B",
    lightColor: "#F4E4EA",
    selfCare: [
      "我慢せず婦人科に相談する（恥ずかしくない）",
      "市販の保湿剤や潤滑ゼリーも選択肢",
      "洗いすぎを避ける（石鹸は外陰部のみに）",
      "通気性の良い下着を選ぶ",
    ],
    acupoints: [
      { name: "三陰交（さんいんこう）", location: "内くるぶしから指4本上", effect: "女性のツボ。婦人科全般に" },
      { name: "関元（かんげん）", location: "おへそから指4本下", effect: "下腹部の血行を促し、泌尿器・婦人科に" },
    ],
    foods: [
      "魚 → オメガ3脂肪酸が粘膜の潤いを助ける",
      "大豆製品 → イソフラボンが女性ホルモン様作用",
      "ナッツ・アボカド → 良質な脂質が全身の潤いを保つ",
    ],
    avoidFoods: null,
    warning: "かゆみ・おりものの変化・痛みがある場合は婦人科へ",
    note: "腟乾燥・性交痛は更年期の代表的症状ですが、受診率が低いとされています。HRT（ホルモン補充療法）の局所治療など有効な治療があります。",
  },
  {
    id: 20,
    keyword: "尿もれ",
    emoji: "🚿",
    title: "尿もれレスキュー",
    color: "#4A6B7A",
    lightColor: "#E2EDF2",
    selfCare: [
      "骨盤底筋トレーニング：仰向けで膝を立て、肛門・腟を「キュッ」と5秒締めて緩める×10回",
      "姿勢を正す（インナーユニットが連動して骨盤底筋をサポート）",
      "カフェインを控えめに（利尿作用で頻尿に）",
      "便秘を解消する（いきみは骨盤底に負担）",
    ],
    acupoints: [
      { name: "関元（かんげん）", location: "おへそから指4本下", effect: "泌尿器・婦人科系の代表ツボ" },
      { name: "三陰交（さんいんこう）", location: "内くるぶしから指4本上", effect: "冷え改善＋泌尿器系のサポート" },
    ],
    foods: [
      "たんぱく質（肉・魚・卵・大豆）→ 骨盤底筋を含む筋肉の維持に",
      "十分な水分（1日1.5L目安）→ 水分を減らしすぎると膀胱が過敏に",
    ],
    avoidFoods: "カフェイン・アルコール・炭酸飲料は膀胱を刺激しやすい",
    warning: "痛み・血尿・排尿困難がある場合は泌尿器科へ",
    note: "骨盤底筋はエストロゲン低下で弱くなります。毎日の骨盤底筋トレーニングで尿もれの予防・改善が期待できます。インナーユニット（骨盤底筋・横隔膜・腹横筋・多裂筋）の連動を意識することが大切です。",
  },
];

const CATEGORIES = [
  { label: "全て", filter: null, emoji: "✨" },
  { label: "睡眠", filter: [1, 3, 13], emoji: "🌙" },
  { label: "こころ", filter: [5, 6, 7], emoji: "💭" },
  { label: "からだ", filter: [2, 4, 8, 9, 10, 11, 12], emoji: "🫀" },
  { label: "あたま", filter: [14, 15], emoji: "🧠" },
  { label: "おなか", filter: [16, 17, 18], emoji: "🍵" },
  { label: "その他", filter: [19, 20], emoji: "🩹" },
];

/* ─── Breathing Timer ─── */
function BreathingTimer({ onClose }) {
  const [phase, setPhase] = useState("inhale"); // inhale(4s) → hold(7s) → exhale(8s)
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(1); // 1, 2, 3
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setCount((c) => {
        const newCount = c - 1;
        if (newCount <= 0) {
          // Move to next phase
          if (phase === "inhale") {
            setPhase("hold");
            return 7;
          } else if (phase === "hold") {
            setPhase("exhale");
            return 8;
          } else {
            // After exhale, check if more cycles
            if (cycle < 3) {
              setCycle(cycle + 1);
              setPhase("inhale");
              return 4;
            } else {
              // All 3 cycles done
              clearInterval(intervalRef.current);
              setIsRunning(false);
              return 0;
            }
          }
        }
        return newCount;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning, phase, cycle]);

  const getPhaseLabel = () => {
    if (phase === "inhale") return "4秒吸って…";
    if (phase === "hold") return "7秒止めて…";
    return "8秒吐いて…";
  };

  const s = phase === "inhale" ? 1 + (4 - count) * 0.15 : phase === "hold" ? 1.6 : 1.6 - (8 - count) * 0.08;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "linear-gradient(160deg,#2D1B4E 0%,#1A1A2E 50%,#16213E 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Zen Maru Gothic',sans-serif" }}>
      <button onClick={onClose} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "rgba(255,255,255,.6)", fontSize: 28, cursor: "pointer" }}>✕</button>
      <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>4-7-8呼吸法</p>
      <p style={{ color: "rgba(255,255,255,.9)", fontSize: 20, marginBottom: 40 }}>{getPhaseLabel()}</p>
      <div style={{ width: 160 * s, height: 160 * s, borderRadius: "50%", background: phase === "exhale" ? "radial-gradient(circle,rgba(180,140,200,.5),rgba(130,90,160,.2))" : "radial-gradient(circle,rgba(139,180,210,.5),rgba(90,130,170,.2))", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 1s ease-in-out", boxShadow: `0 0 ${60 * s}px rgba(139,180,210,.3)` }}>
        <span style={{ color: "#fff", fontSize: 48, fontWeight: 300 }}>{count}</span>
      </div>
      <p style={{ color: "rgba(255,255,255,.4)", fontSize: 14, marginTop: 40 }}>サイクル {cycle}/3</p>
      {!isRunning && cycle === 3 && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p style={{ color: "#B8D4E3", fontSize: 18 }}>おつかれさまでした 🌿</p>
          <button onClick={onClose} style={{ marginTop: 16, padding: "12px 32px", borderRadius: 24, background: "rgba(255,255,255,.15)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", fontSize: 15, cursor: "pointer" }}>もどる</button>
        </div>
      )}
    </div>
  );
}

/* ─── Symptom Card ─── */
function SymptomCard({ symptom, onOpen }) {
  return (
    <button onClick={() => onOpen(symptom)} style={{ display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "16px 18px", background: "#fff", border: "none", borderRadius: 16, cursor: "pointer", textAlign: "left", boxShadow: "0 2px 12px rgba(0,0,0,.04)", transition: "transform .15s" }}
      onPointerDown={e => e.currentTarget.style.transform = "scale(0.97)"}
      onPointerUp={e => e.currentTarget.style.transform = "scale(1)"}
      onPointerLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      <div style={{ width: 50, height: 50, borderRadius: 14, background: symptom.lightColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{symptom.emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 16, fontWeight: 600, color: "#2D2D3A", lineHeight: 1.3 }}>{symptom.title}</div>
        <div style={{ fontSize: 12, color: "#9B9BAA", marginTop: 3 }}>タップして1分ケアを見る</div>
      </div>
      <div style={{ color: "#CBCBD4", fontSize: 18, flexShrink: 0 }}>›</div>
    </button>
  );
}

/* ─── Section Component ─── */
function Section({ icon, title, bg, delay, children }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ background: bg || "#fff", borderRadius: 20, padding: "22px 20px", marginBottom: 16, boxShadow: "0 2px 12px rgba(0,0,0,.04)", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(12px)", transition: "all .35s ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <span style={{ fontSize: 17 }}>{icon}</span>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#2D2D3A" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

/* ─── Detail View ─── */
function DetailView({ symptom, onClose, onBreathing }) {
  const showBreathBtn = ["不眠","不安","イライラ","動悸","落ち込み"].includes(symptom.keyword);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "#F6F5F0", overflowY: "auto", WebkitOverflowScrolling: "touch", fontFamily: "'Zen Maru Gothic','Hiragino Maru Gothic Pro',sans-serif" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg,${symptom.color},${symptom.color}CC)`, padding: "20px 20px 32px", color: "#fff", borderRadius: "0 0 28px 28px" }}>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,.2)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, cursor: "pointer", marginBottom: 12 }}>←</button>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{symptom.emoji}</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{symptom.title}</h2>
        <p style={{ fontSize: 13, opacity: .8, margin: "6px 0 0" }}>更年期の「{symptom.keyword}」に</p>
      </div>

      <div style={{ padding: "24px 20px 100px" }}>
        {/* Self Care */}
        <Section icon="⚡" title="今日できるセルフケア" delay={100}>
          {symptom.selfCare.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: i < symptom.selfCare.length - 1 ? "1px solid #F0F0F0" : "none" }}>
              <span style={{ background: symptom.lightColor, color: symptom.color, borderRadius: 8, width: 26, height: 26, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</span>
              <span style={{ fontSize: 14.5, color: "#3A3A4A", lineHeight: 1.65 }}>{item}</span>
            </div>
          ))}
        </Section>

        {/* Breathing */}
        {showBreathBtn && (
          <button onClick={onBreathing} style={{ width: "100%", padding: "16px", borderRadius: 16, background: `linear-gradient(135deg,${symptom.color}22,${symptom.color}11)`, border: `1.5px solid ${symptom.color}33`, cursor: "pointer", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: symptom.color, fontWeight: 600 }}>🫁 1分間呼吸タイマーを使う</div>
          </button>
        )}

        {/* Acupoints */}
        {symptom.acupoints && (
          <Section icon="📍" title="おすすめツボ" delay={200}>
            {symptom.acupoints.map((ap, i) => (
              <div key={i} style={{ padding: "12px 0", borderBottom: i < symptom.acupoints.length - 1 ? "1px solid #F0F0F0" : "none" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: symptom.color, marginBottom: 4 }}>{ap.name}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6, marginBottom: 3 }}>📌 場所：{ap.location}</div>
                <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>✨ {ap.effect}</div>
              </div>
            ))}
            <div style={{ marginTop: 12, padding: "10px 14px", background: "#F8F7F2", borderRadius: 12, fontSize: 12, color: "#8A8A8A", lineHeight: 1.6 }}>
              💡 押し方：親指の腹で心地よい強さで5秒 × 5回。息を吐きながらゆっくり押す
            </div>
          </Section>
        )}

        {/* Foods */}
        <Section icon="🥗" title="おすすめ食べ物" delay={300}>
          {symptom.foods.map((food, i) => (
            <div key={i} style={{ fontSize: 14, color: "#3A3A4A", lineHeight: 1.7, padding: "8px 0 8px 10px", borderLeft: `3px solid ${symptom.lightColor}`, marginBottom: 8 }}>
              {food}
            </div>
          ))}
          {symptom.avoidFoods && (
            <div style={{ marginTop: 8, padding: "10px 14px", background: "#FFF8F0", borderRadius: 12, fontSize: 13, color: "#8B6914", lineHeight: 1.6 }}>
              🚫 {symptom.avoidFoods}
            </div>
          )}
        </Section>

        {/* Warning */}
        {symptom.warning && (
          <div style={{ background: "#FFF8F0", borderRadius: 16, padding: "16px 18px", marginBottom: 16, border: "1px solid #F5E6D0", display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#8B6914", marginBottom: 4 }}>受診の目安</div>
              <span style={{ fontSize: 14, color: "#8B6914", lineHeight: 1.6 }}>{symptom.warning}</span>
            </div>
          </div>
        )}

        {/* Note */}
        {symptom.note && (
          <div style={{ background: "#F5F5F0", borderRadius: 16, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#7A7A8A", marginBottom: 4 }}>💡 知っておきたいこと</div>
            <span style={{ fontSize: 13, color: "#7A7A8A", lineHeight: 1.7 }}>{symptom.note}</span>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid rgba(0,0,0,.08)", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#3A3530", margin: "0 0 4px 0" }}>元・不調ママ式１分レスキュー</p>
          <p style={{ fontSize: 11, color: "#9B9088", margin: "0" }}>更年期の不調を、今この瞬間からやさしくケアする</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [showBreathing, setShowBreathing] = useState(false);

  const filtered = SYMPTOMS.filter((s) => {
    const catFilter = CATEGORIES[activeCategory].filter;
    const inCat = catFilter === null || catFilter.includes(s.id);
    return inCat;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#F6F5F0", fontFamily: "'Zen Maru Gothic','Hiragino Maru Gothic Pro',sans-serif", maxWidth: 480, margin: "0 auto", position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#F9F1E8 0%,#F0E8DD 100%)", padding: "24px 20px 20px", borderRadius: "0 0 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 28 }}>🌿</span>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#3A3530", letterSpacing: .5 }}>元・不調ママ式｜更年期１分レスキュー</h1>
        </div>

        <p style={{ margin: "12px 0 16px", fontSize: 13, color: "#7A7068", lineHeight: 1.6 }}>つらい症状をタップ → セルフケア・ツボ・食べ物がすぐ見つかります</p>


      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", gap: 6, padding: "16px 20px 8px", overflowX: "auto", WebkitOverflowScrolling: "touch", msOverflowStyle: "none", scrollbarWidth: "none" }}>
        {CATEGORIES.map((cat, i) => (
          <button key={i} onClick={() => setActiveCategory(i)}
            style={{ padding: "8px 14px", borderRadius: 20, border: "none", background: activeCategory === i ? "#3A3530" : "#fff", color: activeCategory === i ? "#fff" : "#7A7068", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: activeCategory === i ? "0 2px 8px rgba(58,53,48,.2)" : "0 1px 4px rgba(0,0,0,.04)", transition: "all .2s", fontFamily: "inherit" }}>
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* Symptom List */}
      <div style={{ padding: "12px 20px 0", display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: "#9B9BAA", fontSize: 14 }}>該当する症状が見つかりません</div>}
        {filtered.map(s => <SymptomCard key={s.id} symptom={s} onOpen={setSelectedSymptom} />)}
      </div>

      {/* Disclaimer & Footer */}
      <div style={{ padding: "32px 20px", textAlign: "center" }}>
        <p style={{ fontSize: 11, color: "#B0A8A0", lineHeight: 1.7, marginBottom: 16 }}>
          ※ このアプリは医療アドバイスではありません。<br />
          症状が続く場合は医療機関を受診してください。<br />
          「治る」保証はなく、「ラクになる人もいます」という範囲の情報です。<br />
          ツボは心地よい強さで行い、強く押しすぎないでください。
        </p>
        <div style={{ paddingTop: 16, borderTop: "1px solid rgba(0,0,0,.08)" }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#3A3530", margin: "12px 0 4px" }}>元・不調ママ式１分レスキュー</p>
          <p style={{ fontSize: 11, color: "#9B9088", margin: "0" }}>更年期の不調を、今この瞬間からやさしくケアする</p>
        </div>
      </div>

      {selectedSymptom && <DetailView symptom={selectedSymptom} onClose={() => setSelectedSymptom(null)} onBreathing={() => setShowBreathing(true)} />}
      {showBreathing && <BreathingTimer onClose={() => setShowBreathing(false)} />}
    </div>
  );
}
