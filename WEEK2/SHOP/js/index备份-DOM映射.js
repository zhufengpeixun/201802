let listBox = document.getElementById('list'),
    headerBox = document.getElementById('header'),
    linkList = headerBox.getElementsByTagName('a'),
    productList = listBox.getElementsByTagName('li');
console.log(productList);

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
            <span>￥${price}</span>
        </a></li>`;
    }
    listBox.innerHTML = str;
}();

console.log(productList);

//=>HANDLE CLICK
~function () {
    let sortList = () => {
        let productAry = [].slice.call(productList);
        productAry.sort((a, b) => {
            let aP = a.getAttribute('data-price'),
                bP = b.getAttribute('data-price');
            return aP - bP;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);//=>appendChild:向容器的末尾追加新元素,但是页面中不是20个,还是原有的10个,只不过顺序改变了,这是为啥?
        }
    };

    linkList[1].onclick = function () {
        sortList();
    };
}();


/*
 * DOM的映射机制
 *   页面中的HTML元素，和JS中通过相关方法获取到的元素集合或者元素对象存在映射关系(一个改另外一个会跟着自动修改)
 *
 *   xxx.style.color='red' : 把xxx元素对象对应堆内存中的style属性下的color属性值修改为'red'（本质操作的是JS堆内存） ；但是由于DOM映射关系，页面中的标签和XXX元素对象是绑在一起的，我们修改元素对象空间的值，页面中的元素会按照最新的值进行渲染；
 *
 *   在元素绑定前，我们获取容器中元素，得到一个空的元素集合，元素数据绑定后，我们不需要重新获取，DOM的映射机制会帮我们把新增加的元素映射到之前获取的空集合中，让其变为有元素的集合（querySelectorAll获取的集合是静态集合(staticNodeList)，不存在上述所谓的映射机制，所以基于这种办法，数据绑定完成后需要重新的获取一次才可以）
 *
 *  appendChild在追加元素对象的时候，如果这个元素之前容器中已经存在，此时不是克隆一份新的追加到末尾，而是把原有的元素移动到末尾位置
 *
 *  ...
 */