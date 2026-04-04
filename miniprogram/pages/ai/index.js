const { hospitals } = require("../../data/hospitals");
const { departmentMatches } = require("../../data/departments");
const { processLibrary } = require("../../data/processes");
const { isCloudReady, runAiAssistant } = require("../../services/aiService");

function buildSceneTabs(activeScene) {
  return [
    { key: "triage", label: "科室建议", active: activeScene === "triage" },
    { key: "prep", label: "就医准备", active: activeScene === "prep" },
    { key: "explain", label: "报告解释", active: activeScene === "explain" }
  ];
}

function buildKnowledgeText() {
  const hospitalText = hospitals
    .map((item) => `${item.name}：${item.district}，核心科室${item.coreDepartments.join("、")}，建议${item.escortAdvice}`)
    .join("\n");
  const departmentText = departmentMatches
    .map((item) => `${item.type}：推荐${item.recommendations.join("、")}，备注${item.note}`)
    .join("\n");
  const processText = Object.keys(processLibrary)
    .map((key) => `${processLibrary[key].label}：${processLibrary[key].steps.map((step) => `${step.title}(${step.location})`).join("；")}`)
    .join("\n");

  return `医院信息：\n${hospitalText}\n\n科室推荐：\n${departmentText}\n\n流程信息：\n${processText}`;
}

Page({
  data: {
    cloudReady: false,
    isLoading: false,
    activeScene: "triage",
    sceneTabs: buildSceneTabs("triage"),
    hospitalNames: ["未指定"].concat(hospitals.map((item) => item.name)),
    hospitalIndex: 0,
    patientAge: "",
    inputText: "",
    result: "",
    promptPlaceholder: "输入症状、持续时间、重点担心的问题，例如：老人胸闷3天，伴头晕，应该挂什么科？"
  },

  onShow() {
    this.setData({
      cloudReady: isCloudReady()
    });
  },

  selectScene(event) {
    const activeScene = event.currentTarget.dataset.scene;
    const placeholders = {
      triage: "输入症状、持续时间、重点担心的问题，例如：老人胸闷3天，伴头晕，应该挂什么科？",
      prep: "输入这次就医目的，例如：第一次去中山一院看骨科，帮我准备就诊材料和流程提醒。",
      explain: "输入检查结果或医生术语，例如：CT提示肺部小结节，帮我做通俗解释和复诊建议。"
    };

    this.setData({
      activeScene,
      sceneTabs: buildSceneTabs(activeScene),
      promptPlaceholder: placeholders[activeScene],
      result: ""
    });
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [field]: event.detail.value
    });
  },

  onPickerChange(event) {
    this.setData({
      hospitalIndex: Number(event.detail.value)
    });
  },

  async runAssistant() {
    const inputText = (this.data.inputText || "").trim();
    if (!inputText) {
      wx.showToast({
        title: "请先输入内容",
        icon: "none"
      });
      return;
    }

    if (this.data.isLoading) {
      return;
    }

    this.setData({
      isLoading: true,
      result: ""
    });

    try {
      const selectedHospital = this.data.hospitalNames[this.data.hospitalIndex];
      const res = await runAiAssistant({
        scene: this.data.activeScene,
        patientAge: this.data.patientAge || "未填写",
        selectedHospital,
        inputText,
        knowledge: buildKnowledgeText()
      });

      const resultText =
        res.result?.output_text ||
        res.result?.text ||
        res.result?.answer ||
        "AI 已返回结果，但没有解析到文本内容。";

      this.setData({
        result: resultText,
        isLoading: false
      });
    } catch (error) {
      this.setData({
        isLoading: false
      });
      wx.showToast({
        title: error.message || "AI 请求失败",
        icon: "none"
      });
    }
  }
});
