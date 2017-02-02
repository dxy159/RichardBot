const request = require('request')
const cheerio = require('cheerio')
const teams = require('./teams.js')

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
				var $home = $game.children().eq(1).children().eq(0).children().eq(1).children('span').text()
				var $time = $game.children().eq(2).children().html()
				console.log($time)
				var add = i + ". " + teams.get_teams($away) + " at " + teams.get_teams($home) + "\n"
				msg_all_games += add 
			}
			callback(msg_all_games, $num_games)
		}
	})
}

module.exports.games(function(a,b){

})

function game_facts(id, callback) {
	const url = 'http://www.espn.com' + id
	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			$ = cheerio.load(body)

			var message = ""
			var $main = $("#pane-main")

			// GAME HASN'T STARTED
			if ($main.hasClass('pre')) {
				// $home_wins = $("#gamepackage-column-wrap table.mod-data tbody")
				// callback($home_wins)
				message = "Game has not started yet."
			} 
			// GAME HAS STARTED
			else if ($main.hasClass('in')) {
				message = "Game has started."
			} 
			// GAME HAS ENDED
			else if ($main.hasClass('post')) {
				message = "Game has ended."
			}
			callback(message)
		}
	})
}

module.exports.get_game = function(index, callback) {
	const url = 'http://www.espn.com/nba/schedule'
	var id = ""

	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			$ = cheerio.load(body)	

			var $schedule = $("#sched-container").children().eq(2).children().children().eq(1)
			var $game = $schedule.children().eq(index - 1)
			id = $game.children().eq(2).children('a').attr('href')
			game_facts(id, function(msg) {
				callback(msg)
			})
		}
	})


}

// module.exports.get_game(1, function(id) {
// 	console.log(id)
// })

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

module.exports.standings = function(conference, callback) {
	const url = "http://www.espn.com/nba/standings"

	request(url, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			$ = cheerio.load(body)

			$standings = $("#main-container").children(".main-content").children(".col-a").children(".tab-content").children('.tab-pane')

			// EASTERN
			if (conference == "EASTERN") {
				$eastern = $standings.children().eq(2).children()
				var msg = ""
				// FIRST TEAM STARTS AT INDEX 6
				for (var i = 6; i < 21; i++) {
					$team = $eastern.children().eq(i)
					$team_name = $team.children().children().eq(2).children('span').children('span').text()
					$wins = $team.children().eq(1).html()
					$losses = $team.children().eq(2).html()
					var add = (i - 5) + ". " + $team_name + ": " + $wins + "-" + $losses + "\n"
					msg += add
				}
				
				callback(msg)
			} 

			// WESTERN
			if (conference == "WESTERN") {
				$eastern = $standings.children().eq(4).children()
				var msg = ""
				// FIRST TEAM STARTS AT INDEX 6
				for (var i = 6; i < 21; i++) {
					$team = $eastern.children().eq(i)
					$team_name = $team.children().children().eq(2).children('span').children('span').text()
					$wins = $team.children().eq(1).html()
					$losses = $team.children().eq(2).html()
					var add = (i - 5) + ". " + $team_name + ": " + $wins + "-" + $losses + "\n"
					msg += add
				}
				
				callback(msg)
			}

		}
	})
}

// module.exports.standings("WESTERN", function(standings) {
// 	console.log(standings)
// })

// module.exports.games(function(game) {
// 	console.log(game)
// })
// module.exports.stats("STEALS", function(msg) {
// 	console.log(msg)
// })


