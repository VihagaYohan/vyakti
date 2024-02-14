import React, {Component} from 'react';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {useFormikContext} from 'formik';

// components
import {UIButton} from '../';

interface propTypes {
  label: String;
  buttonContainerStyles?: ViewStyle | ViewStyle[];
  buttonTextStyle?: TextStyle | TextStyle[];
}

const UISubmitButton = ({label, ...props}: propTypes) => {
  const {handleSubmit} = useFormikContext();

  return (
    <UIButton
      label={label}
      onClick={handleSubmit}
      buttonContainerStyle={props.buttonContainerStyles}
      buttonTextStyle={props.buttonTextStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({});

export default UISubmitButton;
