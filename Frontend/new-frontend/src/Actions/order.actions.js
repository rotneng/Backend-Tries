import axios from "../helpers/axios";
import { orderConstants, cartConstants } from "../Actions/constant";

export const createOrder = (order) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.ORDER_CREATE_REQUEST });

      const res = await axios.post("/order", order);

      if (res.status === 201) {
        dispatch({
          type: orderConstants.ORDER_CREATE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("Create Order Error:", error);
      dispatch({
        type: orderConstants.ORDER_CREATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.GET_ORDER_DETAILS_REQUEST });

      const res = await axios.get(`/order/${id}`);

      dispatch({
        type: orderConstants.GET_ORDER_DETAILS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: orderConstants.GET_ORDER_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.ORDER_PAY_REQUEST });

      const res = await axios.put(`/order/${orderId}/pay`, paymentResult);

      dispatch({
        type: orderConstants.ORDER_PAY_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: orderConstants.ORDER_PAY_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const listMyOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.ORDER_MY_LIST_REQUEST });

      const res = await axios.get("/order/myorders");

      dispatch({
        type: orderConstants.ORDER_MY_LIST_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: orderConstants.ORDER_MY_LIST_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};