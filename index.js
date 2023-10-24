import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

import IndexController from './controller/index_controller.js';
import Database from './datastore/database.js';
import SocketServer from './socket_server/socket.js';
import MessageBrokerService from "./services/message_broker.js";
const messageBroker = new MessageBrokerService();

const app = express();
const server = http.createServer(app);
const socketServer = new SocketServer(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pubSubSubscriber = function (receivedData) {
    console.log(receivedData, "#received-data");
    let { id, data } = receivedData?.data;
    if (id && data) {
        socketServer.io.emit(id, data);
    }
}
class AppServer {
    constructor() {
        this.initializeAllProcesses();
    }

    async initializeAllProcesses() {
        await this.initMiddleWare();
        this.initializeCORS();
        this.initializeDatabase();
        this.initializeController();
        // this.initSocketServer(server);
    }

    async initializeDatabase() {
        Database.connectDatabase(app);
    }

    // initSocketServer() {
    //     new SocketServer();
    // }

    async initMiddleWare() {
        app.use('/static', express.static(path.join(__dirname, 'public')));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }

    initializeCORS() {
        var corsOptions = {
            origin: function (origin, callback) {
                callback(null, true)
            }
        }
        app.use(cors(corsOptions));
    };

    initializeController() {
        IndexController.initialize(app);
    }

    initializeApp() {
        const port = process.env.PORT || 8000;
        try {
            server.listen(port, async () => {
                const channel = messageBroker.ably.channels.get("football");
                channel.subscribe('event', pubSubSubscriber);

                console.log(`Application connected to port ${port}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}

let appServer = new AppServer();
appServer.initializeApp(); 
