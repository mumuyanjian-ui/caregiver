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
    appName: "潮汕游AI",
    cloudEnvId: "your-cloud-env-id"
  }
});
