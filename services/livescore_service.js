import axios from "axios";
import ResponseHandler from "../utils/response_handler.js"
import { StatusCodes } from "http-status-codes";

class LiveScoreService {
    static BASE_URL = 'https://apiv3.apifootball.com';
    static API_KEY = process.env.API_FOOTBALL_KEY;

    static async fetchCountries(req, res) {
        try {
            let response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_countries&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const data = response?.data;
            return data;
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default LiveScoreService;