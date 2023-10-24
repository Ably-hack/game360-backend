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

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class AppServer {
    constructor() {
        this.initializeAllProcesses();
    }

    async initializeAllProcesses() {
        await this.initMiddleWare();
        this.initializeCORS();
        this.initializeDatabase();
        this.initializeController();
        this.initSocketServer();
    }

    async initializeDatabase() {
        Database.connectDatabase(app);
    }

    initSocketServer() {
        global.socketServer = new SocketServer();
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
