import React, {Component, useState, useEffect} from 'react';
import {StyleSheet, Pressable, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {UITextView} from './';

// constatns
import {COLORS, FONTS} from '../constants';

// navigation
import {Routes} from '../navigation';

// services
import AuthServices from '../services/AuthService';

// utils
import {HELPERS} from '../utils';

interface propTypes {
  showTitle: boolean;
  title?: string;
}

const UIHeader = ({showTitle = true, title}: propTypes) => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    getUser();
  }, []);

  // check storage for user details
  const getUser = async () => {
    try {
      let response = await AuthServices.fetchUser();
      setUserName(HELPERS.capitalizeFirstLetter(response?.user?.givenName));
    } catch (e) {
      console.log('Error at getting user details');
    }
  };

  return (
    <View style={styles.container}>
      {showTitle && title == undefined ? (
        <UITextView text={`Hello, ${userName}!`} textStyle={styles.title} />
      ) : null}

      {showTitle && title != undefined ? (
        <UITextView text={title} textStyle={styles.title} />
      ) : null}

      {showTitle && title == undefined ? (
        <View style={styles.actionsContainer}>
          <Pressable onPress={() => navigation.navigate(Routes.reminders)}>
            <Image
              source={require('../assets/images/notification.png')}
              style={{
                width: 25,
                height: 25,
                marginRight: 10,
              }}
              resizeMode="contain"
            />
          </Pressable>

          <Image
            source={require('../assets/images/settings.png')}
            style={{
              width: 25,
              height: 25,
              marginRight: 10,
            }}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontFamily: FONTS.InterBold,
    color: COLORS.grey.grey800,
    fontSize: 20,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
});

export default UIHeader;
