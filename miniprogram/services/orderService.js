const COLLECTION_NAME = "travel_plans";

function isCloudReady() {
  return !!wx.cloud && getApp().globalData.cloudEnvId !== "your-cloud-env-id";
}

function ensureCloudReady() {
  if (!wx.cloud) {
    throw new Error("当前基础库不支持云开发");
  }

  if (getApp().globalData.cloudEnvId === "your-cloud-env-id") {
    throw new Error("请先在 app.js 里配置云开发环境 ID");
  }
}

async function createOrder(payload) {
  ensureCloudReady();
  const db = wx.cloud.database();
  return db.collection(COLLECTION_NAME).add({
    data: {
      ...payload,
      createdAt: db.serverDate(),
      status: "pending"
    }
  });
}

async function fetchOrders() {
  ensureCloudReady();
  const db = wx.cloud.database();
  return db
    .collection(COLLECTION_NAME)
    .orderBy("createdAt", "desc")
    .get();
}

module.exports = {
  COLLECTION_NAME,
  isCloudReady,
  createOrder,
  fetchOrders
};
