import Stack from "@mui/material/Stack";
import { BarChart, BarLabel } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper } from "@mui/material";
import React from "react";
const getDaysInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based index for months

  // Get the last day of the current month
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Create an array with days from 1 to the last day of the month
  return [...Array(lastDay).keys()].map((day) => day + 1);
};

const Rough = () => {
  const daysInMonth = getDaysInMonth();
  const barChartsParams = {
    xAxis: [
      {
        data: daysInMonth,
        scaleType: "band",
        tickColor: "#FFFFFF",
        grid: { stroke: "#FFFFFF" },
        color: "#FFFFFF",
      },
    ],
    series: [
      {
        data: [],
        stack: "1",
        label: "Piles",
      },
    ],
    margin: { top: 10, right: 10 },
    height: 300,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };
  return (
    <Paper
      className="transition-transform duration-300 transform hover:scale-110"
      sx={{
        height: "100%",
        bgcolor: "#262852",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: "100%",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <BarChart
            {...barChartsParams}
            tooltip={{
              backgroundColor: "#333",
              trigger: "axis",
              formatter: (params) => {
                return params
                  .map((param) => `${param.name}: ${param.value}`)
                  .join("<br/>");
              },
            }}
            sx={{
              "& .MuiBarElement-root": {
                color: "#50e3c2",
              },
              //change left yAxis label styles
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                fill: "#fff",
              },
              // change all labels fontFamily shown on both xAxis and yAxis,
              // change bottom label styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                fill: "#fff",
                fontFamily: "sans-serif", // Font family for yAxis labels
              },
              // bottomAxis Line Styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                stroke: "#fff",
              },
              // leftAxis Line Styles
              "& .MuiChartsAxis-left .MuiChartsAxis-line": {
                stroke: "#fff",
              },
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

export default Rough;
