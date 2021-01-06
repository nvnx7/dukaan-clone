import axiosInstance from "../utils/networkUtils";
import {
  updateProductInShop,
  addProductInShop,
  deleteProductInShop,
} from "../utils/shopUtils";
import { updateShopDetail, setErrorOrInfo } from "./dashboardActions";

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

// Delete product actions
export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const HIDE_PRODUCT_FORM_DIALOG = "HIDE_PRODUCT_FORM_DIALOG";

// Edit product actions
export const showEditProductDialog = (product) => ({
  type: SHOW_EDIT_PRODUCT_DIALOG,
  payload: product,
});
export const editProductRequest = () => ({ type: EDIT_PRODUCT_REQUEST });
export const editProductSuccess = () => ({ type: EDIT_PRODUCT_SUCCESS });
export const editProductFailure = () => ({ type: EDIT_PRODUCT_FAILURE });
export const editProduct = (shopDetail, product) => {
  return (dispatch) => {
    dispatch(editProductRequest());
    const formData = new FormData();
    for (let key in product) {
      if (key !== "image") formData.append(key, product[key]);
      else formData.append(key, product[key], product[key].name);
    }

    axiosInstance()
      .patch(`/products/${product.id}/`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((response) => {
        const updatedProduct = response.data;
        const updatedShopDetail = updateProductInShop(
          shopDetail,
          updatedProduct
        );
        dispatch(editProductSuccess());
        dispatch(updateShopDetail(updatedShopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        dispatch(editProductFailure());
        dispatch(setErrorOrInfo({ error: "Something is wrong!" }));
      });
  };
};

// Add product actions
export const showAddProductDialog = () => ({ type: SHOW_ADD_PRODUCT_DIALOG });
export const addProductRequest = () => ({ type: ADD_PRODUCT_REQUEST });
export const addProductSuccess = () => ({ type: ADD_PRODUCT_SUCCESS });
export const addProductFailure = () => ({ type: ADD_PRODUCT_FAILURE });
export const addProduct = (shopDetail, product) => {
  return (dispatch) => {
    dispatch(addProductRequest());

    const formData = new FormData();
    console.log(product);
    for (let key in product) {
      if (key !== "image") formData.append(key, product[key]);
      else formData.append(key, product[key], product[key].name);
    }

    axiosInstance()
      .post(`/shop/${shopDetail.id}/products/`, formData, {
        "content-type": "multipart/form-data",
      })
      .then((response) => {
        const addedProduct = response.data;
        const updatedShopDetail = addProductInShop(shopDetail, addedProduct);
        dispatch(addProductSuccess());
        dispatch(updateShopDetail(updatedShopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        dispatch(addProductFailure());
        dispatch(setErrorOrInfo({ error: "Something is wrong!" }));
      });
  };
};

// Delete product actions creators
export const deleteProductSuccess = () => ({ type: DELETE_PRODUCT_SUCCESS });
export const deleteProductFailure = () => ({ type: DELETE_PRODUCT_FAILURE });
export const deleteProductRequest = () => ({ type: DELETE_PRODUCT_REQUEST });
export const deleteProduct = (shopDetail, product) => {
  return (dispatch) => {
    dispatch(deleteProductRequest());

    axiosInstance()
      .delete(`/products/${product.id}`)
      .then((response) => {
        const updatedShopDetail = deleteProductInShop(shopDetail, product);
        dispatch(deleteProductSuccess());
        dispatch(updateShopDetail(updatedShopDetail));
      })
      .catch((error) => {
        // const errors = error.response.data;
        console.log(error);
        dispatch(deleteProductFailure());
        dispatch(setErrorOrInfo({ error: "Something is wrong!" }));
      });
  };
};

export const hideProductFormDialog = () => ({
  type: HIDE_PRODUCT_FORM_DIALOG,
});
