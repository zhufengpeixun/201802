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
        interval = 3000;//=>INTERVAL间隔多长时间自动切换一次

    //=>AUTO-MOVE：控制轮播图的运动和切换
    /*
     * 索引为1，展示第二张，WRAPPER的LEFT -1000
     * 索引为2，展示第三张，WRAPPER的LEFT -2000
     * ...
     * WRAPPER的LEFT值其实就是当前要展示的图片索引对应的结果：-索引*1000
     */
    let autoMove = function autoMove() {
        stepIndex++;
        if (stepIndex >= slideList.length) {//=>stepIndex>(slideList.length-1)
            //=>说明再往后切换没有了（现在展示的是克隆的第一张），此时我们让WRAPPER立即回到真实第一张的位置(LEFT=0)，然后STEP-INDEX=1（这样可以切换到第二张）
            utils.css(wrapper, 'left', 0);
            stepIndex = 1;
        }
        //->基于自主封装的ANIMATE实现切换动画
        animate(wrapper, {
            left: -stepIndex * 1000
        }, 200);//=>200是从当前切换到下一张的动画时间 INTERVAL间隔多久切换一次

        //->每一次运动完成需要让焦点跟着切换
        changeFocus();
    };

    //=>CHANGE-FOCUS：让焦点跟着轮播图的切换而切换
    //（运动到克隆这一张的时候，也需要让第一个LI有选中的样式）
    let changeFocus = function changeFocus() {
        //=>当轮播图运动到最后一张(克隆的第一张,我们需要让第一个LI[索引0]有选中的样式)（之所以使用TEMP-INDEX是因为STEP-INDEX对轮播图的切换有很大作用，不能轻易修改）
        let tempIndex = stepIndex;
        tempIndex === slideList.length - 1 ? tempIndex = 0 : null;
        [].forEach.call(focusList, (item, index) => {
            item.className = index === tempIndex ? 'active' : '';
        });
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

        //=>把第一张克隆一份放到最末尾
        // strSlide += `<div class="slide">
        //     <img src="${data[0].img}" alt="${data[0].desc}">
        // </div>`;

        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;

        //->获取所有的SLIDE和LI
        slideList = wrapper.querySelectorAll('.slide');
        focusList = focus.querySelectorAll('li');

        //->把现有的第一张克隆一份放到容器的末尾（由于querySelectorAll不存在DOM映射，新增加一个原有集合中还是之前的SLIDE，所以我们需要重新获取一遍）
        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList = wrapper.querySelectorAll('.slide');

        //->根据SLIDE的个数动态计算WRAPPER的宽度
        utils.css(wrapper, 'width', slideList.length * 1000);
    };

    //=>HANDLE-CONTAINER：鼠标进入和离开控制自动的轮播的停止和开启
    let handleContainer = function handleContainer() {
        container.onmouseenter = function () {
            clearInterval(autoTimer);
            arrowLeft.style.display = arrowRight.style.display = 'block';
        };
        container.onmouseleave = function () {
            autoTimer = setInterval(autoMove, interval);
            arrowLeft.style.display = arrowRight.style.display = 'none';
        };
    };

    //=>HANDLE-FOCUS：点击焦点实现切换
    let handleFocus = function handleFocus() {
        [].forEach.call(focusList, (item, index) => {
            item.onclick = function () {
                stepIndex = index;//=>点击的是谁，就让STEP-INDEX运动到哪（STEP-INDEX和点击LI的索引一致即可）
                animate(wrapper, {
                    left: -stepIndex * 1000
                }, 200);
                changeFocus();
            };
        });
    };

    //=>HANDLE-ARROW：给两个按钮绑定点击事件
    let handleArrow = function handleArrow() {
        arrowRight.onclick = autoMove;//=>点击右边的按钮和自动轮播是一样的(执行AUTO-MOVE即可实现效果)

        arrowLeft.onclick = function () {
            stepIndex--;
            //=>如果索引减减小于零，说明当前已经是第一张，不能在向右运动了，此时我们让WRAPPER瞬间移动到最后一张（最后一张和第一张一模一样），在让其运动到倒数第二张即可
            if (stepIndex < 0) {
                utils.css(wrapper, 'left', -(slideList.length - 1) * 1000);
                stepIndex = slideList.length - 2;
            }
            animate(wrapper, {
                left: -stepIndex * 1000
            }, 200);
            changeFocus();
        };
    };

    return {
        init: function init() {
            let promise = queryData();
            promise.then(bindHTML).then(() => {
                //=>开启定时器驱动的自动轮播
                autoTimer = setInterval(autoMove, interval);
            }).then(() => {
                //=>左右按钮或者焦点切换
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();
bannerRender.init();