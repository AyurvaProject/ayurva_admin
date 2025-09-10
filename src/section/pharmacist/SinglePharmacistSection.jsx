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
  Badge,
  Rating,
} from "@mui/material";
import {
  Person,
  Email,
  Phone,
  Assignment,
  LocalShipping,
  Receipt,
  Store,
  Image as ImageIcon,
  Visibility,
  Work,
  School,
  Badge as BadgeIcon,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { GetPharmacistById } from "../../apis/pharmacist/Pharmacist";
import LoadingSection from "../loading/LoadingSection";
// PharmacistDetailPage Component
const SinglePharmacistSection = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pharmacistData, setPharmacistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    const fetchPharmacistData = async () => {
      try {
        const pharmacist = await GetPharmacistById(id);
        setPharmacistData(pharmacist);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacist data:", error);
        setLoading(false);
      }
    };
    fetchPharmacistData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProductDialog = () => {
    setSelectedProduct(null);
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
      case "active":
        return "success";
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

  // Format price for display
  const formatPrice = (price) => {
    return `Rs. ${parseFloat(price).toFixed(2)}`;
  };

  // Tab panel component
  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pharmacist-tabpanel-${index}`}
      aria-labelledby={`pharmacist-tab-${index}`}
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
      {/* Pharmacist Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                border: `4px solid ${theme.palette.primary.main}`,
                bgcolor: theme.palette.primary.main,
              }}
            >
              <Work sx={{ fontSize: 60 }} />
            </Avatar>
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
                {pharmacistData.pharmacist_name}
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
                  label={`ID: ${pharmacistData.id}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={<BadgeIcon />}
                  label={`Username: ${pharmacistData.user_name}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={
                    pharmacistData.user_active_status ? "Active" : "Inactive"
                  }
                  color={
                    pharmacistData.user_active_status ? "success" : "error"
                  }
                  size="small"
                />
                <Chip
                  label={
                    pharmacistData.admin_approved
                      ? "Approved"
                      : "Pending Approval"
                  }
                  color={pharmacistData.admin_approved ? "success" : "warning"}
                  size="small"
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {pharmacistData.pharmacist_email}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {pharmacistData.pharmacist_contact_no}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Assignment sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">Pharmacist</Typography>
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
          aria-label="pharmacist detail tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": { py: 2, minHeight: "auto" },
          }}
        >
          <Tab icon={<Store />} label="Pharmacy" />
          <Tab icon={<Assignment />} label="Products" />
          <Tab icon={<LocalShipping />} label="Orders" />
          <Tab icon={<Receipt />} label="Prescription Orders" />
          <Tab icon={<School />} label="Documents" />
        </Tabs>

        {/* Pharmacy Tab */}
        <TabPanel value={activeTab} index={0}>
          {pharmacistData.pharmacy && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h5" gutterBottom>
                    Pharmacy Information
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Store color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">
                      {pharmacistData.pharmacy.pharmacy_name}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      {pharmacistData.pharmacy.pharmacy_address_l1},{" "}
                      {pharmacistData.pharmacy.pharmacy_address_l2}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {pharmacistData.pharmacy.pharmacy_address_l3}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      District: {pharmacistData.pharmacy.pharmacy_district}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Registration No:{" "}
                      {pharmacistData.pharmacy.pharmacy_registration_no}
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Email sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2">
                        {pharmacistData.pharmacy.pharmacy_email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Phone sx={{ mr: 1, color: "text.secondary" }} />
                      <Typography variant="body2">
                        {pharmacistData.pharmacy.pharmacy_contact_01}
                        {pharmacistData.pharmacy.pharmacy_contact_02 &&
                          `, ${pharmacistData.pharmacy.pharmacy_contact_02}`}
                      </Typography>
                    </Box>
                  </Box>

                  {pharmacistData.pharmacy.pharmacy_description && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {pharmacistData.pharmacy.pharmacy_description}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
                  <Typography variant="h6" gutterBottom>
                    Pharmacy Images
                  </Typography>
                  <Grid container spacing={2}>
                    {pharmacistData.pharmacy.pharmacy_img_01 && (
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={pharmacistData.pharmacy.pharmacy_img_01}
                            alt="Pharmacy"
                          />
                        </Card>
                      </Grid>
                    )}
                    {pharmacistData.pharmacy.pharmacy_img_02 && (
                      <Grid item xs={12} md={6}>
                        <Card>
                          <CardMedia
                            component="img"
                            height="140"
                            image={pharmacistData.pharmacy.pharmacy_img_02}
                            alt="Pharmacy"
                          />
                        </Card>
                      </Grid>
                    )}
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          )}
        </TabPanel>

        {/* Products Tab */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={2}>
            {pharmacistData.products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.product_id}>
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
                      image={
                        typeof product.product_img1 === "string"
                          ? product.product_img1
                          : JSON.parse(product.product_img1)[0]
                      }
                      alt={product.product_name}
                    />
                    <Chip
                      label={product.product_active_status}
                      color={getStatusColor(product.product_active_status)}
                      size="small"
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    />
                    {product.prescription_is_needed && (
                      <Chip
                        label="Prescription Required"
                        color="warning"
                        size="small"
                        sx={{ position: "absolute", top: 8, left: 8 }}
                      />
                    )}
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.product_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Category: {product.product_category}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Quantity: {product.product_quantity} | License:{" "}
                      {product.product_license_no}
                    </Typography>
                    <Typography variant="h6" color="primary" gutterBottom>
                      {formatPrice(product.product_price)}
                    </Typography>
                    {product.product_description && (
                      <Typography
                        variant="body2"
                        paragraph
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.product_description}
                      </Typography>
                    )}
                  </CardContent>
                  <Box
                    sx={{ p: 1, display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => handleViewProduct(product)}
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
        <TabPanel value={activeTab} index={2}>
          <List>
            {pharmacistData.orders.map((order) => (
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
        <TabPanel value={activeTab} index={3}>
          <List>
            {pharmacistData.prescriptionOrders.map((order) => (
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

        {/* Documents Tab */}
        <TabPanel value={activeTab} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Identification Documents
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {pharmacistData.pharmacist_nic_front && (
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        NIC Front Side
                      </Typography>
                      <img
                        src={pharmacistData.pharmacist_nic_front}
                        alt="NIC Front"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                  )}
                  {pharmacistData.pharmacist_nic_back && (
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        NIC Back Side
                      </Typography>
                      <img
                        src={pharmacistData.pharmacist_nic_back}
                        alt="NIC Back"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          borderRadius: 4,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Qualification Document
                </Typography>
                {pharmacistData.pharmacist_qualification_document && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <img
                      src="/pdf-icon.png"
                      alt="Qualification Document"
                      style={{ width: 100, height: 100, opacity: 0.7 }}
                    />
                    <Button
                      variant="contained"
                      component="a"
                      href={pharmacistData.pharmacist_qualification_document}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Qualification Document
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Product Detail Dialog */}
      <Dialog
        open={!!selectedProduct}
        onClose={handleCloseProductDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <DialogTitle>
              {selectedProduct.product_name}
              <Chip
                label={selectedProduct.product_active_status}
                color={getStatusColor(selectedProduct.product_active_status)}
                size="small"
                sx={{ ml: 2 }}
              />
              {selectedProduct.prescription_is_needed && (
                <Chip
                  label="Prescription Required"
                  color="warning"
                  size="small"
                  sx={{ ml: 1 }}
                />
              )}
            </DialogTitle>
            <DialogContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Category: {selectedProduct.product_category}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                License: {selectedProduct.product_license_no}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                {formatPrice(selectedProduct.product_price)}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Quantity: {selectedProduct.product_quantity} | Manufacturer:{" "}
                {selectedProduct.product_owner}
              </Typography>

              {selectedProduct.product_description && (
                <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                  {selectedProduct.product_description}
                </Typography>
              )}

              <Typography variant="h6" sx={{ mt: 2 }}>
                Product Images
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  selectedProduct.product_img1,
                  selectedProduct.product_img2,
                  selectedProduct.product_img3,
                ].map(
                  (img, index) =>
                    img && (
                      <Grid item xs={12} md={4} key={index}>
                        <img
                          src={
                            typeof img === "string" ? img : JSON.parse(img)[0]
                          }
                          alt={`Product ${index + 1}`}
                          style={{ width: "100%", borderRadius: 4 }}
                        />
                      </Grid>
                    )
                )}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseProductDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SinglePharmacistSection;
