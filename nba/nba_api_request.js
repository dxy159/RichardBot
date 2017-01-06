const request = require('request')
const cheerio = require('cheerio')

module.exports.games = function(callback) {
	const url = 'http://www.espn.com/nba/schedule'

	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			$ = cheerio.load(body)	

			var $schedule = $("#sched-container").children().eq(2).children().children().eq(1)
			var $num_games = $schedule.children().length

			var msg_all_games = ""
			for (var i = 1; i < $num_games + 1; i++) {
				var $game = $schedule.children().eq(i - 1)
				var $away = $game.children().eq(0).children().eq(1).children('span').html()
				var $home = $game.children().eq(1).children().eq(1).children('span').html()
				var add = i + ". " + $away + " at " + $home + "\n"
				msg_all_games += add 
			}
			callback(msg_all_games)
		}
	})
}

// module.exports.games(function(sched) {
// 	console.log(sched)
// })

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

			// REBOUNDS 
			if (category == "REBOUNDS") {
				var $rebounds = $categories.children().eq(1).children().eq(0)
				// callback($points)
				// var $westbrook = $($points + "tbody nth:child(2) a").text()
				var message = ""
				var $first_rbs = $rebounds.children().eq(1).children().children().eq(1).children().eq(2).html()
				var $first_name = $rebounds.children().eq(1).children().children().eq(1).children().eq(0).children().eq(2).text()
				message += "1. " + $first_name + ", " + $first_rbs + "\n"
				for (var i = 2; i < 6; i++) {
					var $rpg = $rebounds.children().eq(1).children().children().eq(i).children().eq(1).html()
					var $player_name = $rebounds.children().eq(1).children().children().eq(i).children().eq(0).children('a').text()
					var add = i + ". " + $player_name + ", " + $rpg + "\n"
					message += add
				}
				callback(message)
			}

			//ASSISTS
			if (category == "ASSISTS") {
				var $assists = $categories.children().eq(0).children().eq(1)

				var message = ""
				var $first_ast = $assists.children().eq(0).children().children().eq(1).children().eq(2).html()
				var $first_name = $assists.children().eq(0).children().children().eq(1).children().eq(0).children().eq(2).text()
				message += "1. " + $first_name + ", " + $first_ast + "\n"
				for (var i = 2; i < 6; i++) {
					var $apg = $assists.children().eq(0).children().children().eq(i).children().eq(1).html()
					var $player_name = $assists.children().eq(0).children().children().eq(i).children().eq(0).children('a').text()
					var add = i + ". " + $player_name + ", " + $apg + "\n"
					message += add
				}
				callback(message)
			}

			//FG
			if (category == "FG") {
				var $fg = $categories.children().eq(0).children().eq(2)

				var message = ""
				var $first_fg = $fg.children().eq(0).children().children().eq(1).children().eq(2).html()
				var $first_name = $fg.children().eq(0).children().children().eq(1).children().eq(0).children().eq(2).text()
				message += "1. " + $first_name + ", " + $first_fg + "\n"
				for (var i = 2; i < 6; i++) {
					var $fgp = $fg.children().eq(0).children().children().eq(i).children().eq(1).html()
					var $player_name = $fg.children().eq(0).children().children().eq(i).children().eq(0).children('a').text()
					var add = i + ". " + $player_name + ", " + $fgp + "\n"
					message += add
				}
				callback(message)
			}

			//BLOCKS
			if (category == "BLOCKS") {
				var $blocks = $categories.children().eq(1).children().eq(1)

				var message = ""
				var $first_blk = $blocks.children().eq(0).children().children().eq(1).children().eq(2).html()
				var $first_name = $blocks.children().eq(0).children().children().eq(1).children().eq(0).children().eq(2).text()
				message += "1. " + $first_name + ", " + $first_blk + "\n"
				for (var i = 2; i < 6; i++) {
					var $bpg = $blocks.children().eq(0).children().children().eq(i).children().eq(1).html()
					var $player_name = $blocks.children().eq(0).children().children().eq(i).children().eq(0).children('a').text()
					var add = i + ". " + $player_name + ", " + $bpg + "\n"
					message += add
				}
				callback(message)
			}

			//STEALS
			if (category == "STEALS") {
				var $steals = $categories.children().eq(1).children().eq(2)

				var message = ""
				var $first_stl = $steals.children().eq(0).children().children().eq(1).children().eq(2).html()
				var $first_name = $steals.children().eq(0).children().children().eq(1).children().eq(0).children().eq(2).text()
				message += "1. " + $first_name + ", " + $first_stl + "\n"
				for (var i = 2; i < 6; i++) {
					var $spg = $steals.children().eq(0).children().children().eq(i).children().eq(1).html()
					var $player_name = $steals.children().eq(0).children().children().eq(i).children().eq(0).children('a').text()
					var add = i + ". " + $player_name + ", " + $spg + "\n"
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
// module.exports.stats("STEALS", function(msg) {
// 	console.log(msg)
// })


