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
    appName: "AI游潮汕",
    cloudEnvId: "your-cloud-env-id"
  }
});

