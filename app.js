//app.js
App({
  onLaunch: function () {
    this.globalData.capsule = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success:res=>{
      }
    })
  },
  globalData: {
    userInfo: null
  }
})