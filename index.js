const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const { dbConnection } = require("./config/db.connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "views")));

dbConnection();






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server started at port no.", PORT);
});
