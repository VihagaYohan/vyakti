import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// icons
import {ICONS} from '../constants';

// screens
import {
  HomeScreen,
  MediaScreen,
  GlossaryScreen,
  ProfileScreen,
} from '../screens';

const {
  Ac_Home,
  Ac_Glossary,
  Ac_Media,
  Ac_Profile,
  In_Home,
  In_Glossary,
  In_Media,
  In_Profile,
} = ICONS;

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return focused ? <Ac_Home /> : <In_Home />;
          },
        }}
      />

      <Tab.Screen
        name="media"
        component={MediaScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return focused ? <Ac_Media /> : <In_Media />;
          },
        }}
      />

      <Tab.Screen
        name="glossary"
        component={GlossaryScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return focused ? <Ac_Glossary /> : <In_Glossary />;
          },
        }}
      />

      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return focused ? <Ac_Profile /> : <In_Profile />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
