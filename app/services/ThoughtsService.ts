import firestore from '@react-native-firebase/firestore';
import Collections from '../constants/app_collections';
import {COLLECTIONS} from '../constants';

export const fetchAllThoughts = async () => {
  try {
    let resourceRef = await firestore().collection(COLLECTIONS.Thoughts).get();
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
    console.log('Error Fetching Thoughts: ', error);
  }
};

export const addThought = async (payload: any) => {
  try {
    let resourceRef = await firestore()
      .collection(COLLECTIONS.Thoughts)
      .add({description: payload});

    return resourceRef;
  } catch (error) {
    console.log('Error add thoughts: ', error);
  }
};
