const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
  apartmentCode: { type: String },
  phoneNumber: { type: Number },
  email: { type: String },
  windowType: { type: String },
  picture: { type: String },
  date: { type: Date },
  possibilityTime: { type: String },
  company: { type: String, default: "" },
  process: { type: String, default: "not started" },
});

const Complaints = mongoose.model("gomdol", ComplaintSchema);

module.exports = Complaints;
