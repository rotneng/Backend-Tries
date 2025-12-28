import axios from "axios";
import { productConstants } from "./constant";
export const addProduct = (form, navigate) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
    try {
      const token = localStorage.getItem("token");
      let dataToSend = form;

      if (!(form instanceof FormData)) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("sizes", form.sizes);
        formData.append("colors", form.colors);
        formData.append("stock", form.stock);

        if (form.images && form.images.length > 0) {
          for (let pic of form.images) {
            formData.append("images", pic);
          }
        }
        dataToSend = formData;
      }

      const response = await axios.post(
        "http://localhost:3000/product/addProducts",
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        dispatch({
          type: productConstants.ADD_PRODUCT_SUCCESS,
          payload: response.data.product,
        });
        navigate("/");
      }
    } catch (error) {
      console.log("error in adding product action", error);
      dispatch({
        type: productConstants.ADD_PRODUCT_FAILURE,
        payload: {
          errorMessage: error.response?.data?.message || "Add Failed",
        },
      });
    }
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCTS_REQUEST });
    try {
      const response = await axios.get(
        "http://localhost:3000/product/getProducts"
      );

      if (response.status === 200) {
        const productData = response.data.products
          ? response.data.products
          : response.data;

        dispatch({
          type: productConstants.GET_PRODUCTS_SUCCESS,
          payload: productData,
        });
      }
    } catch (error) {
      console.log("error in getProducts Action", error);
      dispatch({
        type: productConstants.GET_PRODUCTS_FAILURE,
        payload: { message: error.response?.data?.message },
      });
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:3000/product/deleteProducts/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        dispatch({
          type: productConstants.DELETE_PRODUCT_SUCCESS,
          payload: { id },
        });
        alert("Product Deleted Succesfully");
      }
    } catch (error) {
      console.log("error in deleting products action", error);
      dispatch({
        type: productConstants.DELETE_PRODUCT_FAILURE,
        payload: { error: error.response?.data?.message || "Delete Failed" },
      });
    }
  };
};

export const updateProduct = (id, form, navigate) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });

    try {
      const token = localStorage.getItem("token");

      let dataToSend = form;

      if (!(form instanceof FormData)) {
        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("category", form.category);
        formData.append("sizes", form.sizes);
        formData.append("colors", form.colors);
        formData.append("stock", form.stock);

        if (form.images && form.images.length > 0) {
          for (let pic of form.images) {
            formData.append("images", pic);
          }
        }
        dataToSend = formData;
      }
      const res = await axios.put(
        `http://localhost:3000/product/updateProducts/${id}`,
        dataToSend,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        dispatch({
          type: productConstants.UPDATE_PRODUCT_SUCCESS,
          payload: res.data.product,
        });

        alert("Product Updated Succesfully");
        navigate("/");
      }
    } catch (error) {
      console.log("error in updating products action", error);
      dispatch({
        type: productConstants.UPDATE_PRODUCT_FAILURE,
        payload: { error: error.response?.data?.message || "Update Failed" },
      });
    }
  };
};
