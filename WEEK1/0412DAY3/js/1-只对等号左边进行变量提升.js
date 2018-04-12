/*
 * 变量提升：
 *   var fn;   =>只对等号左边进行变量提升
 *   sum = AAAFFF111;
 */
sum();
fn();//=>Uncaught TypeError: fn is not a function

//=>匿名函数之函数表达式
var fn = function () {
    console.log(1);
};//=>代码执行到此处会把函数值赋值给FN

fn();

//=>普通的函数
function sum() {
    console.log(2);
}

