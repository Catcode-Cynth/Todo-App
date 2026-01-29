/**
 * User Model
 * Defines the User schema and methods for authentication
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define User schema
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true,      // Prevent duplicate usernames
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

/**
 * Pre-save hook: Hash password before storing in database
 * Only hashes if password field was modified (not on every save)
 */
userSchema.pre('save', async function(next) {
  // Skip if password hasn't changed
  if (!this.isModified('password')) return next();
  
  // Hash password with salt rounds of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/**
 * Instance method: Compare candidate password with hashed password
 * Used during login to verify password is correct
 * 
 * @param {string} candidatePassword - Plain text password from login form
 * @returns {Promise<boolean>} - True if passwords match
 */
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
