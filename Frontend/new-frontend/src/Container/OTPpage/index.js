import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Container,
  Alert,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp, resendOtp } from "../../Actions/auth.actions";

const PRIMARY_COLOR = "#0f2a1d";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const authState = useSelector((state) => state.auth);
  const loading = authState.loading || isSubmitting;

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length < 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setError("");
    setIsSubmitting(true);

    const userObj = { email, otp };
    const success = await dispatch(verifyOtp(userObj));

    setIsSubmitting(false);

    if (success) {
      alert("Email verified successfully! Please log in.");
      navigate("/signin");
    }
  };

  const handleResend = () => {
    dispatch(resendOtp({ email }));
    alert("New OTP sent to your email!");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                bgcolor: "#e8f5e9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                mb: 2,
              }}
            >
              <LockResetIcon sx={{ fontSize: 30, color: PRIMARY_COLOR }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Verify Your Email
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We have sent a verification code to <br />
              <strong>{email}</strong>
            </Typography>

            {authState.error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {authState.error}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => {
                  if (e.target.value.length <= 6) setOtp(e.target.value);
                }}
                sx={{ mb: 3 }}
                type="number"
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  bgcolor: PRIMARY_COLOR,
                  py: 1.5,
                  fontSize: "1rem",
                  "&:hover": { bgcolor: "#0a1f15" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Verify Email"
                )}
              </Button>
            </form>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Didn't receive code?{" "}
                <Typography
                  component="span"
                  variant="body2"
                  sx={{
                    color: PRIMARY_COLOR,
                    fontWeight: "bold",
                    cursor: "pointer",
                    "&:hover": { textDecoration: "underline" },
                  }}
                  onClick={handleResend}
                >
                  Resend
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default OtpVerification;
