import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default (key) => {
  const [storageItem, setStorageItem] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);

  const getStorageItem = async () => {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(data);
    setTokenLoading(false);
  };
  const updateStorageItem = (data) => {
    if (typeof data === 'string') {
      AsyncStorage.setItem(key, data);
      setStorageItem(data);
    }
    return data;
  };
  const clearStorageItem = () => {
    AsyncStorage.removeItem(key);
    setStorageItem(null);
  };
  useEffect(() => {
    setTokenLoading(true);
    getStorageItem();
  }, []);
  return {storageItem, tokenLoading, updateStorageItem, clearStorageItem};
};
