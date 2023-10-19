import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);

// The init function
async function init() {
  // Connect to the database
  const { MONGO_URI } = process.env;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Initialize any other services or components that you need
}

// The initializeAllProcesses function
async function initializeAllProcesses() {
  await this.initMiddleWare();
  this.initializeCORS();
  this.initializeRoutes();

  // Call the init function
  await init();
}

// The initMiddleWare function
async function initMiddleWare() {
  app.use('/static', express.static(path.join(__dirname, 'public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
}

// The initializeCORS function
function initializeCORS() {
  var corsOptions = {
    origin: function (origin, callback) {
      callback(null, true);
    },
  };
  app.use(cors(corsOptions));
}

// The initializeRoutes function
function initializeRoutes() {
  app.use('/auth', authRoutes);
}

// The initializeApp function
async function initializeApp() {
  const port = process.env.PORT || 8000;
  try {
    server.listen(port, async () => {
      console.log(`Application connected to port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

initializeApp();
