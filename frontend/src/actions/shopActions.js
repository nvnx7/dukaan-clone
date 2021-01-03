import axiosInstance from "../utils/networkUtils";
import { readAsDataUrl } from "../utils/imageUtils";

// Edit product actions
export const SHOW_EDIT_PRODUCT_DIALOG = "SHOW_EDIT_PRODUCT_DIALOG";
export const EDIT_PRODUCT_REQUEST = "EDIT_PRODUCT_REQUEST";
export const EDIT_PRODUCT_SUCCESS = "EDIT_PRODUCT_SUCCESS";
export const EDIT_PRODUCT_FAILURE = "EDIT_PRODUCT_FAILURE";

// Add product actions
export const SHOW_ADD_PRODUCT_DIALOG = "SHOW_ADD_PRODUCT_DIALOG";
export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

export const HIDE_PRODUCT_FORM_DIALOG = "HIDE_PRODUCT_FORM_DIALOG";

// Edit product actions
export const showEditProductDialog = (product) => ({
  type: SHOW_EDIT_PRODUCT_DIALOG,
  payload: product,
});

export const editProductRequest = () => ({ type: EDIT_PRODUCT_REQUEST });

export const editProductSuccess = (updatedProduct) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: updatedProduct,
});

export const editProductFailure = (error) => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: error,
});

export const editProduct = (product) => {
  return (dispatch) => {
    dispatch(editProductRequest());

    readAsDataUrl(product.image)
      .then((response) => {
        if (response) return { ...product, image: response };
        delete product.image;
        return product;
      })
      .then((productData) => {
        console.log(productData);
        axiosInstance()
          .patch(`/product/${product.id}`, productData)
          .then((response) => {
            const updatedProduct = response.data;
            dispatch(editProductSuccess(updatedProduct));
          })
          .catch((error) => {
            const errors = error.response.data;
            dispatch(editProductFailure("Something is wrong!"));
          });
      });
  };
};

// Add product actions
export const showAddProductDialog = () => ({
  type: SHOW_ADD_PRODUCT_DIALOG,
});

export const addProductRequest = () => ({ type: ADD_PRODUCT_REQUEST });

export const addProductSuccess = (updatedProduct) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: updatedProduct,
});

export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

export const addProduct = (product) => {
  return (dispatch) => {
    dispatch(addProductRequest());

    readAsDataUrl(null)
      .then((response) => {
        return { ...product, image: response };
      })
      .then((productData) => {
        axiosInstance()
          .post(`shop/${product.shopId}/productssss/`, productData)
          .then((response) => {
            const addedProduct = response.data;
            dispatch(addProductSuccess(addedProduct));
          })
          .catch((error) => {
            const errors = error.response.data;
            dispatch(addProductFailure("Something is wrong!"));
          });
      })
      .catch((error) => {
        console.log(error.message);
        dispatch(addProductFailure("Something is wrong!"));
      });
  };
};

export const hideProductFormDialog = () => ({
  type: HIDE_PRODUCT_FORM_DIALOG,
});
