const mongoose = require("mongoose");

const DoctorRequestSchema = new mongoose.Schema({
  doctorId: { type: String },
  isRequest: { type: String },
});

const PatientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    NIC: { type: String },
    dateOfBirth: { type: Date, required: true },
    imageUrl: { type: String },
    contactNo: { type: String, required: true },
    userStatus: {
      type: Boolean,
      default: true,
    },
    haveChildren: {
      type: Boolean,
      default: false,
    },
    childOrNot: {
      type: Boolean,
      default: false,
    },
    noOfChildren: { type: Number, default: 0 },
    childrenIds: { type: Array },
    requests: { type: [DoctorRequestSchema] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
