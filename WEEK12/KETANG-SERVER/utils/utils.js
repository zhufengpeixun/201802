const {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json';

function ADD_STORE(req, res, courseID) {
    //=>把某一个商品存储到JSON中，实现加入购物车的功能
    let personID = req.session.personID,
        storeInfo = {
            id: req.storeDATA.length === 0 ? 1 : (parseFloat(req.storeDATA[req.storeDATA.length - 1].id) + 1),//=>ID自增长
            courseID,
            personID,
            state: 0,//=>默认是不支付
            time: new Date().getTime()
        };
    //=>把数据先存放到原始数组中，最后把原始数组写入到JSON中永久保存
    req.storeDATA.push(storeInfo);
    return writeFile(STORE_PATH, req.storeDATA);
}

module.exports = {
    ADD_STORE
};