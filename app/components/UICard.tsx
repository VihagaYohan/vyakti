import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {UITextView} from './';

// constants
import {COLORS, DIMENSIONS, FONTS} from '../constants';
import Fonts from '../constants/app_fonts';

// navigation
import {Routes} from '../navigation';

const UICard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.titleContainer}>
          <Image
            source={require('../assets/images/plus.png')}
            style={{
              width: 30,
              height: 30,
              marginRight: 20,
            }}
            resizeMode="contain"
          />
          <View>
            <UITextView text="Add your Medications" textStyle={styles.title1} />
            <UITextView text="Reminders" textStyle={styles.title2} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.reminderButton}
          onPress={() => navigation.navigate(Routes.reminders)}>
          <UITextView text="Set Reminders" textStyle={styles.buttonTitle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 20,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  title1: {
    color: COLORS.white,
    fontFamily: Fonts.InterRegular,
    fontSize: 20,
  },
  title2: {
    color: COLORS.white,
    fontFamily: Fonts.InterSemiBold,
    fontSize: 25,
  },
  reminderButton: {
    backgroundColor: COLORS.secondaryColor,
    marginLeft: 20,
    marginTop: 20,
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    fontFamily: FONTS.InterMedium,
    fontSize: 14,
    color: COLORS.white,
  },
});

export default UICard;
