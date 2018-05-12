let smallBox = document.querySelector('.smallBox'),
    bigBox = document.querySelector('.bigBox'),
    bigImg = bigBox.querySelector('img'),
    mark = null;

//=>鼠标划入:创建MARK
smallBox.onmouseenter = function () {
    if (!mark) {
        mark = document.createElement('div');
        mark.className = 'mark';
        this.appendChild(mark);

        bigBox.style.display = 'block';
    }
};

//=>鼠标移动:让MARK也跟着移动
//1.SMALL-BOX的父级参照物是BODY(如果不是BODY，我们就需要基于OFFSET方法获取它距离BODY的偏移了)
//2.鼠标处于MARK盒子中间的位置(随时计算出MARK盒子的TOP/LEFT即可)
//3.做边界判断(MARK不能移动出SMALL-BOX里面)
smallBox.onmousemove = function (ev) {
    if (!mark) return;
    //=>鼠标在盒子中间计算的LEFT/TOP
    let curL = ev.pageX - smallBox.offsetLeft - mark.offsetWidth / 2,
        curT = ev.pageY - smallBox.offsetTop - mark.offsetHeight / 2;
    //=>计算出来的值不能超过边界
    let minL = 0,
        minT = 0,
        maxL = smallBox.offsetWidth - mark.offsetWidth,
        maxT = smallBox.offsetHeight - mark.offsetHeight;
    curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
    curT = curT < minT ? minT : (curT > maxT ? maxT : curT);
    //=>给MARK赋值样式,让其移动到指定的位置
    mark.style.left = curL + 'px';
    mark.style.top = curT + 'px';

    //=>MARK移动多少,BIG-IMG向其相反的方向移动3.5倍
    bigImg.style.left = -curL * 3.5 + 'px';
    bigImg.style.top = -curT * 3.5 + 'px';
};

//=>鼠标离开:移除MARK
smallBox.onmouseleave = function () {
    if (mark) {
        this.removeChild(mark);//=>从页面中移除MARK，但是此时MARK变量还存储者之前的值呢(页面中移除是DOM操作,但是MARK是JS变量,没啥关系)
        mark = null;//=>手动赋值为NULL,代表MARK已经不存在了

        bigBox.style.display = 'none';
    }
};