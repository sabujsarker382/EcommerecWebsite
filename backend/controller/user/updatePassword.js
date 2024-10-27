const bcrypt = require("bcrypt");
const userModel = require("../../models/userModel"); // Import the User model

// Function to save the new password after resetting
const saveNewPassword = async (req, res) => {
  const token = req.params.token;

  const { password } = req.body; // Extract token and new password from request body
  console.log(password);
  try {
    // Find the user by the resetPasswordToken and ensure it hasn't expired
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token hasn't expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and remove the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear token expiration
    await user.save();

    return res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = saveNewPassword;
