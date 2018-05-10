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
            let {
                lastIndex = 0,
                eventType = 'mouseover',
                customPageClass = 'option',
                customContentClass = 'con',
                changeEnd
            } = options;
            ['lastIndex', 'eventType', 'customPageClass', 'customContentClass', 'changeEnd'].forEach(item => {
                this[item] = eval(item);//=>挂载：把每一项当做实例的私有属性设置一下即可，我们通常说是把属性挂载到实例上
                // this['lastIndex'] = eval('lastIndex');
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