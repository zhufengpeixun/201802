function insertAfter(newEle, originEle) {
    //=>newEle:新插入的元素
    //=>originEle:指定的老元素
    //=>插入到原有元素的后面，其实就是插入到原有元素弟弟的前面
    let next = originEle.nextElementSibling,
        par = originEle.parentNode;
    if (next) {
        //=>有弟弟插入到弟弟的前面
        par.insertBefore(newEle, next);
    } else {
        //=>没有弟弟插入到容器的末尾
        par.appendChild(newEle);
    }
}

let link = document.createElement('a');
insertAfter(link, p2);

//=>JQ:prepend 把新元素插入到指定容器的开头