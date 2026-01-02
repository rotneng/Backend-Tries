import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  CircularProgress,
  Container,
  Alert,
  Stack,
  Collapse,
  alpha,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MapIcon from "@mui/icons-material/Map";
import SaveIcon from "@mui/icons-material/Save";
import ErrorIcon from "@mui/icons-material/Error";

import { addAddress, updateAddress } from "../../Actions/address.actions";

const PRIMARY_COLOR = "#0f2a1d";

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const addressToEdit = location.state?.addressToEdit;

  const addressState = useSelector((state) => state.addressList || {});
  const { loading, error: reduxError } = addressState;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        fullName: addressToEdit.fullName || "",
        phone: addressToEdit.phone || "",
        address: addressToEdit.address || "",
        city: addressToEdit.city || "",
        state: addressToEdit.state || "",
      });
    }
  }, [addressToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validationError) setValidationError("");
  };

  const validateForm = () => {
    const { fullName, phone, address, city, state } = formData;
    if (!fullName || !phone || !address || !city || !state) {
      setValidationError("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSaveAndProceed = async () => {
    if (!token) {
      alert("Please login to save your address.");
      navigate("/signin");
      return;
    }

    if (!validateForm()) return;

    try {
      if (addressToEdit) {
        await dispatch(updateAddress(addressToEdit._id, formData));
      } else {
        await dispatch(addAddress(formData));
      }
      navigate("/checkout");
    } catch (err) {
      console.error("Failed to save address:", err);
      setValidationError("Failed to save address. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: "800px", width: "100%", mx: "auto" }}>
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h4"
              fontWeight="800"
              color={PRIMARY_COLOR}
              sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
            >
              {addressToEdit ? "Edit Address" : "New Address"}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {addressToEdit
                ? "Update your existing delivery details below."
                : "Where should we send your order?"}
            </Typography>
          </Box>

          <Card
            elevation={0}
            sx={{
              borderRadius: "20px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              overflow: "visible",
              bgcolor: "#fff",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5, md: 6 } }}>
              <Box component="form" noValidate autoComplete="off">
                <Collapse in={!!(reduxError || validationError)}>
                  <Alert
                    severity="error"
                    icon={<ErrorIcon />}
                    sx={{ mb: 4, borderRadius: "12px" }}
                  >
                    {validationError ||
                      (typeof reduxError === "object"
                        ? JSON.stringify(reduxError)
                        : reduxError)}
                  </Alert>
                </Collapse>

                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: PRIMARY_COLOR,
                      fontWeight: "bold",
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      fontSize: "1.1rem",
                    }}
                  >
                    <PersonIcon color="primary" /> Contact Information
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="John Doe"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="+234..."
                        type="tel"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="action" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Divider sx={{ mb: 4, borderStyle: "dashed" }} />

                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: PRIMARY_COLOR,
                      fontWeight: "bold",
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      fontSize: "1.1rem",
                    }}
                  >
                    <HomeIcon color="primary" /> Delivery Details
                  </Typography>

                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        label="Street Address"
                        name="address"
                        placeholder="e.g. 12 Scarlett Avenue, Flat 4B"
                        value={formData.address}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon color="action" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCityIcon
                                color="action"
                                fontSize="small"
                              />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        required
                        label="State / Province"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MapIcon color="action" fontSize="small" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mt: 5 }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/checkout")}
              variant="outlined"
              size="large"
              fullWidth
              sx={{
                height: 50,
                borderColor: PRIMARY_COLOR,
                color: PRIMARY_COLOR,
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                maxWidth: { sm: "200px" },
                "&:hover": {
                  borderColor: "#144430",
                  bgcolor: alpha(PRIMARY_COLOR, 0.05),
                },
              }}
            >
              Back to Checkout
            </Button>

            <Button
              variant="contained"
              onClick={handleSaveAndProceed}
              disabled={loading}
              startIcon={!loading && <SaveIcon />}
              size="large"
              fullWidth
              sx={{
                height: 50,
                backgroundColor: PRIMARY_COLOR,
                color: "white",
                borderRadius: "30px",
                textTransform: "none",
                fontWeight: "bold",
                boxShadow: "0 8px 16px rgba(15, 42, 29, 0.2)",
                maxWidth: { sm: "250px" },
                "&:hover": {
                  bgcolor: "#144430",
                  boxShadow: "0 10px 20px rgba(15, 42, 29, 0.3)",
                },
                "&.Mui-disabled": { bgcolor: "#ccc" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : addressToEdit ? (
                "Update Address"
              ) : (
                "Save & Proceed"
              )}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AddressPage;
