import React from "react";
import { Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MenuIcon from "@mui/icons-material/Menu";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { FaUserNurse } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "@mui/material";

// const logo = require("../../assets/img/logo.png").default;
import logo from "../../assets/img/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import InventoryIcon from "@mui/icons-material/Inventory";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BusinessIcon from "@mui/icons-material/Business";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import { GiMedicines } from "react-icons/gi";
import { FaBookReader } from "react-icons/fa";

const drawerWidth = 300;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <HomeIcon />, path: "/" },
    {
      text: "Delivery Organization",
      icon: <BusinessIcon />,
      path: "/deliveryOrganization",
    },
    {
      text: "Delivery Persons",
      icon: <DirectionsBikeIcon />,
      path: "/deliveryPersons",
    },
    {
      text: "Orders",
      icon: <InventoryIcon />,
      path: "/orders",
    },
    {
      text: "Pharmacies",
      icon: <AddLocationAltIcon />,
      path: "/pharmacies",
    },
    {
      text: "Pharmacists",
      icon: <FaUserNurse />,
      path: "/pharmacists",
    },
    {
      text: "Prescription Readers",
      icon: <FaBookReader />,
      path: "/prescriptionReaders",
    },
    {
      text: "Products",
      icon: <GiMedicines />,
      path: "/products",
    },
    {
      text: "Users",
      icon: <PeopleAltIcon />,
      path: "/users",
    },
  ];

  const drawer = (
    <div>
      <Toolbar />
      {/* <Divider /> */}
      <List sx={{ paddingLeft: 5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        // color="primary"
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          // paddingLeft: 5,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: theme.palette.primary.main,
            color: theme.palette.text.layoutPrimary,
          },
          bgcolor: "black",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: " center",
          }}
        >
          <Avatar
            alt="logo"
            src={logo}
            sx={{ width: "100px", height: "100px", mt: 2 }}
          />
          <Typography
            variant="h5"
            sx={{
              mt: 1,
              background: "linear-gradient(45deg, #004aad, #38b6ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 650,
            }}
          >
            Ayurva
          </Typography>
        </Box>
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar
          position="fixed"
          //   color="primary"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: `rgba(0, 0, 0, 0)`,
            boxShadow: "none",
            color: theme.palette.text.layoutSecondary,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" noWrap component="div">
              Dashboard
            </Typography>
            <Button
              endIcon={<LogoutIcon />}
              sx={{ ml: "auto", textTransform: "none" }}
              onClick={() => navigate("/login")}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
