import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const Movieitem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        width: 240,
        height: 360,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "8px 8px 24px rgba(0, 0, 0, 0.2)",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Poster Image */}
      <Box
        component="img"
        src={posterUrl}
        alt={title}
        height="50%"
        width="100%"
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
        }}
      />

      {/* Movie Info */}
      <CardContent sx={{ padding: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          fontWeight="bold"
          color="primary.main"
          noWrap
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>

      {/* Booking Button */}
      <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button
          variant="contained"
          component={Link}
          to={`/Booking/${id}`}
          size="small"
          sx={{
            textTransform: "none",
            fontWeight: 500,
            px: 3,
            borderRadius: 2,
            backgroundColor: "#d32f2f",
            "&:hover": {
              backgroundColor: "#b71c1c",
            },
          }}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Movieitem;
