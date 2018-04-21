let fn = function (x, y) {
    console.log(this, x, y);
};
let obj = {fn: fn};
/*
fn.call(obj, 10, 20);//=>this:obj x:10 y:20
fn.apply(obj, [10, 20]);//=>this:obj x:10 y:20 APPLY和CALL的唯一区别在于：CALL是把需要传递给函数的参数一个个的传递，而APPLY是把这些值放到一个数组或者类数组中，但是也相当于一个个的传递给函数FN(语法不一样但是作用一模一样)
*/
// fn.bind(obj, 10, 20);//=>BIND和CALL的区别在于：CALL是立即把函数执行，BIND是当前不执行，等待条件符合再执行，属于预先处理机制（CALL是立即处理机制） BIND不兼容IE6~8


/*setTimeout(function () {
    console.log(1);
}, 1000);//=>设置一个定时器,把一个方法赋值给定时器,设定等待的时间,当到达时间后,把方法执行（1000MS）*/


//setTimeout(fn.call(obj, 10, 20), 1000);
//=>CALL是立即执行,在设置定时器的时候,就把FN执行了(此时也基于CALL改变了THIS),把FN执行的返回值赋值给定时器,1000MS后执行的是FN的返回值

setTimeout(fn.bind(obj, 10, 20), 1000);





