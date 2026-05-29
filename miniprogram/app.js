App({
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: "your-cloud-env-id",
        traceUser: true
      });
    }
  },

  globalData: {
    appName: "智慧文旅",
    cloudEnvId: "your-cloud-env-id"
  }
});


