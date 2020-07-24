import React, {createContext, useState} from 'react';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../qbconfig';
import useAsyncStorage from '../customHooks/async';
import CommonAlertView from '../UI/CommonAlertView';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorText, setApiErrorText] = useState('');
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const {
    ADD_ITEM_TO_CART,
    UPDATE_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    GET_ITEMS_FROM_CART,
  } = restEndPoints;

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
          }
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          setApiError(true);
          setApiErrorText(errorText);
        });
    } catch (e) {
      setApiErrorText('Network error. Please try again.');
    }
  };

  const updateCart = async () => {
    try {
    } catch (e) {}
  };

  const removeItemFromCart = () => {};

  const getItemsFromCart = () => {};

  return (
    <ShoppingCartContext.Provider
      value={{
        addToCart,
        updateCart,
        removeItemFromCart,
        getItemsFromCart,
        loading,
        apiError,
        apiErrorText,
      }}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};
