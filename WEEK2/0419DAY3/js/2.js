/*
Function.prototype.call=function callAA(){
    //=>1.把THIS(FN)中的"THIS关键字"修改为第一个参数值(OBJ)
    //=>2.把THIS(FN)执行,把第二个及以后接受的参数值传递给函数(10,20)
    //this(10,20)
};
fn.call(obj,10,20)
*/
function fn1(){console.log(1);}
function fn2(){console.log(2);}
fn1.call(fn2);//=>找到CALL-AA把它执行,CALL-AA中的THIS是FN1,第一个参数传递的是FN2  =>在CALL-AA中执行的是FN1 =>1

fn1.call.call(fn2);//=>找到CALL-AA让它执行,CALL-AA中的THIS是FN1.CALL,第一个参数是FN2  (把FN1.CALL中的THIS变为FN2，再让FN1.CALL执行  =>先找到CALL-AA，把它执行，只不过此时它中的THIS是FN2 =>让FN2中的THIS变为UNDEFINED，因为执行FN1.CALL的时候没有传递参数值，然后让FN2执行)  =>2

Function.prototype.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是Function.prototype =>让F.P中的THIS变为FN1,然后让F.P执行,F.P是一个匿名函数也是一个空函数，执行没有任何的输出

Function.prototype.call.call(fn1);//=>先找到CALL-AA把它执行，它中的THIS是F.P.CALL =>把F.P.CALL中的THIS修改为FN1,让F.P.CALL执行  =>F.P.CALL(CALL-AA)第二次把它执行(此时它里面的THIS已经是FN1) =>这一次其实在CALL-AA中是让FN1执行 =>1
//<==> fn1.call.call(fn2)
//<==> fn1.call===Function.prototype.call ：true

fn1.call.call.call.call.call(fn2);
//=>fn1.call.call.call.call===Function.prototype.call