import Routes from "../routes/index_routes.js";
import AccountService from "../services/account_service.js";

class AccountController {
    static initialize(app) {
        app.get(Routes.WELCOME, AccountService.welcome);
    }
}

export default AccountController; 