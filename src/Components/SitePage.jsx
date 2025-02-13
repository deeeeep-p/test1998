import { React } from "react";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box, Typography, Paper, Skeleton } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useToken } from "../Auth/TokenContext";
import { useParams } from "react-router-dom";
import SkeletonTemplate from "../Pages/SkeletonTemplate";
import { LineChart } from "@mui/x-charts/LineChart";
import MonthPicker from "./MonthPicker";
import dayjs from "dayjs";
import Unauthorized from "../Pages/Unauthorized";
// Function to get days of the current month
const getDaysInMonth = (monthIndex) => {
  const now = new Date();
  const year = now.getFullYear();

  // Get the last day of the current month
  const lastDay = new Date(year, monthIndex + 1, 0).getDate();

  // Create an array with days from 1 to the last day of the month
  return [...Array(lastDay).keys()].map((day) => day + 1);
};

// Component for the bar chart
const MonthlyBarChart = ({ siteName, data, selectMonth }) => {
  const daysInMonth = getDaysInMonth(selectMonth);
  const barChartParams = {
    barLabel: "value",
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
        data: data
          ? data
          : daysInMonth.map(() => Math.floor(Math.random() * 100)),
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
      sx={{
        borderRadius: "15px",
        height: "100%",
        bgcolor: "#262852",
        overflow: "hidden",
      }}
    >
      <Stack
        direction="column"
        sx={{
          width: "100%",
          maxWidth: 8600,
          margin: "0 auto",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            variant="h5"
            color="white"
            sx={{ mt: 2, mb: 2, textAlign: "center" }}
          >
            {`Piles Completed in ${siteName} during ${dayjs()
              .month(selectMonth)
              .format("MMMM")}`}
          </Typography>
        </Box>

        <Box sx={{ flex: 1 }}>
          <BarChart
            {...barChartParams}
            tooltip={{
              backgroundColor: "#333",
              trigger: "axis",
              formatter: (params) =>
                params
                  .map((param) => `${param.name}: ${param.value}`)
                  .join("<br/>"),
            }}
            sx={{
              "& .MuiBarElement-root": {
                color: "#50e3c2",
              },
              // Change left yAxis label styles
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                fill: "#fff",
              },
              // Change all labels fontFamily shown on both xAxis and yAxis
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                fill: "#fff",
                fontFamily: "sans-serif", // Font family for yAxis labels
              },
              // BottomAxis Line Styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
                stroke: "#fff",
              },
              // LeftAxis Line Styles
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

// Main component
const SitePage = () => {
  const [selectMonth, setSelectMonth] = useState(
    dayjs().month(new Date().getMonth())
  );

  const handleDateChange = (date) => {
    setSelectMonth(date);
  };
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [unAuthorized, setUnAuthorized] = useState(false);
  const { token } = useToken();
  const { siteName } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://travello.tech/api/selectSite/getSiteInfo/${siteName}/${dayjs()
            .month(selectMonth.$M)
            .format("MMM")}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response && error.response.status === 403) {
          setUnAuthorized(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Call the async function
  }, [selectMonth]); // Ensure token is included in dependencies

  if (isLoading)
    return (
      <>
        <SkeletonTemplate />
      </>
    );
  if (unAuthorized)
    return (
      <>
        <Unauthorized />
      </>
    );
  return (
    <Box
      sx={{
        p: 3,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        height: "100vh",
        alignItems: "start",
        gap: 2, // Adjust spacing between items
      }}
    >
      <Box sx={{ gridColumn: { xs: "span 1", md: "span 4" }, maxHeight: 380 }}>
        <MonthlyBarChart
          siteName={siteName}
          data={data}
          selectMonth={selectMonth.$M}
        />
      </Box>
      {/* <Box sx={{ gridColumn: { xs: "span 1", md: "span 4" } }}>
        <MonthlyLineChart siteName={siteName} />
      </Box> */}
      <Box
        sx={{
          gridColumn: { xs: "span 1", md: "span 4" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "start",
        }}
      >
        <Box
          sx={{
            bgcolor: "#262852",
            borderRadius: "15px",
            p: 2,
            // width: "100%",
            // height: "100%",
          }}
        >
          <MonthPicker
            selectMonth={selectMonth}
            setSelectMonth={setSelectMonth}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SitePage;
