const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

const { dbConnection } = require("./config/db.connection");

const ListingsRoute = require("./routes/viewRoute/user/listings.routes");
const ListingsApiRoutes = require("./routes/apiRoute/listings.routes");
const AdminRouter = require("./routes/viewRoute/admin/admin.routes");
const adminApiRouter = require("./routes/apiRoute/admin.routes");
const aboutRouter = require("./routes/apiRoute/about.routes");
const aboutRoutes = require("./routes/viewRoute/user/about.routes");
const contactRouter = require("./routes/apiRoute/contact.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads',express.static(path.join(__dirname, "./uploads")))
dbConnection();

//for user views
app.use("/", ListingsRoute);
app.use("/about", aboutRoutes);

//for admin views
app.use("/admin", AdminRouter);

//for apis
app.use("/api/v1/listings", ListingsApiRoutes);
app.use("/api/v1/admin", adminApiRouter);
app.use("/api/v1/about", aboutRouter);
app.use("/api/v1/contact",contactRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started at port no.", PORT);
});
