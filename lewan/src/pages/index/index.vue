<template>
  <div>
    <div>
      <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="2200" duration="1000" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
        <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item>
                <image :src="item.pic" class="slide-image" mode="scaleToFill"/>
            </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="category_box">
      <div class="category_list" v-for="(item,index) in CategoryList" :key="index">
        <img :src="item.cate_icon"/>
        <div class="category_name">{{ item.cate_name }}</div>
      </div>
    </div>
    <div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">用户授权</button>
    </div>
    
  </div>
</template>

<script>
// import Swiper from "@/components/swiper";

export default {
  data() {
    return {
      bannerList: [], 
      CategoryList: [],
      ProductList: [],
      userInfo: {}
    };
  },
  components: {
    // Swiper
  },

  created() {
    this.getSetting()
    this.getData();
  },
  mounted() {
    wx.login({
      success(res) {
        console.log(res)
        if (res.code) {
          // this.$http.post(this.$apis.WechatAuthorize, {
          //   code: code + "&state",
          //   recode: localStorage.getItem("leaderRecode") || null,
          // })
          // .then(data => {
            
          // })
        }
      }
    });
    wx.setStorage({
    key:"key",
      data:"吴潘"
    })
  },
  methods: {
    getSetting(){
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo) //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            console.log('用户还未授权过')
          }
        }
      })

    },
    bindGetUserInfo(e) {
      console.log(e.mp.detail.userInfo)
      if (e.mp.detail.rawData){ //用户按了允许授权按钮
        console.log('用户按了允许授权按钮')
      } else { //用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    async getData() {
      //注意方法名之前一定要加上异步async
      this.bannerList = []; //banner列表
      let bannerList = await this.$http.post(this.$apis.HomePageList, {
          //请求数据前面要加上await，是与async配套使用
          type: 2, //1未定位轮播图 2已定位轮播图
          cate: null //data==>cate==>商品类型id=》不传就是默认首页
        })
        .then(data => {
          wx.getStorage({
            key: 'key',
            success: function(res) {
                console.log(res.data)
            } 
          })
          this.bannerList = data.data;
        })
        .catch(data => {
          
        });
      this.CategoryList = []; //板块列表
      let CategoryList = await this.$http.post(this.$apis.CategoryList, { })
        .then(data => {
          this.CategoryList = data.data;
        })
        .catch(data => {
          
        });
      this.ProductList = []; //商品列表
      let ProductList = await this.$http.post(this.$apis.ProductList, {
        token: token,
        type: 2, // int    |是|1未定位 2已定位|
        bursting: null, // int    |是|1获取爆款商品 必须定位|
        paging: pageData.page, //int    |否|分页默认第一页|
        paged: pageData.psize, //  | int    |否|分页条数默认10条|
        title: title, // | string |否|商品名搜索|
        cateid: null, //| id     |否|商品分类|
        sales: salesOrder, //| int    |否|销售量 0取消 1降序 2升序 |
        price: priceOrder, //| int    |否|价格   0取消 1降序 2升序|
        distance: distanceOrder, //| int    |否|距离 0取消距离 1离我最近|
        lat: localStorage.getItem("latitude") || 30.65618, //   | string |是|用户纬度 选择了距离必传|
        lng: localStorage.getItem("longitude") || 104.08329 //   | string |是|用户经度 选择了距离必传| 
      })
        .then(data => {
          this.ProductList = data.data;
        })
        .catch(data => {
          
        });
    }
  }
};
</script>

<style scoped lang="less">
/* 公共样式 */

/* 轮播 */
.swiper{
  height: 294rpx;
}
.swiper image{
   width: 100%;
   height: 294rpx; 
}
/* 几大板块 */
.category_box{
  padding: 18rpx 0;
  display: flex;
  display: -webkit-flex;
  justify-content: space-around;
  -webkit-justify-content: space-around;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap; 
  .category_list{
    text-align: center;
    flex: 1;
    width: 20%;
    min-width: 20%;
    max-width: 20%;
    img{
      display: inline-block;
      width: 124rpx;
      height: 124rpx;
    }
    div{
      font-size: 28rpx;
      color: #333;
      font-weight: 400;

    }
  }
}
</style>
