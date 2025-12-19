import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderDetails, confirmDelivery } from "../../Actions/order.actions";
import {
  Box,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Grid,
  Divider,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const generatePublicUrl = (fileName) => {
  return `http://localhost:2000/public/${fileName}`;
};

const steps = [
  { label: "Order Placed", icon: <InventoryIcon /> },
  { label: "Packed", icon: <InventoryIcon /> },
  { label: "Shipped", icon: <LocalShippingIcon /> },
  { label: "Delivered", icon: <HomeIcon /> },
];

const TrackOrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);

  const onConfirmDelivery = () => {
    if (
      window.confirm(
        "Are you sure you have received this order? This cannot be undone."
      )
    ) {
      dispatch(confirmDelivery(order._id));
    }
  };

  const getActiveStep = (status) => {
    switch (status) {
      case "ordered":
        return 1;
      case "packed":
        return 2;
      case "shipped":
        return 3;
      case "delivered":
        return 4;
      default:
        return 0;
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  if (!order)
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>Order not found.</Typography>
      </Container>
    );

  const activeStep = getActiveStep(order.orderStatus);

  const isOrderOwner =
    auth.user &&
    order.user &&
    auth.user._id.toString() === (order.user._id || order.user).toString();

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/account/orders")}
        sx={{ mb: 2 }}
      >
        Back to Orders
      </Button>

      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Order #{order._id?.substring(0, 10)}...
      </Typography>

      {/* --- SECTION 1: STATUS STEPPER --- */}
      <Card sx={{ mb: 4, p: 3, borderRadius: "12px", boxShadow: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      color: activeStep >= index + 1 ? "green" : "#ccc",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    {activeStep > index + 1 ? (
                      <CheckCircleIcon fontSize="large" />
                    ) : (
                      step.icon
                    )}
                  </Box>
                )}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="h6" color="primary" fontWeight="bold">
            Current Status:{" "}
            {order.orderStatus ? order.orderStatus.toUpperCase() : "PROCESSING"}
          </Typography>
        </Box>
      </Card>

      {order.orderStatus === "shipped" &&
        !order.isDelivered &&
        isOrderOwner && (
          <Alert
            severity="info"
            sx={{ mb: 4, borderRadius: "12px", alignItems: "center" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                Has your package arrived safely?
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={onConfirmDelivery}
                sx={{ fontWeight: "bold" }}
              >
                Yes, I Received It
              </Button>
            </Box>
          </Alert>
        )}

      {/* Success Message */}
      {order.isDelivered && (
        <Alert severity="success" variant="filled" sx={{ mb: 4 }}>
          Order successfully delivered on{" "}
          {new Date(order.deliveredAt).toDateString()}.
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: "12px", boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Items Ordered
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {order.orderItems &&
                  order.orderItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            variant="square"
                            src={generatePublicUrl(item.img)}
                            sx={{
                              width: 60,
                              height: 60,
                              mr: 2,
                              borderRadius: 1,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography fontWeight="bold">
                              {item.name}
                            </Typography>
                          }
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {item.qty} x ₦{item.price.toLocaleString()}
                              </Typography>
                              <br />
                              <Typography
                                component="span"
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                              >
                                Total: ₦
                                {(item.qty * item.price).toLocaleString()}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      {index < order.orderItems.length - 1 && (
                        <Divider variant="inset" component="li" />
                      )}
                    </React.Fragment>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: "12px", boxShadow: 2, mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Shipping Info
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                {auth.user?.firstName} {auth.user?.lastName}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" mt={2}>
                Address
              </Typography>
              <Typography variant="body1">
                {order.shippingAddress?.address}
                <br />
                {order.shippingAddress?.city}, {order.shippingAddress?.state}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" mt={2}>
                Phone
              </Typography>
              <Typography variant="body1">
                {order.shippingAddress?.phoneNumber ||
                  auth.user?.contactNumber ||
                  "N/A"}
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: "12px", boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal</Typography>
                <Typography>
                  ₦{(order.totalAmount || order.totalPrice).toLocaleString()}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Shipping</Typography>
                <Typography>₦0.00</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold" color="green">
                  ₦{(order.totalAmount || order.totalPrice).toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrackOrderPage;
