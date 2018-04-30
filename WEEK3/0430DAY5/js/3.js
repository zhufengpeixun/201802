// let str = 'zhufeng2018peixun2019';
// let reg = /\d+/g;
// console.log(reg.test(str));//=>TRUE
// console.log(reg.lastIndex);//=>11 基于TEST进行匹配的时候，如果设置了G，TEST匹配也相当于捕获，修改了LAST-INDEX的值
// console.log(reg.exec(str));//=>['2019']

// let str = 'zhufeng2018';
// let reg = /\d+/g;
// if(reg.test(str)){
//     console.log(reg.exec(str));//=>NULL
// }

// let str = 'zhufeng2018';
// let reg = /\d+/g;
// console.log(reg.exec(str));//=>['2018'] 把REG.LAST-INDEX修改了
// console.log(reg.exec('zhufeng2018peixun2019'));//=>['2019'] 虽然捕获的不是同一个字符串，但是正则是同一个，上一次正则处理的时候修改了它的LAST-INDEX，也会对下一次匹配新的字符串产生影响

// let str = 'zhufeng2018peixun2019';
// let reg = /(\d+)/g;
// console.log(reg.test(str));//=>TRUE
// console.log(RegExp.$1);//=>'2018' //=>把上一次匹配(TEST/EXEC)到的结果获取到，获取的是第一个小分组匹配的内容，大正则匹配的内容无法获取，它是一个全局的值，浏览器中$1只有一个，其它的正则操作也会覆盖这个值，所以这种方式没啥用
// console.log(reg.test(str));//=>TRUE
// console.log(RegExp.$1);//=>'2019'
// console.log(reg.test(str));//=>FALSE
// console.log(RegExp.$1);//=>'2019'
// console.log(reg.test(str));//=>TRUE
// console.log(RegExp.$1);//=>'2018'

/*
 * replace：实现正则捕获的方法（本身是字符串替换）
 */
// let str = 'zhufeng2018zhufeng2019';//=>'zhufeng' => 'zhufengpeixun'

//=>真实项目中很多需求不基于正则是无法替换的
// str = str.replace('zhufeng', 'zhufengpeixun');
// console.log(str);//=>'zhufengpeixun2018zhufeng2019'
// str = str.replace('zhufeng', 'zhufengpeixun');
// console.log(str);//=>'zhufengpeixunpeixun2018zhufeng2019'

// str = str.replace(/zhufeng/g, 'zhufengpeixun');
// console.log(str);//=>'zhufengpeixun2018zhufengpeixun2019'

//==============REPLACE原理
// let str = 'zhufeng{val:2018}zhufeng{val:2019}',
//     reg = /\{val:(\d+)\}/g;
// str = str.replace(reg, '@');//=>用REG正则和STR字符串进行匹配，匹配几次就替换几次，每一次都是把当前“大正则”匹配的结果用第二个传递的字符串替换掉了
// console.log(str); //=>'zhufeng@zhufeng@'

// str = str.replace(reg, '$1');//=>$1不是拿这个字符串替换掉大正则匹配的内容，此处的$1代表第一个分组匹配的内容，等价于 RegExp.$1
// console.log(str);//=>'zhufeng2018zhufeng2019'

/*
 * 1. REG 和 STR 匹配多少次，函数就被触发执行对少次，而且传递了一些参数信息值
 * 2. 每一次ARG中存储的信息，和执行EXEC捕获的信息相似（内置原理：每一次正则匹配到结果，都把函数执行，然后基于EXEC把本次匹配的信息捕获到，然后把捕获的信息传递给这个函数）
 * 3. 每一次函数中返回的是啥，就把当前大正则匹配的内容替换成啥
 */
// str = str.replace(reg, (...arg) => {
//     console.log(arg);
//     return 'AA';
// });
// console.log(str);

//=>时间字符串格式化
// "2018/4/30 17:50:23"  => "04-30 17:50"

//=>简单处理
// let str = "2018/4/30 17:50:23",
//     ary = str.split(/(?:\/| |:)/g);
// // console.log(ary);//=>["2018", "4", "30", "17", "50", "23"]
// let [, month, day, hours, minutes] = ary,
//     result = `${month}-${day} ${hours}:${minutes}`;
// console.log(result);

// let str = "2018/4/30 17:50:23";
// //1.获取时间字符串中的所有数字 (SPLIT)
// let ary = str.match(/\d+/g).map(item => {
//     return item < 10 ? '0' + item : item;
// });//=>MAP相对于FOR-EACH来讲多了返回值,函数中RETURN的是啥,就是把当前数组中迭代的这一项替换成啥
// // console.log(ary);//=>["2018", "04", "30", "17", "50", "23"]

//2.指定最后想要的时间格式，我们基于这个数组中的内容，帮你拼接好即可
// let template = '{0}年{1}月{2}日 {3}时{4}分{5}秒';
// //=>{0} / 0  =>'2018' ARY[0]
// //=>{1} / 1  =>'04' ARY[1]
// //=>...
// template = template.replace(/\{(\d)\}/g, (...arg) => {
//     let [, index] = arg;//=>index:每一次正则匹配小分组捕获的结果(也就是那个数字)
//     return ary[index];
// });
// console.log(template);

//=>时间字符串格式化
String.prototype.myFormatTime = function myFormatTime(template = '{0}年{1}月{2}日 {3}时{4}分{5}秒') {
    let ary = this.match(/\d+/g).map(item => (item < 10 ? '0' + item : item));
    return template.replace(/\{(\d)\}/g, (...[, index]) => ary[index] || '00');
};

let str = "2018-4-30";
console.log(str.myFormatTime('{1}-{2} {3}:{4}'));


//=>思考题
//1. 获取一个字符串中最多出现字符的次数和对应的字符
// let str = 'zhufengpeixunzhouxiaotianzuishuai';

//2. 获取URL问号后面的参数值
// let str = 'http://www.zhufengpeixun.cn/stu/?name=AA&age=25&sex=0#teacher';
//=>{name:'AA',age:25,sex:0,HASH:'teacher'}