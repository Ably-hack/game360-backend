import Routes from "../routes/index_routes.js";
import AccountService from "../services/account_service.js";

class AccountController {
    static initialize(app) {
        app.post(Routes.LOGIN, AccountService.login);
        app.post(Routes.REGISTER, AccountService.register);
    }
}

export default AccountController; 