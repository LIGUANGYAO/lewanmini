<template>
  <div class="" v-if="proDetails.details">
    <div class="header_box">
      <div class="header_banner_box">
        <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
          <block v-for="(item, index) in proDetails.details.product_carousel" :key="index">
              <swiper-item>
                  <image v-if="item" :src="item" class="slide-image" lazy-load mode="scaleToFill"/>
              </swiper-item>
          </block>
        </swiper>
      </div>
      <div v-if="proDetails.details.product_returnall == 1" class="price_box new_priceBox" :class="{'is_numNone': proDetails.details.sold_out == 1}">
        <span class="reality_price">¥{{ proDetails.price[priceIndex].price_sale }}</span>
        <span class="original_cost">¥{{ proDetails.price[priceIndex].price_market }}</span>
        <span class="count_down" v-if="proDetails.details.sold_out == 0">限首次注册会员免费使用</span>
        <span class="count_down" v-else-if="proDetails.details.sold_out == 1">商品已售罄</span>
      </div>
      <div v-else class="price_box" :class="{'is_numNone': proDetails.details.sold_out == 1}">
        <span class="reality_price">¥{{ proDetails.price[priceIndex].price_sale }}</span>
        <span class="original_cost">¥{{ proDetails.price[priceIndex].price_market }}</span>
        <span class="count_down count_down_time_show" v-if="proDetails.details.product_timelimit == 1"></span>
        <span class="count_down" v-else-if="proDetails.details.sold_out == 1">商品已售罄</span>
      </div>
      <div class="text_introduce">
        <div class="text_showOne"><strong>{{ proDetails.details.product_name }}</strong></div>
        <div v-if="proDetails.details.product_returnall == 1" class="text_label">
          <span class="tags_name" v-for="(item,index) in proDetails.details.product_tags" :key="index">{{ item.tag_name }}</span>
          <div v-if="level == 2 || level == 3 || level == 4 || level == 5" class="commission">佣金：<span>￥{{ proDetails.price[priceIndex].price_sale }}</span></div>
        </div>
        <div v-else class="text_label">
          <span class="tags_name" v-for="(item,index) in proDetails.details.product_tags" :key="index">{{ item.tag_name }}</span>
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
      <div class="specification_list">
        <span class="specification_title">规格:</span>
        <span class="specification_text">{{proDetails.price[priceIndex].product_property}}</span>
        <span class="specification_img"><img src="http://oss.lewan6.ren/uploads/idcard/20190313/d11c73e572f24ed70e82aa0442a382fedb27c1ce.png" alt=""></span>
      </div>
      <div class="specification_list specification_merchant">
        <div class="specification_title">商家:</div>
        <div class="selAddress_right">
          <label class="radio" :class="{'checked':index == merchant_index}" @tap='selMerchant(index,item.merchant_lat,item.merchant_lng,item.merchant_ssq,item.merchant_address)' v-for="(item,index) in proDetails.details.shop" :key="index">
            {{item.merchant_name}}
          </label>
        </div>
      </div>
      <div class="specification_list" @tap="gotoMap()">
        <span class="specification_title">地址:</span>
        <span class="specification_text">{{ merchant_ssq }}{{ address }}</span>
        <span class="specification_img"><i class="iconfont icon-arrow-right"></i></span>
      </div>
      <div class="header_space"></div>
    </div>
    <div class="content_box">
      <div class="content_header_box">
        <div class="content_header_isPosition" id="isPositionBtn" :class="{'isFixdCss': isFixd}">
          <span class="content_sec" :class="{'content_checked': secTitle == 1}" @tap="scrollTo(1)">特色介绍</span>
					<span class="content_sec" :class="{'content_checked': secTitle == 2}" @tap="scrollTo(2)">购买须知</span>
        </div>
      </div>
      <div class="content_text_box">
        <!--特色介绍-->
        <div class="information" id="scroll1">
          <div class="information_img" style="background-image: url('http://oss.lewan6.ren/uploads/html/20190315/51cb90cdc740648fe56d1e8cf9e921ef43e0fe46png');">特色介绍</div>
          <!-- <div class="information_text" id="informationText" v-html="information_text"></div> -->
        </div>
        <!--购买须知-->
        <div class="purchase_notes" id="scroll2">
          <div class="">
            <p>【产品详情】</p>
            <!-- <div class="purchase_notesText" v-html="product_info"></div> -->
          </div>
          <div class="">
            <p>【使用方法】</p>
            <!-- <div class="purchase_notesText" v-html="product_useinfo"></div> -->
          </div>
          <div class="">
            <p>【温馨提示】</p>
            <!-- <div class="purchase_notesText" v-html="product_notice"></div> -->
          </div>
        </div>
      </div>
      <div class="content_space"></div>
      <div class="content_footer_box" v-if="hotpush.length">
        <!-- 更多推荐 -->
        <div class="content_footer_header">更多推荐</div>
         <more-product v-for="(item,index) in hotpush" :key="index" :item="item" :level="level"/>
        <!-- <div v-for="(item,index) in proDetails.hotpush" :key="index" >{{item.merchant_name}}</div> -->
        <!-- <swiper class="swiper" indicator-dots="true" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
          <block> -->
              <!-- <swiper-item>
                  <more-product v-on:goToDetails="goToDetails" v-for="(item,index) in proDetails.hotpush" :key="index" :item="item" :level="level"/>
              </swiper-item> -->
              <!-- <swiper-item>
                  <more-product v-on:goToDetails="goToDetails" :item="item" v-for="(item,index) in proDetails.hotpush.slice(4, 8)" :key="index" :level="level"/>
              </swiper-item> -->
          <!-- </block>
        </swiper> -->
      </div>
    </div>
  </div>
