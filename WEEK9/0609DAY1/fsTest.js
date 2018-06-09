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


let {readFile, unlink, copyFile} = require('./utils/fsPromise');
copyFile('temp1.js', 'temp2.js').then(result => {
    console.log(result);
});

//=>合并并且压缩CSS




