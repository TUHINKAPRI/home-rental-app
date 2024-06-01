const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  slug:{
    type:String,
  },
  status:{
    type:String,
    enum:["Inactive","Active"],
    default:"Inactive"
  },
  image: {
    type: String,
    required: [true, "Image is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  location: {
    type: String,
    required: [true, "Location is required"],
  },
  country: {
    type: String,
    required: [true, "Country is required"],
  },
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
