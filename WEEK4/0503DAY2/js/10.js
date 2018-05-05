const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;

//=>把数组拼成字符串，把字符串EVAL了即可
// [div2, mul3, add1, add1]
// 'div2(mul3(add1(add1(0))))'
// const compose = (...arg) => {//=>不销毁的栈
//     //=>arg:[div2, mul3, add1, add1]
//     return val => {
//         //=>fn(0):执行的是小函数,val=0
//         let str = '';
//         arg.forEach(item => (str += item.name + ','));
//         str = str.replace(/,/g, '(');
//         str += val;
//         arg.forEach(item => (str += ')'));
//         return eval(str);
//     }
// };
// let fn = compose(div2, mul3, add1, add1);
// console.log(fn(0));//=>div2(mul3(add1(add1(0))))


/*
 * 柯理化函数编程思想
 *   1.执行一个方法，传递一些参数进去，首先形成一个不销毁的栈，把传递的这些值存储起来（没有立即使用，属于预先存储一下）
 *   2.返回一个小函数给栈外面
 *   3.当执行返回的小函数时候，把之前第一步预先存储的信息拿过来使用（作用域链、闭包等机制完成的）
 *
 *   我们把JS中基于闭包实现的预先存储的思想成为 “柯理化函数思想”
 */
// const compose = (...arg) => {
//     //=>arg:[div2, mul3, add1, add1]
//     arg = arg.reverse();//=>[add1, add1,mul3,div2]
//     return val => {
//         //=>val:0
//         arg.forEach(item => {
//             val = item(val);
//             //第一次 add1(0) =>1  =>val=1
//             //第二次 add1(1) =>2  =>val=2
//             //第三次 mul3(2) ...
//         });
//         return val;
//     }
// };
// let fn = compose(div2, mul3, add1, add1);
// console.log(fn(0));//=>div2(mul3(add1(add1(0))))
