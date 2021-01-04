export function updateProductInShop(shopDetail, updatedProduct) {
  const updatedProductList = shopDetail["shop_products"].map((product) => {
    if (product.id == updatedProduct.id) return updatedProduct;
    return product;
  });
  const updatedShopDetails = Object.assign({}, shopDetail);
  updatedShopDetails["shop_products"] = updatedProductList;

  return updatedShopDetails;
}

export function addProductInShop(shopDetail, addedProduct) {
  const updatedShopDetails = Object.assign({}, shopDetail);
  updatedShopDetails["shop_products"].push(addedProduct);
  return updatedShopDetails;
}
