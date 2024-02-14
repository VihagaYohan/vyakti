import React, {
  Component,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// compontents
import {UITextView, UIFab, UIEmpty, UIHeader} from '../../components';

// constants
import {COLORS, DIMENSIONS, FONTS, ICONS} from '../../constants';

// widgets
import {ReminderForm} from '../../widgets';

const {AntIcon} = ICONS;

// store
import {useAppDispatch, useAppSelector} from '../../store/store';
import {
  setPass,
  setFail,
  setMessage,
  manageReminders,
} from '../../store/slice/ReminderSlice';

// models
import Reminder from '../../models/Reminder';

// services
import {updateReminder} from '../../services/ReminderService';

const UpdateReminderScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}) => {
  const dispatch = useAppDispatch();
  const {pass, fail, loadingState, message, reminders} = useAppSelector(
    state => state.reminder,
  );
  const [data, setData] = useState<Reminder[]>();
  const [selectedReminder, setSelectedReminder] = useState<Reminder>();

  // route data
  const {item} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: props => <UIHeader showTitle={false} />,
    });
  }, []);

  useEffect(() => {}, []);

  useEffect(() => {}, [data]);

  // render ui

  console.log(item);

  return (
    <SafeAreaView style={styles.container}>
      <ReminderForm buttonTitle="Update Reminder" formValues={item} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.PADDING,
    paddingVertical: DIMENSIONS.PADDING,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.PADDING,
  },
  reminderContainer: {
    borderWidth: 1,
    borderColor: COLORS.grey.grey400,
    marginHorizontal: DIMENSIONS.PADDING,
    marginBottom: DIMENSIONS.MARGIN,
    borderRadius: DIMENSIONS.CARD_BORDER_RADIUS,
    padding: DIMENSIONS.PADDING,
    backgroundColor: COLORS.white,
  },
  title: {
    fontFamily: FONTS.InterMedium,
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 10,
  },
  description: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.grey.grey500,
  },
});

export default UpdateReminderScreen;
