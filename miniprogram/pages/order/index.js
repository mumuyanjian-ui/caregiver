const { destinations, travelThemes, itineraryStages } = require("../../data/chaoshan");
const { createOrder, isCloudReady } = require("../../services/orderService");

function buildProgressItems(progressIndex) {
  return itineraryStages.map((stage, index) => ({
    title: stage,
    order: index + 1,
    active: index <= progressIndex,
    current: index === progressIndex,
    showLine: index < itineraryStages.length - 1
  }));
}

Page({
  data: {
    destinationNames: destinations.map((item) => item.name),
    themeNames: travelThemes.map((item) => item.title),
    travelDayOptions: ["1天轻旅行", "2天1夜", "3天2夜"],
    paceOptions: ["轻松慢游", "均衡体验", "高密度打卡"],
    destinationIndex: 0,
    themeIndex: 0,
    travelDayIndex: 1,
    paceIndex: 1,
    selfDrive: false,
    foodPriority: true,
    planPreview: null,
    orderId: "",
    isSubmitting: false,
    cloudReady: false,
    showProgress: false,
    currentProgress: 0,
    progressItems: buildProgressItems(-1),
    previewItems: buildProgressItems(-1)
  },

  onShow() {
    this.setData({
      cloudReady: isCloudReady()
    });
  },

  onInput(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [field]: event.detail.value
    });
  },

  onPickerChange(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [field]: Number(event.detail.value)
    });
  },

  onSwitchChange(event) {
    const field = event.currentTarget.dataset.field;
    this.setData({
      [field]: event.detail.value
    });
  },

  simulateProgress() {
    this.setData({ showProgress: true });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      if (progress >= itineraryStages.length - 1) {
        clearInterval(interval);
        wx.showToast({ title: "行程已生成完成", icon: "success" });
      }
      this.setData({
        currentProgress: progress,
        progressItems: buildProgressItems(progress)
      });
    }, 1200);
  },

  resetProgress() {
    this.setData({
      showProgress: false,
      currentProgress: 0,
      progressItems: buildProgressItems(-1)
    });
  },

  async submitOrder() {
    const travelerName = (this.data.travelerName || "").trim();
    if (!travelerName) {
      wx.showToast({ title: "请先填写出行人称呼", icon: "none" });
      return;
    }

    if (this.data.isSubmitting) {
      return;
    }

    const preview = {
      travelerName,
      peopleCount: this.data.peopleCount || "2",
      destinationName: this.data.destinationNames[this.data.destinationIndex],
      themeName: this.data.themeNames[this.data.themeIndex],
      travelDays: this.data.travelDayOptions[this.data.travelDayIndex],
      pace: this.data.paceOptions[this.data.paceIndex],
      selfDriveText: this.data.selfDrive ? "自驾" : "公共交通 / 打车",
      foodPriorityText: this.data.foodPriority ? "优先安排" : "顺路安排",
      notes: this.data.notes || "无"
    };

    const payload = {
      ...preview,
      selfDrive: this.data.selfDrive,
      foodPriority: this.data.foodPriority
    };

    this.setData({
      isSubmitting: true
    });

    try {
      const result = await createOrder(payload);
      this.setData({
        planPreview: preview,
        orderId: result._id || "",
        showProgress: false,
        currentProgress: 0,
        progressItems: buildProgressItems(-1),
        previewItems: buildProgressItems(3),
        isSubmitting: false
      });
      wx.showToast({
        title: "行程偏好已保存",
        icon: "success"
      });
    } catch (error) {
      this.setData({
        isSubmitting: false
      });
      wx.showToast({
        title: error.message || "保存失败",
        icon: "none"
      });
    }
  },

  goOrdersPage() {
    wx.navigateTo({
      url: "/pages/orders/index"
    });
  }
});

