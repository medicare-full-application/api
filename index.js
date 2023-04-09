const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const articleRoute = require("./routes/article");
const medicalRecordRoute = require("./routes/medicalRecord");

const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/article", articleRoute);
app.use("/api/v1/medicalRecord", medicalRecordRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});
