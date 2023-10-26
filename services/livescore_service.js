import axios from "axios";
import ResponseHandler from "../utils/response_handler.js"
import { StatusCodes } from "http-status-codes";

class LiveScoreService {
    static BASE_URL = 'https://apiv3.apifootball.com';
    static API_KEY = process.env.API_FOOTBALL_KEY;

    static async fetchLeague(req, res) {
        const leagues = ['FIFA World Cup', 'UEFA European Championship', 'Copa America', 'African Cup of Nations ',
            'AFC Asian Cup', 'UEFA Champions League', 'UEFA Europa League', 'AFC Champions League', 'English Premier League',
            'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Major League Soccer'];

        let countriesLeague = [];
        try {
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_leagues&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const leagueData = response?.data;
            if (leagueData?.length ?? []) {
                countriesLeague = leagues.flatMap((item) => {
                    const newData = leagueData?.filter((i) => i['league_name'] == item);
                    return newData;
                });
            }
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "Leagues", (countriesLeague ?? []));
        }
        catch (error) {
            console.error(error);
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, "Something went wrong");
        }
    }

    static async fetchCountryTeam(req, res) {
        try {
            // fetch country team
        }
        catch (error) {
            console.error(error);
        }
    }
}

export default LiveScoreService;