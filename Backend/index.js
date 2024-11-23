const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const { dbConnect } = require("./config/database");
dbConnect();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is a Home Root");
});

app.use("/", require("./routes/User"));
app.use("/listing", require("./controllers/Listing"));

app.listen(port, () => {
  console.log(`App is Listening on port : ${port}`);
});
