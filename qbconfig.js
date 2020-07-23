const apiBaseUrl = 'http://api-retail-clothing.qwikbills.com';
const cartUri = 'app/v1/cart';
const wishlistUri = 'app/v1/wishlist';
export const clientCode = 'nVlnoRYkRCGWulS';
export const requestHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Org-Id': clientCode,
  Accept: 'application/json',
};
export const restEndPoints = {
  LOGIN: {URL: `${apiBaseUrl}/app/v1/login`, method: 'POST'},
  RESEND_OTP: {URL: `${apiBaseUrl}/app/v1/resend-otp`, method: 'POST'},
  GET_TOKEN: {URL: `${apiBaseUrl}/app/v1/get-token`, method: 'POST'},
  CATALOGS: {URL: `${apiBaseUrl}/app/v1/catalog`, method: 'GET'},
  CATALOG_DETAILS: {
    URL: (catalogCode) => `${apiBaseUrl}/app/v1/catalog/details/${catalogCode}`,
    method: 'GET',
  },
  ADD_ITEM_TO_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
    method: 'POST',
  },
  UPDATE_ITEM_TO_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
    method: 'PUT',
  },
  REMOVE_ITEM_FROM_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
    method: 'DELETE',
  },
  GET_ITEMS_FROM_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
    method: 'GET',
  },
  ADD_ITEM_TO_WISHLIST: {
    URL: (customerCode) => `${apiBaseUrl}/${wishlistUri}/${customerCode}`,
    method: 'POST',
  },
  REMOVE_ITEM_FROM_WISHLIST: {
    URL: (customerCode) => `${apiBaseUrl}/${wishlistUri}/${customerCode}`,
    method: 'DELETE',
  },
  GET_ITEMS_FROM_WISHLIST: {
    URL: (customerCode) => `${apiBaseUrl}/${wishlistUri}/${customerCode}`,
    method: 'GET',
  },
};
