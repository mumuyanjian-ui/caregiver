const destinations = [
  {
    id: "chaozhou-ancient-city",
    name: "潮州古城",
    region: "潮州",
    tag: "古城漫游",
    highlight: "牌坊街、广济桥、韩文公祠一线可步行串联",
    bestFor: "第一次来潮汕、喜欢古城和非遗体验",
    vibe: "茶香、牌坊、城门和夜景很集中",
    foods: ["牛肉丸", "腐乳饼", "潮州生腌", "鸭母捻"],
    stay: "建议住在牌坊街周边，夜游和早茶更方便"
  },
  {
    id: "nan-ao-island",
    name: "南澳岛",
    region: "汕头",
    tag: "海岛度假",
    highlight: "环岛自驾、灯塔拍照、海边日落体验很完整",
    bestFor: "情侣、家庭、想放慢节奏的周末游",
    vibe: "海风轻松，适合看海、骑行和吃海鲜",
    foods: ["海鲜砂锅粥", "紫菜炒饭", "鱼饭", "生蚝"],
    stay: "建议至少住 1 晚，避开往返赶路"
  },
  {
    id: "xiaogongyuan",
    name: "小公园开埠区",
    region: "汕头",
    tag: "城市人文",
    highlight: "骑楼、老商埠和夜间灯光很适合 City Walk",
    bestFor: "拍照打卡、美食密集探索、半日短途",
    vibe: "南洋复古感强，步行体验好",
    foods: ["粿条汤", "蚝烙", "卤鹅", "反沙芋头"],
    stay: "建议下午到晚上连逛，夜景更出片"
  },
  {
    id: "chenghai-toy",
    name: "澄海玩具创意线",
    region: "汕头",
    tag: "亲子工厂",
    highlight: "适合亲子和玩具产业体验，路线相对新鲜",
    bestFor: "亲子家庭、想做差异化内容的人群",
    vibe: "轻工业参观 + 亲子互动",
    foods: ["猪肠胀糯米", "卤水拼盘", "甜汤"],
    stay: "更适合白天行程，可与市区组合"
  },
  {
    id: "jieyang-academy",
    name: "揭阳学宫与古城",
    region: "揭阳",
    tag: "文化慢游",
    highlight: "学宫、城隍庙、进贤门一带适合慢逛",
    bestFor: "喜欢文化遗迹、节奏安静的游客",
    vibe: "文庙气质浓，适合半天沉浸式体验",
    foods: ["乒乓粿", "普宁豆干", "揭阳粿汁"],
    stay: "适合与潮州串成双城路线"
  }
];

const travelThemes = [
  {
    key: "food",
    title: "为吃而来",
    subtitle: "牛肉火锅、生腌、粿品、卤鹅都值得排进日程",
    suggestion: "优先安排小公园和潮州古城，夜间选择更多。"
  },
  {
    key: "culture",
    title: "古城文化",
    subtitle: "更适合慢节奏散步、喝茶、看桥和逛祠堂",
    suggestion: "潮州古城 + 揭阳古城可以做 2 天一线。"
  },
  {
    key: "sea",
    title: "海边放空",
    subtitle: "适合看灯塔、吹海风、住一晚",
    suggestion: "南澳岛尽量安排 2 天 1 夜，不建议只赶景点。"
  },
  {
    key: "family",
    title: "亲子轻旅行",
    subtitle: "路线要简单，活动密度不要太高",
    suggestion: "澄海玩具线 + 汕头市区更适合带孩子。"
  }
];

