<template>
  <div class v-if="proDetails.details">
    <div class="header_box">
      <div class="header_banner_box">
        <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
          <block v-for="(item, index) in proDetails.details.product_carousel" :key="index">
            <swiper-item>
              <img :src="item" class="slide-image" lazy-load mode="scaleToFill">
            </swiper-item>
          </block>
        </swiper>
      </div>
      <div v-if="proDetails.details.product_returnall == 1" class="price_box new_priceBox" :class="{'is_numNone': proDetails.details.sold_out == 1}" >
        <span class="reality_price">¥{{ proDetails.price[priceIndex].price_sale }}</span>
        <span class="original_cost">¥{{ proDetails.price[priceIndex].price_market }}</span>
        <span class="count_down" v-if="proDetails.details.sold_out == 0">限注册会员购买全返</span>
        <span class="count_down" v-else-if="proDetails.details.sold_out == 1">商品已售罄</span>
      </div>
      <div v-else class="price_box" :class="{'is_numNone': proDetails.details.sold_out == 1}">
        <span class="reality_price">¥{{ proDetails.price[priceIndex].price_sale }}</span>
        <span class="original_cost">¥{{ proDetails.price[priceIndex].price_market }}</span>
        <span class="count_down count_down_time_show" v-if="proDetails.details.product_timelimit == 1" >{{countdownShow}}</span>
        <span class="count_down" v-else-if="proDetails.details.sold_out == 1">商品已售罄</span>
      </div>
      <div class="text_introduce">
        <div class="text_showOne">
          <strong>{{ proDetails.details.product_name }}</strong>
        </div>
        <div v-if="proDetails.details.product_returnall == 1" class="text_label">
          <span  class="tags_name" v-for="(item,index) in proDetails.details.product_tags" :key="index" >{{ item.tag_name }}</span>
          <div v-if="level == 2 || level == 3 || level == 4 || level == 5" class="commission"> 佣金：<span>￥{{ proDetails.price[priceIndex].price_sale }}</span></div>
        </div>
        <div v-else class="text_label">
          <span class="tags_name" v-for="(item,index) in proDetails.details.product_tags" :key="index" >{{ item.tag_name }}</span>
          <div v-if="level == 2" class="commission">佣金：<span>¥{{ proDetails.price[priceIndex].price_commission.zigou }}~{{ proDetails.price[priceIndex].price_commission.fenxiang }}</span></div>
          <div v-else-if="level == 3 || level == 4 || level == 5" class="commission">佣金：<span>¥{{ proDetails.price[priceIndex].price_commission.zigou }}</span></div>
        </div>
      </div>
      <div class="total_num_box">
        <div class="pro_kuncun">剩余库存：{{ proDetails.price[priceIndex].product_totalnum || 0 }}</div>
        <div class="pro_yishou">已售：{{ proDetails.price[priceIndex].product_buynum || 0 }}</div>
      </div>
    </div>
    <div class="specification_box">
      <div class="specification_list" @tap="showSpecification(true)">
        <span class="specification_title">规格:</span>
        <span class="specification_text">{{proDetails.price[priceIndex].product_property}}</span>
        <span class="specification_img">
          <img src="http://oss.lewan6.ren/uploads/idcard/20190313/d11c73e572f24ed70e82aa0442a382fedb27c1ce.png" alt />
        </span>
      </div>
      <div class="specification_list specification_merchant">
        <div class="specification_title">商家:</div>
        <div class="selAddress_right">
          <label class="radio" :class="{'checked':index == merchant_index}" @tap="selMerchant(index,item.merchant_lat,item.merchant_lng,item.merchant_ssq,item.merchant_address)" v-for="(item,index) in proDetails.details.shop" :key="index" >{{item.merchant_name}}</label>
        </div>
      </div>
      <div class="specification_list" @tap="gotoMap()">
        <span class="specification_title">地址:</span>
        <span class="specification_text">{{ merchant_ssq }}{{ address }}</span>
        <span class="specification_img">
          <i class="iconfont icon-arrow-right"></i>
        </span>
      </div>
      <div class="header_space"></div>
    </div>
    <div class="content_box">
      <div class="content_header_box">
        <div class="content_header_isPosition" id="isPositionBtn" :class="{'isFixdCss': isFixd}">
          <span class="content_sec" :class="{'content_checked': secTitle == 1}" @tap="scrollTo(1)" >特色介绍</span>
          <span class="content_sec" :class="{'content_checked': secTitle == 2}" @tap="scrollTo(2)" >购买须知</span>
        </div>
      </div>
      <div class="content_text_box">
        <!--特色介绍-->
        <div class="information" id="scroll1">
          <div class="information_img" style="background-image: url('http://oss.lewan6.ren/uploads/html/20190315/51cb90cdc740648fe56d1e8cf9e921ef43e0fe46png');" >特色介绍</div>
          <!-- <div class="information_text" id="informationText" v-html="information_text"></div> -->
        </div>
        <!--购买须知-->
        <div class="purchase_notes" id="scroll2">
          <div class>
            <p>【产品详情】</p>
            <!-- <div class="purchase_notesText" v-html="product_info"></div> -->
          </div>
          <div class>
            <p>【使用方法】</p>
            <!-- <div class="purchase_notesText" v-html="product_useinfo"></div> -->
          </div>
          <div class>
            <p>【温馨提示】</p>
            <!-- <div class="purchase_notesText" v-html="product_notice"></div> -->
          </div>
        </div>
      </div>
      <div class="content_space"></div>
      <div class="content_footer_box" v-if="hotpush.length">
        <!-- 更多推荐 -->
        <div class="content_footer_header">更多推荐</div>
        <swiper class="swiper" indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
          <block>
            <swiper-item v-if="proDetails.hotpush.length>0">
              <recommend-product v-on:goToDetails="goToDetails" v-for="(item,index) in qianSi" :key="index" :item="item" :level="level"/>
            </swiper-item>
            <swiper-item v-if="proDetails.hotpush.length>4">
              <recommend-product v-on:goToDetails="goToDetails" :item="item" v-for="(item,index) in houSi" :key="index" :level="level"/>
            </swiper-item>
          </block>
        </swiper>
      </div>
    </div>
    <div class="footer_box">
      <div v-if="(proDetails.details.product_timelimit==1&&(proDetails.details.product_starttime>proDetails.details.now_time)||(proDetails.details.product_timelimit==1&&proDetails.details.product_endtime<proDetails.details.now_time)&&pageRefresh)" class="down_Btn">
          <div class="downBtnOne" @tap="jumpToHomePage"><i class="iconfont icon-wode1"></i><div>首页</div></div>
					<div class="ContactMerchant" @tap="ContactMerchant(true)"><i class="iconfont icon-jinjilianxiren"></i><div>商家</div></div>
					<div class="downBtnSix" @tap="shareProduct()">分享</div>
					<div class="downBtnFive countDownTimeShow">{{countdownShow}}</div>
				</div>
				<div v-else class="down_Btn">
					<div class="downBtnOne" @tap="jumpToHomePage"><i class="iconfont icon-wode1"></i><div>首页</div></div>
					<div class="ContactMerchant" @tap="ContactMerchant(true)"><i class="iconfont icon-jinjilianxiren"></i><div>商家</div></div>
					<div v-if="proDetails.details.sold_out == 0" class="downBtnTwo" @tap="shareProduct(true)">分享</div>
					<div v-if="proDetails.details.sold_out == 0" class="downBtnThree" @tap="BuyNow(productId,proDetails.price[priceIndex].price_id)">立即购买</div>
					<div v-if="proDetails.details.sold_out == 1" class="downBtnFour">已售罄</div>
				</div>
    </div>
    <div class="modal specification_css" :class="{'modal_specification_box': modal_specification_box}" @tap="showSpecification(false)">
      <div class="modal_specification_box" @tap.stop="">
        <div class="specification_content">
          <i class="iconfont icon-close_icon" @tap="showSpecification(false)"/> 
          <div class="left_image" :style="{backgroundImage: 'url(' + proDetails.details.product_pic + ')'}"></div>
          <div class="right_price">
            <div class="shou_jia"> ¥ {{ proDetails.price[priceIndex].price_sale }}</div>
            <div class="pro_name">{{ proDetails.details.product_name }}</div>
            <div class="detail_box">
              <span class="specification_kucun">剩余库存 {{ proDetails.price[priceIndex].product_totalnum ||0 }}</span>
              <span class="specification_yishou">已售 {{ proDetails.price[priceIndex].product_buynum || 0 }}</span>
            </div>
          </div>
        </div>
        <div class="selGuigeBox">
          <label class="radio" :class="{'checked':index == priceIndex}" @tap="selGuige(index)" v-for="(item,index) in proDetails.price" :key="index" >{{item.product_property}}</label>
        </div>
      </div>
    </div>
    <div class="modal merchant_css" :class="{'modal_merchant_box': modal_merchant_box}" @tap="ContactMerchant(false)">
      <div class="merchant_box" @tap.stop="">
      <div class="merchant_box_header" style="background-image: url(http://oss.lewan6.ren/uploads/idcard/20190410/891d34ccc9ff078bbffe890a297a90b5b69b4fb9.png);"></div>
        <div class="merchant_box_content">
          <div class="merchant_list" @tap="callPhone(item.merchant_400tel)" :key="index" v-for="(item,index) in proDetails.details.shop">
            <div class="merchant_list_Left">
              <div class="merchant_list_shopName">{{item.merchant_name}}</div>
              <div class="merchant_list_phone">
                <span class="merchant_list_dian"></span>
                <span>{{item.merchant_400tel}}</span>
              </div>
            </div>
            <div class="merchant_list_Right">
              <img src="http://oss.lewan6.ren/uploads/idcard/20190410/1f6ab832d9dad0997106e259daeca7973228c423.png"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal share_css" :class="{'modal_share_box': modal_share_box}" @tap="shareProduct(false)">
      <div class="share_box" @tap.stop="">
        <div class="create_img" @tap="createPoster()">
					<img src="http://oss.lewan6.ren/uploads/idcard/20190410/032061623e91bd29cb1b849d189b07d3ec982a0e.png"/>
					<div>生成海报</div>
				</div>
				<div class="create_url" @tap="createUrl()">
					<img src="http://oss.lewan6.ren/uploads/idcard/20190410/f464b1dd7a4971f9f269caacbd538bd1308f1686.png"/>
					<div>生成链接</div>
				</div>
      </div>
    </div>
    <div class="modal poster_css" :class="{'modal_poster_box': modal_poster_box}" @tap="sharePoster(false)">
      <div class="poster_box" @tap.stop="">
        <img src="http://oss.lewan6.ren/uploads/idcard/20190410/f464b1dd7a4971f9f269caacbd538bd1308f1686.png" alt="" @longtap="saveImg()">
        <!-- <img :src="shareImg" alt=""> -->
      </div>
    </div>
    <div class="modal url_css" :class="{'modal_url_box': modal_url_box}" @tap="shareUrl(false)">
      <div class="url_box" @tap.stop="">
        <img src="http://oss.lewan6.ren/uploads/idcard/20190410/97873342e6f13eb954bcb8f5d24926910b4d06ff.png" alt="">
      </div>
    </div>
    <div>
      <caeate-poster />
    </div>
    <div>
      <div class="canvas">
          <canvas canvas-id="mycanvas" style="width:750rpx;height:1334rpx;"/>
      </div>
    </div>
  </div>
