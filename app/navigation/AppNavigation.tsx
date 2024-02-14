import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import {
  ReminderScreen,
  UpdateReminderScreen,
  VideoScreen,
  LoginScreen,
  EmergencyScreen,
} from '../screens';

// navigators
import {BottomNavigator, Routes} from './';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Routes.login}>
      <Stack.Screen name={Routes.login} component={LoginScreen} />
      <Stack.Screen name={Routes.reminders} component={ReminderScreen} />
      <Stack.Screen name={Routes.emergency} component={EmergencyScreen} />
      <Stack.Screen
        name={Routes.updateReminder}
        component={UpdateReminderScreen}
      />
      <Stack.Screen name={Routes.video} component={VideoScreen} />
      <Stack.Screen name={Routes.bottom} component={BottomNavigator} />
    </Stack.Navigator>
  );
};

export default Navigator;
