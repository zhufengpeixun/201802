let bannerRender = (function () {
    //->获取后续需要操作的元素对象或者元素集合
    let container = document.querySelector('#container'),
        wrapper = container.querySelector('.wrapper'),
        focus = container.querySelector('.focus'),
        arrowLeft = container.querySelector('.arrowLeft'),
        arrowRight = container.querySelector('.arrowRight'),
        slideList = null,
        focusList = null;

    //=>轮播图运动的基础参数
    let stepIndex = 0,//=>STEP-INDEX记录当前展示块的索引(步长)
        autoTimer = null,//=>AUTO-TIMER自动轮播的定时器
        interval = 1000;//=>INTERVAL间隔多长时间自动切换一次

    //=>AUTO-MOVE：控制轮播图的运动和切换
    /*
     * 索引为1，展示第二张，WRAPPER的LEFT -1000
     * 索引为2，展示第三张，WRAPPER的LEFT -2000
     * ...
     * WRAPPER的LEFT值其实就是当前要展示的图片索引对应的结果：-索引*1000
     */
    let autoMove = function autoMove() {
        stepIndex++;
        if (stepIndex >= slideList.length) {
            stepIndex = 0;
        }
        //->基于自主封装的ANIMATE实现切换动画
        animate(wrapper, {
            left: -stepIndex * 1000
        }, 200);//=>200是从当前切换到下一张的动画时间 INTERVAL间隔多久切换一次
    };


    //=>QUERY-DATA:获取数据
    let queryData = function queryData() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open('GET', 'json/banner.json');//=>第三个参数不写或者写TRUE都是异步编程
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    resolve(data);
                }
            };
            xhr.send(null);
        });
    };

    //=>BIND-HTML：数据绑定
    let bindHTML = function bindHTML(data) {
        let strSlide = ``,
            strFocus = ``;
        data.forEach((item, index) => {
            //->解构的时候如果当前返回的数据中没有IMG,我们可以让其等于默认图片
            let {img = 'img/banner1.jpg', desc = '珠峰培训'} = item;
            strSlide += `<div class="slide">
                <img src="${img}" alt="${desc}">
            </div>`;

            //->ES6模板字符串中${}存放的是JS表达式,但是需要表达式有返回值,因为我们要把这个返回值拼接到模板字符串中
            strFocus += `<li class="${index === 0 ? 'active' : ''}">
                
            </li>`;
        });
        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;

        //->获取所有的SLIDE和LI
        slideList = wrapper.querySelectorAll('.slide');
        focusList = focus.querySelectorAll('li');

        //->根据SLIDE的个数动态计算WRAPPER的宽度
        utils.css(wrapper, 'width', slideList.length * 1000);
    };

    return {
        init: function init() {
            let promise = queryData();
            promise.then(bindHTML).then(() => {
                //=>开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove, interval);
            });
        }
    }
})();
bannerRender.init();