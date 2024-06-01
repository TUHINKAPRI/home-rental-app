const express = require("express");
const {
  getAllListings,
  getSingleList,
  createNewListings,
  editListing,
  deleteListing,
} = require("../../controllers/apisControllers/listings.controllers");
const imageupload = require("../../utils/imageupload");
const ListingsApiRoutes = express.Router();

ListingsApiRoutes.get("/", getAllListings);
ListingsApiRoutes.get("/:id", getSingleList);
ListingsApiRoutes.post("/", imageupload.single('image') , createNewListings);
ListingsApiRoutes.put("/:id",imageupload.single('image'), editListing);
ListingsApiRoutes.delete("/:id", deleteListing);

module.exports = ListingsApiRoutes;
