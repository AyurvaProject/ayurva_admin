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
  Email,
  Phone,
  Assignment,
  LocationOn,
  ExpandMore,
  Visibility,
  Description,
  Badge as BadgeIcon,
  CheckCircle,
  Cancel,
  WorkHistory,
} from "@mui/icons-material";
import { GetPrById } from "../../apis/prescriptionReader/PrescriptionReader";
import LoadingSection from "../loading/LoadingSection";

// PrescriptionReaderDetailPage Component
const SinglePrSection = ({ id }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [prData, setPrData] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    const fetchPrData = async () => {
      setLoading(true);
      try {
        const data = await GetPrById(id);
        setPrData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescription reader data:", error);
        setLoading(false);
      }
    };
    fetchPrData();
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
      case "read":
        return "success";
      case "pending":
        return "warning";
      case "completed":
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

  // Count prescriptions by status
  const countPrescriptionsByStatus = () => {
    const counts = {
      total: prData?.prescriptions?.length,
      read: prData?.prescriptions?.filter((p) => p.pres_status === "read")
        .length,
      pending: prData?.prescriptions?.filter((p) => p.pres_status === "pending")
        ?.length,
      active: prData?.prescriptions?.filter((p) => p.pres_active_status)
        ?.length,
    };
    return counts;
  };

  const prescriptionCounts = countPrescriptionsByStatus();

  // Tab panel component
  const TabPanel = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`pr-tabpanel-${index}`}
      aria-labelledby={`pr-tab-${index}`}
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
      {/* Prescription Reader Header Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              src={prData.pr_profile_pic}
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
                {prData.pr_name}
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
                  label={`ID: ${prData.id}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  icon={<BadgeIcon />}
                  label={`Username: ${prData.user_name}`}
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={prData.pr_active_status ? "Active" : "Inactive"}
                  color={prData.pr_active_status ? "success" : "error"}
                  size="small"
                />
                <Chip
                  label={
                    prData.admin_approved ? "Approved" : "Pending Approval"
                  }
                  color={prData.admin_approved ? "success" : "warning"}
                  size="small"
                />
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">{prData.pr_email}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Phone sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {prData.pr_contact_no}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocationOn sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body1">
                    {prData.pr_address_l1}, {prData.pr_address_l2}
                    {prData.pr_addres_l3 && `, ${prData.pr_addres_l3}`}
                    {`, ${prData.pr_district}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bio Section */}
        {prData.pr_bio && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {prData.pr_bio}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Stats Section */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="primary">
              {prescriptionCounts.total}
            </Typography>
            <Typography variant="body2">Total Prescriptions</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="success.main">
              {prescriptionCounts.read}
            </Typography>
            <Typography variant="body2">Read Prescriptions</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="warning.main">
              {prescriptionCounts.pending}
            </Typography>
            <Typography variant="body2">Pending Prescriptions</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h4" color="info.main">
              {prescriptionCounts.active}
            </Typography>
            <Typography variant="body2">Active Prescriptions</Typography>
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
          aria-label="pr detail tabs"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": { py: 2, minHeight: "auto" },
          }}
        >
          <Tab icon={<Assignment />} label="Prescriptions" />
          <Tab icon={<Description />} label="Documents" />
        </Tabs>

        {/* Prescriptions Tab */}
        <TabPanel value={activeTab} index={0}>
          {prData.prescriptions.length > 0 ? (
            <Box>
              {prData.prescriptions.map((prescription) => (
                <Accordion key={prescription.pres_id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Prescription #{prescription.pres_id}
                      </Typography>
                      <Chip
                        label={prescription.pres_status}
                        color={getStatusColor(prescription.pres_status)}
                        size="small"
                        sx={{ mr: 2 }}
                      />
                      <Chip
                        label={
                          prescription.pres_active_status
                            ? "Active"
                            : "Inactive"
                        }
                        color={
                          prescription.pres_active_status
                            ? "success"
                            : "default"
                        }
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
                          Uploaded on{" "}
                          {formatDate(prescription.pres_uploaded_date)} at{" "}
                          {prescription.pres_uploaded_time}
                        </Typography>
                        {prescription.pres_description && (
                          <Typography variant="body1" paragraph>
                            Description: {prescription.pres_description}
                          </Typography>
                        )}
                        <Button
                          variant="outlined"
                          startIcon={<Visibility />}
                          onClick={() => handleViewPrescription(prescription)}
                          sx={{ mt: 1 }}
                        >
                          View Prescription
                        </Button>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <Card>
                              <CardMedia
                                component="img"
                                height="120"
                                image={prescription.pres_img_01}
                                alt="Prescription front"
                                sx={{ objectFit: "contain" }}
                              />
                            </Card>
                          </Grid>
                          {prescription.pres_img_02 && (
                            <Grid item xs={6}>
                              <Card>
                                <CardMedia
                                  component="img"
                                  height="120"
                                  image={prescription.pres_img_02}
                                  alt="Prescription back"
                                  sx={{ objectFit: "contain" }}
                                />
                              </Card>
                            </Grid>
                          )}
                        </Grid>
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
                No prescriptions assigned yet
              </Typography>
            </Box>
          )}
        </TabPanel>

        {/* Documents Tab */}
        <TabPanel value={activeTab} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Identification Documents
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {prData.pr_nic_front && (
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        NIC Front Side
                      </Typography>
                      <img
                        src={prData.pr_nic_front}
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
                  {prData.pr_nic_back && (
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        NIC Back Side
                      </Typography>
                      <img
                        src={prData.pr_nic_back}
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
                {prData.qualification_doc && (
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
                      href={prData.qualification_doc}
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
              <Chip
                label={
                  selectedPrescription.pres_active_status
                    ? "Active"
                    : "Inactive"
                }
                color={
                  selectedPrescription.pres_active_status
                    ? "success"
                    : "default"
                }
                size="small"
                sx={{ ml: 1 }}
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

              <Typography variant="h6" sx={{ mt: 2 }}>
                Prescription Images
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" gutterBottom>
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
                    <Typography variant="body2" gutterBottom>
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

export default SinglePrSection;
