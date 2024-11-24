const User = require("../models/User");
const Listing = require("../models/Listing");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose"); // To validate ObjectId
const Review = require("../models/Review");

//create Listing
exports.createListing = async (req, res) => {
  try {
    // Destructure required fields from req.body
    const { title, description, price, category, country, location } = req.body;

    // Validate all required fields
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !country ||
      !location
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All Fields are Required" });
    }

    // Ensure that the image is uploaded
    const { image } = req.files;
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is Required" });
    }

    // Upload the image to Cloudinary
    const uploadImage = await uploadImageToCloudinary(
      image,
      process.env.FOLDER_NAME
    );

    // Retrieve the user ID from the request (assuming you are using JWT authentication)
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Create a new listing
    const newListing = await Listing.create({
      title,
      description,
      price,
      category,
      country,
      location,
      image: uploadImage.secure_url, // Cloudinary URL of the uploaded image
      imagePublicId: uploadImage.public_id,
      owner: user._id, // The user who owns the listing
    });

    // Return the newly created listing as a response
    return res.status(201).json({
      success: true,
      message: "Listing Created Successfully",
      listing: newListing, // Optionally return the new listing data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something Went Wrong While Creating Listing",
      error: error.message, // Include error message in response for debugging
    });
  }
};

//update Listing
exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, price, location, country } = req.body;
    const { image } = req.files;

    // Validation for required fields
    if (
      !title ||
      !description ||
      !category ||
      !price ||
      !location ||
      !country
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields except image are required",
      });
    }

    // Find the listing in the database
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Check if the current user is the owner of the listing
    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to edit this listing",
      });
    }

    // If a new image is uploaded, delete the old image from Cloudinary
    let imageUrl = listing.image; // Default to existing image if no new image is uploaded
    let imagePublicId = listing.imagePublicId; // Default to existing public_id if no new image is uploaded

    if (image) {
      // Delete the old image from Cloudinary
      const deleteResult = await cloudinary.uploader.destroy(imagePublicId);
      console.log("Old image deleted from Cloudinary:", deleteResult);

      // Upload the new image to Cloudinary
      const uploadResult = await uploadImageToCloudinary(
        image,
        process.env.FOLDER_NAME
      );
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id; // Store the new public_id
    }

    // Update the listing in the database
    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        price,
        location,
        country,
        image: imageUrl, // Use new image URL or existing image
        imagePublicId: imagePublicId, // Update public_id
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      listing: updatedListing, // Optionally return the updated listing object
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while updating the listing",
      error: error.message, // Optionally return the error message for debugging
    });
  }
};

//delete Listing
exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID format",
      });
    }

    // Fetch the listing from the database
    const listing = await Listing.findById(id);

    // Check if the listing exists
    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Ensure the user is authorized to delete this listing
    if (listing.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this listing",
      });
    }

    //deleting reviews
    if (listing.review.length > 0) {
      await Review.deleteMany({ _id: { $in: listing.review } });
    }

    // Proceed with deletion
    await Listing.findByIdAndDelete(id);
    //deleting cloudinary image
    const deleteResult = await cloudinary.uploader.destroy(
      listing.imagePublicId
    );
    console.log("Old image deleted from Cloudinary:", deleteResult);

    return res.status(200).json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error(error.message);

    // Return a more descriptive error message
    return res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the listing",
      error: error.message, // This can be useful for debugging
    });
  }
};

//get all Listings
exports.getAllListings = async (req, res) => {
  try {
    const allListings = await Listing.find({})
      .populate("review")
      .populate("owner", "userName");
    if (!allListings) {
      return res
        .status(404)
        .json({ success: false, message: "No Listings Available" });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully Fetched All Listing",
      data: allListings,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Get All Listings" });
  }
};

exports.getOneListing = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate("review")
      .populate("owner", "userName");
    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "No Listing Available for this id" });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully Fetched  Listing",
      data: listing,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed To Get  Listings" });
  }
};
