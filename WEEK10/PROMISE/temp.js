let Promise = require('./Promise');
let fs = require('fs');

new Promise((resolve, reject) => {
    fs.readFile('./xxx.txt', 'utf8', (err, data) => {
        if (err) reject(err);
        resolve(data);
    });
}).then(data => {
    throw new Error('xxx');
    return 1;
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});
console.log(2);