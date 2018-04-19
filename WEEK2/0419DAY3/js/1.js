/*
 * 用来改变某一个函数中THIS关键字指向的
 *  call
 *  apply
 *  bind
 */
window.name = '珠峰';
let fn = function () {
    console.log(this.name);
};
let obj = {
    name: "OBJ",
    fn: fn
};
let oo = {name: "OO"};
// fn();//=>this:window "珠峰"
// obj.fn();//=>this:obj "OBJ"

/*
 * call
 *  1. [fn].call([this],[param]...)
 *   fn.call：当前实例(函数FN)通过原型链的查找机制，找到Function.prototype上的call方法  =>function call(){[native code]}
 *   fn.call()：把找到的call方法执行
 *
 *   当call方法执行的时候，内部处理了一些事情
 *    =>首先把要操作函数中的THIS关键字变为CALL方法第一个传递的实参值
 *    =>把CALL方法第二个及第二个以后的实参获取到
 *    =>把要操作的函数执行，并且把第二个以后的传递进来的实参传给函数
 */
// fn.call(oo);//=>this:oo
// fn.call(obj,10,20,30);//=>this:obj

/*Function.prototype.call = function () {
    let param1 = arguments[0],
        paramOther = [];//=>把ARG中除了第一个以外的实参获取到

    //=>this:fn 当前要操作的函数(函数类的一个实例)
    //把FN中的THIS关键字修改为PARAM1 =>把THIS(CALL中)中的this关键字修改为param1

    //=>把fn执行，把paramOther分别传递给fn
    // this(paramOther)  =>fn(paramOther)
};
fn.call({name:'xx'})
sum.call({..})
*/


let sum=function(a,b){
    console.log(this);//=>opt
};
let opt={n:20};

// sum.call(opt,20,30);//=>call执行 call中的this是sum  把this(call中的)中的“this关键字”改为opt 把this(call中的)执行，把20,30分别传递给它 //=>sum中this:opt  a=20 b=30

sum.call.call(opt)
//1.sum.call 找到Function.prototype上的call方法(也是一个函数，也是函数类的一个实例，也可以继续调用call/apply等方法)  =>A（函数）
//2.A.call(opt)  继续找到原型上的call方法，把call方法执行：把A中的this关键字修改为opt，然后把A执行













