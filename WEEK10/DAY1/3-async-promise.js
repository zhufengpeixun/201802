/*
console.log(1);
new Promise((resolve, reject) => {
    //=>new Promise的时候会立即把Excutor函数（也就是传递的回调函数）执行，所以Promise本身可以理解为是同步的
    console.log(2);

    setTimeout(() => {
        resolve();//=>Promise内部机制：执行resolve会把之前基于then存放的方法执行
    }, 10);
}).then(() => {//=>执行完成Excutor，紧接着执行then，执行then方法，会把传递的回调函数放到指定的容器中，等待触发执行（Promise内部的机制）
    console.log(3);
});
console.log(4);
*/

// console.log(1);
// new Promise((resolve, reject) => {
//     console.log(2);
//     resolve();
// }).then(() => {
//     console.log(3);
// });
// console.log(4);

//=>ES7中新增加对Promise操作的新语法：async/await（使用await必须保证当前方法是基于async修饰的）

/*
function AA() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() < 0.5 ? reject(100) : resolve(200);
        }, 0);
    });
}

async function fn() {
    let res = await AA();//=>先把AA执行，等待AA中的PROMISE完成(不论成功和失败)，把最后的处理结果获取到赋值给RES，拿到后在执行后面的代码（有人说：AWAIT把是异步的操作同步化？）
}*/

/*
function AA() {
    console.log(1);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(200);
        }, 0);
    });
}

async function fn() {
    console.log(2);
    let res = await AA();
    /!*
     * 1.先把AA执行,返回一个PROMISE实例
     * 2.它会暂时跳出当前正在执行的函数(FN)：也就是AWAIT后面的代码暂时先不执行（把后面的代码从主栈中移除，放到等待区域中）
     * 3.主栈暂时空闲
     *
     * 4.当主栈中的其它任务完成（主栈空闲），并且AA中的PROMISE也已经计算完成最后的结果，在把之前第二步移到等待区域的内容，重新拿回到主栈中执行
     *!/
    console.log(3);
}

fn();
console.log(4);
while (true) {

}
//=> 2 1 4 3  =>AWAIT并不是同步*/

/*async function async1(){
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2(){console.log('async2');}
console.log('script start');
setTimeout(function(){console.log('setTimeout');},0);
async1();
new Promise(function(resolve){
    console.log('promise1');
    resolve();
}).then(function(){
    console.log('promise2');
});
console.log('script end');
//=> 'script start'   'async1 start'  'async2'  'promise1'  'script end' ('promise2'或者'async1 end' 顺序根据不同的V8版本，是不一样的) 'setTimeout'*/

