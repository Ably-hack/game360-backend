import BaseRepository from "./base_repo.js";
import LiveScoreModel from "../models/livescore_model.js";

class LiveScoreRepository extends BaseRepository {
    static async fetchMatchId(matchId) {
        return await LiveScoreModel.findOne({ match_id: matchId });
    }

    static async liveScoreByLeagueId(leagueId) {
        return await LiveScoreModel.findOne({ league_id: leagueId });
    }

    static async createLiveScoreMatches(data) {
        return await LiveScoreModel.create({
            match_id: data?.match_id,
            country_id: data?.country_id,
            country_name: data?.country_name,
            league_id: data?.league_id,
            league_name: data?.league_name,
            match_date: data?.match_date,
            match_status: data?.match_status,
            hometeam_id: data?.match_hometeam_id,
            awayteam_id: data?.match_awayteam_id,
            hometeam_name: data?.match_hometeam_name,
            awayteam_name: data?.match_awayteam_name,
            hometeam_goal: data?.match_hometeam_score,
            awayteam_goal: data?.match_awayteam_score,
            logo: {
                home_team: data?.team_home_badge,
                away_team: data?.team_away_badge
            },
            stadium: data?.match_stadium
        });
    }

    static async deleteExistingMatches() {
        return await LiveScoreModel.deleteMany({ match_date: { $lt: new Date() } });
    }
}

export default LiveScoreRepository;