import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

// components
import {UITextView} from '../components';

// constants
import {COLORS, DIMENSIONS} from '../constants';

interface propTypes extends TextInputProps {
  placeholder?: string;
  textInputStyles?: TextStyle | TextStyle[];
  containerStyles?: ViewStyle | ViewStyle[];
}

const UITextInput = ({
  placeholder = 'Type here',
  textInputStyles,
  containerStyles,
  ...props
}: propTypes) => {
  return (
    <View style={[styles.fieldContainer, containerStyles]}>
      <TextInput
        placeholder={placeholder}
        style={[styles.text, textInputStyles]}
        placeholderTextColor={COLORS.grey.grey400}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fieldContainer: {
    borderWidth: 1,
    borderRadius: DIMENSIONS.BORDER_RADIUS,
    borderColor: COLORS.grey.grey400,
  },
  text: {
    color: COLORS.grey.grey800,
    paddingVertical: 0,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default UITextInput;
