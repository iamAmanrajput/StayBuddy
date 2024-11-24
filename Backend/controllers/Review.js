const Review = require("../models/Review");
const mongoose = require("mongoose");
const Listing = require("../models/Listing");

//createReview
exports.createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
      return res
        .status(400)
        .json({ success: false, message: "Your Listing Id Is Incorrect" });
    }
    const { rating, review } = req.body;
    if (!rating || !review) {
      return res
        .status(404)
        .json({ success: false, message: "All Fields Are Required" });
    }
    const userId = req.user.id;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newReview = await Review.create({
      rating,
      review,
      owner: userObjectId,
    });

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { $push: { review: newReview._id } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Review Created Successfully",
      data: { newReview, updatedListing },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to create Review",
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { reviewId, id } = req.params; // Get the reviewId and listingId from the params

    // Find the listing by ID
    const listing = await Listing.findById(id);
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    // Check if the review exists in the listing's reviews array
    if (!listing.review.includes(reviewId)) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found in this listing" });
    }

    // Find the review by its ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    // Check if the user is the owner of the review
    if (req.user.id !== review.owner.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not the owner of this review",
      });
    }

    // Remove the review from the listing's reviews array
    await Listing.findByIdAndUpdate(
      id,
      { $pull: { review: reviewId } }, // Remove the reviewId from the reviews array
      { new: true } // Return the updated listing
    );

    // Delete the review from the Review collection
    await Review.findByIdAndDelete(reviewId);

    // Respond with a success message
    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error(error); // Log the error to the server console
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the review",
    });
  }
};
