<template>
  <div>
    {{product_id}}
    {{price_id}}
  </div>
</template>

<script>
// import { getDateTime } from '@/utils/tool'
export default {
  data() {
    return {
      token: '',
      product_id: '',
      price_id: '',
      proDetail: {},
    };
  },
  components: {
    
  },
  onLoad: function(option) {
    this.product_id = option.productId;
    this.price_id = option.priceId;
    this.token = wx.getStorageSync('token')
    this.getData();
  },
  mounted() {
    
  },
  methods: {
    async getData() {
      this.proDetail = {};
      let proDetail = await this.$http.post(this.$apis.confirmPay, {
          token: this.token,
          product_id: parseInt(this.product_id),
          price_id: parseInt(this.price_id),
        })
        .then(data => {
          this.proDetail = data.data;
        })
        .catch(data => {});
    },
  }
};
</script>

<style scoped lang="less">
@28: 28rpx;
@333: #333333;

</style>
