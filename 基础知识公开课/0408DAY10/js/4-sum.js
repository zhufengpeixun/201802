/*
 * 任意数求和：执行SUM方法，不管传递多少信息值，我们都可以实现求和
 */
function sum() {
    //1.函数执行传递实参的数量和值的类型都是不确定的 =>arguments实参集合（类数组，每一个索引对应传递进来的实参信息）
    //2.遍历ARG中的每一项,得到一项就进行累加操作即可（注意：如果当前传递的值不是数字，我们需要先转换为数字，转换为数字后如果不是有效数字，我们则不进行累加操作）
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        var item = parseFloat(arguments[i]);//=>把每一项的实参值先转换为NUMBER类型
        if (isNaN(item)) {
            //=>如果转换为的数字不是有效数字,直接进入下一次循环,不再执行累加操作即可
            continue;
        }
        total += item;
    }
    return total;
}

console.log(sum(1, 2, '3', '4px', 'AA', 5));//=>15