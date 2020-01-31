//index.js
//获取应用实例
const app = getApp()
const fetch = require('../../utils/api.js').fetch
Page({
  data: {
    gifUrl:''
  }, 
  onLoad(){
    this.getGifLink()
  },
  onShow(){
    this.getTabBar().setData({
      selected:0
    })
  },
  getGifLink(){
    fetch({
      url: 'http://192.168.1.5:3001/getGif'
    }).then((res)=>{
      this.setData({
        gifUrl: 'https:'+res.data.data.icon
      })
    })
  }
})
