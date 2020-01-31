var a = getApp()
Component({
  data:{
    capsule: a.globalData.capsule
  },
  properties:{
    type:{
      type:String,
      value:"normal"
    }
  },
  lifetimes:{
    attached(){
    }
  }
})