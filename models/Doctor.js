const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    services: { type: Array },
    experienceYears: { type: Number, default: 0 },
    noOfOngoingPatients: { type: Number, default: 0 },
    totalPatients: { type: Number, default: 0 },
    hourRate: { type: Number, default: 0 },
    dateOfBirth: { type: Date, required: true },
    imageUrl: { type: String },
    userStatus: {
      type: Boolean,
      default: true,
    },
    NIC: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    medicalRegNo: { type: String },
    contactNo: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", DoctorSchema);
