import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  const bg = "linear-gradient(-90deg, #161a32 0%, #000c1a 100%)";
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background:
            " linear-gradient(225deg, hsla(240, 78%, 15%, 1) 0%, hsla(0, 0%, 0%, 1) 50%, hsla(240, 78%, 15%, 1) 100%)",
          // "linear-gradient(225deg, #1b1e39 0%, #000a1a 100%)",
          color: "white",
          textAlign: "center",
          p: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" paragraph>
          Oops! The page you’re looking for does not exist.
        </Typography>
        <Button
          component={Link}
          to="/dashboard"
          variant="contained"
          sx={{ bgcolor: "#262852" }}
        >
          Go to Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
