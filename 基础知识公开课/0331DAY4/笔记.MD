### 扫盲
1. C/S （client server）
   B/S （browser server）  =>网页制作 （会一些UI，会一些页面制作）

   技术栈：PhotoShop（PS）、HTML、CSS

2. 静态到动态（大部分指的是页面中数据的动态交互），后端到前端（“前后端分离”）

   技术栈：JS（jQuery）、AJAX（jsonp等跨域技巧）

   需要使用JS等技术完成页面中数据的动态交互，前端和后台完全分离了 =>前端开发

3. 从前端到全端（移动端等）
   做一款手机的APP：java-native / object-c
   一款APP中，有部分内容是需要H5完成的（H5就是前端做的） =>Hybrid混合APP开发'

   技术栈：响应式布局、HTML5、CSS3、Zepto、Hybrid（jsBridge）、微信二次开发、微信小程序...

4. 从全端到全栈
   => 框架化、模块化、自动化 开发（“工程化”）
   => 全栈开发

   技术栈：Vue、React、webpack、node...

Canvas / webGL

===========================

1. 作为前端开发，我们会把自己编写的代码（HTML/CSS/JS）放在浏览器（或者NODE 再或者webView）中运行，由浏览器负责解析和渲染出对应的图形和页面

  W3C：万维网联盟（制定语言标准和规划的地方）

  开发者：按照规范编写代码
  浏览器：按照规范把开发者编写的代码进行渲染和绘制（GPU显卡），作为开发浏览器的开发商或者开发者，想要让浏览器实现这些能力，需要给浏览器设置一定的程序（浏览器的内核或者渲染引擎）

  常用的渲染内核（渲染引擎）：
    - webkit内核(V8引擎)
        + 谷歌（必须安装）
        + Safari
        + 大部分国产浏览器(360/UC/QQ浏览器...)
        + 安卓和IOS手机上的大部分浏览器（移动端开发无需考虑IE低版本）
        + node（NODE是基于V8引擎渲染JS的平台或者环境）
        + web view
        + ...
    - Gecko内核
        + 火狐浏览器
    - Trident内核
        + IE
    - Presto内核
        + Opera（低版本使用的是这个内核，高版本用的也是webkit内核）
    - ...

=============================

学习是没有捷径的，所谓的捷径都会让你永远达不到巅峰；

1. 每天的学习坚持做笔记（IT人记笔记和技术文档都用markdown）
2. 经常复习：每周抽出两三天，每天抽出一到两个小时，把自己整理的学习笔记从头到尾过一遍

============
JS由三部分组成：
- ECMAScript(ES)：JS的基础语法与核心规范
- DOM：document object model 文档对象模型，让JS能够操作页面中的DOM元素（HTML元素）
- BOM：browser object model 浏览器对象模型，让JS能够操作浏览器的

http://es6.ruanyifeng.com/#docs/intro

ES3(ES5)：JS老版本规范
ES6(ES7)：JS新版本规范

===============
【ECMAScript】

1.变量
> 可变的量称之为变量，在编程语言中，变量是一个虚拟的概念，变量是用来存储和代表具体值的，只不过它存储和代表的值是可以修改的
>
> JS中定义变量的方式：
> 不管变量存储的值是什么类型的，统一用以下关键词都可以创建
> - var 创建变量
> - function 创建一个函数
> - let (这个及以下是ES6语法中创建变量)  创建变量
> - const  创建常量
> - class  创建类
> - import ES6中的模块导入

```javascript
var num = 12; //=>创建了一个变量num,给他存储了一个值12
num+10 //=>把num存储的值12获取到，然后再加上10
num = 100; //=>所谓变量，就是一个名字存储和代表的值能发生改变

const m = 100;
m = 200; //=>Uncaught TypeError: Assignment to constant variable. 基于const声明的名字，存储的值是不可以被修改的，我们把它叫做常量
```

2.JS中的命名规范：
- 严格区分大小写：Test / test 是两个不同的变量
- 不能使用关键字和保留字
- 遵循驼峰命名法：一个名字由多个英文单词组成，第一个单词首字母小写，其余每一个有意义单词的首字母都要大写
    + 命名使用：$/数字/字母/_  数字不能作为名字的开始
    + 建议命名的时候使用英文，而且用一些常用词组
    + ...

