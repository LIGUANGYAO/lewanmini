// import wx from 'wx'; //引用微信小程序wx对象
// var BASE_SERVER = "http://weixin.lewan6.ren";
var BASE_SERVER = "http://cs.lewan6.ren";

var provincecode;
var citycode;
wx.getStorage({
    key: 'provincecode',
    success(res) {
        console.log(res.data);
        provincecode = res.data
    }
})
wx.getStorage({
    key: 'citycode',
    success(res) {
        console.log(res.data);
        citycode = res.data
    }
})
const http =  {
  post(url, data) {
    wx.showLoading( {
      title:'加载中', 
    })
    return new Promise((resolve, reject) =>  {
      wx.request( {
        url: BASE_SERVER + url, 
        data: data, 
        method:'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "product":"wechat", //微信端
            "platform":"android", //请求设备类型
            "provincecode": provincecode || 510000, 
            "citycode": citycode || 510100
        }, // 设置请求的 header
        success:function (res) {
            console.log(res.data)
          // success
          wx.hideLoading(); 
          resolve(res.data); 
        }, 
        fail:function (error) {
            console.log(res.data)
          // fail
          wx.hideLoading(); 
          wx.showToast({title: res.data,icon: 'none'})
          reject(error); 
        }, 
        complete:function () {
          // complete
          wx.hideLoading(); 
        }
      })
    })
  }
}

export default http; //暴露出来供其他文件引用