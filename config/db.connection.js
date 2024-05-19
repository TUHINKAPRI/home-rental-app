const mongoose = require("mongoose");

exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL_STRING);

    console.log("Connection successfully");
  } catch (err) {
    console.log("mongoose connection error", err);
  }
};
