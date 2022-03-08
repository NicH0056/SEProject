var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var current = new Date();


const rawTweets = require('./favs.json');
var parsedTweets = []
for (let i = 0; i < rawTweets.length; i++) {
    var temp = {
        created_at: rawTweets[i].created_at,
        screen_name: rawTweets[i].user.screen_name,
        id_str: rawTweets[i].id_str,
        text: rawTweets[i].text

    };
    parsedTweets[i] = temp;
 }


var currentId = 2;
var PORT = 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/parsedTweets', function(req, res){
	res.send({ parsedTweets: parsedTweets });
});


app.post('/parsedTweets', function(req, res){
	var newName = req.body.name;
	var newText = req.body.text;
	var newID = req.body.id;
	parsedTweets.push({
		screen_name: newName,
		text: newText,
		id_str: newID,
		created_at: current.toLocaleString()
	});
	res.send('Successfully created product!');
});

app.put('/parsedTweets/:screen_name', function(req, res) {
	var id = req.params.screen_name;
	var newText = req.body.text;

	var found = false;

	parsedTweets.forEach(function(tweet, index) {
		if (!found && tweet.screen_name === id) {
			tweet.text = newText
		}
	});
});

app.delete('/parsedTweets', function(req, res) {
	var id = req.body.id_string;
	var found = false;

	parsedTweets.forEach(function(tweet, index) {
		if(!found && tweet.id_str === id) {
			parsedTweets.splice(index, 1);
		}
	});
});

app.copy('/parsedTweets', function(req, res) {
	var oldName = req.body.oldName;
	var newName = req.body.newName;

	parsedTweets.forEach(function(tweet, index) {
		if(tweet.screen_name === oldName) {
			parsedTweets[index].screen_name = newName;		}
	});
});

app.listen(PORT, '127.0.0.1', function(){
	console.log('server is listening on ' + PORT);
});