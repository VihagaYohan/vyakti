import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from '../store';
import Reminder from '../../models/Reminder';

interface ReminderState {
  loadingState: boolean;
  pass: boolean;
  fail: boolean;
  message: String;
  reminders: Reminder[];
}

const initialState: ReminderState = {
  loadingState: true,
  pass: false,
  fail: false,
  message: '',
  reminders: [],
};

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    startLoading: state => {
      state.loadingState = true;
    },
    stopLoading: state => {
      state.loadingState = false;
    },
    setPass: (state, action: PayloadAction<boolean>) => {
      state.pass = action.payload;
    },
    setFail: (state, action: PayloadAction<boolean>) => {
      state.fail = action.payload;
    },
    setMessage: (state, action: PayloadAction<String>) => {
      state.message = action.payload;
    },
    manageReminders: (state, action: PayloadAction<Reminder>) => {
      state.reminders = [...state.reminders, action.payload];
    },
  },
});

export const {
  startLoading,
  stopLoading,
  setPass,
  setFail,
  setMessage,
  manageReminders,
} = reminderSlice.actions;

export default reminderSlice.reducer;
