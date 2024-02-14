import React, {Component} from 'react';
import {StyleSheet, TextProps, TextStyle, Text} from 'react-native';

// constants
import {COLORS, FONTS} from '../constants';

interface propTypes extends TextProps {
  text: String;
  textStyle?: TextStyle | TextStyle[];
}

const UITextView = (props: propTypes) => {
  return (
    <Text style={{...styles.textStyle, ...props.textStyle}} {...props}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: COLORS.black,
    fontFamily: FONTS.InterRegular,
    fontSize: 16,
  },
});

export default UITextView;
