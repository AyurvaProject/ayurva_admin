import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import { GetAllProducts } from "../apis/product/Product";
import { GetAllUsers } from "../apis/user/User";
import { GetAllDeliveryOrgs } from "../apis/deliveryOrg/DeliveryOrg";
import { GetAllDeliveryPersons } from "../apis/deliveryPerson/DeliveryPerson";
import { GetAllPrs } from "../apis/prescriptionReader/PrescriptionReader";
import { GetAllPharmacies } from "../apis/pharmacy/Pharmacy";
import {
  ShoppingCart,
  People,
  LocalPharmacy,
  LocalShipping,
  DeliveryDining,
  AssignmentInd,
} from "@mui/icons-material";

const AdminDashboard = () => {
  // Stats state
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    pharmacies: 0,
    deliveryOrgs: 0,
    deliveryPersons: 0,
    prescriptionReaders: 0,
  });

  // Individual loading states
  const [loading, setLoading] = useState({
    products: true,
    users: true,
    pharmacies: true,
    deliveryOrgs: true,
    deliveryPersons: true,
    prescriptionReaders: true,
  });

  // Random number states for animation
  const [randomStats, setRandomStats] = useState({
    products: 0,
    users: 0,
    pharmacies: 0,
    deliveryOrgs: 0,
    deliveryPersons: 0,
    prescriptionReaders: 0,
  });

  // Function to animate a stat
  const animateStat = (key, target) => {
    const interval = setInterval(() => {
      setRandomStats((prev) => ({
        ...prev,
        [key]: Math.floor(Math.random() * (target + 50)),
      }));
    }, 80);

    return interval;
  };

  useEffect(() => {
    // Products
    const productsInterval = animateStat("products", 200);
    GetAllProducts().then((res) => {
      clearInterval(productsInterval);
      setStats((prev) => ({ ...prev, products: res.length }));
      setLoading((prev) => ({ ...prev, products: false }));
    });

    // Users
    const usersInterval = animateStat("users", 500);
    GetAllUsers().then((res) => {
      clearInterval(usersInterval);
      setStats((prev) => ({ ...prev, users: res.length }));
      setLoading((prev) => ({ ...prev, users: false }));
    });

    // Pharmacies
    const pharmaciesInterval = animateStat("pharmacies", 50);
    GetAllPharmacies().then((res) => {
      clearInterval(pharmaciesInterval);
      setStats((prev) => ({ ...prev, pharmacies: res.length }));
      setLoading((prev) => ({ ...prev, pharmacies: false }));
    });

    // Delivery Orgs
    const deliveryOrgsInterval = animateStat("deliveryOrgs", 20);
    GetAllDeliveryOrgs().then((res) => {
      clearInterval(deliveryOrgsInterval);
      setStats((prev) => ({ ...prev, deliveryOrgs: res.length }));
      setLoading((prev) => ({ ...prev, deliveryOrgs: false }));
    });

    // Delivery Persons
    const deliveryPersonsInterval = animateStat("deliveryPersons", 100);
    GetAllDeliveryPersons().then((res) => {
      clearInterval(deliveryPersonsInterval);
      setStats((prev) => ({ ...prev, deliveryPersons: res.length }));
      setLoading((prev) => ({ ...prev, deliveryPersons: false }));
    });

    // Prescription Readers
    const prsInterval = animateStat("prescriptionReaders", 30);
    GetAllPrs().then((res) => {
      clearInterval(prsInterval);
      setStats((prev) => ({ ...prev, prescriptionReaders: res.length }));
      setLoading((prev) => ({ ...prev, prescriptionReaders: false }));
    });
  }, []);

  const cards = [
    {
      title: "Products",
      key: "products",
      icon: <ShoppingCart fontSize="large" />,
    },
    { title: "Users", key: "users", icon: <People fontSize="large" /> },
    {
      title: "Pharmacies",
      key: "pharmacies",
      icon: <LocalPharmacy fontSize="large" />,
    },
    {
      title: "Delivery Orgs",
      key: "deliveryOrgs",
      icon: <LocalShipping fontSize="large" />,
    },
    {
      title: "Delivery Persons",
      key: "deliveryPersons",
      icon: <DeliveryDining fontSize="large" />,
    },
    {
      title: "Prescription Readers",
      key: "prescriptionReaders",
      icon: <AssignmentInd fontSize="large" />,
    },
  ];

  return (
    <Box
      sx={{ backgroundColor: "#fff", minHeight: "100vh", p: 3, color: "#000" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
        textAlign="center"
        sx={{ letterSpacing: 1 }}
      >
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                backgroundColor: "#121212",
                color: "#fff",
                borderRadius: "20px",
                boxShadow: "0px 4px 15px rgba(255,255,255,0.05)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0px 8px 25px rgba(255,255,255,0.15)",
                },
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      {card.title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" mt={1}>
                      {loading[card.key]
                        ? randomStats[card.key]
                        : stats[card.key]}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#1e1e1e",
                      borderRadius: "50%",
                      p: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
