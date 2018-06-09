let path = require('path');

// console.log(path.resolve());//=>返回当前模块的绝对地址（不包含模块名称）：E:\201802LESSON\WEEK9\0609DAY1  <=> __dirname

// console.log(path.resolve(__dirname, 'less/tt'));//=>E:\201802LESSON\WEEK9\0609DAY1\less\tt 可以把一个相对路径拼接在绝对路径的后面（第一个参数是绝对路径，第二个是相对的，如果都是绝对路径，以最后一个为主）

// console.log(path.resolve(`${__dirname}/css`, `${__dirname}/less`));