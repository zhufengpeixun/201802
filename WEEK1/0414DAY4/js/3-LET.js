//=>创建变量的方式
//1. var function
//2. let const
//3. import class

/*
 * 1. ES6中基于LET/CONST创建的变量是不支持变量提升的（我们不可以在创建变量之前使用这些变量，让JS语法更加的严谨）
 * 2.基于LET和基于VAR创建变量，在私有变量和作用域链机制上是一样的
 * 3.现有项目中是ES5 & ES6混合开发模式，如果当前变量是基于LET创建的，就按照ES6的新语法机制渲染，否则按照ES5的老语法机制渲染
 * 4.基于LET创建，不允许声明已有的变量（不管这个变量是基于什么创建的）
 *   并且重复检测操作是发生在代码执行之前的，ES6中虽然没有变量提升机制，但是代码语法检测这个操作还是有的，在语法检测阶段发现不符合ES6语法规划直接抛出异常，浏览器不再执行任何的代码
 */
/*console.log(a);//=>Uncaught ReferenceError: a is not defined
let a = 12;*/

/*
let a = 10,
    b = 10,
    c = 10;
let fn = (a) => {//=>ES6箭头函数
    let b = a = c = 100;
};
fn(20);
console.log(a, b, c);//=>10/10/100*/

/*var a=12;
console.log(a);
let a=13;//=>Uncaught SyntaxError: Identifier 'a' has already been declared
console.log(a);*/

/*
// console.log(fn);//=>Uncaught ReferenceError: fn is not defined
if (1 === 1) {
    // console.log(fn);//=>Uncaught ReferenceError: fn is not defined
    let fn = function () {
        console.log(1);
    };
    console.log(fn);//=>fn 是当前判断体块级作用域中私有的
}
console.log(fn);//=>Uncaught ReferenceError: fn is not defined 基于LET创建的变量存储块级作用域（类似于函数执行形成的私有作用域 =>一般来说基本上所有的{}都会形成块级作用域）
*/