'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const weather = require('./weather/weather_api_request.js')
const messages = require('./messages.js')
const r = require('./responses.js')
const nba = require('./nba/nba_api_request.js')

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'RICHARDNIDXY159') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


// To post data
app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    var location_weather = false
    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
        let text = event.message.text
        if (location_weather) {
          messages.sendTextMessage(sender, "location weather")
          location_weather = false
          continue
        }
        if (text === 'Generic') {
            messages.sendGenericMessage(sender)
            continue
        }
        if (r.editText(text).indexOf("NBASTATS") >= 0) {
            if (r.editText(text).indexOf("POINT") >= 0 || r.editText(text).indexOf("PT") >= 0) {
                nba.stats("POINTS", function(msg) {
                    messages.sendTextMessage(sender, "Points per game: Season Leaders\n" + msg)
                })
            } else if (r.editText(text).indexOf("ASSIST") >= 0 || r.editText(text).indexOf("AST") >= 0) {
                nba.stats("ASSISTS", function(msg) {
                    messages.sendTextMessage(sender, "Assists per game: Season Leaders\n" + msg)
                }) 
            } else if (r.editText(text).indexOf("FIELDGOAL") >= 0 || r.editText(text).indexOf("FG") >= 0) {
                nba.stats("FG", function(msg) {
                    messages.sendTextMessage(sender, "Field goal % per game: Season Leaders\n" + msg)
                })
            } else if (r.editText(text).indexOf("REBOUND") >= 0 || r.editText(text).indexOf("REB") >= 0) {
                nba.stats("REBOUNDS", function(msg) {
                    messages.sendTextMessage(sender, "Field goal % per game: Season Leaders\n" + msg)
                })
            } else if (r.editText(text).indexOf("BLOCK") >= 0 || r.editText(text).indexOf("BLK") >= 0) {
                nba.stats("BLOCKS", function(msg) {
                    messages.sendTextMessage(sender, "Field goal % per game: Season Leaders\n" + msg)
                })
            } else if (r.editText(text).indexOf("STEAL") >= 0 || r.editText(text).indexOf("STL") >= 0) {
                nba.stats("STEALS", function(msg) {
                    messages.sendTextMessage(sender, "Field goal % per game: Season Leaders\n" + msg)
                })
            }
        } else if (r.editText(text) === "WEATHER") {
            let weatherDescription = "It looks like you didn't specify a location! If you type in 'Weather' followed by a city name, ex.(Weather Calgary), RichardBot will provide you with your city's current location. OR you can just give me your location and I will do the rest!" 
            messages.location_quick_replies(sender, weatherDescription)
            location_weather = true
            continue
        } else if (r.editText(text).indexOf('WEATHER') >= 0) {
            var n = text.split(' ')
            var city = n[n.length - 1]
            weather(city, function(temp, description) {
                var msg = "Here is the current weather in " + city + 
                    "! The temperature is " + temp + "°C. Weather status: " + description + "."
                messages.sendTextMessage(sender, msg)
            })
        } else {
            // messages.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
            messages.sendTextMessage(sender, r.handleInput(text))
        }
      }
      if (event.postback) {
        let text = JSON.stringify(event.postback)
        messages.sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
        continue
      }
    }
    res.sendStatus(200)
  })


