import WebSocket from "ws"
import LiveScoreRepository from "../repository/livescore_repo.js";
import LiveScoreModel from "../models/livescore_model.js";
import MessageBrokerService from "../services/message_broker.js";

class LiveScoreServer {
    constructor() {
        this.socketUrl = `wss://wss.apifootball.com/livescore?action=livescore&APIkey=${process.env.API_FOOTBALL_KEY}`;
        this.webSocket = new WebSocket(this.socketUrl);
        this.messageBroker = new MessageBrokerService()
        this.handleOpenSocketConnection();
        this.handleSocketData();
        this.handleCloseConnection();
        this.handleErrorConnection();
    }

    handleOpenSocketConnection() {
        this.webSocket.addEventListener('open', (event) => {
            console.log('Waiting for data...');
            this.messageBroker.publish({
                id: "livescore_pending",
                data: {
                    message: "Livescore loading"
                }
            });
        });
    }

    handleSocketData() {
        this.webSocket.addEventListener('message', async (event) => {
            if (event.data) {
                console.log('data collected');
                const livescoreData = JSON.parse(event.data);
                if (Array.isArray(livescoreData) && livescoreData?.length) {
                    for (let stat of livescoreData) {
                        const match_id = stat?.match_id;
                        let matchExists = await LiveScoreRepository.fetchMatchId(match_id);
                        if (matchExists) {
                            return
                        } else {
                            const newLiveMatch = await LiveScoreModel.create({
                                match_id: stat?.match_id,
                                country_id: stat?.country_id,
                                country_name: stat?.country_name,
                                league_id: stat?.league_id,
                                league_name: stat?.league_name,
                                match_date: stat?.match_date,
                                match_status: stat?.match_status,
                                hometeam_id: stat?.match_hometeam_id,
                                awayteam_id: stat?.match_awayteam_id,
                                hometeam_name: stat?.match_hometeam_name,
                                awayteam_name: stat?.match_awayteam_name,
                                hometeam_goal: stat?.match_hometeam_score,
                                awayteam_goal: stat?.match_awayteam_score,
                                stadium: stat?.match_stadium
                            });
                            await newLiveMatch.save();
                        }
                    }
                }
            } else {
                console.log("No data");
            }
        });
    }

    handleCloseConnection() {
        this.webSocket.addEventListener('close', () => {
            console.log('Connection closed');
        });
    }

    handleErrorConnection() {
        this.webSocket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
        });
    }
}

export default LiveScoreServer;