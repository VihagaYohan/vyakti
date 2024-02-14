import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

// components
import {UITextView, UIImage} from '../../components';

// constants
import {DIMENSIONS, COLORS, FONTS, ICONS} from '../../constants';

// models
import Treatment from '../../models/Treatments';

const {AntIcon} = ICONS;

interface propTypes {
  item: Treatment;
}

const TreatmentItem = (props: propTypes) => {
  // console.log('resouce item', props.item);
  console.log(props.item);
  return (
    <View style={styles.container}>
      <UITextView
        text={props.item.title}
        textStyle={styles.title}
        numberOfLines={2}
      />

      <UITextView
        text={props.item.description}
        textStyle={styles.description}
        numberOfLines={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey.grey300,
  },
  title: {
    marginBottom: 10,
    fontFamily: FONTS.InterSemiBold,
    color: COLORS.grey.grey900,
    fontSize: 18,
  },

  description: {
    color: COLORS.grey.grey500,
    fontFamily: FONTS.InterRegular,
    fontSize: 13,
  },
});

export default TreatmentItem;
