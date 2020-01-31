module.export = {
  fetch:function(obj){
    return new Promise((res,rej)=>{
      let {url,method,data} = obj
      wx.request({
        url: url,
        method:method ||'get',
        data:data|| {},
        success:function(_res){
          res(_res)
        },
        fail: function (_res){
          rej(_res)
        }
      })
    })
  }
}