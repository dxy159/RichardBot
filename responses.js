
// Strip all punctuation and spaces
function editText(text) {
	var newText = text.replace(/[.,?!' ]/g, '').toUpperCase()
	return newText
}

// Responses to certain commands
responses = {
	"HIITSLILY": "Suh lilypad",
	"RUMAIZ": "Hey look it's Rumaizio!",
	"HOWAREYOU": "My day is going pretty well! How about yours?",
	"DICKNI": "Goodbye.",
	"DICKLESSNI": "This type of harassment will NOT be tolerated!",
	"ILOVEYOU": "<3",
	"BYE": "Talk to ya later!",
	"URWEBSITE": "http://richardwni.com/",
	"URMASTER": "My master's name is Richard Ni. He created me from the grains of stardust. Here is his profile: \n https://www.facebook.com/richard.ni.9",
	"THUMBSUP": "(Y)",
	"BESTSCHOOL": "Obviously McGill University?? Duh!",
	"OTHER": "Hmm.. I didn't quite get that."
}

// Function to handle greetings
function greeting() {
	let random = Math.floor((Math.random() * 6) + 1)

	switch (random) {
		case 1: return "Hey there! I'm RichardBot!"
		case 2: return "Hello! I am RichardBot, the alter ego of Richard Ni. How may I serve you?"
		case 3: return "Sup dawggg."
		case 4: return "Yoyoyo. RichardBot at your service!"
		case 5: return "Howdy partner :P."
		case 6: return "Hi there! How are you today?"
		default: return ""
	}
}

// Relay between input and response
function handleInput(input) {
	text = editText(input)

	if (text.indexOf('HI') >= 0 || text.indexOf('HEY') >= 0 || text.indexOf('SSUP') >= 0 || 
		text.indexOf('YO') >= 0 || text.indexOf('HELLO') >= 0 || text.indexOf('HOWDY') >= 0 || 
		text.indexOf('DDUP') >= 0) {
		return greeting()
	} else if (text.indexOf('BYE') >= 0) {
		return responses['BYE']
	} else if (text.indexOf('DICKLESSNI') >= 0) {
		return responses['DICKLESSNI']
	} else if (text.indexOf('DICKNI') >= 0) {
		return responses['DICKNI']
	} else if (text.indexOf('RUMAIZ') >= 0) {
		return responses['RUMAIZ']
	} else if (text.indexOf('URWEBSITE') >= 0) {
		return responses['URWEBSITE']
	} else if (text.indexOf('BESTSCHOOL') >= 0) {
		return responses['BESTSCHOOL']
	} else if (text.indexOf('URMASTER') >= 0) {
		return responses['URMASTER']
	} else if (text.indexOf('COOL') >= 0 || text.indexOf('GOOD') >= 0 || text.indexOf('WOW') >= 0 || 
			   text.indexOf('NICE') >= 0 || text.indexOf('OK') >= 0) {
		return responses['THUMBSUP']
	} else {
		return responses['OTHER']
	}
}


module.exports = {
	handleInput: handleInput
}

















