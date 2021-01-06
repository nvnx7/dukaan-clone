import {
  SHOW_EDIT_PRODUCT_DIALOG,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  SHOW_ADD_PRODUCT_DIALOG,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  HIDE_PRODUCT_FORM_DIALOG,
} from "../actions/shopActions";

const initialState = {
  shopDetail: { products: [] },
  loading: false,
  addProductDialogOpen: false,
  selectedProduct: null,
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_EDIT_PRODUCT_DIALOG:
      return {
        ...state,
        addProductDialogOpen: false,
        selectedProduct: action.payload,
      };

    case EDIT_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: null,
      };

    case EDIT_PRODUCT_FAILURE:
      return { ...state, loading: false };

    case SHOW_ADD_PRODUCT_DIALOG:
      return { ...state, selectedProduct: null, addProductDialogOpen: true };

    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        addProductDialogOpen: false,
      };

    case ADD_PRODUCT_FAILURE:
      return { ...state, loading: false };

    case DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        selectedProduct: null,
        addProductDialogOpen: false,
        loading: false,
      };

    case DELETE_PRODUCT_FAILURE:
      return { ...state, loading: false };

    case HIDE_PRODUCT_FORM_DIALOG:
      return { ...state, selectedProduct: null, addProductDialogOpen: false };

    default:
      return state;
  }
};

export default shopReducer;
