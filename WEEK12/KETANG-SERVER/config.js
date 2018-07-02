module.exports = {
    //=>WEB服务端口号
    PORT: 8000,

    //=>CROS跨域相关信息
    CROS: {
        ALLOW_ORIGIN: 'http://localhost:3000',//=>客户端的WEB地址和端口
        ALLOW_METHODS: 'PUT,POST,GET,DELETE,OPTIONS',
        HEADERS: 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With',
        CREDENTIALS: true
    },

    //=>SESSION存储相关信息
    session: {
        secret: 'ZFPX',
        saveUninitialized: false,
        resave: false,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
    }
};