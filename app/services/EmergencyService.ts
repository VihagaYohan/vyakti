import firestore from '@react-native-firebase/firestore';
import Collections from '../constants/app_collections';
import {COLLECTIONS} from '../constants';

export const addEmergencyNumber = async (payload: any) => {
  try {
    let resourceRef = await firestore()
      .collection(COLLECTIONS.Emergency)
      .add({number: payload});
    return resourceRef;
  } catch (error) {
    console.log('Error Fetching Resources: ', error);
  }
};
