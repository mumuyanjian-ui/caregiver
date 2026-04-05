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
    detailed: true,
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
  },
];

const departmentMatches = [
  {
    type: "产科 / 妇科 / 生殖",
    recommendations: [
      "广州医科大学附属第三医院（多宝院区）",
      "广东省妇幼保健院（越秀院区）",
      "广州市妇女儿童医疗中心（珠江新城）",
    ],
    note: "产科及生殖需求高，适合做预约+报到引导。",
  },
  {
    type: "儿科 / 儿童康复",
    recommendations: ["广州市妇女儿童医疗中心（儿童院区）", "南方医科大学珠江医院"],
    note: "儿童哭闹多，流程里要加入安抚和轮椅/推车提醒。",
  },
  {
    type: "老年病 / 慢病 / 陪护",
    recommendations: ["广东省人民医院", "南方医科大学南方医院", "广州市第一人民医院（院本部）"],
    note: "适合重点提供向导、搀扶、取药和复诊提醒。",
  },
  {
    type: "肿瘤 / 化疗 / 术后",
    recommendations: ["中山大学附属肿瘤医院（总院）", "广东省中医院（总院）"],
    note: "资料复杂，建议表单里增加既往病历和用药提醒。",
  },
  {
    type: "骨科 / 运动损伤 / 术后",
    recommendations: ["南方医科大学第三附属医院", "广州市红十字会医院"],
    note: "行动不便场景多，轮椅需求应做成明显入口。",
  },
  {
    type: "眼科",
    recommendations: ["中山大学中山眼科中心（总院）"],
    note: "检查多、号源紧张，适合做检查串联提醒。",
  },
];

const processLibrary = {
  registration: {
    label: "挂号",
    description: "优先引导用户选择最快的挂号方式，并明确建档、报到和当日号路径。",
    steps: [
      {
        title: "预约挂号",
        location: "手机端 / 掌上中山一院",
        action: "实名注册后选择科室、缴费，成功后凭就诊码报到。",
        notice: "提前 7 天 8:00 放号，优先推荐线上预约。",
      },
      {
        title: "自助机挂号",
        location: "1-8 楼自助机",
        action: "插身份证或医保卡，选择预约或当日号，缴费后打印凭条。",
        notice: "适合现场补挂号、老人协助操作。",
      },
      {
        title: "人工窗口挂号",
        location: "1楼大厅左侧",
        action: "携带身份证或医保卡，人工选择科室并完成缴费。",
        notice: "当日号 7:30-17:00 可挂，高峰期排队较长。",
      },
      {
        title: "建档办卡",
        location: "1楼客服中心",
        action: "无诊疗卡用户先建档，再进入挂号流程。",
        notice: "第一次就诊用户需要优先完成此步骤。",
      },
    ],
  },
  inspection: {
    label: "检查",
    description: "把开单、缴费、排队、报告四个动作串起来，减少用户在院内反复询问。",
    steps: [
      {
        title: "抽血 / 常规检验",
        location: "7楼检验室",
        action: "医生开单后先缴费，再按号排队抽血或送检。",
        notice: "做完后可在自助报告机打印报告。",
      },
      {
        title: "心电图",
        location: "7楼",
        action: "完成缴费后到心电图室检查，当场出报告。",
        notice: "可提醒用户把报告直接带回诊室复诊。",
      },
      {
        title: "B超 / 彩超",
        location: "4楼，妇科B超在5楼",
        action: "开单后预约并缴费，再按预约时间候检。",
        notice: "不是现场即做，时间提醒要明显。",
      },
      {
        title: "CT / MRI / 放射",
        location: "1楼 / 2号楼影像科",
        action: "开单后先预约，再缴费并按时检查。",
        notice: "用户最容易迷路，建议在页面里突出路线和楼栋。",
      },
      {
        title: "内镜",
        location: "2楼内镜中心",
        action: "必须提前预约，按预约时间到场检查。",
        notice: "要重点提示空腹和预约要求。",
      },
    ],
  },
  pharmacy: {
    label: "取药",
    description: "围绕西药、中药和急诊药设置快捷任务，让用户知道该去哪里、怎么核对。",
    steps: [
      {
        title: "西药取药",
        location: "2楼东侧西药房",
        action: "先缴费，再到药房扫码报到，等叫号取药。",
        notice: "核对姓名、药名、剂量、用法和有效期。",
      },
      {
        title: "中药取药",
        location: "2楼西侧中药房",
        action: "完成缴费后凭处方排队取药。",
        notice: "省中医院等中药取药排队时间更长，适合加入等待提醒。",
      },
      {
        title: "急诊药",
        location: "1楼急诊药房",
        action: "急诊缴费后直接到急诊药房取药。",
        notice: "仅限急诊患者使用该路径。",
      },
    ],
  },
  report: {
    label: "报告打印",
    description: "把打印位置、复诊预约和资料整理连成一个闭环。",
    steps: [
      {
        title: "打印报告",
        location: "1楼 / 2楼自助报告机",
        action: "扫码或插卡打印检验、影像报告。",
        notice: "建议按检查时间顺序整理，方便复诊。",
      },
      {
        title: "复诊预约",
        location: "诊室 / 自助机 / 公众号",
        action: "根据医生建议直接预约下次号源。",
        notice: "如果需要复查，可顺手完成预约，减少二次跑医院。",
      },
      {
        title: "资料归档",
        location: "完成后带走",
        action: "整理病历、处方、检查单、发票和报告。",
        notice: "术后和肿瘤复诊场景尤其重要。",
      },
    ],
  },
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
  "24小时回访",
];

