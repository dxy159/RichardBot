const messages = require('./../messages.js')
const r = require('./../responses.js')
const nba = require('./nba_api_request.js')

function handle_nba(sender, text) {
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
    } else if (r.editText(text).indexOf("NBAGAMES") >= 0) {
        nba.games(function(msg, num_games) {
            messages.nba_games(sender, "Here are the games for today!\n\n" + msg, num_games)
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
    

}

module.exports = {
	handle_nba: handle_nba
}


