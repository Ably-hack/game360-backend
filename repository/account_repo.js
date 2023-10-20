import AccountModel from "../models/account_model.js";
import BaseRepository from "./base_repo.js";

class AccountRepository extends BaseRepository {
    static async findByEmail(email) {
        return super.findByEmail(AccountModel, email);
    }
    static async findById(id) {
        return super.findByEmail(AccountModel, id);
    }
}

export default AccountRepository;
