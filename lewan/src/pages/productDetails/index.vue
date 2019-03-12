<template>
  <div class="">
    <div class="header_box">
      <div class="header_banner_box">
        <swiper v-if="proDetails.product_carousel.length" class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
          <block v-for="(item, index) in proDetails.product_carousel" :key="index">
              <swiper-item>
                  <image v-if="item" :src="item" class="slide-image" lazy-load mode="scaleToFill"/>
              </swiper-item>
          </block>
        </swiper>
      </div>
      <div>{{proDetails.product_carousel.length}}</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      token: 'cca9bc22459d4a254a89a24fb084bfcc',
      productId: '',
      latitude: 30.65618,
      longitude: 104.08329,
      proDetails: {},
    };
  },
  onLoad: function(option){
    this.productId = option.productId;
    this.getData();
  },
  components: { },
  created() {

    },
  mounted() {
    
  },
  methods: {
    async getData() {
      this.proDetails = {}; //商品详情
      let proDetails = await this.$http.post(this.$apis.ProductDetails, {
          token: this.token,
          type: 2, // 1未定位 2已定位
          pr_id: this.productId,
          lat: this.latitude,
          lng: this.longitude,
        })
        .then(data => {
          this.proDetails = data.data.details;
        })
        .catch(data => {
          
        });
    }
  }
}
</script>

<style scoped lang="less">
/* 轮播 */
.swiper{
  height: 294rpx;
  .slide-image{
    width: 100%;
    height: 360rpx; 
  }
}
</style>
