const MedicalRecord = require("../models/MedicalRecord");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  const newMedicalRecord = new MedicalRecord(req.body);

  try {
    const savedMedicalRecord = await newMedicalRecord.save();
    res.status(200).json(savedMedicalRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedMedicalRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await MedicalRecord.findByIdAndDelete(req.params.id);
    res.status(200).json("Article has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Medical Record
router.get("/find/:id", async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id);
    res.status(200).json(medicalRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Medical Record by recordFor
router.get("/find/patient/:recordFor", async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findOne({ recordFor: req.params.recordFor });
    res.status(200).json(medicalRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Medical Records
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let medicalRecords;

    if (qNew) {
      medicalRecords = await MedicalRecord.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      medicalRecords = await MedicalRecord.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      medicalRecords = await MedicalRecord.find();
    }

    res.status(200).json(medicalRecords);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
