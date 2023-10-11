import AccountController from "./account_controller.js";

class IndexController {
    static initialize(app) {
        AccountController.initialize(app);
    }
}

export default IndexController;