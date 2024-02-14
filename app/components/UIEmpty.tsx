import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

// compontents
import {UITextView} from '../components';

// constants
import {COLORS, FONTS} from '../constants';

interface propTypes {
  message?: string;
}

const UIEmpty = (props: propTypes) => {
  return (
    <UITextView
      text={
        props.message !== undefined && props.message?.length > 0
          ? props.message
          : 'There are no records to show'
      }
      textStyle={styles.text}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTS.InterRegular,
    color: COLORS.primaryColor,
    fontSize: 14,
    marginVertical: 20,
  },
});

export default UIEmpty;
