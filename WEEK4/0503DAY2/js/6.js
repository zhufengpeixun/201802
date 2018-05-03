// let str = '54389',
//     ary = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
// str = str.replace(/\d/g, item => {
//     //=>item =>arg[0] =>正则每一次捕获的内容 5/4/3/8/9
//     //=>把捕获的数字做为索引，到ARY中找到对应的汉字，用找到的结果替换当前捕获的内容
//     return ary[item];
// });
// console.log(str);

//30. 在javascript对象上定义一个repeatify函数,这个函数接受一个整数参数,来明确子字符串需要重复几次,这个函数要求字符串重复指定的次数,比如:’abc’.repeatify(3); //=>”abcabcabc”
// String.prototype.repeatify = function repeatify(n = 1) {
//     //=>this:需要处理的字符串
//     let result = '';
//     for (let i = 0; i < n; i++) {
//         result += this;
//     }
//     return result;
// };
// console.log('abc'.repeatify());

//31. `var str='hello<img src="haha.png" alt="哈哈"/>world';`正确匹配输出’hello[哈哈]world’

// let str = 'hello<img alt="哈哈" src="haha.png"/>world<img src="xiee.png" alt="邪恶"/>',
//     reg = /<img(?:[^<>]*alt="([\u4e00-\u9fa5]*)")\/>/g;
// str = str.replace(reg, (...arg) => {
//     return `[${arg[1]}]`;
// });
// console.log(str);

let str = 'hello<img alt="哈哈" src="haha.png"/>world<img src="xiee.png" alt="邪恶"/>',
    reg = /<img([^<>]*)\/>/g;
str = str.replace(reg, (...arg) => {
    let val = arg[1],
        regVal = /alt=("|')([\u4e00-\u9fa5]*)\1/,
        flag = regVal.test(val);
    if (flag) {
        val = regVal.exec(val)[2] || '';
        return `[${val}]`;
    }
    return '';
});
console.log(str);