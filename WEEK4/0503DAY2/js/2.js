//=>16. 英文字母汉字组成的字符串，用正则给英文单词前后加空格

// let str = "珠峰培训zhufeng哈哈，javascript高级程序设计，good good study!",
//     reg = /(?:(?:([a-zA-Z]+)([\u4e00-\u9fa5]+))|(?:([\u4e00-\u9fa5]+)([a-zA-Z]+)))/g;
// str = str.replace(reg, (...arg) => {
//     //=>REG和STR匹配几次，函数就被执行几次
//     //=>ARG是数组，存储了每一次匹配捕获到的结果（包含分组捕获的结果）
//     let [, oneVal, twoVal, threeVal, fourVal] = arg;
//
//     if (oneVal && twoVal) {
//         return ` ${oneVal} ${twoVal}`;
//     }
//
//     return `${threeVal} ${fourVal} `;//=>RETURN是啥就会把本次大正则匹配的字符替换成啥
// });
// console.log(str);

// let str = "珠峰培训zhufeng哈哈，javascript高级程序设计，good good study!",
//     reg = /.?([a-zA-Z]+).?/g;
// str = str.replace(reg, (...arg) => {
//     //=>每一次捕获的时候我们都把单词左右两边的一位捕获到，这样我们只需要判断捕获的内容中是否有汉字即可，有汉字加空格
//     let reg = /[\u4e00-\u9fa5]/,
//         [val, oneVal] = arg;
//     if (reg.test(val)) {
//         val = val.replace(oneVal, ` ${oneVal} `);
//         return val;
//     }
//     return val;
// });
// console.log(str);

//=>扩展：把一个英文段落中，每一个单词首字母大写
let str = 'the-man is practice is to cultivate his body and cultivate his virtues. Not indifferent to clear ambition, non tranquil and far away. If we need to study quietly, we must learn and learn. Prostitution is not able to help, and impatience can not be smelt. When the year goes with the time, the meaning goes with the sun, and then it becomes dry and withered.';
let reg = /(?:^| )([^\s]+)(?: |$)/g;
str = str.replace(/ /g, '  ').replace(reg, (...arg) => {
    return arg[1].substr(0, 1).toUpperCase() + arg[1].substr(1) + ' ';
});
console.log(str);
// let reg = /\b([a-zA-Z]+)\b/g;//=>\b会把中杠左右两边算作边界 the-man算作两个单词
// str = str.replace(reg, (...arg) => {
//     // arg[0] : 当前找到的单词
//     let val = arg[0];
//     return val.substr(0, 1).toUpperCase() + val.substr(1);
// });
// console.log(str);






