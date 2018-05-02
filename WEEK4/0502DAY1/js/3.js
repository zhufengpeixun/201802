let $attr = (domID, name, value) => {
    //1.先获取当前页面中所有的标签
    let tagList = document.getElementsByTagName('*');

    //2.在获取的所有标签中按照ID/NAME/VALUE进行筛选（数组内置方法：filter）
    tagList = [].slice.call(tagList);//=>把类数组转换为数组
    //=> tagList=[...tagList] 基于ES6中的展开运算符完成，让TAG-LIST等于一个数组，数组中的每一项是把之前的类数组展开后得到的
    tagList = tagList.filter(item => {
        //=>item.name:只有表单元素这样才可以获取到值,普通元素需要基于getAttribute获取值
        // return item.id === domID && item.getAttribute('name') === name && (item.innerHTML === value || item.value === value);//=>传统标签获取里面的内容不是基于VALUE属性，而是基于INNER-HTML/INNER-TEXT属性完成的

        return item.id === domID && item.getAttribute(name) === value;
    });
    return tagList;
};
console.log($attr('hobbyBox', 'hobby', 'music'));

// let ary = [12, 23, 34, 25, 36, 47];
// ary = ary.filter((item, index) => {
//     return item > 20 && item < 40;//=>返回的结果是TRUE或者FALSE，返回的是TRUE会把这一项存放到新数组中（基于FILTER不会修改原有的数组，会把遍历后符合条件的放到新数组中）
// });

//=>扩展：获取当前页面中所有ID重复的元素








