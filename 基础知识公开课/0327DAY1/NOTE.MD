一：浅聊前端发展史
第一阶段：C/S（client server） -> B/S（browser server） 网页制作
  技术栈：PhotoShop、HTML、CSS

第二阶段：从静态到动态，从后端到前端   前端开发工程师
  前后端分离
    后台：完成数据的分析和业务逻辑编写（包含API接口编写）
    前端：网页制作、JS交互效果、数据的交互和绑定

  技术栈：JavaScript、AJAX（跨域技巧）、jQuery...

第三阶段：从前端到全端（从PC端到移动端）
  技术栈：H5、CSS3、响应式布局开发、Zepto、Hybrid（混合APP开发）、微信小程序...

第四阶段：从全端到全栈
  全栈开发：前后端都可以开发（严格意义讲，一种语言完成前后端开发）
  技术栈：NODE(基于JS编程语言开发服务器端程序)、Express/Koa...

为了迎合日益发展的前端开发，JS中诞生很多有助于开发、维护、提高性能的框架：Vue、React、Angular、webpack...

展望WEB4.0时代，VR/AR元年，前端需要Canvas/webGL...

----

二、关于浏览器的内核和引擎
 webkit（v8引擎）：大部分浏览器
 gecko：火狐
 trident：IE
 ...

 W3C：万维网联盟，制定编程语言的规范与标准
   开发者按照规范编写代码，浏览器开发商也会开发一套按照规范把代码渲染成页面的东西（这个东西就是内核或者引擎）

   浏览器内核作用：按照一定的规范，把代码基于GPU(显卡)绘制出对应的图形和页面等

   为啥会出现浏览器兼容：
     1.部分浏览器会提前开发一些更好的功能，后期这些功能会被收录到W3C规范中，但是在收录之前，会存在一定的兼容性
     2.各个浏览器厂商，为了突出自己的独特性，用其它方法实现了W3C规范中的功能
     ...

----

三、JavaScript
  JS：轻量级的客户端脚本编程语言

  1. 编程语言
   HTML+CSS是标记语言
   编程语言是具备一定逻辑的，拥有自己的编程思想（面向对象编程 [OOP]、面向过程编程）
   - 面向对象
     + C++
     + JAVA
     + PHP
     + C#（.net）
     + JS
     + ...
   - 面向过程
     + C

   2. 目前的JS已经不仅仅是客户端语言了，基于NODE可以做服务器端程序，所以JS是全栈编程语言

   3. 学习JS，我们学习它的几部分组成
   - ECMAScript（ES）：JS的核心语法
   - DOM：document object model 文档对象模型，提供各种API（属性和方法）让JS可以获取或者操作页面中的HTML元素(DOM和元素)
   - BOM：browser object model 浏览器对象模型，提供各种API让JS可以操作浏览器

四：ESMAScript
  它是JS的语法规划，JS中的变量、数据类型、语法规范、操作语句、设计模式等等都是ES规定的

----

五：变量（variable）
  它不是具体的值，只是一个用来存储具体值的容器或者代名词，因为它存储的值可以改变，所以称为变量

  基于ES语法规范，在JS中创建变量有以下方式
  - var (ES3)
  - function (ES3) 创建函数(函数名也是变量，只不过存储的值是函数类型的而已)
  - let (ES6)
  - const (ES6) 创建的是常量
  - import (ES6) 基于ES6的模块规范导出需要的信息
  - class (ES6) 基于ES6创建类

``` javascript
/*
 * 语法：
 *   var [变量名]=值
 *   let [变量名]=值
 *   const [变量名]=值
 *   function 函数名(){
 *
 *   }
 *   ...
 */
var n = 13;
n = 15;
alert(n+10);//=>弹出来25 此时的N代表15

const m = 100;
m = 200;//=>Uncaught TypeError: Assignment to constant variable. 不能给一个常量重新的赋值（常量存储的值不能被修改，能够修改就是变量了）
```

创建变量，命名的时候要遵循一些规范
- 严格区分大小写
- 遵循驼峰命名法：按照数字、字母、下划线或者$来命名（数字不能做为名字的开头），命名的时候基于英文单词拼接成一个完整的名字（第一个单词字母小写，其余每一个有意义单词的首字母都大写）
- 不能使用关键字和保留字：在JS中有特殊含义的叫做关键词，未来可能会成为关键字的叫做保留字

```
var n=12;
var N=13; //=>两个n不是同一个变量

var studentInfo / student_info / _studentInfo（下划线在前的，都是公共变量） / $studentInfo（一般存储的是JQ元素）...

语义化强一些
  add / create / insert
  del（delete）/ update / remove（rm）
  info / detail
  log
  ...
```

----

六：数据值是一门编程语言进行生产的材料，JS中包含的值有以下这些类型
- 基本数据类型（值类型）
  + 数字number
  + 字符串string
  + 布尔boolean
  + null
  + undefined
- 引用数据类型
  + 对象object
    + 普通对象
    + 数组对象
    + 正则对象
    + 日期对象
    + ...
  + 函数function
- ES6中新增加的一个特殊的类型：Symbol，唯一的值

