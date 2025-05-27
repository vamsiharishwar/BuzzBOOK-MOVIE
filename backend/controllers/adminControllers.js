import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"; // ✅ Correct import (was `bcrypt.js` before)
import jwt from "jsonwebtoken";


export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  // Check for existing admin
  let exAdmin;
  try {
    exAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.error("Error checking admin:", err);
    return res.status(500).json({ message: "Database query error" });
  }

  if (exAdmin) {
    return res.status(400).json({ message: "Admin already exists" }); // ✅ use 400 instead of 4000
  }

  // Hash the password and create admin
  const hashedPassword = bcrypt.hashSync(password, 10); // ✅ set salt rounds

  let admin;
  try {
    admin = new Admin({ email, password: hashedPassword });
    await admin.save();
  } catch (err) {
    console.error("Error saving admin:", err);
    return res.status(500).json({ message: "Failed to save admin" });
  }

  return res.status(201).json({ message: "Admin created", admin });
};




export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "Database error" });
  }

  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  return res.status(200).json({
    message: "Authentication successful",
    token,
    id: existingAdmin._id,
  });
};

export const getAdmins=async (req,res,next)=>{
  let admins;
  try{
    admins=await Admin.find();

  }catch(err){
    return console.log(err);
  }
  if(!admins){
    return res.status(500).json({message:"interna server error"});
  }
  return res.status(200).json({admins});
}

export const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const admin = await Admin.findById(id).populate("addedMovies");
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    return res.status(200).json({ admin, id });
  } catch (err) {
    console.error("Error fetching admin:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

