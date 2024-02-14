import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {UITextView} from '../../components';

// constants
import {COLORS, FONTS, DIMENSIONS, KEYS} from '../../constants';

// navigation
import {Routes} from '../../navigation';

// services
import AuthServices from '../../services/AuthService';

// utils
import {HELPERS} from '../../utils';

const LoginScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkUserLogin();
  }, []);

  // check if user already logged-in
  const checkUserLogin = async () => {
    try {
      let userObj = await HELPERS.getStorage(KEYS.AsyncKeys.user);
      if (userObj !== null) {
        console.log('user already logged in');
        console.log(userObj);
        navigation.navigate(Routes.bottom);
      } else {
        console.log('user not logged in');
        return;
      }
    } catch (error: any) {
      console.log('error check user logged in goes here');
      console.log(error);
    }
  };

  // handle google sign-in
  const signIn = async () => {
    try {
      let response = await AuthServices.signInUser();
      if (response != undefined) {
        console.log('user object goes here');
        console.log(response.user.uid);
        // user UID object
        /* let userUIDObj = {
              key: AsyncKeys.userUID,
              data: response.user.uid,
            };
            setStorage(userUIDObj); */
        navigation.navigate(Routes.bottom);
      }
    } catch (e: any) {
      console.log('user logged in error goes here');
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/images/app-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={() => signIn()}>
        <Image
          source={require('../../assets/images/google.png')}
          style={styles.google}
        />
        <UITextView text="Continue With Google" textStyle={styles.title} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.PADDING,
  },
  logo: {width: 100, height: 100, marginTop: 80, alignSelf: 'center'},
  buttonContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey.grey400,
  },
  google: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
  },
});

export default LoginScreen;
