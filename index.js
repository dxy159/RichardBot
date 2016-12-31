'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const weather = require('./weather/weather_api_request.js')
const messages = require('./messages.js')

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
        let text = event.message.text
        if (text === 'Generic') {
            messages.sendGenericMessage(sender)
            continue
        }
        if (text === 'Hey its Colin') {
            sendTextMessage(sender, "Hi Colin you should switch into Software Engineering!!")
        } else if (text.indexOf('Weather') >= 0) {
            var n = text.split(' ')
            var city = n[n.length - 1]
            weather(city, function(temp, description) {
                var msg = "Here is the current weather in " + city + 
                    "! The temperature is " + temp + "°C. Weather status: " + description + "."
                messages.sendTextMessage(sender, msg)
            })
        } else {
            messages.sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
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









