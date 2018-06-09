/*let fs = require('fs');*/

/*
fs.mkdir('./less', err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('ok');
});
console.log(1);*/

/*
// let result = fs.readdirSync('./');//=>同步
fs.readdir('./css', (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);//=>返回的结果是一个数组
});*/

/*fs.rmdir('./less', err => {//=>删除文件夹必须保证文件夹是空的
    if (err) {
        console.log(err);
        return;
    }
    console.log('ok');
});*/

/*
fs.readFile('./less/1.less', 'utf8', (err, result) => {
    //=>不设置UTF-8编码格式，读取出来的是BUFFER格式的数据，设置后读取到的是字符串格式的数据
    if (err) {
        console.log(err);
        return;
    }
    console.log(result);
});*/

/*fs.writeFile('./less/1.less', '哈哈', 'utf8', err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('ok');
});*/

/*
fs.appendFile('./less/1.less', '呵呵', 'utf8', err => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('ok');
});*/

/*fs.unlink('./less/1.less',err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('ok');
});*/

/*
fs.copyFile('./package.json','./less/111.json',err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('ok');
});*/


// let {readFile, unlink, copyFile} = require('./utils/fsPromise');
// copyFile('temp1.js', 'temp2.js').then(result => {
//     console.log(result);
// });

//=>合并并且压缩CSS
let {readFile, readdir, writeFile} = require('./utils/fsPromise');

//1.先把所有的CSS文件读取出来
readdir('less').then(result => {
    return result.filter(item => /\.CSS$/i.test(item));
}).then(result => {
    let arg = [];
    result.forEach(item => {
        arg.push(readFile(`less/${item}`));//=>分别调取READ-FILE方法，读取捕捉到的CSS文件，向数组中依次增加读取各个文件的PROMISE实例
    });
    //arg=[promise1,promise2...]  Promise.all：等待数组中所有的PROMISE实例都执行成功才算成功
    return Promise.all(arg);
}).then(result => {
    //=>RESULT:一个数组，存放所有文件读取的内容
    result = result.join('');
    return result.replace(/( |\n|\r)/g, '');
}).then(result => {
    return writeFile('less/build.min.css', result);
}).then(() => {
    console.log('创建成功');
});




