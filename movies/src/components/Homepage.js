import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Movieitem from "./Movie/Movieitem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../apihelpers/api-helper";

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const selectedImage = require(`./images/${randomNumber}.jpg`);
    setRandomImage(selectedImage);

    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width="100%" minHeight="100vh" mt={2} bgcolor="#f5f5f5">
      {/* Hero Section */}
      <Box
        margin="auto"
        width="85%"
        position="relative"
        borderRadius={3}
        overflow="hidden"
        boxShadow={6}
        sx={{ aspectRatio: "16 / 9" }}
      >
        {randomImage && (
          <img
            src={randomImage}
            alt="BuzzBook Hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.6)",
            }}
          />
        )}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="#fff"
          px={2}
          sx={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}
        >
          <Typography variant="h3" fontWeight="bold" sx={{ fontSize: { xs: "2rem", md: "3rem" } }}>
            BuzzBook-Movie 🎬
          </Typography>
          <Typography variant="h6" mt={2} sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }}>
            Book your favorite movies anytime, anywhere!
          </Typography>
        </Box>
      </Box>

      {/* Latest Releases */}
      <Box padding={5} textAlign="center">
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#222"
          sx={{
            borderBottom: "3px solid #d32f2f",
            display: "inline-block",
            pb: 1,
          }}
        >
          🎬 Latest Releases
        </Typography>
      </Box>

      {/* Movie Cards */}
      <Box
        width="90%"
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={4}
        margin="auto"
      >
        {movies &&
          movies.slice(0, 6).map((movie, index) => (
            <Box
              key={index}
              sx={{
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 4,
                },
              }}
            >
              <Movieitem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
              />
            </Box>
          ))}
      </Box>

      {/* View All Button */}
      <Box display="flex" justifyContent="center" padding={5}>
        <Button
          LinkComponent={Link}
          to="/Movies"
          variant="contained"
          size="large"
          sx={{
            borderRadius: "10px",
            fontWeight: "bold",
            textTransform: "none",
            backgroundColor: "#d32f2f",
            paddingX: 4,
            paddingY: 1.5,
            fontSize: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
