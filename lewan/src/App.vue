<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('应用程序创建和缓存日志在setStorageSync')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
@font-face {
  font-family: 'iconfont';  /* project id 883079 */
  src: url('//at.alicdn.com/t/font_883079_stfwbe2gcjr.eot');
  src: url('//at.alicdn.com/t/font_883079_stfwbe2gcjr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_883079_stfwbe2gcjr.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_883079_stfwbe2gcjr.woff') format('woff'),
  url('//at.alicdn.com/t/font_883079_stfwbe2gcjr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_883079_stfwbe2gcjr.svg#iconfont') format('svg');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jian:before {
  content: "\e600";
}

.icon-horn:before {
  content: "\e615";
}

.icon-star:before {
  content: "\e61a";
}

.icon-31tuwenxiangqing:before {
  content: "\e601";
}

.icon-unie62a:before {
  content: "\e6af";
}

.icon-xiangyou:before {
  content: "\e630";
}

.icon-arrow-right:before {
  content: "\e646";
}

.icon-shanchu:before {
  content: "\e613";
}

.icon-shuoming:before {
  content: "\e64f";
}

.icon-dianhua1:before {
  content: "\e6a3";
}

.icon-xiaoxi:before {
  content: "\e7a8";
}

.icon-paixujiantoushang:before {
  content: "\e7fe";
}

.icon-paixujiantouxia:before {
  content: "\e7ff";
}

.icon-shimingrenzheng:before {
  content: "\e63b";
}

.icon-v1:before {
  content: "\e63d";
}

.icon-v2:before {
  content: "\e63e";
}

.icon-v3:before {
  content: "\e63f";
}

.icon-v4:before {
  content: "\e640";
}

.icon-v:before {
  content: "\e658";
}

.icon-tianjia:before {
  content: "\e652";
}

.icon-xuanzhong:before {
  content: "\e61f";
}

.icon-shouye1:before {
  content: "\e626";
}

.icon-customer:before {
  content: "\e69f";
}

.icon-fanhui:before {
  content: "\e64e";
}

.icon-jinjilianxiren:before {
  content: "\e60a";
}

.icon-yinxingqia001:before {
  content: "\e61c";
}

.icon-youjiantou:before {
  content: "\e67f";
}

.icon-chakantiezishijian:before {
  content: "\e665";
}

.icon-dianhua:before {
  content: "\e619";
}

.icon-wuuiconxiangjifangda:before {
  content: "\e620";
}

.icon-wode:before {
  content: "\e612";
}

.icon-yousanjiao:before {
  content: "\e614";
}

.icon-shouye:before {
  content: "\e655";
}

.icon-shouji:before {
  content: "\e610";
}

.icon-sousuo:before {
  content: "\e661";
}

.icon-xiala:before {
  content: "\e648";
}

.icon-tongzhi:before {
  content: "\e647";
}

.icon-pengyouquan:before {
  content: "\e73c";
}

.icon-weixin:before {
  content: "\e73b";
}

.icon-yly_renzhengshibai:before {
  content: "\e61d";
}

.icon-xitongshezhi:before {
  content: "\e611";
}

.icon-fanhui2:before {
  content: "\e605";
}

.icon-guanbi:before {
  content: "\e61b";
}

.icon-dian:before {
  content: "\e608";
}

.icon-xiala1:before {
  content: "\e7ab";
}

.icon-close_icon:before {
  content: "\e659";
}

.icon-dingwei1:before {
  content: "\e616";
}

.icon-gengduo:before {
  content: "\e617";
}

.icon-tubiao-:before {
  content: "\e651";
}

.icon-guanzhu:before {
  content: "\e66c";
}

.icon-bianji:before {
  content: "\ea33";
}

.icon-youhuiquan:before {
  content: "\e65e";
}

.icon-dingwei:before {
  content: "\e6cb";
}

.icon-lianxiren:before {
  content: "\e73e";
}

.icon-huo:before {
  content: "\eee3";
}

.icon-bianji2:before {
  content: "\e639";
}

.icon-zhengque:before {
  content: "\e641";
}

.icon-guanbi1:before {
  content: "\eaf2";
}

.icon-lianjie:before {
  content: "\e60c";
}

.icon-yaoqingma:before {
  content: "\e638";
}

.icon-guanbi2:before {
  content: "\e653";
}

.icon-fanhui1:before {
  content: "\e656";
}

.icon-fenxiang:before {
  content: "\e606";
}

.icon-dashujukeshihuaico-:before {
  content: "\e7fc";
}

.icon-tubiaozhizuo-:before {
  content: "\e609";
}

.icon-icon_sanjiaoxing:before {
  content: "\e6bb";
}

.icon-icon-test:before {
  content: "\e627";
}

.icon-zhifupingtai-zhifubao:before {
  content: "\e618";
}

.icon-zhaoshangyinhang:before {
  content: "\e61e";
}

.icon-wode1:before {
  content: "\e650";
}

.icon-fanhui2-copy:before {
  content: "\eee4";
}
</style>
