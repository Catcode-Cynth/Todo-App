/**
 * Authentication Controller
 * Handles user registration and login
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Register a new user
 * POST /api/auth/register
 * Body: { username: string, password: string }
 */
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Create new user instance (password will be hashed automatically)
    const user = new User({ username, password });
    await user.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed', details: err.message });
  }
};

/**
 * Login user and return JWT token
 * POST /api/auth/login
 * Body: { username: string, password: string }
 * Returns: { token: string }
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user by username
    const user = await User.findOne({ username });
    
    // Verify password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token (expires in 1 hour)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: 'Login failed', details: err.message });
  }
};

