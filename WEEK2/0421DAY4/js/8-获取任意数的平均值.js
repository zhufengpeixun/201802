/*
 * 要求：去除最大的和最小的,剩下的求平均分
 */
// let fn = function () {
//     //1.把传递的实参进行排序
//     //ARGUMENTS(类数组:不能直接使用数组中的方法)
//     //首先把ARGUMENTS转换为数组
//     let newAry = [];
//     for (let i = 0; i < arguments.length; i++) {
//         newAry.push(arguments[i]);
//     }
//     //然后把数组进行排序,去掉首尾
//     newAry.sort(function (a, b) {
//         return a - b;
//     });
//     newAry.pop();
//     newAry.shift();
//
//     //2.把数组中的每一项进行相加,除以总长度即可
//     let total = 0;
//     for (let i = 0; i < newAry.length; i++) {
//         let item = newAry[i];
//         total += item;
//     }
//     return total / newAry.length;
// };
// let score = fn(100, 85, 60, 89, 95, 92, 73);
// console.log(score);

/*
let fn = function () {
    //=>把类数组转换为数组
    //把类数组中的每一项“克隆”一份给数组
    let newAry = [].slice.call(arguments);//=>前提是我们改变的THIS是一个和数组类似的结构(有索引有LENGTH)
    newAry.sort(function (a, b) {
        return a - b;
    });
    newAry.pop();
    newAry.shift();
    //=>EVAL:把一个字符串变为JS表达式执行
    return eval(newAry.join('+')) / newAry.length;
};
let score = fn(100, 85, 60, 89, 95, 92, 73);
console.log(score);
*/

//=>重写SLICE方法实现数组克隆(内置SLICE实现克隆和我们自己的写法是一样的,也是基于这种思想完成)
/*Array.prototype.my_slice = function () {
    //=>THIS:当前要克隆的数组ARY
    /!*
     * 内置SLICE实现克隆的代码
     *!/
    let newAry = [];
    for (let i = 0; i < this.length; i++) {
        newAry.push(this[i]);
    }
    /!*
     * 把ARG类数组转换为数组
     * let newAry = [];
        for (let i = 0; i < arguments.length; i++) {
            newAry.push(arguments[i]);
        }
       如果我能把内置的SLICE方法执行，但是让方法中的THIS变为ARG,等价于把ARG转换为数组（把类数组转换为数组）
        =>Array.prototype.slice.call(arguments)
        =>[].slice.call(arguments)
     *!/
    return newAry;
};
let ary = [85, 89, 95, 92, 73];
ary.my_slice();*/

/*
let fn = function () {
    let arg = arguments;
    [].sort.call(arg, function (a, b) {
        return a - b;
    });
    [].pop.call(arg);
    [].shift.call(arg);
    return eval([].join.call(arg, '+')) / arg.length;
};
let score = fn(100, 85, 60, 89, 95, 92, 73);
console.log(score);
*/

/*
let fn = function () {
    let arg = arguments;
    arg.__proto__ = Array.prototype;
    //=>在IE浏览器中屏蔽开发者使用__proto__

    arg.sort(function (a, b) {
        return a - b;
    });
    arg.pop();
    arg.shift();
    return eval(arg.join('+')) / arg.length;
};
let score = fn(100, 85, 60, 89, 95, 92, 73);
console.log(score);
*/
