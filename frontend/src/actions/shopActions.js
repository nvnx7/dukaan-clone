import axiosInstance from "../utils/networkUtils";
import { updateProductInShop, addProductInShop } from "../utils/shopUtils";
import { updateShopDetail } from "./dashboardActions";

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

export const editProductSuccess = () => ({ type: EDIT_PRODUCT_SUCCESS });

export const editProductFailure = (error) => ({
  type: EDIT_PRODUCT_FAILURE,
  payload: error,
});

export const editProduct = (shopDetail, product) => {
  return (dispatch) => {
    dispatch(editProductRequest());
    const formData = new FormData();
    for (let key in product) {
      if (key !== "image") formData.append(key, product[key]);
      else formData.append(key, product[key], product[key].name);
    }

    axiosInstance()
      .patch(`/product/${product.id}/`, formData, {
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
        dispatch(editProductFailure("Something is wrong!"));
      });
  };
};

// Add product actions
export const showAddProductDialog = () => ({
  type: SHOW_ADD_PRODUCT_DIALOG,
});

export const addProductRequest = () => ({ type: ADD_PRODUCT_REQUEST });

export const addProductSuccess = () => ({
  type: ADD_PRODUCT_SUCCESS,
});

export const addProductFailure = (error) => ({
  type: ADD_PRODUCT_FAILURE,
  payload: error,
});

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
        dispatch(addProductFailure("Something is wrong!"));
      });
  };
};

export const hideProductFormDialog = () => ({
  type: HIDE_PRODUCT_FORM_DIALOG,
});
