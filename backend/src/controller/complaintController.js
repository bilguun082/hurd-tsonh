const Complaints = require("../model/complaint");

exports.getComplaints = async (req, res) => {
  const complaints = await Complaints.find();
  res.send(complaints);
};

exports.getComplaint = async (req, res) => {
  try {
    const _id = req.params.id;
    const complaint = await Complaints.find({ _id });
    res.status(200).json({
      message: "success",
      complaint,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.createComplaint = async (req, res) => {
  try {
    const complaint = req.body;
    const ComplaintData = await Complaints.create(complaint);
    res.status(200).json({
      message: "success",
      ComplaintData,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteComplaint = async (req, res) => {
  const _id = req.params.id;
  try {
    await Complaints.findByIdAndDelete({ _id });
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.sendComplaintToCompany = async (req, res) => {
  const company = req.params.company;
  const complaintId = req.body.complaintId;
  try {
    const complaint = await Complaints.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found." });
    }

    // Update the companyId field
    complaint.company = company;
    await complaint.save();

    res.status(200).json({ message: "Company assigned to complaint." });
  } catch (error) {
    res.status(500).json({ error: "Error assigning company." });
  }
};

exports.getComplaintByCompanyId = async (req, res) => {
  const company = req.params.company;
  try {
    const complaints = await Complaints.find({ company: company });
    res.status(200).json({ message: "Successfull", complaints });
  } catch (error) {
    res.status(500).json({ error: "Error fetching complaints" });
  }
};
