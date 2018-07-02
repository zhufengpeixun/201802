## 项目页面

项目初始化   $ yarn install;
服务server  端口 localhost:9999
项目启用     端口 localhost:3000

resource  服务器端代码（静态文件）
  ├─images           icon图片文件夹
  ├─mock             json数据文件夹
  ├─pageImg          界面截图
  └─server.js        服务器

src  客户端代码
  ├─api              客户端接口
  ├─common           公共文件
  ├─components       公共组件
  │  ├─Header
  │  ├─Loading
  │  └─Tab
  ├─containers       页面组件
  │  ├─Cart          购物车
  │  │  └─common
  │  ├─Collection    我的收藏
  │  ├─Detaill       商品详情
  │  ├─Goodscategory 商品分类
  │  ├─Main          首页
  │  │  ├─common
  │  │  │  ├─CWJ
  │  │  │  ├─OneRow
  │  │  │  ├─OnlyRow
  │  │  │  ├─ThreeRow
  │  │  │  ├─Title
  │  │  │  ├─TRow
  │  │  │  └─TwoRow
  │  │  ├─MainBrand
  │  │  ├─MainCrowdfunding
  │  │  ├─MainFooter
  │  │  ├─MainHeader
  │  │  ├─MainHot
  │  │  ├─MainLink
  │  │  ├─MainMore
  │  │  ├─MainPhone
  │  │  ├─MainRecommend
  │  │  ├─MainSlider
  │  │  ├─NewGoods
  │  │  └─TimeBuy
  │  ├─OrderList     我的订单
  │  ├─Pay           支付
  │  ├─PersonalData  修改个人信息
  │  ├─Savour        品味
  │  ├─Search        搜索
  │  ├─ServiceLogin  登录
  │  ├─ServiceRegister   注册
  │  └─UserCenter        个人中心
  ├─images               图片文件夹
  └─store                redux 文件
      ├─actions
      │  ├─cart
      │  ├─detail
      │  ├─home
      │  ├─personaldata
      │  └─savour
      └─reducers
          └─detail

首页：main
分类：goodscategory
品味：savour
购物车：cart
个人：usercenter
产品详情：detail
宣传详情：content
搜索: search

数据属性名
有品推荐 recommend G0001
居家 family G0002
家电 jiadian G0003
手机 phone G0004
影音 video G0005
日杂 riza G0006
服饰 clothes G0007
健康 healthy G0008
餐厨 tableware G0009
智能 intelligence G0010
洗护 xihu G0011
箱包 xiangbao G0012
婴童 baby G0013
饮食 diet G0014
配件 parts G0015
出行 travel G0016
品牌 brand G0017
小米众筹 crowdfunding G0018
热门 hotItems G0019
新品 newItems G0020
限时购 limit G0021
更多商品 allData G9999


首页初始化
'/init'
首页数据请求
'/main' {id}
分页数据请求
'/goodscategory' {id}
品味页面请求
'/savour' {"offset":0,"limit":5}
购物车请求
'/cart'
注册 post
'/register'  {"username":"","password":""}
登录 post
'/login' {"username":"","password":""}
搜索 post
'/search' {"search":""}

分工
姬利 品味
陈万军 首页
王宇 分页
王俊 购物车
李义超 个人中心


***首页首屏数据***
【成功】
{
  "sliders": [
    {
      "url": "",
      "link": ""
    }
  ],
  "activity": [
    {
      "gid": "",
      "url": "",
      "link": ""
    }
  ],
  "recommend": [
    {
      "gid": "",
      "title": "",
      "describe": "",
      "url": "",
      "link": ""
    }
  ],
  "crowdfunding": [
    {
      "gid": 100998,
      "title": "",
      "describe": "",
      "url": "",
      "link": "",
      "price": 199,
      "ratedPerson": 2000,
      "actualPerson": 8106,
      "color": "#c04343"
    }
  ]
}

***获取指定种类的数据***
【发送】
         {"id":""}
【成功】
[
  {
    "gid": "",
    "url": "",
    "link": "/detail?gid=738"
  },
  {
    "gid": "",
    "title": "",
    "describe": "",
    "url": "",
    "link": "/detail?gid=100991",
    "price": 1489,
    "mark": false
  }
]

***分类初始数据***
【成功】
{
  "listLink": [
    {
      "id": "",
      "linkName": ""
    }
  ],
  "banner": {
    "G0001": {
      "url": "",
      "link": ""
    }
  },
  "data": [
    {
      "gid": "",
      "title": "",
      "url": "",
      "link": ""
    }
  ]
}
【失败】

