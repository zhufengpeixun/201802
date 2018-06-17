let express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express();

//=>CREATE SERVER
app.listen(8000, () => {
    console.log(`server is create success on 8000 port!`);
});

//=>USE
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63342");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.send('Current services support cross domain requests!');
        return;
    }
    next();
});
app.use(session({
    secret: 'zfpx',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
    if (/^(POST|PUT|PATCH)$/i.test(req.method)) {
        let pass = '';
        req.on('data', chunk => pass += chunk);
        req.on('end', () => {
            req.body = {};
            pass.replace(/([^?=&]+)=([^?=&]+)/g, (...arg) => {
                let [, key, value] = arg;
                req.body[key] = value;
            });
            next();
        });
        return;
    }
    next();
});

//=>API
let utils = require('./admin-utils');
app.use(async function (req, res, next) {
    req.userData = await utils.readFile('USER.JSON');
    req.voteData = await utils.readFile('VOTE.JSON');
    next();
});

app.get('/getMatchList', (req, res) => {
    let {userData, voteData, query} = req,
        {limit = 10, page = 1, search = ''} = query;

    //=>筛选合适人员
    userData = userData.slice(0).reverse();
    userData = userData.filter(item => parseFloat(item['isMatch']) === 1);
    req.session.userID ? userData = userData.filter(item => parseFloat(item['id']) !== req.session.userID) : null;
    search ? userData = userData.filter(item => item['name'].indexOf(search) > -1) : null;

    //=>获取当前用户是否已经被登录者投递过
    if (req.session.userID) {
        userData.forEach(item => {
            let id = parseFloat(item['id']),
                flag = 0;
            voteData.forEach(voteItem => {
                if (parseFloat(voteItem['voterId']) === req.session.userID && parseFloat(voteItem['participantId']) === id) {
                    flag = 1;
                }
            });
            item['isVote'] = flag;
        });
    }

    //=>分页返回数据
    let total = userData.length,
        pageNum = Math.ceil(total / limit),
        result = [];
    if (page <= pageNum) {
        for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
            let item = userData[i];
            if (!item) break;
            result.push({
                id: parseFloat(item['id']),
                name: item['name'],
                picture: item['picture'],
                sex: parseFloat(item['sex']),
                matchId: parseFloat(item['matchId']),
                slogan: item['slogan'],
                voteNum: parseFloat(item['voteNum']),
                isVote: parseFloat(item['isVote']) || 0
            });
        }
    }
    res.send({
        code: result.length === 0 ? 1 : 0,
        message: result.length === 0 ? 'NO MATCH ANY-ONE' : 'OK',
        limit: limit,
        page: page,
        pageNum: pageNum,
        total: total,
        list: result
    });
});

app.get('/vote', (req, res) => {
    let {participantId} = req.query,
        {userData, voteData} = req;
    if (req.session.userID) {
        //=>向投票表中存放内容
        voteData.push({
            id: voteData.length === 0 ? 1 : (parseFloat(voteData[voteData.length - 1]['id']) + 1),
            voterId: req.session.userID,
            participantId: participantId,
            time: new Date().getTime()
        });
        utils.writeFile('VOTE.JSON', voteData).then(() => {
            //=>被投人的投票数累加1
            userData.forEach(item => {
                if (parseFloat(item['id']) === parseFloat(participantId)) {
                    item['voteNum'] = parseFloat(item['voteNum']) + 1;
                }
            });
            return utils.writeFile('USER.JSON', userData);
        }).then(() => {
            res.send({
                code: 0,
                message: 'VOTE SUCCESS!'
            });
        });
        return;
    }
    res.send({
        code: 1,
        message: 'NO LOGIN!'
    });
});

app.get('/getUser', (req, res) => {
    let {userData, query} = req,
        {userId = req.session.userID} = query,
        result = {
            code: 1,
            message: 'NO USER!',
            data: null
        };
    let item = userData.find(item => {
        return parseFloat(item['id']) === parseFloat(userId);
    });
    if (item) {
        result = {
            code: 0,
            message: 'OK',
            data: item
        };
    }
    res.send(result);
});

app.get('/checkUser', (req, res) => {
    let {userData, voteData, query} = req,
        {checkId} = query,
        result = {
            code: 1,
            message: 'NO!'
        };
    let item = voteData.find(item => {
        return parseFloat(item['voterId']) === parseFloat(req.session.userID) && parseFloat(item['participantId']) === parseFloat(checkId);
    });
    if (item) {
        result = {
            code: 0,
            message: 'OK!'
        };
    }
    res.send(result);
});

