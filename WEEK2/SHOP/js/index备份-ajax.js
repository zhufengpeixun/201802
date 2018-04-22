let productData = null;
let xhr = new XMLHttpRequest();//=>创建AJAX实例
xhr.open('GET', 'json/product.json', false);//=>打开一个请求的地址(一般地址都是服务器提供好的,会给我们一个API接口文档),最后一个参数是设置同步还是异步(FALSE:同步 TRUE:异步),真实项目中最常使用的是异步,我们今天为了简单使用同步
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
        productData = xhr.responseText;
    }
};
xhr.send(null);
console.log(productData);