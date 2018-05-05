/*
 * JS中的同步编程和异步编程
 *    同步编程：任务是按照顺序依次处理，当前这件事没有彻底做完，下一件事是执行不了的
 *    异步编程：当前这件事没有彻底做完，需要等待一段时间才能继续处理，此时我们不等，继续执行下面的任务，当后面的任务完成后，再去把没有彻底完成的事情完成
 *
 *    [JS中的异步编程]
 *       1.所有的事件绑定都是异步编程   xxx.onclick=function(){}
 *       2.所有的定时器都是异步编程 setTimeout(function(){},1000)
 *       3.AJAX中一般都使用异步编程处理
 *       4.回调函数也算是异步编程
 *       ...
 */

// let n = 0;
// setTimeout(() => {
//     console.log(++n);//=>2) 1
// }, 1000);
// console.log(n);//=>1) 0

//=>定时器设定一个时间，到达时间后不一定执行（如果当前还有其它的同步任务正在处理，那么到时间了也得等着）
// let n = 0;
// setTimeout(() => {
//     console.log(++n);
// }, 1000);
// console.log(n);//=>0
// while(1===1){
//     //=>死循环
// }

//=>浏览器是如何规划同步异步机制的
//1.浏览器是多线程的，JS是单线程的（浏览器只给JS执行分配一个线程）：单线程的特点就是一次只能处理一件事情
//进程：每一个应用程序都可以理解为一个进程（浏览器打开一个页面，就相当于开辟一个进程），在一个程序中（进程中）我们经常会同时干很多事情，此时我们可以分配多个线程去同时完成多项任务

//2.JS在单线程中实现异步的机制，主要依赖于浏览器的任务队列完成的。浏览器中有两个任务队列（主任务队列、等待任务队列）


// setTimeout(() => {
//     console.log(1);
// }, 20);
// console.log(2);
// setTimeout(() => {
//     console.log(3);
// }, 10);
// setTimeout(() => {
//     console.log(4);
// }, 100);
// for (let i = 0; i < 90000000; i++) {
//
// }
// console.log(5);

//=>测试程序反应时间
// // let startTime = new Date();
// console.time('AA');
// for (let i = 0; i < 90000000; i++) {
//
// }
// // console.log(new Date() - startTime);
// console.timeEnd('AA');

// let n = 0;
// setTimeout(() => {
//     console.log(++n);
// }, 0);//=>定时器时间因子设置为零也不是立即执行，每个浏览器都有一个自己最小的等待和反应时间（谷歌：5~6  IE：10~13），所以写零还是异步编程
// console.log(n);


//=>思考题
setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
for (let i = 0; i < 90000000; i++) {

}
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9);




















