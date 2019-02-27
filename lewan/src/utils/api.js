const apis = {
    // 用户授权
    WechatAuthorize: "/api/Wechat/WechatAuthorize",    //用户授权，code换取token
    // 首页
    HomePageList: "/api/Banner/HomePageList",    //首页banner
    CategoryList: "/api/Productcategory/CategoryList",   //获取首页几大板块
    ProductList: "/api/Product/ProductList",     //首页获取商品列表
    ProductExpressList: "/api/Product/ProductExpressList",     //首页获取快递列表
    UserPersonal: "/api/User/UserPersonal",  //获取用户基本信息
    //预约中心
    ConsumeBookedProduct: "/api/Yuyue/ConsumeBookedProduct", //获取预约中心可预约列表
    //我的订单
    UserOrderList: "/api/User/UserOrderList",   //获取我的订单列表
    //预约列表
    ConsumeBespokeAll: "/api/Yuyue/ConsumeBespokeAll",  //未预约列表
    ConsumeBookedAll: "/api/Yuyue/ConsumeBookedAll",  //已预约列表
}

export default apis;//暴露出来供其他文件引用