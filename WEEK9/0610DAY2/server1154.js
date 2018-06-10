let http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

//=>创建WEB服务
let port = 8686;
let handle = function handle(req, res) {
    //=>REQ:REQUEST 请求对象，包含了客户端请求的信息
    // req.url 存储的是请求资源的路径地址及问号传参  例如：/stu/index.html?name=xxx&age=12
    // req.method 客户端请求的方式  例如：GET
    // req.headers 客户端的请求头信息，它是一个对象
    // ...
    //=>把请求的URL地址中：路径名称 & 问号传参 分别解析出来
    // let {pathname, query} = url.parse(req.url, true);
    // console.log(pathname, query);

    //=>RES:RESPONSE 响应对象，包含了一些属性和方法，可以让服务器端返回给客户端内容
    // res.write 基于这个方法，服务器端可以向客户端返回内容
    // res.end 结束响应
    // res.writeHead 重写响应头信息
    // ...
    res.writeHead(200, {
        'content-type': 'text/plain;charset=utf-8;'
    });
    res.end(JSON.stringify({name: '哈哈哈'}));//=>服务器端返回给客户端的内容一般都是 STRING或者BUFFER格式的数据
};
http.createServer(handle).listen(port, () => {
    console.log(`server is success，listen on ${port}！`);
});