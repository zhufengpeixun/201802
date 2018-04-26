//=>公共方法库:项目中常用的一些方法,我们都封装到这里
let utils = (function () {
    //=>获取元素的样式
    let getCss = function (curEle, attr) {
        if (typeof window.getComputedStyle === 'undefined') {
            return;
        }
        let val = window.getComputedStyle(curEle, null)[attr],
            reg = /^-?\d+(\.\d+)?(px|rem|em|pt)?$/i;
        reg.test(val) ? val = parseFloat(val) : null;
        return val;
    };

    //=>设置元素样式
    let setCss = function (curEle, attr, value) {
        if (attr === 'opacity') {
            curEle.style.opacity = value;
            curEle.style.filter = `alpha(opacity=${value * 100})`;
            return;
        }
        if (!isNaN(value)) {
            let reg = /^(width|height|fontSize|((margin|padding)?(top|left|right|bottom)?))$/i;
            reg.test(attr) ? value += 'px' : null;
        }
        curEle['style'][attr] = value;
    };

    //=>批量设置元素样式
    let setGroupCss = function (curEle, options = {}) {
        for (let attr in options) {
            if (!options.hasOwnProperty(attr)) break;
            setCss(curEle, attr, options[attr]);
        }
    };

    //=>CSS操作汇总
    let css = function (...arg) {
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && (arg[1] instanceof Object) ? fn = setGroupCss : null;
        return fn(...arg);
    };

    //=>offset：获取当前元素距离BODY的偏移(左偏移和上偏移)
    let offset = function (curEle) {
        //1.先获取当前元素本身的左/上偏移
        let curLeft = curEle.offsetLeft,
            curTop = curEle.offsetTop,
            p = curEle.offsetParent;

        //2.累加父参照物的边框和偏移(一直向上找,找到BODY为止,每当找到一个父参照物都把它的边框和偏移累加起来,根据元素不一样,具体找几次也不知道)
        //TAG-NAME获取当前元素的标签名(大写的)
        while (p.tagName !== 'BODY') {//=>当找到的父参照物是BODY结束查找和累加操作
            //3.把找到的父参照物的边框和偏移值累加起来
            curLeft += p.clientLeft;
            curLeft += p.offsetLeft;
            curTop += p.clientTop;
            curTop += p.offsetTop;
            p = p.offsetParent;//=>基于当前找到的父参照物继续向上查找
        }

        return {
            top: curTop,
            left: curLeft
        };
    };

    //=>操作浏览器盒子模型属性的
    let winHandle = function (attr, value) {
        if (typeof value !== 'undefined') {
            //=>设置盒子模型属性值:SCROLL-TOP/LEFT
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };

    return {
        css, //=>在ES6中直接这样写相当于 css:css
        offset,
        winHandle
    }
})();