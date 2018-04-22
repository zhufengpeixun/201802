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
            <span>￥${price}</span>
        </a></li>`;
    }
    listBox.innerHTML = str;
}();

//=>HANDLE CLICK
~function () {
    let sortList = function () {
        //=>this:当前操作的A
        let productAry = [].slice.call(productList);
        /*
         let _this=this;
         productAry.sort(function(a,b){
             //this:window
             _this.flag
         });*/
        productAry.sort((a, b) => {
            //=>this:当前操作的A
            let aP = a.getAttribute('data-price'),
                bP = b.getAttribute('data-price');
            return (aP - bP) * this.flag;
        });
        for (let i = 0; i < productAry.length; i++) {
            let curLi = productAry[i];
            listBox.appendChild(curLi);
        }
    };

    linkList[1].flag = -1;
    linkList[1].onclick = function () {
        //=>this:当前操作的A标签(价格A标签)
        this.flag *= -1;//=>每一次点击可以让FLAG的值从1~-1来回切换(第一次点击变为1,第二次变为-1...)
        sortList.call(this);//=>执行SORT-LIST，让方法中的THIS关键字改为操作的A标签  (箭头函数虽然很强大，但是不可以乱用，尤其是在需要改变函数中THIS的情况下，箭头函数中的THIS不受我们管控，都是默认继承上下文中的，我们基于call也改不了)
    };
}();