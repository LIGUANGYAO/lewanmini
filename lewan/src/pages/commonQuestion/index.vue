<template>
  <div>
   <div>
     <div class="tilte_img">
       <img src="" alt="">
     </div>
     <div class="question">
       <div class="page_title">常见问题</div>
       <div class="question_box">
         <div class="que_list" @tap="look_details(1)">
            <div class="question_list_title">1：购买商品后电子码丢失如何找回 ？</div>
						<div class="isShow" :class="{'show': showId == 1}">进入“乐玩联盟”商城首页，找到我的个人中心，查看我的订单，点击选择该商品订单详情即可看见电子码 。</div>
         </div>
         <div class="que_list" @tap="look_details(2)">
            <div class="question_list_title">2：购买需提前预约产品怎么预约？</div>
						<div class="isShow" :class="{'show': showId == 2}">进入“乐玩联盟”首页，点击底部菜单“预约中心”，进入页面后选择消费日期，进行预约即可。</div>
         </div>
         <div class="que_list" @tap="look_details(3)">
            <div class="question_list_title">3：预约后想更换或取消预约日期在哪里修改呢？</div>
						<div class="isShow" :class="{'show': showId == 3}">联系客服微信，出示所购买的姓名，手机号码，产品，数量以及更换预约日期沟通即可。<br>（注：只针对可取消预约商品，取消规则以该商品详情为准。）</div>
         </div>
         <div class="que_list" @tap="look_details(4)">
            <div class="question_list_title">4：购买商品后发现不适合不想要可以退换吗 ？</div>
						<div class="isShow" :class="{'show': showId == 4}">所有抢购商品购买后一律不退不换，以商品详情为准。</div>
         </div>
         <div class="que_list" @tap="look_details(5)">
            <div class="question_list_title">5：邮寄商品多久能到呢？</div>
						<div class="isShow" :class="{'show': showId == 5}">邮寄商品本地区域1-2天，外地3-5天（视商品始发地-目的地，以及节假日是否会延迟具体情况为准）。</div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showId: 0,
    };
  },
  components: {},
  created() {},
  mounted() { },
  methods: {
    look_details(id){
      this.showId = id;
    }
  }
};
</script>

<style scoped lang="less">
  @333:#333333;
  .tilte_img{
    width: 750rpx;
    height: 340rpx;
    img{
      width: 750rpx;
      height: 340rpx;
    }
  }
  .question{
    .page_title{
      font-size: 32rpx;
      font-weight: 500;
      color: @333;
      margin: 40rpx 0 0 40rpx;
    }
    .question_box{
      padding-left: 40rpx;
      .que_list{
        border-bottom: 1rpx solid #f2f2f2;
        padding-right: 20rpx;
        .question_list_title{
          font-size: 28rpx;
          font-weight: 400;
          margin-top: 38rpx;
          margin-bottom: 38rpx;
        }
        .isShow{
          height: 0;
          display: none;
          font-size: 26rpx;
          font-size: 200;
          color: #999999;
          margin-bottom: 30rpx;
        }
        .show{
          height: auto;
          display: block;
        }
      }
    }
  }
</style>
