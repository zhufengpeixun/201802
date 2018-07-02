
项目 - 模仿某电商

技术一般，水平有限，有很多的不足，请多指教。

项目初始化   $ yarn install;
服务server  端口 localhost:9999
项目启用     端口 localhost:3000

后台文件是 server.js

用户数据文件
userInfo.json 注册用户信息（主表）
userBill.json 用户订单表 （关联表）
userCart.json 用户购物车表 （关联表）
userCollection.json 用户搜藏表 （关联表）

商品数据文件
allData.json           商品的所有数据
userEvaluate.json      用户评价表（商品关联表）

数据tree
请看Explain.md

项目展示请看 "毕业项目.pptx"

就不再这里做过多的说明了

### 【友情提示】 在项目中 redux 不要滥用 ； 有关数据的详细信息可以看Exlpain.md （记录了一些项目中用到的参数）