<template>
  <div>
    <div class="header">
			<!--订单状态： 1全部 2待付款 3已付款 4已完成 5退款-->
			<span class="headerList" :class="{'headerActive': header_index == 1}" @tap="getList(1)">全部</span>
			<span class="headerList" :class="{'headerActive': header_index == 2}" @tap="getList(2)">待付款</span>
			<span class="headerList" :class="{'headerActive': header_index == 3}" @tap="getList(3)">已付款</span>
			<span class="headerList" :class="{'headerActive': header_index == 4}" @tap="getList(4)">已完成</span>
		</div>
    <div class="content">
      <div class="content_box" v-if="indentList.length">
        <div class="content_list" v-for="(item,index) in indentList" :key="index" @tap="jumpToDetails(item.order_id)">
          <div class="indent_num"><span>订单号:{{item.order_no}}</span><span class="indent_num_num">X{{item.num}} </span><span class="indent_status">{{statusText[item.order_status]}}</span></div>
          <div class="indent_name">{{item.product_name}}</div>
          <div class="indent_address"><i class="iconfont icon-dingwei"></i>{{item.region}}</div>
          <div class="indent_price">总价：<span class="money">￥{{item.order_totalfee}}</span></div>
          <div class="indent_time" v-if="item.startusetime">商品有效期：{{item.startusetime}} 至 {{item.endusetime}}</div>
          <div class="indent_time" v-else>收到商品后，请到订单详情确认收货</div>
        </div>
      </div>
      <div v-else>

      </div>
    </div>
  </div>
</template>

<script>
// import { getDateTime } from '@/utils/tool'
export default {
  data() {
    return {
      token: 'cca9bc22459d4a254a89a24fb084bfcc',
      header_index: 1,
      page: 1,
			psize: 10,
      indentList: [],
      statusText:["已过期","待付款","待发货","待预约","待收货","待使用","待预约","已完成","取消订单","已取消","申请换货"],
					//0订单过期 1待付款 2待发货 3待预约发货 4待收货 5待使用 6待预约 7已完成 8取消订单 9已取消（退款完成） 10 申请换货 
    };
  },
  components: {
    
  },
  created() {
    this.getData();
  },
  mounted() {
    
  },
  methods: {
    async getData() {
      this.indentList = [];
      let indentList = await this.$http.post(this.$apis.UserOrderList, {
          token: this.token,
					type: this.header_index, // 默认1 1全部 2待付款 3已付款 4已完成 5退款
					page: this.page, //页码（默认第一页,默认1）
					psize: this.psize //每页数量（默认10条）
        })
        .then(data => {
          this.indentList = data.data;
        })
        .catch(data => {
          
        });
    },
    getList(index){
      this.header_index = index;
    },
    jumpToDetails(id){
      console.log(id)
      console.log(this.$global.getDateTime(1547568981, 'yyyy-MM-dd hh:mm:ss'))
    },
    
  }
};
</script>

<style scoped lang="less">
@28: 28rpx;
@333: #333333;
  .header{
    width: 750rpx;
    height: 79rpx;
    display: flex;
    display: -webkit-flex;
    justify-content: space-around;
    -webkit-justify-content: space-around;
    position: fixed;
    top: 0;
    left:0;
    background-color: #ffffff;
    box-shadow: 0 1rpx 10rpx 1rpx rgba(0,0,0,0.1);
    .headerList{
      width: 120rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      font-weight: 500;
      font-size: 30rpx;
    }
    .headerActive{
      border-bottom: 10rpx solid #E1B872;
      font-weight: 800;
      font-size: 30rpx;
    }
  }
  .content{
    background-color: #F5F6FA;
    padding-top: 80rpx;
    .content_box{
      overflow: hidden;
      .content_list{
        width: 700rpx;
        border-radius: 10rpx;
        background-color: #ffffff;
        margin: 0 auto;
        margin-top: 20rpx;
        padding: 13rpx;
        .indent_num{
          font-weight: 500;
          font-size: @28;
          color: @333;
          height: 64rpx;
          line-height: 64rpx;
          border-bottom: 1rpx solid #f2f2f2;
          .indent_num_num{
            font-weight: bold;
            font-size: 30rpx;
            margin-left: 15rpx;
          }
          .indent_status{
            float: right;
            color: #F76E1E;
            font-weight: bold;
          }
        }
        .indent_name{
          font-size: 32rpx;
          color: @333;
          font-weight: bold;
          margin-top: 16rpx;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .indent_address{
          font-size: 26rpx;
          color: #999999;
          font-weight: 500;
          margin-top: 16rpx;
          .icon-dingwei{
            display: inline-block;
            width: 25rpx;
            height: 25rpx;
            margin-right: 10rpx;
          }
        }
        .indent_price{
          font-size: 30rpx;
          color: @333;
          font-weight: 500;
          margin-top: 16rpx;
          .money{
            color: #F77917;
            font-size: 36rpx;
          }
        }
        .indent_time{
          height: 62rpx;
          line-height: 62rpx;
          margin-top: 16rpx;
          font-size: 24rpx;
          font-weight: 500;
          color: #999999;
          border-top: 1rpx solid #f2f2f2;
        }
      }
     
    }
  }
</style>
