const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");
const {
  createListing,
  updateListing,
  deleteListing,
  getAllListings,
  getOneListing,
} = require("../controllers/Listing");

router.post("/new", auth, createListing);
router.post("/update/:id", auth, updateListing);
router.delete("/delete/:id", auth, deleteListing);
router.get("/", getAllListings);
router.get("/:id", getOneListing);

module.exports = router;
