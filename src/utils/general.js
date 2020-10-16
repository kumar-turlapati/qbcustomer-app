import {getValue} from '../utils/asyncStorage';
import useAsyncStorage from '../components/customHooks/async';
import AsyncStorage from '@react-native-community/async-storage';
import {requestHeaders} from '../../qbconfig';

export const isUserLoggedIn = () => {
  const accessToken = getValue('accessToken');
  return accessToken ? true : false;
};

export const getAccessToken = () => {
  const {storageItem, updateStorageItem, clearStorageItem} = useAsyncStorage(
    '@accessToken',
  );
  return storageItem;
};

export const clearAsyncStorage = async () => {
  const keys = ['@uuid', '@accessToken'];
  try {
    await AsyncStorage.multiRemove(keys).then(() => {
      if (requestHeaders.hasOwnProperty('Access-Token')) {
        requestHeaders['Access-Token'] = null;
        delete requestHeaders['Access-Token'];
      }
      // console.log(requestHeaders, 'requestHeaders........');
      return true;
    });
  } catch (e) {
    return false;
  }
};

export const checkTokenExpired = (errorResponse) => {
  const error = errorResponse.response.data;
  // console.log('error in checkTokenExpired....', error);
  const isLoggedout = error.hasOwnProperty('tokenFailed');
  const errorCode = error.hasOwnProperty('errorcode')
    ? parseInt(error.errorcode, 10)
    : 0;
  // console.log(errorCode, 'errorCode......', typeof errorCode);
  if (isLoggedout || errorCode === 401) {
    return clearAsyncStorage();
  } else {
    return false;
  }
};
