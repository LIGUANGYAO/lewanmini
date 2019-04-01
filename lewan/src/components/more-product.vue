<template>
  <div class="exList" @tap="getId(item.product_id)">
  <!-- <div class="exList" @tap="getId(item.product_id)"> -->
    <!-- <div class="exImg" :style="{backgroundImage: 'url(' + item.product_pic + ')'}"></div>
    <div class="exName">【{{ item.merchant_name }}】 {{ item.product_name }}</div>
    <div class="rxPrice">
      ¥{{ item.temp_price }}<span class="qi">起</span>
    </div>
    <div class="exBack" v-if="level == 1"></div>
    <div class="exBack" v-else-if="level == 2">返 : {{ item.temp_commission.zigou }} ~ {{ item.temp_commission.fenxiang }}</div>
    <div class="exBack" v-else-if="level == 3 || level == 4 || level == 5">返:¥{{ item.temp_commission.zigou }}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  props: ["item", "level"],
  mounted() {
    console.log(123456789987654321321456789897456132)
    console.log(this.item)
    console.log(this.level)
  },
  methods: {
    // getId(product_id){
    //   this.$emit("goToDetails",product_id);
    // },
  }
};
</script>
<style lang="less" scoped>
@333: #333333;
.exList {
  width: 298rpx;
  height: 428rpx;
  margin: 12rpx;
  border-radius: 10rpx;
  box-shadow: 0 3rpx 8rpx 1rpx #E0E0E0;
  position: relative;
  // .exImg {
  //   width: 298rpx;
  //   height: 232rpx;
  //   background-size: 100% 100%;
  //   background-repeat: no-repeat;
  //   border-top-right-radius: 10rpx;
	// 	border-top-left-radius: 10rpx;
  // }
  // .exName {
  //   font-size: 24rpx;
  //   color: @333;
  //   font-weight: 400;
  //   margin-top: 10rpx;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   display: -webkit-box;
  //   padding-left: 10rpx;
  //   padding-right: 10rpx;
  //   -webkit-line-clamp: 3;
  //   -webkit-box-orient: vertical;
  // }
  // .rxPrice {
  //   font-size: 36rpx;
  //   color: @333;
  //   font-weight: 500;
  //   margin-top: 16rpx;
  //   margin-left: 12rpx;
  //   overflow: hidden;
  // }
  // .rxPrice > .qi {
  //   font-size: 20rpx;
  //   color: @333;
  //   font-weight: 300;
  // }
  // .exBack {
  //   font-size: 28rpx;
  //   color: #f77917;
  //   font-weight: 400;
  //   letter-spacing: -0.01rem;
  //   margin-top: 6rpx;
  //   margin-left: 12rpx;
  // }
}
</style>
