import { useState, useEffect } from "react";
import {
  GetAllDeliveryPersons,
  ApproveDeliveryPerson,
} from "../../apis/deliveryPerson/DeliveryPerson";
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
import LoadingSection from "../loading/LoadingSection";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { useNavigate } from "react-router-dom";

const DeliveryPersonListSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [persons, setPersons] = useState([]);
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

    GetAllDeliveryPersons().then((res) => {
      setPersons(res);
      setLoading(false);
    });
  }, []);

  const handleApproveStatusChange = async (userId, newStatus) => {
    setChanging(true);
    try {
      await ApproveDeliveryPerson(userId, newStatus);
      showSnackbar(
        "success",
        false,
        "Delivery person status updated successfully"
      );
      setChanging(false);
    } catch (error) {
      showSnackbar("error", false, "Failed to update delivery person status");
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
    { field: "name", headerName: "Name", flex: 0.7 },
    { field: "nic_no", headerName: "NIC", flex: 0.4 },
    {
      field: "active",
      headerName: "Active",
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
          {/* <IconButton
            size="small"
            color="primary"
            onClick={() => navigate(`/delivery-person/${params.row.id}`)}
          >
            <VisibilityIcon />
          </IconButton> */}
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

  const rows = persons.map((user) => ({
    id: user.id,
    user_name: user.delivery_person_user_name,
    image: user.delivery_person_img,
    name: user.delivery_person_name,
    nic_no: user.delivery_person_nic_no,
    active: user.delivery_person_active_status,
    adminApproved: user.admin_approved,
  }));

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
          Delivery Person List
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

export default DeliveryPersonListSection;
