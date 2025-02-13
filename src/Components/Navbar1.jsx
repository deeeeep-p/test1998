import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useToken } from "../Auth/TokenContext";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";

const settings = ["Logout"];

function Navbar1({ bgcolor, componentColor, background }) {
  const navigate = useNavigate();
  const { clearToken } = useToken();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    clearToken();
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to /dashboard upon successful login
  };

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: bgcolor,
        background: `${background}`,
        // background:
        //   "linear-gradient(180deg, #080842 0%, #040417 100%, #040417 100%)",
        // opacity: 0,
      }}
    >
      <Toolbar disableGutters>
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
            // justifyContent: { xs: "left", md: "center" },
            // opacity: 1,
          }}
        >
          <Box
            sx={{
              // bgcolor: "black",
              // px: 2,
              bgcolor: "#060638",
              borderRadius: 1,
              // bgcolor: "white",
              // boxShadow: "0px 0px 92px -25px rgba(100,1000,1000,0.38)",
              // opacity: 10,
            }}
          >
            <img src={logo} alt="Logo" width={"150px"} height={"auto"} />
          </Box>
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            justifyContent: { xs: "center", md: "left" },
            // bgcolor: "white",
          }}
        >
          <Box
            sx={{
              // bgcolor: "black",
              // px: 2,
              // background:
              //   "linear-gradient(90deg, rgba(8,8,66,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 75%, rgba(8,8,66,1) 100%)",
              borderRadius: 1,
              bgcolor: "white",
              // boxShadow: "0px 0px 92px -25px rgba(100,1000,1000,0.38)",
            }}
          >
            <img src={logo} alt="Logo" width={"150px"} height={"auto"} />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
                sx={{
                  bgcolor: `${componentColor}`,
                }}
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={handleCloseUserMenu}
                sx={{ bgcolor: bgcolor, color: "white" }}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Box>
  );
}

export default Navbar1;
