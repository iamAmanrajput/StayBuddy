const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    default:
      "https://media.istockphoto.com/id/1198320951/photo/sunset-at-the-beach.jpg?s=1024x1024&w=is&k=20&c=Fd34Xna7d7UWhzDVLwX7M6WTChOI0-6L6sRvM39iGXg=",
  },
  imagePublicId: { type: String, required: true },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["farm", "city", "beachFront", "mountain"],
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

module.exports = mongoose.model("Listing", listingSchema);
