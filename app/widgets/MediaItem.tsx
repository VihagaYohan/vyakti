import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {UITextView, UIImage} from '../components';

// constants
import {DIMENSIONS, COLORS, FONTS, ICONS} from '../constants';

// models
import Media from '../models/Media';

// routes
import {Routes} from '../navigation/';

const {AntIcon} = ICONS;

interface propTypes {
  item: Media;
}

const MediaItem = (props: propTypes) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <UIImage url={props.item.imageUrl} />
      </View>

      <View style={{flex: 1}}>
        <UITextView
          text={props.item.title}
          textStyle={styles.title}
          numberOfLines={2}
        />

        <UITextView
          text={props.item.date}
          textStyle={styles.date}
          numberOfLines={2}
        />

        <UITextView
          text={props.item.description}
          textStyle={styles.description}
          numberOfLines={3}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate(Routes.video, {url: props.item.videoUrl})
          }>
          <AntIcon name="caretright" color={COLORS.white} size={18} />
          <UITextView text={'Play Video'} textStyle={styles.buttonText} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    width: DIMENSIONS.SCREEN_WIDTH - DIMENSIONS.PADDING * 2,
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
  date: {
    marginBottom: 10,
    fontFamily: FONTS.InterRegular,
    fontSize: 14,
    color: COLORS.grey.grey800,
  },
  description: {
    color: COLORS.grey.grey500,
    fontFamily: FONTS.InterRegular,
    fontSize: 13,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: COLORS.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: 'row',
    marginVertical: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontFamily: FONTS.InterMedium,
    fontSize: 14,
    marginLeft: 10,
  },
});

export default MediaItem;
