import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

function SkeletonItem({ variant = "wave" }) {
  return (
    <Box
      sx={{
        bgcolor: "#333",
        borderRadius: "10px",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Skeleton variant={variant} width="100%" height="100%" />
    </Box>
  );
}

export default function SkeletonTemplate() {
  return (
    <Box
      component="main"
      sx={{
        p: 3,
        flexGrow: 1,
        display: "grid",
        // gridTemplateRows: "repeat(3, 1fr)",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 2, // Adjust spacing between items
        width: "100%",
        background:
          "linear-gradient(-90deg, #080842 0%, #040417 100%, #040417 100%)",
      }}
    >
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Box>
  );
}
