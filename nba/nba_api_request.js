const request = require('request')
const cheerio = require('cheerio')

module.exports.games = function(callback) {
	const url = 'https://watch.nba.com'

	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			$ = cheerio.load(body)	

			var num_games = $("div.schedule-list > div").length
			callback(num_games)
		}
	})
}

module.exports.stats = function(category, callback) {
	const url = 'http://www.espn.com/nba/statistics'

	request(url, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			$ = cheerio.load(body)

			var $categories = $("#my-players-table")

			// POINTS 
			if (category == "POINTS") {
				var $points = $categories.children().eq(0).children().eq(0)
				// callback($points)
				// var $westbrook = $($points + "tbody nth:child(2) a").text()
				var message = ""
				var $first_pts = $points.children().eq(1).children().children().eq(1).children().eq(2).html()
				var $first_name = $points.children().eq(1).children().children().eq(1).children().eq(0).children().eq(2).text()
				message += "1. " + $first_name + ", " + $first_pts + "\n"
				for (var i = 2; i < 6; i++) {
					var $ppg = $points.children().eq(1).children().children().eq(i).children().eq(1).html()
					var $player_name = $points.children().eq(1).children().children().eq(i).children().eq(0).children('a').text()
					var add = i + ". " + $player_name + ", " + $ppg + "\n"
					message += add
				}
				callback(message)
			}
		}
	})
}

// module.exports.games(function(game) {
// 	console.log(game)
// })
// module.exports.stats("POINTS", function(msg) {
// 	console.log(msg)
// })


