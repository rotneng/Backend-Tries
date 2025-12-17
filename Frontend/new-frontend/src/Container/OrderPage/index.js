import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  Divider,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { getOrderDetails } from "../../Actions/order.actions";

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!order) {
    return <Typography sx={{ p: 4 }}>Order not found</Typography>;
  }

  return (
    <Box
      sx={{ padding: "40px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Order Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Shipping
            </Typography>
            <Typography>
              <strong>Name:</strong>{" "}
              {order.user ? order.user.firstName : "User"}
            </Typography>
            <Typography>
              <strong>Email:</strong> {order.user ? order.user.email : ""}
            </Typography>
            <Typography>
              <strong>Address:</strong> {order.shippingAddress.address},{" "}
              {order.shippingAddress.city}
            </Typography>

            <Alert
              severity={order.isDelivered ? "success" : "warning"}
              sx={{ mt: 2 }}
            >
              {order.isDelivered
                ? `Delivered at ${order.deliveredAt}`
                : "Not Delivered"}
            </Alert>
          </Card>

          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Payment Method
            </Typography>
            <Typography>
              <strong>Method:</strong> {order.paymentMethod}
            </Typography>

            <Alert
              severity={order.isPaid ? "success" : "warning"}
              sx={{ mt: 2 }}
            >
              {order.isPaid ? `Paid on ${order.paidAt}` : "Not Paid"}
            </Alert>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Order Items
            </Typography>
            {order.orderItems.length === 0 ? (
              <Alert>Order is empty</Alert>
            ) : (
              order.orderItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>{item.title}</Typography>
                  <Typography>
                    {item.qty} x ₦{item.price} = ₦{item.qty * item.price}
                  </Typography>
                </Box>
              ))
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Items</Typography>
              <Typography>₦{order.itemsPrice}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Shipping</Typography>
              <Typography>₦{order.shippingPrice}</Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography fontWeight="bold">Total</Typography>
              <Typography fontWeight="bold">₦{order.totalPrice}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderPage;
