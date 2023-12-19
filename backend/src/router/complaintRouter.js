const express = require("express");
const {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  sendComplaintToCompany,
  getComplaintByCompanyId,
  setProcessAsDone,
} = require("../controller/complaintController");
const { sendMail } = require("../controller/emailController");

const ComplaintRouter = express.Router();

ComplaintRouter.get("/", getComplaints)
  .get("/:id", getComplaint)
  .post("/create", createComplaint)
  .delete("/:id", deleteComplaint)
  .put("/send/:company", sendComplaintToCompany)
  .put("/send/process/:id", setProcessAsDone)
  .get("/company/:company", getComplaintByCompanyId)
  .post("/sendmail", sendMail);

module.exports = ComplaintRouter;
