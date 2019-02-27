<template>
    <div class="card_box">
        <div class="list_left">{{item.product_name}}</div>
        <div class="list_right">
            <button  class="subscribe_btn" @tap="getProId(item.product_id)">点击预约</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data:{ }
        }
    },
    props: ["item"],
    methods: {
        getProId(product_id){
            this.$emit("reservationCardId",product_id)
        }
    },
}
</script>
<style lang="less" scoped>
    .card_box{
        padding: 26rpx 16rpx 26rpx 0;
        margin-left: 18rpx;
        border-bottom: 2rpx solid #f2f2f2; 
        overflow: hidden;
        display: flex; 
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        .list_left{
            width: 70%;
            float: left;
            font-weight: 400;
            font-size: 32rpx;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
        }
        .list_right{
            width: 30%;
            float: right;
            text-align: right;
            button{
                display: inline-block;
                box-sizing: content-box;
                padding: 0;
                width: 152rpx;
                height: 58rpx;
                line-height: 58rpx;
                background-color: #ffffff;
                color: #FF8B30;
                border: 1rpx solid #FF8B30;
                border-radius: 8rpx;
                font-size: 28rpx;
                font-weight: 400;
            }
        }
    }
</style>
