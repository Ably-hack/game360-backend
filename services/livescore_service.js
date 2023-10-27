import axios from "axios";
import ResponseHandler from "../utils/response_handler.js"
import { StatusCodes } from "http-status-codes";
import Preconditions from "../utils/preconditions.js";
import Strings from "../lang/strings.js";
import moment from "moment";
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
            let refinedData = [];
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_teams&league_id=${league_id}&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const leagueTeamData = response?.data;
            if ((leagueTeamData ?? []).length) {
                for (let team of leagueTeamData) {
                    let refinedObj = {
                        id: team?.team_key,
                        name: team?.team_name,
                        country: team?.team_country,
                        year_founded: team?.team_founded,
                        logo: team?.team_badge
                    }
                    refinedData.push(refinedObj);
                }
            }
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "League Teams", refinedData);
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
            let players = [];
            let totalPlayers;
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_teams&team_id=${team_id}&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const teamData = response?.data;
            let teamId;
            if ((teamData ?? []).length) {
                for (let team of teamData) {
                    teamId = team?.team_key;
                    let teamPlayers = team?.players;
                    totalPlayers = teamPlayers?.length;
                    for (let player of teamPlayers ?? []) {
                        let playerStats = {
                            id: player?.player_id,
                            picture: player?.player_image,
                            name: player?.player_name,
                            country: player?.player_country,
                            number: player?.player_number,
                            position: player?.player_type,
                            age: player?.player_age,
                            goals: player?.player_goals,
                            assists: player?.player_assists,
                            ratings: player?.player_rating,
                            appearances: player?.player_match_played,
                            yellow_cards: player?.player_yellow_cards,
                            red_cards: player?.player_red_cards
                        }
                        players.push(playerStats);
                    }
                }
            }
            const team = {
                players: [...players],
                total_players: totalPlayers,
            }
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "Team data", team);
        }
        catch (error) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }
    }

    static async teamLeagueFixtures(req, res) {
        const { league_id, team_id } = req.query;
        const badRequestError = Preconditions.checkNotNull({ league_id, team_id });
        if (badRequestError) {
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.badRequestError);
        }
        try {
            let startDate = moment().startOf('month').format('YYYY-MM-DD');
            let endDate = moment().endOf('month').format('YYYY-MM-DD');
            const response = await axios.get(`${LiveScoreService.BASE_URL}/?action=get_events&from=${startDate}&to=${endDate}&league_id=${league_id}&team_id=${team_id}&APIkey=${process.env.API_FOOTBALL_KEY}`);
            const fixtureData = response?.data;
            if (typeof fixtureData == 'object' && fixtureData.hasOwnProperty('message')) {
                let message = fixtureData?.message;
                if (message.includes("No event found")) {
                    return ResponseHandler.sendResponseWithoutData(res, StatusCodes.OK, "No event found");
                }
            }
            return ResponseHandler.sendResponseWithData(res, StatusCodes.OK, "Fixtures", fixtureData);
        }
        catch (error) {
            console.error(error);
            return ResponseHandler.sendErrorResponse(res, StatusCodes.BAD_REQUEST, Strings.ERROR_RESPONSE);
        }
    }
}

export default LiveScoreService;