<template>
  <div>
    <div class="input_name_box">
      <input type="search" class="input_name" v-model="product_name" maxlength="15" placeholder="输入商品名称进行查询">
    </div>
    <div class="title_box">
      <navigator class="title_menu" url="/pages/reservationList/main">
        <img src="" alt="">
        <div>我的预约</div>
      </navigator>
      <navigator class="title_menu" url="/pages/myIndent/main">
        <img src="" alt="">
        <div>我的订单</div>
      </navigator>
      <navigator class="title_menu" url="/pages/commonQuestion/main">
        <img src="" alt="">
        <div>常见问题</div>
      </navigator>
    </div>
    <div class="product_box">
      <div class="product_title">
        <span class="fang"></span>
        <span class="fang_name">预约商品</span>
      </div>
      <div class="product_list_box">
        <reservation-card :item="item" v-on:reservationCardId="reservationCardId" v-for="(item,index) in product_list" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationCard from "@/components/reservation-card";
export default {
  data() {
    return {
      token: 'c058048709c83de14ab803392b4dc1ac',
      product_name: "",
      product_list: [],
      page: 1,
      psize: 10,
    };
  },

  components: {
    ReservationCard,
  },

  created() {
    this.getData()
  },
  mounted() {
    
  },
  methods: {
    async getData() {
      this.product_list = [];
      let product_list = await this.$http.post(this.$apis.ConsumeBookedProduct, {
          token: this.token,
					type: 2,
					paging: this.page,
					title: this.product_name || null
        })
        .then(data => {
          this.product_list = data.data;
        })
        .catch(data => {
          
        });
    },
    reservationCardId(product_Id){
      wx.navigateTo({
        url: '/pages/reservationList/main?product_Id='+product_Id
      })
    },
  }
};
</script>

<style scoped lang="less">
@333:#333333;
  .input_name_box{
    height: 120rpx;
    text-align: center;
    background-color: #F5F6FA;
    .input_name{
      display: inline-block;
      width: 658rpx;
      height: 68rpx;
      margin-top: 26rpx;
      font-size: 28rpx;
      font-weight: 300;
      color: @333;
      background-color: #ffffff;
      border-radius: 8rpx;
    }
  }
  .title_box{
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    padding-top: 40rpx;
    padding-bottom: 40rpx;
    .title_menu{
      text-align: center;
      img{
        width: 120rpx;
        height: 120rpx;
      }
      div{
        font-size: 28rpx;
        font-weight: 300;
        color: @333;
      }
    }
  }
  .product_box{
    .product_title{
      .fang{
        display: inline-block;
        width: 12rpx;
        height: 28rpx;
        background-color: @333;
        margin-left: 24rpx;
      }
      .fang_name{
        font-size: 32rpx;
        font-weight: 500;
        color: @333;
        margin-left: 24rpx;
      }
    }
  }
</style>
