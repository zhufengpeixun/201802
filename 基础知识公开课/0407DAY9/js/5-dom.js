function queryURLParameter(str) {
    //1.创建一个A标签,把需要解析的地址当做A标签的HREF赋值
    var link = document.createElement('a');
    link.href = str;
    //=>页面中不需要展示A,我们只是想要利用它的属性而已,所以无需添加到页面中

    //2.A元素对象的HASH/SEARCH两个属性分别存储了哈希值和参数值
    var search = link.search.substr(1),
        hash = link.hash.substr(1);

    //3.分别解析出HASH和参数即可
    var obj = {};
    hash ? obj.HASH = hash : null;
    if (search) {
        //->先按照&进行拆分
        search = search.split('&');
        for (var i = 0; i < search.length; i++) {
            var itemAry = search[i].split('=');
            obj[itemAry[0]] = itemAry[1];
        }
    }
    return obj;
}

var str = "http://www.zhufengpeixun.cn/stu?lx=1&name=AA&age=20#teacher";
console.log(queryURLParameter(str));