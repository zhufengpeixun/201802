const express = require('express'),
    route = express.Router(),
    {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json',
    utils = require('../utils/utils');

route.post('/add', (req, res) => {
    let personID = req.session.personID,
        {courseID} = req.body;
    courseID = parseFloat(courseID);

    //=>已经登录状态下，把信息直接存储到JSON中即可
    if (personID) {
        utils.ADD_STORE(req, res, courseID).then(() => {
            res.send({code: 0, msg: 'OK!'});
        }).catch(() => {
            res.send({code: 1, msg: 'NO!'});
        });
        return;
    }

    //=>未登录状态下，临时存储到SESSION中，等到下一次登录成功，直接把信息存储到文件中（并且清空SESSION中的信息）
    !req.session.storeList ? req.session.storeList = [] : null;
    req.session.storeList.push(courseID);
    res.send({code: 0, msg: 'OK!'});
});

route.post('/remove', (req, res) => {
    let personID = req.session.personID,
        {courseID = 0} = req.body;
    courseID = parseFloat(courseID);

    if (personID) {
        req.storeDATA = req.storeDATA.filter(item => {
            return !(parseFloat(item.courseID) === courseID && parseFloat(item.personID) === personID);
        });
        writeFile(STORE_PATH, req.storeDATA).then(() => {
            res.send({code: 0, msg: 'OK!'});
        }).catch(() => {
            res.send({code: 1, msg: 'NO!'});
        });
        return;
    }

    !req.session.storeList ? req.session.storeList = [] : null;
    req.session.storeList = req.session.storeList.filter(item => {
        return parseFloat(item) !== courseID;
    });
    res.send({code: 0, msg: 'OK!'});
});

route.get('/info', (req, res) => {
    let state = parseFloat(req.query.state) || 0,
        personID = req.session.personID,
        storeList = [];
    if (personID) {
        req.storeDATA.forEach(item => {
            if (parseFloat(item.personID) === personID && parseFloat(item.state) === state) {
                storeList.push(parseFloat(item.courseID));
            }
        });
    } else {
        if (state === 0) {
            storeList = req.session.storeList || [];
        }
    }

    if (storeList.length === 0) {
        res.send({
            code: 1,
            msg: 'NO!',
            data: []
        });
        return;
    }

    let data = [];
    storeList.forEach(courseID => {
        let item = req.courseDATA.find(item => parseFloat(item.id) === courseID);
        data.push(item);
    });
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.post('/pay', (req, res) => {
    let {storeID} = req.body,
        personID = req.session.personID,
        isUpdate = false;
    if (personID) {
        req.storeDATA = req.storeDATA.map(item => {
            if (parseFloat(item.id) === parseFloat(storeID) && parseFloat(item.personID) === parseFloat(personID)) {
                isUpdate = true;
                return {...item, state: 1};
            }
            return item;
        });
        if (isUpdate) {
            writeFile(STORE_PATH, req.storeDATA).then(() => {
                res.send({code: 0, msg: 'OK!'});
            }).catch(() => {
                res.send({code: 1, msg: 'NO!'});
            });
        } else {
            res.send({code: 1, msg: 'NO!'});
        }
        return;
    }
    res.send({code: 1, msg: 'NO LOGIN!'});
});

module.exports = route;