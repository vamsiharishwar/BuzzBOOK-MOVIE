
import User from '../models/User.js';
import bcrypt from "bcryptjs";
import Booking from "../models/Booking.js"; // ✅ Make sure the path is correct


export const getAllUsers=async(req,res,next)=>{
    let users;
    try{
        users=await User.find()

    } catch(err){
      return console.log(err);
    }
    if(!users){
        return res.status(500).json({message:"un expected error of=> no user found"});
    }
    return res.status(200).json({users});
}

  // Make sure this is correct

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ message: "Error checking existing user" });
  }

  if (existingUser) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).json({ message: "Signup failed", error: err });
  }

  return res.status(201).json({ message: "Signup successful", id: newUser._id });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    // Check if email exists and belongs to a different user
    if (existingUser && existingUser._id.toString() !== id) {
      return res.status(400).json({ message: "Email already in use by another user!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error checking existing user", error: err });
  }

  const hashedPassword = bcrypt.hashSync(password, 10); // 10 salt rounds

  let user;
  try {
    user = await User.findByIdAndUpdate(
      id,
      { name, email, password: hashedPassword },
      { new: true } // return the updated document
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Database update failed", error: err });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Updated successfully", user });
};

export const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
    let user;
    try{
        user=await User.findByIdAndDelete(id)
    }
    catch(err){
        consol.log(err);
    }
    if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "Deleted successfully", user });

}
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || email.trim() === "" || !password || password.trim() === "") {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error finding user" });
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  return res.status(200).json({ message: "Login successful", user: existingUser,id:existingUser._id});
};

export const getBookingOfUser=async (req,res,next)=>{
  const id=req.params.id;
  let bookings;
  try{
    bookings = await Booking.find({ user: id })
    .populate("user", "name email")
    .populate("movie", "title releaseDate description poster");

  }catch(err){
    return console.log(err);
  }
  if(!bookings){
    return res.status(500).json({message:"unable to get booking"});
  }
  return res.status(200).json({bookings});
}

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Fetching user failed, please try again later." });
  }

  if (!user) {
    return res.status(404).json({ message: "No user found with the provided ID." });
  }

  return res.status(200).json({ user });
};
