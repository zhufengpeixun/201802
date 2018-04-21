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
//=>对象克隆[展开运算符]
let obj = {name: 'xxx', age: 27};
let newObj = {...obj, sex: 0};//=>展开运算符
console.log(newObj);








