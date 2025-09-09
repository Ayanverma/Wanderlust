const mongoose = require("mongoose");
const review = require("./review");
const Schema  = mongoose.Schema;
const Review = require("./review.js");
const { required } = require("joi");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: [
      "mountains",
      "beach",
      "farms",
      "rooms",
      "castles",
      "pools",
      "camping",
      "arctic",
      "dome",
      "boats",
      "trending",
      "iconic-cities",
    ],
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});


listingSchema.post("findOneAndDelete", async(listing)=>{
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