```javascript
var studentInfo;

[不好写法]
var xueshengInfo;
var xueshengXinxi;
var xsxx;

----

var _flag = true; //=>下划线开头一般代表是全局变量（公用变量）
var $flag; //=>一般都代表基于JQ获取的信息（和类库框架有关系）

----

info：信息
add / insert / create ：代表的都是新增创建
del / delete / rm / remove：代表的都是删除移除
update：代表修改
select / query / get：代表获取和查询
...

```


3. JS中的数据类型
> 数据在编程中非常重要，是我们实现产品的原材料

【基本数据类型（值类型）】
   数字 number
   字符串 string
   布尔 boolean
   空 null
   未定义 undefined

【引用数据类型】
   对象数据类型
      普通对象
      数组对象
      正则对象
      日期对象
      ...
   函数数据类型

```javascript
1 =>number
'1'  =>string 在JS中用单引号或者双引号包裹起来的都是字符串
true / false  =>boolean 只有true和false两个值
null
undeifned

{
  name:'珠峰',
  age:9
} =>普通对象

[12,23,34]  =>数组对象

/^-?(\d|([1-9]\d+))(\.\d+)?$/ =>正则对象

function fn(){

} =>函数数据类型
```

4. JS中检测数据类型的方式
- typeof 用来检测数据类型的运算符（常用）
- instanceof 检测当前实例是否隶属于某个类
- constructor 基于构造器，查找当前实例的构造函数
- Object.prototype.toString.call 调用基类Object原型上的toString方法，当方法执行的时候，让方法中的this变为要检测的值，返回当前值对应的类的信息

```javascript
语法：typeof [value]
返回值：返回的结果首先是一个字符串，其次字符串中包含了对应的数据类型，例如："number"/"string"/"boolean"/"undefined"/"object"/"function"

【特殊】
typeof null =>"object" 虽然null是基本值，但是它的意思叫做“空对象指针”，所以检测的结果是对象（可以理解为typeof的BUG）

基于typeof检测对象或者数组对象再或者正则对象，返回的结果都是“object”，也就是无法基于typeof判断当前对象是数组还是正则...（可以理解为typeof的局限性）

【面试题】
typeof typeof typeof []

-> typeof []  : "object"
-> typeof "object" : "string"
-> typeof "string" : "string"

考察点：检测的结果首先是一个字符串
```

===============================
【数字类型 number】
> 除了常规数字，在JS中 NaN 也是number类型的

1. NaN：not a number 不是一个有效数字

```
typeof NaN =>"number"

NaN==NaN =>false  NaN和任何值都不相等，和本身也不相等（不是一个数包含范围太广了）


--

我想知道num存储的值是否为有效数字,下面的代码实现不了，因为NaN和谁都不相等
var num = ?;
if(num==NaN){
    //=>如果条件成立，则num存储的值不是有效数字（可惜这个条件永远都不会成立，不管num是啥）
}
```

2. 如何检测一个值是否为有效数字?
   => isNaN：检测一个值是否不是有效数字，返回TRUE代表不是有效数字，FALSE代表是有效数字

```javascript
语法：isNaN([value])

运作机制：当使用isNaN用来检测一个值是否为有效数字的时候，如果被检测的值不是数字类型，浏览器首先会把它转换为数字类型，然后再进行检测

---

把其它数据类型值转换为数字类型
[把其它基本类型值转换为数字 => Number([value])]
  字符串->数字
    Number('1') : 1
    Number('-1.3') : -1.3
    Number('1px') : NaN
    如果字符串中出现任意一个非有效数字字符，则转换为数字的NaN

  布尔->数字
    Number(true) : 1
    Number(false) : 0

  空->数字
    Number(null) : 0
    Number(undefined) : NaN

[把引用数据类型转换为数字
   =>首先toString()把引用值转换为字符串
   =>其次调取Number()把字符串转换为数字
]
  isNaN({name:'xxx'})
   ->({name:'xxx'}).toString() : "[object Object]"  所有普通都对象转换为字符串，结果都是它(客户扩展为啥？)
   ->Number("[object Object]") : NaN

  isNaN([12,23])
   ->[12,23].toString() : '12,23'
   ->Number('12,23') : NaN

  isNaN([])
   ->[].toString() : ''
   ->Number('') : 0

  isNaN([12])
   ->[12].toString() : '12'
   ->Number('12') : 12

  ...
```

