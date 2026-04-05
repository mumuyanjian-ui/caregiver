const { destinations, routeLibrary } = require("../../data/chaoshan");

function formatDestination(item, activeId) {
  return {
    ...item,
    foodsText: item.foods.join("、"),
    active: item.id === activeId
  };
}

function buildRouteTabs(activeTab, activeDestinationId) {
  const currentLibrary = routeLibrary[activeDestinationId] || routeLibrary["chaozhou-ancient-city"];
  return Object.keys(currentLibrary).map((key) => ({
    key,
    label: currentLibrary[key].label,
    active: key === activeTab
  }));
}

function buildSteps(activeDestinationId, activeTab) {
  const currentLibrary = routeLibrary[activeDestinationId] || routeLibrary["chaozhou-ancient-city"];
  const currentTab = currentLibrary[activeTab] || currentLibrary.overview;
  return currentTab.steps.map((step, index) => ({
    ...step,
    orderText: `第${index + 1}站`
  }));
}

Page({
  data: {
    searchKeyword: "",
    activeDestinationId: destinations[0].id,
    activeTab: "overview",
    destinations: destinations.map((item) => formatDestination(item, destinations[0].id)),
    filteredDestinations: destinations.map((item) => formatDestination(item, destinations[0].id)),
    routeTabs: buildRouteTabs("overview", destinations[0].id),
    activeDestination: formatDestination(destinations[0], destinations[0].id),
    activeRouteLabel: routeLibrary["chaozhou-ancient-city"].overview.label,
    activeRouteDescription: routeLibrary["chaozhou-ancient-city"].overview.description,
    steps: buildSteps(destinations[0].id, "overview")
  },

  onLoad() {
    const stored = wx.getStorageSync("chaoshanDestinationHint");
    if (stored && destinations.some((item) => item.id === stored)) {
      this.setData({
        activeDestinationId: stored
      });
      wx.removeStorageSync("chaoshanDestinationHint");
    }
    this.refreshPageState();
  },

  onShow() {
    const stored = wx.getStorageSync("chaoshanDestinationHint");
    if (stored && destinations.some((item) => item.id === stored)) {
      this.setData({
        activeDestinationId: stored
      });
      wx.removeStorageSync("chaoshanDestinationHint");
      this.refreshPageState();
    }
  },

  onSearchInput(event) {
    this.setData({
      searchKeyword: event.detail.value.trim().toLowerCase()
    });
    this.applySearch();
  },

  clearSearch() {
    this.setData({
      searchKeyword: ""
    });
    this.applySearch();
  },

  applySearch() {
    const { searchKeyword, activeDestinationId } = this.data;
    const formatted = destinations.map((item) => formatDestination(item, activeDestinationId));
    const filtered = searchKeyword
      ? formatted.filter((item) =>
          [item.name, item.region, item.tag, item.highlight, item.bestFor, item.foodsText].join(" ").toLowerCase().includes(searchKeyword)
        )
      : formatted;

    const nextList = filtered.length ? filtered : formatted;
    const hasCurrent = nextList.some((item) => item.id === activeDestinationId);
    const nextActiveId = hasCurrent ? activeDestinationId : nextList[0].id;

    this.setData({
      destinations: formatted.map((item) => ({ ...item, active: item.id === nextActiveId })),
      filteredDestinations: nextList.map((item) => ({ ...item, active: item.id === nextActiveId })),
      activeDestinationId: nextActiveId
    });
    this.refreshPageState();
  },

  selectDestination(event) {
    this.setData({
      activeDestinationId: event.currentTarget.dataset.id
    });
    this.applySearch();
  },

  selectTab(event) {
    this.setData({
      activeTab: event.currentTarget.dataset.tab
    });
    this.refreshPageState();
  },

  refreshPageState() {
    const activeDestination =
      this.data.destinations.find((item) => item.id === this.data.activeDestinationId) ||
      formatDestination(destinations[0], this.data.activeDestinationId);
    const currentLibrary = routeLibrary[this.data.activeDestinationId] || routeLibrary["chaozhou-ancient-city"];
    const currentTab = currentLibrary[this.data.activeTab] ? this.data.activeTab : "overview";

    this.setData({
      activeTab: currentTab,
      activeDestination,
      routeTabs: buildRouteTabs(currentTab, this.data.activeDestinationId),
      activeRouteLabel: currentLibrary[currentTab].label,
      activeRouteDescription: currentLibrary[currentTab].description,
      steps: buildSteps(this.data.activeDestinationId, currentTab)
    });
  },

  goPlanPage() {
    wx.switchTab({
      url: "/pages/order/index"
    });
  }
});
