import React, {Component, useLayoutEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  AppState,
  ScrollView,
  Dimensions,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// components
import {UIHeader, UICard, UIFab} from '../components';

// constants
import {COLORS, DIMENSIONS} from '../constants';
import Segment from '../widgets/Segment';

const HomeScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<any, any>;
  route: RouteProp<any, any>;
}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: props => <UIHeader showTitle={true} />,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        <UICard />

        <Segment />
      </ScrollView>
      {/* <UICard />

      <Segment /> */}
      <UIFab onClick={() => console.log('')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(254, 254, 254, 1)',
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
