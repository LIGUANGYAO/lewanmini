<template>
  <div class="container">
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model">
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy">
    </form>
    <a href="/pages/counter/main" class="counter">预约中心</a>
  </div>
</template>

<script>
import card from "@/components/card";

export default {
  data() {
    return {
      motto: "Hello World",
      userInfo: {}
    };
  },

  components: {
    card
  },

  created() {},
  mounted() {
    const self = this;
    wx.login({
      success(res) {
        if (res.code) {
          self.code = res.code;
          // self.wxGetUserInfo(res.code);
        }
      }
    });
  },
  methods: {
    // wxGetUserInfo(code) {
    //   const self = this;
    //   wx.getUserInfo({
    //     withCredentials: true,
    //     success(res) {
    //       let { encryptedData, userInfo, iv } = res;
    //       self.$http
    //         .post("api", {
    //           code,
    //           encryptedData,
    //           iv
    //         })
    //         .then(res => {
    //           console.log(`后台交互拿回数据:`, res);
    //           // 获取到后台重写的session数据，可以通过vuex做本地保存
    //         })
    //         .catch(err => {
    //           console.log(`自动请求api失败 err:`, err);
    //         });
    //     },
    //     fail(err) {
    //       console.log("自动wx.getUserInfo失败:", err);
    //       // 显示主动授权的button
    //       self.buttonVisible = true;
    //     }
    //   });
    // },
    // bindGetUserInfo(e) {
    //   // console.log('回调事件后触发')
    //   const self = this;
    //   if (e.mp.detail.userInfo) {
    //     console.log("用户按了允许授权按钮");
    //     let { encryptedData, userInfo, iv } = e.mp.detail;
    //     self.$http
    //       .post(api, {
    //         // 这里的code就是通过wx.login()获取的
    //         code: self.code,
    //         encryptedData,
    //         iv
    //       })
    //       .then(res => {
    //         console.log(`后台交互拿回数据:`, res);
    //         // 获取到后台重写的session数据，可以通过vuex做本地保存
    //       })
    //       .catch(err => {
    //         console.log(`api请求出错:`, err);
    //       });
    //   } else {
    //     //用户按了拒绝按钮
    //     console.log("用户按了拒绝按钮");
    //   }
    // }
  }
};
</script>

<style scoped>

</style>
