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

// let str = 'hello<img alt="哈哈" src="haha.png"/>world<img src="xiee.png" alt="邪恶"/>',
//     reg = /<img([^<>]*)\/>/g;
// str = str.replace(reg, (...arg) => {
//     let val = arg[1],
//         regVal = /alt=("|')([\u4e00-\u9fa5]*)\1/,
//         flag = regVal.test(val);
//     if (flag) {
//         val = regVal.exec(val)[2] || '';
//         return `[${val}]`;
//     }
//     return '';
// });
// console.log(str);

//32. 一个url 后面好多key-value 如localhost?key=val&key2=val2&key3=val3 封装一个函数 getParam(‘key’) 通过key获得相应等号后面的值.
// let getParam = function (attr) {
//     //=>先把URL问号后面的值获取到
//     let str = 'localhost?name=zhufeng&year=9&teacher=zxt',
//         obj = {},
//         reg = /([^?&=#]+)=([^?&=#]+)/g;
//     str.replace(reg, (...arg) => {
//         let [, key, value] = arg;
//         obj[key] = value;
//     });
//     return obj[attr];
// };
// console.log(getParam('xxx'));

/*
NODE中提供一个URL.PARSE方法，这个方法可以把一个URL地址中的每一部分都捕获到,最后存储成为一个对象

let url = require('url');
console.log(url.parse('http://www.zhufengpeixun.cn:80/stu/index.html?name=xxx&age=9#teatcher', true));
{
    protocol: 'http:',
    port: '80',
    hostname: 'www.zhufengpeixun.cn',
    hash: '#teatcher',
    search: '?name=xxx&age=9',
    query: { name: 'xxx', age: '9' },
    pathname: '/stu/index.html'
}
*/

/*
let str = 'http://www.zhufengpeixun.cn:80/stu/index.html?name=xxx&age=9#teatcher';
let link = document.createElement('a');
link.href = str;
let {hash, hostname, pathname, protocol, search, port} = link;
//=>端口号：如果没有值，则使用默认端口（HTTP:80 HTTPS:443 FTP:21）
if (!port) {
    switch (protocol) {
        case 'https:':
            port = 443;
            break;
        case 'ftp':
            port = 21;
            break;
        default:
            port = 80;
    }
}
//=>QUERY
let query = {};
if (search) {//=>search:"?name=xxx&age=9"
    search.replace(/([^?=&]+)=([^?=&]+)/g, (...arg) => {
        let [, key, value] = arg;
        query[key] = value;
    });
}

let result = {
    protocol,//=>protocol:protocol
    hostname,
    port,
    pathname,
    search,
    hash,
    query
};
console.log(result);
*/

/*
 37. 写出完整的验证函数
    > 1)长度不能小于6位
    > 2)首字母必须是字母
    > 3)合法字符只能是数字、字母、下划线
 */
// let reg = /^[a-zA-Z]\w{5,}$/;

//49. 获取字符串中出现次数最多的字符及出现的次数
let str = 'zhufengpeixunzhouxiaotian';
/*
 * 思路一：获取字符串中的每一个字母，然后以对象键值对的方式存储起来（属性名是字符，属性值是出现的次数）
 */
// //1.获取每一个字符出现的次数，以及出现的最大次数
// let obj = {},
//     max = 1,
//     result = [];
// str.replace(/./g, char => {
//     if (obj.hasOwnProperty(char)) {
//         obj[char]++;
//         if (obj[char] > max) {
//             max = obj[char];
//         }
//         return;
//     }
//     obj[char] = 1;
// });
// //2.获取和MAX相匹配次数的字符
// for (let char in obj) {
//     if (obj.hasOwnProperty(char)) {
//         if (obj[char] === max) {
//             result.push(char);
//         }
//     }
// }
// console.log(`最多出现的次数是：${max} 次，对应的字符有：${result}`);

/*
 * 思路二：先把字符串中的每一个字符变为数组中的每一项，给数组排序，在变为字符串（相同的字符挨着），在基于正则捕获替换
 */
// let max = 1;
// str = str.split('').sort().join('');//=>'aaeefghhiiinnnooptuuuxxzz'
// str = str.replace(/(.)\1*/g, (...arg) => {
//     let [value, char] = arg,
//         len = value.length;
//     len > max ? max = len : null;
//     return `${char}{${len}}`;
// });
// // console.log(str);//=>'a{2}e{2}f{1}g{1}h{2}i{3}n{3}o{2}p{1}t{1}u{3}x{2}z{2}'
// // let reg =/([^\d{}])\{"+max+"\}/g;//=>字面创建正则的方式，正则中的每一个字符都是元字符，不能实现把一个变量的值作为正则一部分的需求
// let reg = new RegExp('([^\\d{}])\\{' + max + '\\}', 'g');
// str.replace(reg, (...arg) => {
//     console.log(arg[1]);
// });









