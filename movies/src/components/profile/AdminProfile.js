import React, { Fragment, useEffect, useState } from "react";
import { getadminById } from "../../apihelpers/api-helper";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import PersonPinRoundedIcon from "@mui/icons-material/PersonPinRounded";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    getadminById()
      .then((res) => setAdmin(res?.admin))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Fragment>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        padding={2}
        alignItems="center"
        justifyContent="center"
      >
        {/* Top: Admin Info */}
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxWidth={600}
          padding={2}
          borderBottom="1px solid #ccc"
          mb={3}
        >
          <PersonPinRoundedIcon sx={{ fontSize: 140, color: "#555" }} />
          <Box ml={4} display="flex" flexDirection="column" justifyContent="center">
            {admin?.email && (
              <Typography
                variant="h6"
                color="text.primary"
                sx={{ wordBreak: "break-word" }}
              >
                Email: {admin.email}
              </Typography>
            )}
          </Box>
        </Box>

        {/* Bottom: Added Movies */}
        {admin?.addedMovies?.length > 0 && (
          <Box width="100%" display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h4"
              fontFamily="Verdana"
              textAlign="center"
              padding={2}
              mb={2}
            >
              Added Movies
            </Typography>
            <Box width={{ xs: "90%", md: "60%" }}>
              <List sx={{ padding: 0 }}>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem key={movie._id || index} sx={{ padding: 0, mb: 2 }}>
                    <Card sx={{ display: "flex", width: "100%" }}>
                      <CardMedia
                        component="img"
                        image={movie.posterUrl}
                        alt={movie.title}
                        sx={{
                          width: 160,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography component="div" variant="h6" fontWeight="bold">
                          {movie.title}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          mt={1}
                        >
                          Release Date: {new Date(movie.releaseDate).toDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Box>
    </Fragment>
  );
};

export default AdminProfile;
