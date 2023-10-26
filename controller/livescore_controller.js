import Routes from "../routes/index_routes.js";
import LiveScoreService from "../services/livescore_service.js";

class LiveScoreController {
    static initialize(app) {
        app.get(Routes.GET_COUNTRIES, LiveScoreService.fetchCountries);
    }
}

export default LiveScoreController; 