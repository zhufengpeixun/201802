/*
function fn(n, m) {
    var total = 0;//=>total:私有变量
    total = n + m;
}
fn(10, 20);
console.log(total);//=>Uncaught ReferenceError: total is not defined TOTAL是私有变量,我们无法在函数的外面直接获取这个值(闭包)
*/

/*
/!*
 * 函数的入口：形参
 * 函数的出口：返回值  return
 *    把函数运行的结果(或者函数体中的部分信息)拿到函数外面去使用
 *!/
function fn(n, m) {
    var total = 0;
    total = n + m;
    return total;//=>并不是把TOTAL变量返回,返回的是变量存储的值,RETURN返回的永远是一个值
}

// fn =>代表的是函数本身
// fn(10, 20) =>代表的是函数执行(不仅如此,它代表的是函数执行后,返回的结果 [RETURN返回的值] )
// console.log(fn(1, 2));//=>3
var result = fn(1, 2);
console.log(result);//=>3
*/

/*
function fn(n, m) {
    var total = 0;
    total = n + m;
    return;
}

var res = fn(100, 200);//=>如果当前函数没有RETURN结果出来（或者RETURN; 啥也没返回），函数执行在外面拿到的结果都是 UNDEFINED
console.log(res);
*/

/*
function fn(n, m) {
//=>如果n/m有一个没有传递值，我们返回零
if (n === undefined || m === undefined) {
    return 0;//=>RETURN还有一个作用：类似于循环中的BREAK，能够强制结束函数体中代码的执行(RETURN后面的代码不在执行)
}

var total = 0;
total = n + m;
return total;
}

console.log(fn(10));//=>n=10 m=undefined
*/

// n === undefined 经常这样判断n的值是否为undefined，这种方式可以
// n==undefined 这种模式不好,因为null==undefined也是相等的(===比较才不相等)
// typeof n=='undefined' 真实项目中开发者更喜欢这种判断模式

// total=0; 0是有值的,值是0,从内存方面来说，会在栈内存中占一个位置
// total=null;  开发者更喜欢用null来作为初始值,null是空对象指针，是不占内存位置的