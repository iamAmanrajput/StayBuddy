const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup
exports.signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if all required fields are provided
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        success: false,
        message: "User Already Registered. Please Log in.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const userDetail = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // Respond with success
    return res
      .status(200)
      .json({ success: true, message: "Signup Successfully" });
  } catch (error) {
    console.error(error);

    // Handle server errors
    return res.status(500).json({
      success: false,
      message: "Signup Failed, please Try Again Later",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exist, please sign up first",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        id: user._id,
        email: user.email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10h",
      });
      const userData = {
        ...user.toObject(),
        token: token,
        password: undefined,
      };
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: userData,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, please try again",
    });
  }
};

//logout
exports.logout = async (req, res) => {
  try {
    // Check if the token exists in the cookies
    if (!req.cookies.token) {
      return res.status(400).json({
        success: false,
        message: "No token found, you are not logged in.",
      });
    }

    // Clear the token cookie
    res.clearCookie("token");

    return res.json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    // Log the error for debugging (optional)
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed, please try again later.",
    });
  }
};
