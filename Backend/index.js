const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

const app = express();

// Load environment variables
dotenv.config();

// Middleware to handle cookies
app.use(cookieParser());

// Connect to the database
dbConnect();

// Cloudinary setup (ensure you handle Cloudinary uploads correctly in your routes)
cloudinaryConnect();

// File upload middleware (place this before express.json() and express.urlencoded())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp", // Temporary directory for storing files before uploading
  })
);

// Body parsers for handling JSON and form URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route for the home page
app.get("/", (req, res) => {
  res.send("This is a Home Root");
});

// Route handling user-related requests
app.use("/", require("./routes/User"));

// Route handling listing-related requests
app.use("/listing", require("./routes/Listing"));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is Listening on port : ${port}`);
});
