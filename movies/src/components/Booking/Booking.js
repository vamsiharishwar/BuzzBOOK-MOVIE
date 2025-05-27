import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, newBooking } from "../../apihelpers/api-helper";
import {
  Box,
  Button,
  Typography,
  Alert,
  Container,
  Paper,
  TextField,
  FormLabel,
  Divider,
} from "@mui/material";

const TOTAL_SEATS = 110;
const PLATINUM_SEATS = 36;
const PLATINUM_SEATS_PER_ROW = 12;

const GOLD_SEATS_PER_ROW = 15;

const Booking = () => {
  const [movie, setMovie] = useState();
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [date, setDate] = useState("");
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => {
        setMovie(res.movie);
        // Assuming API returns bookedSeats array inside movie details or another call might be needed
        if (res.movie.bookedSeats) {
          setBookedSeats(res.movie.bookedSeats);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSeat || !date) {
      setBookingStatus({
        type: "error",
        message: !selectedSeat
          ? "Please select a seat."
          : "Please select a date.",
      });
      return;
    }

    newBooking({ seatNumber: selectedSeat, date, movie: movie._id })
      .then((res) => {
        setBookingStatus({ type: "success", message: "Booking successful!" });
        setBookedSeats((prev) => [...prev, selectedSeat]);
        setSelectedSeat(null);
        setDate("");
        setShowForm(false);
      })
      .catch((err) => {
        setBookingStatus({ type: "error", message: "Booking failed. Try again." });
      });
  };

  const renderSeatsBlock = (start, end, seatsPerRow) => {
    const blocks = [];
    const totalSeats = end - start + 1;
    const rows = Math.ceil(totalSeats / seatsPerRow);

    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let col = 0; col < seatsPerRow; col++) {
        const seatNumber = start + row * seatsPerRow + col;
        if (seatNumber > end) break;

        const isBooked = bookedSeats.includes(seatNumber);
        const isSelected = selectedSeat === seatNumber;

        rowSeats.push(
          <Button
            key={seatNumber}
            variant={isBooked ? "outlined" : isSelected ? "contained" : "text"}
            color={isBooked ? "error" : isSelected ? "primary" : "secondary"}
            disabled={isBooked}
            onClick={() => setSelectedSeat(seatNumber)}
            sx={{
              minWidth: "36px",
              margin: "4px",
              borderRadius: "6px",
            }}
            title={`Seat ${seatNumber}`}
          >
            {seatNumber}
          </Button>
        );
      }

      blocks.push(
        <Box key={row} display="flex" justifyContent="center" flexWrap="nowrap" alignItems="center">
          {/* Left side seats */}
          {rowSeats.slice(0, Math.floor(seatsPerRow / 2))}

          {/* Aisle space */}
          <Box sx={{ width: "32px" }} />

          {/* Right side seats */}
          {rowSeats.slice(Math.floor(seatsPerRow / 2))}
        </Box>
      );
    }

    return blocks;
  };

  const renderSeatLayout = () => (
    <Box>
      {/* Platinum Section */}
      <Typography variant="h6" textAlign="center" color="primary" gutterBottom>
        Rs. 350 - PLATINUM
      </Typography>
      {renderSeatsBlock(1, PLATINUM_SEATS, PLATINUM_SEATS_PER_ROW)}

      <Divider sx={{ my: 4 }} />

      {/* Gold Section */}
      <Typography variant="h6" textAlign="center" color="secondary" gutterBottom>
        Rs. 295 - GOLD
      </Typography>
      {renderSeatsBlock(PLATINUM_SEATS + 1, TOTAL_SEATS, GOLD_SEATS_PER_ROW)}
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {bookingStatus && (
        <Alert
          severity={bookingStatus.type}
          sx={{ mb: 3 }}
          onClose={() => setBookingStatus(null)}
        >
          {bookingStatus.message}
        </Alert>
      )}

      {movie ? (
        <Box display="flex" flexDirection="column" gap={4}>
          {/* Movie Info */}
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography
              fontFamily="Georgia"
              variant="h5"
              textAlign="center"
              color="primary"
            >
              {movie.title}
            </Typography>

            <Box display="flex" justifyContent="center" mt={2}>
              <img
                src={movie.posterUrl}
                alt={movie.title}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                  display: "block",
                  margin: "auto",
                }}
              />
            </Box>

            <Typography mt={2}>{movie.description}</Typography>
            <Typography fontWeight="bold" mt={2}>
              Cast: {movie.actors.join(", ")}
            </Typography>
            <Typography fontWeight="bold" mt={1}>
              Release Date: {new Date(movie.releaseDate).toDateString()}
            </Typography>

            <Box textAlign="center" mt={3}>
              <Button variant="contained" onClick={() => setShowForm(true)}>
                Book Ticket
              </Button>
            </Box>
          </Paper>

          {/* Booking Form */}
          <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
            <Typography
              variant="h6"
              textAlign="center"
              color="secondary"
              gutterBottom
            >
              Booking Form
            </Typography>

            {!showForm ? (
              <Typography textAlign="center" color="text.secondary">
                Click "Book Ticket" to begin seat selection.
              </Typography>
            ) : (
              <>
                <Typography textAlign="center" mb={2}>
                  Select a Seat
                </Typography>
                {renderSeatLayout()}

                <form onSubmit={handleSubmit}>
                  <Box mt={3} display="flex" flexDirection="column" gap={2}>
                    <FormLabel>Booking Date</FormLabel>
                    <TextField
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      type="date"
                      required
                    />

                    <Button
                      type="submit"
                      variant="contained"
                      disabled={!selectedSeat || !date}
                    >
                      Confirm Booking
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </Paper>
        </Box>
      ) : (
        <Typography textAlign="center" mt={4}>
          Loading movie details...
        </Typography>
      )}
    </Container>
  );
};

export default Booking;
