let a = 10;
let fn1 = b => {
    return a * b;
};
let fn2 = b => {
    return a - b;
};
// exports.fn = fn;//=>把当前模块私有的函数放到EXPORTS导出对象中（赋值给他的某一个属性），这样在其它模块中，可以基于REQUIRE导入进来使用  <=> module.exports.fn=fn;

// exports={};//=>是无法导出内容的：默认和module.exports是同一个堆内存，但是这种操作让exports指向新的堆内存，而module.exports不受影响（require导入的是module.exports对应的堆内存，而不是exports的）

module.exports = {//=>重定向到自己的堆内存，用来实现导出
    fn1: fn1
};
module.exports.fn2 = fn2;//=>向新的堆内存中加入导出内容
// exports.fn3 = 100;//=>无法导出：此时exports和module.exports已经不是同一个堆内存了