const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const { signup, login, logout } = require("../controllers/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", auth, logout);
module.exports = router;
