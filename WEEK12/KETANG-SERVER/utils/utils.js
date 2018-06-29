const {writeFile} = require('../utils/promiseFS'),
    STORE_PATH = './json/store.json';

function ADD_STORE(req, res, courseID) {
    let personID = req.session.personID,
        storeInfo = {
            id: req.storeDATA.length === 0 ? 1 : (parseFloat(req.storeDATA[req.storeDATA.length - 1].id) + 1),
            courseID,
            personID,
            state: 0,
            time: new Date().getTime()
        };
    req.storeDATA.push(storeInfo);
    return writeFile(STORE_PATH, req.storeDATA);
}

module.exports = {
    ADD_STORE
};