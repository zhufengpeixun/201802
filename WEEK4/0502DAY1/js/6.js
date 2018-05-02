/*
 * 常用的算法
 *   递归
 *   去重
 *   冒泡排序
 *   插入排序
 *   快速排序
 *   时间复杂度
 *   空间复杂度
 *   KMP
 *   ...
 */

//=>递归：函数自己调用自己执行就是递归 （递归是基于条件判断的：因为我们不能形成死递归，在某个条件下我们需要结束递归操作）
// function fn() {
//     fn(); //=>Uncaught RangeError: Maximum call stack size exceeded
// }
// fn();

//=>需求：在1~100之间获取即是3也是5的倍数（也就是15的倍数）的和
// let total = 0;
// for (let i = 1; i <= 100; i++) {
//     if (i % 15 === 0) {
//         total += i;
//     }
// }
// console.log(total);//=>315

// function fn(n) {
//     if (n > 100) return 0;
//     if (n % 15 === 0) {
//         return n + fn(n + 1);
//     }
//     return fn(n + 1);
// }
// console.log(fn(1));//=>315

// function fn(n) {
//     if(n===0){
//         return 0;
//     }
//     if (n % 2 === 0) {
//         return n + fn(n - 1);
//     }
//     return fn(n-1);
// }
// fn(10);
//
// 第一次执行
//     n=10 条件成立 return 10+8+6+4+2+0
//         fn(9)
//         n=9 条件不成立 return fn(8)
//         fn(8)
//         n=8 条件成立 return 8+fn(7)
//         ...


///=>数组扁平化(多维数组=>一维数组)
let ary = [1, [2, [3, [4, 5]]], [6, 7, [8, 9, [11, 12]], 10]];  //=>[1,2,3,4,5,6]

// let str = JSON.stringify(ary);
// //=>第一种处理
// // console.log(str);//=>[1,[2,[3,[4,5]]],6]
// // ary = str.replace(/(\[|\])/g, '').split(',');
// // console.log(ary);
// //=>第二种处理
// str = str.replace(/(\[|\])/g, '');
// str = '[' + str + ']';
// ary = JSON.parse(str);
// console.log(ary);

let result = [],
    fn = function (ary) {
        if (ary.length === 0) return;
        for (let i = 0; i < ary.length; i++) {
            let item = ary[i];
            if (typeof item === 'object') {
                fn(item);
            } else {
                result.push(item);
            }
        }
    };
fn(ary);
console.log(result);