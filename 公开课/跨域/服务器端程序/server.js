let express = require('express'),
    app = express(),
    session = require('express-session');
app.listen(9000, () => {
    console.log('SERVER IS 9000!');
});
//=>基于CORS设置允许跨域请求
app.use((req, res, next) => {
    //=>允许哪些源可以向这个服务发送AJAX请求（通配符是允许所有的源，也可以单独设置某个源 "http://localhost:8000/"这样就是只允许8000服务过来请求） =>不使用通配符是为了保证接口和数据的安全，不能让所有的源都能访问；而且一旦设置了允许携带凭证过来，则设置*会被报错，此时只能设置具体的源！只能设置单一一个允许访问的源！
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");

    //=>是否允许跨域的时候携带凭证（例如：COOKIE就是凭证的一种，设置为FALSE，客户端和服务器之间不会传递COOKIE，这样SESSION存储就实效了）
    res.header("Access-Control-Allow-Credentials", true);

    //=>允许的请求头部
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization, Accept,X-Requested-With");

    //=>允许的请求方式（OPTIONS一定要有）
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,HEAD,OPTIONS");

    //=>设置OPTIONS请求目的：我们把这个请求当做一个试探性请求，当客户端需要向服务器发送请求的时候，首先发送一个OPTIONS请求，服务器接收到是OPTIONS请求后，看一下是否允许跨域，允许返回成功，如果服务器不允许跨域，则客户端会出现跨域请求不允许的错误；如果客户端检测到不允许跨域，则后续的请求都不在进行!  =>客户端AXIOS框架就是这样处理的
    if (req.method === 'OPTIONS') {
        res.send('OK!');
        return;
    }

    next();
});

//=>设置SESSION
app.use(session({
    secret: 'ZFPX',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.post('/queryInfo', (req, res) => {
    req.session.ID = 0;
    res.send({
        code: 0,
        msg: 'my name is zhufeng!'
    });
});