import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/auth.actions";
import { authConstants } from "../../Actions/constant"; // Import constants
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  // 1. Clear previous errors/messages when page loads
  useEffect(() => {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: null },
    });
    // If your Redux setup persists 'message', you might need to clear it here too.
    // Usually a LOGIN_FAILURE or a specific reset action handles this.
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(forgotPassword(email));
    }
  };

  // If user is already logged in, redirect to home
  if (auth.authenticate) {
    return <Navigate to="/" />;
  }

  // --- SUCCESS VIEW: Show this if email was sent successfully ---
  if (auth.message && !auth.loading && !auth.error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: "#0f2a1d", mb: 2 }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Email Sent!
          </Typography>
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {auth.message}
          </Alert>
          <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
            Please check your inbox (and spam folder) for the reset link.
          </Typography>
          
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/signin")}
            sx={{
              backgroundColor: "#0f2a1d",
              color: "white",
              padding: "10px",
              borderRadius: "30px",
              "&:hover": { backgroundColor: "#1a4d33" },
            }}
          >
            Back to Sign In
          </Button>
        </Paper>
      </Box>
    );
  }

  // --- FORM VIEW: Input for Email ---
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        pb: 5,
      }}
    >
      {/* Header Bar */}
      <Box
        sx={{
          fontSize: { xs: "24px", md: "30px" },
          fontWeight: "bolder",
          backgroundColor: "#0f2a1d",
          color: "white",
          padding: { xs: "15px", md: "20px" },
          textAlign: "center",
          mb: { xs: 4, md: 8 },
          width: "100%",
          boxShadow: 2,
        }}
      >
        Forgot Password
      </Box>

      {/* Form Card */}
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "450px" },
          p: { xs: 3, md: 5 },
          borderRadius: "12px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="body1"
          sx={{ mb: 3, textAlign: "center", color: "#666" }}
        >
          Enter your email address and we'll send you a link to reset your password.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* 🔴 ERROR ALERT: Shows if user not found or server error */}
          {auth.error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {auth.error}
            </Alert>
          )}

          <TextField
            label="Email Address"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={auth.loading}
            sx={{
              fontSize: 16,
              backgroundColor: "#0f2a1d",
              color: "white",
              padding: "12px",
              borderRadius: "30px",
              mt: 1,
              "&:hover": { backgroundColor: "#1a4d33" },
            }}
          >
            {auth.loading ? (
              <CircularProgress size={24} style={{ color: "white" }} />
            ) : (
              "Send Reset Link"
            )}
          </Button>

          <Button
            onClick={() => navigate("/signin")}
            sx={{ 
                color: "#666", 
                textTransform: "none",
                "&:hover": { backgroundColor: "transparent", color: "#000" } 
            }}
          >
            Cancel and return to Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;