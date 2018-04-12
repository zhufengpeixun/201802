/*
 * 变量提升：
 *   function fn;
 */
// console.log(fn);//=>undefined
if (1 === 1) {
    console.log(fn);//=>函数本身：当条件成立，进入到判断体中（在ES6中它是一个块级作用域）第一件事并不是代码执行，而是类似于变量提升一样，先把FN声明和定义了，也就是判断体中代码执行之前，FN就已经赋值了
    function fn() {
        console.log('ok');
    }
}
// console.log(fn);//=>函数本身



