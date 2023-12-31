import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerUIOptions } from './docs/index.js';

dotenv.config();
import IndexController from './controller/index_controller.js';
import Database from './datastore/database.js';
import SocketServer from './socket_server/socket.js';
import MessageBrokerService from "./services/message_broker.js";
import LiveScoreServer from './socket_server/livescore_socket.js';

const messageBroker = new MessageBrokerService();

const app = express();
const server = http.createServer(app);
const socketServer = new SocketServer(server);
const specs = swaggerJSDoc(swaggerUIOptions);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pubSubSubscriber = function (receivedData) {
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
        this.initializeController();
        this.initializeSwaggerDocs();
        this.initLiveScoreServer();
        this.initializeDatabase();
    }

    async initializeDatabase() {
        Database.connectDatabase(app);
    }

    initLiveScoreServer() {
        global.liveScoreServer = new LiveScoreServer();
    }

    async initializeSwaggerDocs() {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
            customCssUrl: process.env.CUSTOM_CSS_URL
        }));
    }

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
