const LiveScoreRoutes = (apiVersion, servicePath = 'livescore') => {
    return {
        get GET_LEAGUES() {
            return `${apiVersion}/${servicePath}/get_leagues`
        },
        get LEAGUE_TEAMS() {
            return `${apiVersion}/${servicePath}/teams/:league_id`
        },
        get FETCH_TEAM() {
            return `${apiVersion}/${servicePath}/team/:team_id`
        },
        get FETCH_TEAM_FIXTURES() {
            return `${apiVersion}/${servicePath}/fixtures`
        },
        get FETCH_FIXTURE_DETAILS() {
            return `${apiVersion}/${servicePath}/fixture/:match_id`
        },
        get FETCH_LEAGUE_TABLE() {
            return `${apiVersion}/${servicePath}/league/standings/:league_id`
        }
    }
}

export default LiveScoreRoutes;