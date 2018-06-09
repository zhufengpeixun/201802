let A = require('./A');
module.exports = {
    avg(...arg) {
        return A.sum(...arg) / arg.length;
    }
};