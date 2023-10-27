import Routes from "../routes/index_routes.js";
import LiveScoreService from "../services/livescore_service.js";
import AccountService from "../services/account_service.js";
class LiveScoreController {
    static initialize(app) {
        app.get(Routes.GET_LEAGUES, AccountService.validateSession, LiveScoreService.fetchLeague);
        app.get(Routes.LEAGUE_TEAMS, AccountService.validateSession, LiveScoreService.fetchLeagueTeams);
        app.get(Routes.FETCH_TEAM, AccountService.validateSession, LiveScoreService.fetchTeam);
        app.get(Routes.FETCH_TEAM_FIXTURES, AccountService.validateSession, LiveScoreService.teamLeagueFixtures);
        app.get(Routes.FETCH_FIXTURE_DETAILS, AccountService.validateSession, LiveScoreService.leagueFixtureDetails);
        app.get(Routes.FETCH_LEAGUE_TABLE, AccountService.validateSession, LiveScoreService.fetchLeagueStandings);
    }
}

export default LiveScoreController; 