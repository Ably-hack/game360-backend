import axios from "axios";
import ResponseHandler from "../utils/response_handler.js"
import { StatusCodes } from "http-status-codes";
import Preconditions from "../utils/preconditions.js";
import Strings from "../lang/strings.js";

class LiveScoreService {
    static BASE_URL = 'https://apiv3.apifootball.com';
    static API_KEY = process.env.API_FOOTBALL_KEY;

    static async fetchLeague(req, res) {
        const leagues = ['FIFA World Cup', 'UEFA European Championship', 'Copa America', 'African Cup of Nations ',
            'AFC Asian Cup', 'UEFA Champions League', 'UEFA Europa League', 'AFC Champions League', 'English Premier League',
            'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Major League Soccer'];

        let countriesLeague = [];
        let refinedData = [];
        try {
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_leagues&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const leagueData = response?.data;
            if (leagueData?.length ?? []) {
                countriesLeague = leagues.flatMap((item) => {
                    const newData = leagueData?.filter((i) => i['league_name'] == item);
                    return newData;
                });
                if (countriesLeague?.length) {
                    for (const team of countriesLeague) {
                        const refinedObj = {
                            id: team?.league_id,
                            name: team?.league_name,
                            country_id: team?.country_id,
                            country_name: team?.country_name,
                            logo: team?.league_logo,
                            country_logo: team?.country_logo,
                            season: team?.league_season
                        }
                        refinedData.push(refinedObj);
                    }
                }
            }
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "Leagues", (refinedData ?? []));
        }
        catch (error) {
            console.error(error);
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }
    }

    static async fetchLeagueTeams(req, res) {
        const { league_id } = req.params;
        const badRequestError = Preconditions.checkNotNull({ league_id });
        if (badRequestError) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, badRequestError);
        }
        try {
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_teams&league_id=${league_id}&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const leagueTeamData = response?.data;
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "Teams", leagueTeamData);
        }
        catch (error) {
            console.error(error);
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }
    }

    static async fetchTeam(req, res) {
        const { team_id } = req.params;
        const badRequestError = Preconditions.checkNotNull({ team_id });
        if (badRequestError) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, badRequestError);
        }
        try {
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_teams&team_id=${team_id}&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const teamData = response?.data;
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "Team data", teamData);
        }
        catch (error) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }

    }
}

export default LiveScoreService;