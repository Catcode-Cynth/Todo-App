/**
 * Todo App Main Application File
 * Sets up Express server, middleware, routes, and database connection
 */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const session = require("express-session");
const logger = require("./utils/logger");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables from .env file
dotenv.config();
const app = express();

// ==================== MIDDLEWARE ====================

// Parse JSON and form data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for cross-origin requests
app.use(cors());

// Log HTTP requests in development format
app.use(morgan("dev"));

// Custom request logger middleware
app.use(logger);

// Allow HTML forms to send PUT/DELETE requests via _method field
app.use(methodOverride("_method"));

// ==================== SESSION CONFIGURATION ====================

const sessionConfig = {
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hour
  },
};

// Use MongoDB session store in production
if (process.env.NODE_ENV === "production") {
  try {
    const MongoStore = require("connect-mongo");
    sessionConfig.store = new MongoStore({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    });
  } catch (err) {
    console.warn("MongoStore not available, using memory store:", err.message);
  }
}

app.use(session(sessionConfig));

// ==================== API ROUTES ====================

// Authentication endpoints: /api/auth/register, /api/auth/login
app.use("/api/auth", authRoutes);

// Task endpoints: /api/tasks (CRUD operations)
app.use("/api/tasks", taskRoutes);

// ==================== VIEW ENGINE SETUP ====================

// Use EJS templating engine for server-side rendering
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// ==================== ROOT ROUTE ====================

// Simple welcome message for API root
app.get("/", (req, res) => {
  res.send("Welcome to the Todo App! The API is live 🚀");
});

// ==================== VIEW ROUTES ====================

// Render pages (register, login, dashboard)
const viewRoutes = require("./routes/viewRoutes");
app.use("/", viewRoutes);

// ==================== ERROR HANDLING ====================

// Global error handler - must be last
app.use(errorHandler);

// ==================== DATABASE CONNECTION ====================

// Connect to MongoDB (skip in test environment)
if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));
}

module.exports = app;
