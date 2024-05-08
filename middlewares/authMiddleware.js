const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

async function registerUserMiddleware(req, res, next) {
    const { name, email, password } = req.body;
  
    try {
      // hashing the password before going to the database
      const salt = await bcrypt.genSalt(10);
      const hash_pass = await bcrypt.hash(password, salt);
  
      // Create a new user in the database
      const data = await UserModel.create({
        name,
        email,
        password: hash_pass, // Use the hashed password here
      });
  
      // If user creation is successful, call the next middleware
      next();
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({
        message: "User not registered",
        error: error,
      });
    }
  }

  async function authenticate(req, res, next) {
    const { email, password } = req.body;
  
    try {
      // Check if a user with the provided email exists in the database
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        // If no user found with the provided email, return an error
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        // If passwords don't match, return an error
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Attach the user object to the request for further use
      req.user = user;
  
      // If authentication is successful, call the next middleware
      next();
    } 
     catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

module.exports = { registerUserMiddleware, authenticate };
