const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    PERSONAL_PATH = './json/personal.json',
    utils = require('../utils/utils');

//=>把临时存储在SESSION中的STORE信息，增加到JSON文件中（登录后）
function add_temp_store(req, res) {
    let storeList = req.session.storeList || [];
    if (storeList.length === 0) return;
    storeList.map(item => {
        return utils.ADD_STORE(req, res, parseFloat(item));
    });
    Promise.all(storeList).then(() => {
        //...
    });
    req.session.storeList = [];
}

route.post('/login', (req, res) => {
    let {name, password} = req.body || {};
    //=>把秘密二次加密：因为注册的时候，存储到JSON中的密码是经过二次加密的，所以我们登录验证的时候也需要把密码二次加密，只有这样才会和JSON中的匹配
    password = password.substr(4, 24).split('').reverse().join('');

    //=>req.personalDATA 之前读取的PERSONAL中的信息：登录校验就是把用户传递的信息到总数据中查找，找到就代表登录成功...
    const item = req.personalDATA.find(item => {
        //=>支持用户名传递：姓名、邮箱、电话
        return (item.name === name || item.email === name || item.phone === name) && item.password === password;
    });

    if (item) {
        //=>登录成功：把当前登录用户的ID存储到SESSION上（如果SESSION上有用户信息就代表登录成功，反之没有登录）
        req.session.personID = parseFloat(item.id);
        add_temp_store(req, res);//=>把存储到SESSION中的购物信息写入到JSON文件中
        res.send({code: 0, msg: 'OK!'});
        return;
    }
    res.send({code: 1, msg: 'NO!'});
});

route.get('/login', (req, res) => {
    //=>是否登录就看SESSION中是否存在（后台服务重启，SESSION都消失）
    const personID = req.session.personID;
    if (personID) {
        res.send({code: 0, msg: 'OK!'});
        return;
    }
    res.send({code: 1, msg: 'NO!'});
});

route.post('/register', (req, res) => {
    //=>先准备一套完成的新用户信息模型
    let personInfo = {
        id: req.personalDATA.length === 0 ? 1 : (parseFloat(req.personalDATA[req.personalDATA.length - 1].id) + 1),//=>用户的ID是在当前最大ID基础上自动累加1的
        name: '',
        email: '',
        phone: '',
        password: '8376ac810bb9f231d28fcf1f'
    };
    //=>把用户传递的密码二次加密
    req.body.password = req.body.password.substr(4, 24).split('').reverse().join('');

    //=>把用户传递的信息替换用户模型中的信息，此时personInfo就是要新增加用户的全部信息
    personInfo = {...personInfo, ...req.body};

    //=>先把信息放到原始数据中
    req.personalDATA.push(personInfo);

    //=>一定要把最新的原始数据，重新写入到JSON文件中，这样才能存储
    writeFile(PERSONAL_PATH, req.personalDATA).then(() => {
        //=>注册成功也代表登录成功，所以需要记录SESSION
        req.session.personID = parseFloat(personInfo.id);
        add_temp_store(req, res);
        res.send({code: 0, msg: 'OK!'});
    }).catch(() => {
        res.send({code: 1, msg: 'NO!'});
    });
});

route.get('/info', (req, res) => {
    //=>获取当前登录者信息：从SESSION中获取到登录者的编号
    const personID = req.session.personID;
    if (personID) {
        //=>在所有的数据中筛选出和登录者编号相同的那一项
        let personInfo = req.personalDATA.find(item => {
            return parseFloat(item.id) === personID;
        });
        personInfo.password = null;//=>返回的信息中不要把密码带着
        res.send({code: 0, msg: 'OK!', data: personInfo});
        return;
    }
    res.send({code: 1, msg: 'NO!', data: null});
});

route.get('/out', (req, res) => {
    //=>退出登录就是干掉SESSION
    req.session.personID = null;
    res.send({code: 0, msg: 'OK!'});
});

module.exports = route;