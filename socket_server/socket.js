import { Server } from "socket.io";
export default class SocketServer {
    constructor(server) {
        this.io = new Server(server);
        this.handleConnectionStatus();
    }

    handleConnectionStatus() {
        this.io.on("connection", (socket) => {
            console.log(`Client ${socket.id} connected`);
        });
    }

    handleDisconnect(socket) {
        socket.on("disconnect", async () => {
            socket.disconnect();
            console.log(`Client ${socket.id} Disconnected`);
        });
    }
}
