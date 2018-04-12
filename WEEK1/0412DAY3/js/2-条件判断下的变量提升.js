/*
 * 在当前作用域下，不管条件是否成立都要进行变量提升
 *   =>带VAR的还是只声明
 *   =>带FUNCTION的在老版本浏览器渲染机制下，声明和定义都处理，但是为了迎合ES6中的块级作用域，新版浏览器对于函数（在条件判断中的函数），不管条件是否成立，都只是先声明，没有定义，类似于VAR
 */
/*
/!*
 * 变量提升
 *   var a;  =>在全局作用域下声明的全局变量也相当于给WIN设置了一个属性 window.a=undefined
 *!/
console.log(a);//=>undefined
if ('a' in window) {
    var a = 100;
}
console.log(a);//=>100
*/

/*
 * 变量提升：无
 */
f = function () {return true;};//=>window.f=...（TRUE）
g = function () {return false;};//=>window.g=...（FALSE）
~function () {
    /*
     * 变量提升：
     *   function g;  //=>g是私有变量
     */
    if (g() && [] == ![]) {//=>Uncaught TypeError: g is not a function （此时的g是undefined）
        //=>[]==![]：TRUE
        f = function () {return false;};//=>把全局中的f进行修改 window.f=...（FALSE）
        function g() {return true;}
    }
}();
console.log(f());
console.log(g());