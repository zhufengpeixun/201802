let express = require('express'),
    app = express();
app.listen(80, () => {
    console.log('SERVER IS 80');
});
app.use(express.static('./static'));
app.use(express.static('./node_modules'));