let express = require('express'),
    app = express();
let bodyParser = require('body-parser'),
    session = require('express-session');

//=>创建服务监听端口两件事都处理了,并且以后有请求过来执行的是APP这个方法
let port = 8686;
app.listen(port, () => {
    console.log(`server is success，listen on ${port}！`);
});

//=>静态资源文件处理
app.use(express.static('./static'));

//=>API处理
//=>EXPRESS里面的中间件：在API接口请求处理之前，把一些公共的部分进行提取，中间件中就是先处理这些公共的内容，处理完成后，在继续执行接口请求即可
//=>APP.USE 就是中间件 (middleware)
/*app.use('/user', (req, res, next) => {
    //=>请求的PATH地址中是以'/user'开头的，例如：'/user' 、'/user/add' ...
    next();//=>不执行NEXT是无法走到下一个中间件或者请求中的 (NEXT就是执行下一个的意思，可能是下一个中间件，也有可能是下一个请求...)
});
app.use((req, res, next) => {
    //=>所有的请求都会走这个中间件，而且中间件执行的顺序是按照书写的先后顺序执行
    next();
});


app.get('/getUser', (req, res) => {
    /!*
     * 当客户端向服务器端发送请求,如果请求方式是GET，请求路径是'/getUser',就会把回调函数触发执行，里面有三个参数 REQ/RES/NEXT
     *    REQ:REQUEST （它不是我们之前原生NODE中的REQ,它是EXPRESS框架封装处理的，但是也是存储了很多客户端传递信息的对象）
     *      REQ.PARAMS 存储的是路径参数信息
     *      REQ.PATH 请求的路径名称
     *      REQ.QUERY 请求的问号参数信息(GET请求都是这样传递的信息)（对象）
     *      REQ.BODY 当请求的方式是POST，我们基于BODY-PARSER中间件处理后，会把客户端请求主体中传递的内容存放到BODY属性上
     *      REQ.SESSION 当我们基于EXPRESS-SESSION中间件处理后，会把SESSION操作放到这个属性上，基于这个属性可以操作SESSION信息
     *      REQ.COOKIES 当我们基于COOKIE-PARSER中间件处理后，会把客户端传递的COOKIE信息存放到这个属性上
     *      REQ.GET() 获取指定的请求头信息
     *      REQ.PARAM() 基于这个方法可以把 URL-ENCODED 格式字符串（或者路径参数）中的某一个属性名对应的信息获取到
     *      ...
     *
     *    RES:RESPONSE 也不是原生中的RES，也是经过EXPRESS封装处理的，目的是为了提供一些属性和方法，可以供服务器端向客户端返回内容
     *      RES.COOKIE() 通过此方法可以设置一些COOKIE信息，通过响应头SET-COOKIE返回给客户端，客户端把返回的COOKIE信息种到本地
     *      RES.TYPE() 设置响应内容的MIME类型
     *      RES.STATUS() 设置响应状态码
     *      RES.SET() 设置响应头
     *
     *      RES.SEND-STATUS() 设置返回的状态码(它是结束响应，把状态对应的信息当做主体响应主体返回，我们一般都用STATUS，然后自己来设置响应主体内容)
     *      RES.JSON() 向客户端返回JSON格式的字符串，但是允许我们传递JSON对象，方法会帮我们转换为字符串然后在返回(执行此方法后会自动结束响应[也就是自动执行了RES.END])
     *      RES.SEND-FILE([PATH]) 首先把PATH指定的文件中内容得到，然后把内容返回给客户端浏览器（完成了文件读取和响应两步操作）,也会自动结束响应
     *      RES.SEND() 你想返回啥随便(综合体),也会自动结束响应
     *
     *      RES.REDIRECT() 响应是重定向的(状态码302)
     *      RES.RENDER() 只有页面是需要服务器渲染的时候我们才会用这个
     *      ...
     *!/
    res.send({
        message: 'ok'
    });
});*/

//=>BODY-PARSER：如果是POST/PUT请求，会把基于请求主体传递的信息预先截获
//如果传递是JSON格式的字符串,基于bodyParser.json()会把它转换为JSON格式的对象
//如果传递的是URL-ENCODED格式的字符串，会基于bodyParser.urlencoded()把它转换为对象键值对的方式
//...
//把转换后的结果挂载到REQ.BODY属性上
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//=>express-session：这个中间件是供我们后续操作session的，基于这个中间件，我们可以设置客户端cookie的过期时间（也理解为session在服务器端存储的时间），当中间中执行完成后，会在req上挂载一个session的属性，用来操作session
app.use(session({
    secret: 'zfpx',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

app.post('/register', (req, res) => {
    //=>GET请求，接收问号传参的信息，可以使用：REQ.QUERY / REQ.PARAM()
    //=>POST请求，接收请求主体传递的信息，此时我们需要使用一个中间件(BODY-PARSER)
    console.log(req.body);//=>获取的是请求主体内容

    req.session.xxx = 'xxx';
    console.log(req.session.xxx);
});