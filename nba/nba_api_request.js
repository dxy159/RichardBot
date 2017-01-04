const request = require('request')
const cheerio = require('cheerio')

module.exports.games = function(callback) {
	const url = 'https://watch.nba.com'

	request(url, function(err, response, body) {
		if (!err && response.statusCode === 200) {
			$ = cheerio.load(body)	

			var num_games = $("div.schedule-list > div").length
			console.log(num_games)
		}
	})
}

module.exports.stats = function(callback) {
	const url = 'http://www.espn.com/nba/statistics'

	request(url, function(err, response, body) {
		if (!err && response.statusCode == 200) {
			$ = cheerio.load(body)

			var $categories = $("#my-players-table")

			// POINTS 
			var $points = $("#my-players-table nth-child(1) nth-child(1)")
			callback($points)
			// var $westbrook = $($points + "tbody nth:child(2) a").text()
			// callback($westbrook)
		}
	})
}

module.exports.stats(function(westbrook) {
	console.log(westbrook)
})