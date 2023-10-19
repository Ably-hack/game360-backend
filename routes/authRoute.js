import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Validate user registration requests
router.post('/register', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  next();
});

// Validate user login requests
router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  next();
});

// Register a new user
router.post('/register', register);

// Log in a user
router.post('/login', login);

export default router;
