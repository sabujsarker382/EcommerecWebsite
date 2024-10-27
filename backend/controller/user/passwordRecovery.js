const express = require("express");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const userModel = require("../../models/userModel");

// Set up email transporter (example using Gmail)
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rajsabujsarker58@gmail.com",
    pass: "irlg tsja kped bjpe",
  },
});

// POST route to send password recovery email
const recoverPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Generate a token for password recovery
    const token = crypto.randomBytes(32).toString("hex");

    // Set token expiration time (e.g., 1 hour)
    const tokenExpiry = Date.now() + 3600000; // 1 hour

    // Save the token and expiry date to the user's record
    user.resetPasswordToken = token;
    user.resetPasswordExpires = tokenExpiry;
    await user.save();

    // Set up the recovery email
    const recoveryLink = `http://localhost:3000/reset/${token}`; // Replace with your frontend URL
    const mailOptions = {
      to: user.email,
      from: "rajsabujsarker58@gmail.com", // Replace with your email
      subject: "Password Recovery",
      text: `You are receiving this because you (or someone else) have requested the reset of your password. 
            Please click on the following link, or paste this into your browser to complete the process: \n\n
            ${recoveryLink} \n\n If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Recovery email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = recoverPassword;
