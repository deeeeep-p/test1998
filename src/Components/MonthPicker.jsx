import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import dayjs from "dayjs";

// Style overrides for DatePicker
const WhiteDatePicker = styled(DatePicker)({
  "& .MuiInputBase-root": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white",
  },
  "& .MuiFormControl-root": {
    backgroundColor: "#262852", // Adjust if needed
    borderRadius: "4px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

export default function MonthPicker({ selectMonth, setSelectMonth }) {
  React.useEffect(() => {
    console.log(dayjs().month(selectMonth.$M).format("MMMM"));
  }, [selectMonth]);

  const handleDateChange = (date) => {
    setSelectMonth(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <Box sx={{ textAlign: "center" }}>
          <WhiteDatePicker
            label={"Pick Month"}
            views={["month"]}
            value={selectMonth}
            onChange={handleDateChange}
          />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}
