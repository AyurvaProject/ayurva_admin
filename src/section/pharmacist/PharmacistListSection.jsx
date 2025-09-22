import { useState, useEffect } from "react";
// import { GetAllUsers, ChangeUserApproveStatus } from "../../apis/user/User";
import {
  GetAllPharmacists,
  ApprovePharmacst,
} from "../../apis/pharmacist/Pharmacist";
import DataGridComponent from "../../components/datagrid/DataGrid";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Tabs,
  Tab,
  Chip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { useNavigate } from "react-router-dom";
import LoadingSection from "../loading/LoadingSection";

const PharmacistListSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changing, setChanging] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
  });

  const showSnackbar = (severity, loading = false, message) => {
    setSnackbar({
      open: true,
      message: loading ? "Processing..." : message,
      severity,
      loading,
    });

    if (!loading) {
      setTimeout(() => setSnackbar({ ...snackbar, open: false }), 3000);
    }
  };

  useEffect(() => {
    fetchPharmacists();
  }, []);

  const fetchPharmacists = () => {
    setLoading(true);
    GetAllPharmacists().then((res) => {
      setPharmacists(res);
      setLoading(false);
    });
  };

  const handleApproveStatusChange = async (pahramacistId, newStatus) => {
    setChanging(true);
    try {
      await ApprovePharmacst(pahramacistId, newStatus);
      showSnackbar("success", false, "Pharmacist status updated successfully");
      setChanging(false);
      fetchPharmacists();
    } catch (error) {
      showSnackbar("error", false, "Failed to update pharmacist status");
    } finally {
      setChanging(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "user_name", headerName: "User Name", flex: 0.4 },
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "contact", headerName: "Contact", flex: 0.4 },
    {
      field: "emailVerified",
      headerName: "Email Verified",
      flex: 0.4,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Yes" : "No"}
          color={params.value ? "success" : "error"}
          variant="filled"
          size="small"
        />
      ),
    },
    {
      field: "adminApproved",
      headerName: "Admin Approved",
      flex: 0.3,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Yes" : "No"}
          color={params.value ? "success" : "error"}
          variant="filled"
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={1}
          alignItems={"center"}
          sx={{ alignItems: "center", my: 1 }}
        >
          <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/pharmacist/${params.row.id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          {!params.row.adminApproved && (
            <IconButton
              size="small"
              color="success"
              onClick={() => handleApproveStatusChange(params.row.id, true)}
              disabled={changing}
            >
              <DoneIcon />
            </IconButton>
          )}

          {params.row.adminApproved && (
            <IconButton
              size="small"
              color="error"
              onClick={() => handleApproveStatusChange(params.row.id, false)}
              disabled={changing || !params.row.adminApproved}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Stack>
      ),
    },
  ];

  const rows = pharmacists.map((user) => ({
    id: user.id,
    user_name: user.user_name,
    name: user.pharmacist_name,
    email: user.pharmacist_email,
    contact: user.pharmacist_contact_no,
    emailVerified: user.user_active_status,
    adminApproved: user.admin_approved,
  }));

  console.log("Orders Rows", rows);

  if (loading) {
    return <LoadingSection />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Pharmacist List
        </Typography>
      </Box>
      <DataGridComponent rows={rows} columns={columns} />
      <CustomSnackbar
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
        loading={snackbar.loading}
      />
    </Box>
  );
};

export default PharmacistListSection;
