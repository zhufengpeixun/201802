const express = require('express'),
    route = express.Router();

route.get('/banner', (req, res) => {
    let data = req.courseDATA.reverse().slice(0, 3);
    res.send({
        code: 0,
        msg: 'OK!',
        data
    });
});

route.get('/info', (req, res) => {
    let {courseID} = req.query;
    courseID = parseFloat(courseID);
    let item = req.courseDATA.find(item => {
        return parseFloat(item.id) === courseID;
    });
    if (item) {
        res.send({
            code: 0,
            msg: 'OK!',
            data: item
        });
        return;
    }
    res.send({
        code: 1,
        msg: 'NO!',
        data: null
    });
});

route.get('/list', (req, res) => {
    let {limit = 10, page = 1, type = 'all'} = req.query;
    limit = parseFloat(limit);
    page = parseFloat(page);

    //=>筛选
    if (type !== 'all') {
        req.courseDATA = req.courseDATA.filter(item => {
            return item.type === type;
        });
    }

    //=>分页
    let total = Math.ceil(req.courseDATA.length / limit),
        result = [];
    if (page <= total) {
        for (let i = (page - 1) * limit; i <= (page * limit - 1); i++) {
            let item = req.courseDATA[i];
            if (!item) break;
            result.push(item);
        }
    }
    res.send({
        code: 0,
        msg: 'OK!',
        total,
        limit,
        page,
        data: result
    });
});

module.exports = route;