/*
 * 1.带VAR和FUNCTION关键字声明相同的名字，这种也算是重名了（其实是一个FN，只是存储值的类型不一样）
 */
/*
var fn = 12;
function fn() {

}
*/

/*
 * 2.关于重名的处理：如果名字重复了，不会重新的声明，但是会重新的定义（重新赋值）[不管是变量提升还是代码执行阶段皆是如此]
 */

/*
 * 变量提升：
 *   fn = ...（1）
 *      = ...（2）
 *      = ...（3）
 *      = ...（4）
 */
/*
fn();//=>4
function fn() {console.log(1);}
fn();//=>4
function fn() {console.log(2);}
fn();//=>4
var fn=100;//=>带VAR的在提升阶段只把声明处理了,赋值操作没有处理,所以在代码执行的时候需要完成赋值 FN=100
fn();//=>100() Uncaught TypeError: fn is not a function
function fn() {console.log(3);}
fn();
function fn() {console.log(4);}
fn();
*/










