const {
  renderAboutPage,
  renderAboutForm,
  createAboutHandler,
} = require("../../../controllers/viewControllers/about.views.controllers");

const aboutRoutes = require("express").Router();

aboutRoutes.get("/", renderAboutPage);
aboutRoutes.get("/", renderAboutForm);
aboutRoutes.post("/", createAboutHandler);

module.exports = aboutRoutes;
