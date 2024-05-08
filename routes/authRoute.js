const express = require("express");
const router = express.Router();
//This is requiring the authControllers.js file from the ../controllers directory. This file  contains the implementation of the registerUser and loginUser functions.
const { registerUser, loginUser,generateJWTToken} = require("../controllers/authControllers");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

module.exports = router;
