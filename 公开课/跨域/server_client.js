let express = require('express'),
    app = express(),
    request = require('request');
app.listen(8000, () => {
    console.log('SERVER IS 8000!');
});

app.get('/proxy', (req, res) => {
    request('http://shequweb.sports.qq.com/message/allCount', (err, response, body) => {
        if (err) {
            res.send({
                code: 1,
                data: 'NO!'
            });
            return;
        }
        res.send({
            code: 0,
            data: body
        });
    });
});

app.use(express.static('./static'));