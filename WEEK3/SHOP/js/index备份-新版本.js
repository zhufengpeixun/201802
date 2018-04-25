let productRender = (function () {
    let productData = null,
        productBox = document.querySelector('.productBox'),
        headerBox = document.querySelector('.headerBox'),
        linkList = headerBox.querySelectorAll('a'),
        productList = null;

    //=>GET-DATA:基于AJAX从服务器端获取数据
    let getData = function () {
        let xhr = new XMLHttpRequest;
        xhr.open('GET', 'json/product.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                productData = JSON.parse(xhr.responseText);//=>把从服务器获取的JSON字符串转换为对象,方便后续操作
            }
        };
        xhr.send(null);
    };

    //=>BIND-HTML：完成数据的绑定（基于ES6模板字符串）
    let bindHTML = function () {
        let str = ``;
        productData.forEach(({title, price, hot, time, img}, index) => {
            //=>ES6模板字符串中出现的${}里面存放的是JS代码(包含需要动态绑定数据的JS变量的值)
            str += `<li data-time="${time}" data-hot="${hot}" data-price="${price}"><a href="#">
                <img src="${img}" alt="">
                <p title="${title}">${title}</p>
                <span>￥${price}</span>
                <span>时间：${time}</span>
                <span>热度：${hot}</span>
            </a></li>`;
        });
        productBox.innerHTML = str;
        productList = productBox.querySelectorAll('li');
    };

    //=>BIND-CLICK：给三个排序标签绑定点击事件
    let bindClick = function () {
        [].forEach.call(linkList, (curLink, index) => {
            //=>循环三次，执行三次这个方法，每一次执行都会形成一个闭包，每一个闭包中保存了当前这个A对应的索引INDEX
            curLink.flag = -1;
            curLink.onclick = function () {
                //1.给PRODUCT-LIST进行排序(依据点击列的不同进行排序)
                //=>点击的需要获取每一个LI的价格/热度等信息,此时我们可以在绑定的时候，把这些信息存储到自定义属性上，点击的时候根据自定义属性获取即可
                this.flag *= -1;

                //A:根据点击LI的索引获取按照谁来排序
                let ary = ['data-time', 'data-price', 'data-hot'];
                productList = [].slice.call(productList);
                productList.sort((a, b) => {
                    let aInn = a.getAttribute(ary[index]),
                        bInn = b.getAttribute(ary[index]);
                    if (index === 0) {//=>对于日期来说,我们需要去除字符串之间的中杠，才能实现数学相减
                        aInn = aInn.replace(/-/g, '');
                        bInn = bInn.replace(/-/g, '');
                    }
                    return (aInn - bInn) * this.flag;
                });

                //2.按照最新顺序依次添加到容器中
                productList.forEach(curLi => {
                    productBox.appendChild(curLi);
                });
            }
        });
    };

    return {
        init: function () {
            getData();
            bindHTML();
            bindClick();
        }
    }
})();
productRender.init();


/*
 * forEach：数组中的方法，用来遍历数组中每一项内容的
 */
// let ary = [12, 23, 34];
// ary.forEach((item, index) => {
//     /*
//      * item：当前遍历数组中这一项的值
//      * index: 当前遍历这一项的索引
//      *
//      * 数组中有多少项，我们这个函数就被执行多少次，保证数组中的每一项都可以得到遍历
//      */
//     console.log(item, index);
// });












