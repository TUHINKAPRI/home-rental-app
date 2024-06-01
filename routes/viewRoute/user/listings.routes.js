const express = require("express");
const {
  renderHomePage,
  renderAllListingsPage,
  renderNewFormPage,
  renderEditForm,
  renderSingleListPage,
  handleFormSubmission,
  editFormSubmitHandler,
  deleteHandler,
} = require("../../../controllers/viewControllers/listings.controllers");
const ListingsRoute = express.Router();
const imageupload=require('../../../utils/imageupload')
//home page render
ListingsRoute.get("/", renderHomePage);

//show all list page
ListingsRoute.get("/listings", renderAllListingsPage);

//render create list form
ListingsRoute.get("/listings/new", renderNewFormPage);

// new create submit handler via ejs
ListingsRoute.post("/listing", imageupload.single('image'), handleFormSubmission)

//show edit form 
ListingsRoute.put('/listings/:id',imageupload.single('image'),   editFormSubmitHandler)

//update handler via ejs
ListingsRoute.get("/listing/edit/:id", renderEditForm);

// get single list page 
ListingsRoute.get("/listing/:id", renderSingleListPage);

//delete handler
ListingsRoute.delete('/listing',deleteHandler)

module.exports = ListingsRoute;
