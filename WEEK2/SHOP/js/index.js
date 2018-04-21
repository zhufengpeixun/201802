/*
 * 1.获取数据和实现数据绑定
 *  =>真实项目中，页面中大部分数据都不是写死的，而是动态绑定的
 *   A:从服务器端获取到数据（基于AJAX/JSONP等技术，通过服务器端提供的数据API接口地址，把数据请求回来）
 *   B:把获取的数据进行解析
 *   C:把数据绑定在HTML页面中(数据绑定)：ES6中的模板字符串
 */
let productData = null;
let xhr = new XMLHttpRequest();
xhr.open('GET', 'json/product.json', false);
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
};
xhr.send(null);

//=>获取的结果是一个字符串:"JSON格式的字符串"，我们此时需要把获取的字符串转换为对象
/*
 * JSON格式：JSON不是一种数据类型，而是一种数据格式，只要把对象的属性名用双引号括起来，此时的对象就不再称之为普通对象，而是叫做JSON格式的对象
 *
 * 从服务器端获取的数据格式一般都是JSON格式的(大部分都是JSON格式字符串)
 *   window.JSON
 *      1.parse：把JSON格式的字符串转换为对象
 *      2.stringify：把对象转换为JSON格式的字符串
 *
 *   window.JSON.parse()
 *   JSON.parse()
 */
// let obj = {"name": "xxx"};//=>OBJ是JSON格式对象（操作起来和普通对象没啥太大区别）
// let str = '{"name": "xxx"}';//=>JSON格式的字符串
productData = JSON.parse(productData);

//=>数据绑定（DOM数据绑定）：依托获取的数据，把页面中需要展示的数据和结构都搞出来，然后把创建好的数据和结构放到页面指定容器中
/*
 * 1.字符串拼接
 *   ->传统字符串拼接
 *   ->ES6模板字符串拼接
 *   ->模板引擎:原理也是字符串拼接
 *
 * 2.动态创建DOM
 *   ->createElement
 *   ->appendChild
 *   弊端：操作起来太麻烦，而且性能消耗更大（DOM回流）
 */
let list = document.getElementById('list');
let str = ``;//=>这是两个撇(TAB上边按键) ES6模板字符串
for (let i = 0; i < productData.length; i++) {
    let {
        title,
        img = 'img/1.jpg',//=>没有返回IMG,我们用默认图占位
        price
    } = productData[i];

    str += `<li><a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>${price}</span>
        </a></li>`;
}
list.innerHTML = str;



















