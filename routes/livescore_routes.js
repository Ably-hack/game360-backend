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
        }
    }
}

export default LiveScoreRoutes;