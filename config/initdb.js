const Listing = require("../models/listing.model");
const { listingData } = require("../constant/data");

exports.initDB = async () => {
  try {
    await Listing.deleteMany({});
    // await Listing.insertMany(listingData);
    console.log("init successfully");
  } catch (error) {
    console.log("init db error  ", error);
  }
};
