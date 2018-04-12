var oBox = document.getElementById('box'),
    divList = oBox.getElementsByTagName('div');

/*
 * 1.首先获取当前文档中所有的HTML标签
 * 2.依次遍历这些元素标签对象，谁的ID等于HAHA，我们就把谁存储起来即可
 */
function queryAllById(id) {
    //->基于通配符*获取到整个文档中所有的HTML标签
    var nodeList = document.getElementsByTagName('*');

    //->遍历集合中的每一项，把元素ID和传递ID相同的这一项存储起来
    var ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var item = nodeList[i];
        item.id === id ? ary.push(item) : null;
    }
    return ary;
}
console.log(HAHA);/*在JS中，默认会把元素的ID设置为变量（不需要在即获取设置），而且ID重复，获取的结果就是一个集合，包含所有ID项，不重复就是一个元素对象（类似于ById获取的结果）*/