//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  }, 
  onShow(){
    this.getTabBar().setData({
      selected:0
    })
  }
})
