/*
 * 变量提升
 *   var a;
 *   b = aaafff000;
 */

/*
var a = 4;
function b(x, y, a) {
    /!*
     * 形参赋值：x=1 y=2 a=3
     * 变量提升
     *!/
    //=>arguments：函数内置的实参集合，不管是否设置形参，传递的实参值在这个集合中都存在
    /!*
     * arguments
     * {
     *   0:1
     *   1:2
     *   2:3
     *   length:3
     *   callee:函数本身
     *   ...
     * }
     *!/
    /!*
     * 在JS非严格模式下，函数中的形参变量和ARGUMENTS存在映射机制(映射：相互之间影响)
     *  第一个形参变量值修改为100，那么ARG[0]的值也跟着修改为100
     *  ARG[1]的值修改为200，那么第二个形参变量Y的值也会跟着变为200
     *  ...
     *!/

    console.log(a); //=>3
    arguments[2] = 10;//=>把传递的第三个实参值修改为10,此时第三个形参变量a也会受到影响
    console.log(a);//=>10
}
a = b(1, 2, 3);//=>a=b执行的结果  =>a=undefined [b函数中并没有编写return，所以默认函数的返回值是undefined]
console.log(a);
*/

/*
function fn(x, y) {
    /!*
     * 形参
     *   x=10
     *   y=undefined  y也是私有变量,不是没赋值,而是赋值为undefined
     *
     * ARG
     *   0:10
     *   length:1
     *
     * ARG和形参之间的映射是以ARG的索引为基础完成的，ARG中有这个索引，浏览器会完成和对应形参变量中的映射机制搭建，如果形参比ARG中个数多，那么多出来的形参是无法和ARG中对应的索引建立关联的
     *!/
    var arg = arguments;
    arg[0] = 100;
    console.log(x);//=>100
    y = 200;
    console.log(arg[1]);//=>undefined
}
fn(10);*/

/*
function fn(x, y) {
    var arg = arguments;
    /!*
     * x=10 y=undefined
     *
     * ARG
     *  0:10
     *  length:1
     *!/
    // y = 200;
    // console.log(arg[1]);//=>undefined

    arg[1] = 300;
    /!*
     * ARG
     *  0:10,
     *  1:300,
     *  length:2
     *!/
    console.log(y);
    y=400;
    console.log(arg[1]);

    //=>ARGUMENTS和形参的映射机制建立在函数执行后形参赋值的一瞬间，此时能建立映射机制的建立映射机制，不能建立起来的，以后不管怎么操作都无法再建立了
}
fn(10);
*/

//=>JS严格模式
//> 在当前作用域的“第一行”添加 "use strict" 即可，这样在当前作用域中就开启了JS的严格模式

/*--us [TAB]--*/
// "use strict";//=>整个JS都开启了严格模式（只对当前这个JS文件中的代码生效，下一个JS文件需要开启严格模式，第一行还需要再次编写），真实项目中，我们一般都会把所有JS文件合并压缩为一个导入到页面中

/*function fn() {
    // "use strict";//=>只在当前作用域中使用严格模式
}*/

~function () {
    "use strict";
    //...
}();















