/*
 * 回调函数：把一个函数A当做实参专递给另外一个函数B，在B方法执行的时候，把A执行了，我们把这种机制叫做 “回调函数机制”
 *
 *   1.根据需求回调函数可以被执行N多次
 *   2.不仅可以把回调函数执行，还可以给传递的回调函数传递实参，这样在回调函数中设置形参（或者使用ARG）接收即可
 *   3.还可以改变回调函数中的THIS指向
 *   4.可以在宿主函数（它在哪执行的，它的宿主函数就是谁）中接收回调函数执行的返回结果
 *   ...
 */
// let fn = (callback) => {
//     //=>callback:传递进来的函数
//     // callback && callback.call(obj, 100, 200);
//     //=>typeof callback==='function'?callback():null;
//
//     let res = callback(10, 20);
//     console.log(res);
// };
// fn((n, m) => {
//     //=>this:window 回调函数中一般THIS都是WINDOW,除非宿主函数执行回调函数的时候把THIS特殊指向了（箭头函数除外：箭头函数中的THIS是它上下文的）
//     // console.log(n, m);
//     return n + m;
// });

//=>和内置的FOR-EACH类似（但是FOR-EACH只能遍历数组），用来遍历数组（类数组、对象）中的每一项的
//$.each();

// [12, 23, 34].forEach(function (item, index) {
//     console.log(item, index, this);
//     //=>this:window
// });
// [12, 23, 34].forEach(function (item, index) {
//     console.log(item, index, this);
//     //=>this:'哈哈'
// }, '哈哈');//=>FOR-EACH第二个参数是用来改变回调函数中THIS的

// $.each([12, 23, 34], function (index, item) {
//     console.log(item, index, this);
//     //=>this:当前遍历的这一项(item)
// });

// //=>OBJ:我们需要迭代的数组、类数组、对象
// let each = function (obj, callback) {
//     //=>验证是数组(类数组)还是对象
//     let flag = 'length' in obj;//=>我们先简单验证：有LENGTH是数组或者类数组，没有是对象
//     if (flag) {
//         for (let i = 0; i < obj.length; i++) {
//             let item = obj[i];
//             let res = callback && callback.call(item, i, item);//=>接收回调函数的返回值，如果返回的是FALSE，我们结束循环即可
//             if (res === false) {
//                 break;
//             }
//         }
//     } else {
//         for (let key in obj) {
//             if (obj.hasOwnProperty(key)) {
//                 let value = obj[key],
//                     res = callback && callback.call(value, key, value);
//                 if (res === false) {
//                     break;
//                 }
//             }
//         }
//     }
// };
// each([12, 23, 34], function (index, item) {
//     //=>this:item
//     // console.log(index, item, this);
//     // return false;//=>如果回调函数返回FALSE，我们让其代表：结束当前迭代
//     console.log(item);
//     if (index >= 1) {
//         return false;
//     }
// });
// each({name: 'xxx', age: 12, sex: 0}, function (key, value) {
//     console.log(key, value, this);
//     if (key === 'age') {
//         return false;
//     }
// });

String.prototype.myReplace = function myReplace(reg, callback) {
    //=>this:str
    //=>默认REG肯定加G了,CALLBACK肯定传递函数了
    let res = reg.exec(this),
        _this = this;
    while (res) {
        //=>res:每一次EXEC捕获的结果（数组）
        let returnV = callback(...res);//=>捕获一次执行一次回调函数，并且把通过EXEC捕获的数组展开，每一项都依次传递给回调函数（returnV：当前回调函数执行的返回结果，我们要拿这个结果替换字符串中当前大正则匹配的内容）
        let v = res[0],
            i = _this.indexOf(v);
        _this = _this.substring(0, i) + returnV + _this.substring(v.length + i);
        res = reg.exec(this);
    }
    return _this;
};
let str = 'my name is {0}，i am {1} years old!',
    ary = ['周啸天哈哈', '28'];
str = str.myReplace(/\{(\d+)\}/g, function (...arg) {
    let index = arg[1];
    return ary[index];
});
console.log(str);

// 'my name is {0}，i am {1} years old!'  "周啸天"
// ['{0}','0',index:11]







