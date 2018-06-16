let Promise = require('./6-promise');

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() < 0.5 ? resolve(100) : reject(-100);
    }, 1000);

});

let p2 = p1.then(result => {
    return result + 100;
}, reason => {
    return reason + 100;
});

p2.then(result => {
    console.log(p1 === p2);//=>FALSE 执行THEN返回的是一个新的PROMISE实例
    console.log(result);
}, reason => {
    console.log(reason);
});
console.log(3);
