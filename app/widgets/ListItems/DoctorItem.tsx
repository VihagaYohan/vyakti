import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';

// components
import {UITextView, UIImage} from '../../components';

// constants
import {DIMENSIONS, COLORS, FONTS, ICONS} from '../../constants';

// models
import Doctor from '../../models/Doctors';

const {AntIcon} = ICONS;

interface propTypes {
  item: Doctor;
}

const DoctorItem = (props: propTypes) => {
  console.log('resouce item', props.item.id);
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <UIImage url={props.item.imageUrl} />
      </View>

      <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.grey.grey300,
  },
  imageContainer: {
    width: 100,
    height: 125,
    overflow: 'hidden',
    borderRadius: 10,
    marginRight: 5,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    marginBottom: 10,
    fontFamily: FONTS.InterSemiBold,
    width: 250,
    color: COLORS.grey.grey900,
    fontSize: 18,
  },

  description: {
    color: COLORS.grey.grey500,
    fontFamily: FONTS.InterRegular,
    fontSize: 13,
    justifyContent: 'flex-end',
  },
});

export default DoctorItem;
