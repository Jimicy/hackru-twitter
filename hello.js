var http = require('http');

var Twit = require('twit')

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

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');