import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useFormik, useFormikContext} from 'formik';
import {useNavigation} from '@react-navigation/native';
import Reminders from '@wiicamp/react-native-reminders';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';
import uuid from 'react-native-uuid';

// components
import {
  UITextView,
  UIForm,
  UIFormButton,
  UIFormField,
  UIAlert,
} from '../components';

// constants
import {DIMENSIONS, COLORS, FONTS} from '../constants';

// form validation
import {reminderValidation} from '../formValidaton/reminderValidaton';

// store
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  setPass,
  setFail,
  setMessage,
  manageReminders,
} from '../store/slice/ReminderSlice';

// services
import {
  fetchAllReminders,
  addReminder,
  updateReminder,
} from '../services/ReminderService';

// form initial values
const initialValues = {
  title: '',
  frequency: '',
  description: '',
  startDate: '',
  endDate: '',
};

interface propTypes {
  buttonTitle: string;
  formValues?: any;
}

const buttonLabel = 'Add Reminder';

const ReminderForm = (props: propTypes) => {
  const dispatch = useAppDispatch();
  const {pass, fail, loadingState, message, reminders} = useAppSelector(
    state => state.reminder,
  );
  const navigation = useNavigation();

  useEffect(() => {
    Reminders.requestPermission();
    checkPermission();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: reminderValidation,
    onSubmit: values => console.log(values),
  });

  // check permission
  const checkPermission = async () => {
    try {
      let access = await RNCalendarEvents.checkPermissions((readOnly = false));
      if (access !== 'authorized') {
        await RNCalendarEvents.requestPermissions((readOnly = false));
      }
    } catch (e) {
      console.log('Error at checking permission');
    }
  };

  // handle save reminder on calendar
  const handleReminder = async (payload: any) => {
    try {
      let calendars = await RNCalendarEvents.findCalendars();
      let startDate = moment(payload?.startDate, 'D MMM YYYY').format(
        'YYYY-MM-DD',
      );
      let endDate = moment(payload?.endDate, 'D MMM YYYY').format('YYYY-MM-DD');

      await RNCalendarEvents.saveEvent(payload?.title, {
        id: uuid.v4().toString(),
        calendarId: calendars[0].id,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        notes: payload?.description,
      });
    } catch (e) {
      console.log('Error at saving reminder', e);
    }
  };

  // function to handle create new contact
  const handleSave = async (values: any) => {
    try {
      console.log('add process');
      let response = await addReminder({id: uuid.v4(), ...values});
      if (response !== null || undefined) {
        dispatch(manageReminders(response));
        dispatch(setPass(true));
        dispatch(setMessage('Reminder added successfully'));
        //handleReminder(values);
      } else {
        dispatch(setFail(true));
        dispatch(setMessage(`Unable to add reminder \n Please try again`));
      }
    } catch (e) {
      dispatch(setFail(true));
    }
  };

  // function to handle update contact
  const handleUpdate = async (values: any) => {
    try {
      console.log('update process');
      console.log(values);
      let response = await updateReminder(values);
      if (response !== null || undefined) {
        dispatch(setPass(true));
        dispatch(setMessage('Reminder updated successfully'));
      } else {
        dispatch(setFail(true));
        dispatch(setMessage('Failed to update the Reminder'));
      }
    } catch (e) {
      dispatch(setFail(true));
      dispatch(setMessage('Unable to update contact'));
    }
  };

  return (
    <KeyboardAwareScrollView>
      <UIForm
        initialValues={
          props.buttonTitle === buttonLabel ? initialValues : props.formValues
        }
        validationSchema={reminderValidation}
        onSubmit={
          props.buttonTitle === buttonLabel ? handleSave : handleUpdate
        }>
        <View style={{flex: 1}}>
          <UIFormField
            placeholder="Enter reminder title"
            name="title"
            label="Remind Title"
          />
          <UIFormField
            placeholder="Enter reminder frequency"
            name="frequency"
            label="Remind Frequency"
          />
          <UIFormField
            placeholder="Enter description"
            name="description"
            multiline={true}
            label="Remind Description"
          />

          <View style={{flexDirection: 'row'}}>
            <UIFormField
              placeholder="Enter start date"
              name="startDate"
              containerStyles={{width: '100%'}}
              label="Start Date"
            />
            <View style={{width: 20}} />
            <UIFormField
              placeholder="Enter end date"
              name="endDate"
              containerStyles={{width: '100%'}}
              label="End Date"
            />
          </View>

          <UIFormButton
            label={props.buttonTitle}
            buttonContainerStyle={styles.button}
            buttonTextStyle={styles.buttonText}
          />

          {pass && (
            <UIAlert
              message={message}
              isConfirmation={false}
              onClick={() => navigation.goBack()}
            />
          )}

          {fail && (
            <UIAlert
              message={message}
              isConfirmation={false}
              onClick={() => navigation.goBack()}
            />
          )}
        </View>
      </UIForm>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: DIMENSIONS.MARGIN * 2,
    paddingVertical: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: FONTS.InterRegular,
  },
});

export default ReminderForm;
