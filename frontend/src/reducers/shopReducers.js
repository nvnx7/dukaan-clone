import {
  SHOW_EDIT_PRODUCT_DIALOG,
  EDIT_PRODUCT_REQUEST,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAILURE,
  SHOW_ADD_PRODUCT_DIALOG,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  HIDE_PRODUCT_FORM_DIALOG,
} from "../actions/shopActions";

const initialState = {
  shopDetail: { products: [] },
  loading: false,
  addProductDialogOpen: false,
  selectedProduct: null,
  error: "",
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
      const updatedProduct = action.payload;
      const updatedShopProducts = state.shopDetail.products.map((product) => {
        if (product.id == updatedProduct.id) return updatedProduct;
        return product;
      });
      return {
        ...state,
        loading: false,
        shopDetail: { ...state.shopDetail, products: updatedShopProducts },
        selectedProduct: null,
      };

    case EDIT_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case SHOW_ADD_PRODUCT_DIALOG:
      return { ...state, selectedProduct: null, addProductDialogOpen: true };

    case ADD_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case ADD_PRODUCT_SUCCESS:
      const addedProduct = action.payload;
      const extendedShopProducts = [...state.shopDetail.products, addedProduct];
      return {
        ...state,
        loading: false,
        addProductDialogOpen: false,
        shopDetail: { ...state.shopDetail, products: extendedShopProducts },
      };

    case ADD_PRODUCT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case HIDE_PRODUCT_FORM_DIALOG:
      return { ...state, selectedProduct: null, addProductDialogOpen: false };

    default:
      return state;
  }
};

export default shopReducer;
