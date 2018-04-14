//=>变量提升：在当前作用域形成后，JS代码自上而下执行之前，浏览器首先会把所有带VAR和FUNCTION关键字的进行提前的声明或者定义
//=>声明（declare）：var a / function fn （告诉当前作用域有啥）；只是声明没有赋值的话，默认值是undefined
//=>定义（defined）：a=12 / fn(){...} （给声明的变量赋值）
//=>带VAR的在变量提升阶段只是声明，带FUNCTION声明和定义在变量提升阶段都完成了
/*/!*
 * 变量提升：var a;
 *!/
console.log(a);//=>undefined
var a = 12;//=>此处不需要再重复声明VAR A;只需要给A赋值即可 =>a=12
console.log(a);//=>12*/

//=>案例一：
/*console.log(a, b, c);//=>undefined * 3
var a = 10,
    b = 10,
    c = 10;

function fn(a) {
    console.log(a, b, c);//=>10 undefined 10
    var b = a = c = 100;
    console.log(a, b, c);//=>100 * 3
}

fn(10, 20);
console.log(a, b, c);//=>10 10 100*/


/*
 var a = 10,
    b = 10,
    c = 10;

 =>var a=10;  var b=10;  var c=10;

 var a=b=c=100;
 =>var a=100;  b=100;  c=100; （只有A带VAR声明，其余的都没有）
*/

//=>所有的定义赋值操作都是先准备值，然后再赋值的
/*var n = m = [12, 23];
/!*
 * 1. var n;
 * 2. 准备值(AAAFFF222)
 * 3. n=AAAFFF222
 *    m=AAAFFF222
 *!/*/

/*var n=[12,23];
/!*
 * 1. 声明N
 * 2. 准备值（开辟一个堆内存，存储键值对，有一个16进制地址）
 * 3. 赋值（把16进制地址赋值给N：N=AAAFFF111）
 *!/*/


//=>案例二：
/*
 * 变量提升：
 *    var a;
 *    var b;
 *    fn = aaafff000;
 */
/*var a = 10,
    b = 10;
function fn(a) {
    /!*
     * 形参赋值：a=10
     * 变量提升：var b;
     *!/
    //console.log(a, b, c);//=>Uncaught ReferenceError: c is not defined
    a *= 2;//=>a=20
    var b = a;//=>b=20
    b++;//=>b=21
    c = b;//=>给全局作用域中设置一个C
    console.log(a, b, c);//=>20/21/21
}
a = fn(a);//=>把FN执行，把全局变量A的值作为实参传递给函数的形参，接收函数的返回结果，用结果替换原有全局变量A的值  a=fn(10)
//=> 想要知道函数的返回值，只需要看函数中是否有RETURN，有的话，RETURN是啥返回结果就是啥，没有默认返回UNDEFINED  a=undefined
console.log(a, b, c);//=>undefined/10/21*/


//=>案例三：
var ary = [12, 23];
function fn(ary) {
    console.log(ary);
    ary[0]=34;
    ary=[34];
    ary[0]=45;
    console.log(ary);
}
fn(ary);
console.log(ary);




