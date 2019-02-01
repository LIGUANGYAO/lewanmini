const apis = {
    // 用户授权
    WechatAuthorize: "/api/Wechat/WechatAuthorize",    //用户授权，code换取token
    // 首页
    HomePageList: "/api/Banner/HomePageList",    //首页banner
    CategoryList: "/api/Productcategory/CategoryList",   //获取首页几大板块
    ProductList: "/api/Product/ProductList",     //首页获取商品列表
    ProductExpressList: "/api/Product/ProductExpressList",     //首页获取快递列表
    UserPersonal: "/api/User/UserPersonal",  //获取用户基本信息
}

export default apis;//暴露出来供其他文件引用