```
[基本数据类型]
var n = 13; //=>0 -13 13.2 数字类型中有一个特殊的值NaN（not a number代表不是一个有效的数字,但是属于number类型的）

var s = '';//=>"" '13' "{}" JS中所有用单引号或者双引号包裹起来的都是字符串，里面的内容是当前字符串中的字符（一个字符串由零到多个字符组成）

var b = true;//=>布尔类型只有两个值 true真 false假

[引用数据类型]
var o = {name:'珠峰培训',age:9};//=>普通的对象：由大括号包裹起来，里面包含多组属性名和属性值（包含多组键值对） {}空对象

var ary = [12,23,34,45]; //=>中括号包裹起来，包含零到多项内容，这种是数组对象  []空数组

var reg = /-?(\d|([1-9]\d+))(\.\d+)?/g; //=>由元字符组成一个完整的正则  //不是空正则是单行注释

function fn(){

}

[Symbol]
创建出来的是一个唯一的值
var a = Symbol('珠峰');
var b = Symbol('珠峰');
a==b =>false
```


扩展：JS代码如何被运行以及运行后如何输出结果
[如何被运行]
- 把代码运行在浏览器中(浏览器内核来渲染解析)
- 基于NODE来运行(NODE也是一个基于V8引擎渲染和解析JS的工具)

[如何输出结果]
- alert：在浏览器中通过弹框的方式输出(浏览器提示框)
```
var num=12;
alert(num); //=>window.alert

var str='珠峰';
alert(str);

基于alert输出的结果都会转换为字符串：把值(如果是表达式先计算出结果)通过toString这个方法转换为字符串，然后再输出
alert(1+1); =>'2'
alert(true); =>'true'
alert([12,23]); =>'12,23'
alert({name:'xxx'}); =>'[object Object]' 对象toString后的结果就是object object，为啥？
```

- confirm：和alert的用法一致，只不过提示的框中有确定和取消两个按钮，所以它是确认提示框
```
var flag = confirm('确定要退出吗?');
if(flag){
   //=>flag:true 用户点击的是确定按钮
}else{
   //=>flag:false 用户点击的是取消按钮
}
```

- prompt：在confirm的基础上增加输入框

- console.log：在浏览器控制台输出日志（按F12(FN+F12)打开浏览器的控制台）
    + Elements：当前页面中的元素和样式在这里都可以看到，还可以调节样式修改结构等
    + Console：控制台，可以在JS代码中通过.log输出到这里，也可以在这里直接的编写JS代码
    + Sources：当前网站的源文件都在这里
    + ...

- console.dir：比log输出的更加详细一些（尤其是输出对象数据值的时候）
- console.table：把一个JSON数据按照表格的方式输出
- ... （自己回去扩展更多console输出方法）

----

七、数据类型的详细剖析

1. number数字类型
NaN：not a number 但是它是数字类型的
isNaN：检测当前值是否不是有效数字，返回true代表不是有效数字，返回false是有效数字
```
//=>语法：isNaN([value])
var num=12;
isNaN(num); //->检测num变量存储的值是否为非有效数字 false

isNaN('13') =>false
isNaN('珠峰') =>true
isNaN(true) =>false
isNaN(false) =>false
isNaN(null) =>false
isNaN(undefined) =>true
isNaN({age:9}) =>true
isNaN([12,23]) =>true
isNaN([12]) =>false
isNaN(/^$/) =>true
isNaN(function(){}) =>true

重要：isNaN检测的机制
1、首先验证当前要检测的值是否为数字类型的，如果不是，浏览器会默认的把值转换为数字类型

  把非数字类型的值转换为数字
  - 其它基本类型转换为数字：直接使用Number这个方法转换的

  [字符串转数字]
    Number('13') ->13
    Number('13px') ->NaN 如果当前字符串中出现任意一个非有效数字字符，结果则为NaN
    Number('13.5') ->13.5 可以识别小数

  [布尔转数字]
    Number(true) ->1
    Number(false) ->0

  [其它]
    Number(null) ->0
    Number(undefined) ->NaN

  - 把引用数据类型值转换为数字：先把引用值调取toString转换为字符串，然后再把字符串调取Number转换为数字

   [对象]
     ({}).toString() ->'[object Object]' ->NaN

   [数组]
     [12,23].toString() ->'12,23' ->NaN
     [12].toString() ->'12' ->12

   [正则]
     /^$/.toString() ->'/^$/' ->NaN

  Number('') ->0
  [].toString() ->''
  => isNaN([])：false

2、当前检测的值已经是数字类型，是有效数字返回false，不是返回true（数字类型中只有NaN不是有效数字，其余都是有效数字）

```

2. parseInt / parseFloat
> 等同于Number，也是为了把其它类型的值转换为数字类型

> 和Number的区别在于字符串转换分析上
>
> Number：出现任意非有效数字字符，结果就是NaN
>
> parseInt：把一个字符串中的整数部分解析出来，parseFloat是把一个字符串中小数(浮点数)部分解析出来
```
parseInt('13.5px') =>13
parseFloat('13.5px') =>13.5

parseInt('width:13.5px') =>NaN 从字符串最左边字符开始查找有效数字字符，并且转换为数字，但是一但遇到一个非有效数字字符，查找结束
```

3. NaN的比较
```
NaN==NaN：false NaN和谁都不相等，包括自己
```

思考题：有一个变量num，存储的值不知道，我想检测它是否为一个有效数字，下面方案是否可以
```
if(Number(num)==NaN){
    alert('num不是有效数字!');
}

NaN和谁都不相等，条件永远不成立（即使num确实不是有效数字，转换的结果确实是NaN，但是NaN!=NaN的）

if(isNaN(num)){
    //=>检测是否为有效数字，只有这一种方案
    alert('num不是有效数字!')
}
```







