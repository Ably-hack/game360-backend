import Ably from "ably";
export default class SocketServer {
    constructor() {
        this.ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY);
        this.handleConnectionStatus();
    };

    handleConnectionStatus() {
        this.ably.connection.on("connected", (socket) => {
            console.log("client connected");
        })
    }

    handleDisconnect() {
        this.ably.connection.on("disconnected", () => {
            console.log("Client disconnected");
        })
    }
}