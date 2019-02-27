<template>
  <div>
    <div class="card_box">
        <div v-if="item.product_pic" lazy-load class="left_box" :style="{backgroundImage: 'url(' + item.product_pic + ')'}">
          <div class="newPerson" :class="{'isSoldOut': item.sold_out == 1}" v-if="item.sold_out == 1" >已售罄</div>
          <div class="generalize" v-if="index<3">
            <div class="top">Top</div>
            <div class="top_number">{{ index+1 }}</div>
          </div>
          <div class="distance">
            <i class="iconfont icon-dingwei"></i>
            <span class="distance_area">
              {{ item.region }}
            </span>
            <span class="distance_number" v-if="item.distance">{{ item.distance }} km</span>
          </div>
        </div>
        <div class="right_box">
          <div class="text_show">【{{ item.merchant_name }}】 {{ item.product_name }}</div>
          <div class="detail_box" :class="{'noStopTime':item.product_timelimit != 1}">
            <span class="price">¥{{ item.temp_price }}</span>
            <span class="commission" v-if="level == 1"></span>
            <span class="commission" v-else-if="level == 2">返:{{ item.temp_commission.zigou }} ~ {{ item.temp_commission.fenxiang }}</span>
            <span class="commission" v-else-if="level == 3 || level == 4 || level == 5" >返:¥{{ item.temp_commission.zigou }}</span>
            <span class="sold_out">已售{{ item.product_sold }}</span>
          </div>
          <div v-if="item.product_timelimit == 1" class="count_down">距开始：</div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  props: ["item","index","level"],
  created() {}
};
</script>
<style lang="less" scoped>
@lewan:#E1B872;
.card_box{
    padding: 26rpx 16rpx 26rpx 0;
    margin-left: 18rpx;
    border-bottom: 2rpx solid #f2f2f2; 
    overflow: hidden;
    .left_box{
        float: left;
        width: 268rpx;
        height: 198rpx;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 10rpx;
        position: relative;
        .newPerson{
          width: 118rpx;
          height: 46rpx;
          line-height: 46rpx;
          background: linear-gradient(to right, #FE6901 0%, #EE0D73 100%);
          color: #FFFFFF;
          border-bottom-left-radius: 23rpx;
          border-top-left-radius: 23rpx;
          position: absolute;
          right: -8rpx;
          top: 12rpx;
          text-align: center;
          font-size: 22rpx;
        }
        .isSoldOut {
          background: linear-gradient(to right, #E93317 0%, #FFCB59 100%) !important;
        }
        .generalize{
          width: 50rpx;
          height: 90rpx;
          background-color: #FDD99B;
          color: #333333;
          border-bottom-left-radius: 25rpx;
          border-bottom-right-radius: 25rpx;
          position: absolute;
          top: -8rpx;
          left: 12rpx;
          text-align: center;
          .top{
            font-size: 22rpx;
            color: #333333;
            width: 100%;
            height: 40rpx;
            line-height: 40rpx;
            float: left;
          }
          .top_number{
            font-size: 36rpx;
            color: #333333;
            font-weight: 800;
            height: 50rpx;
            width: 100%;
            line-height: 50rpx;
            float: left;
          }
        }
        .distance{
          background-color: rgba(0, 0, 0, 0.6);
          width: 100%;
          height: 40rpx;
          line-height: 40rpx;
          position: absolute;
          bottom: 0;
          color: #FFFFFF;
          border-bottom-left-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
          i{
            float: left;
            margin-left: 8rpx;
          }
          .distance_area{
            float: left;
            font-size: 20rpx;
          }
          .distance_number{
            float: right;
            margin-right: 10rpx;
            font-size: 20rpx;
          }
        }
    }
    .right_box{
        float: right;
        width: 410rpx;
        height: 198rpx;
        position: relative;
        .text_show{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 28rpx;
            color: #4D4D4D;
            font-weight: 500;
            line-height: 1.4;
        }
        .detail_box{
            position: absolute;
            bottom: 60rpx;
            width: 410rpx;
            height: 40rpx;
            line-height: 40rpx;
            left: 0;
            .price{
                font-size: 34rpx;
                color: #333333;
                font-weight: 500;
                margin-right: 10rpx;
                letter-spacing: -2rpx;
            }
            .commission{
                font-size: 22rpx;
                color: #F77917;
                letter-spacing: -1rpx;
                font-weight: 500;
            }
            .sold_out{
                font-size: 22rpx;
                color: #999999;
                float: right;
            }
        }
        .noStopTime{
          bottom: 0;
        }
        .count_down{
            height: 40rpx;
            position: absolute;
            bottom: 0;
            left: 0;
            font-size: 24rpx;
            font-weight: 500;
            color: @lewan;
        }
    }
}
</style>
