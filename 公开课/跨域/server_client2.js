let express = require('express'),
    app = express(),
    request = require('request');
app.listen(8002, () => {
    console.log('SERVER IS 8002!');
});


app.use(express.static('./static'));