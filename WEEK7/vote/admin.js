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
    res.header("Access-Control-Allow-Origin", "*");
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

//=>API
let utils = require('./admin-utils');
app.use(async function (req, res, next) {
    req.userData = await utils.readFile('USER.JSON');
    req.voteData = await utils.readFile('VOTE.JSON');
    next();
});
app.get('/getMatchList', function (req, res) {
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
    let total = req.userData.length,
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

app.use(function (req, res, next) {
    //=>404
    res.status(404);
    res.send('NOT FOUND!');
});