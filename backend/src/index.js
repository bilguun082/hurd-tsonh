const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const ComplaintRouter = require("./router/complaintRouter");
const ResidentRouter = require("./router/residentRouter");
const RateRouter = require("./router/rateRouter");
require("dotenv").config();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/complaint", ComplaintRouter);
app.use("/resident", ResidentRouter);
app.use("/rate", RateRouter);

console.log(process.env.MONGODB_URL);

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
mongoose.set("strictQuery", true);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB amjilttai holbogdloo");
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
