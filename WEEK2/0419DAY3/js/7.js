/*
 * 编写一个方法fn，实现任意数求平均数（去除数字中的最大和最小，然后再算平均数，保留小数点后面两位）
 */
// let fn = function () {
//     //=>arguments:类数组(不能直接调取数组原型上的方法)
//     //1.先给ARGUMENTS排序(不能直接使用SORT方法),把排序后的值去掉首位(干掉最大值和最小值)
//     //2.把剩下的值求和,除以总长度,求出平均数即可
//
//     //arguments.sort()//=>Uncaught TypeError: arguments.sort is not a function
//     //=>把ARG类数组转换为数组ARY
//     let ary = [];
//     for (let i = 0; i < arguments.length; i++) {
//         ary.push(arguments[i]);
//     }
//
//     //=>给ARY排序，去除首位
//     ary.sort(function (a, b) {
//         return a - b;
//     });
//     ary.pop();
//     ary.shift();
//
//     //=>然后再求和，最后求平均
//     let total = 0;
//     for (let i = 0; i < ary.length; i++) {
//         total += ary[i];
//     }
//     return (total / ary.length).toFixed(2);
// };

let fn = function () {
    //=>把ARG类数组转换为数组ARY（把类数组克隆一份一模一样的，最后存储到数组中）  =>数组的SLICE可以实现克隆的
    //=>把内置的SLICE方法执行 Array.prototype.slice() / [].slice() ...
    let ary = [].slice.call(arguments, 0);//=>类数组借用数组原型上的方法执行,实现相关的操作(借用SLICE实现把类数组转换为数组)  前提：类数组和数组类似，都有length和索引（字符串也符合这个前提，所以也可以这样搞）

   /* [].sort.call(arguments, function (a, b) {
        return a - b;
    });//=>借用SORT给ARG排序，除此之外其它的很多数组的方法都可以被ARG借用*/

    ary.sort(function (a, b) {
        return a - b;
    }).pop();
    ary.shift();
    return (eval(ary.join('+')) / ary.length).toFixed(2);
};
console.log(fn(10, 9.8, 9.5, 8.7, 8.8, 8, 9.2, 8.9));


/*
//=>重写数组的SLICE方法,实现:ary.slice()相当于把ARY克隆一份新数组
Array.prototype.mySlice = function () {
    //=>把操作的数组ARY克隆一份
    //=>this:ary
    //=>内置的SLICE实现数组克隆的代码
    let newAry = [];
    for (let i = 0; i < this.length; i++) {
        newAry.push(this[i]);
    }
    //=>如果我们把内置的SLICE执行，并且让方法中的THIS指向ARGUMENTS，就相当于把ARG转换为数组
    /!*
        let ary = [];
        for (let i = 0; i < arguments.length; i++) {
            ary.push(arguments[i]);
        }
        =>把ARG这个类数组转换为数组
     *!/
    return newAry;
};
let ary = [12, 23, 34];
console.log(ary.mySlice());//=>[12, 23, 34]
*/








