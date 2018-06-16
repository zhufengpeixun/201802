let Promise = require('./6-promise');

/*let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // Math.random() < 0.5 ? resolve(100) : reject(-100);
        resolve(100);
    }, 1000);
});

let p2 = p1.then(result => {
    throw new Error('ERROR');
    return result + 100;
});

let p3 = p2.then(null);

p3.then(result => {
    console.log(result);
}, reason => {
    console.log(1, reason);
}).catch(reason => {
    console.log(2, reason);
});

console.log(3);*/

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(100);
    }, 50);
});

let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(200);
    }, 10);
});

let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(300);
    }, 80);
});

Promise.all([p1, p2, p3]).then(result => {
    //=>所有的PROMISE都成功执行,RESULT中分别存储每一个实例返回的结果，而且和数组中的顺序是一样的
    console.log(result);
}).catch(reason => {
    //=>只要有有一个失败，就执行这个方法，失败后不再执行后面的操作
    console.log(reason);
});