import { signInSchema } from "../../validation/signInFormValidation/SignInFormValidation";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  FormHelperText,
  Typography,
  FilledInput,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../components/snackbar/CustomSnackbar";
import { useAuth } from "../../context/AuthContext";
import { GetCurrentUser } from "../../apis/auth/Auth";

const SignInFormSection = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      role: "ayurvaadmin",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await login(data.user_name, data.password);
      await GetCurrentUser();
      navigate("/");
    } catch (error) {
      showSnackbar(
        "error",
        false,
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f0f0f0, #dcdcdc)", // subtle black/white gradient
        p: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Header with Logo */}
        <Box sx={{ textAlign: "center", mb: 1 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Admin Logo"
            sx={{
              width: 70,
              height: 70,
              mb: 1,
            }}
          />
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              background: "linear-gradient(45deg, #000000, #434343)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Login
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.9rem" }}
          >
            Access your dashboard to manage the platform
          </Typography>
        </Box>

        {/* Username Field */}
        <TextField
          label="Username"
          variant="filled"
          fullWidth
          {...register("user_name")}
          error={!!errors.user_name}
          helperText={errors.user_name?.message}
          size="small"
          sx={{
            "& .MuiFilledInput-root": {
              borderRadius: 2,
              backgroundColor: "#F8F8F8",
              "&:hover": { backgroundColor: "#F0F0F0" },
              "&:before, &:after": { borderBottom: "none" },
            },
          }}
        />

        {/* Password Field */}
        <FormControl
          variant="filled"
          fullWidth
          error={!!errors.password}
          size="small"
          sx={{
            "& .MuiFilledInput-root": {
              borderRadius: 2,
              backgroundColor: "#F8F8F8",
              "&:hover": { backgroundColor: "#F0F0F0" },
              "&:before, &:after": { borderBottom: "none" },
            },
          }}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <FilledInput
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility sx={{ color: "#000000" }} />
                  ) : (
                    <VisibilityOff sx={{ color: "#000000" }} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.password && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            mt: 2,
          }}
        >
          {/* Reset Button */}
          <Button
            variant="outlined"
            size="large"
            onClick={() => reset()}
            disabled={isSubmitting}
            sx={{
              flex: 1,
              borderRadius: 2,
              py: 1,
              color: "#000000",
              borderColor: "#000000",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#000000",
              },
            }}
          >
            Reset
          </Button>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
            endIcon={isSubmitting ? <CircularProgress size={14} /> : null}
            sx={{
              flex: 1,
              borderRadius: 2,
              py: 1,
              backgroundColor: "#000000",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#303030",
              },
            }}
          >
            {isSubmitting ? "Logging in..." : "Sign In"}
          </Button>
        </Box>

        {/* Snackbar for Notifications */}
        <CustomSnackbar
          open={snackbar.open}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          severity={snackbar.severity}
          loading={snackbar.loading}
        />
      </Paper>
    </Box>
  );
};

export default SignInFormSection;
