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

        if (res.status === 200) {
          const { cartItems } = res.data;

          if (cartItems && typeof cartItems === "object") {
            const cartArray = Object.keys(cartItems).map((key) => {
              const item = cartItems[key];
              return normalizeProductImage(item);
            });

            dispatch(setCart(cartArray));
          }
        }
      } catch (error) {
        console.log(error);
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
        if (res.status === 201) {
          dispatch(getCartItems());
        }
      } catch (error) {
        console.log(error);
        dispatch(setCartError(error));
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
        if (res.status === 202) {
          dispatch(getCartItems());
        }
      } catch (error) {
        console.log(error);
        dispatch(setCartError(error));
      }
    } else {
      dispatch(removeFromCartLocal(productId));
    }
  };
};
