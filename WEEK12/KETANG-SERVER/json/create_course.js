let ary = [{
    "name": "VUE框架开发课程",
    "pic": "http://img.zhufengpeixun.cn/vueposters.png",
    "date": "2018-01-01",
    "address": "珠峰培训302",
    "time": "1小时",
    "dec": "Vue.js是一个构建数据驱动的web界面的渐进式框架。Vue.js的目标是通过尽可能简单的API实现响应的数据绑定和组合的视图组件。它不仅易于上手，还便于与第三方库或既有项目整合。",
    "price": 3000,
    "type": "vue"
}, {
    "name": "REACT框架开发课程",
    "pic": "http://img.zhufengpeixun.cn/reactposter.png",
    "date": "2018-01-01",
    "address": "珠峰培训302",
    "time": "1小时",
    "dec": "React起源于Facebook的内部项目，因为该公司对市场上所有JavaScript MVC框架，都不满意，就决定自己写一套，用来架设Instagram的网站。做出来以后，发现这套东西很好用，就在2013年5月开源了。",
    "price": 3000,
    "type": "react"
}, {
    "name": "小程序开发课程",
    "pic": "http://img.zhufengpeixun.cn/xiaochengxuposter.png",
    "date": "2018-01-01",
    "address": "珠峰培训302",
    "time": "1小时",
    "dec": "微信小程序（wei xin xiao cheng xu），简称小程序，英文名Mini Program，是一种不需要下载安装即可使用的应用，它实现了应用“触手可及”的梦想，用户扫一扫或搜一下即可打开应用。",
    "price": 3000,
    "type": "xiaochengxu"
}];

let vueN = 0,
    reactN = 0,
    weixinN = 0;

let result = [];
for (let i = 1; i < 1000; i++) {
    let n = Math.round(Math.random() * 2),
        item = JSON.parse(JSON.stringify(ary[n])),
        m = 0;
    item = {id: i, ...item};
    switch (item.type) {
        case 'vue':
            ++vueN;
            m = vueN;
        case 'react':
            ++reactN;
            m = reactN;
        default:
            ++weixinN;
            m = weixinN;
    }
    m = (m < 100 && m >= 10) ? '0' + m : (m < 10 ? '00' + m : m);
    item.name = item.name + '[第' + m + '讲]';
    result.push(item);
}
console.log(result);
require('../utils/promiseFS').writeFile('./course.json', result);

