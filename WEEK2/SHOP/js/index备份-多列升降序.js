let listBox = document.getElementById('list'),
    headerBox = document.getElementById('header'),
    linkList = headerBox.getElementsByTagName('a'),
    productList = listBox.getElementsByTagName('li');

~function () {
    //=>AJAX
    let productData = null,
        xhr = new XMLHttpRequest;
    xhr.open('GET', 'json/product.json', false);
    xhr.onreadystatechange = () => {
        xhr.readyState === 4 && xhr.status === 200 ? productData = xhr.responseText : null;

        //->FORMAT DATA
        productData ? productData = JSON.parse(productData) : null;
    };
    xhr.send(null);

    //=>BIND DATA
    let str = ``;
    for (let i = 0; i < productData.length; i++) {
        let {
            title,
            img,
            price,
            time,
            hot
        } = productData[i];

        str += `<li data-price="${price}" 
                    data-time="${time}" 
                    data-hot="${hot}">
        <a href="javascript:;">
            <img src="${img}" alt="">
            <p>${title}</p>
            <span>￥${price}</span><br/>
            <span>时间：${time}</span><br/>
            <span>热度：${hot}</span>
        </a></li>`;
    }
    listBox.innerHTML = str;
}();

//=>HANDLE CLICK
~function () {
    let sortList = function () {
        //=>this:点击的A标签
        let productAry = [].slice.call(productList);
        productAry.sort((a, b) => {
            //=>需要获取当前点击A的索引,通过索引不同,按照不同的方式进行排序
            let aInn,
                bInn;
            switch (this.index) {
                case 0:
                    //=>日期不能直接的相减，需要把字符串中的“-”去掉在相减
                    aInn = a.getAttribute('data-time').replace(/-/g, '');
                    bInn = b.getAttribute('data-time').replace(/-/g, '');
                    break;
                case 1:
                    aInn = a.getAttribute('data-price');
                    bInn = b.getAttribute('data-price');
                    break;
                case 2:
                    aInn = a.getAttribute('data-hot');
                    bInn = b.getAttribute('data-hot');
                    break;
            }
            return (aInn - bInn) * this.flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);
        }
    };

    //=>给每一个LINK都绑定点击切换
    for (let i = 0; i < linkList.length; i++) {
        let curLink = linkList[i];
        curLink.index = i;//=>设置自定义属性存储A的索引
        curLink.flag = -1;//=>每一个A标签上都有一个FLAG，能够在点击的时候实现1~-1之间的切换,点击都要执行SORT-LIST，同时方法中的THIS也都改为当前点击的A
        curLink.onclick = function () {
            this.flag *= -1;
            sortList.call(this);
        };
    }
}();