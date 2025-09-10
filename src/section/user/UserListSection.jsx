import { useState, useEffect } from "react";
import { GetAllUsers, ChangeUserApproveStatus } from "../../apis/user/User";
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

const UserListSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [status, setStatus] = useState("pending");
  const [changing, setChanging] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

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
    setLoading(true);

    GetAllUsers().then((res) => {
      setUsers(res);
      setLoading(false);
    });
  }, []);

  const handleApproveStatusChange = async (userId, newStatus) => {
    setChanging(true);
    try {
      await ChangeUserApproveStatus(userId, newStatus);
      showSnackbar("success", false, "User status updated successfully");
      setChanging(false);
    } catch (error) {
      showSnackbar("error", false, "Failed to update user status");
    } finally {
      setChanging(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "user_name", headerName: "User Name", flex: 0.4 },
    {
      field: "image",
      headerName: "Image",
      flex: 0.3,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="image"
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
          }}
        />
      ),
    },
    { field: "user_email", headerName: "Email", flex: 0.7 },
    { field: "user_contact", headerName: "Contact", flex: 0.4 },
    { field: "user_nic_no", headerName: "NIC", flex: 0.4 },
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
            onClick={() => navigate(`/user/${params.row.id}`)}
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

  const rows = users.map((user) => ({
    id: user.id,
    user_name: user.user_name,
    image: user.user_profile_pic,
    user_email: user.user_email,
    user_contact: user.user_contact,
    user_nic_no: user.user_nic_no,
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
          User List
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

export default UserListSection;
