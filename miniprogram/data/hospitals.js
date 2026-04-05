const hospitals = [
  {
    id: "zs-1",
    name: "中山大学附属第一医院（总院）",
    district: "越秀区",
    address: "越秀区中山二路58号",
    phone: "020-87755766",
    subway: "1号线东山口站E口",
    walkingDistance: "300米",
    peakHours: "7:30-9:30 极堵",
    coreDepartments: ["综合", "重症", "神经"],
    escortAdvice: "建议早到占位，优先手机缴费和预约挂号",
    detailed: true
  },
  {
    id: "gd-rm",
    name: "广东省人民医院",
    district: "越秀区",
    address: "越秀区中山二路106号",
    phone: "020-83827812",
    subway: "1号线烈士陵园站B口",
    walkingDistance: "400米",
    peakHours: "8:00-10:00",
    coreDepartments: ["心内", "心外", "老年病"],
    escortAdvice: "电梯紧张，老年患者建议全程陪同",
    detailed: false
  },
  {
    id: "gd-zy",
    name: "广东省中医院（总院）",
    district: "越秀区",
    address: "越秀区大德路111号",
    phone: "020-81887233",
    subway: "1号线西门口站C口",
    walkingDistance: "600米",
    peakHours: "8:00-10:30",
    coreDepartments: ["中医全科", "针灸", "康复"],
    escortAdvice: "取药排队久，适合做中药取药提醒",
    detailed: false
  },
  {
    id: "gz-3y",
    name: "广州医科大学附属第三医院（多宝院区）",
    district: "荔湾区",
    address: "荔湾区多宝路63号",
    phone: "020-81292183",
    subway: "6/11号线如意坊站B口",
    walkingDistance: "约450米",
    peakHours: "8:00-9:30",
    coreDepartments: ["产科", "生殖"],
    escortAdvice: "孕产用户多，适合提供快速报到引导",
    detailed: false
  },
  {
    id: "zj-yy",
    name: "南方医科大学珠江医院",
    district: "海珠区",
    address: "海珠区工业大道中253号",
    phone: "020-61643888",
    subway: "8号线宝岗大道站D口",
    walkingDistance: "约650米",
    peakHours: "8:00-10:00",
    coreDepartments: ["儿科", "神经", "心内"],
    escortAdvice: "儿科夜间门诊需求高，建议突出排队提醒",
    detailed: false
  },
  {
    id: "nf-yy",
    name: "南方医科大学南方医院",
    district: "白云区",
    address: "白云区广州大道北1838号",
    phone: "020-61641888",
    subway: "3号线京溪南方医院站C口",
    walkingDistance: "100米",
    peakHours: "7:30-10:00",
    coreDepartments: ["综合", "肾病", "消化"],
    escortAdvice: "地铁直达院内，适合老人就医",
    detailed: false
  }
];

module.exports = {
  hospitals
};

