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
const { createReview, deleteReview } = require("../controllers/Review");

router.post("/create", auth, createListing);
router.post("/update/:id", auth, updateListing);
router.delete("/delete/:id", auth, deleteListing);
router.get("/", getAllListings);
router.get("/:id", getOneListing);
//review
router.post("/:id/create", auth, createReview);
router.delete("/:id/delete/:reviewId", auth, deleteReview);

module.exports = router;
