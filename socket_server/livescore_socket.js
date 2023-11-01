import WebSocket from "ws";
import LiveScoreRepository from "../repository/livescore_repo.js";
import MessageBrokerService from "../services/message_broker.js";

class LiveScoreServer {
    constructor() {
        this.socketUrl = `wss://wss.apifootball.com/livescore?action=get_events&APIkey=${process.env.API_FOOTBALL_KEY}`;
        this.webSocket = new WebSocket(this.socketUrl);
        this.messageBroker = new MessageBrokerService()
        this.handleOpenSocketConnection();
        this.handleSocketData();
        // this.handleCloseConnection();
        // this.handleErrorConnection();
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
                        let matchData = await LiveScoreRepository.fetchMatchId(match_id);
                        if (matchData) {
                            return;
                        } else {
                            await LiveScoreRepository.deleteExistingMatches();
                            let liveMatches = await LiveScoreRepository.createLiveScoreMatches(stat);
                            await liveMatches.save();
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