"use strict";

let fn = function (a, b) {
    console.log(this);
};
let obj = {name: "OBJ"};

// document.onclick = fn;//=>把FN绑定给点击事件，点击的时候执行FN
// document.onclick = fn();//=>在绑定的时候,先把FN执行,把执行的返回值(UNDEFINED)绑定给事件,当点击的时候执行的是undefined

//=>需求：点击的时候执行FN，让FN中的THIS是OBJ
// document.onclick = fn;//=>this:document
// document.onclick = fn.call(obj);//=>虽然this确实改为obj了，但是绑定的时候就把fn执行了(call是立即执行函数)，点击的时候执行的是fn的返回值undefined
// document.onclick = fn.bind(obj);//=>bind属于把fn中的this预处理为obj，此时fn没有执行，当点击的时候才会把fn执行

/*
 * CALL中的细节
 *   1.非严格模式下，如果参数不传，或者第一个传递的是null/undefined，THIS都指向WINDOW
 *   2.在严格模式下，第一个参数是谁，THIS就指向谁（包括null/undefined），不传THIS是undefined
 */
// fn.call(obj, 10, 20);//=>this:obj a=10 b=20
// fn.call(10, 20);//=>this:10 a=20 b=undefined
// fn.call();//=>this:window a=undefined b=undefined
// fn.call(null);//=>this:window
// fn.call(undefined);//=>this:window

/*
 * apply：和call基本上一模一样，唯一区别在于传参方式
 *   fn.call(obj,10,20)
 *   fn.apply(obj,[10,20]) APPLY把需要传递给FN的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给FN一个个的传递
 */

/*
 * bind：语法和call一模一样，唯一的区别在于立即执行还是等待执行
 *   fn.call(obj,10,20) 改变FN中的THIS,并且把FN立即执行
 *   fn.bind(obj,10,20) 改变FN中的THIS,此时的FN并没有执行（不兼容IE6~8）
 */