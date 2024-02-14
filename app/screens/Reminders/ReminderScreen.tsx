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
import {
  fetchAllReminders,
  deleteReminder,
} from '../../services/ReminderService';
import {Routes} from '../../navigation';

const RemindersScreen = ({
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: props => <UIHeader showTitle={false} />,
    });
  }, []);

  useEffect(() => {
    getAllReminders();
    bottomSheetRef.current?.close();

    navigation.addListener('focus', () => {
      getAllReminders();
    });
  }, []);

  useEffect(() => {}, [data]);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const updateBottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '70%', '90%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();

  // handle fetch all reminders
  const getAllReminders = async () => {
    try {
      let response = await fetchAllReminders();
      if (response !== undefined && response.length > 0) {
        setData(response);
      }
    } catch (e) {
      console.log('Error at fetching reminders');
    }
  };

  // handle delete reminder()
  const handleDelete = async (payload: string) => {
    try {
      let response = await deleteReminder(payload);
      if (response !== undefined) {
        dispatch(setPass(true));
        dispatch(setMessage('Reminder deleted successfully'));
      } else {
        dispatch(setFail(true));
        dispatch(setMessage('Unable to delete reminder'));
      }
    } catch (e) {
      console.log('Error at deleting reminders');
      dispatch(setFail(true));
      dispatch(setMessage('Unable to delete reminder'));
    }
  };

  // render ui
  const ReminderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.reminderContainer}>
        <UITextView text={item.title.toUpperCase()} textStyle={styles.title} />

        <UITextView text={item.description} textStyle={styles.description} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Pressable
            onPress={() => {
              navigation.navigate(Routes.updateReminder, {item: item});
            }}>
            <AntIcon
              name="form"
              size={30}
              color={COLORS.primaryColor}
              style={{marginRight: 20}}
            />
          </Pressable>

          <Pressable onPress={() => handleDelete(item.documentId)}>
            <AntIcon name="delete" size={30} color={COLORS.red.red800} />
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {data !== undefined && data.length > 0 ? (
          data.map((item, index) => {
            return <ReminderItem item={item} key={index.toString()} />;
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: DIMENSIONS.SCREEN_WIDTH,
              height: DIMENSIONS.SCREEN_HEIGHT,
            }}>
            <UIEmpty />
          </View>
        )}
      </ScrollView>

      <UIFab
        icon={<AntIcon name="plus" color={COLORS.white} size={20} />}
        onClick={() => {
          handleOpenPress();
        }}
      />

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose>
        <View style={styles.contentContainer}>
          <ReminderForm buttonTitle="Add Reminder" />
        </View>
      </BottomSheet>

      {selectedReminder !== undefined && (
        <BottomSheet
          ref={updateBottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enablePanDownToClose>
          <View style={styles.contentContainer}>
            <ReminderForm
              buttonTitle="Update Reminder"
              formValues={{
                description: 'asasdf',
                endDate: '2 July 2023',
                startDate: '32 July 2023',
                title: 'title1',
                frequency: 'everyday',
              }}
            />
          </View>
        </BottomSheet>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default RemindersScreen;
