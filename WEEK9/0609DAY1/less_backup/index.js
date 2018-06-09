let path = require('path'),
    lessc = require('less'),
    rootPath = path.resolve();

let {readFile, writeFile} = require(`./utils/fsPromise`),
    {entry, output} = require(`./less.config`);

module.exports = {
    render() {
        //=>分别读取ENTRY中对应的LESS文件中的代码
        entry.forEach((item, index) => {
            readFile(item).then(result => {
                //=>把读取的LESS代码进行编译:编译为CSS
                lessc.render(result, {compress: true}, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    writeFile(output[index], result.css);
                });
            });
        });
    }
};