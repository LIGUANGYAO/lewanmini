const tool = {
  //时间戳转年月日
  //getDateTime(时间戳, 'Y/MM/dd hh:mm:ss')   getDateTime(1536278730, "Y年MM月dd日 hh时mm分ss秒")
  getDateTime(timestamp, format) {
    const date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const o = {
      'Y+': date.getFullYear(),
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
  
    if(/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
      if(new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length))
      }
    }
    return format;
  },
  createPoster(imgList, titleObject, canvasIds, callback) {
    // 初始化画布，小程序里面一定要有canvasid，它是以这个为标识来识别的
    const ctx = wx.createCanvasContext(canvasIds)
    // 合成多张图片的时候，放到一个数组里面，进行遍历
    imgList.forEach((item, index) => {
        ctx.drawImage(
            item.imgurl,
            item.x,
            item.y,
            item.width,
            item.height
        )
    })
    // 写文字水印
    ctx.setFontSize(titleObject.fontSize)
    ctx.fillText(titleObject.content, titleObject.x, titleObject.y)
    // 画出canvas上面的图片
    ctx.draw(true, function () {
        // wx.canvasToTempFilePath这个一定要写在ctx.draw里面的回调里面，是坑勿跳
        wx.canvasToTempFilePath({
            canvasId: canvasIds,
            destWidth: 600,
            destHeight: 800,
            quality: 1,
            success: function (res) {
                console.log(res.tempFilePath)
                callback(res.tempFilePath)
            },
            fail: function (res) {
                console.log(res)
            }
        })
    })
  }

}




export default tool;
