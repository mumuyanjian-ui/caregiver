const processLibrary = {
  registration: {
    label: "挂号",
    description: "优先引导用户选择最快的挂号方式，并明确建档、报到和当日号路径。",
    steps: [
      {
        title: "预约挂号",
        location: "手机端 / 掌上中山一院",
        action: "实名注册后选择科室、缴费，成功后凭就诊码报到。",
        notice: "提前7天8:00放号，优先推荐线上预约。"
      },
      {
        title: "自助机挂号",
        location: "1-8楼自助机",
        action: "插身份证或医保卡，选择预约或当日号，缴费后打印凭条。",
        notice: "适合现场补挂号、老人协助操作。"
      },
      {
        title: "人工窗口挂号",
        location: "1楼大厅左侧",
        action: "携带身份证或医保卡，人工选择科室并完成缴费。",
        notice: "当日号7:30-17:00可挂，高峰期排队较长。"
      },
      {
        title: "建档办卡",
        location: "1楼客服中心",
        action: "无诊疗卡用户先建档，再进入挂号流程。",
        notice: "第一次就诊用户需要优先完成此步骤。"
      }
    ]
  },
  inspection: {
    label: "检查",
    description: "把开单、缴费、排队、报告四个动作串起来，减少用户在院内反复询问。",
    steps: [
      {
        title: "抽血 / 常规检验",
        location: "7楼检验室",
        action: "医生开单后先缴费，再按号排队抽血或送检。",
        notice: "做完后可在自助报告机打印报告。"
      },
      {
        title: "心电图",
        location: "7楼",
        action: "完成缴费后到心电图室检查，当场出报告。",
        notice: "可提醒用户把报告直接带回诊室复诊。"
      },
      {
        title: "B超 / 彩超",
        location: "4楼，妇科B超在5楼",
        action: "开单后预约并缴费，再按预约时间候检。",
        notice: "不是现场即做，时间提醒要明显。"
      },
      {
        title: "CT / MRI / 放射",
        location: "1楼 / 2号楼影像科",
        action: "开单后先预约，再缴费并按时检查。",
        notice: "用户最容易迷路，建议在页面里突出路线和楼栋。"
      },
      {
        title: "内镜",
        location: "2楼内镜中心",
        action: "必须提前预约，按预约时间到场检查。",
        notice: "要重点提示空腹和预约要求。"
      }
    ]
  },
  pharmacy: {
    label: "取药",
    description: "围绕西药、中药和急诊药设置快捷任务，让用户知道该去哪里、怎么核对。",
    steps: [
      {
        title: "西药取药",
        location: "2楼东侧西药房",
        action: "先缴费，再到药房扫码报到，等叫号取药。",
        notice: "核对姓名、药名、剂量、用法和有效期。"
      },
      {
        title: "中药取药",
        location: "2楼西侧中药房",
        action: "完成缴费后凭处方排队取药。",
        notice: "中药取药排队时间通常更长。"
      },
      {
        title: "急诊药",
        location: "1楼急诊药房",
        action: "急诊缴费后直接到急诊药房取药。",
        notice: "仅限急诊患者使用该路径。"
      }
    ]
  },
  report: {
    label: "报告打印",
    description: "把打印位置、复诊预约和资料整理连成一个闭环。",
    steps: [
      {
        title: "打印报告",
        location: "1楼 / 2楼自助报告机",
        action: "扫码或插卡打印检验、影像报告。",
        notice: "建议按检查时间顺序整理，方便复诊。"
      },
      {
        title: "复诊预约",
        location: "诊室 / 自助机 / 公众号",
        action: "根据医生建议直接预约下次号源。",
        notice: "复查场景可顺手完成预约。"
      },
      {
        title: "资料归档",
        location: "完成后带走",
        action: "整理病历、处方、检查单、发票和报告。",
        notice: "术后和肿瘤复诊场景尤其重要。"
      }
    ]
  }
};

const sopStages = [
  "接单确认",
  "联系客户",
  "资料提醒",
  "到院挂号",
  "问诊协助",
  "检查陪同",
  "取药核对",
  "报告整理",
  "安全送返",
  "24小时回访"
];

module.exports = {
  processLibrary,
  sopStages
};
