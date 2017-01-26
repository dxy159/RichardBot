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
    for (let i = 0; i < messaging_events.length; i++) {
      let event = req.body.entry[0].messaging[i]
      let sender = event.sender.id
      if (event.message && event.message.text) {
        var text = event.message.text

        if (event.message.quick_reply) {
            var status = JSON.stringify(event.message.quick_reply.payload)
            text = status
        }
        if (text === 'Generic') {
            messages.sendGenericMessage(sender)
            continue
        }
        if (r.editText(text).indexOf("NBA") >= 0) {
            if (r.editText(text).indexOf("NBASTATS") >= 0) {
                if (r.editText(text).indexOf("POINT") >= 0 || r.editText(text).indexOf("PT") >= 0) {
                    nba.stats("POINTS", function(msg) {
                        messages.nba_stats_back(sender, "Points per game: Season Leaders\n" + msg)
                    })
                } else if (r.editText(text).indexOf("ASSIST") >= 0) {
                    nba.stats("ASSISTS", function(msg) {
                        messages.nba_stats_back(sender, "Assists per game: Season Leaders\n" + msg)
                    }) 
                } else if (r.editText(text).indexOf("FIELDGOAL") >= 0 || r.editText(text).indexOf("FG") >= 0) {
                    nba.stats("FG", function(msg) {
                        messages.nba_stats_back(sender, "Field goal % per game: Season Leaders\n" + msg)
                    })
                } else if (r.editText(text).indexOf("REBOUND") >= 0 || r.editText(text).indexOf("REB") >= 0) {
                    nba.stats("REBOUNDS", function(msg) {
                        messages.nba_stats_back(sender, "Rebounds per game: Season Leaders\n" + msg)
                    })
                } else if (r.editText(text).indexOf("BLOCK") >= 0 || r.editText(text).indexOf("BLK") >= 0) {
                    nba.stats("BLOCKS", function(msg) {
                        messages.nba_stats_back(sender, "Blocks per game: Season Leaders\n" + msg)
                    })
                } else if (r.editText(text).indexOf("STEAL") >= 0 || r.editText(text).indexOf("STL") >= 0) {
                    nba.stats("STEALS", function(msg) {
                        messages.nba_stats_back(sender, "Steals per game: Season Leaders\n" + msg)
                    })
                } else {
                    let msg = "Please choose one of the following categories and I will tell you the top 5 season leaders."
                    messages.nba_stats(sender, msg)
                }
                continue
            } else if (r.editText(text).indexOf("NBAGAMES") >= 0) {
                nba.games(function(msg) {
                    messages.sendTextMessage(sender, "Here are the games for today!\n\n" + msg)
                })
            } else if (r.editText(text).indexOf("NBASTANDINGS") >= 0) {
                if (r.editText(text).indexOf("EAST") >= 0) {
                    nba.standings("EASTERN", function(msg) {
                        messages.nba_standings_back(sender, "Current Standing in the Eastern Conference:\n\n" + msg)
                    })
                } else if (r.editText(text).indexOf("WEST") >= 0) {
                    nba.standings("WESTERN", function(msg) {
                        messages.nba_standings_back(sender, "Current Standing in the Western Conference:\n\n" + msg)
                    })
                } else {
                    messages.nba_standings(sender, "Select a Conference!")
                }
            } else {
                let msg = "RichardBot can provide you with all different sorts of information about the NBA. Please be kept updated as more and more cool NBA features will be added soon!"
                messages.nba(sender, msg)
            }
            continue
        }
        else if (r.editText(text) === "WEATHER") {
            let weatherDescription = "Welcome to RichardBot's awesome and handy weather feature. Type in 'Weather' followed by any city name and I will provide you with that location's weather information! For example, 'Weather Calgary' will allow me to give you Calgary's current weather information. For now sending your location will not work due to a technical issue, but I will keep you updated if this problem is resolved!" 
            messages.location_quick_replies(sender, weatherDescription)
            continue
        } else if (r.editText(text).indexOf('WEATHER') >= 0) {
            var n = text.split(' ')
            var city = n[n.length - 1]
            weather(city, function(temp, description) {
                var msg = ""
                if (temp == "nac") {
                    msg = "Please enter a real city."
                } else {
                    var msg = "Here is the current weather in " + city + 
                              "! The temperature is " + temp + "°C. Weather status: " + description + "."
                }
                messages.sendTextMessage(sender, msg)
            })
            continue
        } else if (r.editText(text).indexOf('HELP') >= 0) {
            let msg = "RichardBot is programmed to have many cool features. Currently I can provide you with the weather in any city in the world along with awesome NBA information! Or you just simply say hi! :D"
            messages.help(sender, msg)
            continue
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


