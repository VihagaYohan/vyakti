import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, SafeAreaView, Dimensions, Alert} from 'react-native';

// components
import {UIButton, UITextInput, UITextView, UIAlert} from '../components';

// constants
import {COLORS, FONTS, DIMENSIONS} from '../constants';

// service
import {addEmergencyNumber} from '../services/EmergencyService';

// store
import {useAppDispatch, useAppSelector} from '../store/store';
import {
  setPass,
  setFail,
  setMessage,
  manageReminders,
} from '../store/slice/ReminderSlice';

const EmergencyScreen = () => {
  const dispatch = useAppDispatch();
  const {pass, fail, loadingState, message, reminders} = useAppSelector(
    state => state.reminder,
  );
  const [number, setNumber] = useState<string>();

  useEffect(() => {}, []);

  // add number
  const addNumber = async () => {
    try {
      let response = await addEmergencyNumber(number);
      if (response) {
        dispatch(setPass(true));
        dispatch(setMessage('Emergency number added successfully'));
      } else {
        dispatch(setFail(true));
        dispatch(setMessage('Unable to add emergency number'));
      }
    } catch (e) {
      console.log('Error at adding number');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UITextView
        text="Setup your emergency services number"
        textStyle={{
          fontFamily: FONTS.InterSemiBold,
          fontSize: 15,
          color: COLORS.grey.grey700,
          textAlign: 'center',
          margin: DIMENSIONS.MARGIN,
        }}
      />

      <UITextView
        text="In case of a emergency we will help you to contact
        immediately the health services"
        textStyle={{
          fontFamily: FONTS.InterRegular,
          fontSize: 13,
          color: COLORS.grey.grey700,
          textAlign: 'center',
          margin: DIMENSIONS.MARGIN,
        }}
      />

      <UITextInput
        placeholder="Add emergency number"
        value={number}
        onChangeText={text => setNumber(text)}
      />

      <UIButton
        label="Done"
        onClick={() => addNumber()}
        buttonContainerStyle={{
          marginVertical: DIMENSIONS.MARGIN * 2,
          paddingVertical: 10,
          backgroundColor: COLORS.secondaryColor,
          borderRadius: DIMENSIONS.BORDER_RADIUS * 5,
        }}
      />

      {pass && (
        <UIAlert
          message={message}
          isConfirmation={false}
          onClick={() => console.log('pass')}
        />
      )}

      {fail && (
        <UIAlert
          message={message}
          isConfirmation={false}
          onClick={() => console.log('faile')}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: DIMENSIONS.PADDING,
  },
});

export default EmergencyScreen;
