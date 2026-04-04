Component({
  data: {
    selected: 0,
    color: "#6b7280",
    selectedColor: "#0f766e",
    list: [
      {
        pagePath: "/pages/home/index",
        text: "首页",
        icon: "⌂",
        activeIcon: "⌂"
      },
      {
        pagePath: "/pages/hospital/index",
        text: "医院流程",
        icon: "十",
        activeIcon: "十"
      },
      {
        pagePath: "/pages/ai/index",
        text: "AI助手",
        icon: "AI",
        activeIcon: "AI"
      },
      {
        pagePath: "/pages/order/index",
        text: "陪诊下单",
        icon: "✎",
        activeIcon: "✎"
      }
    ]
  },

  methods: {
    switchTab(event) {
      const { index, path } = event.currentTarget.dataset;
      if (index === this.data.selected) {
        return;
      }

      this.setData({
        selected: index
      });

      wx.switchTab({
        url: path
      });
    },

    updateSelected() {
      const pages = getCurrentPages();
      const current = pages[pages.length - 1];
      const currentRoute = `/${current.route}`;
      const index = this.data.list.findIndex((item) => item.pagePath === currentRoute);

      this.setData({
        selected: index === -1 ? 0 : index
      });
    }
  },

  lifetimes: {
    attached() {
      this.updateSelected();
    }
  },

  pageLifetimes: {
    show() {
      this.updateSelected();
    }
  }
});
