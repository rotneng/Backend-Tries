import axios from "../helpers/axios";
import {
  setCart,
  setCartLoading,
  setCartError,
  addToCartLocal,
  removeFromCartLocal,
} from "../Reducers/cartSlice";

const normalizeProductImage = (item) => {
  const productData = item.product ? item.product : item;
  if (
    !productData.image &&
    productData.images &&
    productData.images.length > 0
  ) {
    productData.image = productData.images[0];
  }
  return item;
};

export const getCartItems = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(setCartLoading(true));
        const res = await axios.post("/cart/user/cart/getCartItems");
        console.log("getCartItems Response:", res.data);

        if (res.status === 200) {
          const { cartItems } = res.data;

          if (cartItems) {
            let cartArray = [];
            if (Array.isArray(cartItems)) {
              cartArray = cartItems.map((item) => normalizeProductImage(item));
            } else if (typeof cartItems === "object") {
              cartArray = Object.keys(cartItems).map((key) => {
                return normalizeProductImage(cartItems[key]);
              });
            }
            dispatch(setCart(cartArray));
          }
        }
      } catch (error) {
        console.error("getCartItems Error:", error);

        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(setCartError(errorMessage));
      }
    }
  };
};

export const addItemToCart = (product, qty = 1) => {
  return async (dispatch) => {
    let productPayload = { ...product };

    if (
      !productPayload.image &&
      productPayload.images &&
      productPayload.images.length > 0
    ) {
      productPayload.image = productPayload.images[0];
    }

    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(setCartLoading(true));

        const payload = {
          cartItems: {
            product: productPayload._id,
            quantity: qty,
            price: productPayload.price,
          },
        };

        const res = await axios.post("/cart/user/cart/addtocart", payload);

        console.log("AddToCart Response Status:", res.status);

        if (res.status === 201 || res.status === 200) {
          dispatch(getCartItems());
        }
      } catch (error) {
        console.error("AddToCart API Error:", error);

        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(setCartError(errorMessage));
      }
    } else {
      dispatch(addToCartLocal({ product: productPayload, qty }));
    }
  };
};

export const removeCartItem = (productId) => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(setCartLoading(true));
        const payload = { payload: { productId } };
        const res = await axios.post("/cart/user/cart/removeItem", payload);

        if (res.status === 202 || res.status === 200) {
          dispatch(getCartItems());
        }
      } catch (error) {
        console.error("RemoveCart Error:", error);

        const errorMessage =
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : error.message;

        dispatch(setCartError(errorMessage));
      }
    } else {
      dispatch(removeFromCartLocal(productId));
    }
  };
};
