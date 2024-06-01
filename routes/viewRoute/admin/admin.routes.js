const AdminRouter = require("express").Router();
const {
  renderDashboard,
  renderListingsPage,
  ActiveUpdateHandler,
  InActiveUpdateHandler
} = require("../../../controllers/viewControllers/admin.views.controllers");

AdminRouter.get("/dashboard", renderDashboard);
AdminRouter.get("/listings", renderListingsPage);
AdminRouter.put("/listings/set-active/:id",ActiveUpdateHandler)
AdminRouter.put("/listings/set-inactive/:id",InActiveUpdateHandler)
module.exports = AdminRouter;
