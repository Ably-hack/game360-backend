import Ably from "ably";

export default class MessageBrokerService {
    constructor() {
        this.ably = new Ably.Realtime.Promise(process.env.ABLY_API_KEY);
        this.handleConnectionStatus();
        // this.channel = this.ably.
    }

    // Publish the message using the initialized channel 
    async publish(data) {
        const channel = this.ably.channels.get("football");
        channel.publish("event", data);
    }

    // handle connected status
    handleConnectionStatus() {
        this.ably.connection.on("connected", () => {
            console.log("client connected");
        })
    }

    // handle disconnected status
    handleDisconnect() {
        this.ably.connection.on("disconnected", () => {
            this.ably.close();
            console.log("Client disconnected");
        })
    }
}