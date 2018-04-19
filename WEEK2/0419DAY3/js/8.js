/*let fn = function () {
    // let ary = [...arguments];//=>把类数组转换为数组
    let ary = Array.from(arguments);//=>把类数组转换为数组
    ary.sort(function (a, b) {
        return a - b;
    }).pop();
    ary.shift();
    return (eval(ary.join('+')) / ary.length).toFixed(2);
};*/
let fn = function (...ary) {
    ary.sort(function (a, b) {
        return a - b;
    }).pop();
    ary.shift();
    return (eval(ary.join('+')) / ary.length).toFixed(2);
};
console.log(fn(10, 9.8, 9.5, 8.7, 8.8, 8, 9.2, 8.9));