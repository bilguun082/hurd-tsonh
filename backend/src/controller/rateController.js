const Rates = require("../model/rate");

exports.getRates = async (req, res) => {
  const rates = await Rates.find();
  res.send(rates);
};

exports.getRate = async (req, res) => {
  try {
    const _id = req.params.id;
    const rate = await Rates.find({ _id });
    res.status(200).json({
      message: "success",
      rate,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.createRate = async (req, res) => {
  try {
    const rate = req.body;
    const rateData = await Rates.create(rate);
    res.status(200).json({
      message: "success",
      rateData,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
