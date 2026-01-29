/**
 * Authentication Routes
 * Handles user registration and login endpoints
 */

const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

/**
 * POST /api/auth/register
 * Register a new user
 * Body: { username: string, password: string }
 */
router.post("/register", register);

/**
 * POST /api/auth/login
 * Login user and receive JWT token
 * Body: { username: string, password: string }
 * Response: { token: string }
 */
router.post("/login", login);

module.exports = router;
