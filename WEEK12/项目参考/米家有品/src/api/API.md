
<--------首页接口-------->
首页初始化  mainInit              post
首页下滚加载 getMainData(id)      post   {id}

<--------分类接口-------->
分类初始        getGoodsData      post
获取二级分类列表  getLevelData      get   ?id=id
点击商品进入详情  goodsDetail       post  待定 接口暂未启用

<--------品味接口-------->
品味数据  getSavour               post {offset:获取数据的位置, limit: 获取数据的数量
品味详情进入  savourDetail         post  {gid}

<--------购物车接口-------->
购物车接口必须在登录成功之后才能调用

*******
 登录的接口的调用 测试参数 username=15134578149  password=123456
*******

获取购物车数据  getCartData         post
修改商品数量    editCartData        put  ?gid=gid&number=number
添加商品到购物车 addCartData         get   ?gid=gid&number=number
移除购物车中的商品 delCartData       delete  ?gid=gid
<--------个人中心接口-------->
获取个人信息
注册  toRegister                   post {username, password}
登录  toLogin                      post {username, password}
校验是否登陆                         get
<--------搜索接口-------->
获取历史记录和热门搜索 getHistory      get
搜索结果 searchInfo                 post {info}
清空历史记录 clearHistorySearch      delete

<--------详情页接口-------->