import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Sos from '../assets/icons/sos.svg';

// components
import {UITextView} from './';

// constants
import {COLORS, FONTS} from '../constants';

const size = 55;

interface propTypes {
  icon?: JSX.Element | JSX.Element[];
  onClick: () => void;
}

const UIFab = (props: propTypes) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.onClick()}>
      {props.icon ? props.icon : <Sos width={25} height={25} />}

      {props.icon ? (
        <View />
      ) : (
        <UITextView text="SOS" textStyle={styles.label} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: COLORS.red.red700,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: 10,
  },
  label: {
    fontFamily: FONTS.InterMedium,
    fontSize: 14,
    color: COLORS.white,
  },
});

export default UIFab;
