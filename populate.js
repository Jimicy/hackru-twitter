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


for (var i = 0; i < screen_names.length; i++){

	maxid = '999999999999999999';
	
	populate(maxid,screen_names[i],tweetsPerRequest,requestsPerUser);

}

/*db.users.find({sex: "female"}, function(err, users) {
  if( err || !users) console.log("No female users found");
  else users.forEach( function(femaleUser) {
    console.log(femaleUser);
  } );
});*/
/*db.tweets.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});
*/






function populate(l_maxid, l_screen_name, l_count, l_iteration){
		T.get('statuses/user_timeline', {trim_user:1, max_id: l_maxid, screen_name: l_screen_name, count: l_count},  function (err, data, response) {
			
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
	  			T.get('statuses/oembed', {id:data[j]["id_str"]},  function (err2, data2, response2) {
	  				var fileNameIndex = data2["url"].lastIndexOf("/") + 1;
					var filename = data2["url"].substr(fileNameIndex);		
	  				db.tweets.findAndModify({
					    query: { tweetid: filename },
					    update: { $set: { ehtml: data2["html"] } },
					    new: true
					}, function(err, doc, lastErrorObject) {
					    // doc.tag === 'maintainer'
					});

				});
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