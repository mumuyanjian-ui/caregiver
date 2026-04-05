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
    appName: "Ai在潮汕",
    cloudEnvId: "your-cloud-env-id"
  }
});


