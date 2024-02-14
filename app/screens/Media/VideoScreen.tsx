import React, {Component, useLayoutEffect, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

// components
import {UITextInput, UITextView, UIHeader} from '../../components';

// constants
import {COLORS, FONTS, DIMENSIONS} from '../../constants';

const VideoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {url} = route.params;

  const [searchQuery, setSearchQuery] = useState<string>('search cancer');

  console.log(url);
  return (
    <SafeAreaView style={styles.container}>
      {/*  <Video
        source={{uri: url}} 
        style={styles.backgroundVideo}
        controls={true}
      /> */}

      <VideoPlayer
        source={{uri: url.toString()}}
        toggleResizeModeOnFullscreen
        showOnStart
        videoStyle={{flex: 1}}
        tapAnywhereToPause={true}
        onError={error => console.log(error)}
        onBack={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    //paddingHorizontal: DIMENSIONS.PADDING,
  },
  backgroundVideo: {
    /*  position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0, */
    borderWidth: 1,
    height: 100,
  },
});

export default VideoScreen;
