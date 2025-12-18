import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";

import { createOrder } from "../../Actions/order.actions";
import { orderConstants } from "../../Actions/constant";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedAddress, paymentMethod, total } = location.state || {};

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, order, error } = orderCreate;

  useEffect(() => {
    if (success && order) {
      dispatch({ type: orderConstants.ORDER_CREATE_RESET });
      navigate(`/order/${order._id}`);
    }
  }, [success, order, navigate, dispatch]);

  const handleConfirmOrder = () => {
    const mappedOrderItems = cartItems.map((item) => ({
      product: item._id || item.product,
      title: item.name || item.title || "Item",
      image: item.img || item.image || "",
      price: item.price,
      qty: item.qty || item.quantity || 1,
    }));

    const orderData = {
      orderItems: mappedOrderItems,
      shippingAddress: selectedAddress,
      paymentMethod: paymentMethod === "Card" ? "Paystack" : "COD",
      itemsPrice: total,
      shippingPrice: 0,
      totalPrice: total,
    };
    dispatch(createOrder(orderData));
  };
  if (!selectedAddress) {
    navigate("/cart");
    return null;
  }

  return (
    <Box
      sx={{ padding: "40px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, color: "#0f2a1d" }}
      >
        Confirm Order
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Shipping To
            </Typography>
            <Typography>{selectedAddress.fullName}</Typography>
            <Typography>
              {selectedAddress.address}, {selectedAddress.city}
            </Typography>
            <Typography>{selectedAddress.phoneNumber}</Typography>
          </Card>

          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Payment Method
            </Typography>
            <Typography>
              {paymentMethod === "Card"
                ? "Pay with Card (Paystack)"
                : "Pay on Delivery"}
            </Typography>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Items
            </Typography>
            {cartItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 1,
                  borderBottom: "1px solid #eee",
                  pb: 1,
                }}
              >
                <Typography>{item.name || item.title}</Typography>
                <Typography>
                  {item.qty} x ₦{item.price.toLocaleString()} ={" "}
                  <strong>₦{(item.qty * item.price).toLocaleString()}</strong>
                </Typography>
              </Box>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, position: "sticky", top: 20 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography fontWeight="bold">Total Amount:</Typography>
              <Typography fontWeight="bold" variant="h5" color="#0f2a1d">
                ₦{total.toLocaleString()}
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleConfirmOrder}
              disabled={loading}
              sx={{
                bgcolor: "#0f2a1d",
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "30px",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#144430" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Confirm & Place Order"
              )}
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlaceOrderPage;
