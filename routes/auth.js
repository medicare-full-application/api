const router = require("express").Router();
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/Admin");
const Auth = require("../models/Auth");

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { addToAuthTable } = require("./login");

const doctor = "Doctor";
const patient = "Patient";
const pharmacist = "Pharmacist";
const admin = "Admin";

//REGISTER
router.post("/register/:userType", addToAuthTable, async (req, res) => {
  const userType = req.params.userType;
  console.log(req);
  try {
    if (userType === doctor) {
      // const newDoctor = new Doctor({
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   description: req.body.description,
      //   address: req.body.address,
      //   services: req.body.services,
      //   experienceYears: req.body.experienceYears,
      //   noOfOngoingPatients: req.body.noOfOngoingPatients,
      //   totalPatients: req.body.totalPatients,
      //   hourRate: req.body.hourRate,
      //   dateOfBirth: req.body.dateOfBirth,
      //   imageUrl: req.body.imageUrl,
      //   userStatus: req.body.userStatus,
      //   NIC: req.body.NIC,
      //   email: req.body.email,
      //   medicalRegNo: req.body.medicalRegNo,
      //   contactNo: req.body.contactNo,
      // });

      const newDoctor = new Doctor(req.body.doctor);
      const savedUser = await newDoctor.save();
      res.status(201).json(savedUser);
    } else if (userType === patient) {
      const newPatient = new Patient(req.body.patient);
      const savedUser = await newPatient.save();
      res.status(201).json(savedUser);
    } else if (userType === pharmacist) {
      const newPharmacist = new Pharmacist(req.body.pharmacist);
      const savedUser = await newPharmacist.save();
      res.status(201).json(savedUser);
    } else if (userType === admin) {
      const newAdmin = new Admin(req.body.admin);
      const savedUser = await newAdmin.save();
      res.status(201).json(savedUser);
    } else {
      res.status(501).json({ msg: "Incorrect Usertype" });
    }
  } catch (error) {
    try {
      await Auth.findByIdAndDelete(req.user._id);
      console.log("Auth save user has deleted");
    } catch (err) {
      console.log("Auth save user has not been deleted");
      // res.status(500).json(err);
    }
    res.status(500).json(error);
  }
});
// req.params.id

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await Auth.findOne({
      email: req.body.email,
    });

    !user && res.status(401).json({ msg: "Invalid Email" });

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword &&
      res.status(401).json({ msg: "Invalid Password" });

    const accessToken = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const userData = await getUserDetails(user.userType ,user.email);

    if(userData != null){
      // const { password, ...others } = user._doc;
      res.status(200).json({ userData, accessToken });
    }else {
      res.status(501).json("User not found in specific table!");
    }

    
  } catch (err) {
    res.status(500).json(err);
  }
});

const getUserDetails = async (userType, email) => {
  let userData = null;
  try {
    if (userType === doctor) {
      const user = await Doctor.findOne({
        email: email,
      });
      userData = user._doc;
    } else if (userType === patient) {
      const user = await Patient.findOne({
        email: email,
      });
      userData = user._doc;
    } else if (userType === pharmacist) {
      const user = await Pharmacist.findOne({
        email: email,
      });
      userData = user._doc;
    } else if (userType === admin) {
      const user = await Admin.findOne({
        email: email,
      });
      userData = user._doc;
    }
    return userData;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = router;
