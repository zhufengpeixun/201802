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
    password = password.substr(4, 24).split('').reverse().join('');
    const item = req.personalDATA.find(item => {
        return (item.name === name || item.email === name || item.phone === name) && item.password === password;
    });
    if (item) {
        req.session.personID = parseFloat(item.id);
        add_temp_store(req, res);
        res.send({code: 0, msg: 'OK!'});
        return;
    }
    res.send({code: 1, msg: 'NO!'});
});

route.get('/login', (req, res) => {
    const personID = req.session.personID;
    if (personID) {
        res.send({code: 0, msg: 'OK!'});
        return;
    }
    res.send({code: 1, msg: 'NO!'});
});

route.post('/register', (req, res) => {
    let personInfo = {
        id: req.personalDATA.length === 0 ? 1 : (parseFloat(req.personalDATA[req.personalDATA.length - 1].id) + 1),
        name: '',
        email: '',
        phone: '',
        password: '8376ac810bb9f231d28fcf1f'
    };
    req.body.password = req.body.password.substr(4, 24).split('').reverse().join('');
    personInfo = {...personInfo, ...req.body};
    req.personalDATA.push(personInfo);
    writeFile(PERSONAL_PATH, req.personalDATA).then(() => {
        req.session.personID = parseFloat(personInfo.id);
        add_temp_store(req, res);
        res.send({code: 0, msg: 'OK!'});
    }).catch(() => {
        res.send({code: 1, msg: 'NO!'});
    });
});

route.get('/info', (req, res) => {
    const personID = req.session.personID;
    if (personID) {
        let personInfo = req.personalDATA.find(item => {
            return parseFloat(item.id) === personID;
        });
        personInfo.password = null;
        res.send({code: 0, msg: 'OK!', data: personInfo});
        return;
    }
    res.send({code: 1, msg: 'NO!', data: null});
});

module.exports = route;