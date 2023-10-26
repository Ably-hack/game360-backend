import Routes from "../routes/index_routes.js";
import LiveScoreService from "../services/livescore_service.js";
import AccountService from "../services/account_service.js";
class LiveScoreController {
    static initialize(app) {
        app.get(Routes.GET_LEAGUES, AccountService.validateSession, LiveScoreService.fetchLeague);
        app.get(Routes.LEAGUE_TEAMS, AccountService.validateSession, LiveScoreService.fetchLeagueTeams);
    }
}

export default LiveScoreController; 