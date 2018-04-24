/*
 * 变量提升
 *   var a;
 *   fun = xxxfff000;
 */
// var a = 0;
// function fun() {
//     /*
//      * 形参赋值
//      * 变量提升
//      *   var a;
//      */
//     alert(a);//=>undefined
//     var a = 10;
// }
// fun();
// alert(a);//=>0

let a = 0,
    b = 0;
function A(a) {
    A = function (b) {
        alert(a + b++);
    };
    alert(a++);
}
A(1);
A(2);