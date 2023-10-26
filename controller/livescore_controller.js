import Routes from "../routes/index_routes.js";
import LiveScoreService from "../services/livescore_service.js";
class LiveScoreController {
    static initialize(app) {
        app.get(Routes.GET_LEAGUES, LiveScoreService.fetchLeague);
        app.get(Routes.LEAGUE_TEAMS, LiveScoreService.fetchLeagueTeams);
    }
}

export default LiveScoreController; 