var http = require('http');

var Twit = require('twit')

var sleep = require('sleep');

var T = new Twit({
    consumer_key:         '5dhF6rJ2OYNkCrUyMPy77pQ0a'
  , consumer_secret:      'jPFSkx9OprTWbKtBFc1N4xkUHC2DZHN8xgV4z30Xtjq9gcZwwq'
  , access_token:         '2823275614-3h8g3m47Cx7QH33YO0m2aJPAWHDmMS57FmNCf2R'
  , access_token_secret:  'PpVBPEVBo9vU6OajEO8FLue3hJ9c5QHbyA9FHrbo6h9NW'
})
var maxid;


var databaseUrl = "foxhound"; // "username:password@example.com/mydb"
var collections = ["tweets"]
var db = require("mongojs").connect(databaseUrl, collections);
var minid;


db.tweets.find({city:"Toronto"}).sort({tweetid:-1}).forEach(function(err, doc) {
    if (!doc) {
        // we visited all docs in the collection
        return;
    }
    console.log(doc["tweetid"])
    // doc is a document in the collection
});

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');