import { StatusCodes } from "http-status-codes";
import ResponseHandler from "../utils/response_handler.js"
import AccountRepository from "../repository/account_repo.js";
import AccountModel from "../models/account_model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Preconditions from "../utils/preconditions.js";
import Strings from "../lang/strings.js";
import MessageBrokerService from "./message_broker.js";
class AccountService {
    static async validateSession(req, res, next) {
        const authToken = req.header('Authorization');
        if (!authToken || !authToken.startsWith('Bearer ')) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.UNAUTHORIZED, Strings.USER_UNAUTHORIZED);
        }
        const token = authToken.replace('Bearer ', '');
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                if (err?.name == "TokenExpiredError") {
                    return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, "Token has expired");
                }
                return ResponseHandler.sendErrorResponse(res, StatusCodes.UNAUTHORIZED, Strings.USER_UNAUTHORIZED);
            }
            try {
                const user = await AccountRepository.findByEmail(decoded.email);
                if (!user) {
                    return ResponseHandler.sendErrorResponse(res, StatusCodes.UNAUTHORIZED, Strings.USER_UNAUTHORIZED);
                }
                req.user = decoded;
                next();
            }
            catch (error) {
                console.error(error);
                return ResponseHandler.sendErrorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, "Internal server error");
            }
        });
    }

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
                    return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.INVALID_CREDENTIALS);
                }
                const token = jwt.sign({
                    user_id: user._id,
                    email
                },
                    process.env.TOKEN_SECRET, {
                    expiresIn: '2h'
                });
                const responseBody = {
                    user: {
                        id: user._id,
                        email: user.email
                    },
                    accessToken: token,
                }
                return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, Strings.LOGIN_SUCCESSFUL, responseBody);
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
            return ResponseHandler.sendResponseWithoutData(res, StatusCodes.CREATED, Strings.ACCOUNT_CREATED);
        }
        catch (error) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }
    }

    static connectUser(req, res) {
        const { message } = req.body;
        const badRequestError = Preconditions.checkNotNull({ message });
        if (badRequestError) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, badRequestError);
        }
        const messageBroker = new MessageBrokerService();
        try {
            messageBroker.publish({
                id: "Greetings",
                data: {
                    message,
                    timestamp: new Date().toISOString()
                }
            });
            return ResponseHandler.sendResponseWithoutData(res, StatusCodes.OK, "Message published successfully");
        }
        catch (error) {
            console.error(error);
            console.log("Error publishing message");
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, "Something went wrong");
        }
    }
}

export default AccountService;