import React from 'react';
import {ViewStyle, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FastImageProps, ImageStyle} from 'react-native-fast-image';

interface propTypes extends FastImageProps {
  url: string;
  imageStyle?: ImageStyle | ImageStyle[];
}

const UIImage = (props: propTypes) => {
  return (
    <FastImage
      style={[styles.imageStyle, props.imageStyle]}
      source={{
        uri: props.url,
        priority: FastImage.priority.high,
        cache: FastImage.cacheControl.cacheOnly, // Cache in the memory for a short period of time
      }}
      resizeMode={FastImage.resizeMode.cover}
      fallback={true}
      defaultSource={require('../assets/images/default-image.png')}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
});

export default UIImage;
