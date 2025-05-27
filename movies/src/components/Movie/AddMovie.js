import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  TextField,
  Typography,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { addMovie } from "../../apihelpers/api-helper";

const labelProps = {
  mt: 2,
  mb: 1,
  fontWeight: "600",
};

const AddMovie = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });

  const [actors, setActors] = useState([]);
  const [actor, setActor] = useState("");

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // can be 'success', 'error', 'info', 'warning'
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie({ ...inputs, actors: actors })
      .then((res) => {
        setSnackbar({
          open: true,
          message: "Movie added successfully!",
          severity: "success",
        });
        setInputs({
          title: "",
          description: "",
          posterUrl: "",
          releaseDate: "",
          featured: false,
        });
        setActors([]);
      })
      .catch((err) => {
        setSnackbar({
          open: true,
          message: "Failed to add movie. Please try again.",
          severity: "error",
        });
        console.error(err);
      });
  };

  const handleAddActor = () => {
    if (actor.trim()) {
      setActors((prev) => [...prev, actor.trim()]);
      setActor("");
    }
  };

  const handleDeleteActor = (actorToDelete) => {
    setActors((prev) => prev.filter((a) => a !== actorToDelete));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        width={{ xs: "90%", sm: "70%", md: "50%" }}
        margin="auto"
        padding={4}
        boxShadow="0 4px 20px rgba(0,0,0,0.1)"
        borderRadius={3}
        bgcolor="#fafafa"
        display="flex"
        flexDirection="column"
      >
        <Typography
          variant="h4"
          fontFamily="Verdana"
          textAlign="center"
          mb={3}
          fontWeight="700"
          color="#222"
        >
          Add New Movie
        </Typography>

        <FormLabel sx={labelProps}>Title</FormLabel>
        <TextField
          value={inputs.title}
          onChange={handleChange}
          name="title"
          variant="outlined"
          size="small"
          fullWidth
        />

        <FormLabel sx={labelProps}>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          name="description"
          variant="outlined"
          size="small"
          fullWidth
          multiline
          rows={3}
        />

        <FormLabel sx={labelProps}>Poster URL</FormLabel>
        <TextField
          value={inputs.posterUrl}
          onChange={handleChange}
          name="posterUrl"
          variant="outlined"
          size="small"
          fullWidth
        />

        <FormLabel sx={labelProps}>Release Date</FormLabel>
        <TextField
          type="date"
          value={inputs.releaseDate}
          onChange={handleChange}
          name="releaseDate"
          variant="outlined"
          size="small"
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <FormLabel sx={labelProps}>Actors</FormLabel>
        <Box display="flex" gap={2} alignItems="center" mb={1}>
          <TextField
            value={actor}
            onChange={(e) => setActor(e.target.value)}
            name="actors"
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Add actor name"
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), handleAddActor())
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddActor}
            sx={{ height: "40px", whiteSpace: "nowrap" }}
          >
            Add
          </Button>
        </Box>

        {actors.length > 0 && (
          <Box mb={2} display="flex" flexWrap="wrap" gap={1}>
            {actors.map((a, index) => (
              <Chip
                key={index}
                label={a}
                onDelete={() => handleDeleteActor(a)}
                color="secondary"
              />
            ))}
          </Box>
        )}

        <Box display="flex" alignItems="center" mb={3}>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onChange={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            color="primary"
            sx={{ paddingLeft: 0, marginRight: 1 }}
          />
          <FormLabel sx={{ margin: 0, userSelect: "none" }}>Featured</FormLabel>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: "#000",
            ":hover": { bgcolor: "green" },
            paddingY: 1.5,
            fontWeight: "600",
          }}
        >
          Add New Movie
        </Button>
      </Box>

      {/* Snackbar for status message */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddMovie;
