/*
 * Function.prototype
 *   call
 *   apply
 *   bind
 *
 * 这三个方法都是用来改变函数中THIS指向的(所有的函数[普通函数/内置类/自定义类]都可以使用这三个方法,因为它们都是FUNCTION这个内置类的实例)
 */
let fn = function (x, y) {
    console.log(this, x, y);
};
let obj = {fn: fn};
// fn(10, 20);//=>this:window x:10 y:20
// obj.fn(10, 20);//=>this:obj x:10 y:20

fn.call(obj, 10, 20);//=>this:obj x:10 y:20
//=>把FN执行,让FN中的THIS指向第一个参数OBJ,并且把10/20传给FN的两个形参
/*
 * CALL是浏览器内置的方法（FUNCTION.PROTOTYPE.CALL=FUNCTION...）
 *   fn.call：fn通过__proto__找到Function原型上的call方法  =>ƒ call() { [native code] }
 *
 *   fn.call()：把找到的call方法执行，在内置call方法执行的时候，做了一些事情，这些事情就是call的作用
 *    1.把fn中的this改成了第一个传递给call方法的实参值
 *    2.把fn执行，并且把传递给call方法的其余实参值传递给fn
 */

//=>my_call实现和内置call类似的功能
Function.prototype.my_call = function (context, ...arg) {
    //=>...arg:存储除了第一个参数以外剩下传递进来的参数值 [10,20,30]
    //=>context:obj

    //=>my_call方法中的this就是我们要处理的那个函数（fn/sum...）
    this.toString().replace('this', context);
    this(...arg);
};
fn.my_call(obj, 10, 20, 30);
// sum.my_call(obj);













