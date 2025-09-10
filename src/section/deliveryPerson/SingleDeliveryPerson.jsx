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
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Person,
  LocalShipping,
  Assignment,
  CheckCircle,
  Pending,
  Email,
  Phone,
  Badge as BadgeIcon,
  ExpandMore,
  Visibility,
  Business,
  LocationOn,
} from "@mui/icons-material";
import LoadingSection from "../loading/LoadingSection";
import { GetDeliveryPersonById } from "../../apis/deliveryPerson/DeliveryPerson";

// DeliveryPersonDetailPage Component
const DeliveryPersonDetailSection = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deliveryPersonData, setDeliveryPersonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    setLoading(true);
    GetDeliveryPersonById(id).then((response) => {
      setDeliveryPersonData(response);
      setLoading(false);
    });
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDialog = () => {
    setSelectedOrder(null);
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

  // Calculate delivery performance metrics - FIXED VERSION
  const calculatePerformance = () => {
    // Safely handle potentially undefined arrays
    const orders = deliveryPersonData.orders || [];
    const prescriptionOrders = deliveryPersonData.prescriptionOrders || [];

    const allOrders = [...orders, ...prescriptionOrders];
    const completedOrders = allOrders.filter(
      (order) => order.order_delivery_status === "completed"
    ).length;

    const pendingOrders = allOrders.filter(
      (order) => order.order_delivery_status === "pending"
    ).length;

    const totalOrders = allOrders.length;
    const completionRate =
      totalOrders > 0 ? Math.round((completedOrders / totalOrders) * 100) : 0;

    return {
      totalOrders,
      completedOrders,
      pendingOrders,
      completionRate,
    };
  };

  const performance = calculatePerformance();

  // Tab panel component
  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`delivery-person-tabpanel-${index}`}
      aria-labelledby={`delivery-person-tab-${index}`}
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
      {/* Delivery Person Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              src={deliveryPersonData.delivery_person_img}
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
                {deliveryPersonData.delivery_person_name}
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
                  label={`ID: ${deliveryPersonData.id}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={<BadgeIcon />}
                  label={`Username: ${deliveryPersonData.delivery_person_user_name}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={
                    deliveryPersonData.delivery_person_active_status
                      ? "Active"
                      : "Inactive"
                  }
                  color={
                    deliveryPersonData.delivery_person_active_status
                      ? "success"
                      : "error"
                  }
                  size="small"
                />
                <Chip
                  label={
                    deliveryPersonData.admin_approved
                      ? "Approved"
                      : "Pending Approval"
                  }
                  color={
                    deliveryPersonData.admin_approved ? "success" : "warning"
                  }
                  size="small"
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <BadgeIcon sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    NIC: {deliveryPersonData.delivery_person_nic_no}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Business sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    Organization ID: {deliveryPersonData.delivery_org_id}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShipping sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">Delivery Person</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {performance.totalOrders}
            </Typography>
            <Typography variant="body2">Total Orders</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="success.main">
              {performance.completedOrders}
            </Typography>
            <Typography variant="body2">Completed Orders</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="warning.main">
              {performance.pendingOrders}
            </Typography>
            <Typography variant="body2">Pending Orders</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="info.main">
              {performance.completionRate}%
            </Typography>
            <Typography variant="body2">Completion Rate</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          aria-label="delivery person detail tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": { py: 2, minHeight: "auto" },
          }}
        >
          <Tab icon={<LocalShipping />} label="Regular Orders" />
          <Tab icon={<Assignment />} label="Prescription Orders" />
        </Tabs>

        {/* Regular Orders Tab */}
        <TabPanel value={activeTab} index={0}>
          {deliveryPersonData.orders && deliveryPersonData.orders.length > 0 ? (
            <Box>
              {deliveryPersonData.orders.map((order) => (
                <Accordion key={order.order_id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Order #{order.order_id}
                      </Typography>
                      <Chip
                        label={`Pharmacy: ${order.order_pharmacy_status}`}
                        color={getStatusColor(order.order_pharmacy_status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={`Delivery: ${order.order_delivery_status}`}
                        color={getStatusColor(order.order_delivery_status)}
                        size="small"
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Date: {formatDate(order.order_date)} at{" "}
                          {order.order_time}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Quantity: {order.quantity} | Product ID:{" "}
                          {order.product_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          User ID: {order.user_id} | Pharmacy ID:{" "}
                          {order.pharmacist_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Address ID: {order.address_id}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => handleViewOrder(order)}
                        >
                          View Order Details
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <LocalShipping
                sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary">
                No regular orders assigned yet
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Prescription Orders Tab */}
        <TabPanel value={activeTab} index={1}>
          {deliveryPersonData.prescriptionOrders &&
          deliveryPersonData.prescriptionOrders.length > 0 ? (
            <Box>
              {deliveryPersonData.prescriptionOrders.map((order) => (
                <Accordion key={order.order_id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Prescription Order #{order.order_id}
                      </Typography>
                      <Chip
                        label={`Pharmacy: ${order.order_pharmacy_status}`}
                        color={getStatusColor(order.order_pharmacy_status)}
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label={`Delivery: ${order.order_delivery_status}`}
                        color={getStatusColor(order.order_delivery_status)}
                        size="small"
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Date: {formatDate(order.order_date)} at{" "}
                          {order.order_time}
                        </Typography>
                        <Typography variant="body1" paragraph>
                          Prescription Detail ID: {order.prescription_detail_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          User ID: {order.user_id} | Pharmacy ID:{" "}
                          {order.pharmacist_id}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Address ID: {order.address_id}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => handleViewOrder(order)}
                        >
                          View Order Details
                        </Button>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Assignment
                sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
              />
              <Typography variant="h6" color="text.secondary">
                No prescription orders assigned yet
              </Typography>
            </Box>
          )}
        </TabPanel>
      </Paper>

      {/* Order Detail Dialog */}
      <Dialog
        open={!!selectedOrder}
        onClose={handleCloseOrderDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedOrder && (
          <>
            <DialogTitle>
              {selectedOrder.product_id
                ? `Regular Order #${selectedOrder.order_id}`
                : `Prescription Order #${selectedOrder.order_id}`}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Date: {formatDate(selectedOrder.order_date)} at{" "}
                {selectedOrder.order_time}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Chip
                  label={`Pharmacy: ${selectedOrder.order_pharmacy_status}`}
                  color={getStatusColor(selectedOrder.order_pharmacy_status)}
                  size="small"
                />
                <Chip
                  label={`Delivery: ${selectedOrder.order_delivery_status}`}
                  color={getStatusColor(selectedOrder.order_delivery_status)}
                  size="small"
                />
              </Box>

              {selectedOrder.product_id && (
                <Typography variant="body1" paragraph>
                  Quantity: {selectedOrder.quantity} | Product ID:{" "}
                  {selectedOrder.product_id}
                </Typography>
              )}

              {selectedOrder.prescription_detail_id && (
                <Typography variant="body1" paragraph>
                  Prescription Detail ID: {selectedOrder.prescription_detail_id}
                </Typography>
              )}

              <Typography variant="body2" color="text.secondary">
                User ID: {selectedOrder.user_id} | Pharmacy ID:{" "}
                {selectedOrder.pharmacist_id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address ID: {selectedOrder.address_id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Delivery Person ID: {selectedOrder.delivery_person_id}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseOrderDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default DeliveryPersonDetailSection;
