import * as React from "react";
import Stack from "@mui/material/Stack";
import { BarChart, BarLabel } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper } from "@mui/material";

const Chartz = ({ totalArr }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthIndex = new Date().getMonth();
  const monthsArr = months.slice(0, currentMonthIndex + 1);
  totalArr = totalArr.slice(0, currentMonthIndex + 1);
  const seriesData = totalArr.map((num) => (num === 0 ? num + 10 : num / 2));

  const barChartsParams = {
    xAxis: [
      {
        data: monthsArr,
        scaleType: "band",
        tickColor: "#FFFFFF",
        grid: { stroke: "#FFFFFF" },
        color: "#FFFFFF",
      },
    ],
    series: [
      {
        data: totalArr,
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

export default Chartz;

/* import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { total } from "./Calc";

export default function Chartz({ bgcolor, totalArr }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the current month index (0-based, where 0 = Jan, 1 = Feb, ..., 11 = Dec)
  const currentMonthIndex = new Date().getMonth();

  // Slice the array to include only up to the current month
  const monthsArr = months.slice(0, currentMonthIndex + 1);
  totalArr = totalArr.slice(0, currentMonthIndex + 1);
  const seriesData = totalArr.map((num) => (num === 0 ? num + 10 : num / 2));

  console.log(totalArr);
  return (
    <Paper
      sx={{
        height: "100%",
        bgcolor: bgcolor ? bgcolor : "#262852",
        // borderRadius: "10%",
        padding: 2, // Add padding to ensure chart has some spacing
        overflow: "hidden", // Ensure no overflow from the circular container
      }}
    >
      <ResponsiveChartContainer
        series={[
          {
            type: "bar",
            data: totalArr,
          },
          {
            type: "line",
            data: seriesData,
          },
        ]}
        xAxis={[
          {
            data: monthsArr,
            scaleType: "band",
            id: "x-axis-id",
            tickLabelStyle: { fill: "#FFFFFF" }, // Set X-axis labels color to white
          },
        ]}
        // {...sizingProps}
      >
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis
          label="X axis"
          position="bottom"
          axisId="x-axis-id"
          labelStyle={{ fill: "#FFFFFF" }} // Set X-axis label color to white
        />
      </ResponsiveChartContainer>
    </Paper>
  );
} */

/* 
import * as React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ResponsiveChartContainer } from "@mui/x-charts/ResponsiveChartContainer";
import { BarPlot } from "@mui/x-charts/BarChart";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";

export default function Chartz({ bgcolor, totalArr }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentMonthIndex = new Date().getMonth();
  const monthsArr = months.slice(0, currentMonthIndex + 1);
  totalArr = totalArr.slice(0, currentMonthIndex + 1);
  const seriesData = totalArr.map((num) => (num === 0 ? num + 10 : num / 2));

  return (
    <Paper
      sx={{
        height: "100%",
        bgcolor: bgcolor ? bgcolor : "#262852",
        padding: 2,
        overflow: "hidden",
      }}
    >
      <ResponsiveChartContainer
        series={[
          {
            type: "bar",
            data: totalArr,
            tooltip: {
              // Tooltip configuration for BarPlot
              formatter: (value) => `Value: ${value}`,
              backgroundColor: "#333",
              color: "#fff",
            },
          },
          {
            type: "line",
            data: seriesData,
            tooltip: {
              // Tooltip configuration for LinePlot
              formatter: (value) => `Value: ${value}`,
              backgroundColor: "#333",
              color: "#fff",
            },
          },
        ]}
        xAxis={[
          {
            data: monthsArr,
            scaleType: "band",
            id: "x-axis-id",
            tickLabelStyle: { fill: "#FFFFFF" },
          },
        ]}
      >
        <BarPlot />
        <LinePlot />
        <ChartsXAxis
          label="X axis"
          position="bottom"
          axisId="x-axis-id"
          labelStyle={{ fill: "#FFFFFF" }}
        />
      </ResponsiveChartContainer>
    </Paper>
  );
}
 */
