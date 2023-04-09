const mongoose = require("mongoose");

const PharmacistSchema = new mongoose.Schema(
  {
    pharmacyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    pharmacyRegNo: { type: String, required: true },
    contactNo: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pharmacist", PharmacistSchema);
