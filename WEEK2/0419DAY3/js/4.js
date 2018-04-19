/*
 * 需求一：获取数组中的最大值(最小值)
 *   1.给数组先排序(由大到小排序),第一项就是最大值
 *   2.假设法:假设第一个值是最大值,依次遍历数组中后面的每一项,和假设的值进行比较,如果比假设的值要大,把当前项赋值给MAX...
 *   3.基于Math.max完成
 */
let ary = [12, 13, 14, 23, 24, 13, 15, 12];

//=>Math.max
// console.log(Math.max(ary));//=>NaN =>Math.max是获取一堆数中的最大值,需要我们把比较的数,一个个的传递给这个方法 =>Math.max(12,13,14...) =>Math.max([12,13,14...])这样只是传递一个值
/*
[12,13,14].toString() =>"12,13,14"
eval("12,13,14") =>14

   1.eval：把字符串转换为JS表达式
    eval("1+2") =>3

   2.括号表达式（小括号的应用）
    用小括号包起来，里面有很多项（每一项用逗号分隔），最后只获取最后一项的内容（但是会把其它的项也都过一遍）
    (function(){
        console.log(1);
    },function(){
        console.log(2);
    })();
    =>2

    let a=1===1?(12,23,14):null;
    =>a=14

   不建议大家过多使用括号表达式，因为会改变THIS
*/
/*let fn=function(){console.log(this);}
let obj={fn:fn};
(fn,obj.fn)();//=>执行的是第二个OBJ.FN，但是方法中的THIS是WINDOW而不是OBJ
(obj.fn)();//=>this:obj*/

//=>基于EVAL转换字符串为JS表达式
// console.log(eval("Math.max(" + ary.toString() + ")"));

//=>利用了APPLY的一个特征：虽然放的是一个数组，但是执行方法的时候，也是把数组中的每一项一个个的传递给函数
// console.log(Math.max.apply(null, ary));

//=>排序
/*
let max = ary.sort(function (a, b) {
    return b - a;
})[0];
console.log(max);
*/

//=>假设法
/*
let max = ary[0];
for (let i = 1; i < ary.length; i++) {
    let item = ary[i];
    item > max ? max = item : null;
}
console.log(max);
*/




