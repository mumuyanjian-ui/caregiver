const { destinations, travelThemes, routeLibrary } = require("../../data/chaoshan");
const { isCloudReady, runAiAssistant } = require("../../services/aiService");

function buildSceneTabs(activeScene) {
  return [
    { key: "itinerary", label: "路线建议", active: activeScene === "itinerary" },
    { key: "food", label: "美食推荐", active: activeScene === "food" },
    { key: "culture", label: "文化解读", active: activeScene === "culture" }
  ];
}

function buildKnowledgeText() {
  const destinationText = destinations
    .map((item) => `${item.name}：${item.region}，标签${item.tag}，亮点${item.highlight}，适合${item.bestFor}，美食${item.foods.join("、")}`)
    .join("\n");
  const themeText = travelThemes.map((item) => `${item.title}：${item.subtitle}。建议：${item.suggestion}`).join("\n");
  const routeText = Object.keys(routeLibrary)
    .map((key) => {
      const current = routeLibrary[key];
      return Object.keys(current)
        .map((tab) => `${key}-${current[tab].label}：${current[tab].steps.map((step) => `${step.title}(${step.location})`).join("；")}`)
        .join("\n");
    })
    .join("\n");

  return `目的地信息：\n${destinationText}\n\n旅行主题：\n${themeText}\n\n路线库：\n${routeText}`;
}

Page({
  data: {
    cloudReady: false,
    isLoading: false,
    activeScene: "itinerary",
    sceneTabs: buildSceneTabs("itinerary"),
    destinationNames: ["未指定"].concat(destinations.map((item) => item.name)),
    destinationIndex: 0,
    travelDays: "2",
    inputText: "",
    result: "",
    promptPlaceholder: "例如：我周末从广州出发去潮汕，2天1夜，喜欢古城和夜景，帮我安排路线。"
  },

  onShow() {
    this.setData({
      cloudReady: isCloudReady()
    });
  },

  selectScene(event) {
    const activeScene = event.currentTarget.dataset.scene;
    const placeholders = {
      itinerary: "例如：我周末从广州出发去潮汕，2天1夜，喜欢古城和夜景，帮我安排路线。",
      food: "例如：我住在汕头小公园附近，想吃到本地人推荐的牛肉火锅和小吃，怎么排最顺？",
      culture: "例如：第一次去潮州古城，广济桥、牌坊街和工夫茶背后的文化怎么理解更有意思？"
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
      destinationIndex: Number(event.detail.value)
    });
  },

  async runAssistant() {
    const inputText = (this.data.inputText || "").trim();
    if (!inputText) {
      wx.showToast({
        title: "请先输入旅行需求",
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
      const selectedDestination = this.data.destinationNames[this.data.destinationIndex];
      const res = await runAiAssistant({
        scene: this.data.activeScene,
        travelDays: this.data.travelDays || "2",
        selectedDestination,
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
