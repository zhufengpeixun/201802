function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();//=>[对象] 2
getName();//=>[全局] 4
Foo().getName();//=>[先把FOO作为普通函数执行，在处理GET-NAME] 返回的是WIN,WIN.GET-NAME() =>1
getName();//=>[全局] 1

new Foo.getName();//=>成员访问的优先级高于无参数列表NEW =>Foo.getName ([F->2]) =>new [F->2]() 用构造函数的方式把找到的函数执行，创建这个函数类的一个实例（构造函数执行也是先像普通函数执行一样执行） =>2
new Foo().getName();//=>成员访问和有参数列表NEW优先级都是19，按照从左到右依次执行即可 =>new Foo() =>创造Foo的一个实例（f） =>f.getName() =>3
new new Foo().getName();//=>先算new Foo(),创造一个实例(f) =>new f.getName() =>继续执行优先级高的成员访问  =>f.getName =>[F->3] =>new [F->3]() =>构造函数执行这个方法 =>3

/*
 * Foo.getName 点是成员访问符
 * new Foo; 无参数列表NEW
 * new Foo(); 有参数列表NEW
 */