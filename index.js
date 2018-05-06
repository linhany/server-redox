var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var _token="";

app.use(bodyParser.json());

app.listen(process.env.PORT, function() {
    console.log('Server started!!');
});

app.get('/', function(req, res) {
	getAuthToken(function() {
		res.send(_token);
	})
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

function getAuthToken(callback) {
	if (authToken && Date.now() < new Date(authTokenExpires).getTime()) {
		return callback(authToken);
	} else {
		//get new token

		var options = {
			url: 'https://api.redoxengine.com/auth/authenticate',
			method: 'POST',
			body: {
				apiKey: SOURCE_API_KEY,
				secret: SOURCE_SECRET
			}, 
			headers: {
				'Content-Type': 'application/json'
			},
			json: true
		};

		request.post(options, function (err, response, body) {
			console.log(body);

			authToken = body.accessToken;
			authTokenExpires = body.expires;

		});
		this._token=authToken;
	}
}
