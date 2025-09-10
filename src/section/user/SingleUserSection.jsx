import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Tab,
  Tabs,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Female,
  Male,
  LocationOn,
  Assignment,
  LocalShipping,
  Receipt,
  Home,
  Image as ImageIcon,
  Visibility,
} from "@mui/icons-material";
import { GetUserById } from "../../apis/user/User";
import LoadingSection from "../loading/LoadingSection";

// UserDetailPage Component
const SingleUserSection = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetUserById(id);
        setUserData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleClosePrescriptionDialog = () => {
    setSelectedPrescription(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "accepted":
        return "info";
      case "rejected":
        return "error";
      case "read":
        return "primary";
      default:
        return "default";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Tab panel component
  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-tabpanel-${index}`}
      aria-labelledby={`user-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );

  if (loading) {
    return <LoadingSection />;
  }

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* User Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              src={userData.user_profile_pic}
              sx={{
                width: 120,
                height: 120,
                border: `4px solid ${theme.palette.primary.main}`,
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", md: "flex-start" },
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                {userData.user_name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  mb: 2,
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <Chip
                  icon={<Person />}
                  label={`ID: ${userData.id}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={
                    userData.user_gender === "female" ? <Female /> : <Male />
                  }
                  label={`${userData.user_gender}, ${userData.user_age} years`}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={userData.user_active_status ? "Active" : "Inactive"}
                  color={userData.user_active_status ? "success" : "error"}
                  size="small"
                />
                <Chip
                  label={
                    userData.admin_approved ? "Approved" : "Pending Approval"
                  }
                  color={userData.admin_approved ? "success" : "warning"}
                  size="small"
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">{userData.user_email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {userData.user_contact}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Assignment sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    NIC: {userData.user_nic_no}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs Section */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          aria-label="user detail tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": { py: 2, minHeight: "auto" },
          }}
        >
          <Tab icon={<Assignment />} label="Prescriptions" />
          <Tab icon={<LocalShipping />} label="Orders" />
          <Tab icon={<Receipt />} label="Prescription Orders" />
          <Tab icon={<Home />} label="Addresses" />
        </Tabs>

        {/* Prescriptions Tab */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={2} sx={{ p: 2 }}>
            {userData.prescriptions.map((prescription) => (
              <Grid item xs={12} sm={6} md={4} key={prescription.pres_id}>
                <Card
                  elevation={2}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={prescription.pres_img_01}
                      alt="Prescription"
                    />
                    <Chip
                      label={prescription.pres_status}
                      color={getStatusColor(prescription.pres_status)}
                      size="small"
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    />
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Prescription #{prescription.pres_id}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Uploaded on {formatDate(prescription.pres_uploaded_date)}{" "}
                      at {prescription.pres_uploaded_time}
                    </Typography>
                    {prescription.pres_description && (
                      <Typography variant="body2" paragraph>
                        {prescription.pres_description}
                      </Typography>
                    )}
                  </CardContent>
                  <Box
                    sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => handleViewPrescription(prescription)}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Orders Tab */}
        <TabPanel value={activeTab} index={1}>
          <List>
            {userData.orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <LocalShipping color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Order #${order.order_id} - ${formatDate(
                      order.order_date
                    )}`}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" color="text.primary">
                          Quantity: {order.quantity} | Product ID:{" "}
                          {order.product_id}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            label={`Pharmacy: ${order.order_pharmacy_status}`}
                            color={getStatusColor(order.order_pharmacy_status)}
                            size="small"
                          />
                          <Chip
                            label={`Delivery: ${order.order_delivery_status}`}
                            color={getStatusColor(order.order_delivery_status)}
                            size="small"
                          />
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Prescription Orders Tab */}
        <TabPanel value={activeTab} index={2}>
          <List>
            {userData.prescriptionOrders.map((order) => (
              <React.Fragment key={order.order_id}>
                <ListItem alignItems="flex-start">
                  <ListItemIcon>
                    <Receipt color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Prescription Order #${order.order_id}`}
                    secondary={
                      <React.Fragment>
                        <Typography variant="body2" color="text.primary">
                          Date: {formatDate(order.order_date)} | Time:{" "}
                          {order.order_time}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          Prescription Detail ID: {order.prescription_detail_id}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                          <Chip
                            label={`Pharmacy: ${order.order_pharmacy_status}`}
                            color={getStatusColor(order.order_pharmacy_status)}
                            size="small"
                          />
                          <Chip
                            label={`Delivery: ${order.order_delivery_status}`}
                            color={getStatusColor(order.order_delivery_status)}
                            size="small"
                          />
                        </Box>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {/* Addresses Tab */}
        <TabPanel value={activeTab} index={3}>
          <Grid container spacing={2}>
            {userData.addresses.map((address) => (
              <Grid item xs={12} md={6} key={address.address_id}>
                <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <LocationOn color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      Address #{address.address_id}
                    </Typography>
                    {userData.selected_address_id === address.address_id && (
                      <Chip
                        label="Primary"
                        color="primary"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                  <Typography variant="body1" gutterBottom>
                    {address.address_l1}, {address.address_l2}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {address.address_l3}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    District: {address.address_district}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    ZIP Code: {address.address_zip_code}
                  </Typography>
                  {address.user_lat && address.user_lng && (
                    <Typography variant="caption" color="text.secondary">
                      Coordinates: {address.user_lat.toFixed(6)},{" "}
                      {address.user_lng.toFixed(6)}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>

      {/* Prescription Detail Dialog */}
      <Dialog
        open={!!selectedPrescription}
        onClose={handleClosePrescriptionDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedPrescription && (
          <>
            <DialogTitle>
              Prescription #{selectedPrescription.pres_id}
              <Chip
                label={selectedPrescription.pres_status}
                color={getStatusColor(selectedPrescription.pres_status)}
                size="small"
                sx={{ ml: 2 }}
              />
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Uploaded on{" "}
                {formatDate(selectedPrescription.pres_uploaded_date)} at{" "}
                {selectedPrescription.pres_uploaded_time}
              </Typography>

              {selectedPrescription.pres_description && (
                <Typography variant="body1" paragraph>
                  {selectedPrescription.pres_description}
                </Typography>
              )}

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Image 1
                  </Typography>
                  <img
                    src={selectedPrescription.pres_img_01}
                    alt="Prescription"
                    style={{ width: "100%", borderRadius: 4 }}
                  />
                </Grid>
                {selectedPrescription.pres_img_02 && (
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Image 2
                    </Typography>
                    <img
                      src={selectedPrescription.pres_img_02}
                      alt="Prescription"
                      style={{ width: "100%", borderRadius: 4 }}
                    />
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePrescriptionDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SingleUserSection;
