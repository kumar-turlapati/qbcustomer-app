import AsyncStorage from '@react-native-community/async-storage';

export const storeItem = async (storageKey, storageValue) => {
  try {
    await AsyncStorage.setItem(`@${storageKey}`, storageValue);
  } catch (e) {
    return false;
  }
};

export const getValue = async (storageKey) => {
  try {
    const storageValue = await AsyncStorage.getItem(`@${storageKey}`);
    if (storageValue != null) return storageValue;
    else return false;
  } catch (e) {
    return false;
  }
};
