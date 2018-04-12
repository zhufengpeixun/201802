//=>在全局作用域下声明一个变量，也相当于给WINDOW全局对象设置了一个属性，变量的值就是属性值（私有作用域中声明的私有变量和WINDOW没啥关系）
/*
console.log(a);//=>undefined
console.log(window.a);//=>undefined
console.log('a' in window); //=>TRUE 在变量提升阶段，在全局作用域中声明了一个变量A，此时就已经把A当做属性赋值给WINDOW了，只不过此时还没有给A赋值，默认值UNDEFINED  in：检测某个属性是否隶属于这个对象
var a = 12;//=>全局变量值修改，WIN的属性值也跟着修改
console.log(a);//=>全局变量A  12
console.log(window.a);//=>WINDOW的一个属性名A  12

a = 13;
console.log(window.a);//=>13

window.a = 14;
console.log(a);//=>14
//=>全局变量和WIN中的属性存在 “映射机制”
*/

//=>不加VAR的本质是WIN的属性
/*
// console.log(a);//=>Uncaught ReferenceError: a is not defined
console.log(window.a);//=>undefined
// console.log('a' in window);//=>false
a = 12;//=>window.a=12
console.log(a);//=>12
console.log(window.a);//=>12
*/


/*var a = 12,
    b = 13;//=>这样写B是带VAR的*/
/*var a = b = 12;//=>这样写B是不带VAR的*/

console.log(a, b);//=>undefined undefined
var a = 12,
    b = 12;

function fn() {
    console.log(a, b);//=>undefined 12
    var a = b = 13;
    /*var a=13;  b=13;*/
    console.log(a, b);//=>13 13
}

fn();
console.log(a, b);//=>12 13






