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

app.get('/destination', function(req, res) {
	if (req.headers['verification-token'] === process.env.DESTINATION_VERIFICATION_TOKEN) {
		console.log('verification-token matched!');
		return res.send(req.query.challenge);
	}

	console.log('verfication-token did not match :( ');
	res.sendStatus(400);
});

app.post('/destination', function(req, res) {
    console.log(req.body);
    res.sendStatus(200);
})
