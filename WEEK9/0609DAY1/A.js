module.exports = {
    sum(...arg) {
        return eval(arg.join('+'));
    }
};