import * as React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

// Contact page component
export default function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert("Form submitted!");
  };

  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        background: "linear-gradient(90deg, #080842 0%, #040417 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            padding: 3,
            bgcolor: "#262852",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            color="#eee"
            gutterBottom
            sx={{ fontFamily: '"Arial", sans-serif' }} // Custom font without theme
          >
            Contact Us
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              InputLabelProps={{ style: { color: "#eee" } }} // White label text
              InputProps={{ style: { color: "#eee" } }} // White input text
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#424286", // East Bay background for input
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#eee", // White border for outline
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              InputLabelProps={{ style: { color: "#eee" } }} // White label text
              InputProps={{ style: { color: "#eee" } }} // White input text
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#424286", // East Bay background for input
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#eee", // White border for outline
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="message"
              label="Message"
              name="message"
              multiline
              rows={4}
              InputLabelProps={{ style: { color: "#eee" } }} // White label text
              InputProps={{ style: { color: "#eee" } }} // White input text
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#424286", // East Bay background for input
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#eee", // White border for outline
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#543bac", // Royal Purple
                "&:hover": {
                  bgcolor: "#885add", // Medium Purple on hover
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
