/*
 * 变量提升
 *   var a; 不管条件是否成立都要进行变量提升，在全局作用域下声明的变量，也相当于给window设置了一个对象的属性，而且两者之间建立了映射的机制 <=> window.a=undefined;
 */
/*
 * in：检测某一个属性是否隶属于这个对象（不管是私有属性还是公有属性，只要有这个属性结果就是TRUE）
 * hasOwnProperty：检测某一个属性是否为对象的私有属性（只有这个属性是私有的才可以）
 */
if (!("a" in window)) {//=>"a" in window =>TRUE
    var a = 1;
}
console.log(a);