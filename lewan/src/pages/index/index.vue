<template>
  <div>
    <div>
      
    </div>
    <div>
      <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" interval="2200" duration="500" indicator-color="#FFFFFF" indicator-active-color="#E1B872">
        <block v-for="(item, index) in bannerList" :key="index">
            <swiper-item>
                <image v-if="item.pic" :src="item.pic" class="slide-image" lazy-load mode="scaleToFill"/>
            </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="category_box">
      <div class="category_list" v-for="(item,index) in CategoryList" :key="index">
        <img v-if="item.cate_icon" lazy-load :src="item.cate_icon"/>
        <div class="category_name">{{ item.cate_name }}</div>
      </div>
    </div>
    <div>
      <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo">用户授权</button>
    </div>
    <div class="content">
      <div>
        <product-card :item="item" :index="index"  v-for="(item,index) in qianSan" :key="index" :level="level"/>
      </div>
      <div class="content_express">
        <div class="content_express_img">
          <!-- <img src="" alt=""> -->
        </div>
        <!-- <div class="content_express_content">
          <product-express :item="item" v-for="(item,index) in ProductExpressList" :key="index" :level="level"/>
        </div> -->
        <swiper class="swiper_express" display-multiple-items="2.317">
          <block v-for="(item, index) in ProductExpressList" :key="index">
              <swiper-item>
                  <product-express :item="item" :level="level"/>
              </swiper-item>
          </block>
        </swiper>
      </div>
      <div>
        <product-card :item="item" :index="index+3"  v-for="(item,index) in houSan" :key="index" :level="level"/>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "@/components/product-card";
import ProductExpress from "@/components/product-express";

export default {
  onReachBottom() {   // 上拉加载，拉到底部触发
    // 到这底部在这里需要做什么事情
    console.log("上拉加载")
    // this.loadMore();
  },
  async onPullDownRefresh() {  // 下拉刷新方法，与methods方法同级
    console.log("下拉刷新")
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  data() {
    return {
      token: 'cca9bc22459d4a254a89a24fb084bfcc',
      bannerList: [], 
      CategoryList: [],
      ProductList: [],
      ProductExpressList: [],
      UserPersonal: {},
      level: 2,
      userInfo: {}
    };
  },
  components: {
    ProductCard,ProductExpress
  },
  computed:{
    qianSan: function () {
      return this.ProductList.filter(function (item,index) {
        return index<3;
      })
    },
    houSan: function () {
      return this.ProductList.filter(function (item,index) {
        return index>=3;
      })
    }
  },
  created() {
    this.getSetting();
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
    wx.setNavigationBarTitle({
      title: "当前页面"
    })
    wx.setStorage({
      key:"userInfo",
      data:{
        name: "吴潘",
        sex: "男"
        }
    })
    // wx.clearStorage();  //清除缓存
  },
  methods: {
    getSetting(){
      wx.getSetting({
        success: function(res){
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res.userInfo) //用户已经授权过
                wx.showToast({title: '用户已经授权过',icon: 'none'})
              }
            })
          }else{
            wx.showToast({title: '用户还未授权过',icon: 'none'})
          }
        }
      })

    },
    bindGetUserInfo(e) {
      console.log(e.mp.detail.userInfo)
      if (e.mp.detail.rawData){ //用户按了允许授权按钮
        wx.showToast({title: '用户按了允许授权按钮',icon: 'none',mask: 'true'})
      } else { //用户按了拒绝按钮
        wx.showToast({title: '用户按了拒绝按钮',icon: 'none',mask: 'true'})
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
        token: this.token,
        type: 2, // int    |是|1未定位 2已定位|
        bursting: null, // int    |是|1获取爆款商品 必须定位|
        paging: 1, //int    |否|分页默认第一页|
        paged: 10, //  | int    |否|分页条数默认10条|
        title: null, // | string |否|商品名搜索|
        cateid: null, //| id     |否|商品分类|
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
      this.ProductExpressList = []; //快递商品列表
      let ProductExpressList = await this.$http.post(this.$apis.ProductExpressList, {
        token: this.token
      })
        .then(data => {
          this.ProductExpressList = data.data;
        })
        .catch(data => {
          
        });
      this.UserPersonal = {}; //用户个人信息
      let UserPersonal = await this.$http.post(this.$apis.UserPersonal, {
        token: this.token
      })
        .then(data => {
          this.UserPersonal = data.data;
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
  .slide-image{
    width: 100%;
    height: 294rpx; 
  }
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
    font-size: 0;
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
      font-weight: 500;
    }
  }
}
/* 商品列表 */
.content{
  .content_express{
    .content_express_img{

    }
    .swiper_express{
      width: 100%;
      height: 450rpx;
      margin-left: 12rpx;
      .swiper-item{
        // width: 322rpx;
      }
    }
  }
}
</style>
