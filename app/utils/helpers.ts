import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {KEYS} from '../constants';

interface payloadTypes {
  key: string;
  data: any;
}

// set secure storage
const setStorage = async (payload: payloadTypes) => {
  try {
    const value = JSON.stringify(payload.data);
    let result = await AsyncStorage.setItem(payload.key, value);
  } catch (error: any) {
    console.log(`Set storage error : `, error.message);
  }
};

// get secure storage
const getStorage = async (key: string) => {
  try {
    let result = await AsyncStorage.getItem(key);
    return result != null ? JSON.parse(result) : null;
  } catch (error: any) {
    console.log(`Get storage : `, error.message);
  }
};

// delete storage
const deleteStorage = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.AsyncKeys.user);
  } catch (error: any) {
    console.log(`Delete storage : ${error.message}`);
  }
};

// capitalize first letter
const capitalizeFirstLetter = (payload: string) => {
  try {
    return payload.charAt(0).toUpperCase() + payload.slice(1);
  } catch (error: any) {
    console.log('Unable to capitalize word');
  }
};

export default {
  setStorage,
  getStorage,
  deleteStorage,
  capitalizeFirstLetter,
};