const hospitalListEl = document.querySelector("#hospital-list");
const hospitalDetailEl = document.querySelector("#hospital-detail");
const hospitalSearchEl = document.querySelector("#hospital-search");
const departmentFilterEl = document.querySelector("#department-filter");
const departmentGridEl = document.querySelector("#department-grid");
const taskTabsEl = document.querySelector("#task-tabs");
const taskContentEl = document.querySelector("#task-content");
const orderHospitalSelectEl = document.querySelector("#order-hospital-select");
const orderDepartmentSelectEl = document.querySelector("#order-department-select");
const escortFormEl = document.querySelector("#escort-form");
const orderOutputEl = document.querySelector("#order-output");
const navLinkEls = document.querySelectorAll(".nav-link");

let activeHospitalId = hospitals[0].id;
let activeTask = "registration";

function renderDepartmentFilter() {
  departmentMatches.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.type;
    option.textContent = item.type;
    departmentFilterEl.append(option);
  });
}

function renderOrderOptions() {
  hospitals.forEach((hospital) => {
    const option = document.createElement("option");
    option.value = hospital.id;
    option.textContent = hospital.name;
    orderHospitalSelectEl.append(option);
  });

  departmentMatches.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.type;
    option.textContent = item.type;
    orderDepartmentSelectEl.append(option);
  });
}

function getFilteredHospitals() {
  const keyword = hospitalSearchEl.value.trim().toLowerCase();
  const selectedDepartment = departmentFilterEl.value;

  return hospitals.filter((hospital) => {
    const matchKeyword =
      !keyword ||
      [hospital.name, hospital.district, hospital.address, hospital.coreDepartments.join(" ")]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    const matchDepartment =
      !selectedDepartment ||
      departmentMatches
        .find((item) => item.type === selectedDepartment)
        ?.recommendations.includes(hospital.name);

    return matchKeyword && matchDepartment;
  });
}

function renderHospitalList() {
  const filtered = getFilteredHospitals();
  if (!filtered.find((item) => item.id === activeHospitalId)) {
    activeHospitalId = filtered[0]?.id ?? hospitals[0].id;
  }

  hospitalListEl.innerHTML = filtered
    .map(
      (hospital) => `
        <button class="hospital-item ${hospital.id === activeHospitalId ? "active" : ""}" data-id="${hospital.id}">
          <strong>${hospital.name}</strong>
          <p>${hospital.district} · ${hospital.subway}</p>
          <p>核心科室：${hospital.coreDepartments.join("、")}</p>
        </button>
      `,
    )
    .join("");

  hospitalListEl.querySelectorAll(".hospital-item").forEach((button) => {
    button.addEventListener("click", () => {
      activeHospitalId = button.dataset.id;
      renderHospitalList();
      renderHospitalDetail();
    });
  });
}

function renderHospitalDetail() {
  const hospital = hospitals.find((item) => item.id === activeHospitalId) ?? hospitals[0];
  const recommendedTypes = departmentMatches
    .filter((item) => item.recommendations.includes(hospital.name))
    .map((item) => item.type);

  hospitalDetailEl.innerHTML = `
    <div class="summary-head">
      <div>
        <p class="eyebrow">医院详情</p>
        <h3>${hospital.name}</h3>
        <p class="tagline">${hospital.address} · ${hospital.phone}</p>
      </div>
      <div class="pill">就诊高峰：${hospital.peakHours}</div>
    </div>
    <div class="detail-grid">
      <article class="detail-card">
        <h4>到院信息</h4>
        <p>所在区：${hospital.district}</p>
        <p>地铁：${hospital.subway}</p>
        <p>步行距离：${hospital.walkingDistance}</p>
      </article>
      <article class="detail-card">
        <h4>核心科室</h4>
        <p>${hospital.coreDepartments.join("、")}</p>
      </article>
      <article class="detail-card">
        <h4>向导建议</h4>
        <p>${hospital.escortAdvice}</p>
      </article>
      <article class="detail-card">
        <h4>可用流程能力</h4>
        <p>${hospital.detailed ? "已内置详细挂号、检查、取药、报告流程" : "当前以基础医院信息和推荐为主，后续可继续扩充详细流程模板。"}</p>
      </article>
    </div>
    <div class="tag-row">
      ${recommendedTypes.length ? recommendedTypes.map((type) => `<span class="tag">${type}</span>`).join("") : "<span class='tag'>通用向导</span>"}
    </div>
  `;
}

