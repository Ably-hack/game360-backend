import BaseRepository from "./base_repo.js";
import LiveScoreModel from "../models/livescore_model.js";

class LiveScoreRepository extends BaseRepository {
    static async fetchMatchId(matchId) {
        return await LiveScoreModel.findOne({ match_id: matchId });
    }

    static async liveScoreByLeagueId(leagueId) {
        return await LiveScoreModel.findOne({ league_id: leagueId });
    }
}

export default LiveScoreRepository;