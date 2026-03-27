const { hospitals } = require("../../data/hospitals");
const { departmentMatches } = require("../../data/departments");
const { sopStages } = require("../../data/processes");

Page({
  data: {
    hospitals,
    departmentMatches,
    hospitalNames: hospitals.map((item) => item.name),
    departmentTypes: departmentMatches.map((item) => item.type),
    appointmentOptions: ["已预约", "未预约，需要协助挂号", "不确定"],
    mobilityOptions: ["可自行行走", "需搀扶", "轮椅需求", "术后行动不便"],
    hospitalIndex: 0,
    departmentIndex: 0,
    appointmentIndex: 0,
    mobilityIndex: 0,
    pickupNeeded: false,
    reportNeeded: false,
    orderPreview: null,
    sopStages
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

  submitOrder() {
    const patientName = this.data.patientName || "";
    if (!patientName.trim()) {
      wx.showToast({
        title: "请先填写患者姓名",
        icon: "none"
      });
      return;
    }

    const preview = {
      patientName: patientName.trim(),
      age: this.data.age || "未填写",
      hospitalName: this.data.hospitalNames[this.data.hospitalIndex],
      departmentType: this.data.departmentTypes[this.data.departmentIndex],
      appointmentStatus: this.data.appointmentOptions[this.data.appointmentIndex],
      mobilityLevel: this.data.mobilityOptions[this.data.mobilityIndex],
      pickupNeeded: this.data.pickupNeeded,
      reportNeeded: this.data.reportNeeded,
      notes: this.data.notes || "无"
    };

    this.setData({
      orderPreview: preview
    });
  }
});
