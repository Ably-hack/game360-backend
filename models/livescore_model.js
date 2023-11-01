import mongoose from "mongoose";

const liveScoreSchema = new mongoose.Schema({
    match_id: {
        type: String,
        required: true
    },
    country_id: String,
    country_name: String,
    league_id: String,
    league_name: String,
    match_date: String,
    match_status: String,
    hometeam_id: String,
    awayteam_id: String,
    hometeam_name: String,
    awayteam_name: String,
    hometeam_goal: String,
    awayteam_goal: String,
    hometeam_halftime_goal: String,
    awayteam_halftime_goal: String,
    stadium: String,
    logo: {
        home_team: String,
        away_team: String,
    },
    goalscorers: [{
        name: String,
        time: String,
        score: String,
        score_info_time: String
    }]
});

const LiveScoreModel = mongoose.model('LiveScore', liveScoreSchema);
export default LiveScoreModel;