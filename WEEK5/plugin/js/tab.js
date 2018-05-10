// let tabBox = document.querySelector('#tabBox'),
//     option = tabBox.querySelector('.option'),
//     con = tabBox.querySelectorAll('.con');//=>querySelectorAll:是从当前上下文的所有后代元素中按照选择器规则进行筛选(而我们想要的是儿子中筛选)

//=>检测当前元素中是否包含某一个样式类名
let hasClass = (ele, str) => ele.className.trim().split(/ +/).indexOf(str) >= 0;

//=>给当前元素增加样式类名
let addClass = (ele, str) => {
    let isExit = hasClass(ele, str);
    if (isExit) return;//=>已经有这个样式类了，那么什么都没必要搞了
    ele.className += ` ${str}`;
};

//=>给当前元素移除样式类名
let removeClass = (ele, str) => {
    let isExit = hasClass(ele, str);
    if (!isExit) return;//=>不存在这个样式类，那还搞啥!
    let ary = ele.className.trim().split(/ +/);
    ary = ary.filter(item => item !== str);
    ele.className = ary.join(' ');
};

// let hasClass = function hasClass(ele, strClass) {
//     //1.首先获取ELE的现有的样式类名
//     let curClass = ele.className;
//     //2.把现有的样式类拆分成一个数组
//     let ary = curClass.trim().split(/ +/);
//     //3.验证数组中是否包含这一项即可
//     return ary.indexOf(strClass) >= 0;
// };

//=>获取需要的元素（精准获取）
let tabBox = document.querySelector('#tabBox'),
    childAry = [].slice.call(tabBox.children),
    option = null,
    optionList = null,
    conList = null;
/*option = childAry.filter((item, index) => {
    //=>我们不能直接用INDEX-OF检测当前元素中是否包含某一个样式类，因为INDEX-OF是只要包含这几个字符即可，我们需要是样式类名是完整的
    if (item.className.indexOf('option') >= 0) {
        return true;
    }
});*/
option = childAry.filter(item => hasClass(item, 'option'));
option = option.length > 0 ? option[0] : null;
optionList = [].filter.call(option.children, item => item.tagName === 'LI');
conList = childAry.filter(item => hasClass(item, 'con'));

//=>给获取的LI进行事件绑定
let lastIndex = 0;//=>上一个选择的索引
optionList.forEach((item, index) => {
    item.onmouseover = function anonymous() {
        if (lastIndex === index) return;
        //=>this:当前操作的LI
        //=>index:当前操作LI的索引
        addClass(this, 'active');
        removeClass(optionList[lastIndex], 'active');

        addClass(conList[index], 'active');
        removeClass(conList[lastIndex], 'active');

        lastIndex = index;
    };
});