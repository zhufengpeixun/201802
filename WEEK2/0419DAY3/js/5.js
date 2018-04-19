// let ary = [12, 13, 14, 23, 24, 13, 15, 12];

// let max = Math.max.apply(null, ary);
// console.log(max);

//=>基于ES6中的展开运算符完成
// let max = Math.max(...ary);
// console.log(max);

/*
 * 解构赋值：按照一个数据值的结构，快速解析获取到其中的内容
 *   1.真实项目中一般都是针对于数组或者对象进行结构赋值
 */

let value = {name: 'xxx', age: 25, score: [12, 23, 34, 45]};
// a='xxx'
// b=12
// c=[23,34,45]
let {name: a, score: [b, ...c]} = value;
console.log(a, b, c);


//=================对象解构赋值
// let obj = {name: 'xxx', age: 25, sex: 0};
// let {name, age} = obj;//=>对象解构赋值默认情况下要求：左侧变量名和对象中的属性名一致才可以
// console.log(name, age);

// let {sex} = obj;
// console.log(sex);//=>0

// let {age: ageAA} = obj;
// // console.log(age);//=>Uncaught ReferenceError: age is not defined
// console.log(ageAA);//=>25 给解构的属性名起别名作为我们使用的变量

// let {friend = 0} = obj;
// console.log(friend);//=>0 给不存在的属性设置默认值

/*let fn = function ({
                       name = '珠峰',
                       age = 0
                   } = {}) {//=>把传递的对象解构了(不传递值,默认赋值为空对象：现在传递对象或者不传递，形参接收到的都是对象)，解构的时候，可以把传递进来对象中，如果某个属性不存在，我们赋值默认值
    console.log(name, age);

};
fn({
    name: 'xxx',
    age: 25
});*/

//=================数组解构赋值

// let a = 12,
//     b = 13;
//=>a&b互换位置
/*[a, b] = [b, a];//=>[13,12]
console.log(a, b);*/

/*let c=a;
a=b;
b=c;
console.log(a, b);*/

/*a=a+b;
b=a-b;
a=a-b;
console.log(a, b);*/

/*
let ary = [12];
let [a, b = 0] = ary;//=>在解构的时候可以给变量设置默认值：如果当前变量对应结构中的这一项没有值，变量用默认值
console.log(a, b);//=>12 0
*/

// let ary = [12, 23, 34, 45, 56];
//=>需求：获取第一项，把剩下的项作为一个数组返回
// let [a, ...b] = ary;
// console.log(a, b);//=>12 [23,34,45,56]  “...”在此处称之为剩余运算符：除了前面以外的项，都放在一个数组中
// let [a, ...b, c] = ary;//=>Uncaught SyntaxError: Rest element must be last element 剩余运算符处于解构中最后的位置

/*let a=ary[0],
    b=ary[1],
    c=ary[2];*/
// let [a, b, c] = ary;//=>让等号左边出现和右边相同的数据结构,左边可以创建一些变量快速获取到右侧对应位置的值(解构赋值)
// console.log(a, b, c);

// let [a] = ary;
// console.log(a);//=>12

// let [a, , c] = ary;
// console.log(a, c);//=>12 34











