/*
 * 1、形成一个全局作用域（栈内存）
 * 2、代码自上而下执行
 *   1.首先开辟一个新的堆内存(AAAFFF111)，把键值对存储到堆内存中
 *     n:10
 *     m:obj.n*10 =>obj.n 此时堆内存信息还没有存储完成,空间的地址还没有给obj，此时的obj是undefined，obj.n<=>undefined.n
 */
/*
var obj = {
    n: 10,
    m: obj.n * 10 //=>Uncaught TypeError: Cannot read property 'n' of undefined
};
console.log(obj.m);
*/
var obj = {
    n: 10
};
obj.m = obj.n * 10;
console.log(obj.m);//=>100
