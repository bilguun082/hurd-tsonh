const express = require("express");
const {
  getComplaints,
  getComplaint,
  createComplaint,
  deleteComplaint,
  sendComplaintToCompany,
  getComplaintByCompanyId,
} = require("../controller/complaintController");

const ComplaintRouter = express.Router();

ComplaintRouter.get("/", getComplaints)
  .get("/:id", getComplaint)
  .post("/create", createComplaint)
  .delete("/:id", deleteComplaint)
  .put("/send/:company", sendComplaintToCompany)
  .get("/company/:company", getComplaintByCompanyId);

module.exports = ComplaintRouter;
