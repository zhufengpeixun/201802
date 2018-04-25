/*
 * 1.字符串拼接
 *   ->普通字符串拼接
 *   ->ES6模板字符串
 *   ->模板引擎
 * 2.DOM操作
 */
let data = [
    {
        "id": 1,
        "title": "HUAWEI Mate 10 4GB+64GB 全网通版（亮黑色）",
        "price": 3899,
        "time": "2017-03-15",
        "hot": 198,
        "img": "img/1.jpg"
    },
    {
        "id": 2,
        "title": "HUAWEI 麦芒6 4GB+64GB 全网通版（曜石黑）",
        "price": 2399,
        "time": "2017-02-08",
        "hot": 25,
        "img": "img/2.jpg"
    },
    {
        "id": 3,
        "title": "华为畅享7 2GB+16GB 全网通标配版（香槟金）",
        "price": 899,
        "time": "2017-01-25",
        "hot": 568,
        "img": "img/3.jpg"
    },
    {
        "id": 4,
        "title": "HUAWEI nova 2 Plus 4GB+64GB 全网通版（曜石黑）",
        "price": 2399,
        "time": "2016-12-30",
        "hot": 20000,
        "img": "img/4.jpg"
    },
    {
        "id": 5,
        "title": "HUAWEI nova 2 4GB+64GB 全网通版（玫瑰金）",
        "price": 2199,
        "time": "2016-01-30",
        "hot": 1032654,
        "img": "img/5.jpg"
    },
    {
        "id": 6,
        "title": "华为畅享7 Plus 4GB+64GB 全网通高配版（香槟金）",
        "price": 1699,
        "time": "2018-01-01",
        "hot": 1,
        "img": "img/6.jpg"
    },
    {
        "id": 7,
        "title": "HUAWEI nova 青春版 4GB+64GB 全网通版（樱语粉）",
        "price": 1799,
        "time": "2017-02-19",
        "hot": 400,
        "img": "img/7.jpg"
    },
    {
        "id": 8,
        "title": "HUAWEI P10 4GB+64GB 全网通版（曜石黑）",
        "price": 3488,
        "time": "2017-01-25",
        "hot": 240,
        "img": "img/8.jpg"
    },
    {
        "id": 9,
        "title": "HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）",
        "price": 4488,
        "time": "2014-01-01",
        "hot": 12345678,
        "img": "img/9.jpg"
    },
    {
        "id": 10,
        "title": "HUAWEI Mate 9 保时捷设计 6GB+256GB 全网通版（曜石黑）",
        "price": 8999,
        "time": "2014-01-01",
        "hot": 12345678,
        "img": "img/10.jpg"
    }
];

// let str = ``;
// data.forEach(item => {
//     str += `<li><a href="#">
//             <img src="img/1.jpg" alt="">
//             <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）</p>
//             <span>￥4888</span>
//             <span>时间：2014-01-01</span>
//             <span>热度：9999</span>
//         </a></li>`;
// });
// document.querySelector('.productBox').innerHTML = str;//=>只引发一次DOM回流  +=str 把原有容器中的结构都以字符串的方式获取到，然后和新的STR字符串拼接，最后统一在插入到原有的容器中  =str 用新的字符串替换原有的结构

// data.forEach((item, index) => {
//     //=>动态创建DOM的方式(外层容器基于CREATE-ELEMENT完成，容器中的具体内容可以基于创建DOM完成，也可以基于字符串拼接完成)
//     //=>之所以不建议使用这种方式，因为循环十次，每一次都改变了原有的DOM结构，引发浏览器的十次回流
//     let curLi = document.createElement('li');
//     curLi.innerHTML = `<a href="#">
//             <img src="img/1.jpg" alt="">
//             <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）</p>
//             <span>￥4888</span>
//             <span>时间：2014-01-01</span>
//             <span>热度：9999</span>
//         </a>`;
//     document.querySelector('.productBox').appendChild(curLi);
// });

//=>基于文档碎片(虚拟内存中开辟的一个容器)可以解决这个问题：每当创建一个LI，我们首先把它存放到文档碎片中（千万不要放到页面中，避免回流），当我们把需要的元素都创建完成，并且都添加到文档碎片中，在统一把文档碎片放到页面中（只会引发一次回流操作）
// let frg = document.createDocumentFragment();//=>创建文档碎片容器
// data.forEach((item, index) => {
//     let curLi = document.createElement('li');
//     curLi.innerHTML = `<a href="#">
//             <img src="img/1.jpg" alt="">
//             <p title="HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）">HUAWEI P10 Plus 6GB+128GB 全网通版（钻雕金）</p>
//             <span>￥4888</span>
//             <span>时间：2014-01-01</span>
//             <span>热度：9999</span>
//         </a>`;
//     frg.appendChild(curLi);//=>每一次把创建的LI存放到文档碎片中
// });
// document.querySelector('.productBox').appendChild(frg);//=>把文档碎片中的内容，统一存放到页面中
// frg = null;

/*
 * DOM的回流(reflow)和重绘(repaint)
 *   1.计算DOM结构(DOM TREE)
 *   2.加载CSS
 *   3.生成渲染树(RENDER TREE)，渲染树是和样式相关的
 *   4.浏览器基于GPU(显卡)开始按照RENDER TREE画页面
 *
 * 重绘：当某一个DOM元素样式更改（位置没变只是样式更改，例如：颜色变为红色...）浏览器会重新渲染这个元素
 *   box.style.color='red'
 *   //...还有一些其它代码
 *   box.style.fontSize='16px'
 *
 *   上面的操作触发了两次重绘，性能上有所消耗，真实项目中为了优化这个性能，我们最好一次性把需要修改的样式搞定，例如：
 *   .xxx{
 *      color:'red',
 *      fontSize:'16px'
 *   }
 *   box.className='xxx'
 *
 * 回流：当DOM元素的结构或者位置发生改变（删除、增加、改变位置、改变大小...）都会引发回流，所谓回流，就是浏览器抛弃原有计算的结构和样式，从新进行DOM TREE或者RENDER TREE，非常非常非常...消耗性能
 */


/*
 * 分离读写
 */
//[引发两次回流]
// box.style.top = '100px';
// console.log(box.style.top);//=>'100px'
// box.style.left = '100px';

//[引发一次回流]
box.style.top = '100px';
box.style.left = '100px';
console.log(box.style.top);//=>'100px'




