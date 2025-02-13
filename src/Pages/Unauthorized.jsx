import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          bgcolor: "#040417",
          color: "white",
          textAlign: "center",
          p: 3,
        }}
      >
        <Typography variant="h3" gutterBottom>
          401
        </Typography>
        <Typography variant="h5" paragraph>
          Unauthorized! You don’t have permission to view this page.
        </Typography>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ bgcolor: "#262852" }}
        >
          Go to Login
        </Button>
      </Box>
    </Box>
  );
};
// #endregion

export default Unauthorized;
