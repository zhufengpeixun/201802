//=>只对等号左边进行变量提升（等号右边是值，是不进行变量提升的 =>推理出函数RETURN后面的也是值，也是不需要变量提升的）
/*
fn();//=>Uncaught TypeError: fn is not a function 这种创建模式,在变量提升阶段只是声明了FN没有赋值，此时的FN是UNDEFINED
sum();//=>2
var fn = function () {
    console.log(1);
};
function sum() {
    console.log(2);
}
fn();//=>1
sum();//=>2*/

/*
var fn = function sum() {
    console.log(1, sum);//=>匿名函数起的名字只能在函数里面使用
};
fn();//=>1
sum();//=>Uncaught ReferenceError: sum is not defined 给匿名函数设置名字其实没有实际的用途，因为在函数外面是无法获取这个函数名的
*/

//=>不管条件是否成立，都要进行变量提升
//1.VAR还是只声明
//2.条件中的FUNCTION在变量提升阶段也是只声明，当代码执行，如果条件成立，进入条件后的第一件事情，就是把函数定义了，然后再执行判断题中的代码
//3.在老版本浏览器中，机制很简单：不管条件是否成立，都会进行变量提升，但是FUNCTION声明+定义都完成了
/*
 * 变量提升
 *   var a;
 *   function fn;
 */
/*
console.log(a,fn);//=>undefined undefined
if (1 === 1) {
    console.log(a,fn);//=>undefined  fn（条件成立进入后的第一件事是立即把函数定义赋值了）
    var a = 12;
    function fn() {
        console.log(1);
    }
}
*/

//=>案例二：
/*var f=function () {return true;};
var g=function () {return false;};
~function () {
    /!*
     * 变量提升：
     *    function g; （新版本下的处理）
     *    function g=aaafff000; (老版本下的处理)
     *!/
    if([]==![] && g()){//=>Uncaught TypeError: g is not a function
        f=function () {return false;};
        function g(){return true;};
    }
}();
console.log(f());
console.log(g());*/


//=>3：当名字重复的时候（函数名其实也是变量名 var fn / function fn 这两个是一个fn）变量提升阶段（以及代码执行阶段），不会重复声明，但是会重新赋值
/*
 * 变量提升
 *   fn = aaafff000
 *   //var fn ：fn已经声明过了,不需要重新的声明（变量提升阶段并没有处理fn=10，这个步骤需要在执行的时候处理）
 *      = aaafff111
 */
/*fn();//=>2
function fn(){console.log(1);}
fn();//=>2
var fn=10;//=>fn=10
fn();//=>Error：fn is not a function
function fn(){console.log(2);}
fn();*/





