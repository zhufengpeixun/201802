/*
 * “...”在ES6的语法中，三个点有三种含义
 *   1.剩余运算符
 *   2.拓展运算符
 *   3.展开运算符：把数组(对象/类数组)中的每一项展开 xxx,xxx,xxx...
 */
// let ary = [12, 23, 34];
// let [...arg] = ary; //=>ary.slice(0)

// function fn(context, ...arg) {
//     //=>获取传递值中的第一个和剩下的
//     console.log(context, arg);
//     //=>ARG是一个数组 / ARGUMENTS是类数组
// }
// let obj = {};
// fn(obj, 10, 20, 30);

// function sum(...arg) {
//     //=>传递几个实参,ARG中就存储多少个,此时的ARG和ARGUMENTS一样的,区别是ARG是一个数组,ARGUMENTS是一个类数组
// }

// let ary = [12, 23, 34];
// let fn = function (a, b, c) {
//     console.log(a, b, c);
// };
// // Math.max(...ary);//=>Math.max(12,23,34)
// // fn(ary);//=>a:ary b/c:undefined
// fn(...ary);//=>fn(12, 23, 34) 把数组中的每一项分别传递给一个函数,此时我们使用展开运算符把数组展开即可

// let obj = {name: 'xxx', age: 20};
// let newObj = {...obj, sex: 0};//=>{name: 'xxx', age: 20,sex:0} 把原有对象展开(克隆)放到新对象中

// let ary = [12, 23];
// let newAry = [...ary, 100];//=>[12, 23, 100]