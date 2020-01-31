//app.js
App({
  onLaunch: function () {
    console.log(wx.getMenuButtonBoundingClientRect())
    this.globalData.capsule = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success:res=>{
        console.log(res)
      }
    })
  },
  globalData: {
    userInfo: null
  }
})