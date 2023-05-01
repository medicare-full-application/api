const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/Admin");
const Auth = require("../models/Auth");
const MedicalRecord = require("../models/MedicalRecord");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");
const mongoose = require("mongoose");

const doctor = "Doctor";
const patient = "Patient";
const pharmacist = "Pharmacist";
const admin = "Admin";

// if(userType === doctor){}
//     else if(userType === patient){}
//     else if(userType === pharmacist){}
//     else if(userType === admin){}
//     else{}

//UPDATE EMAIL
router.put("/email/:id/:loginId/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;

  try {
    const updatedLoginUser = await Auth.findByIdAndUpdate(
      req.params.loginId,
      {
        $set: req.body,
      },
      { new: false }
    );

    if (userType === doctor) {
      const updatedUser = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else if (userType === patient) {
      const updatedUser = await Patient.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else if (userType === pharmacist) {
      const updatedUser = await Pharmacist.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else if (userType === admin) {
      const updatedUser = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(500).json("Invalid usertype!");
      return;
    }
  } catch (error) {
    // res.status(500).json({ msg: "Email update failed!" });
    res.status(500).json(error);
  }
});

// router.post("/email", verifyToken, async (req, res) => {

//   try {
//     const user = await Doctor.findById(req.params.id);

    
//       res.status(200).json(updatedUser);
    
//   } catch (error) {
//     // res.status(500).json({ msg: "Email update failed!" });
//     res.status(500).json(error);
//   }
// });

//UPDATE PASSWORD
router.put("/password/:loginId", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await Auth.findByIdAndUpdate(
      req.params.loginId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({ msg: "Password Updated!", flag:true });
  } catch (error) {
    res.status(500).json({ msg: "Password update failed!", flag:false });
  }
});

//UPDATE USER
router.put("/:id/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;

  try {
    if (userType === doctor) {
      const updatedUser = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else if (userType === patient) {
      const updatedUser = await Patient.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else if (userType === pharmacist) {
      const updatedUser = await Pharmacist.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else if (userType === admin) {
      const updatedUser = await Admin.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(500).json("Invalid usertype!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE USER
//Dont use delete endpoint
router.delete("/:id/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;

  try {
    await Auth.findByIdAndDelete(req.params.id);
    if (userType === doctor) {
      await Doctor.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } else if (userType === patient) {
    } else if (userType === pharmacist) {
    } else if (userType === admin) {
    } else {
      res.status(500).json("Invalid usertype!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//
router.get("/find/:id/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;
  try {
    if (userType === doctor) {
      const user = await Doctor.findById(req.params.id);
      res.status(200).json(user);
    } else if (userType === patient) {
      const user = await Patient.findById(req.params.id);
      res.status(200).json(user);
    } else if (userType === pharmacist) {
      const user = await Pharmacist.findById(req.params.id);
      res.status(200).json(user);
    } else if (userType === admin) {
      const user = await Admin.findById(req.params.id);
      res.status(200).json(user);
    } else {
      res.status(500).json("Invalid usertype!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;
  const query = req.query.new;
  try {
    if (userType === doctor) {
      const users = query
        ? await Doctor.find().sort({ _id: -1 }).limit(5)
        : await Doctor.find();
      res.status(200).json(users);
    } else if (userType === patient) {
      const users = query
        ? await Patient.find().sort({ _id: -1 }).limit(5)
        : await Patient.find();
      res.status(200).json(users);
    } else if (userType === pharmacist) {
      const users = query
        ? await Pharmacist.find().sort({ _id: -1 }).limit(5)
        : await Pharmacist.find();
      res.status(200).json(users);
    } else if (userType === admin) {
      const users = query
        ? await Admin.find().sort({ _id: -1 }).limit(5)
        : await Admin.find();
      res.status(200).json(users);
    } else {
      res.status(500).json("Invalid usertype!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   const query = req.query.new;
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET USER STATS

// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data)
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.post("/email", async (req, res) => {
  console.log(req.body.email);
  try {
    const user = await Auth.find({ email: req.body.email });
    // console.log(user);
    // const { password, ...others } = user._doc;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats/income/:id", verifyToken, async (req, res) => {
  const date = new Date();
  const thisYear = new Date(date.getFullYear(), 0, 1); // set to beginning of current year
  const id = req.params.id;

  try {
    const data = await Doctor.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
          createdAt: { $gte: thisYear },
        },
      },
      {
        $project: {
          result: { $multiply: ["$totalPatients", "$hourRate"] },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats/income/:id/:year/:month", verifyToken, async (req, res) => {
  const { id, year, month } = req.params;
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0);

  try {
    const data = await MedicalRecord.aggregate([
      {
        $match: {
          // recordBy: mongoose.Types.ObjectId(id),
          recordBy: id,
          createdAt: {
            $gte: startOfMonth,
            $lte: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: { $dayOfMonth: "$createdAt" },
          totalIncome: {
            $sum: "$doctorFee",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$totalIncome"
          }
        }
      },
      // {
      //   $sort: { _id: 1 },
      // },
      {
        $project: {
          _id: 0,
          // day: "$_id",
          totalIncome: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Current Date
router.get("/stats/income/month/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  try {
    const data = await MedicalRecord.aggregate([
      {
        $match: {
          recordBy: id,
          createdAt: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$doctorFee",
          },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$totalIncome"
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalIncome: 1,
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


//Add Patient to Doctor
router.put("/doctor/requests/:id", async (req, res) => {
  let flag = false;

  try {
    const doctor = await Doctor.findById(req.params.id);

    doctor.requests.map(async (item) => {
      if (item.patientId == req.body.patientId) {
        flag = true;
      }
    });

    if (flag) {
      const updatedUser = await Doctor.findOneAndUpdate(
        { _id: req.params.id, "requests.patientId": req.body.patientId },
        { $set: { "requests.$.isRequest": req.body.isRequest } },
        { new: true }
      );
      res.status(200).json({ msg: "Request update saved!", data: updatedUser });
      return;
    } else {
      const updatedUser = await Doctor.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            requests: {
              patientId: req.body.patientId,
              isRequest: req.body.isRequest,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({ msg: "Request update saved!", data: updatedUser });
      return;
    }
  } catch (error) {
    res.status(500).json({ msg: "Request update not saved!" });
  }
});

//Add Doctor to Patient
router.put("/patient/requests/:patientId", async (req, res) => {
  let flag = false;

  try {
    const patient = await Patient.findById(req.params.patientId);

    console.log(patient);

    patient.requests.map(async (item) => {
      if (item.doctorId == req.body.doctorId) {
        flag = true;

      }
    });

    console.log(flag);

    if (flag) {
      const updatedUser = await Patient.findOneAndUpdate(
        { _id: req.params.patientId, "requests.doctorId": req.body.doctorId },
        { $set: { "requests.$.isRequest": req.body.isRequest } },
        { new: true }
      );
      res.status(200).json({ msg: "Request update saved!", data: updatedUser });
      return;
    } else {
      const updatedUser = await Patient.findOneAndUpdate(
        { _id: req.params.patientId },
        {
          $push: {
            requests: {
              doctorId: req.body.doctorId,
              isRequest: req.body.isRequest,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({ msg: "Request update saved!", data: updatedUser });
      return;
    }
  } catch (error) {
    res.status(500).json({ msg: "Request update not saved!" });
  }
});

module.exports = router;
