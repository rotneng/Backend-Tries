import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/auth.actions";
import { useParams, useNavigate } from "react-router-dom";
import { authConstants } from "../../Actions/constant";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch({
      type: authConstants.LOGIN_FAILURE,
      payload: { error: null },
    });
  }, [dispatch]);

  useEffect(() => {
    if (auth.message && !auth.error && !auth.loading) {
      const timer = setTimeout(() => {
        navigate("/signin");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [auth.message, auth.error, auth.loading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (token && password) {
      dispatch(resetPassword(token, password));
    }
  };

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
          }}
        >
          <Alert
            severity="success"
            variant="filled"
            sx={{ mb: 3, justifyContent: "center" }}
          >
            Success!
          </Alert>
          <Typography variant="h6" sx={{ mb: 1, color: "#0f2a1d" }}>
            {auth.message}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: "#666" }}>
            Redirecting to login page in 3 seconds...
          </Typography>

          <CircularProgress size={24} sx={{ color: "#0f2a1d", mb: 2 }} />

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/signin")}
            sx={{
              borderColor: "#0f2a1d",
              color: "#0f2a1d",
              borderRadius: "30px",
              "&:hover": { backgroundColor: "#e0f2f1", borderColor: "#0f2a1d" },
            }}
          >
            Go to Login Now
          </Button>
        </Paper>
      </Box>
    );
  }

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
        Reset Password
      </Box>

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
          Enter your new password below.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          {(auth.error || localError) && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {localError || auth.error}
            </Alert>
          )}

          <TextField
            label="New Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
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
              "Update Password"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
