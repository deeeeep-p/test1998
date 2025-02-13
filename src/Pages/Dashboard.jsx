import Box from "@mui/material/Box";
import SiteInfo from "../Components/SiteInfo";
import Map from "../Components/Map";
import Chartz from "../Components/Chartz";
import SkeletonTemplate from "./SkeletonTemplate";
import { useState, useEffect } from "react";
import axios from "axios";
import Unauthorized from "./Unauthorized";
import { useToken } from "../Auth/TokenContext";
import Grow from "@mui/material/Grow";

function Dashboard({ bgcolor, componentColor, drawerWidth }) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [unAuthorized, setUnAuthorized] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://travello.tech/api/selectSite/getInfo/Monthly",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
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
  }, [token]);

  useEffect(() => {
    if (!isLoading && !unAuthorized) {
      setMounted(true);
    }
  }, [isLoading, unAuthorized]);

  // Loading and Unauthorized Handling
  if (isLoading) return <SkeletonTemplate />;
  if (unAuthorized) return <Unauthorized />;

  // Ensure data is valid before accessing its properties
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <SkeletonTemplate />;
  }

  const newData = data.slice(1);
  const totalArr = data.at(-1)?.slice(2, -1) || [];

  return (
    <Box
      sx={{
        p: 3,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      {newData.slice(0, 4).map((site, index) => {
        if (!site || site.length === 0) return null;
        const transformedData = site
          .map((item) => (item === "" || item == null ? 0 : Number(item)))
          .slice(2, -1);
        const [siteName, location] = site.slice(0, 2);
        return (
          <Grow in={mounted} key={siteName + location}>
            <Box>
              <SiteInfo
                bgcolor={componentColor}
                siteLocation={location}
                siteName={siteName}
                arr={transformedData}
              />
            </Box>
          </Grow>
        );
      })}

      <Box
        className="transition-transform duration-300 transform hover:scale-[105%]"
        bgcolor={componentColor}
        borderRadius="10px"
        height="300px"
        sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
      >
        <Map
          locations={[
            "Shilphata, Maharashtra",
            "Pune, Maharashtra",
            "Kaygaon, Maharashtra",
            "Shegaon, Maharashtra",
            "Diva, Maharashtra",
            "Mulund, Maharashtra",
            "Ambivali, Maharashtra",
            "Mundra, Gujarat",
          ]}
        />
      </Box>

      <Box
        className="transition-transform duration-300 transform hover:scale-[103%] hover:border-2 border-2-red"
        bgcolor={componentColor}
        height="300px"
        borderRadius="10px"
        sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
      >
        <Chartz totalArr={totalArr} />
      </Box>

      {newData.slice(4).map((site, index) => {
        if (!site || site.length === 0) return null;
        const transformedData = site
          .map((item) => (item === "" || item == null ? 0 : Number(item)))
          .slice(2, -1);
        const [siteName, location] = site.slice(0, 2);
        return (
          <Grow in={mounted} key={siteName + location}>
            <Box>
              <SiteInfo
                bgcolor={componentColor}
                siteLocation={location}
                siteName={siteName}
                arr={transformedData}
              />
            </Box>
          </Grow>
        );
      })}
    </Box>
  );
}

export default Dashboard;
