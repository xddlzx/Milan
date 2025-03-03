console.log("index.js: Server starting...");
require("dotenv").config(); // Load environment variables from .env
const app = require("./app"); // Import your application
const cloudinary = require("cloudinary");

// UncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

try {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log("Cloudinary Config Success");
  cloudinary.api.resources()
    .then(result => console.log("Cloudinary resources fetched successfully"))
    .catch(error => {
      console.error("Cloudinary Fetch Error:", error);
    });
} catch (cloudinaryError) {
  console.error("Cloudinary configuration error:", cloudinaryError.message);
  process.exit(1);
}

const connectDatabase = require("./config/database");

try {
  connectDatabase();
} catch (dbError) {
  console.error("Database connection error:", dbError.message);
  process.exit(1);
}

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Promise Rejection: ${err.message}`);
  console.error(err);
});

