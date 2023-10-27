const LiveScoreRoutes = (apiVersion, servicePath = 'livescore') => {
    return {
        get GET_LEAGUES() {
            return `${apiVersion}/${servicePath}/get_leagues`
        },
        get LEAGUE_TEAMS() {
            return `${apiVersion}/${servicePath}/teams/:league_id`
        },
        get GET_TEAM() {
            return `${apiVersion}/${servicePath}/team/:team_id`
        }
    }
}

export default LiveScoreRoutes;