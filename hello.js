var http = require('http');

var Twit = require('twit')

var express = require('express');
var app = express();
app.set('view engine', 'hjs');

app.set('port', process.env.PORT || 3000);

var T = new Twit({
    consumer_key:         '5dhF6rJ2OYNkCrUyMPy77pQ0a'
  , consumer_secret:      'jPFSkx9OprTWbKtBFc1N4xkUHC2DZHN8xgV4z30Xtjq9gcZwwq'
  , access_token:         '2823275614-3h8g3m47Cx7QH33YO0m2aJPAWHDmMS57FmNCf2R'
  , access_token_secret:  'PpVBPEVBo9vU6OajEO8FLue3hJ9c5QHbyA9FHrbo6h9NW'
})

T.get('statuses/user_timeline', { screen_name: 'jim_icy', count: 200 },  function (err, data, response) {
	//var arrayData = JSON.parse(data);
  	console.log(data.length);
})
/*
var twitterAPI = require('node-twitter-api');

var twitter = new twitterAPI({
	consumerKey: '5dhF6rJ2OYNkCrUyMPy77pQ0a',
	consumerSecret: 'jPFSkx9OprTWbKtBFc1N4xkUHC2DZHN8xgV4z30Xtjq9gcZwwq',
	callback: ''
    //callback: 'http://yoururl.tld/something'
});

var accessToken="2823275614-3h8g3m47Cx7QH33YO0m2aJPAWHDmMS57FmNCf2R";
var accessTokenSecret="PpVBPEVBo9vU6OajEO8FLue3hJ9c5QHbyA9FHrbo6h9NW";

twitter.statuses("user_timeline",
	{screen_name:"jim_icy"},
	accessToken,
	accessTokenSecret,
	function(error, data, respoonse){
		console.log("ASd");
		if (error){
			console.log(error);
		} else {
			console.log(data);
		}
	}*/

app.get('/', function(req, res){
    res.render('home');
});

app.get('/events', function(req, res){
    res.render('events');
});

//custom 404 page
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

 // custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost' +
    app.get('port') + '; press Ctrl-C to terminate')
});

