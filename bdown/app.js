const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Schema = mongoose.Schema;

//////////////// Mongoose Schemas ////////////////////////////

//Will breakout and segregate into seperate file
//Will add more attributes as we decide and design what we want to store

//Schema will dictate how the data structure is formed
const resultSchema = new Schema({
	name: { type: String, required: true},
	q1val: { type: String, required: true},
	q2val: { type: String, required: true},
	q3val: { type: String, required: true},
	q4val: { type: String, required: true},
	q5val: { type: String, required: true}	
});

const Result = mongoose.model('Result', resultSchema);

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configure and connect to MongoDB hosted on localhost
mongoose.Promise = global.Promise;
try {
	mongoose.connect('mongodb://localhost/survey');
	console.log('connected to mongoDB');
} catch (e) {
	console.log('ERROR: could not connect to mongoDB. Is it running? (use `mongod`)');
	process.exit(1);
}

//////////////////// Routes /////////////////////////
/*
* If you 	navigate to the /survey route in your address bar, we get the raw JSON.
* Combined with middleware we can validate the user's permissions and user this for our API for data analytics
*/

app.use('/assets', express.static(path.resolve('bdown/assets'), { maxAge: '30 days' }));

app.get('/surveys', (req, res) => {
	Result.find((err, results) => {
		if (err) return res.status(500).send(err);

		res.send(results);
	});
});

app.post('/surveys', (req, res) => {
	const newResult = new Result(req.body);

	newResult.save((err, result) => {
		if (err) return res.status(500).send(err);

		res.send(result);
	});
});

//Default route
app.use(function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

//Start the server
const server = app.listen('8080', function() {
  console.log('Server up and running at port ' + server.address().port)
});
