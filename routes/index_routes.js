import AccountRoutes from "./account_routes.js";
import { API_VERSION } from "../constants.js";

const Routes = {
    ...AccountRoutes(API_VERSION),
}

export default Routes;