***获取二级分类***
【发送】
{
  "data": [
    {
      "gid": "100264",
      "title": "床垫",
      "url": "",
      "link": "/detail?gid=100264"
    }
  ]
}
【成功】

***获取品味数据***
【发送】
{"offset":0,"limit":5}
【有数据】
{
    "hasMore": true,
    "savour": [
        {
            "article_id": 1141,
            "url": "",
            "display_mode": 1,
            "from": "",
            "title": "",
            "subtitle": "",
            "pic_url": "",
            "pic_urls": ["",""],
            "favor": 0,
            "like": 0,
            "hit": 28881
        },
        ......
    ]
}
【没数据】
{
    "hasMore": false,
    "savour": []
}


***商品详情***
【未登录】
{
    "collLength": 0,
    "err": 0
}
【登录】
{
    "collLength": 56,
    "err": 0
}

***修改单个选中状态***
【发送】
get(`/cart/modifystate?gid=${gid}&state=${state}`)
【成功】
{
    "msg": "ok",
    "err": 0
}

***修改购物车中全部商品的选中状态***
【发送】
get(`/cart/allstate?state=${state}`)
【成功】
{
    "msg": "ok",
    "err": 0
}
【失败】
{
    "user": null,
    "msg": "请先登录",
    "success": "",
    "err": 1
}

***获取购物车数据***
【成功】
{
  "userCart": [
    {
      "gid": "",
      "from": "",
      "minfreight": 0,
      "isSelected": true,
      "url": "",
      "title": "",
      "describe": "",
      "price": 1499,
      "mark": false,
      "number": 1
    }
  ],
  "recommend": [
    {
      "gid": "",
      "title": "",
      "describe": "",
      "url": "",
      "link": "/detail?gid=100656",
      "price": 149,
      "mark": false,
      "isSelected": true,
      "minfreight": 0,
      "from": ""
    }
  ]
}

【失败】
{
    "user": null,
    "msg": "请先登录",
    "success": "",
    "err": 1
}

***修改购物车中的商品***
【发送】
`/cart?gid=${gid}&number=${number}`
【成功】
{
  "userCart": [
    {
      "gid": "",
      "from": "",
      "minfreight": 150,
      "isSelected": true,
      "url": "",
      "title": "",
      "describe": "",
      "price": 1499,
      "mark": false,
      "number": 15 // 修改后的数量
    }
  ]
}
【失败】
{
  "userCart": [
    {
      "gid": "",
      "from": "",
      "minfreight": 150,
      "isSelected": true,
      "url": "",
      "title": "",
      "describe": "",
      "price": 1499,
      "mark": false,
      "number": 10 // 返回之前的结果
    }
  ]
}

***添加商品到购物车***
【发送】
`/cart?gid=${gid}&number=${number}`
【成功】
{
    "msg": "添加成功！",
    "err": 0
}
【失败】
？

*** 删除购物车中的商品
【发送】
`cart?gid=${gid}`
【成功】
{
    "msg": "移除成功",
    "err": 0
}
【失败】
?

***获取验证码***
【发送】
/phonecode?mobile=15134578149
【成功】
{
    "mobileCode": "834842",
    "err": 0
}

***登录***
【发送】
{"username":"15134578149","mobilecode":"834842"}
或
{"username":"15134578149","password":"123456"}
【成功】
{
    "user": "U10001",
    "msg": "",
    "success": "ok",
    "err": 0
}

【失败】
{
    "user": null,
    "msg": "用户名或密码不正确",
    "success": "no",
    "err": 1
}

***获取个人信息***
【成功】
{
  "userid": "U10001",          --用户id
  "userimg": "",               --用户邮箱
  "username": "",              --用户名
  "password": "",              --用户密码
  "mobile": "",                --用户手机
  "bill": {                    --我的订单
    "all": [],                 --全部订单
    "pendingPayment": [],      --待付款
    "pendingReceived": [],     --待收货
    "pendingEvaluate":[],      --待评价
    "refund": [],              --退款订单
    "received": []             --已收货
  },
  "cart": [],                  --购物车
  "assets": {},                --我的资产
  "collection": {},            --我的收藏
  "address": {},               --地址管理
  "news": {},                  --消息中心
  "help": {}                   --帮助和反馈
}
【失败】
{
    "msg": "用户错误！",
    "err": 1
}