import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import axios from "axios";
import SimpleSnackbar from "../Components/SimpleSnackbar";
import { Skeleton } from "@mui/material";
import SkeletonTemplate from "./SkeletonTemplate";
import { useToken } from "../Auth/TokenContext";
import Unauthorized from "./Unauthorized";
import Linearload from "../Components/Linearload";

// Example color palette usage
const colors = {
  white: "#ffffff",
  darkPurple: "#080842",
  mediumPurple: "#885add",
  lightGray: "#f5f5f5",
};

const UpdateSite = ({ drawerWidth, bgcolor, componentColor }) => {
  const { token } = useToken();
  const initialFormData = {
    siteName: "",
    piles: "",
    date: "",
    StaffMember: "",
    Opretor: "",
    Labour: "",
    Mechanic: "",
    Welder: "",
    Fitter: "",
    Diesel: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    isPositive: false,
  });
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState([]);
  const [unAuthorized, setUnAuthorized] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const dateOptions = [
    { option: "Yesterday", label: "Yesterday" },
    { option: "Today", label: "Today" },
    { option: "Tomorrow", label: "Tomorrow" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://34.93.167.213:8080/api/selectSite/AllSites",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const siteData = response.data;
        const formattedData = siteData.map((site) => ({
          value: site,
          label: site,
        }));
        setSites(formattedData);
      } catch (error) {
        console.error("Error fetching site data:", error);
        setAlert({ open: true, message: error, isPositive: false });

        if (error.request.status === 403) {
          setUnAuthorized(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const dateFormater = (day) => {
    const date = new Date();

    if (day === "Yesterday") {
      date.setDate(date.getDate() - 1);
    } else if (day === "Tomorrow") {
      date.setDate(date.getDate() + 1);
    }

    // Format the date as "Jul-1"
    const options = { month: "short", day: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-US", options);
    const [month, num] = formatter.format(date).split(" ");

    // Replace the space between month and day with a hyphen
    return `${num}-${month}`;
  };

  const handleChangeSide = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      siteName: value,
    }));
  };
  const handleChangeDate = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      date: value,
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const callAPI = async (e) => {
    e.preventDefault();
    formData.date = dateFormater(formData.date);
    if (!(formData.date && formData.siteName && formData.piles)) {
      setAlert({
        open: true,
        message: "Please fill in all required fields",
        isPositive: false,
      });
      return;
    }
    console.log(formData);
    try {
      setSubmitting(true);
      await axios.post(
        "http://34.93.167.213:8080/api/selectSite/getInfo/test",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add any required headers
          },
        }
      );
      setAlert({
        open: true,
        message: "Data submitted successfully!",
        isPositive: true,
      });
    } catch (err) {
      console.error(err);
      if (err.request.status === 403) {
        setUnAuthorized(true);
      }
      setAlert({ open: true, message: err.message, isPositive: false });
      console.log(err);
    } finally {
      setSubmitting(false);
      setFormData(initialFormData);
    }
  };

  const handleSnackbarClose = () => {
    setAlert({ ...alert, open: false });
  };

  if (loading) {
    return <SkeletonTemplate />;
  }
  if (unAuthorized) {
    return <Unauthorized />;
  }
  return (
    <Box component="main" sx={{ flexGrow: 1, bgcolor: bgcolor, p: 3 }}>
      <Box
        sx={{
          bgcolor: bgcolor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          // p: 2,
        }}
      >
        <Box
          component="form"
          sx={{
            width: { xs: "90%", sm: "60%", md: "40%" },
            maxWidth: "600px",
            bgcolor: colors.lightGray,
            borderRadius: "10px",
            p: 3,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            boxShadow: "0px 0px 92px -25px rgba(fff,142,159,0.38)",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            required
            id="site"
            select
            label="Required"
            helperText="Please select Site"
            value={formData.siteName}
            onChange={handleChangeSide}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              "& .MuiFormHelperText-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          >
            {sites.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="date"
            select
            label="Required"
            helperText="Please select Date"
            value={formData.date}
            onChange={handleChangeDate}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              "& .MuiFormHelperText-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          >
            {dateOptions.map((option) => (
              <MenuItem key={option.option} value={option.option}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            required
            id="piles"
            label="Piles"
            variant="filled"
            value={formData.piles}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="StaffMember"
            label="Staff Member"
            variant="filled"
            value={formData.StaffMember}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="Opretor"
            label="Operator"
            variant="filled"
            value={formData.Opretor}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="Labour"
            label="Labour"
            variant="filled"
            value={formData.Labour}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="Mechanic"
            label="Mechanic"
            variant="filled"
            value={formData.Mechanic}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="Welder"
            label="Welder"
            variant="filled"
            value={formData.Welder}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="Fitter"
            label="Fitter"
            variant="filled"
            value={formData.Fitter}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <TextField
            id="Diesel"
            label="Diesel"
            variant="filled"
            value={formData.Diesel}
            onChange={handleChange}
            fullWidth
            sx={{
              "& .MuiInputBase-input": { color: colors.darkPurple },
              "& .MuiFormLabel-root": { color: colors.darkPurple },
              bgcolor: colors.lightGray,
              borderRadius: "5px",
            }}
          />
          <Button
            variant="contained"
            type="submit"
            onClick={callAPI}
            sx={{
              bgcolor: colors.darkPurple,
              color: colors.white,
              "&:hover": {
                bgcolor: colors.mediumPurple,
              },
            }}
          >
            Submit
          </Button>
          {submitting && <Linearload />}
        </Box>
        <SimpleSnackbar
          open={alert.open}
          errMessage={alert.message}
          onClose={handleSnackbarClose}
          isPositive={alert.isPositive}
        />
      </Box>
    </Box>
  );
};

export default UpdateSite;
