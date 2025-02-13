import * as React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

const faqs = [
  {
    question: "What is this application about?",
    answer:
      "This application provides various functionalities for users to interact with the system.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "To reset your password, click on 'Forgot password?' on the login page and follow the instructions.",
  },
  {
    question: "Where can I find more information?",
    answer:
      "For more information, visit our website or contact our support team.",
  },
  // Add more FAQs as needed
];

export default function Faq({ bgcolor, componentColor, drawerWidth }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Example fetch call; replace with your actual API endpoint if needed
  //       const response = await axios.get("http://localhost:4000/api/faqs");
  //       // Handle response if you fetch real data
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData(); // Call the async function
  // }, []); // Empty dependency array ensures this runs once when component mounts

  // if (isLoading) {
  //   return (
  //     <Box
  //       component="main"
  //       sx={{
  //         flexGrow: 1,
  //         p: 3,
  //         width: { sm: `calc(100% - ${drawerWidth}px)` },
  //         bgcolor: bgcolor,
  //       }}
  //     >
  //       {/* Placeholder for loading state */}
  //       <Typography variant="h6" color="text.primary">
  //         Loading FAQs...
  //       </Typography>
  //     </Box>
  //   );
  // }
  // if (error) {
  //   return <Unauthorized />;
  // }

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        bgcolor: bgcolor,
        height: "100vh",
      }}
    >
      <Toolbar />
      <Typography variant="h4" color="#eee" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Grid container spacing={3}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                padding: 2,
                bgcolor: "#262852",
                color: "#eee",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" color="#eee" gutterBottom>
                {faq.question}
              </Typography>
              <Typography variant="body1" color="#eee">
                {faq.answer}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
