import { useState, useEffect } from "react";
import {
  GetAllPharmacies,
  GetPharmacyById,
} from "../../apis/pharmacy/Pharmacy";
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

const PharmacyListSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pharmacies, setPharmacies] = useState([]);
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
    setLoading(true);

    GetAllPharmacies().then((res) => {
      setPharmacies(res);
      setLoading(false);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
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
            height: 50,
            objectFit: "cover",
          }}
        />
      ),
    },
    { field: "name", headerName: "Name", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "contact", headerName: "Contact", flex: 0.4 },
    { field: "address", headerName: "Address", flex: 0.4 },
    { field: "district", headerName: "District", flex: 0.4 },
  ];

  const rows = pharmacies.map((user) => ({
    id: user.pharmacy_id,
    image: user.pharmacy_img_01,
    name: user.pharmacy_name,
    email: user.pharmacy_email,
    contact: user.pharmacy_contact_01,
    address: `${user.pharmacy_address_l1}, ${user.pharmacy_address_l2}, ${user.pharmacy_address_l3}`,
    district: user.pharmacy_district,
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
          Pharmacy List
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

export default PharmacyListSection;
