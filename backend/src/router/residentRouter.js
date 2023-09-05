const express = require("express");
const {
  getUsers,
  checkUser,
  createUsers,
  Login,
} = require("../controller/residentController");

const ResidentRouter = express.Router();

ResidentRouter.get("/", getUsers)
  .get("/check", checkUser)
  .post("/create", createUsers)
  .post("/login", Login);

module.exports = ResidentRouter;
