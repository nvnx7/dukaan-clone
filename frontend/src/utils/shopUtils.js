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

export function deleteProductInShop(shopDetail, deletedProduct) {
  const updatedProductList = shopDetail["shop_products"].filter((product) => {
    return product.id !== deletedProduct.id;
  });
  const updatedShopDetail = Object.assign({}, shopDetail);
  updatedShopDetail["shop_products"] = updatedProductList;
  return updatedShopDetail;
}

export function updateOrderInShop(shopDetail, updatedOrder) {
  const updatedOrderList = shopDetail["orders"].map((order) => {
    if (order.id === updatedOrder.id) return updatedOrder;
    return order;
  });
  const updatedShopDetail = Object.assign({}, shopDetail);
  updatedShopDetail["orders"] = updatedOrderList;

  if (updatedOrder.status === 4) {
    updatedShopDetail.revenue =
      Number(updatedShopDetail.revenue) +
      Number(updatedOrder.product.price * updatedOrder.quantity);
  }

  return updatedShopDetail;
}

export function sortOrdersByStatusAndDate(orders) {
  orders.sort((o1, o2) => {
    return (
      o1.status - o2.status ||
      new Date(o2["date_ordered"]) - new Date(o1[["date_ordered"]])
    );
  });

  return orders;
}

export function updateShopsList(shopsList, shopDetail) {
  const updatedShopsList = shopsList.slice(0);
  const idx = shopsList.findIndex((shop) => shop.id === shopDetail.id);

  if (idx < 0) updatedShopsList.push(shopDetail);
  else updatedShopsList[idx] = shopDetail;

  return updatedShopsList;
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
