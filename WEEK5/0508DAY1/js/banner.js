/*
 * 轮播图思路：
 *   1.基于单例模式完成
 *   2.实现具体的业务需求
 *    1)获取需要操作的DOM元素(container/wrapper/focus/arrowLeft/arrowRight/slideList/focusList，slideList和focusList只有数据绑定成功才可以获取)
 *    2)获取数据：编写一个queryData的方法，在方法中返回一个Promise实例，在Promise中基于AJAX发送一个异步请求的获取数据操作，获取到数据后，执行resolve把获取的数据传递给它
 *      ->创建ajax对象
 *      ->OPEN（请求方式和请求地址）
 *      ->监听状态改变事件，成功状态下获取到需要的数据（获取的数据是json格式的字符串，我们需要转换为对象）
 *      ->发送AJAX请求
 *    3)基于返回的promise实例，通过then的方式，规划出异步请求成功后做的事情，首先要做的事情就是数据绑定：迭代获取的数据，有多少数据，我们循环多少次，把需要的SLIDE/FOCUS中的LI进行字符串拼接，把拼接后的结果插入到对应的容器中
 *      ->重新获取slideList/focusList
 *      ->为了实现无缝衔接，把SLIDE中的第一个克隆一份放到WRAPPER的末尾，别忘记插入完成后，需要重新获取slideList
 *      ->根据SLIDE的个数动态计算WRAPPER的宽度
 *    4)绑定完成数据后，依然是基于Promise的then在规划下一步任务，也就是让轮播图自动轮播：首先准备stepIndex记录当前展示SLIDE的索引，准备interval记录多久切换一次，准备speed控制每一次切换动画运动的时间，准备autoTimer存储自动轮播的定时器
 *      ->设置一个定时器，开启自动轮播（执行autoMove）
 *      ->在autoMove方法中，让stepIndex累加，根据当前累加后的索引，让WRAPPER的LEFT值改变为对应的值（实现轮播图切换：注意有切换动画）
 *      ->但是需要做边界判断：如果累加后的索引比最大的索引（克隆的第一张）都大了，说明后面没有图片了，此时我们让WRAPPER快速定位到第一张的位置（LEFT=0），然后让索引变为1，运动到第二张的位置即可（实现无缝切换的原理）
 *    5)在自动轮播图过程中，我们需要完成焦点对齐
 *      ->根据当前展示的SLIDE索引，让对应的焦点LI有选中的样式（依次迭代所有的LI做判断即可：根据临时定义的变量来做判断）
 *      ->当索引为最后克隆那一张的时候，我们需要让第一个LI有选中样式（我们可以定义一个临时的变量存储索引值，当原始SLIDE索引已经是最后一个的时候，我们让临时变量等于零即可）
 *    6)自动轮播图完成后基于then继续规划任务：首先实现鼠标进入或者移除CONTAINER的时候，让左右按钮显示隐藏，并且进入的时候清除自动轮播图的定时器（结束动画），离开的时候重新设置自动轮播的定时器即可
 *    7)点击焦点实现切换：迭代所有的LI，为其绑定点击事件，当即某一个LI的时候，修改stepIndex的值为对应的索引，并且基于animate动画方法让WRAPPER运动到执定的位置，并且焦点对齐
 *    8)点击左右按钮切换：
 *      ->点击右侧按钮实现的效果和自动轮播的autoMove一样，所以点击的时候执行autoMove即可
 *      ->点击左侧按钮
 *        让stepIndex减减
 *        让WRAPPER运动到指定的位置（动画）
 *        边界判断：当stepIndex减减后已经小于0了，说明左侧无图片了（当前正在第一张），此时我们WRAPPER快读蹦到最后一张（克隆的第一张）位置，然后让stepIndex等于倒数第二张的索引，然后运动到这个位置即可
 */
let bannerRender = (function () {
    let container = document.querySelector('#container'),
        wrapper = container.querySelector('.wrapper'),
        focus = container.querySelector('.focus'),
        arrowLeft = container.querySelector('.arrowLeft'),
        arrowRight = container.querySelector('.arrowRight');
    let slideList = null,
        focusList = null;
    let autoTimer = null,
        stepIndex = 0,
        interval = 2000,
        speed = 200;

    //=>获取数据
    let queryData = function queryData() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest;
            xhr.open('GET', 'json/banner.json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText)
                    resolve(data);
                }
            };
            xhr.send(null);
        });
    };

    //=>绑定数据
    let bindHTML = function bindHTML(data) {
        let strSlide = ``,
            strFocus = ``;
        data.forEach((item, index) => {
            let {img = 'img/banner1.jpg', desc = 'xxx'} = item;
            strSlide += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
            strFocus += `<li class="${index === 0 ? 'active' : ''}"></li>`;
        });

        wrapper.innerHTML = strSlide;
        focus.innerHTML = strFocus;

        slideList = wrapper.querySelectorAll('.slide');
        focusList = focus.querySelectorAll('li');

        wrapper.appendChild(slideList[0].cloneNode(true));
        slideList = wrapper.querySelectorAll('.slide');

        utils.css(wrapper, 'width', slideList.length * 1000);
    };

    //=>自动轮播
    let autoMove = function () {
        stepIndex++;
        if (stepIndex > (slideList.length - 1)) {
            utils.css(wrapper, 'left', 0);
            stepIndex = 1;
        }
        animate(wrapper, {
            left: -stepIndex * 1000
        }, speed);
        changeFocus();
    };

    //=>焦点对齐
    let changeFocus = function () {
        let tempIndex = stepIndex;
        if (tempIndex === slideList.length - 1) {
            tempIndex = 0;
        }
        [].forEach.call(focusList, (item, index) => {
            item.className = index === tempIndex ? "active" : "";
        });
    };

    //=>鼠标进入和离开控制自动轮播
    let handleContainer = function () {
        container.onmouseenter = function () {
            clearInterval(autoTimer);
            arrowLeft.style.display = arrowRight.style.display = 'block';
        }
        container.onmouseleave = function () {
            autoTimer = setInterval(autoMove, interval);
            arrowLeft.style.display = arrowRight.style.display = 'none';
        }
    }

    //=>焦点切换
    let handleFocus = function () {
        [].forEach.call(focusList, (item, index) => {
            item.onclick = function () {
                //=>扩展：还需要做一个处理，如果当前展示的是最后一个SLIDE，我们应该让其立即运动到真实的第一个SLIDE，然后再按照点击的索引进行切换（防止当前处于最后克隆的那一张，点击某一个索引是向回拉的运动）
                //=>扩展：如果当前点击的LI索引和展示的SLIDE是同一个，不需要执行动画（因为正展示这一张，没必要处理）
                stepIndex = index;
                animate(wrapper, {left: -stepIndex * 1000}, speed);
                changeFocus();
            }
        });
    };

    //=>左右切换
    let handleArrow = function handleArrow() {
        arrowRight.onclick = autoMove;
        arrowLeft.onclick = function () {
            stepIndex--;
            if (stepIndex < 0) {
                utils.css(wrapper, 'left', -(slideList.length - 1) * 1000);
                stepIndex = slideList.length - 2;
            }
            animate(wrapper, {left: -stepIndex * 1000}, speed);
            changeFocus();
        }
    };

    return {
        init: function init() {
            let promise = queryData();
            promise.then(bindHTML).then(() => {
                autoTimer = setInterval(autoMove, interval);
            }).then(() => {
                handleContainer();
                handleFocus();
                handleArrow();
            });
        }
    }
})();
bannerRender.init();