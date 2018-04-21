/*
 * ES6解构赋值
 */
// let ary = [12, 23, '珠峰'];
// let [a, b, c] = ary;
// console.log(a, b, c);

// let [a, , b] = ary;
// console.log(a, b);

// let [a] = ary;
// console.log(a);//=>12

// let [a, ...b] = ary;
// console.log(a, b);//=>a=12  b=[23, "珠峰"]  三个点在这里代表的意思：除了前面的，把后面的统一用数组包裹起来，获取的结果是一个数组

// let newAry=ary.slice();
// let [...newAry] = ary; //=>数组克隆

// let [, , , a] = ary;
// console.log(a);//=>undefined
// let [, , , a = 0] = ary;
// console.log(a);//=>0 赋值默认值（如果当前项没有解构到任何值,给一个初始值）

//================[对象]
// let obj = {name: 'xxx', age: 27};

// let {name, ageAA} = obj;
// console.log(name, ageAA);//=>'xxx' undefined  在对象的解构赋值中，我们需要保证左侧设定的变量名和右侧对象属性名相同，这样才可以解构出来
/*
 * 编译成为ES5
     var obj = { name: 'xxx', age: 27 };
     var name = obj.name,
         ageAA = obj.ageAA;
     console.log(name, ageAA);
 */

// let {age: ageAA} = obj;
// console.log(ageAA);//=>给某一个需要解构的值设置别名（和属性名不相同的变量名）
/*
 var _obj = obj,
    ageAA = _obj.age;
 */

// let {sex = 0} = obj;
// console.log(sex);//=>给解构的结果设置默认值

//================[实际意义]

// let a = 12,
//     b = 13;
// [b, a] = [a, b]; //=>交换两个变量的值

// let data = {
//     name: 'xxx',
//     age: 27,
//     score: [
//         110,
//         130,
//         20
//     ]
// };
// let {name, score: [chinese, , english=0]} = data;
// console.log(name + ' 语文:' + chinese + ' 英语:' + english);

// let ajax = function ({
//                          url = '',
//                          method = 'get',
//                          data = null
//                      } = {}) {
//     //=>传递的参数：
//     //1.快速获取传递的值
//     //2.不传递某一项给默认值
//     //3.即使不传递参数也不会报错
//     console.log(url, method, data);
// };
// ajax({
//     url: '/getall',
//     method: 'get',
//     data: null
// });
// ajax({
//     url: '/getInfo'
// });
// ajax();

//=======================[...]
/*
 * 1.拓展运算符
 * 2.剩余运算符
 * 3.展开运算符
 */
//=>对象克隆[展开运算符]
// let obj = {name: 'xxx', age: 27};
// let newObj = {...obj, sex: 0};//=>展开运算符
// console.log(newObj);

// let ary = [12, 23];
// let newAry = [...ary, 34];
// console.log(newAry);

// let [...arr] = ary;
// console.log(arr);

// let ary = [12, 23, 14, 25, 35, 26];
// console.log(Math.max(...ary));
// let fn = function (...arg) {
//     //=>剩余预算符：把传递参数除了前面形参接收的以外,其余的都存储到ARG中,ARG是一个数组
// };
// fn(...ary);//=>fn(12, 23, 14, 25, 35, 26) 展开运算符

// let fn = function (...arg) {
//     arg.sort(function (a, b) {
//         return a - b;
//     });
//     arg.pop();
//     arg.shift();
//     return eval(arg.join('+')) / arg.length;
// };
// let score = fn(100, 85, 60, 89, 95, 92, 73);
// console.log(score);

//======================[箭头函数]

// let fn = (x, y) => {
//
// };
// fn(10, 20);

// let fn = x => {
//     //=>只有一个形参，我们可以省略小括号
// };
// fn(10);

// let fn = function (x, y) {
//     return x + y;
// };
// let fn = (x = 0, y = 0) => x + y; //=>如果函数体中只有一句操作，并且是RETURN的，我们可以省略大括号（给形参设置默认值）
// console.log(fn(10, 20));

// let fn = x => y => x + y;
// /*
//  var fn = function fn(x) {
//   return function (y) {
//     return x + y;
//   };
//  };
//  */

//1.箭头函数中没有arguments
// let fn = (...arg) => {
//     // console.log(arguments);//=>Uncaught ReferenceError: arguments is not defined
//     // console.log(arg);//=>可以使用剩余运算符代替，而且ARG是一个数组
// };
// fn(10, 20, 30, 40);

//2.箭头函数中没有自己的执行主体(THIS)，它的THIS都是继承上下文中的THIS
/*
let obj = {
    fn: (function () {
        //=>this:window
        let _this = this;//=>window
        return function () {
            // console.log(this);
            console.log(_this);//=>_this只是一个变量，不是私有的，找上级作用域中的
        }
    })()
};
// obj.fn();//=>this:obj  如果我想让obj.fn执行,this也是window，该如何处理?
// obj.fn.call(window);//=>this:window
*/

// let obj = {
//     fn: (function () {
//         //=>this:window
//         return () => {
//             console.log(this);
//         }
//     })()
// };
// obj.fn();//=>this:window 箭头函数执行和是否有点，点前面是谁都没关系了，因为它没有自己的执行主体，在箭头函数中使用到的THIS都是直接找上下文中的THIS来使用