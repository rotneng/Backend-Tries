import { cartConstants } from "../Actions/constant";

const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  cartItems: initialCart,
};

export const cartReducer = (state = initialState, action) => {
  let updatedCartItems = [];

  switch (action.type) {
    case cartConstants.ADD_TO_CART:
      const itemToAdd = action.payload;
      const quantityToAdd = itemToAdd.quantityToAdd || 1;

      const existItem = state.cartItems.find((x) => x._id === itemToAdd._id);

      if (existItem) {
        updatedCartItems = state.cartItems.map((x) =>
          x._id === existItem._id
            ? { ...x, qty: x.qty + quantityToAdd }
            : x
        );
      } else {

        updatedCartItems = [
            ...state.cartItems, 
            { ...itemToAdd, qty: quantityToAdd }
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case cartConstants.REMOVE_FROM_CART:
      updatedCartItems = state.cartItems.filter(
        (x) => x._id !== action.payload.id
      );

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case cartConstants.INCREASE_QTY:
      updatedCartItems = state.cartItems.map((item) => {
        if (item._id === action.payload.id) {
            return { ...item, qty: item.qty + 1 };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    case cartConstants.DECREASE_QTY:
      updatedCartItems = state.cartItems.map((item) => {
        if (item._id === action.payload.id && item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cartItems: updatedCartItems,
      };

    case cartConstants.RESET_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

export default cartReducer;