3. parseInt / parseFloat
> Number把字符串转化数字，遇到一个非有效数字字符，结果就是NaN了，我们想要提取出字符串中有效数字的部分，需要使用 parseInt / parseFloat 两个方法

```javascript
Number('1px') : NaN
parseInt('1px') : 1
parseInt('1.5px') : 1
parseFloat('1.5px') : 1.5

parseInt('width:1px') : NaN  =>从字符串最左边开始找，遇到一个非有效数字字符后就停止查找了（不管后面是否存在有效数字），把找到的变为数字，一个都没找到结果就是NaN
parseInt('1px3') : 1

思考题：
parseInt支持两个参数（parseInt('10px',2)），这个是啥意思?
```

===============
【布尔 boolean】
> 只有两个值：true / false

```javascript
//=>把其它数据类型的值转换为布尔类型：
//=>除了“NaN/0/''/null/undefined”这五个值会转换为FALSE,其余的都会转换为TRUE

//=>哪些情况需要把其它类型值转换为布尔呢？
//[手动自己转]
Boolean(0) =>false
Boolean([]) =>true

!0 =>true  叹号在这里是取反的意思（先转化为布尔类型然后再取反）
!!0 =>false 两个叹号只剩下转换为布尔类型了，等价于Boolean

//[程序自己需要转换 =>一般都是条件判断的时候]
if(1){
   //=>如果条件成立，执行大括号中的代码
   //=>浏览器会把1作为条件：把它转换为布尔的TRUE，条件成立
}
```

===========================
【对象数据类型 object】
> 对象都有一个特点：每一个对象都是由零到多组属性名和属性值（键值对 key:value）组成的
>
> 所谓的属性，其实可以理解为对象的特征，而属性值就是对特征的描述

```javascript
var obj={
   name:'婉茹',
   age:18
};

//=>操作对象的键值对
1. 对象.属性
2. 对象[属性]
//=>对象的属性名是字符串和数字格式的，属性值可以是任何数据类型

//=>获取
obj.name
obj['name']

//=>增加/修改
//=>一个对象中的属性名是不能重复的，如果当前对象属性已经存在，我们属于修改属性值，不存在才是新增加属性
obj['name']='明明'; //=>修改
obj['sex']='女'; //=>新增

//=>删除
[彻底删除：属性和属性值都没有了]
delete obj.age / delete obj['age']

[假删除：属性还在，只是值为空]
obj['age']=null; //=>赋值为null的原因：因为对象没有这个属性，默认获取的值是undefiend，假删除只是设置值为空，但是属性还在，我们最好不要设置为undefined，这样会和默认返回的结果冲突，无法区分到底是有没有这个属性
```

属性名可能是字符串，也可能是数字，不能是其它类型值（尤其是引用类型）
```javascript
obj[{xxx:'xxx'}]=100;
=>
{
  '[object Object]':100
}

//=>属性名还可以是数字
var ary = [12,23,34];
数组对象，我们看到的是属性值，属性名是默认生成的，而且有特点：
1.属性名是数字
2.数字是从零开始逐级递增的
3.有一个字符串属性名length,代表数组的长度

我们把数组中的数字属性名称之为“数组的索引”

ary[0] =>12
ary.0 //=>Uncaught SyntaxError: Unexpected number 语法错误，如果属性名是数字，我们则不能通过 对象.数字 方式来操作属性
```

```
var key='name';
var obj = {
    key:100
};
obj.key ->100  属性名为'KEY'
obj['key'] ->100 属性名为'KEY'

obj[key] =>这样写绝对不是获取属性名为KEY的值，因为此时的KEY不是字符串也不是数字，而是变量；KEY代表的是存储的值'name'，所以此处它的意思是 obj['name']
```

=========================
1. 基本类型值（值类型） VS 引用类型值

```javascript
var n=10;
var m=n;
m=20;
console.log(n);

var a={name:'珠峰'};
var b=a;
b.name='培训';
console.log(a.name);
```

```javascript
var n=[12,23,34];
var m=n;
m[0]=100;
m=[100];
n[1]=200;
console.log(n,m);
```

```javascript
var obj={
    n:10,
    m:obj.n*10
};
console.log(obj.m);
```

预习14/15，获得上面的答案
剩下的尽可能向后多看
































