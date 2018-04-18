function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function BBB() {
    console.log(2);
};
Foo.prototype.getName = function AAA() {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();//=>2 把Foo当做一个对象，找Foo的私有方法执行
getName();//=>4 执行全局下的GET-NAME
Foo().getName();//=>1 先把FOO当做普通函数执行,执行返回的结果在调取GET-NAME执行
getName();//=>1 执行的依然是全局下的GET-NAME

console.log(new Foo.getName());;//=>A:(Foo.getName) =>new A()  =>2
new Foo().getName();//=>B:new Foo() =>B.getName() =>3
console.log(new new Foo().getName());//=>C:new Foo() =>new C[Foo的实例].getName() =>D:C.getName =>new D(); =>3  (先计算new Foo()创建一个实例f，然后new f.getName()，先找到f.getName，在把这个函数new一下，最后其实相当于把f.getName当做一个类，返回这个类的一个实例)