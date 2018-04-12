var obj={
    n:10,
    m:obj.n*10 //=>Uncaught TypeError: Cannot read property 'n' of undefined  =>此时的OBJ和对象没有关系呢,OBJ是undefined
};
console.log(obj.m);

//=>我们开辟一个空间存储键值对（没存储完成之前，值和OBJ没有关系）