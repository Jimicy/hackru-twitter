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
var tweetsPerRequest = 200;
var requestsPerUser = 16;
var screen_names = ["OperationL2P"];


var databaseUrl = "foxhound"; // "username:password@example.com/mydb"
var collections = ["tweets"]
var db = require("mongojs").connect(databaseUrl, collections);
var minid;

//minid = db.tweets.find("id" => x).sort({"tweetid" => -1}).limit(1).first()//db.tweets.find({});
db.tweets.find().limit(1).sort({tweetid:-1}, function(err, users) {
  if( err || !users) console.log("No female users found");
  else users.forEach( function(femaleUser) {
    minid = ""+(femaleUser["tweetid"]);
    console.log(minid);
    for (var i = 0; i < screen_names.length; i++){

      maxid = '999999999999999999';
      
      update(maxid,screen_names[i],tweetsPerRequest,requestsPerUser);

    }
  } );
}); 









function update(l_maxid, l_screen_name, l_count, l_iteration){
		T.get('statuses/user_timeline', {trim_user:1, max_id: l_maxid, screen_name: l_screen_name, count: l_count, since_id: minid},  function (err, data, response) {
  			console.log(data.length);
  			if (data.length == 0){
  				return;
  			}
  			var dataArray = (data[data.length-1]);
  			console.log(maxid);
  			maxid = decrementHugeNumberBy1(dataArray["id_str"]);
  			for(var j = 0; j < data.length; j++){
	  			if(data[0]["entities"]["hashtags"].length){
	  				for (var i = 0; i < data[0]["entities"]["hashtags"].length; i++){
	  					//console.log(data[0]["entities"]["hashtags"][i]["text"]);//Hashtags!
	  				}
	  			}

	  			var typeString = ""
	  			if (data[j]["text"].toLowerCase().indexOf("event") > 0){
	  				typeString = "event";	
	  			} else if (data[j]["text"].toLowerCase().indexOf("github") > 0){
	  				typeString = "project"
	  			} else if (data[j]["text"].toLowerCase().indexOf("book") > 0){
	  				typeString = "resource"
	  			}

	  			db.tweets.save({tweetid: data[j]["id_str"], text: data[j]["text"], type: typeString, city: "Toronto"}, function(err, saved) {
				  if( err || !saved ) console.log("tweet not saved");
				  else console.log("tweet saved");
				});
	  		}
  			if (l_iteration > 0 && data.length == l_count){
  				populate(maxid, l_screen_name, l_count, l_iteration-1);
  			}
  			//console.log(data);
		})
}
function decrementHugeNumberBy1(n) {
    // make sure s is a string, as we can't do math on numbers over a certain size
    n = n.toString();
    var allButLast = n.substr(0, n.length - 1);
    var lastNumber = n.substr(n.length - 1);

    if (lastNumber === "0") {
        return decrementHugeNumberBy1(allButLast) + "9";
    }
    else {      
        var finalResult = allButLast + (parseInt(lastNumber, 10) - 1).toString();
        return trimLeft(finalResult, "0");
    }
}

function trimLeft(s, c) {
    var i = 0;
    while (i < s.length && s[i] === c) {
        i++;
    }

    return s.substring(i);
}

http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');