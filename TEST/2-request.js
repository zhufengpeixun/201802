let request = require('request');
request('http://shequweb.sports.qq.com/message/allCount', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
});