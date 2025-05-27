import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { promisify } from "util";

import Movie from "../models/Movie.js";
import Admin from "../models/Admin.js";

const verifyToken = promisify(jwt.verify);

export const addMovie = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing or malformed" });
  }

  const extractedToken = authHeader.split(" ")[1];

  let adminId;
  try {
    const decrypted = await verifyToken(extractedToken, process.env.SECRET_KEY);
    adminId = decrypted.id;
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  const { title, actors, description, releaseDate, posterUrl, featured } = req.body;

  if (!title?.trim() || !description?.trim() || !posterUrl?.trim()) {
    return res.status(422).json({ message: "Invalid inputs" });
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const movie = new Movie({
      title,
      description,
      releaseDate: new Date(releaseDate),
      featured,
      actors,
      admin: adminId,
      posterUrl,
    });

    const adminUser = await Admin.findById(adminId);
    if (!adminUser) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Admin not found" });
    }

    await movie.save({ session });
    adminUser.addedMovies.push(movie);
    await adminUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({ message: "Saved Successfully", movie });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Saving movie failed" });
  }
};




export const getAllMovies=async(req,res,next)=>{
  let movies;
  try{
    movies=await Movie.find();
  }
  catch(err){
    return console.log(err);
  }
  if(!movies){
    return res.status(500).json({message:"request failed"});
  }
  return res.status(200).json({movies});
}


export const getMovieById=async(req,res,next)=>{
  const id=req.params.id;
  let movie;
  try{
    movie=await Movie.findById(id)
  }catch(err){
    return console.log(err);
  }
  if(!movie){
    return res.status(404).json({message:"invalid movieid"});
  }
  return res.status(200).json({movie});

}

export const deleteMovieById=async (req,res,next)=>{
  const id=req.params.id;
  let user;
    try{
        user=await Movie.findByIdAndDelete(id)
    }
    catch(err){
        consol.log(err);
    }
    if (!user) {
    return res.status(404).json({ message: "Movie not found" });
  }

  res.status(200).json({ message: "Movie Deleted successfully", user });


}
