function isCloudReady() {
  return !!wx.cloud && getApp().globalData.cloudEnvId !== "your-cloud-env-id";
}

function ensureCloudReady() {
  if (!wx.cloud) {
    throw new Error("当前基础库不支持云开发");
  }

  if (getApp().globalData.cloudEnvId === "your-cloud-env-id") {
    throw new Error("请先在 app.js 中配置云开发环境 ID");
  }
}

async function runAiAssistant(payload) {
  ensureCloudReady();
  return wx.cloud.callFunction({
    name: "aiCareAssistant",
    data: payload
  });
}

module.exports = {
  isCloudReady,
  runAiAssistant
};

