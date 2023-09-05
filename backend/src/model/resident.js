const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResidentSchema = new Schema({
  username: { type: String },
  password: { type: String },
  role: { type: String, default: "user" },
});

const Residents = mongoose.model("residents", ResidentSchema);

module.exports = Residents;
