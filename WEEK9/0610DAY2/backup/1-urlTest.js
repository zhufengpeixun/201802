let url = require('url');

// console.log(url.parse('http://www.zhufengpeixun.cn/main/guide/index.html?form=qq&lx=stu#video'));
/*
 {
      protocol: 'http:', =>协议
      slashes: true, =>是否有双斜线
      auth: null,
      host: 'www.zhufengpeixun.cn',  =>域名+端口
      port: null,  =>端口
      hostname: 'www.zhufengpeixun.cn', =>域名
      hash: '#video', =>哈希值
      search: '?form=qq&lx=stu',  =>问号传递的参数[string]
      query: 'form=qq&lx=stu',  =>问号传递的参数[string] 不包含问号
      pathname: '/main/guide/index.html',  =>请求资源的路径名称
      path: '/main/guide/index.html?form=qq&lx=stu',
      href: 'http://www.zhufengpeixun.cn/main/guide/index.html?form=qq&lx=stu#video'
  }
 */

console.log(url.parse('http://www.zhufengpeixun.cn/main/guide/index.html?form=qq&lx=stu#video', true));//=>第二个参数默认是FALSE，设置为TRUE可以把问号传参的部分也解析成为对象键值对的方式
/*
 {
    ...,
    query : { form: 'qq', lx: 'stu' },  =>和不加TRUE的区别就在QUERY上
    ...
 }
 */