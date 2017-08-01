const https = require('https')
const config = require('./config.json')

var options = {
	host: 'euw1.api.riotgames.com',
    port: 443,
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        "X-Riot-Token": config["key"],
    	"Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    	"Accept-Language": "en-US,en;q=0.8",
    	"User-Agent": "Mozilla/5.0"
    }
}

exports.makeCall = function(profile, onResult){
	options.path = '/lol/summoner/v3/summoners/by-name/' + profile.name;
	console.log(options.path)
	summonerCall(profile, onResult)
}

var summonerCall = function(profile, onResult)
{
    console.log("rest::getJSON");
    var req = https.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        console.log('Error in API call')
    });

    req.end();
};