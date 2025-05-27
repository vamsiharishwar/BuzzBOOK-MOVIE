import React, { useEffect, useState } from "react";
import MovieIcon from "@mui/icons-material/Movie";
import {
  AppBar,
  Autocomplete,
  Toolbar,
  Box,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Typography,
} from "@mui/material";
import { getAllMovies } from "../apihelpers/api-helper";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isadminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isuserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => {
        setMovies(data.movies);
      })
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (isuserLoggedIn && movie) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(to right, #2e7d32, #66bb6a)",
        boxShadow: 4,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton LinkComponent={Link} to="/" sx={{ color: "#fff" }}>
            <MovieIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" color="white" fontWeight="bold">
            BuzzBook
          </Typography>
        </Box>

        {/* Search Bar */}
        <Box width="30%">
          <Autocomplete
            onChange={handleChange}
            id="movie-search"
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                placeholder="Search movie..."
                InputProps={{
                  ...params.InputProps,
                  style: { color: "#fff" },
                }}
              />
            )}
            sx={{
              "& .MuiInput-underline:before": { borderBottomColor: "#c8e6c9" },
              "& .MuiInput-underline:after": { borderBottomColor: "#81c784" },
            }}
          />
        </Box>

        {/* Navigation Tabs */}
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: "#c8e6c9", height: 3 },
          }}
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: "bold",
              color: "#ffffff",
              mx: 1,
              ":hover": {
                color: "#dcedc8",
              },
            },
          }}
        >
          <Tab label="Movies" LinkComponent={Link} to="/Movies" />
          {!isadminLoggedIn && !isuserLoggedIn && (
            <>
              <Tab label="Admin" LinkComponent={Link} to="/Admin" />
              <Tab label="Auth" LinkComponent={Link} to="/Auth" />
            </>
          )}
          {isuserLoggedIn && (
            <>
              <Tab label="Profile" LinkComponent={Link} to="/User" />
              <Tab
                onClick={() => logout(false)}
                label="Logout"
                LinkComponent={Link}
                to="/"
              />
            </>
          )}
          {isadminLoggedIn && (
            <>
              <Tab label="Add Movie" LinkComponent={Link} to="/Add" />
              <Tab label="Profile" LinkComponent={Link} to="/UserAdmin" />
              <Tab
                onClick={() => logout(true)}
                label="Logout"
                LinkComponent={Link}
                to="/"
              />
            </>
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
