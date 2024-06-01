const { axiosInstance } = require("../../helper/helper");
const Listing = require("../../models/listing.model");
const slugify=require("slugify")
exports.renderHomePage = async (req, res) => {
  try {
    const response = await axiosInstance.get("/listings");
    res.render("listings/index.ejs", {
      data: response?.data?.data.slice(0, 8),
    });
  } catch (err) {
    console.log("error", err);
  }
};

exports.renderAllListingsPage = async (req, res) => {
  try {
    const response = await axiosInstance.get("/listings");

    res.render("listings/show.ejs", { data: response?.data?.data });
  } catch (err) {
    console.log(err);
  }
};

exports.renderSingleListPage = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/listings/${id}`);
    res.render("listings/singleList.ejs", { data: response?.data?.data });
  } catch (err) {
    console.log(err);
  }
};

exports.renderNewFormPage = async (req, res) => {
  try {
    res.render("listings/createListForm.ejs");
  } catch (err) {
    console.log("error in render new form controllers", err);
  }
};

exports.handleFormSubmission = async (req, res) => {
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

    res.redirect("/listings");
  } catch (err) {
    console.log("error happen in the handleFormSubmission", err);
  }
};

exports.editFormSubmitHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.put(`/listings/${id}`, req.body);
    if (response?.data?.success) {
      res.redirect("/listings");
    }
  } catch (error) {
    console.log("error 'present in editformsubmithandler", erroor);
  }
};

exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.get(`/listings/${id}`);
    res.render("listings/updateListForm.ejs", { data: response?.data?.data });
  } catch (err) {
    console.log("error occured on render edit form page", err);
  }
};

exports.deleteHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axiosInstance.delete(`/listings/${id}`);
    console.log(response?.data);
    res.redirect("/listings");
  } catch (err) {
    console.log("error happen in deleteHandler", err);
  }
};
