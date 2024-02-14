import React, {Component} from 'react';
import {StyleSheet, TextInputProps, View} from 'react-native';
import {
  useFormikContext,
  useField,
  FormikErrors,
  FormikTouched,
  useFormik,
} from 'formik';

// components
import {UITextInput, UITextView, UIFormError} from '../';

// constants
import {COLORS, DIMENSIONS, FONTS} from '../../constants';
import {ViewStyle} from 'react-native';

interface propTypes extends TextInputProps {
  placeholder: string;
  name: String;
  containerStyles?: ViewStyle | ViewStyle[];
  label: String;
}

const UIFormField = (props: propTypes) => {
  const {errors, setFieldTouched, setFieldValue, touched, values} =
    useFormikContext();
  let fieldValue: any = values;
  let fieldError: FormikErrors<any> = errors;
  let fieldTouched: FormikTouched<any> = touched;

  return (
    <View style={styles.container}>
      <UITextView text={props.label} textStyle={styles.label} />
      <UITextInput
        value={fieldValue[props.name.toString()]}
        onChangeText={text => setFieldValue(props.name.toString(), text)}
        onBlur={() => setFieldTouched(props.name.toString())}
        containerStyles={props.containerStyles}
        {...props}
      />
      {
        <UIFormError
          error={fieldError[props.name.toString()]}
          visible={fieldTouched[props.name.toString()]}
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: DIMENSIONS.MARGIN / 2,
  },
  label: {
    color: COLORS.grey.grey800,
    fontFamily: FONTS.InterRegular,
    fontSize: 13,
    marginBottom: 10,
  },
});

export default UIFormField;
