import * as React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

// Copyright component
function Copyright(props) {
  return (
    <Typography variant="body2" color="#eee" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://www.encominfrastructure.com/">
        Encom Infrastructure
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// Login component
export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("email");
    const password = data.get("password");

    try {
      // Post request to login
      const response = await axios.post("http://34.93.167.213:8080/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); // Save token
      alert("Logged in successfully");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
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
        <CssBaseline />
        <Box
          sx={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#262852",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", boxShadow: 2 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="#eee">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{ style: { color: "#eee" } }}
              InputProps={{ style: { color: "#eee" } }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { bgcolor: "#424286" },
                // "& .MuiOutlinedInput-notchedOutline": { borderColor: "#eee" },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { color: "#eee" } }}
              InputProps={{
                style: { color: "#eee" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "#eee" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": { bgcolor: "#424286" },
                // "& .MuiOutlinedInput-notchedOutline": { borderColor: "#eee" },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  sx={{
                    color: "#eee",
                    "&.Mui-checked": { color: "#eee" },
                  }}
                />
              }
              label="Remember me"
              sx={{ color: "#eee" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#543bac",
                boxShadow: 2,
                "&:hover": { bgcolor: "#885add" },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="#eee">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="#eee">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Box>
  );
}
