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
  ListItemAvatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import LoadingSection from "../loading/LoadingSection";
import {
  Business,
  Email,
  Assignment,
  Person,
  LocalShipping,
  Badge as BadgeIcon,
  CheckCircle,
  Cancel,
  Visibility,
  Phone,
  CreditCard,
} from "@mui/icons-material";
import { GetDeliveryOrgById } from "../../apis/deliveryOrg/DeliveryOrg";

// DeliveryOrganizationDetailPage Component
const SingleDelieryOrgSection = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [deliveryOrgData, setDeliveryOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Sample delivery organization data
  React.useEffect(() => {
    const fetchDeliveryOrgData = async () => {
      try {
        const response = await GetDeliveryOrgById(id);
        setDeliveryOrgData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching delivery organization data:", error);
        setLoading(false);
      }
    };

    fetchDeliveryOrgData();
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewDocument = (documentUrl) => {
    setSelectedDocument(documentUrl);
  };

  const handleCloseDocumentDialog = () => {
    setSelectedDocument(null);
  };

  const getStatusColor = (status) => {
    return status ? "success" : "error";
  };

  const getStatusText = (status) => {
    return status ? "Active" : "Inactive";
  };

  // Tab panel component
  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`delivery-org-tabpanel-${index}`}
      aria-labelledby={`delivery-org-tab-${index}`}
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
      {/* Delivery Organization Header Section */}
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
              <Business sx={{ fontSize: 60 }} />
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
                {deliveryOrgData.delivery_org_name}
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
                  icon={<Business />}
                  label={`ID: ${deliveryOrgData.id}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={<BadgeIcon />}
                  label={`Username: ${deliveryOrgData.user_name}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={getStatusText(
                    deliveryOrgData.delivery_org_active_status
                  )}
                  color={getStatusColor(
                    deliveryOrgData.delivery_org_active_status
                  )}
                  size="small"
                />
                <Chip
                  label={
                    deliveryOrgData.admin_approved
                      ? "Approved"
                      : "Pending Approval"
                  }
                  color={deliveryOrgData.admin_approved ? "success" : "warning"}
                  size="small"
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">Delivery Organization</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShipping sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {deliveryOrgData.deliverypersons?.length || 0} Delivery
                    Person(s)
                  </Typography>
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
              {deliveryOrgData.deliverypersons?.length || 0}
            </Typography>
            <Typography variant="body2">Total Delivery Persons</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="success.main">
              {deliveryOrgData.deliverypersons?.filter(
                (dp) => dp.delivery_person_active_status
              ).length || 0}
            </Typography>
            <Typography variant="body2">Active Delivery Persons</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="info.main">
              {deliveryOrgData.deliverypersons?.filter(
                (dp) => dp.admin_approved
              ).length || 0}
            </Typography>
            <Typography variant="body2">Approved Delivery Persons</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography
              variant="h4"
              color={
                deliveryOrgData.delivery_org_active_status
                  ? "success.main"
                  : "error.main"
              }
            >
              {deliveryOrgData.delivery_org_active_status
                ? "Active"
                : "Inactive"}
            </Typography>
            <Typography variant="body2">Organization Status</Typography>
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
          aria-label="delivery org detail tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": { py: 2, minHeight: "auto" },
          }}
        >
          <Tab icon={<Person />} label="Delivery Persons" />
          <Tab icon={<Assignment />} label="Documents" />
        </Tabs>

        {/* Delivery Persons Tab */}
        <TabPanel value={activeTab} index={0}>
          {deliveryOrgData.deliverypersons &&
          deliveryOrgData.deliverypersons.length > 0 ? (
            <Grid container spacing={2}>
              {deliveryOrgData.deliverypersons.map((deliveryPerson) => (
                <Grid item xs={12} md={6} key={deliveryPerson.id}>
                  <Card
                    elevation={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          src={deliveryPerson.delivery_person_img}
                          sx={{ width: 60, height: 60, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {deliveryPerson.delivery_person_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            @{deliveryPerson.delivery_person_user_name}
                          </Typography>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Chip
                          label={getStatusText(
                            deliveryPerson.delivery_person_active_status
                          )}
                          color={getStatusColor(
                            deliveryPerson.delivery_person_active_status
                          )}
                          size="small"
                        />
                        <Chip
                          label={
                            deliveryPerson.admin_approved
                              ? "Approved"
                              : "Pending Approval"
                          }
                          color={
                            deliveryPerson.admin_approved
                              ? "success"
                              : "warning"
                          }
                          size="small"
                        />
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <CreditCard
                          sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                        />
                        <Typography variant="body2">
                          NIC: {deliveryPerson.delivery_person_nic_no}
                        </Typography>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocalShipping
                          sx={{ mr: 1, color: "text.secondary", fontSize: 20 }}
                        />
                        <Typography variant="body2">
                          Delivery Person ID: {deliveryPerson.id}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Person sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                No delivery persons assigned yet
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Registration Document
                </Typography>
                {deliveryOrgData.delivery_org_register_document ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <img
                      src={deliveryOrgData.delivery_org_register_document}
                      alt="Registration Document"
                      style={{
                        width: "100%",
                        maxHeight: 400,
                        objectFit: "contain",
                        borderRadius: 4,
                      }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<Visibility />}
                      onClick={() =>
                        handleViewDocument(
                          deliveryOrgData.delivery_org_register_document
                        )
                      }
                    >
                      View Full Document
                    </Button>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No registration document available
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Document Detail Dialog */}
      <Dialog
        open={!!selectedDocument}
        onClose={handleCloseDocumentDialog}
        maxWidth="lg"
        fullWidth
      >
        {selectedDocument && (
          <>
            <DialogTitle>Registration Document</DialogTitle>
            <DialogContent>
              <img
                src={selectedDocument}
                alt="Registration Document"
                style={{ width: "100%", borderRadius: 4 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDocumentDialog}>Close</Button>
              <Button
                variant="contained"
                component="a"
                href={selectedDocument}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in New Tab
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default SingleDelieryOrgSection;
