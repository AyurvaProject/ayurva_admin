import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import { useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleIcon from "@mui/icons-material/People";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import logo from "../../assets/img/logo.png";
import { GetCurrentUser } from "../../apis/auth/Auth";
import { useAuth } from "../../context/AuthContext";

const drawerWidth = 280;

const Layout = () => {
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();

  const getUser = async () => {
    const fetchedUser = await GetCurrentUser();
    setUser(fetchedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <SpaceDashboardIcon />, path: "/" },
    { text: "Users", icon: <PeopleIcon />, path: "/users" },
    { text: "Prescription Readers", icon: <PersonIcon />, path: "/prs" },
    { text: "Pharmacists", icon: <LocalPharmacyIcon />, path: "/pharmacists" },
    {
      text: "Delivery Organizations",
      icon: <LocalShippingIcon />,
      path: "/delivery-orgs",
    },
    {
      text: "Delivery Persons",
      icon: <PersonIcon />,
      path: "/delivery-persons",
    },
    { text: "Pharmacies", icon: <StorefrontIcon />, path: "/pharmacies" },
    // { text: "Services", icon: <MedicalServicesIcon />, path: "/services" },
  ];

  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 2,
        }}
      >
        <Avatar alt="logo" src={logo} sx={{ width: 80, height: 80, mb: 1 }} />
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #000000, #434343)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Ayurva
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{
                color: "black",
                borderRadius: 2,
                transition: "background-color 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "white",
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minWidth: "100%" }}>
      <CssBaseline />

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#f9f9f9",
            color: "black",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: "80%",
          maxWidth: "100%",
        }}
      >
        {/* Top AppBar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            bgcolor: "white",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                background: "linear-gradient(45deg, #000000, #434343)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 600,
              }}
            >
              Admin Dashboard
            </Typography>

            <Button
              variant="outlined"
              color="inherit"
              endIcon={<LogoutIcon />}
              sx={{
                ml: "auto",
                textTransform: "none",
                borderColor: "#000",
                "&:hover": { bgcolor: "#000", color: "#fff" },
              }}
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 8,
            minWidth: "100%",
            bgcolor: "#fafafa",
          }}
        >
          <Outlet style={{ maxWidth: "100%" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
