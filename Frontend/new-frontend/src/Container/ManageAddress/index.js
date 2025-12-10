import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
  Container,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

import { getAddresses, deleteAddress } from "../../Actions/address.actions";

const ManageAddressPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const addressState = useSelector((state) => state.addressList || {});
  const { addresses, loading, error } = addressState;

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      dispatch(getAddresses());
    }
  }, [dispatch, navigate, token]);

  const handleAddNew = () => {
    navigate("/address");
  };

  const handleEdit = (address) => {
    navigate("/address", { state: { addressToEdit: address } });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteAddress(id));
    }
  };

  const handleSelectAddress = (address) => {
    navigate("/checkout", { state: { selectedAddress: address } });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        padding: "40px 20px",
      }}
    >
      <Container maxWidth="md">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/checkout")}
          sx={{
            mb: 3,
            backgroundColor: "#0f2a1d",
            fontWeight: "bold",
            color: "white",
            padding: "15px",
            borderRadius: "15px",
          }}
        >
          Back to Checkout
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#0f2a1d">
            My Addresses
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{
              bgcolor: "#0f2a1d",
              borderRadius: "30px",
              "&:hover": { bgcolor: "#144430" },
            }}
          >
            Add Address
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress sx={{ color: "#0f2a1d" }} />
          </Box>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : addresses && addresses.length === 0 ? (
          <Card sx={{ p: 5, textAlign: "center", borderRadius: "12px" }}>
            <Typography variant="h6" color="text.secondary">
              No addresses found.
            </Typography>
            <Button
              onClick={handleAddNew}
              sx={{
                mt: 2,
                color: "white",
                backgroundColor: "#0f2a1d",
                padding: "15px",
                borderRadius: "15px",
              }}
            >
              Add Address
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {addresses.map((addr) => (
              <Grid item xs={12} key={addr._id}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: "12px",
                    border: "1px solid #eee",
                    transition: "0.3s",
                    "&:hover": { boxShadow: "0 8px 16px rgba(0,0,0,0.1)" },
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      p: 3,
                    }}
                  >
                    <Box sx={{ mb: { xs: 2, sm: 0 } }}>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {addr.fullName}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{ color: "#555", mb: 0.5 }}
                      >
                        {addr.address}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          color: "#555",
                        }}
                      >
                        <PhoneIcon fontSize="small" />
                        <Typography variant="body2">{addr.phone}</Typography>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        minWidth: "160px",
                        alignItems: { xs: "flex-start", sm: "flex-end" },
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => handleSelectAddress(addr)}
                        sx={{
                          bgcolor: "#0f2a1d",
                          color: "white",
                          textTransform: "none",
                          width: "100%",
                          mb: 1,
                          "&:hover": { bgcolor: "#144430" },
                        }}
                      >
                        Choose
                      </Button>
                      <Box>
                        <Button
                          startIcon={<EditIcon />}
                          onClick={() => handleEdit(addr)}
                          sx={{ color: "#1976d2", textTransform: "none" }}
                        >
                          Edit
                        </Button>
                        <Button
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(addr._id)}
                          sx={{ color: "#d32f2f", textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ManageAddressPage;
