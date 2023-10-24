import Ably from "ably";
export default class SocketServer {
    constructor() {
        this.ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY);
        this.handleConnectionStatus();
    };

    handleConnectionStatus() {
        this.ably.connection.on("connected", () => {
            console.log("client connected");
        })
    }

    handleDisconnect() {
        this.ably.connection.on("disconnected", () => {
            this.ably.close();
            console.log("Client disconnected");
        })
    }
}