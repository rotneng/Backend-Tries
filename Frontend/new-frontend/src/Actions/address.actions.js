import axios from "axios";
import { addressConstants } from "./constant";

export const getAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: addressConstants.ADDRESS_LIST_REQUEST });

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const { data } = await axios.get("http://localhost:3000/address", config);

    dispatch({
      type: addressConstants.ADDRESS_LIST_SUCCESS,
      payload: data.addresses,
    });
  } catch (error) {
    dispatch({
      type: addressConstants.ADDRESS_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: addressConstants.ADDRESS_ADD_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:3000/address/add",
      addressData,
      config
    );

    dispatch({
      type: addressConstants.ADDRESS_ADD_SUCCESS,
      payload: data.address,
    });
  } catch (error) {
    dispatch({
      type: addressConstants.ADDRESS_ADD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const updateAddress = (id, addressData) => async (dispatch) => {
  try {
    dispatch({ type: addressConstants.ADDRESS_UPDATE_REQUEST });

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:3000/address/update/${id}`,
      addressData,
      config
    );

    dispatch({
      type: addressConstants.ADDRESS_UPDATE_SUCCESS,
      payload: data.address,
    });
  } catch (error) {
    dispatch({
      type: addressConstants.ADDRESS_UPDATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: addressConstants.ADDRESS_DELETE_REQUEST });

    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    await axios.delete(`http://localhost:3000/address/delete/${id}`, config);

    dispatch({
      type: addressConstants.ADDRESS_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: addressConstants.ADDRESS_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
