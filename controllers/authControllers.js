const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

// Function to generate JWT token asynchronously
async function generateJWTToken(email) {
  return new Promise((resolve, reject) => {
    jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

async function registerUser(req, res) {
  const { name, email, password } = req.body;

  try {
    // Check if user with the provided email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
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

    // Generate JWT token
    const token = await generateJWTToken(user.email);

    // Return success message along with the token
    res.status(200).json({ message: "Login successful. Welcome back!", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { registerUser, loginUser, generateJWTToken };


//==============================
//Register route logic:---
//==============================
//1. get the content provided by the user in the "req.body"...
//2. check if the user already exists in the database ---then,"User with this email already exists"....
//3. if not means new user then hashed the password...
//4.create a new user in the database ...
//5.Generate or issused a  JWT token...
//6.Send success response with token...