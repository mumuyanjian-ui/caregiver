const { hospitals } = require("../../data/hospitals");
const { processLibrary } = require("../../data/processes");

function formatHospitalDetail(hospital) {
  return {
    ...hospital,
    coreDepartmentText: hospital.coreDepartments.join("、")
  };
}

Page({
  data: {
    searchKeyword: "",
    activeHospitalId: hospitals[0].id,
    hospitals: hospitals.map(formatHospitalDetail),
    filteredHospitals: hospitals.map(formatHospitalDetail),
    taskTabs: Object.keys(processLibrary).map((key) => ({
      key,
      label: processLibrary[key].label
    })),
    activeTask: "registration",
    activeTaskLabel: processLibrary.registration.label,
    activeTaskDescription: processLibrary.registration.description,
    steps: processLibrary.registration.steps,
    activeHospital: formatHospitalDetail(hospitals[0])
  },

  onLoad() {
    const task = wx.getStorageSync("hospitalActiveTask");
    if (task && processLibrary[task]) {
      this.setData({
        activeTask: task
      });
      wx.removeStorageSync("hospitalActiveTask");
    }
    this.syncTask();
  },

  onShow() {
    const task = wx.getStorageSync("hospitalActiveTask");
    if (task && processLibrary[task]) {
      this.setData({
        activeTask: task
      });
      wx.removeStorageSync("hospitalActiveTask");
      this.syncTask();
    }
  },

  onSearchInput(event) {
    const searchKeyword = event.detail.value.trim().toLowerCase();
    const filteredHospitals = this.data.hospitals.filter((hospital) => {
      return [
        hospital.name,
        hospital.district,
        hospital.address,
        hospital.coreDepartmentText
      ]
        .join(" ")
        .toLowerCase()
        .includes(searchKeyword);
    });

    this.setData({
      searchKeyword,
      filteredHospitals: filteredHospitals.length ? filteredHospitals : this.data.hospitals
    });
  },

  selectHospital(event) {
    const id = event.currentTarget.dataset.id;
    const activeHospital = this.data.hospitals.find((hospital) => hospital.id === id) || this.data.hospitals[0];
    this.setData({
      activeHospitalId: id,
      activeHospital
    });
  },

  selectTask(event) {
    this.setData({
      activeTask: event.currentTarget.dataset.task
    });
    this.syncTask();
  },

  syncTask() {
    const activeTaskConfig = processLibrary[this.data.activeTask];
    this.setData({
      activeTaskLabel: activeTaskConfig.label,
      activeTaskDescription: activeTaskConfig.description,
      steps: activeTaskConfig.steps,
      activeHospital: this.data.hospitals.find((hospital) => hospital.id === this.data.activeHospitalId) || this.data.hospitals[0]
    });
  },

  goOrderPage() {
    wx.switchTab({
      url: "/pages/order/index"
    });
  }
});
