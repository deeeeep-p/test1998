import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Navbar1 from "./Components/Navbar1";
import Dashboard from "./Pages/Dashboard";
import UpdateSite from "./Pages/UpdateSite";
import { Route, Routes, Link } from "react-router-dom"; // Import Link
import NotFound from "./Pages/NotFound";
import Login from "./Pages/Login";
import Rough from "./Components/Rough";
import { TokenProvider } from "./Auth/TokenContext";
import Contact from "./Pages/Contact";
import Faq from "./Pages/Faq";
import SitePage from "./Components/SitePage";

const drawerWidth = 300;

function App(props) {
  // const background = "linear-gradient(-90deg, #1c1f3c 0%, #000d22 100%)";
  // const bgUlta = "linear-gradient(90deg, #1c1f3c 0%, #000d22 100%)";
  const background = "linear-gradient(-90deg, #161a32 0%, #000c1a 100%)";
  const bgUlta = "linear-gradient(90deg, #161a32 0%, #000c1a 100%)";

  const componentColor = "#262852";
  const bgcolor = "#040417";
  const sideBarColor = "#080842";
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div className="h-screen">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: `${background}`,
          color: "white",
        }}
      >
        <Typography variant="h6" noWrap component="div" fontWeight={"bold"}>
          MENU
        </Typography>
      </Toolbar>
      <Divider
        sx={{
          bgcolor: `${componentColor}`,
        }}
      />
      <List>
        {["Dashboard", "Append Progress"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton
              component={Link} // Add this line
              to={
                text === "Dashboard"
                  ? "/dashboard"
                  : `/${text.replace(" ", "").toLowerCase()}`
              } // Set the link
              sx={{
                color: "white",
                // bgcolor:
                // selectedIndex === index ? componentColor : "transparent", // Conditional background
              }}
              // onClick={() => handleListItemClick(index)} // Handle item click
            >
              <ListItemIcon sx={{ color: "white" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Typography variant="h14" fontWeight="bold" color={"white"}>
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Contact", "FAQ", "Request Permission"].map((text, index) => (
          <ListItem key={text}>
            <ListItemButton
              component={Link} // Add this line
              to={`/${text.replace(" ", "").toLowerCase()}`} // Set the link
              sx={{
                color: "white",
                bgcolor: "transparent", // Conditional background
              }}
              // onClick={() => handleListItemClick(index + 3)} // Handle item click
            >
              <ListItemIcon sx={{ color: "white" }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <Typography variant="h14" fontWeight="bold" color={"white"}>
                {text}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <TokenProvider>
      <Box
        sx={{
          display: "flex",
          bgcolor: `${bgcolor}`,
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            boxShadow: "none",
            borderBottom: `1px solid ${"componentColor"}`,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              p: 0,
              m: 0,
              background: `${bgUlta}`,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                display: { sm: "none" },
                m: 0,
                color: "white",
              }}
            >
              <MenuIcon />
            </IconButton>
            <Navbar1
              bgcolor={sideBarColor}
              componentColor={componentColor}
              background={bgUlta}
            />
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              border: "none",
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: `${background}`,
                opacity: 0.98,
                backdropFilter: "blur(10px)",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                background: `${background}`,
                border: "none",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            // height: "100%",
            bgcolor: bgcolor,
          }}
        >
          <Toolbar />
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Dashboard
                  bgcolor={bgcolor}
                  componentColor={componentColor}
                  drawerWidth={drawerWidth}
                />
              }
            />
            <Route
              path="/appendprogress"
              element={
                <UpdateSite
                  bgcolor={bgcolor}
                  drawerWidth={drawerWidth}
                  componentColor={componentColor}
                />
              }
            />
            <Route path="/rough" element={<Rough />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/site/:siteName" element={<SitePage />} />
            <Route path="/*" element={<NotFound />} />{" "}
            {/* Handle unknown routes */}
          </Routes>
        </Box>
      </Box>
    </TokenProvider>
  );
}

App.propTypes = {
  window: PropTypes.func,
};

export default App;
