<template>
  <div class="container">
    
    <button open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model">
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy">
    </form>
    <a href="/pages/logs/main" class="counter">分享圈</a>
  </div>
</template>

<script>

export default {
  data() {
    return {
      motto: "Hello World",
      shareImg: ''
    };
  },

  components: {
    
  },

  created() {},
  mounted() {
   
  },
  methods: {
    
  }
};
</script>

<style scoped>

</style>