app.get('/getMyVote', (req, res) => {
    let {userData, voteData} = req,
        result = {code: 1, message: 'NO LOGIN!'},
        ary = [];
    if (req.session.userID) {
        voteData.forEach(voteItem => {
            if (parseFloat(voteItem['voterId']) === parseFloat(req.session.userID)) {
                userData.forEach(userItem => {
                    if (parseFloat(userItem['id']) === parseFloat(voteItem['participantId'])) {
                        ary.push({
                            id: userItem['id'],
                            name: userItem['name'],
                            picture: userItem['picture'],
                            sex: userItem['sex'],
                            matchId: userItem['matchId'],
                            slogan: userItem['slogan'],
                            voteNum: userItem['voteNum'],
                            isVote: 1
                        });
                    }
                });
            }
        });
        result = {code: 0, message: 'OK!', total: ary.length, list: ary};
    }
    res.send(result);
});

app.get('/getVoteMy', (req, res) => {
    let {userData, voteData} = req,
        result = {code: 1, message: 'NO LOGIN!'},
        ary = [];
    if (req.session.userID) {
        voteData.forEach(voteItem => {
            if (parseFloat(voteItem['participantId']) === parseFloat(req.session.userID)) {
                userData.forEach(userItem => {
                    if (parseFloat(userItem['id']) === parseFloat(voteItem['voterId'])) {
                        ary.push({
                            id: userItem['id'],
                            name: userItem['name'],
                            picture: userItem['picture'],
                            sex: userItem['sex'],
                            matchId: userItem['matchId'],
                            slogan: userItem['slogan'],
                            voteNum: userItem['voteNum'],
                            isVote: 0
                        });
                    }
                });
            }
        });
        ary.forEach(item => {
            voteData.forEach(voteItem => {
                if (parseFloat(voteItem['voterId']) === req.session.userID && parseFloat(voteItem['participantId']) === parseFloat(item['id'])) {
                    item['isVote'] = 1;
                }
            });
        });
        result = {code: 0, message: 'OK!', total: ary.length, list: ary};
    }
    res.send(result);
});

app.get('/checkPhone', (req, res) => {
    let {userData, query} = req,
        {phone} = query,
        result = {code: 0, message: 'NO REGISTER!'};
    let flag = userData.find(item => {
        return item['phone'] === phone;
    });
    flag ? result = {code: 1, message: 'REGISTER!'} : null;
    res.send(result);
});

app.get('/checkLogin', (req, res) => {
    if (req.session.userID) {
        res.send({
            code: 1,
            message: 'ALREADY LOGIN!'
        });
        return;
    }
    res.send({
        code: 0,
        message: 'NO LOGIN!'
    });
});

app.get('/exitLogin', (req, res) => {
    req.session.userID = null;
    res.send({
        code: 0,
        message: 'OK!'
    });
});

app.post('/match', (req, res) => {
    if (!req.session.userID) {
        res.send({
            code: 1,
            message: 'NO LOGIN!'
        });
        return;
    }

    let {userData, voteData, body} = req,
        maxMatchId = 0;
    userData.forEach(item => {
        if (parseFloat(item['isMatch']) === 1) {
            maxMatchId = parseFloat(item['matchId']) > maxMatchId ? parseFloat(item['matchId']) : maxMatchId;
        }
    });
    maxMatchId++;
    if (maxMatchId < 10) {
        maxMatchId = '00' + maxMatchId;
    } else if (maxMatchId < 100) {
        maxMatchId = '0' + maxMatchId;
    } else {
        maxMatchId = '' + maxMatchId;
    }

    userData.forEach(item => {
        if (parseFloat(item['id']) === req.session.userID) {
            item['isMatch'] = 1;
            item['matchId'] = maxMatchId;
            item['slogan'] = body.slogan;
        }
    });
    utils.writeFile('USER.JSON', userData);
    res.send({
        code: 0,
        message: 'OK!'
    });
});

app.post('/login', (req, res) => {
    let {userData, voteData, body} = req,
        {name = '', password = ''} = body;
    password = utils.handMD5(password);
    let flag = userData.find(item => {
        return (item['name'] === name || item['phone'] === name) && item['password'] === password;
    });
    flag ? (req.session.userID = flag['id'], res.send({code: 0, message: 'OK!'})) : res.send({code: 1, message: 'NO!'});
});

app.post('/register', (req, res) => {
    let {userData, voteData, body} = req;
    body = {
        id: userData.length === 0 ? 1 : parseFloat(userData[userData.length - 1]['id']) + 1,
        name: '',
        picture: parseFloat(body['sex']) === 0 ? 'img/man.png' : 'img/woman.png',
        password: 'e807f1fcf82d132f9bb018ca6738a19f',
        phone: '',
        sex: 0,
        bio: '',
        time: new Date().getTime(),
        isMatch: 0,
        matchId: '000',
        slogan: '',
        voteNum: 0,
        ...body,
    };
    body.password = utils.handMD5(body.password);
    userData.push(body);
    utils.writeFile('USER.JSON', userData).then(() => {
        req.session.userID = body['id'];
        res.send({
            code: 0,
            message: 'OK!'
        });
    }).catch(() => {
        res.send({
            code: 1,
            message: 'NO!'
        });
    });
});

app.use(function (req, res, next) {
    //=>404
    res.status(404);
    res.send('NOT FOUND!');
});

