/*
 * 封装插件
 *   1. 每一次调用插件都是独立的，互不影响的
 *   2. 一些常用的方法还要是公用的
 *
 *   调取一次插件就是创建一个独立的实例，里面的很多信息是互相不干扰的，但是对于一些操作操作方法还是共同调取一个即可（这套机制就是我们的构造函数模式中类和实例的机制），所以插件、组件、类库、框架的封装一般都是基于OOP面向对象完成的
 *
 *   3. 封装插件的目的是：可以更多适配各种需求、让用户使用起来非常的方便，所以插件封装的核心和难点都在于细节的思考和处理，而不应该局限到各种模式或者装X的代码中
 */

~function () {
    class Banner {
        constructor(options = {}) {
            //=>OPTIONS传递的配置项(解构赋值并且给更多的配置项设置默认值)
            let {
                ele,
                url,
                isArrow = true,
                isFocus = true,
                isAuto = true,
                defaultIndex = 0,
                interval = 3000,
                speed = 200,
                moveEnd
            } = options;

            //=>把所有的配置项信息都挂载到实例上(这样以后在原型的任何方法中都可以调取这些属性获取值了)
            ['ele', 'url', 'isArrow', 'isFocus', 'isAuto', 'defaultIndex', 'interval', 'speed', 'moveEnd'].forEach(item => {
                this[item] = eval(item);
            });

            this.container = document.querySelector(ele);
            let _con = this.container;
            this.wrapper = _con.querySelector('.wrapper');
            this.focus = _con.querySelector('.focus');
            this.arrowLeft = _con.querySelector('.arrowLeft');
            this.arrowRight = _con.querySelector('.arrowRight');
            this.slideList = null;
            this.focusList = null;
            this.stepIndex = defaultIndex;
            this.autoTimer = null;

            //=>调取INIT开启轮播图
            this.init();
        }

        //=>BANNER的主入口(在INIT中规划方法的执行顺序)
        init() {
            let {isAuto, interval} = this;
            let promise = this.queryData();
            promise.then(() => {
                this.bindHTML();
            }).then(() => {
                if (isAuto) {
                    this.autoTimer = setInterval(() => {
                        this.autoMove();
                    }, interval);
                }
            });
        }

        //=>获取数据(PROMISE)
        queryData() {
            let {url} = this;
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest;
                xhr.open('GET', url);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        //=>把获取的数据也挂载到实例上了
                        this.data = JSON.parse(xhr.responseText);
                        resolve();
                    }
                };
                xhr.send(null);
            });
        }

        //=>数据绑定
        bindHTML() {
            let {data, wrapper, focus, slideList, focusList} = this;
            let strSlide = ``,
                strFocus = ``;
            data.forEach((item, index) => {
                let {img = 'img/banner1.jpg', desc = '珠峰培训'} = item;
                strSlide += `<div class="slide">
                    <img src="${img}" alt="${desc}">
                </div>`;
                strFocus += `<li class="${index === 0 ? 'active' : ''}"></li>`;
            });
            wrapper.innerHTML = strSlide;
            focus.innerHTML = strFocus;

            //->获取所有的SLIDE和LI
            this.slideList = wrapper.querySelectorAll('.slide');
            this.focusList = focus.querySelectorAll('li');
            wrapper.appendChild(this.slideList[0].cloneNode(true));
            this.slideList =wrapper.querySelectorAll('.slide');
            utils.css(wrapper, 'width', this.slideList.length * 1000);
        };

        //=>自动轮播
        autoMove() {
            this.stepIndex++;
            if (this.stepIndex >= this.slideList.length) {
                utils.css(this.wrapper, 'left', 0);
                this.stepIndex = 1;
            }
            //->基于自主封装的ANIMATE实现切换动画
            animate(this.wrapper, {
                left: -this.stepIndex * 1000
            }, this.speed);
            this.changeFocus();
        };

        changeFocus() {
            let tempIndex = this.stepIndex;
            tempIndex === this.slideList.length - 1 ? tempIndex = 0 : null;
            [].forEach.call(this.focusList, (item, index) => {
                item.className = index === tempIndex ? 'active' : '';
            });
        };
    }

    window.Banner = Banner;
}();


//=>一个优秀的插件是尽可能支持更多的配置项（大部分配置项都是有默认值的）
// new Banner({
//     ele: '#container', //=>操作哪个容器(选择器)
//     // data: [], //=>需要绑定的数据
//     url: '',//=>获取数据的API地址(插件内部帮我们获取数据)
//     isArrow: true,//=>是否支持左右切换
//     isFocus: true,//=>是否支持焦点切换
//     isAuto: true,//=>是否支持自动切换
//     defaultIndex: 0,//=>默认展示第几张
//     interval: 3000,//=>多久切换一次
//     speed: 200,//=>切换的速度
//     moveEnd:()=>{},//=>切换完成后处理的事情
//     ...
// });

//=>支持扩展，可以让用户自己在你的插件中扩展方法
// Banner.fn.extend({xxx:()=>{}})
// ...
