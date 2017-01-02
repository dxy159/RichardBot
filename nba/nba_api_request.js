const request = require('request')
const cheerio = require('cheerio')

const url = 'https://watch.nba.com'

request(url, function(err, response, body) {
	if (!err && response.statusCode === 200) {
		$ = cheerio.load(body)	

		$("schedule-list").each(function(game) {
			console.log(game)
		})
	}
})