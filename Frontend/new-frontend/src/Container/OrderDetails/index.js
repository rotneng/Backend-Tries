import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, confirmDelivery } from "../Actions/order.action";

const OrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  const handleConfirmDelivery = () => {
    if (window.confirm("Are you sure you have received this order?")) {
      dispatch(confirmDelivery(orderId));
    }
  };

  return (
    <div>
      {userInfo &&
        !userInfo.role === "admin" &&
        order?.isPaid &&
        !order?.isDelivered && (
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleConfirmDelivery}
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "10px 20px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                borderRadius: "5px",
                width: "100%",
              }}
            >
              ✅ I have received my order
            </button>
          </div>
        )}

      {order?.isDelivered && (
        <div className="alert alert-success" style={{ marginTop: "20px" }}>
          App Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
