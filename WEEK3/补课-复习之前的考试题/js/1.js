/*
 * 变量提升
 *   var m;  =>基于VAR声明全局变量，也相当于给WINDOW设置了一个属性 =>window.m=undefined (ES6中基于LET声明的全局变量和WINDOW没啥关系)
 */
// if ('m' in window) {
//     var m = m && 12;//=>m=undefined && 12;
// }
// console.log(m);//=>undefined

// //=>所有的JS代码执行之前，浏览器都会进行词法检测和分析，其中有一件事情就是查看当前变量是基于哪种规范声明的
// let n = 10;//=>window.n =>window下没有n这个属性
// if (!('n' in window)) {
//     /*
//      * 词法分析(不是提前声明)
//      *   let n
//      *     1)当前变量n是块级作用域的私有变量
//      *     2)n是基于ES6规范创建的(不会提前进行变量提升)
//      */
//     //1.LET会产生块级私有作用域
//     let n = n + 30; //=>let n=13; 赋值操作是先准备值，然后再声明变量，再给变量赋值 （n是基于ES6规范创建的，在当前操作中，先处理n+30，然后在声明n，然后再赋值，但是n+30的时候，此时块级作用域中的n还没有声明，所以直接报错）=>Uncaught ReferenceError: n is not defined
// }
// console.log(n);

// let n = 10,
//     m = 20;
// ~function (n, m) {
//     /*
//      * 形参赋值
//      *   n=20 m=undefined [私]  ARG:[0:20,length:1]
//      *
//      *   非严格模式下，形参和ARG存在映射机制
//      *     n -> arg[0]
//      *     m -> arg[1] 此时ARG中没有第二项,所以m无法个ARG建立映射
//      */
//     let arg = arguments;
//     arg[0] = n || 100;
//     arg[1] = m || 200;  //=>ARG:[0:20,1:200...] 即使加了一个索引,和M也没有关系，因为开始的时候并没有构建出映射机制
//     console.log(n, m);//=>20/undefined
// }(m);//=>把全局下m的值赋值给私有变量n
// console.log(n, m);//=>10/20


let ary = [12, 23, 34, 45];
//=>ary=aaafff000
/*
 {
   0:12
   1:23
   2:34
   3:45 （删除）
   length:4 （3）
   __proto__:Array.prototype
 }
 */
(function (ary) {
    /*
     * 形参赋值
     *   ary = aaafff000   [私]  此处的ARY是私有变量,外面的是全局变量,本身没关系,但是我们把全局ARY对应的空间地址赋值给私有的了,此时两者都指向同一个空间
     */
    ary.pop();
    ary = ary.slice(0);//=>把原有的数组(堆内存)克隆一份一模一样新的
    //ary=bbbfff000 此时私有的ARY指向不同的堆内存，再次操作和全局ARY就毫无关系了
    /*
     0:12 （删）
     1:23
     2:34
     length:3 (2)
     */
    ary.shift();
    console.log(ary); //=>[23,34]
})(ary);//=>把全局ARY的值(空间地址)赋值给私有形参ARY
console.log(ary);//=>[12,23,34]