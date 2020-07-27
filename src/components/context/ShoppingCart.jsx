import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../qbconfig';
import useAsyncStorage from '../customHooks/async';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorText, setApiErrorText] = useState('');
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const [cartItems, setCartItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);

  const {
    ADD_ITEM_TO_CART,
    UPDATE_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    GET_ITEMS_FROM_CART,
  } = restEndPoints;

  const fetchCart = async () => {
    setLoading(true);
    // console.log(
    //   'in fetch cart----------------------------------------------------------',
    //   stringFunction,
    //   requestHeaders,
    // );
    try {
      await axios
        .get(GET_ITEMS_FROM_CART.URL(uuid), {headers: requestHeaders})
        .then((apiResponse) => {
          setLoading(false);
          // console.log(
          //   apiResponse.data.response.businessLocations,
          //   'business Locations',
          // );
          if (apiResponse.data.status === 'success') {
            setCartItems([...apiResponse.data.response.cartItems]);
            setBusinessLocations([
              ...apiResponse.data.response.businessLocations,
            ]);
          } else {
            setCartItems([]);
            setBusinessLocations([]);
          }
        })
        .catch((error) => {
          // console.log(error, 'hello world....');
          setApiErrorText('Something went wrong. Please try again.');
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      setApiErrorText('Network error. Please try again.');
    }
  };

  const addToCart = async (itemDetails) => {
    setLoading(true);
    try {
      await axios
        .post(
          ADD_ITEM_TO_CART.URL(uuid),
          {
            ...itemDetails,
          },
          {headers: requestHeaders},
        )
        .then((apiResponse) => {
          setLoading(false);
          if (apiResponse.data.status === 'success') {
            setLoading(false);
            fetchCart();
          }
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          setLoading(false);
          setApiError(true);
          setApiErrorText(errorText);
        });
    } catch (e) {
      setLoading(false);
      setApiErrorText('Network error. Please try again.');
    }
  };

  const updateCart = async (itemDetails) => {
    setLoading(true);
    console.log(itemDetails, 'itemDetails in updateCart');
    try {
      await axios
        .put(
          UPDATE_ITEM_TO_CART.URL(uuid),
          {
            ...itemDetails,
          },
          {headers: requestHeaders},
        )
        .then((apiResponse) => {
          setLoading(false);
          if (apiResponse.data.status === 'success') {
            setLoading(false);
            fetchCart();
          }
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          setLoading(false);
          setApiError(true);
          setApiErrorText(errorText);
        });
    } catch (e) {
      setLoading(false);
      setApiErrorText('Network error. Please try again.');
    }
  };

  const removeItemFromCart = async (itemDetails) => {
    // console.log(requestHeaders, '------------------');
    // console.log('item details.......', itemDetails, requestHeaders);
    setLoading(true);
    try {
      await axios
        .post(
          REMOVE_ITEM_FROM_CART.URL(uuid),
          {
            ...itemDetails,
          },
          {headers: requestHeaders},
        )
        .then(() => {
          // console.log('in then block,remove item from cart....');
          setLoading(false);
          fetchCart();
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          // console.log('in catch block,remove item from cart....', error);
          setLoading(false);
          setApiError(true);
          setApiErrorText(errorText);
          fetchCart();
        });
    } catch (e) {
      setLoading(false);
      // console.log(
      //   e.response.data,
      //   'error in catch... text is..................',
      // );
      setApiErrorText('Network error. Please try again.');
    }
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        updateCart,
        removeItemFromCart,
        fetchCart,
        cartItems,
        businessLocations,
        loading,
        apiError,
        apiErrorText,
      }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};
