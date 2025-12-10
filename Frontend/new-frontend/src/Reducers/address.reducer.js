import { addressConstants } from "../Actions/constant";

const initialState = {
  addresses: [],
  loading: false,
  error: null,
  message: ""
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case addressConstants.ADDRESS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case addressConstants.ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: action.payload, 
        error: null,
      };

    case addressConstants.ADDRESS_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case addressConstants.ADDRESS_ADD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: ""
      };

    case addressConstants.ADDRESS_ADD_SUCCESS:
      return {
        ...state,
        loading: false,

        addresses: [...state.addresses, action.payload], 
        message: "Address added successfully",
        error: null,
      };

    case addressConstants.ADDRESS_ADD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case addressConstants.ADDRESS_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: ""
      };

    case addressConstants.ADDRESS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.map((addr) =>
          addr._id === action.payload._id ? action.payload : addr
        ),
        message: "Address updated successfully",
        error: null,
      };

    case addressConstants.ADDRESS_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case addressConstants.ADDRESS_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: ""
      };

    case addressConstants.ADDRESS_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        addresses: state.addresses.filter((addr) => addr._id !== action.payload),
        message: "Address deleted successfully",
        error: null,
      };

    case addressConstants.ADDRESS_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default addressReducer;