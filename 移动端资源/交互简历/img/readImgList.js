let fs = require('fs');
let ary = fs.readdirSync('./');
let result = [];
ary.forEach(function (item) {
    if (/\.(PNG|GIF|JPG)/i.test(item)) {
        //=>图片
        result.push(`img/` + item);
    }
});
fs.writeFileSync('./result.txt', JSON.stringify(result), 'utf-8');