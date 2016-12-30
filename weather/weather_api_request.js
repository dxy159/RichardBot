var http = require('http')

const apiKey = "39a43cdb954cfc35441b3a3cdb3ff315"
var temperature = 0

// Connect to API URL api.openweathermap.org/data/2.5/weather?q={city name}
function accessWeather(city, callback) {
	
	var options = {
		host: "api.openweathermap.org",
		path: "/data/2.5/weather?q=" + city + "&appid=" + apiKey + "",
		method: "GET"
	}

	var request = http.request(options, function(response) {
		var body = ""

		response.on('data', function(chunk) {
			body += chunk.toString('utf8')
		})
		response.on('end', function() {

			var json = JSON.parse(body)
			temperature = parseInt(json["main"]["temp"] - 273)

			callback(temperature)
		})
	})
	request.end()

}

accessWeather("SANFRANCISCO", function(weather) {
	console.log(weather);
})

module.exports = {
	temperature:temperature
}



