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
			if (json['cod'] == 502) {
				callback("nac", "nac")
				return
			} 
			var temperature = parseInt(json["main"]["temp"] - 273)
			var description = json["weather"][0]["description"]
			callback(temperature, description)
			
		})
	})
	request.end()
}

module.exports("yourmom", function(temperature, description) {
	console.log(temperature, description)
})
