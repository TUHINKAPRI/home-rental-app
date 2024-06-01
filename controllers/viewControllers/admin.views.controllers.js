const { axiosInstance } = require("../../helper/helper");
const Listing = require("../../models/listing.model");

exports.renderDashboard = async (req, res) => {
  try {
    res.render("admin/dashboard.ejs");
  } catch (err) {
    console.log("error happen in the renderDashboard controllers", err);
  }
};

exports.renderListingsPage = async (req, res) => {
  try {
    const getAllList = await Listing.find();
    console.log(getAllList);
    res.render("admin/Listings.ejs", { data: getAllList });
  } catch (err) {
    console.log(err);
  }
};

exports.ActiveUpdateHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.put(`/listings/${id}`,{status:"Active"});
    if (response?.data?.success) {
      res.redirect("/admin/listings");
    }
  } catch (err) {
    console.log(err);
  }
};
exports.InActiveUpdateHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.put(`/listings/${id}`,{status:"Inactive"});
    if (response?.data?.success) {
      res.redirect("/admin/listings");
    }
  } catch (err) {
    console.log(err);
  }
};

