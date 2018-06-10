let {readFile} = require('./utils/fsPromise');
readFile(`./static/img/title.png`).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});