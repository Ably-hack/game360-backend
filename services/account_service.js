import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/response_handler.js";

class AccountService {
    static welcome(req, res) {
        return ResponseHandler.sendResponseWithoutData(res, StatusCodes.OK, `Welcome back`);
    }
}

export default AccountService;