function renderTaskTabs() {
  taskTabsEl.innerHTML = Object.entries(processLibrary)
    .map(
      ([key, value]) =>
        `<button class="tab-btn ${key === activeTask ? "active" : ""}" data-task="${key}">${value.label}</button>`,
    )
    .join("");

  taskTabsEl.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      activeTask = button.dataset.task;
      renderTaskTabs();
      renderTaskContent();
    });
  });
}

function renderTaskContent() {
  const hospital = hospitals.find((item) => item.id === activeHospitalId) ?? hospitals[0];
  const task = processLibrary[activeTask];
  const sourceNote = hospital.detailed
    ? `${hospital.name} 已配置详细流程模板，可直接作为用户任务导航。`
    : `${hospital.name} 当前展示的是通用任务模板，后续可按医院实际楼层和窗口继续细化。`;

  taskContentEl.innerHTML = `
    <p class="tagline">${task.description}</p>
    <p class="tagline">${sourceNote}</p>
    <div class="step-grid">
      ${task.steps
        .map(
          (step, index) => `
            <article class="step-card">
              <div class="meta">
                <span>步骤 ${index + 1}</span>
                <span>${task.label}</span>
              </div>
              <h4>${step.title}</h4>
              <p><strong>位置：</strong>${step.location}</p>
              <p><strong>操作：</strong>${step.action}</p>
              <p><strong>注意：</strong>${step.notice}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderDepartmentGrid() {
  departmentGridEl.innerHTML = departmentMatches
    .map(
      (item) => `
        <article class="department-card">
          <h4>${item.type}</h4>
          <p>${item.note}</p>
          <ul>
            ${item.recommendations.map((name) => `<li>${name}</li>`).join("")}
          </ul>
        </article>
      `,
    )
    .join("");
}

function renderOrderOutput(payload) {
  if (!payload) {
    orderOutputEl.innerHTML = `
      <div class="empty-state">
        <h3>服务单预览</h3>
        <p>提交表单后，这里会生成向导任务摘要和 SOP 进度。</p>
      </div>
    `;
    return;
  }

  const hospital = hospitals.find((item) => item.id === payload.hospitalId);
  const currentStage = payload.appointmentStatus.includes("未预约") ? 1 : 3;

  orderOutputEl.innerHTML = `
    <div class="output-card">
      <p class="eyebrow">向导服务单</p>
      <h3 class="output-title">${payload.patientName} 的就医协助任务</h3>
      <p class="output-note">${hospital?.name ?? ""} · ${payload.departmentType}</p>
      <ul class="report-list">
        <li>预约状态：${payload.appointmentStatus}</li>
        <li>行动能力：${payload.mobilityLevel}</li>
        <li>上门接送：${payload.pickupNeeded ? "需要" : "不需要"}</li>
        <li>附加需求：${payload.reportNeeded ? "包含打印报告 / 取药协助" : "标准向导流程"}</li>
        <li>备注：${payload.notes || "无"}</li>
      </ul>

      <div class="sop-grid">
        ${sopStages
          .map(
            (stage, index) => `
              <article class="sop-card ${index <= currentStage ? "active" : ""}">
                <span class="sop-index">${index + 1}</span>
                <h4>${stage}</h4>
              </article>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function bindQuickActions() {
  document.querySelectorAll("[data-task]").forEach((button) => {
    button.addEventListener("click", () => {
      activeTask = button.dataset.task;
      renderTaskTabs();
      renderTaskContent();
      document.querySelector(".task-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-action='jump-hospital']").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#hospital-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-action='jump-order']").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#order-panel").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  navLinkEls.forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function bindStickyNavState() {
  const sections = ["hero-section", "hospital-panel", "task-panel", "department-panel", "order-panel"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinkEls.forEach((button) => {
        button.classList.toggle("active", button.dataset.target === visible.target.id);
      });
    },
    {
      rootMargin: "-25% 0px -55% 0px",
      threshold: [0.2, 0.4, 0.6],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

hospitalSearchEl.addEventListener("input", renderHospitalList);
departmentFilterEl.addEventListener("change", renderHospitalList);

escortFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(escortFormEl);
  renderOrderOutput({
    patientName: formData.get("patientName"),
    age: formData.get("age"),
    hospitalId: formData.get("hospitalId"),
    departmentType: formData.get("departmentType"),
    appointmentStatus: formData.get("appointmentStatus"),
    mobilityLevel: formData.get("mobilityLevel"),
    pickupNeeded: formData.get("pickupNeeded") === "on",
    reportNeeded: formData.get("reportNeeded") === "on",
    notes: formData.get("notes"),
  });
});

renderDepartmentFilter();
renderOrderOptions();
renderHospitalList();
renderHospitalDetail();
renderTaskTabs();
renderTaskContent();
renderDepartmentGrid();
renderOrderOutput(null);
bindQuickActions();
bindStickyNavState();

