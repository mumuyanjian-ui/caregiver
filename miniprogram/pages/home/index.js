const { destinations, travelThemes } = require("../../data/chaoshan");

Page({
  data: {
    destinations,
    filteredDestinations: destinations,
    travelThemes,
    operationBanner: {
      tag: "清明到五一专题",
      title: "潮汕 2 天 1 夜吃逛路线",
      desc: "主打古城夜游 + 小公园觅食 + AI 行程助手，适合周末短逃离。",
      stats: ["周末爆款", "适合第一次来", "可直接生成路线"],
      cta: "查看专题路线"
    },
    searchKeyword: "",
    isLoading: false,
    showBackToTop: false,
    quickActions: [
      { key: "explore", title: "看目的地", subtitle: "古城 / 海岛 / 老街", desc: "先找适合你的潮汕第一站。" },
      { key: "food", title: "找美食", subtitle: "牛肉火锅 / 粿品 / 生腌", desc: "按旅行主题快速筛选值得吃的地方。" },
      { key: "ai", title: "AI助手", subtitle: "路线建议 / 美食推荐 / 文化解读", desc: "输入偏好后生成更像本地人的建议。" },
      { key: "plan", title: "做行程", subtitle: "1日游 / 2日游 / 亲子 / 慢游", desc: "一键生成你的潮汕旅行单。" }
    ]
  },

  onLoad() {
    this.setData({ isLoading: true });
    setTimeout(() => {
      this.setData({ isLoading: false });
    }, 300);
  },

  onSearchInput(event) {
    const searchKeyword = event.detail.value.trim().toLowerCase();
    const filteredDestinations = searchKeyword
      ? this.data.destinations.filter((item) =>
          [item.name, item.region, item.tag, item.highlight, item.bestFor].join(" ").toLowerCase().includes(searchKeyword)
        )
      : this.data.destinations;

    this.setData({
      searchKeyword,
      filteredDestinations
    });
  },

  clearSearch() {
    this.setData({
      searchKeyword: "",
      filteredDestinations: this.data.destinations
    });
  },

  goExplorePage() {
    wx.switchTab({ url: "/pages/hospital/index" });
  },

  goAiPage() {
    wx.switchTab({ url: "/pages/ai/index" });
  },

  goPlanPage() {
    wx.switchTab({ url: "/pages/order/index" });
  },

  handleQuickTap(event) {
    const { key } = event.currentTarget.dataset;
    if (key === "ai") {
      this.goAiPage();
      return;
    }
    if (key === "plan") {
      this.goPlanPage();
      return;
    }
    wx.setStorageSync("chaoshanDestinationHint", key === "food" ? "xiaogongyuan" : "");
    this.goExplorePage();
  },

  goDestinationDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.setStorageSync("chaoshanDestinationHint", id);
    this.goExplorePage();
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  },

  onPageScroll(event) {
    this.setData({
      showBackToTop: event.scrollTop > 280
    });
  }
});
