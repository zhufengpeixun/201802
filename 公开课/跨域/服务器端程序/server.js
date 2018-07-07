let express = require('express'),
    app = express();
app.listen(9000, () => {
    console.log('SERVER IS 9000!');
});
app.get('/queryInfo', (req, res) => {
    let fn = req.query.cb,//=>获取客户端传递的函数名
        data = {
            code: 0,
            msg: 'my name is zhufeng!'
        };
    res.send(`${fn}(${JSON.stringify(data)})`);//=>返回指定格式的内容：“函数名(数据)” 这种格式
});