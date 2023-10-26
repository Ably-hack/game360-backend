import AccountController from "./account_controller.js";
import LiveScoreController from "./livescore_controller.js";

class IndexController {
    static initialize(app) {
        AccountController.initialize(app);
        LiveScoreController.initialize(app);
    }
}

export default IndexController;