</template>

<script>
import RecommendProduct from "@/components/recommend-product";
import CaeatePoster from "@/components/caeate-poster";
export default {
  data() {
    return {
      token: "",
      productId: "205",
      latitude: 30.65618,
      longitude: 104.08329,
      proDetails: {},
      hotpush: [], //热推商品
      level: 1,
      myRecode: "",
      priceIndex: 0, //默认选中规格第一个
      merchant_index: 0,
      lat: "",
      lng: "",
      merchant_ssq: "",
      address: "",
      secTitle: 1,
      isFixd: false, //是否吸顶
      isPositionMenuTop: "", //切换按钮距离顶部位置
      scroll1: "", //特色介绍距离顶部位置
      scroll2: "", //购买须知距离顶部位置
      information_text: "", //特色介绍
      product_info: "", //产品详情
      product_useinfo: "", //使用方法
      product_notice: "", //温馨提示
      pageRefresh: true,	//页面数据变化
      countdownShow: "",	//倒计时
      myTimer: "",	//倒计时函数
      modal_specification_box: false,  //是否显示规格模态窗
      modal_merchant_box: false,  //是否显示商家模态窗
      modal_share_box: false,  //是否显示分享引导图片
      modal_poster_box: false,  //是否显示分享海报图片
      modal_url_box: false,  //是否显示分享链接
      shareImg: '', //分享海报图片
    };
  },
  computed:{
    qianSi: function () {
      return this.hotpush.filter(function (item,index) {
        return index<4;
      })
    },
    houSi: function () {
      return this.hotpush.filter(function (item,index) {
        return index>=4 && index<8;
      })
    }
  },
  onLoad: function(option) {
    // this.productId = option.productId;
    this.token = wx.getStorageSync('token')
    this.getData();
  },
  onUnload: function(){
    // this.productId = '';
    // this.proDetails = {};
    // this.hotpush = [];
    // this.level = 1;
    // this.isFixd = false;
    // this.countdownShow = '';
    // clearInterval(this.myTimer);
  },
  onPageScroll: function(e) {
      let _this = this;
    let scrollTop = e.scrollTop;
    if (_this.isPositionMenuTop <= 0 || _this.isPositionMenuTop == "") {
        wx.createSelectorQuery().select("#isPositionBtn").boundingClientRect(function(res) {
          _this.isPositionMenuTop = res.top + scrollTop;
        }).exec();
      wx.createSelectorQuery().select("#scroll1").boundingClientRect(function(res) {
          _this.scroll1 = res.top + scrollTop - 44;
        }).exec();
      wx.createSelectorQuery().select("#scroll2").boundingClientRect(function(res) {
          _this.scroll2 = res.top + scrollTop - 44;
        }).exec();
    } else {
      if (scrollTop > _this.isPositionMenuTop) {
        _this.isFixd = true;
      } else {
        _this.isFixd = false;
      }
    }
  },
  components: {RecommendProduct,CaeatePoster},
  created() {},
  mounted() {},
  methods: {
    async getData() {
      this.myRecode = ""; //用户邀请码
      this.level = 1; //用户等级
      let UserInfo = await this.$http
        .post(this.$apis.UserPersonal, { token: this.token })
        .then(data => {
          this.myRecode = data.data.recode;
          this.level = data.data.level;
        })
        .catch(data => {});
      this.proDetails = {}; //商品详情
      this.hotpush = []; //热推商品
      this.merchant_ssq = "";
      this.address = "";
      this.information_text = "";
      this.product_info = "";
      this.product_useinfo = "";
      this.product_notice = "";
      let proDetails = await this.$http
        .post(this.$apis.ProductDetails, {
          token: this.token,
          type: 2, // 1未定位 2已定位
          pr_id: this.productId,
          lat: this.latitude,
          lng: this.longitude
        })
        .then(data => {
          this.proDetails = data.data;
          this.hotpush = data.data.hotpush;
          this.lat = data.data.details.shop[0].merchant_lat;
          this.lng = data.data.details.shop[0].merchant_lng;
          this.merchant_ssq = data.data.details.shop[0].merchant_ssq;
          this.address = data.data.details.shop[0].merchant_address;

          this.information_text = data.data.details.product_description.replace(/\<img/gi,'<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
          this.product_info = data.data.details.product_info.replace( /\<img/gi,'<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
          this.product_useinfo = data.data.details.product_useinfo.replace(/\<img/gi,'<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
          this.product_notice = data.data.details.product_notice.replace(/\<img/gi,'<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');

          this.countdown(data.data.details.product_starttime,data.data.details.product_endtime)
        })
        .catch(data => {});
    },
    showSpecification(boolean){ //规格模态窗展示
      boolean ? this.modal_specification_box = true : this.modal_specification_box = false;
    },
    selMerchant: function(index, lat, lng, ssq, address) {
      this.merchant_index = index;
      this.lat = lat;
      this.lng = lng;
      this.merchant_ssq = ssq;
      this.address = address;
    },
    gotoMap: function() {
      let poi = this.bd2gcj(this.lng, this.lat);
      let latitude = parseFloat(poi.lat);
      let longitude = parseFloat(poi.lng);
      let name = this.proDetails.details.shop[this.merchant_index]
        .merchant_name;
      let address = this.address;
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name,
        address
      });
    },
    bd2gcj: function(lng, lat) {
      var M_PI = 3.14159265358979324;
      var x_pi = M_PI * 3000.0 / 180.0;
      var poi = {};
      var x = lng - 0.0065,
        y = lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
      poi.lng = z * Math.cos(theta);
      poi.lat = z * Math.sin(theta);
      return poi;
    },
    scrollTo: function(index) {
      this.secTitle = index;
      if (index == 1) {
        wx.pageScrollTo({
          scrollTop: this.scroll1,
          duration: 500
        });
      } else if (index == 2) {
        wx.pageScrollTo({
          scrollTop: this.scroll2,
          duration: 500
        });
      }
    },
    goToDetails(product_Id) {
      wx.redirectTo({
        url: "/pages/productDetails/main?productId=" + product_Id
      });
    },
    countdown(startTimeIn,endTimeIn){
      var that =this;
      that.myTimer = setInterval(function(){
        var nowTime = new Date().getTime();
        var startTime = startTimeIn * 1000;
        var endTime = endTimeIn * 1000;
        
        var t = endTime - nowTime;
        var k = startTime - nowTime;
        
        if(k > 0){
          var day = Math.floor(k / 86400000);
          var hour = Math.floor((k / 3600000) % 24);
          var min = Math.floor((k / 60000) % 60);
          var sec = Math.floor((k / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          that.countdownShow = "距开始："+day+"天"+hour+"时"+min+"分"+sec+"秒";
        }
        
        if(t > 0 && k < 0) {
          var day = Math.floor(t / 86400000);
          var hour = Math.floor((t / 3600000) % 24);
          var min = Math.floor((t / 60000) % 60);
          var sec = Math.floor((t / 1000) % 60);
          hour = hour < 10 ? "0" + hour : hour;
          min = min < 10 ? "0" + min : min;
          sec = sec < 10 ? "0" + sec : sec;
          that.countdownShow = "距结束："+day+"天"+hour+"时"+min+"分"+sec+"秒";
          that.pageRefresh = false;
        } else if(t < 0){
          clearInterval(that.myTimer);
          that.countdownShow = '已结束'
        }
      }, 1000);
    },
    jumpToHomePage(){ //回到首页
      wx.switchTab({
        url: "/pages/index/main"
      })
    },
    ContactMerchant(boolean){  //商家信息展示
      boolean ? this.modal_merchant_box = true : this.modal_merchant_box = false;
    },
    shareProduct(boolean){ //分享
      boolean ? this.modal_share_box = true : this.modal_share_box = false;
    },
    BuyNow(pid,priId){ //点击购买
      wx.navigateTo({
        url: '/pages/orderPayment/main?productId=' + pid + '&priceId=' + priId
      })
    },
    callPhone(phone){
      wx.makePhoneCall({
        phoneNumber: phone 
      })
    },
    selGuige(index){
      this.priceIndex = index;
    },
    createPoster(){
      this.modal_share_box = false;
      this.$http.post(this.$apis.ProductShare, {
        token: this.token,
        pr_id: this.productId,
        url: this.$http.BASE_SERVER + '/wechat_html/page/homePage/productDetails.html'
      })
      .then(data => {
        this.modal_poster_box = true;
        // this.drawAndShareImage(data.data.poster+"?time="+new Date().getTime(),data.data.QRCode+"?time="+new Date().getTime(),20,1185,130,130)
        const canvas = wx.createCanvasContext('mycanvas');
        canvas.drawImage(data.data.poster, 0, 0, 375, 667);
        canvas.drawImage(data.data.QRCode, 10, 592, 65,65)
        let that = this;
        canvas.draw(true,function(){
          setTimeout(function () {
            wx.canvasToTempFilePath({
              fileType: 'jpg',
              quality: 1,
              canvasId: 'mycanvas',
              success: function (res) {
                console.log(res)
                // that.shareImg = res.tempFilePath;
                wx.getImageInfo({
                  src: res.tempFilePath,
                  success(d) {
                    console.log(d)
                    that.shareImg = d.path;
                  }
                })
              },
              fail: function (res) {
                console.log(res);
              }
            });
          },300);
        });
      })
      .catch(data => {});
    },
    saveImg(){
      wx.saveImageToPhotosAlbum({
        success(res) {
          console.log(res)
        }
      })
    },
    createUrl(){
      this.modal_share_box = false;
      this.modal_url_box = true;
    },
    sharePoster(boolean){
      boolean ? this.modal_poster_box = true : this.modal_poster_box = false;
      boolean ? '' : this.shareImg = '';
    },
    shareUrl(boolean){
      boolean ? this.modal_url_box = true : this.modal_url_box = false;
    },
  }
};
</script>

<style scoped lang="less">
.header_box {
  width: 100%;
  overflow-x: hidden;
  .header_banner_box {
    /* 轮播 */
    .swiper {
      height: 360rpx;
      .slide-image {
        width: 100%;
        height: 360rpx;
      }
    }
  }
  //规格
  .price_box {
    color: #ffffff;
    font-size: 24rpx;
    background: linear-gradient(
      90deg,
      rgba(255, 129, 41, 1) 0%,
      rgba(220, 38, 9, 1) 100%
    );
    width: 94%;
    height: 70rpx;
    line-height: 70rpx;
    padding: 0 3%;
    .reality_price {
      font-size: 48rpx;
    }
    .original_cost {
      text-decoration: line-through;
      margin-left: 10rpx;
    }
    .count_down {
      float: right;
    }
  }
  .new_priceBox {
    background: linear-gradient(to right, #fe6901 0%, #ee0d73 100%);
  }
  .is_numNone {
    background: #999999 !important;
  }
  //商品名称价格
  .text_introduce {
    padding: 16rpx 22rpx;
    position: relative;
    min-height: 262rpx;
    .text_showOne {
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      letter-spacing: -1rpx;
      line-height: 40rpx;
      padding-bottom: 110rpx;
    }
    .text_label {
      position: absolute;
      bottom: 20rpx;
      left: 0;
      width: 100%;
      padding: 0 22rpx;
      .tags_name {
        display: inline-block;
        border: 1rpx solid #f7ae31;
        border-radius: 8rpx;
        padding: 3rpx 10rpx;
        color: #f7ae31;
        font-size: 22rpx;
        font-weight: 500;
        margin-right: 10rpx;
      }
      .commission {
        margin-top: 10rpx;
        border: none;
        color: #999999;
        font-size: 26rpx;
        font-weight: 500;
        span {
          color: #f77917;
          font-size: 36rpx;
          font-weight: 500;
          letter-spacing: -2rpx;
        }
      }
    }
  }
  //库存
  .total_num_box {
    color: #333333;
    font-size: 24rpx;
    font-weight: 400;
    height: 55rpx;
    line-height: 55rpx;
    overflow: hidden;
    .pro_kuncun {
      float: left;
      margin-left: 22rpx;
    }
    .pro_yishou {
      float: right;
      margin-right: 22rpx;
    }
  }
}
.specification_box {
  .specification_list {
    padding: 0 3%;
    height: 84rpx;
    line-height: 84rpx;
    border-top: 1rpx solid #f2f2f2;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    .specification_title {
      width: 12%;
      display: block;
      height: 84rpx;
      line-height: 84rpx;
      float: left;
    }
    .specification_text {
      font-size: 28rpx;
      color: #333333;
      margin-left: 3%;
      display: block;
      width: 69%;
      height: 84rpx;
      line-height: 84rpx;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .specification_img {
      display: block;
      float: right;
      height: 84rpx;
      line-height: 84rpx;
      width: 10%;
      text-align: right;
      img {
        width: 45rpx;
        height: 10rpx;
      }
    }
  }
  .specification_merchant {
    height: auto;
    overflow: auto;
    .specification_title {
      width: 10%;
      float: left;
    }
    .selAddress_right {
      width: 90%;
      float: right;
      .radio {
        display: inline-block;
        height: 40rpx;
        line-height: 40rpx;
        padding: 8rpx 26rpx;
        border-radius: 8rpx;
        margin-left: 10rpx;
        margin-top: 8rpx;
        background-color: #f6f6f6;
        color: #333333;
      }
      .checked {
        background-color: #ff8b30;
        color: #ffffff;
      }
    }
  }
  .header_space {
    widows: 100%;
    background-color: #f2f2f2;
    height: 10rpx;
  }
}
// 内容
.content_box {
  .content_header_box {
    width: 100%;
    height: 88rpx;
    .content_header_isPosition {
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      background-color: #ffffff;
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      border-bottom: 1rpx solid #f2f2f2;
      .content_sec {
        position: relative;
      }
      .content_checked:before {
        content: "";
        position: absolute;
        left: 30%;
        bottom: 0;
        width: 40%;
        height: 6rpx;
        background-color: #f77917;
      }
    }
    .isFixdCss {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 20;
    }
  }
  .content_text_box {
    padding: 8rpx 20rpx;
    .information {
      .information_img {
        background-size: 100% 100%;
        text-align: center;
        width: 360rpx;
        height: 120rpx;
        line-height: 120rpx;
        font-size: 34rpx;
        color: #333333;
        margin: 20rpx auto;
      }
    }
  }
  .content_space {
    widows: 100%;
    background-color: #f2f2f2;
    height: 10rpx;
  }
  .content_footer_box {
    .content_footer_header {
      width: 100%;
      text-align: center;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 32rpx;
      color: #333333;
    }
    swiper{
      height: 888rpx;
      swiper-item{
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        .div{
          flex: 1;
          width: 50%;
          min-width: 50%;
          max-width: 50%;
        }
      }
    }
  }
}
//尾部
.footer_box{
  width: 100%;
  height: 98rpx;
  z-index: 20;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #ffffff;
  .down_Btn{
    width: 100%;
    height: 98rpx;
    text-align: center;
    font-size: 34rpx;
    font-weight: 500;
    box-shadow: 0 -1rpx 10rpx 1rpx rgba(0, 0, 0, 0.3);
    .downBtnOne {
      width: 17%;
      float: left;

      font-size: 22rpx;
      color: #333333;
      background-color: #FFFFFF;
      height: 98rpx;
      i{
        font-size: 36rpx;
        display: inline-block;
        height: 55rpx;
        line-height: 55rpx;
      }
      div{
        height: 53rpx;
        line-height: 40rpx;
        font-size: 22rpx;
        font-weight: 400;
        color: #333333;
      }
    }
    .ContactMerchant{
      width: 13%;
      float: left;

      font-size: 22rpx;
      color: #333333;
      background-color: #FFFFFF;
      height: 98rpx;
      padding-right: 5%;
      i{
        font-size: 36rpx;
        display: inline-block;
        height: 55rpx;
        line-height: 55rpx;
      }
      div{
        height: 53rpx;
        line-height: 40rpx;
        font-size: 22rpx;
        font-weight: 400;
        color: #333333;
      }
    }
    .downBtnTwo {
      width: 24%;
      float: left;
      color: #FFFFFF;
      background-color: #E1B872;
      line-height: 98rpx;
    }
    .downBtnThree {
      width: 41%;
      float: left;
      color: #FFFFFF;
      background-color: #F77917;
      line-height: 98rpx;
    }
    .downBtnThree a{
      display: inline-block;
      width: 100%;
      color: #FFFFFF;
      background-color: #F77917;
    }
    .downBtnFour {
      width: 65%;
      float: left;
      color: #FFFFFF;
      background-color: #999999;
      line-height: 98rpx;
    }
    .downBtnFive{
      width: 48%;
      height: 98rpx;
      float: left;
      color: #FFFFFF;
      background-color: #F77917;
      font-size: 24rpx;
      line-height: 98rpx;
    }
    .downBtnSix{
      width: 17%;
      float: left;
      color: #FFFFFF;
      background-color: #E1B872;
      line-height: 98rpx;
    }
  }
}
//模态窗
.modal{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 30;
  transition: top linear 0.2s;
}
.modal_specification_box{
  top: 0 !important;
  z-index: 15 !important;
}
.specification_css{
  .modal_specification_box{
    width: 100%;
    height: 50vh;
    margin-top: 50vh;
    background-color: #FFFFFF;
    border-top-left-radius: 10rpx;
    border-top-right-radius: 10rpx;
    overflow: hidden;
    .specification_content{
      width: 94%;
      margin: 10rpx 3% 0 3%;
      border-bottom: 1rpx solid #f2f2f2;
      overflow: hidden;
      position: relative;
      .icon-close_icon{
        position: absolute;
        top: 10rpx;
        right: 0;
      }
      .left_image{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        width: 188rpx;
        height: 164rpx;
        border-radius: 10rpx;
        float: left;
      }
      .right_price{
        width: 480rpx;
        height: 200rpx;
        float: right;
        .shou_jia{
          font-size: 32rpx;
          color: #F77917;
          font-weight: 500;
        }
        .pro_name{
          font-size: 32rpx;
          color: #333333;
          width: 480rpx;
          font-weight: 500;
          margin-top: 14rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .detail_box{
          margin-top: 22rpx;
          font-size: 28rpx;
          color: #999999;
          font-weight: 400;
          .specification_kucun{
            float: left;
          }
          .specification_yishou{
            float: right;
          }
        }
      }
    }
    .selGuigeBox{
      width: 100%;
      height: 250rpx;
      overflow-y: scroll;
      .radio{
        display:inline-block;
        font-size: 24rpx;
        height:40rpx;
        line-height:40rpx;
        padding:8rpx 26rpx;
        border-radius:8rpx;
        margin-left:15rpx;
        margin-top:10rpx;
        background-color:#f6f6f6;
        color:#333333;
      }
      .checked{
        background-color:#ff8b30;
        color:#ffffff;
      }
    }
  }
}
.modal_merchant_box{
  top: 0 !important;
}
.merchant_css{
  .merchant_box{
    width: 650rpx;
    height: 540rpx;
    background-color: #FFFFFF;
    margin: 0 auto;
    margin-top: 250rpx;
    border-radius: 10rpx;
    overflow: hidden;
    .merchant_box_header{
      width: 100%;
      height: 120rpx;
      background-size: 45% 45%;
      background-position: center center;
      background-repeat: no-repeat;
    }
    .merchant_box_content{
      width: 98%;
      padding-left: 2%;
      height: 400rpx;
      overflow-y: scroll;
      .merchant_list{
        height: 138rpx;
        border-bottom: 1rpx solid #f2f2f2;
        .merchant_list_Left{
          float: left;
          width: 75%;
          font-size: 24rpx;
          .merchant_list_shopName{
            color: #999999;
            margin-top: 20rpx;
            margin-left: 28rpx;
          }
          .merchant_list_phone{
            color: #333333;
            margin-top: 12rpx;
            .merchant_list_dian{
              display: inline-block;
              vertical-align: middle;
              width: 8rpx;
              height: 8rpx;
              border-radius: 4rpx;
              background-color: #FF8B30;
              margin-left: 14rpx;
              margin-right: 6rpx;
            }
            span{
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        .merchant_list_Right{
          height: 138rpx;
          float: right;
          width: 25%;
          text-align: center;
          img{
            width: 60rpx;
            height: 60rpx;
            margin-top: 39rpx;
          }
        }
      }
    }
  }
}
.modal_share_box{
  top: 0 !important;
}
.share_css{
  .share_box{
    position: absolute;
    left: 25rpx;
    bottom: 26rpx;
    width: 700rpx;
    height: 274rpx;
    background-color: #FFFFFF;
    border-radius: 14rpx;
    text-align: center;
    font-size: 28rpx;
    color: #333333;
    font-weight: 500;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    align-items: center;
    -webkit-align-items: center;
    img{
      width: 144rpx;
      height: 144rpx;
    }
    .create_img{
      margin-bottom: 10rpx;
    }
    .create_url{
      margin-bottom: 10rpx;
    }
  }
}
.modal_poster_box{
  top: 0 !important;
}
.poster_css{
  text-align: center;
  .poster_box{
    display: inline-block;
    margin-top: 4vh;
    width: 590rpx;
    text-align: center;
    img{
      width: 590rpx;
      height: 1044rpx;
      border-radius: 14rpx;
    }
  }
}
.modal_url_box{
  top: 0 !important;
  background-color: rgba(0, 0, 0, 0.6);
}
.url_css{
  .url_box{
    img{
      width: 750rpx;
      height: 698rpx;
    }
  }
}
</style>
