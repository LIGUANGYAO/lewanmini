<template>
  <div class="">
    <div>
      <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="3000" duration="500" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
        <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item>
                <image v-if="item.pic" :src="item.pic" class="slide-image" lazy-load mode="scaleToFill"/>
            </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="sort_mode_box">
      <span class="filter_active" dataVal='0'>综合</span>
			<span class="sales_order" dataVal='1' salesOrder="0">销量</span>
			<span class="price_after price_order" dataVal='2' priceOrder="0">
        价格
        <i class="iconfont icon-paixujiantoushang" dataVal='0'></i>
        <i class="iconfont icon-paixujiantouxia" dataVal="1"></i>
      </span>
			<span class="distanceOrder" dataVal='3' distanceOrder="0">距离</span>
    </div>
    <div class="content">
      <div>
        <product-card v-on:goToDetails="goToDetails" :item="item" :index="index"  v-for="(item,index) in ProductList" :key="index" :level="level" :isNew="isNew" :isHomePage="false"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/product-card";
export default {
  data() {
    return {
      token: 'c058048709c83de14ab803392b4dc1ac',
      proListId: '',  
      category: '',
      bannerList: [],
      ProductList: [],
      isNew: false,
    };
  },
  onLoad: function(option){
    this.proListId = option.proListId;
    this.category = option.proListName;
    if(this.proListId == 1){
      this.isNew = true;
    }else{
      this.isNew = false;
    };
    this.getData();
  },
  onUnload: function(){
    this.bannerList = []; //banner列表
    this.ProductList = []; //商品列表
  },
  components: { 
    ProductCard,
  },
  created() {
    },
  mounted() {
    wx.setNavigationBarTitle({
      title: this.category,
    })
  },
  methods: {
    async getData() {
      this.bannerList = []; //banner列表
      let bannerList = await this.$http.post(this.$apis.HomePageList, {
          type: 2, //1未定位轮播图 2已定位轮播图
          cate: this.proListId, //cate==>商品类型id=》不传就是默认首页
        })
        .then(data => {
          this.bannerList = data.data;
        })
        .catch(data => {
          
        });
      this.ProductList = []; //商品列表
      let ProductList = await this.$http.post(this.$apis.ProductList, { 
          token: this.token,
          type: 2, // int    |是|1未定位 2已定位|
          bursting: null, // int    |是|1获取爆款商品 必须定位|
          paging: 1, //int    |否|分页默认第一页|
          paged: 10, //  | int    |否|分页条数默认10条|
          title: null, // | string |否|商品名搜索|
          cateid: this.proListId, //| id     |否|商品分类|
          sales: 0, //| int    |否|销售量 0取消 1降序 2升序 |
          price: 0, //| int    |否|价格   0取消 1降序 2升序|
          distance: 0, //| int    |否|距离 0取消距离 1离我最近|
          lat: 30.65618, //   | string |是|用户纬度 选择了距离必传|
          lng: 104.08329 //   | string |是|用户经度 选择了距离必传| 
        })
        .then(data => {
          this.ProductList = data.data;
        })
        .catch(data => {
          
        });
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
/* 轮播 */
.swiper{
  height: 294rpx;
  .slide-image{
    width: 100%;
    height: 294rpx; 
  }
}
/*筛选按钮*/
.sort_mode_box{
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  margin-top: 16rpx;
  padding-bottom: 10rpx;
  background-color: #ffffff;
  span{
    color: #333333;
    font-weight: 800;
    font-size: 32rpx;
    padding: 10rpx 16rpx 8rpx 16rpx;
    position: relative;
    .iconfont{
      position: absolute;
      right: -10rpx;
      top: 16rpx;
    }

  }
  .filter_active{
    border-bottom: 8rpx solid #E1B872;
  }
}
/* 商品列表 */
.content{
  background-color: #ffffff;
}
</style>
