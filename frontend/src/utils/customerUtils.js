export function updateProductCountInBag(bag, product, updatedCount) {
  const updatedBag = bag.slice(0);
  let productIdx = bag.findIndex((bagProduct) => bagProduct.id === product.id);

  if (productIdx < 0) {
    updatedBag.push(product);
    productIdx = updatedBag.length - 1;
  }

  updatedBag[productIdx].count = updatedCount;

  if (updatedBag[productIdx].count <= 0) updatedBag.splice(productIdx, 1);

  return updatedBag;
}

export function getTotalPriceFromBag(bag) {
  return bag.reduce((total, product) => {
    return total + product.count * product.price;
  }, 0);
}

export function getOrderDataFromBag(bag, customerData) {
  const orders = bag.map((bagProduct) => {
    return {
      product: bagProduct.id,
      quantity: bagProduct.count,
      delivery_address: customerData.deliveryAddress,
    };
  });

  return {
    orders,
    customer: {
      first_name: customerData.firstName,
      last_name: customerData.lastName,
      phone: customerData.phone,
    },
  };
}
