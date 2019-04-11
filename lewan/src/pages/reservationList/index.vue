<template>
  <div>
    <div class="header">
			<span class="headerList" :class="{'headerActive': header_index == 1}" @tap="getList(1)">未预约</span>
			<span class="headerList" :class="{'headerActive': header_index == 2}" @tap="getList(2)">已预约</span>
		</div>
    <div class="content">
      <div class="cardBox" v-if="notAppointmentList.length">
        <div class="cardList" v-for="(item,index) in notAppointmentList" :key="index">
          <div class="cardDetails">
            <div v-if="item.express == 1 && item.code_count>1" class="buyNumber">X{{ item.code_count }}</div>
            <div class="shopName">
              <span class="caLeft">商品名称：</span>
              <span class="caRight">{{ item.product_name }}</span>
            </div>
            <div class="shopNumber">
              <span class="caLeft">订单号：</span>
              <span class="caRight">{{ item.ordernumber }}</span>
            </div>
            <div class="ElectronicCode">
              <div v-if="item.express == 1" class="">
                <span class="caLeft">消费电子码：</span>
                <!-- <span v-if="index == 0" v-for="(item,index) in item.code" class="caRight" :key="index">{{ item.consume_code }}</span> -->
                <div v-if="item.express == 1 && item.code_count>1" class="goToBtn" @tap="goToShow(item.code,item.order_id)" >去查看</div>
                <div v-else class="goToBtn" @tap="goToYuyue(item.code[0].consume_code,item.order_id)">去预约</div>
              </div>
              <div v-else-if="item.express == 2" class="">
                <span class="caLeft">预约发货：</span>
                <span class="caRight">去预约</span>
                <div class="goToBtn" @tap="goToFahuo(item.order_id)">去预约</div>
              </div>
            </div>
            <div class="shopTime" v-if="item.startusetime">商品期限：{{item.startusetime}} 至 {{item.endusetime}}</div>
            <div class="shopTime" v-else>收到商品后，请到订单详情确认收货</div>
          </div>
          <div v-if="item.endtime == 2" class="haveExpired">
            <img src="" />
          </div>
        </div>
      </div>
      <div v-else>

      </div>
      <!-- <div class="content_box" v-if="notAppointmentList.length">
        <div class="cardList cardList1" v-for="(item,index) in notAppointmentList" :key="index">
							<div class="cardDetails cardDetails1">
								<div class="buyNumber"></div>
								<div v-if="item.express == 1" class="shopNumber">
									<span class="caLeft">电子码：</span>
									<span class="caRight">{{ item.consume_code }}</span>
								</div>
								<div v-else-if="item.express == 2" class="shopNumber">
									<span class="caLeft">订单号：</span>
									<span class="caRight">{{ item.ordernumber }}</span>
								</div>
								<div class="shopName">
									<span class="caLeft">商品名称：</span>
									<span class="caRight">{{item.product_name}}</span>
								</div>
								<div class="ElectronicCode">
									<div v-if="item.express == 1" class="">
										<div class="goToBtn" :class="{'dongJie': item.status == 4 || item.endtime == 2}" @tap="goToINdentDetails(1,item.consume_code)">{{ item.status == 1 ? "待使用" : item.status == 2 ? "已使用" : item.status == 3 ? "已过期" : item.status == 4 ? "冻结" : "无状态" }}</div>
									</div>
									<div v-else-if="item.express == 2" class="">
										<div class="goToBtn" @tap="goToINdentDetails(2,item.order_id)">已使用</div>
									</div>
								</div>
								<div class="shopTime" v-if="item.startusetime">商品期限：{{getDateTime(item.startusetime,"Y-MM-dd")}} 至 {{getDateTime(item.endusetime,"Y-MM-dd")}}</div>
								<div class="shopTime" v-else>收到商品后，请到订单详情确认收货</div>
							</div>
							<div v-if="item.endtime == 2" class="haveExpired">
								<img src="" />
							</div>
						</div>
      </div>
      <div v-else>

      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',
      header_index: 1,
      pageData:{
        page:[1,1],
        pageSize:[10,10]
      },
      notAppointmentList: [], //未预约列表
      yetAppointmentList: [], //已预约列表
    };
  },
  components: {
    
  },

  created() {
    this.token = wx.getStorageSync('token')
    this.getData()
  },
  mounted() {
    
  },
  methods: {
    async getData() {
      this.notAppointmentList = [];
      let notAppointmentList = await this.$http.post(this.$apis.ConsumeBespokeAll, {
          token: this.token,
					page: this.pageData.page[0]
        })
        .then(data => {
          this.notAppointmentList = data.data;
        })
        .catch(data => {
          
        });
      this.yetAppointmentList = [];
      let yetAppointmentList = await this.$http.post(this.$apis.ConsumeBookedAll, {
          token: this.token,
					page: this.pageData.page[1]
        })
        .then(data => {
          
        })
        .catch(data => {
          
        });
    },
    getList(index){
      this.header_index = index;
    }
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
    
  }
</style>
