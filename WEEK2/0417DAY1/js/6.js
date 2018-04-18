/*
 * 变量提升
 *   var foo;
 */
var foo = 'hello';
(function (foo) {
    /*
     * 形参赋值：foo='hello'
     * 变量提升：var foo; (这一步省略：因为在私有作用域中已经有foo这个变量了，浏览器不会重新声明重复的变量)
     */
    console.log(foo);//=>'hello'
    var foo = foo || 'world';//=>'hello'||'world' =>foo='hello'
    console.log(foo);//=>'hello'
})(foo);//=>把全局下的FOO的值作为实参传递给函数的形参 =>"hello"
console.log(foo);//=>'hello'

//=>逻辑与&& 和 逻辑或||
//1.条件判断中使用它们
/*
if(1===1 && 2===2){
    //=>条件中的&&：两个条件都成立，整体判断条件才会成立
    //=>条件中的||：只要有一个条件成立，整体判断条件就成立
}
*/

//2.在赋值操作中,我们有时候也会用他们
/*
var a = 1 || 2;//=>首先验证1是真假，如果为真，把1赋值给a，如果为假，把2赋值给a =>"A||B":先验证A的真假,为真结果是A,为假结果是B
var b = 1 && 2;//=>"A&&B"：先验证A的真假,为真结果是B,为假结果是A
*/

/*
function fn(x) {
    //=>“给形参赋值默认值”：验证传递的参数值,如果没有传递实参,让其默认值为零

    // if(x===undefined){
    //     x=0;
    // }

    // if (typeof x === 'undefined') {
    //     x = 0;
    // }

    x = x || 0;//=>如果X没传递值,X=undefined =>x=undefined||0 =>这种赋值的方式没有上面IF判断严谨（IF这种是没传值才会赋值默认值，||这种是不传值或者传递的值是假，都让它等于零）
}

fn(false);
*/

/*
function fn(callback) {
    //=>如果传递的值是个函数,我们才让其执行
    // if(typeof callback==='function'){
    //     callback();
    // }

    callback && callback();//=>上面IF判断的简写版（不严谨）：默认callback要不然就传函数，要不然就不传
}
fn(function () {
});
*/

//3.逻辑与和逻辑或的混合应用模式
//优先级：逻辑与的优先级高于逻辑或
// console.log(0 || 1 && 2 || 0 || 3 && 2 || 1);

//4.逻辑或的实战应用：形参赋值默认值（初始化形参）
/*
//在ES6新语法规范中可以直接给形参设置默认值
function fn(x = 0) {
    //=>如果X没有传递值,默认值是零,一旦传递值,不管传递的是啥,都是按照传递的值处理的
    console.log(x);
}
fn();//=>0
fn(null);//=>null
fn(undefined);//=>0 传递undefined，浏览器也是按照没有传递值处理的
*/