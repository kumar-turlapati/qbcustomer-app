import {getValue} from '../utils/asyncStorage';
import useAsyncStorage from '../components/customHooks/async';

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
