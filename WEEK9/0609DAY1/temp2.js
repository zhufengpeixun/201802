// let a = 2,
//     fn = b => {
//         return a / b;
//     };
/*

let temp1 = require('./temp1');//=>./特意指定是当前目录中的某个模块(.js可以省略)  require导入的时候：首先把TEMP1模块中的JS代码自上而下执行，把exports对应的堆内存导入进来，所以接受到的结果是一个对象（REQUIRE是一个同步操作：只有把导入的模块代码执行完成，才可以获取值，然后继续执行本模块下面的代码）
// console.log(temp1.fn(10));

// temp1 = require('./temp1');//=>第二次并没有把TEMP1代码执行，因为第一次执行把导出的结果缓存了
// console.log(temp1.fn(10));*/

let temp1 = require('./temp1');
console.log(temp1.fn1(10));
console.log(temp1.fn2(10));
console.log(temp1.fn3);
