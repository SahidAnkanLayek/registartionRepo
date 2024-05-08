const mongoose = require("mongoose");

async function connectToDatabase() {
  try{
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database Connection successful");
  } 
  catch (error) {
    console.error("Connection error:", error);
  }
}

module.exports = { connectToDatabase };
