import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/response_handler.js";
import AccountRepository from "../repository/account_repo.js";
import AccountModel from "../models/account_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Preconditions from "../utils/preconditions.js";
import Strings from "../lang/strings.js";
class AccountService {
    static async login(req, res) {
        const { email, password } = req.body;
        const badRequestError = Preconditions.checkNotNull({
            email,
            password
        });
        if (badRequestError) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, badRequestError);
        }
        let isEmailValid = Preconditions.validateEmail(email);
        if (!isEmailValid) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.INVALID_EMAIL);
        }
        try {
            const user = await AccountRepository.findByEmail(email);
            if (user) {
                const verifyPassword = await AccountRepository.comparePassword(password, user.password);
                if (!verifyPassword) {
                    return ResponseHandler.sendErrorResponse(res, StatusCodes.Strings.INVALID_CREDENTIALS);
                }
                const token = jwt.sign({
                    user_id: user._id,
                    email
                },
                    process.env.TOKEN_SECRET, {
                    expiresIn: '2h'
                });
                user.token = token;
                return ResponseHandler.sendResponseWithoutData(res, StatusCodes.OK, Strings.LOGIN_SUCCESSFUL);
            } else {
                return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.USER_NOT_FOUND);
            }
        } catch (error) {
            console.error(error);
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, "Something went wrong");
        }
    }

    static async register(req, res) {
        const { email, password } = req.body;
        const badRequestError = Preconditions.checkNotNull({
            email,
            password
        });
        if (badRequestError) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, badRequestError);
        }
        let isEmailValid = Preconditions.validateEmail(email);
        if (!isEmailValid) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.INVALID_EMAIL);
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const createAccount = await AccountModel.create(({
                email,
                password: hashedPassword
            }));
            await createAccount.save();
            return ResponseHandler.sendResponseWithoutData(res, StatusCodes.OK, Strings.ACCOUNT_CREATED);
        }
        catch (error) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }
    }
}

export default AccountService;