const routeLibrary = {
  "chaozhou-ancient-city": {
    overview: {
      label: "玩法总览",
      description: "适合第一次到潮州的用户，从牌坊街切入最稳。",
      steps: [
        { title: "上午到古城", location: "牌坊街南入口", action: "先熟悉主轴路线", notice: "建议穿舒适鞋，步行为主。" },
        { title: "中段看桥和祠堂", location: "广济桥、韩文公祠", action: "安排文化线拍照和讲解", notice: "傍晚广济桥光线更好。" },
        { title: "晚上回牌坊街", location: "牌坊街夜市段", action: "集中吃小吃和买手信", notice: "节假日人流大，尽量错峰。" }
      ]
    },
    route: {
      label: "一日路线",
      description: "把最经典的古城步行线压缩成一条好走路线。",
      steps: [
        { title: "广济楼出发", location: "广济门城楼", action: "打卡城门并进入古城", notice: "适合作为起点定位。" },
        { title: "牌坊街慢逛", location: "太平路", action: "喝茶、买伴手礼、看牌坊", notice: "中午店铺最齐全。" },
        { title: "韩江边收尾", location: "广济桥周边", action: "看江景、等夜色", notice: "夜游体验明显更好。" }
      ]
    },
    food: {
      label: "吃什么",
      description: "古城更适合边走边吃，甜咸都很集中。",
      steps: [
        { title: "早茶开场", location: "古城茶馆", action: "先安排工夫茶或粿品", notice: "上午氛围最舒服。" },
        { title: "小吃补给", location: "牌坊街支巷", action: "鸭母捻、春卷、腐乳饼", notice: "建议少量多样。" },
        { title: "晚餐压轴", location: "潮州菜馆", action: "尝卤水、鱼饭、砂锅粥", notice: "热门店建议提前排号。" }
      ]
    },
    transport: {
      label: "怎么走",
      description: "古城内部更适合步行，停车和打车需要提前规划。",
      steps: [
        { title: "高铁到潮汕站", location: "潮汕站", action: "转网约车到古城", notice: "节假日排队会久一些。" },
        { title: "古城步行游览", location: "牌坊街片区", action: "主景点之间尽量步行", notice: "小巷多，导航时留意方向。" },
        { title: "夜间返程", location: "古城出口", action: "提前叫车，避免高峰拥堵", notice: "晚高峰很难即叫即走。" }
      ]
    }
  },
  "nan-ao-island": {
    overview: {
      label: "玩法总览",
      description: "适合把海景、自驾和海鲜组合成 2 天 1 夜。",
      steps: [
        { title: "中午上岛", location: "南澳大桥", action: "避开清晨拥堵", notice: "旺季桥上车流大。" },
        { title: "下午环岛", location: "灯塔与观景点", action: "走拍照和观海路线", notice: "防晒一定要做足。" },
        { title: "晚上住岛上", location: "后宅或青澳湾", action: "吃海鲜看夜海", notice: "住宿建议提早预订。" }
      ]
    },
    route: {
      label: "一日路线",
      description: "如果时间紧，可以压缩成海岛快线。",
      steps: [
        { title: "青澳湾看海", location: "青澳湾", action: "先去海边主景区", notice: "上午海色更透亮。" },
        { title: "打卡灯塔", location: "长山尾灯塔等", action: "拍照停留", notice: "不同灯塔间需要驾车切换。" },
        { title: "海鲜晚餐", location: "后宅镇", action: "回主镇觅食", notice: "海鲜按斤点单留意价格。" }
      ]
    },
    food: {
      label: "吃什么",
      description: "重点是海鲜和海边热食。",
      steps: [
        { title: "海鲜午餐", location: "沿海餐厅", action: "点当季贝类和鱼虾", notice: "先看活鲜再点单。" },
        { title: "下午饮品", location: "海边咖啡店", action: "休息看海", notice: "拍照位通常靠窗。" },
        { title: "夜宵加餐", location: "后宅镇", action: "海鲜粥或烧烤", notice: "别把行程塞太满。" }
      ]
    },
    transport: {
      label: "怎么走",
      description: "最适合自驾，其次包车。",
      steps: [
        { title: "跨桥上岛", location: "南澳大桥", action: "自驾或包车", notice: "节假日进岛时间要预留。" },
        { title: "环岛移动", location: "各观景点", action: "用车串联多个灯塔", notice: "公共交通不如自驾灵活。" },
        { title: "返程下岛", location: "南澳大桥出口", action: "避开傍晚高峰", notice: "提前查看路况。" }
      ]
    }
  }
};

const itineraryStages = ["偏好收集", "AI生成路线", "美食筛选", "交通补全", "行程确认"];

module.exports = {
  destinations,
  travelThemes,
  routeLibrary,
  itineraryStages
};
