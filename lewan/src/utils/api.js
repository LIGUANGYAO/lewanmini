const apis = {
    // 用户授权
    WechatAuthorize: "/api/Wechat/WechatAuthorize",    //用户授权，code换取token
    SmallProgramCode: "/api/Wechat/SmallProgramCode",    //用户授权，code换取token

    // 首页
    HomePageList: "/api/Banner/HomePageList",    //首页banner
    CategoryList: "/api/Productcategory/CategoryList",   //获取首页几大板块
    ProductList: "/api/Product/ProductList",     //首页获取商品列表
    ProductExpressList: "/api/Product/ProductExpressList",     //首页获取快递列表
    UserPersonal: "/api/User/UserPersonal",  //获取用户基本信息
    //分类商品列表
    ProductList: "/api/Product/ProductList",    //获取商品分类列表
    //商品详情页面
    ProductDetails: "/api/Product/ProductDetails", //商品详情
    ProductShare: "/api/Product/ProductShare", //获取海报链接
    //订单支付界面
    confirmPay: "/api/Mall/confirmPay", //查询购买商品详情
    UserAddressList: "/api/UserAddress/UserAddressList", //查询购买快递商品的收货地址
    
    //预约中心
    ConsumeBookedProduct: "/api/Yuyue/ConsumeBookedProduct", //获取预约中心可预约列表
    //我的订单
    UserOrderList: "/api/User/UserOrderList",   //获取我的订单列表
    //预约列表
    ConsumeBespokeAll: "/api/Yuyue/ConsumeBespokeAll",  //未预约列表
    ConsumeBookedAll: "/api/Yuyue/ConsumeBookedAll",  //已预约列表
}

export default apis;//暴露出来供其他文件引用