/*let str = 'zhufengpeixun@zhouxiaotian@zuishuai',
    obj = {};
//=>把每一个字符当做对象的属性进行存储，如果字符出现过，让出现次数一直累加 =>每一字字符出现的次数存储到对象中
for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char in obj) {
        obj[char]++;
        continue;
    }
    obj[char] = 1;
}
//=>获取最大出现的次数
let max = 0;
for (let key in obj) {
    if (obj[key] > max) {
        max = obj[key];
    }
}
//=>从对象中找出最大次数对应的字符
for (let key in obj) {
    if (obj[key] === max) {
        console.log(key + ' 出现：' + obj[key] + ' 次');
    }
}*/

/*
 * 先把字符串中每一个字符进行排序，排序后相同的字母就紧挨着了
 *   1.使用正则
 *   2.用字符第一次出现的位置和最后一次出现的位置做对比
 */
// let str = 'zhufengpeixun@zhouxiaotian@zuishuai';
// str = str.split('').sort((a, b) => a.localeCompare(b)).join('');
// //=>@@aaaeefghhhiiiiinnnoopstuuuuuxxzzz
// let reg = /(.)\1*/g;
// str.replace(reg, (...arg) => {
//     console.log(arg);
// });

// let str = 'zhufengpeixun@zhouxiaotian@zuishuai';
// let ary = [];
// [{z:2},{f:1}]