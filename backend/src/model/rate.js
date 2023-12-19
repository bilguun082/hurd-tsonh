const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RateSchema = new Schema({
  rateForWindow: { type: String },
  rateForService: { type: String },
  feedback: { type: String },
});

const Rates = mongoose.model("huselt", RateSchema);

module.exports = Rates;
