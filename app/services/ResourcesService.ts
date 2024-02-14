import firestore from '@react-native-firebase/firestore';
import Collections from '../constants/app_collections';
import {COLLECTIONS} from '../constants';

export const fetchAllResources = async () => {
  try {
    let resourceRef = await firestore().collection(COLLECTIONS.Resources).get();
    let response = [];
    response = resourceRef.docs.map(item => {
      const id = item.id;
      const doc = item.data();

      return {
        id: id,
        ...doc,
      };
    });
    return response;
  } catch (error) {
    console.log('Error Fetching Resources: ', error);
  }
};
