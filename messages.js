const request = require('request')

// Inject token as environmental variables
const token = "EAAZA8BfowKQgBAAzXQsP71No5NzHbz1CutWQIlke2ZChYVYVOGZByBoL8lIpExlHV97UgsDMyziu7q4kqXPycUkIwU8eYgwNeRafkn7VoLrNabwxJSvQWoXupQ1SQtH5gE80il4UDgxsgDOWyDd6Ttzkfx8qOWjQZBPeORwFPgZDZD"

// To echo back messages
function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

// Send test message back as two cards
function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

// Send quick replies (used for "WEATHER" command)
function location_quick_replies(sender, text) {
    let messageData = {
        "text": text,
        "quick_replies":[
            {
                "content_type": "location",
            }
        ]
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function nba_stats(sender, text) {
    let messageData = {
        "text": text,
        "quick_replies":[
          {
            "content_type":"text",
            "title":"Points",
            "payload":"NBASTATSPOINTS"
          },
          {
            "content_type":"text",
            "title":"Rebounds",
            "payload":"NBASTATSREBOUNDS"
          },
          {
            "content_type":"text",
            "title":"Assists",
            "payload":"NBASTATSASSISTS"
          },
          {
            "content_type":"text",
            "title":"Steals",
            "payload":"NBASTATSSTEALS"
          },
          {
            "content_type":"text",
            "title":"Blocks",
            "payload":"NBASTATSBLOCKS"
          },
          {
            "content_type":"text",
            "title":"FG%",
            "payload":"NBASTATSFG"
          }
        ]
    }
}

module.exports = {
	sendTextMessage: sendTextMessage,
	sendGenericMessage: sendGenericMessage,
    location_quick_replies: location_quick_replies
    nba_stats: nba_stats
}











