const express = require("express");
const {
  getRates,
  getRate,
  createRate,
} = require("../controller/rateController");

const RateRouter = express.Router();

RateRouter.get("/", getRates).get("/:id", getRate).post("/", createRate);

module.exports = RateRouter;
