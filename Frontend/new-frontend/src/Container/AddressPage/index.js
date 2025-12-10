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
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addAddress, updateAddress } from "../../Actions/address.actions";

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const addressToEdit = location.state?.addressToEdit;

  const addressState = useSelector((state) => state.addressList || {});
  const { loading, error } = addressState;

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        fullName: addressToEdit.fullName,
        phone: addressToEdit.phone,
        address: addressToEdit.address,
        city: addressToEdit.city,
        state: addressToEdit.state,
      });
    }
  }, [addressToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveAndProceed = async () => {
    if (!token) {
      alert("Please login to save your address.");
      navigate("/signin");
      return;
    }

    if (addressToEdit) {
      await dispatch(updateAddress(addressToEdit._id, formData));
    } else {
      await dispatch(addAddress(formData));
    }

    navigate("/checkout");
  };

  return (
    <Box
      sx={{
        padding: { xs: 2, md: "40px" },
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Card
              elevation={3}
              sx={{
                borderRadius: "12px",
                height: "100%",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ p: 3, borderBottom: "1px solid #eee" }}>
                <Typography variant="h6" fontWeight="bold" color="#0f2a1d">
                  {addressToEdit ? "Edit Address" : "Add New Address"}
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <Box component="form" noValidate autoComplete="off">
                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#0f2a1d", fontWeight: "bold", mb: 2 }}
                  >
                    Personal Information
                  </Typography>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ mb: 4 }} />

                  <Typography
                    variant="subtitle1"
                    sx={{ color: "#0f2a1d", fontWeight: "bold", mb: 2 }}
                  >
                    Delivery Details
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Address / Street"
                        name="address"
                        placeholder="e.g. 12 Scarlett Avenue"
                        value={formData.address}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCityIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                      {typeof error === "object"
                        ? JSON.stringify(error)
                        : error}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/checkout")}
            sx={{
              backgroundColor: "#0f2a1d",
              color: "white",
              padding: "12px 40px",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(15, 42, 29, 0.2)",
              "&:hover": { bgcolor: "#144430" },
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveAndProceed}
            disabled={loading}
            sx={{
              backgroundColor: "#0f2a1d",
              color: "white",
              padding: "12px 40px",
              borderRadius: "30px",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              boxShadow: "0 4px 12px rgba(15, 42, 29, 0.2)",
              "&:hover": { bgcolor: "#144430" },
              "&.Mui-disabled": { bgcolor: "#ccc" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : addressToEdit ? (
              "Update Address"
            ) : (
              "Save & Proceed"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddressPage;
