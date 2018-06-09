//=>需要把CONFIG放到当前项目的根目录中
let path = require('path'),
    rootPath = __dirname;

module.exports = {
    //=>需要编译的LESS文件
    entry: [
        `${rootPath}/less/index.less`,
        `${rootPath}/less/detail.less`
    ],
    output: [
        `${rootPath}/css/index.min.css`,
        `${rootPath}/css/detail.min.css`
    ]
};