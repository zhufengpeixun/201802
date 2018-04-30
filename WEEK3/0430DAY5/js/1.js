/*
 * 正则捕获：把一个字符串中和正则匹配的部分获取到
 *   [正则]
 *     exec
 *     test
 *
 *   [字符串]
 *     replace
 *     split
 *     match
 *     ...
 */

/*
 * 基于EXEC可以实现正则的捕获
 *   1.如果当前正则和字符串不匹配，捕获的结果是NULL
 *   2.如果匹配，捕获的结果是一个数组
 *     0:大正则捕获的内容
 *     index:正则捕获的起始索引
 *     input:原始操作的字符串
 *     ...
 *   3.执行一次EXEC只能捕获到第一个和正则匹配的内容，其余匹配的内容还没有捕获到，而且更恶心的是，我傻傻的执行多次，然而并没啥卵用 =>“正则的捕获有懒惰性”：只能捕获到第一个匹配的内容，剩余的默认捕获不到
 */
// let str = 'zhufeng2018peixun2019';
// let reg = /\d+/;

// console.log(reg.exec('zhufengpeixun'));//=>null
// console.log(reg.exec(str));//=>['2018',index:7,input:...]

//=>LAST-INDEX不变导致了正则捕获的懒惰性
// console.log(reg.lastIndex);//=>0 正则捕获时候，下一次在字符串中开始查找的索引
// console.log(reg.exec(str));//=>['2018']
// console.log(reg.lastIndex);//=>0
// console.log(reg.exec(str));//=>['2018']

//=>即使我们手动修改了LAST-INDEX，然而还是没啥卵用
// console.log(reg.exec(str));//=>['2018']
// reg.lastIndex = 11;
// console.log(reg.lastIndex);
// console.log(reg.exec(str));//=>['2018']

//=>解决正则捕获的懒惰性，我们需要加全局修饰符G（这个是唯一的方案，而且不加G不管用什么办法捕获，也都不能把全部匹配的捕获到）
// let str = 'zhufeng2018peixun2019';
// let reg = /\d+/g;
// console.log(reg.lastIndex);//=>0
// console.log(reg.exec(str));//=>['2018']
// console.log(reg.lastIndex);//=>11
// console.log(reg.exec(str));//=>['2019']
// console.log(reg.lastIndex);//=>21
// console.log(reg.exec(str));//=>null
// console.log(reg.lastIndex);//=>0
// console.log(reg.exec(str));//=>['2018']
// //...


// let str = 'zhufeng2018peixun2019yangfan2020qihang2021';
// let reg = /\d+/g;
/*RegExp.prototype.myExecAll = function (str) {
    //=>this:reg 当前操作的正则
    //=>str:我们要捕获的字符串
    //=>执行EXEC开始捕获，具体捕获多少次不定，但是一直到捕获不到内容(NULL)为止，期间把捕获到的内容存储到数组中即可
    //=>为了防止出现死循环：我们检测一下正则是否加G，没有加G只把第一次捕获的结果返回即可
    if (!this.global) {
        return this.exec(str);
    }
    let result = [],
        valAry = this.exec(str);
    while (valAry) {//=>this.lastIndex < str.length
        result.push(valAry[0]);//=>把每一次正则捕获到的结果第一项(具体捕获的内容)存储到容器中
        valAry = this.exec(str);
    }
    return result;
};*/
// console.log(reg.myExecAll(str));
// console.log(str.match(reg));//=>MATCH实现了我们自己编写的EXEC-ALL处理的事情，正则不加G返回第一个匹配的即可，加了G，把所有匹配的内容都捕获到，最后统一存储到一个数组中返回







