const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Pharmacist = require("../models/Pharmacist");
const Admin = require("../models/Admin");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();
const CryptoJS = require("crypto-js");

const doctor = "Doctor";
const patient = "Patient";
const pharmacist = "Pharmacist";
const admin = "Admin";

// if(userType === doctor){}
//     else if(userType === patient){}
//     else if(userType === pharmacist){}
//     else if(userType === admin){}
//     else{}

//UPDATE USER
router.put("/:id/:userType", verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

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
      res.status(401).json("Invalid usertype!");
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
      res.status(401).json("Invalid usertype!");
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
      res.status(401).json("Invalid usertype!");
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
      res.status(401).json("Invalid usertype!");
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

router.post("/email/:userType", verifyToken, async (req, res) => {
  const userType = req.params.userType;
  console.log(req.body.email);
  try {
    const user = await User.find({ email: req.body.email });
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

module.exports = router;
