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

export function getActiveOrdersCount(shopDetail) {
  if (!shopDetail.orders) return 0;
  return shopDetail.orders.reduce((total, order) => {
    if (order.status !== 4) return total + 1;
    return total;
  }, 0);
}

export function getPendingOrdersCount(shopDetail) {
  if (!shopDetail.orders) return 0;
  return shopDetail.orders.reduce((total, order) => {
    if (order.status === 1) return total + 1;
    return total;
  }, 0);
}

export function getProductsCount(shopDetail) {
  if (!shopDetail["shop_products"]) return 0;
  console.log(`shopDetail["shop_products"].length`);
  return shopDetail["shop_products"].length;
}

export function getOutOfStockProductsCount(shopDetail) {
  if (!shopDetail["shop_products"]) return 0;
  return shopDetail["shop_products"].reduce((total, product) => {
    if (product.stock === 0) return total + 1;
    else return total;
  }, 0);
}
