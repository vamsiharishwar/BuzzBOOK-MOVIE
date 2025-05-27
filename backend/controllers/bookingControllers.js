import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import User from "../models/User.js";

export const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  let exmovie, exuser;

  try {
    exmovie = await Movie.findById(movie);
    exuser = await User.findById(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Fetching user or movie failed" });
  }

  if (!exmovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  if (!exuser) {
    return res.status(404).json({ message: "User not found" });
  }

  const newbooking = new Booking({
    movie,
    date: new Date(date),
    seatNumber,
    user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    exuser.bookings.push(newbooking);
    exmovie.bookings.push(newbooking);

    await newbooking.save({ session });
    await exuser.save({ session });
    await exmovie.save({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to create booking" });
  }

  return res.status(201).json({ booking: newbooking });
};

export const getBookingById=async (req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
        booking=await Booking.findById(id);

    } catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"booking not found"});
    }
    return res.status(200).json({booking});

}

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;

  try {
    const booking = await Booking.findById(id).populate("user").populate("movie");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (!booking.user || !booking.movie) {
      return res.status(400).json({ message: "User or Movie not found in booking" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    booking.user.bookings.pull(booking._id);
    booking.movie.bookings.pull(booking._id);

    await booking.user.save({ session });
    await booking.movie.save({ session });

    await Booking.findByIdAndDelete(id, { session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Successfully deleted booking" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return res.status(500).json({ message: "Unable to delete booking" });
  }
};