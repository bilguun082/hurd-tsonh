const Residents = require("../model/resident");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getUsers = async (req, res) => {
  const users = await Residents.find();
  res.status(200).json({
    message: "success",
    data: users,
  });
};

exports.checkUser = async (req, res) => {
  const token = req?.headers?.token;
  if (!token) {
    return res.status(404).json({
      message: "Invalid token",
    });
  }
  const data = await jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
  res.status(200).json(data);
};

exports.createUsers = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  try {
    const user = await Residents.create({
      username: req.body.username,
      password: hashed,
      role: req.body.role,
    });
    res.send({ message: "created successfully", user });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Residents.findOne({ username: username });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          username: user.username,
          role: user.role,
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1d" }
      );
      res.status(200).json({
        username: user.username,
        match: match,
        token: token,
        role: user.role,
      });
    } else {
      res.status(300).json({ message: match });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

// expport.sendPostToCompanies = async (req, res) => {

// }
