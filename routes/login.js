const CryptoJS = require("crypto-js");
const Auth = require("../models/Auth");

const addToAuthTable = async (req, res, next) => {
  const commonUser = req.body.user;
  const newAuth = new Auth({
    email: commonUser.email,
    password: CryptoJS.AES.encrypt(
      commonUser.password,
      process.env.PASS_SEC
    ).toString(),
    userType: commonUser.userType,
    userStatus: commonUser.userStatus,
  });

  try {
    const newAuthUser = await newAuth.save();
    req.user = newAuthUser;
    next();
  } catch (error) {
    if(error.code === 11000){
        res.status(422).send({ success: false, message: 'User already exist! Please, Check Your email.' });
        return;
    }
    // Some other error
    return res.status(422).send(error);
  }
};

module.exports = {
  addToAuthTable,
};
