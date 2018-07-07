let express = require('express'),
    app = express();
app.listen(8000, () => {
    console.log('SERVER IS 8000!');
});
app.use(express.static('./static'));