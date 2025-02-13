import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import StatBox from "./StatBox";
import ArrowUpwardSharpIcon from "@mui/icons-material/ArrowUpwardSharp";
import FunctionsSharpIcon from "@mui/icons-material/FunctionsSharp";
import { percentProgress, total } from "./Calc";
import { useNavigate } from "react-router";
const drawerWidth = 300;
const SiteInfo = ({
  bgcolor,
  siteName = "Lorem",
  siteLocation = "Epsum",
  arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  target,
}) => {
  // Ensure siteName is a string and handle undefined or null values
  const sanitizedLocation =
    typeof siteLocation === "string" ? siteLocation.split(" ").at(0) : "Epsum";

  const sanitizedSiteName =
    typeof siteName == "string"
      ? siteName.split(" ").at(0).slice(0, 8)
      : "Lorem";

  const navigate = useNavigate();
  return (
    <Box
      onDoubleClick={() => navigate(`/site/${siteName.split(" ").at(0)}`)}
      // className="transition-transform duration-300 transform hover:scale-110 hover:border-2"
      className="transition-transform duration-300 transform hover:scale-110 hover:border-1"
      sx={{
        bgcolor: bgcolor || "#262852",
        borderRadius: "15px",
        height: "200px",
        padding: "20px",
        pr: "0px",
        py: "0px",
        display: "grid",
        gridTemplateColumns: "2fr 2fr",
        // boxShadow: `${shadowColor} 29px 29px 29px 29px`,
        boxShadow: "0px 0px 92px -25px rgba(137,142,159,0.38)",
      }}
    >
      <Box
        py={"20px"}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
        justifySelf={"start"}
        alignSelf={"start"}
        justifyContent={"space-evenly"}
      >
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <EditLocationAltIcon color="white" sx={{ fill: "white" }} />
          {/* <Typography variant="h4" fontWeight="bold" color={"white"}>
            {sanitizedLocation}
          </Typography> */}
          {
            <Typography
              variant={`${sanitizedLocation.length > 4 ? "h5" : "h4"}`}
              fontWeight="bold"
              color={"white"}
            >
              {sanitizedLocation}
            </Typography>
          }
        </Box>
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <ApartmentSharpIcon
            color="white"
            sx={{ fill: "white" }}
            paddingLeft={"35px"}
          />
          <Typography variant="h5" color={"white"}>
            {sanitizedSiteName}
          </Typography>
        </Box>
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <FunctionsSharpIcon color="white" sx={{ fill: "white" }} />
          <Typography variant="h8" fontWeight="bold" color={"white"}>
            {arr ? total(arr) : 100}
          </Typography>
        </Box>
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <ArrowUpwardSharpIcon color="white" sx={{ fill: "white" }} />
          <Typography variant="h8" fontWeight="bold" color={"white"}>
            {arr ? arr[new Date().getMonth() - 1] : -1}
          </Typography>
        </Box>
      </Box>
      <Box
        alignSelf={"center"}
        justifySelf={"center"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatBox
          progress={`${percentProgress(arr)}`}
          size={"70"}
          bgColor={`${bgcolor}`}
        />
        <Typography variant="h5" color={"white"} mt={"20px"}>
          {"+ " + percentProgress(arr) + "%"}
        </Typography>
      </Box>
    </Box>
  );
};

export default SiteInfo;
