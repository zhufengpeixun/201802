let ENV = process.env.NODE_ENV;
if (ENV === '1') {
    console.log('我是开发环境');
}
if (ENV === '2') {
    console.log('我是生产环境');
}
if (ENV === '3') {
    console.log('我是测试环境');
}