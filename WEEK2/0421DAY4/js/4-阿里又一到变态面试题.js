/*Function.prototype.call = function (context, ...arg) {
    //=>my_call方法中的this就是我们要处理的那个函数（fn/sum...）
    this.toString().replace('this', context);
    this(...arg);
};*/
function fn1() {
    console.log(1);
}

function fn2() {
    console.log(2);
}

fn1.call(fn2);//=>1
/*
 * 执行CALL方法
 *   1.CALL方法中的THIS:FN1
 *   2.CALL方法中的CONTEXT:FN2
 */
fn1.call.call(fn2);//=>2
/*
 * 执行的是最后一个CALL方法
 *   1.THIS:FN1.CALL
 *   2.CONTEXT:FN2
 */
//=>第一次执行最后面的CALL,代码执行第一步
//FN1.CALL.toString().replace('this', FN2);
// FN1.CALL=function (context, ...arg) {
//     FN2.toString().replace('this', context);
//     FN2(...arg);
// };
//=>第一次执行最后面的CALL,代码执行第二步
//FN1.CALL();
/*
 *  第二次执行CALL方法
 *    CONTEXT='UNDEFINED'
 *    FN2.toString().replace('this', undefined);
 *    FN2();
 */