const express = require("express");
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
  updateOrderStatus,
  userConfirmDelivery,
} = require("../Controller/orderController");
const { requireSignin, adminMiddleware } = require("../Middlewares/auth");

router
  .route("/")
  .post(requireSignin, addOrderItems)
  .get(requireSignin, adminMiddleware, getOrders);

router.route("/update").post(requireSignin, adminMiddleware, updateOrderStatus);

router.route("/myorders").get(requireSignin, getMyOrders);

router.route("/:id").get(requireSignin, getOrderById);

router.route("/:id/pay").put(requireSignin, updateOrderToPaid);

router
  .route("/:id/deliver")
  .put(requireSignin, adminMiddleware, updateOrderToDelivered);

router.route("/:id/confirm-delivery").put(requireSignin, userConfirmDelivery);

module.exports = router;
