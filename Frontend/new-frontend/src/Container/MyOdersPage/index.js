import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { listMyOrders } from "../../Actions/order.actions";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.orderMyList);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  const getOrderTotal = (order) => {
    return order.totalAmount || order.totalPrice || order.amount || 0;
  };

  if (loading) {
    return (
      <Typography sx={{ p: 5, textAlign: "center" }}>
        Loading your orders...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5, minHeight: "80vh" }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, color: "#0f2a1d" }}
      >
        My Orders
      </Typography>

      {orders && orders.length > 0 ? (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order._id}>
              <Card sx={{ borderRadius: "16px", boxShadow: 3 }}>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Order #{order._id.substring(0, 8)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Placed on{" "}
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "N/A"}
                      </Typography>
                    </Box>
                    <Chip
                      label={order.orderStatus || "Pending"}
                      color={
                        order.orderStatus === "delivered"
                          ? "success"
                          : "primary"
                      }
                      size="small"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography fontWeight="bold">
                      ₦{getOrderTotal(order).toLocaleString()}
                    </Typography>

                    <Button
                      variant="contained"
                      startIcon={<LocalShippingIcon />}
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate(`track-order/${order._id}`)}
                      sx={{
                        bgcolor: "#0f2a1d",
                        "&:hover": { bgcolor: "#144430" },
                        borderRadius: "20px",
                      }}
                    >
                      Track Order
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 5, textAlign: "center", borderRadius: "16px" }}>
          <Typography variant="h6" color="text.secondary">
            You haven't placed any orders yet.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate("/")}
          >
            Start Shopping
          </Button>
        </Paper>
      )}
    </Container>
  );
};

export default MyOrdersPage;
