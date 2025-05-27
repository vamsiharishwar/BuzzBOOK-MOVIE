import React, { Fragment, useEffect, useState } from "react";
import { deleteBooking, getUserBookings, getUserDetails } from "../../apihelpers/api-helper";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  
} from "@mui/material";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";
import DeleteIcon from "@mui/icons-material/Delete";

const UserProfile = () => {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserBookings()
      .then((res) => setBookings(res.bookings))
      .catch((err) => console.log(err));

    getUserDetails()
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    deleteBooking(id)
      .then(() => {
        setBookings((prev) => prev.filter((booking) => booking._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"  // Always vertical stack
        gap={4}
        px={{ xs: 2, md: 4 }}
        py={4}
        alignItems="center"
      >
        {/* Top: User Info */}
        
<Paper
  elevation={3}
  sx={{
    width: { xs: "100%", md: "60%" },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",  // vertically center both icon and details
    p: 4,
    borderRadius: 3,
    bgcolor: "background.paper",
    boxShadow: 3,
    gap: 4,  // space between icon and details
  }}
>
  <PersonPinRoundedIcon sx={{ fontSize: 140, color: "primary.main" }} />

  {user && (
    <Box>
      <Typography
        variant="h5"
        fontWeight="medium"
        color="text.primary"
        mb={1}
      >
        {user.name}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ wordBreak: "break-word" }}
      >
        {user.email}
      </Typography>
    </Box>
  )}
</Paper>



        {/* Bottom: Bookings */}
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            bgcolor: "background.paper",
            borderRadius: 3,
            p: 3,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            fontFamily="Verdana"
            textAlign="center"
            mb={3}
            color="primary.main"
            fontWeight="bold"
          >
            Your Bookings
          </Typography>

          {bookings.length === 0 ? (
            <Typography textAlign="center" color="text.secondary" mt={4}>
              You have no bookings yet.
            </Typography>
          ) : (
            <List>
              {bookings.map((booking) => (
                <ListItem
                  key={booking._id}
                  sx={{
                    bgcolor: "grey.100",
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    transition: "background-color 0.3s",
                    "&:hover": {
                      bgcolor: "grey.200",
                    },
                  }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(booking._id)}
                      color="error"
                      size="large"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography fontWeight="600" color="text.primary">
                        {booking.movie.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          Seat: <strong>{booking.seatNumber}</strong>
                        </Typography>
                        <Typography component="span" variant="body2" color="text.secondary" display="block">
                          Booking Date: {new Date(booking.date).toLocaleDateString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Fragment>
  );
};

export default UserProfile;
