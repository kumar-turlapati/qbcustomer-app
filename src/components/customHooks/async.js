import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export default (key) => {
  const [storageItem, setStorageItem] = useState(null);
  const getStorageItem = async () => {
    const data = await AsyncStorage.getItem(key);
    setStorageItem(data);
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
    getStorageItem();
  }, []);
  return {storageItem, updateStorageItem, clearStorageItem};
};
