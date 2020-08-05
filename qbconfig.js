const apiBaseUrl = 'http://api-retail-clothing.qwikbills.com';
const cartUri = 'app/v1/cart';
const ordersUri = 'app/v1/order';
const wishlistUri = 'app/v1/wishlist';
export const clientCode = 'nVlnoRYkRCGWulS';
export const requestHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Org-Id': clientCode,
  Accept: 'application/json',
};
export const billingRate = 'wholesale';
export const cdnUrl = 'https://dgufxvy74ps27.cloudfront.net';
export const restEndPoints = {
  LOGIN: {URL: `${apiBaseUrl}/app/v1/login`, method: 'POST'},
  RESEND_OTP: {URL: `${apiBaseUrl}/app/v1/resend-otp`, method: 'POST'},
  GET_TOKEN: {URL: `${apiBaseUrl}/app/v1/get-token`, method: 'POST'},
  CATALOGS: {URL: `${apiBaseUrl}/app/v1/catalog`, method: 'GET'},
  CATALOG_DETAILS: {
    URL: (catalogCode) => `${apiBaseUrl}/app/v1/catalog/details/${catalogCode}`,
  },
  ADD_ITEM_TO_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
  },
  UPDATE_ITEM_TO_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
  },
  REMOVE_ITEM_FROM_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/delete/${customerCode}`,
  },
  GET_ITEMS_FROM_CART: {
    URL: (customerCode) => `${apiBaseUrl}/${cartUri}/${customerCode}`,
  },
  ADD_ITEM_TO_WISHLIST: {
    URL: (customerCode) => `${apiBaseUrl}/${wishlistUri}/${customerCode}`,
  },
  REMOVE_ITEM_FROM_WISHLIST: {
    URL: (customerCode) => `${apiBaseUrl}/${wishlistUri}/${customerCode}`,
  },
  GET_ITEMS_FROM_WISHLIST: {
    URL: (customerCode) => `${apiBaseUrl}/${wishlistUri}/${customerCode}`,
  },
  VALIDATE_COUPON: {
    URL: `${apiBaseUrl}/app/v1/validate-coupon`,
  },
  NEW_ORDER: {
    URL: `${apiBaseUrl}/${ordersUri}`,
  },
  CANCEL_ORDER: {
    URL: `${apiBaseUrl}/${ordersUri}`,
  },
  ORDER_DETAILS: {
    URL: (orderCode) => `${apiBaseUrl}/${ordersUri}/${orderCode}`,
  },
  GET_ALL_ORDERS: {
    URL: (uuid) => `${apiBaseUrl}/app/v1/orders/${uuid}`,
  },
};
