import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getAllMovies } from "../../apihelpers/api-helper";
import Movieitem from "./Movieitem";

const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box margin="auto" marginTop={5} maxWidth="1100px" paddingX={2}>
      {/* Heading */}
      <Typography
        variant="h4"
        color="white"
        bgcolor="black"
        paddingY={1.5}
        paddingX={3}
        borderRadius={2}
        textAlign="center"
        maxWidth="300px"
        margin="auto"
        fontWeight={600}
        boxShadow="0 2px 8px rgba(0,0,0,0.5)"
      >
        All Movies
      </Typography>

      {/* Movie Grid */}
      <Box
        marginTop={5}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={3}
      >
        {movies &&
          movies.map((movie, index) => (
            <Movieitem
              key={index}
              id={movie._id}
              title={movie.title}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Movie;
