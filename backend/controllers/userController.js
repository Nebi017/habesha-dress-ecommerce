import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};
//Routes for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User doesn't exists" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch){
      const token = createToken(user._id);
      res.status(200).json({
        success: true,
        message: "Login successful",
        token
      }); 
    }
    else {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Routes for user REGISTRATION
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Check if user already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ succes: false, message: "User already exists" });
    }

    // validate email format and strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Please enter  a valid email" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = createToken(user._id);

    res.status(201).json({
      token,
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ succes: false, message: error.message });
  }
};

// Route for  admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    // Check if user already exists 
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    }
    else {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
    
  }
};

export { loginUser, registerUser, adminLogin };
