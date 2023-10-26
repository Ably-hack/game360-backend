const LiveScoreRoutes = (apiVersion, servicePath = 'livescore') => {
    return {
        get GET_COUNTRIES() {
            return `${apiVersion}/${servicePath}/get_countries`
        }
    }
}

export default LiveScoreRoutes;