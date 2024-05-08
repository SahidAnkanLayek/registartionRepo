require('dotenv').config();
const express = require("express");
const app = express();
const { connectToDatabase } = require("./config/database");
const authRoutes = require("./routes/authRoute");
const { registerUser, loginUser } = require("./controllers/authControllers");



// Middleware
app.use(express.json());

// Database Connection 
connectToDatabase();

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
