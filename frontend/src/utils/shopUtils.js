export function updateProductInShop(shopDetail, updatedProduct) {
  const updatedProductList = shopDetail["shop_products"].map((product) => {
    if (product.id === updatedProduct.id) return updatedProduct;
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

export function updateOrderInShop(shopDetail, updatedOrder) {
  const updatedOrderList = shopDetail["orders"].map((order) => {
    if (order.id === updatedOrder.id) return updatedOrder;
    return order;
  });
  const updatedShopDetails = Object.assign({}, shopDetail);
  updatedShopDetails["orders"] = updatedOrderList;

  return updatedShopDetails;
}

export function getActiveOrdersCount(shopDetail) {
  if (!shopDetail || !shopDetail.orders) return 0;
  return shopDetail.orders.reduce((total, order) => {
    if (order.status !== 4) return total + 1;
    return total;
  }, 0);
}

export function getPendingOrdersCount(shopDetail) {
  if (!shopDetail || !shopDetail.orders) return 0;
  return shopDetail.orders.reduce((total, order) => {
    if (order.status === 1) return total + 1;
    return total;
  }, 0);
}

export function getProductsCount(shopDetail) {
  if (!shopDetail || !shopDetail["shop_products"]) return 0;
  return shopDetail["shop_products"].length;
}

export function getOutOfStockProductsCount(shopDetail) {
  if (!shopDetail || !shopDetail["shop_products"]) return 0;
  return shopDetail["shop_products"].reduce((total, product) => {
    if (product.stock === 0) return total + 1;
    else return total;
  }, 0);
}

export function getShopRevenue(shopDetail) {
  if (!shopDetail || !shopDetail.revenue) return 0;
  return shopDetail.revenue;
}

export function getPendingRevenue(shopDetail) {
  if (!shopDetail || !shopDetail.revenue || !shopDetail.orders) return 0;
  return shopDetail.orders.reduce((total, order) => {
    if (order.status === 2 || order.status === 3) {
      return total + order.product.price * order.quantity;
    }
    return total;
  }, 0);
}
