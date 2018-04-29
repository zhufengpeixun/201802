let utils = (function () {
    //=>GET-CSS：获取某一个元素对象指定的样式属性值
    let getCss = function (ele, attr) {
        let val = null;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(ele)[attr];
            let reg = /^-?\d+(\.\d+)?(px|pt|em|rem)?$/i;
            reg.test(val) ? val = parseFloat(val) : null;
        }
        return val;
    };

    //=>SET-CSS：设置当前元素某一个样式属性的具体值
    let setCss = function (ele, attr, value) {
        !isNaN(value) && !/^(zIndex|opacity)$/i.test(attr) ? value += 'px' : null;
        ele['style'][attr] = value;
    };

    //=>SET-GROUP-CSS：给当前元素批量设置样式
    let setGroupCss = function (ele, options) {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                setCss(ele, key, options[key]);
            }
        }
    };

    //=>CSS：结合设置、批量设置、获取为一身的方法（类似于JQ中的CSS）
    let css = function (...arg) {
        //=>基于传递参数的不同,设定执行不同的函数,把函数赋值给FN
        let len = arg.length,
            fn = getCss;
        len >= 3 ? fn = setCss : null;
        len === 2 && (typeof arg[1] === 'object') ? fn = setGroupCss : null;
        //=>把设定的函数执行，不要忘记把传递给CSS的参数ARG依次传递给执行的函数，而且把执行返回的结果在CSS中返回
        return fn(...arg);
        // setGroupCss(...arg);//=>ARG:[outer,{xxx:'xxx'}]
        // setGroupCss.apply(null,arg);
    };

    //=>OFFSET：获取当前元素距离BODY的偏移值(和HTML层级以及父参照物是谁都没有太大的关系)
    let offset = function (ele) {
        let p = ele.offsetParent,
            curL = ele.offsetLeft,
            curT = ele.offsetTop;
        while (p && p.tagName !== 'BODY') {//=>TAG-NAME获取的标签名一般都是大写的，条件成立说明还没有找到BODY呢
            curL += p.clientLeft + p.offsetLeft;
            curT += p.clientTop + p.offsetTop;
            p = p.offsetParent;
        }
        return {top: curT, left: curL};
    };

    //=>WIN-HANDLE：操作浏览器的盒子模型属性，需要写两套（HTML/BODY），我们这个方法就是把兼容处理了
    let winHandle = function (attr, value) {
        if (typeof value !== 'undefined') {
            //=>我们给浏览器的某个盒模型属性设置值
            document.documentElement[attr] = value;
            document.body[attr] = value;
            return;
        }
        return document.documentElement[attr] || document.body[attr];
    };

    return {
        // css:css
        css,
        offset
    }
})();