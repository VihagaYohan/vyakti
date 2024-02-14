import firestore from '@react-native-firebase/firestore';
import Collections from '../constants/app_collections';
import {COLLECTIONS} from '../constants';
import Reminder from '../models/Reminder';

// fetch all reminders
export const fetchAllReminders = async () => {
  try {
    let resourceRef = await firestore().collection(COLLECTIONS.Reminders).get();
    let response = [];
    response = resourceRef.docs.map(item => {
      const id = item.id;
      const doc = item.data();

      return {
        // id: id,
        documentId: id,
        ...doc,
      };
    });
    return response;
  } catch (error) {
    console.log('Error Fetching Resources: ', error);
  }
};

// add reminder
export const addReminder = async (payload: Reminder) => {
  try {
    let reminderRef = await firestore()
      .collection(COLLECTIONS.Reminders)
      .add(payload);
    return {
      id: reminderRef.id,
      ...(await reminderRef.get()).data(),
    };
  } catch (error) {
    console.log(`Error adding reminder `, error);
  }
};

// update reminder
export const updateReminder = async (payload: Reminder) => {
  try {
    console.log('updated services');
    console.log(payload);
    let reminderRef = await firestore()
      .collection(COLLECTIONS.Reminders)
      .where('id', '==', payload.id)
      .get();

    let reminderDocId = reminderRef.docs[0].id;
    let result = await firestore()
      .collection(COLLECTIONS.Reminders)
      .doc(reminderDocId)
      .update(payload);
    return result;
  } catch (error) {
    console.log(`Error updating reminder `, error);
  }
};

// delete reminder
export const deleteReminder = async (payload: string) => {
  try {
    console.log('document id ', payload);
    let reminderRef = await firestore()
      .collection(COLLECTIONS.Reminders)
      .doc(payload)
      .delete();

    return reminderRef;
  } catch (error) {
    console.log(`Error deleting reminder `, error);
  }
};
