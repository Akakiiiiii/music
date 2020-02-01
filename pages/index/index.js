//index.js
//获取应用实例
const app = getApp()
const fetch = require('../../utils/api.js').fetch
Page({
  data: {
    gifUrl:'',
    active: 0,
    current:0,
    list:[]
  }, 
  onLoad(){
    this.getGifLink()
    this.getHot()
  },
  onShow(){
    this.getTabBar().setData({
      selected:0
    })
  },
  changeCurrent(e){
    this.setData({
      current: e.detail.index
    })
  },
  changeIndex(e){
    this.setData({
      active:e.detail.current
    })
  },
  skipFind(){
    wx.navigateTo({ url: '../find/find' })
  },
  getGifLink(){
    fetch({
      url: 'http://192.168.1.5:3001/getGif'
    }).then((res)=>{
      this.setData({
        gifUrl: 'https:'+res.data.data.icon
      })
    })
  },
  getHot() {
    fetch({
      url: 'http://192.168.1.5:3001/getHot'
    }).then((res) => {
      let data = res.data.data
      let list = []
      console.log()
      for(let i = 0;i<data.length;i=i+10){
        list.push(data.slice(i,i+10))
      }
      console.log(list)
      this.setData({
        list
      })
    })
  }
})
