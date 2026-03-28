const { hospitals } = require("../../data/hospitals");
const { departmentMatches } = require("../../data/departments");

Page({
  data: {
    hospitals: hospitals.slice(0, 4).map((item) => ({
      ...item,
      coreDepartmentText: item.coreDepartments.join("、")
    })),
    filteredHospitals: hospitals.slice(0, 4).map((item) => ({
      ...item,
      coreDepartmentText: item.coreDepartments.join("、")
    })),
    departmentMatches: departmentMatches.slice(0, 4),
    searchKeyword: "",
    isLoading: false,
    showBackToTop: false,
    quickActions: [
      { key: "registration", title: "去挂号", subtitle: "预约 / 当日 / 建档", desc: "先看最快挂号路径，再去现场。" },
      { key: "inspection", title: "去检查", subtitle: "抽血 / CT / B超 / 内镜", desc: "直接看到检查位置、缴费方式和候检提醒。" },
      { key: "pharmacy", title: "去取药", subtitle: "西药 / 中药 / 急诊药", desc: "把药房位置和核对重点放在一个页面。" },
      { key: "escort", title: "找陪诊", subtitle: "老人 / 孕妇 / 儿科 / 术后", desc: "提交需求后生成服务单和进度预览。" }
    ]
  },

  onLoad() {
    this.setData({ isLoading: true });
    setTimeout(() => {
      this.setData({ isLoading: false });
    }, 500);
  },

  onSearchInput(event) {
    const keyword = event.detail.value.trim().toLowerCase();
    this.setData({ searchKeyword: keyword });
    this.doSearch();
  },

  doSearch() {
    const keyword = this.data.searchKeyword;
    if (!keyword) {
      this.setData({
        filteredHospitals: this.data.hospitals
      });
      return;
    }
    const filtered = this.data.hospitals.filter((h) => {
      return h.name.toLowerCase().includes(keyword) || h.district.toLowerCase().includes(keyword) || h.coreDepartmentText.includes(keyword);
    });
    this.setData({ filteredHospitals: filtered.length ? filtered : this.data.hospitals });
  },

  clearSearch() {
    this.setData({ searchKeyword: "", filteredHospitals: this.data.hospitals });
  },

  goHospitalPage() {
    wx.switchTab({ url: "/pages/hospital/index" });
  },

  goOrderPage() {
    wx.switchTab({ url: "/pages/order/index" });
  },

  goHospitalDetail(event) {
    const id = event.currentTarget.dataset.id;
    wx.setStorageSync("hospitalActiveTask", id);
    wx.switchTab({ url: "/pages/hospital/index" });
  },

  handleQuickTap(event) {
    const { key } = event.currentTarget.dataset;
    if (key === "escort") {
      this.goOrderPage();
      return;
    }
    wx.setStorageSync("hospitalActiveTask", key);
    wx.switchTab({ url: "/pages/hospital/index" });
  },

  scrollToTop() {
    wx.pageScrollTo({ scrollTop: 0, duration: 300 });
  },

  onPageScroll(event) {
    this.setData({ showBackToTop: event.scrollTop > 300 });
  }
});
