const { hospitals } = require("../../data/hospitals");
const { processLibrary } = require("../../data/processes");

function formatHospitalDetail(hospital) {
  return { ...hospital, coreDepartmentText: hospital.coreDepartments.join("、") };
}

Page({
  data: {
    searchKeyword: "",
    isLoading: false,
    activeHospitalId: hospitals[0].id,
    hospitals: hospitals.map(formatHospitalDetail),
    filteredHospitals: hospitals.map(formatHospitalDetail),
    taskTabs: Object.keys(processLibrary).map((key) => ({ key, label: processLibrary[key].label })),
    activeTask: "registration",
    activeTaskLabel: processLibrary.registration.label,
    activeTaskDescription: processLibrary.registration.description,
    steps: processLibrary.registration.steps,
    activeHospital: formatHospitalDetail(hospitals[0])
  },

  onLoad() {
    const task = wx.getStorageSync("hospitalActiveTask");
    if (task && processLibrary[task]) {
      this.setData({ activeTask: task });
      wx.removeStorageSync("hospitalActiveTask");
    } else if (task && hospitals.find((h) => h.id === task)) {
      this.setData({ activeHospitalId: task });
    }
    this.syncTask();
  },

  onShow() {
    const task = wx.getStorageSync("hospitalActiveTask");
    if (task && processLibrary[task]) {
      this.setData({ activeTask: task });
      wx.removeStorageSync("hospitalActiveTask");
      this.syncTask();
    } else if (task && hospitals.find((h) => h.id === task)) {
      this.setData({ activeHospitalId: task });
      this.selectHospitalById(task);
    }
  },

  onSearchInput(event) {
    const searchKeyword = event.detail.value.trim().toLowerCase();
    this.setData({ searchKeyword });
    this.doSearch();
  },

  doSearch() {
    const keyword = this.data.searchKeyword;
    let filtered = this.data.hospitals;
    if (keyword) {
      filtered = this.data.hospitals.filter((h) => {
        return h.name.toLowerCase().includes(keyword) || h.district.toLowerCase().includes(keyword) || h.coreDepartmentText.toLowerCase().includes(keyword);
      });
    }
    this.setData({ filteredHospitals: filtered.length ? filtered : this.data.hospitals });
    if (filtered.length > 0) {
      this.setData({ activeHospitalId: filtered[0].id, activeHospital: filtered[0] });
    }
  },

  clearSearch() {
    this.setData({ searchKeyword: "", filteredHospitals: this.data.hospitals });
  },

  selectHospital(event) {
    const id = event.currentTarget.dataset.id;
    this.selectHospitalById(id);
  },

  selectHospitalById(id) {
    const activeHospital = this.data.hospitals.find((h) => h.id === id) || this.data.hospitals[0];
    this.setData({ activeHospitalId: id, activeHospital });
    this.syncTask();
  },

  selectTask(event) {
    this.setData({ activeTask: event.currentTarget.dataset.task });
    this.syncTask();
  },

  syncTask() {
    const activeTaskConfig = processLibrary[this.data.activeTask];
    this.setData({
      activeTaskLabel: activeTaskConfig.label,
      activeTaskDescription: activeTaskConfig.description,
      steps: activeTaskConfig.steps,
      activeHospital: this.data.hospitals.find((h) => h.id === this.data.activeHospitalId) || this.data.hospitals[0]
    });
  },

  goOrderPage() {
    wx.switchTab({ url: "/pages/order/index" });
  }
});
