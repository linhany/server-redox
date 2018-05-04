var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.json());

app.listen(process.env.PORT, function() {
    console.log('Server started!!');
});

app.get('/', function(req, res) {
    res.send("Hello, World!");
});