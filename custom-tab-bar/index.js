var a = getApp();

Component({
  data: {
    iPxBar: !1,
    selected: 0,
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/image/ic_Tabbar_home_normal@3x.png",
      selectedIconPath: "/image/ic_Tabbar_home_selected@3x.png",
      text: "首页"
    }, {
      pagePath: "/pages/zone/zone",
      iconPath: "/image/ic_Tabbar_partition_normal@3x.png",
      selectedIconPath: "/image/ic_Tabbar_partition_selected@3x.png",
      text: "分区"
    }, {
      pagePath: "/pages/user/user",
      iconPath: "/image/tabbar_me@3x.png",
      selectedIconPath: "/image/tabbar_me_selected@3x.png",
      text: "我的"
    }]
  },
  methods: {
    switchTab: function(a) {
      var e = a.currentTarget.dataset,
        t = e.path,
        c = e.index;
      this.setData({
        selected: e.index
      }), wx.switchTab({
        url: t
      });
    }
  }
});