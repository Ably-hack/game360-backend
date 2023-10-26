import AccountRoutes from "./account_routes.js";
import LiveScoreRoutes from "./livescore_routes.js";
import { API_VERSION } from "../constants.js";

const Routes = {
    ...AccountRoutes(API_VERSION),
    ...LiveScoreRoutes(API_VERSION)
}

export default Routes;