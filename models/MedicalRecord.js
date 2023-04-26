const mongoose = require("mongoose");

const MedicalRecordSchema = new mongoose.Schema(
  {
    medicalCondition: { type: String, required: true },
    // prescription: { type: Array, required: true },
    prescription: { type: String, required: true },
    medicalReport: { type: String },
    date: { type: Date, default: Date.now },
    recordBy: { type: String, required: true }, //doctor Id
    recordFor: { type: String, required: true }, //patient Id
    reportAdded: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);
