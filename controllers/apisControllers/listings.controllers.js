const Listing = require("../../models/listing.model");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const slugify = require('slugify')
exports.getAllListings = async (req, res) => {
  try {
    const filter = { status: "Active" };
    const allListings = await Listing.find(filter);
    res.status(200).json({
      message: "All listings fetch successfully",
      data: allListings,
    });
  } catch (err) {
    console.log("get all listings error", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.getSingleList = async (req, res) => {
  try {
    const { id } = req.params;
    // const listid = new mongoose.Types.ObjectId(id);
    const listing = await Listing.findOne({ slug: id });
    if (!listing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }
    res.status(200).json({
      message: "Fetch successfully",
      data: listing,
    });
  } catch (err) {
    console.log("error happen in getSingleList controllers", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.createNewListings = async (req, res) => {
  try {
    const { title, description, price, country, location } = req.body;
    console.log(req.body);

    if (!title || !description || !price || !country || !location) {
      return res.status(404).json({
        message: "Both fields are required",
      });
    }

    const image = req.file;
    console.log(image);

    const newListings = new Listing({
      title,
      description,
      location,
      country,
      price,
      image: image.filename,
      slug:slugify(title),
    });
    await newListings.save();

    res.status(200).json({
      message: "Listing created successfully",
      success: true,
      data:newListings
    });
  } catch (err) {
    console.log("error happen in createNewListings", err);
  }
};

exports.editListing = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body) {
      return res.status(404).json({
        message: "Fields are required",
      });
    }
    const findListings = await Listing.findById(id);
    if (!findListings) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }
    console.log(req.body);
    const image = req.file;
    console.log(image);

    const updatedListing = await Listing.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          ...req.body,
          ...(image && { image: image.filename }),
        },
      }
    );


   if(image){
    fs.unlink(path.join(__dirname, `../../uploads/${updatedListing.image}`), (err) => {
      if (err) {
        console.log("happen an error" ,err)
      }else{
        console.log("successfully")
      }
   
    });
   }

   return res.status(200).json({
      message: "List update successfully",
      data: updatedListing,
      success: true,
    });
  } catch (err) {
    console.log("error happen in editListing", err);
    res.status(500).json({
      message: "Internal server  error",
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;
    const findListings = await Listing.findById(id);
    if (!findListings) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    const deletedList = await Listing.findByIdAndDelete(
      { _id: id },
      { new: true }
    );
    res.status(200).json({
      message: "List delete successfully",
      data: deletedList,
    });
  } catch (err) {
    console.log("error happen in deleteListing", err);
  }
};

exports.getAllUnActiveList = async (req, res) => {
  try {
    const getAllUnActiveData = await Listing.find({ status: "Inactive" });

    res.status(200).json({
      message: "product fetch successfully",
      data: getAllUnActiveData,
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateListStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedData = await Listing.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: status,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated successfully",
      data: updatedData,
    });
  } catch (err) {
    console.log(err);
  }
};
