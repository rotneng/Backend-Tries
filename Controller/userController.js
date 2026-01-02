const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createTransporter, sendEmail } = require("../Util/EmailService");
const Token = require("../Models/tokenModel");

exports.registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    function randomNumber() {
      return Math.floor(100000 + Math.random() * 900000);
    }

    const user = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    try {
      const otp = randomNumber();
      const token = new Token({
        email,
        token: otp,
      });
      await token.save();
      await sendEmail(email, otp);
      console.log("Email sent successfully");
    } catch (error) {
      console.log("Error sending mail:", error);
    }

    await user.save();
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering user:", error);
    return res.status(400).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      username: user.username,
    });
  } catch (error) {
    console.log("Error in login:", error);
    return res.status(500).json({ message: "Server error during login" });
  }
};

exports.saveShippingAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { fullName, phone, address, city, state } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.shippingAddress = {
      fullName,
      phone,
      address,
      city,
      state,
    };

    await user.save();

    return res.status(200).json({
      message: "Address saved successfully",
      shippingAddress: user.shippingAddress,
    });
  } catch (error) {
    console.log("Error saving address:", error);
    return res.status(500).json({ message: "Error saving address" });
  }
};

exports.getShippingAddress = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user.shippingAddress || {});
  } catch (error) {
    console.log("Error fetching address:", error);
    return res.status(500).json({ message: "Error fetching address" });
  }
};
