let httpsRequest = require('https-request'),
    options = {
        hostname: 'news-at.zhihu.com',
        path: '/api/4/news/latest'
    };
//=>https://www.zhihu.com/api/v3/explore/guest/feeds?limit=40
httpsRequest(options, null, null, function (err, data) {
    if (!err) {
        console.log(data);
    } else {
        console.log(err);
    }
});