</template>

<script>
import MoreProduct from '@/components/more-product';
export default {
  data() {
    return {
      token: 'c058048709c83de14ab803392b4dc1ac',
      productId: '205',
      latitude: 30.65618,
      longitude: 104.08329,
      proDetails: {},
      hotpush: [], //热推商品
      level: 1,
      myRecode: '',
      priceIndex: 0,	//默认选中第一个
      merchant_index: 0,
      lat: '',
      lng: '',
      merchant_ssq: '',
      address: '',
      secTitle: 1,
      isFixd: false,  //是否吸顶
      isPositionMenuTop: '',  //切换按钮距离顶部位置
      scroll1: '',  //特色介绍距离顶部位置
      scroll2: '',  //购买须知距离顶部位置
      information_text: '', //特色介绍
      product_info: '', //产品详情
      product_useinfo: '',//使用方法
      product_notice: '',//温馨提示
    };
  },
  components: {
    MoreProduct
  },
  // computed:{
  //   qianSi: function () {
  //     console.log(this.proDetails.hotpush)
  //     return this.proDetails.hotpush.filter(function (item,index) {
  //       return index<4;
  //     })
  //   },
  //   houSi: function () {
  //     return this.proDetails.hotpush.filter(function (item,index) {
  //       return index>=4 && index<8;
  //     })
  //   }
  // },
  // watch:{ 
  //   proDetails: function(val){
  //     console.log(val)
  //   }
  // }, 
  onLoad: function(option){
    // this.productId = option.productId;
    this.getData();
  },
  onPageScroll:function(e){
    let _this = this;
    let scrollTop = e.scrollTop;
    if(_this.isPositionMenuTop <= 0 || _this.isPositionMenuTop == ''){
      wx.createSelectorQuery().select('#isPositionBtn').boundingClientRect(function(res){
        _this.isPositionMenuTop = res.top + scrollTop;
      }).exec()
      wx.createSelectorQuery().select('#scroll1').boundingClientRect(function(res){
        _this.scroll1 = res.top + scrollTop -44;
      }).exec()
      wx.createSelectorQuery().select('#scroll2').boundingClientRect(function(res){
        _this.scroll2 = res.top + scrollTop -44;
      }).exec()
    }else{
      if(scrollTop > _this.isPositionMenuTop){
        _this.isFixd =true;
      }else{
        _this.isFixd =false;
      }
    }
  },
  components: { },
  created() {

    },
  mounted() {
    
  },
  methods: {
    async getData() {
      this.proDetails = {}; //商品详情
      this.hotpush = []; //热推商品
      this.merchant_ssq = '';
      this.address = '';
      this.information_text = '';
      this.product_info = '';
      this.product_useinfo = '';
      this.product_notice = '';
      let proDetails = await this.$http.post(this.$apis.ProductDetails, {
          token: this.token,
          type: 2, // 1未定位 2已定位
          pr_id: this.productId,
          lat: this.latitude,
          lng: this.longitude,
        })
        .then(data => {
          this.proDetails = data.data;
          this.hotpush = data.data.hotpush;
          this.lat = data.data.details.shop[0].merchant_lat;
					this.lng = data.data.details.shop[0].merchant_lng;
          this.merchant_ssq = data.data.details.shop[0].merchant_ssq;
          this.address = data.data.details.shop[0].merchant_address;
          
					this.information_text = data.data.details.product_description.replace(/\<img/gi, '<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
					this.product_info = data.data.details.product_info.replace(/\<img/gi, '<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
					this.product_useinfo = data.data.details.product_useinfo.replace(/\<img/gi, '<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
					this.product_notice = data.data.details.product_notice.replace(/\<img/gi, '<img lazy-load mode="scaleToFill" style="width:100%;height:auto" ');
        })
        .catch(data => {
          
        });
      this.myRecode = ''; //用户邀请码
      this.level = 1; //用户等级
      let UserInfo = await this.$http.post(this.$apis.UserPersonal, { token: this.token})
        .then(data => {
          this.myRecode = data.data.recode;
					this.level = data.data.level;
        })
        .catch(data => {
          
        });
      },
    selMerchant: function(index,lat, lng, ssq,address){
      this.merchant_index = index;
      this.lat = lat;
      this.lng = lng;
      this.merchant_ssq = ssq;
      this.address = address;
    },
    gotoMap: function(){
      let poi = this.bd2gcj(this.lng,this.lat);
      let latitude = parseFloat(poi.lat);
      let longitude = parseFloat(poi.lng);
      let name = this.proDetails.details.shop[this.merchant_index].merchant_name;
      let address = this.address;
      wx.openLocation({
        latitude,
        longitude,
        scale: 18,
        name,
        address
      })
    },
    bd2gcj: function(lng,lat) {
      var M_PI = 3.14159265358979324;
      var x_pi = M_PI * 3000.0 / 180.0;
      var poi = {};
      var x = lng - 0.0065, y = lat - 0.006;
      var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
      var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
      poi.lng = z * Math.cos(theta);
      poi.lat = z * Math.sin(theta);
      return poi;
    },
    scrollTo: function(index){
      this.secTitle = index;
      if(index == 1){
        wx.pageScrollTo({
          scrollTop: this.scroll1,
          duration: 500
        })
      }else if(index ==2){
        wx.pageScrollTo({
          scrollTop: this.scroll2,
          duration: 500
        })
      }
    },
    goToDetails(product_Id){
      wx.navigateTo({
        url: '/pages/productDetails/main?productId=' + product_Id
      })
    },
  }
}
</script>

<style scoped lang="less">
.header_box{
  width: 100%;
  overflow-x: hidden;
  .header_banner_box{
    /* 轮播 */
    .swiper{
      height: 360rpx;
      .slide-image{
        width: 100%;
        height: 360rpx; 
      }
    }
  }
  //规格
  .price_box{
    color: #FFFFFF;
    font-size: 24rpx;
    background: linear-gradient(90deg,rgba(255,129,41,1) 0%,rgba(220,38,9,1) 100%);
    width: 100%;
    height: 70rpx;
    line-height: 70rpx;
    padding: 0 20rpx;
    .reality_price{
      font-size: 48rpx;
    }
    .original_cost{
      text-decoration: line-through;
      margin-left: 10rpx;
    }
    .count_down{
      float: right;
    }
  }
  .new_priceBox{
    background: linear-gradient(to right, #FE6901 0%,#EE0D73 100%);
  }
  .is_numNone{
    background: #999999 !important;
  }
  //商品名称价格
  .text_introduce{
    padding: 16rpx 22rpx;
    position: relative;
    min-height: 262rpx;
    .text_showOne{
      font-size: 30rpx;
      font-weight: bold;
      color: #333333;
      letter-spacing: -1rpx;
      line-height: 40rpx;
      padding-bottom: 110rpx;
    }
    .text_label{
      position: absolute;
      bottom: 20rpx;
      left: 0;
      width: 100%;
      padding: 0 22rpx;
      .tags_name{
        display: inline-block;
        border: 1rpx solid #F7AE31;
        border-radius: 8rpx;
        padding: 3rpx 10rpx;
        color: #F7AE31;
        font-size: 22rpx;
        font-weight: 500;
        margin-right: 10rpx;
      }
      .commission{
        margin-top: 10rpx;
        border: none;
        color: #999999;
        font-size: 26rpx;
        font-weight: 500;
        span{
          color: #F77917;
          font-size: 36rpx;
          font-weight: 500;
          letter-spacing: -2rpx;
        }
      }
    }
  }
  //库存
  .total_num_box{
    color: #333333;
    font-size: 24rpx;
    font-weight: 400;
    height: 55rpx;
    line-height: 55rpx;
    overflow: hidden;
    .pro_kuncun{
      float: left;
      margin-left: 22rpx;
    }
    .pro_yishou{
      float: right;
      margin-right: 22rpx;
    }
  }
}
.specification_box{
  .specification_list{
    padding: 0 3%;
    height: 84rpx;
    line-height: 84rpx;
    border-top: 1rpx solid #f2f2f2;
    font-weight: 400;
    font-size: 24rpx;
    color: #999999;
    .specification_title{
      width: 12%;
      display: block;
      height: 84rpx;
      line-height: 84rpx;
      float: left;
    }
    .specification_text{
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
    .specification_img{
      display: block;
      float: right;
      height: 84rpx;
      line-height: 84rpx;
      width: 10%;
      text-align: right;
      img{
        width: 45rpx;
        height: 10rpx;
      }
    }
  }
  .specification_merchant{
    height: auto;
    overflow: auto;
    .specification_title{
      width: 10%;
      float: left;
    }
    .selAddress_right{
      width: 90%;
      float: right;
      .radio{
        display: inline-block;
        height: 40rpx;
        line-height: 40rpx;
        padding: 8rpx 26rpx;
        border-radius: 8rpx;
        margin-left: 10rpx;
        margin-top: 8rpx;
        background-color: #F6F6F6;
        color: #333333;
      }
      .checked{
        background-color: #FF8B30;
        color: #ffffff;
      }
    }
  }
  .header_space{
    widows: 100%;
    background-color: #f2f2f2;
    height: 10rpx;
  }
}
// 内容
.content_box{
  .content_header_box{
    width: 100%;
    height: 88rpx;
    .content_header_isPosition{
      display: flex;
      display: -webkit-flex;
      justify-content:space-around;
      -webkit-justify-content: space-around;
      font-size: 32rpx;
      font-weight: 500;
      color: #333333;
      background-color: #FFFFFF;
      width: 100%;
      height: 88rpx;
      line-height: 88rpx;
      border-bottom: 1rpx solid #f2f2f2;
      .content_sec{
        position: relative;
      }
      .content_checked:before {
        content: "";
        position: absolute;
        left: 30%;
        bottom: 0;
        width: 40%;
        height: 6rpx;
        background-color: #F77917;
      }
    }
    .isFixdCss{
      position: fixed;
      top: 0;
      left: 0;
    }
  }
  .content_text_box{
    padding: 8rpx 20rpx;
    .information{
      .information_img{
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
  .content_space{
    widows: 100%;
    background-color: #f2f2f2;
    height: 10rpx;
  }
  .content_footer_box{
    .content_footer_header{
      width: 100%;
      text-align: center;
      height: 70rpx;
      line-height: 70rpx;
      font-size: 32rpx;
      color:#333333;
    }
  }
}
</style>
