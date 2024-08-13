const LoginModel = require("../Schema/loginSchema");
const bcrypt = require("bcrypt");

const postDATA = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email required",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "password required",
      });
    }

    const newData = new LoginModel({
      email,
      password,
    });
    console.log(newData);
    await newData.save();
    res.status(200).json({ success: true, message: "All OK", data: newData });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "please provide email",
      });
    }

    const user = await LoginModel.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email not found",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "please provide password",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "password not matched",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error",
      error_message: error.message,
    });
  }
};

const checkData = async (req, res) => {
  try {
    const { email, old_password, new_password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "please provide email",
      });
    }

    if (!old_password) {
      return res.status(400).json({
        success: false,
        message: "please provide old_password",
      });
    }

    if (!new_password) {
      return res.status(400).json({
        success: false,
        message: "please provide new_password",
      });
    }

    const user = await LoginModel.findOne({ email });

    // console.log(email);
    // console.log(new_password);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email incorrect",
      });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(old_password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password does not match",
      });
    }
    // console.log(user.password);
    // console.log(old_password);

    if (old_password === new_password) {
      return res.status(400).json({
        success: false,
        message: "old password and new password cannot be same",
      });
    }

    user.password = new_password;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Update successfully",
      user_details: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error",
      error: error.message,
    });
  }
};

module.exports = {
  postDATA,
  login,
  checkData,
};
