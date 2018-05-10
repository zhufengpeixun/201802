/*
 * 插件封装
 *   1.体现了封装的思想
 *   2.尽可能让用户操作简单，但是可以实现非常完善的效果（支持更多种业务可能）
 */
~function anonymous(window) {

    class TabPlugin {
        constructor(container, options = {}) {
            //=>第一个参数必传，而且传递的还需要是元素对象，如果匹配直接抛出异常信息，不让继续执行了（参数合法性验证）
            if (typeof container === 'undefined' || container.nodeType !== 1) {
                throw new SyntaxError('The first parameter is the item that must be passed, and it must be an element object type!');
            }

            //=>参数初始化（初始化配置项）：把处理好的参数配置项尽可能的挂载到当前类的实例上，成为实例的私有属性，这样不仅在公共或者私有方法中直接可以获取使用，而且也保证每一个实例之间这些属性是不冲突的
            let _default = {
                lastIndex: 0,
                eventType: 'mouseover',
                customPageClass: 'option',
                customContentClass: 'con',
                changeEnd: null
            };
            for (let attr in options) {
                if (options.hasOwnProperty(attr)) {
                    _default[attr] = options[attr];//=>把OPTIONS传递进来的信息值覆盖_DEFAULT，此时_DEFAULT中存储的就是最新值
                }
            }
            for (let attr in _default) {
                if (_default.hasOwnProperty(attr)) {
                    this[attr] = _default[attr];
                }
            }

            //=>获取需要操作的元素，把获取的元素也挂载到实例上
            this.container = container;
            let childs = [...container.children],
                option = null;
            option = childs.find(item => this.hasClass(item, this.customPageClass));
            this.optionList = option ? [...option.children] : [];
            this.conList = childs.filter(item => this.hasClass(item, this.customContentClass));

            //=>让个LAST-INDEX对应项有选中样式，其余项没有选中样式
            this.optionList.forEach((item, index) => {
                if (index === this.lastIndex) {
                    this.addClass(this.optionList[index], 'active');
                    this.addClass(this.conList[index], 'active');
                    return;
                }
                this.removeClass(this.optionList[index], 'active');
                this.removeClass(this.conList[index], 'active');
            });

            //=>实现选项卡
            this.changeTab();
        }

        /*==把公共方法挂载到类的原型上==*/
        hasClass(ele, str) {
            return ele.className.trim().split(/ +/).indexOf(str) >= 0;
        }

        addClass(ele, str) {
            //=>hasClass()不能直接调取，需要基于实例调取使用(或者直接基于类来调取使用也可以 TabPlugin.prototype.hasClass())
            if (this.hasClass(ele, str)) return;
            ele.className += ` ${str}`;
        }

        removeClass(ele, str) {
            if (!this.hasClass(ele, str)) return;
            ele.className = ele.className.trim().split(/ +/).filter(item => item !== str).join(' ');
        }

        changeTab() {
            this.optionList.forEach((item, index) => {
                //=>THIS:实例
                let _this = this;
                item[`on${this.eventType}`] = function anonymous() {
                    //=>THIS:当前操作的LI
                    if (_this.lastIndex === index) return;
                    _this.addClass(this, 'active');
                    _this.removeClass(_this.optionList[_this.lastIndex], 'active');

                    _this.addClass(_this.conList[index], 'active');
                    _this.removeClass(_this.conList[_this.lastIndex], 'active');

                    _this.lastIndex = index;

                    //=>切换完成后执行传递进来的回调函数（回调函数中的THIS是当前类的实例，把当前切换这一项索引和上一项的索引传递给回调函数，还把当前操作的LI以及操作的CON也都传给回调函数了）
                    _this.changeEnd && _this.changeEnd(this, _this.conList[index], index, _this.lastIndex);
                };
            });
        }
    }

    window.TabPlugin = TabPlugin;
}(window);
// new TabPlugin([container], [options配置项对象]);

/*
 * 不确定项
 *   1.哪个容器实现选项卡
 *   2.默认选中项（参考值：0 第一个选中）
 *   3.切换的事件类型（参考值：mouseover 鼠标滑过切换）
 *   4.可以自定义页卡区域的样式类和内容区域的样式类（参考值：option/con）
 *   5.支持钩子函数(生命周期函数)，例如：我们可以支持切换完成后做什么事，你只需要传递给我一个回调函数，在内部插件每一次切换完成后，我把传递的回调函数执行
 *   ...
 */