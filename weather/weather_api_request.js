var http = require('http')

const apiKey = "39a43cdb954cfc35441b3a3cdb3ff315"

// Connect to API URL api.openweathermap.org/data/2.5/weather?q={city name}
module.exports = function accessWeather(city, callback) {

	var options = {
		host: "api.openweathermap.org",
		path: "/data/2.5/weather?q=" + city + "&appid=" + apiKey + "",
		method: "GET"
	}

	var body = ""

	var request = http.request(options, function(response) {

		response.on('data', function(chunk) {
			body += chunk.toString('utf8')
		})
		response.on('end', function() {

			var json = JSON.parse(body)
			var temperature = parseInt(json["main"][0]["temp"] - 273)
			var description = json["weather"]["description"]
			var icon = json["weather"]["icon"]
			var iconURL = "http://openweathermap.org/img/w/" + icon + ".png"
			callback(temperature, description, iconURL)
		})
	})
	request.end()
}


