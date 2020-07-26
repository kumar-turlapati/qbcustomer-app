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

  const {
    ADD_ITEM_TO_CART,
    UPDATE_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    GET_ITEMS_FROM_CART,
  } = restEndPoints;

  const fetchCart = async (stringFunction) => {
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
          if (apiResponse.data.status === 'success') {
            setCartItems([...apiResponse.data.response]);
          } else {
            setCartItems([]);
          }
        })
        .catch((error) => {
          console.log(error, 'hello world....');
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

  const updateCart = async () => {
    try {
    } catch (e) {}
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
          fetchCart('from removeItemFromCart....');
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
        cartItems,
        fetchCart,
        loading,
        apiError,
        apiErrorText,
      }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};
