import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const StatBox = ({ progress = "0.75", size = "40", bgColor }) => {
  console.log(bgColor);
  progress = progress / 100;
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const angle = progress * 360;

  useEffect(() => {
    const duration = 2000; // Duration in milliseconds
    const startTime = performance.now();

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setAnimatedProgress(progress * angle);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      // Cleanup if needed (not required here but good practice)
    };
  }, [progress, angle]);

  return (
    <Box
      sx={{
        background: `radial-gradient(${bgColor} 55%, transparent 56%),
          conic-gradient(transparent 0deg ${animatedProgress}deg, #4a90e2 ${animatedProgress}deg 360deg),
          #50e3c2`,
        borderRadius: "50%",
        width: { xs: `${Number(size) + 25}px`, sm: `${size}px` },
        height: { xs: `${Number(size) + 25}px`, sm: `${size}px` },
        transition: "background 1s ease-out",
      }}
    />
  );
};

export default StatBox;
