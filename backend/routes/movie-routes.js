import express from "express";
import { addMovie,getAllMovies, getMovieById,deleteMovieById } from "../controllers/movieControllers.js";
const movieRouter=express.Router();

movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMovieById);
movieRouter.post("/",addMovie);
movieRouter.delete("/:id",deleteMovieById);
export default movieRouter;