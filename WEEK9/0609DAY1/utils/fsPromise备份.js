let fs = require('fs'),
    path = require('path');

let readFile = function (pathName) {
    //=>一般都会把传递的PATH-NAME进行处理：以当前项目的根目录为依托，我们只需要传递相对于根目录的相对目录地址，程序自动生成一个绝对目录地址
    /*
     * __dirname：当前模块所在的绝对路径（和模块中的方法在哪执行是没有关系的）
     * path.resolve()：当前模块中方法在哪个模块中执行的，那么对应的绝对路径是执行模块的绝对路径
     */
    pathName = path.resolve(path.resolve(), pathName);
    return new Promise((resolve, reject) => {
        fs.readFile(pathName, 'UTF-8', (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = {
    readFile
};
