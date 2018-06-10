let http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
let {readFile, writeFile} = require('./utils/fsPromise'),
    mime = require('mime'),
    qs = require('qs');

//=>公共方法
let responseResult = function responseResult(res, returnVal) {
    res.writeHead(200, {
        'content-type': 'application/json;charset=utf-8;'
    });
    res.end(JSON.stringify(returnVal));
};

let readUSER = function readUSER() {
    return readFile(`./json/USER.JSON`).then(result => {
        return JSON.parse(result);
    });
};

let readVOTE = function readVOTE() {
    return readFile(`./json/VOTE.JSON`).then(result => {
        return JSON.parse(result);
    });
};

//=>创建WEB服务
let port = 8686;
let handle = function handle(req, res) {
    //=>客户端请求资源文件(PATH-NAME)，服务器端都是到STATIC文件夹中进行读取，也是根据客户端请求的路径名称读取的，服务器端基于FS读取文件中内容的时候，直接加上“./static”即可
    let {method, headers: requestHeaders} = req,
        {pathname, query} = url.parse(req.url, true),
        pathREG = /\.([a-z0-9]+)$/i;

    //=>静态资源文件处理
    if (pathREG.test(pathname)) {
        readFile(`./static${pathname}`).then(result => {
            //=>读取成功：根据请求资源文件的类型，设置响应内容的MIME
            let suffix = pathREG.exec(pathname)[1];
            res.writeHead(200, {
                'content-type': `${mime.getType(suffix)};charset=utf-8;`
            });
            res.end(result);
        }).catch(error => {
            //=>读取失败:最可能由于文件不存在而读取失败(也就是客户端请求的地址是错误的 ,我们应该响应的内容是404)
            res.writeHead(404, {'content-type': 'text/plain;charset=utf-8;'});
            res.end('NOT FOUND!');
        });
        return;
    }

    //=>API接口请求处理

    //=>GET-USER:根据传递的用户ID获取指定用户的信息
    if (pathname === '/getUser' && method === 'GET') {
        //=>问号传递的信息都在QUERY中存储着
        let {userId = 0} = query,
            returnVal = {code: 1, message: 'no!', data: null};
        readUSER().then(result => {
            let data = result.find(item => parseFloat(item['id']) === parseFloat(userId));
            if (data) {
                returnVal = {code: 0, message: 'ok', data};
                responseResult(res, returnVal);
                return;
            }
            throw new Error('');//=>目的是没有数据的时候,让其执行CATCH中的操作,这样我们只需要让THEN方法中有异常信息即可
        }).catch(error => responseResult(res, returnVal));

        /*readUSER().then(result => {
            let data = result.find(item => parseFloat(item['id']) === parseFloat(userId));
            data ? returnVal = {code: 0, message: 'ok', data} : null;
        }).finally(result => {
            //=>暂时NODE版本不支持FINALLY
            responseResult(res, returnVal);
        });*/
        return;
    }

    //=>REGIDTER:注册用户
    if (pathname === '/register' && method === 'POST') {
        //=>接收客户端请求主体传递的内容
        let pass = ``;
        req.on('data', chunk => {
            //=>正在接收请求主体内容,可能会被触发执行很多次,chunk获取的都是本次接收的BUFFER格式的数据
            pass += chunk;
        });
        req.on('end', () => {
            //=>已经把请求主体内容接收完成了  PASS是一个URLENCODED格式字符串，我们需要把它解析为对象
            pass = qs.parse(pass);
            readUSER().then(result => {
                //=>FORMAT-PASS
                let maxId = result.length <= 0 ? 0 : parseFloat(result[result.length - 1]['id']);
                pass.password = pass.password.substr(4, 24).split('').reverse().join('');
                let newData = {
                    id: maxId + 1,
                    name: '',
                    picture: `img/${pass.sex != 0 ? `woman` : `man`}.png`,
                    phone: '',
                    sex: 0,
                    password: '',
                    bio: '',
                    time: new Date().getTime(),
                    isMatch: 0,
                    matchId: '000',
                    slogan: '',
                    voteNum: 0,
                    ...pass
                };

                //=>把NEW-DATA追加到RESULT末尾,把最新的结果重新写入到文件
                result.push(newData);
                return writeFile('./json/USER.JSON', result);
            }).then(result => {
                responseResult(res, {
                    code: 0,
                    message: 'ok'
                });
            }).catch(error => {
                responseResult(res, {
                    code: 1,
                    message: 'no'
                });
            });
        });
        return;
    }

    //=>请求的都不是以上API接口,直接404即可
    res.writeHead(404);
    res.end('');
};
http.createServer(handle).listen(port, () => {
    console.log(`server is success，listen on ${port}！`);
});