export function addToUserShopsList(user, shopDetail) {
  const updatedUser = Object.assign({}, user);
  if (!updatedUser["owner_shops"]) updatedUser["owner_shops"] = [];

  const shopData = {
    id: shopDetail.id,
    url: shopDetail.url,
    title: shopDetail.title,
  };

  // TEMPORARY FIX: Feed Only url
  updatedUser["owner_shops"].push(shopData.url);
  return updatedUser;
}
