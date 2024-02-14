import React, {Component, useLayoutEffect, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  ListRenderItem,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {UITextView, UIHeader, UIEmpty, UIFab} from '../components';

// constants
import {COLORS, FONTS, DIMENSIONS} from '../constants';

// service
import {fetchAllGlossary} from '../services/GlosarryService';

// models
import Glossary from '../models/Glossary';

const GlossaryScreen = () => {
  const navigation = useNavigation();

  const [data, setData] = useState<Glossary[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: props => <UIHeader showTitle={true} title="Glossary" />,
    });
  }, []);

  useEffect(() => {
    fetchGlossary();
  }, []);

  useEffect(() => {}, [data]);

  // handle fetch media
  const fetchGlossary = async () => {
    try {
      let response = await fetchAllGlossary();
      if (response !== undefined && response.length > 0) {
        setData(response);
      }
    } catch (e) {
      console.log('Error at fetching media');
    }
  };

  // render ui
  const ListItem: ListRenderItem<Glossary> = ({item, index}) => {
    return (
      <View
        style={{
          paddingVertical: DIMENSIONS.PADDING,
          borderWidth: 1,
          borderColor: COLORS.grey.grey400,
          paddingHorizontal: DIMENSIONS.PADDING,
          borderRadius: DIMENSIONS.BORDER_RADIUS,
          backgroundColor: COLORS.white,
        }}>
        <UITextView
          text={item.title}
          textStyle={{
            fontFamily: FONTS.InterRegular,
            fontSize: 14,
            color: COLORS.grey,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {data !== undefined && data.length > 0 ? (
        <View>
          <FlatList
            style={{marginVertical: 20}}
            data={data}
            keyExtractor={({item, index}) => `home-flat-list-item-${index}`}
            renderItem={({item, index}) => (
              <ListItem
                item={item}
                index={index}
                separators={{
                  highlight: function (): void {
                    throw new Error('Function not implemented.');
                  },
                  unhighlight: function (): void {
                    throw new Error('Function not implemented.');
                  },
                  updateProps: function (
                    select: 'leading' | 'trailing',
                    newProps: any,
                  ): void {
                    throw new Error('Function not implemented.');
                  },
                }}
              />
            )}
            ItemSeparatorComponent={() => {
              return <View style={{height: 10}} />;
            }}
          />
        </View>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <UIEmpty />
        </View>
      )}
      <UIFab onClick={() => console.log('')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: DIMENSIONS.PADDING,
  },
});

export default GlossaryScreen;
