/*
 * 任意数求和：不管函数执行的时候，传递多少实参值进来，我们都可以求和
 *
 * 形参有局限性：我们需要具体的知道用户执行的时候传递实参数量、顺序等，才可以使用形参变量定义对应的入口
 *
 * arguments：函数内置的实参集合（内置：函数天生就存在的机制，不管你是否设置了形参，也不管你是否传递了实参，ARGUMENTS都有，始终存在）
 */

/*
function sum(n, m) {
    console.log(arguments);
    /!*
     * ARG它是一个类数组(不是数组,不能直接使用数组中的方法)
     *
     * 即使设置形参变量,形参该是什么值还是什么值,但是ARG使用存储的是“所有”传递进来的实参，所以它被称为“实参集合”
     *
     * {
     *   0:10,
     *   1:20,
     *   length:2,
     *   callee:存储的是当前函数本身  arguments.callee===sum:true
     * }
     *!/
}
sum(10, 20);
*/

/*
 * 把ARG中存储的实参值依次遍历,每遍历一个都累加起来,最后实现任意数求和
 */

/*
//=>基础版
function sum() {
    var total = null;
    for (var i = 0; i < arguments.length; i++) {
        var item = arguments[i];//=>每一次遍历出来的实参值
        total += item;
    }
    return total;//=>把计算的结果返回
}
console.log(sum(10));
*/

//=>升级版：在累加的时候，把字符串转换为数字，对于一些非有效数字，不在相加
function sum() {
    var total = null;
    for (var i = 0; i < arguments.length; i++) {
        var item = arguments[i];//=>10 '20' 'AA'
        //1.不管ITEM获取的是传递的啥,都先转换为数字类型
        item = Number(item);
        //2.如果当前的值是有效数字我们才累加,非有效数字直接跳过即可
        isNaN(item) ? null : total += item;
    }
    return total;
}

console.log(sum(10, '20', 'AA'));//=>30