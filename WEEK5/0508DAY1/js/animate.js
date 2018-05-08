//=>UTILS操作CSS工具库
let utils = (function () {
    //=>获取样式
    let getCss = (ele, attr) => {
        let val = null,
            reg = /^-?\d+(\.\d+)?(px|rem|em)?$/;
        if ('getComputedStyle' in window) {
            val = window.getComputedStyle(ele)[attr];
            if (reg.test(val)) {
                val = parseFloat(val);
            }
        }
        return val;
    };

    //=>设置样式
    let setCss = (ele, attr, value) => {
        if (!isNaN(value)) {
            if (!/^(opacity|zIndex)$/.test(attr)) {
                value += 'px';
            }
        }
        ele['style'][attr] = value;
    };

    //=>批量设置样式
    let setGroupCss = (ele, options) => {
        for (let attr in options) {
            if (options.hasOwnProperty(attr)) {
                setCss(ele, attr, options[attr]);
            }
        }
    };

    //=>合并为一个
    let css = (...arg) => {
        let len = arg.length,
            fn = getCss;
        if (len >= 3) {
            fn = setCss;
        }
        if (len === 2 && typeof arg[1] === 'object') {
            fn = setGroupCss;
        }
        return fn(...arg);
    };

    //=>EACH：遍历对象、数组、类数组
    let each = (obj, callback) => {
        if ('length' in obj) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i],
                    res = callback && callback.call(item, i, item);
                if (res === false) {
                    break;
                }
            }
            return;
        }
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                let item = obj[attr],
                    res = callback && callback.call(item, attr, item);
                if (res === false) {
                    break;
                }
            }
        }
    };

    return {css, each}
})();

//=>ANIMATE动画库
~function () {
    //=>匀速运动公式
    let effect = {
        Linear: (t, b, c, d) => t / d * c + b
    };

    //=>开始运动
    window.animate = function animate(ele, target, duration = 1000, callback) {
        //=>参数处理(传递三个值,第三个值是函数,其实本身想要代表的意思：第三个是回调函数，总时间是默认值即可)
        if (typeof duration === 'function') {
            callback = duration;
            duration = 1000;
        }

        //=>准备数据
        let time = 0,
            begin = {},
            change = {};
        utils.each(target, (key, value) => {
            begin[key] = utils.css(ele, key);
            change[key] = value - begin[key];
        });

        //=>设置新动画之前清除原有正在运行的动画
        clearInterval(ele.animateTimer);
        ele.animateTimer = setInterval(() => {
            time += 17;
            //->动画结束
            if (time >= duration) {
                clearInterval(ele.animateTimer);
                utils.css(ele, target);
                callback && callback.call(ele);
                return;
            }
            //->获取每个方向的当前位置，并且给元素设置
            utils.each(target, (key, value) => {
                let cur = effect.Linear(time, begin[key], change[key], duration);
                utils.css(ele, key, cur);
            });
        }, 17);
    };
}();