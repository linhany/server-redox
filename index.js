var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

var lowdb = require('lowdb');
var db = lowdb('db.json');

db.defaults({ stores: [] })
	.write();

app.use(bodyParser.json());

app.listen(process.env.PORT, function() {
    console.log('Server started!!');
});

app.get('/', function(req, res) {
	res.send("hello");
});

app.get('/store', function(req, res) {
	var obj = { title: 'hello!' };
	db.get('stores').push(obj).write();
	res.sendStatus(200);
});

app.post('/retrieve', function(req, res) {
	// retrieve
	var val = db.has('stores').value();
	res.send(val);

	// delete after retrieving
	console.log("deleting it..");
	db.get('stores').remove({ title: 'hello!' }).write()
})
