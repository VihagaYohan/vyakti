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
import {
  UITextInput,
  UITextView,
  UIHeader,
  UIEmpty,
  UIFab,
} from '../../components';

// constants
import {COLORS, FONTS, DIMENSIONS} from '../../constants';

// service
import {fetchAllMedia} from '../../services/MediaService';

// models
import Media from '../../models/Media';

// widgets
import {MediaItem} from '../../widgets';

const MediaScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState<string>();
  const [data, setData] = useState<Media[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: props => <UIHeader showTitle={true} title="Media Center" />,
    });
  }, []);

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {}, [data]);

  // handle fetch media
  const fetchMedia = async () => {
    try {
      let response = await fetchAllMedia();
      if (response !== undefined && response.length > 0) {
        setData(response);
      }
    } catch (e) {
      console.log('Error at fetching media');
    }
  };

  // handle search
  const handleSearch = () => {
    try {
      if (searchQuery !== undefined && searchQuery?.length > 0) {
        let filterData = data?.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setData(filterData);
      } else {
        fetchMedia();
      }
    } catch (e) {
      console.log('Error at searching media');
    }
  };

  // render ui
  const ListItem: ListRenderItem<Media> = ({item, index}) => {
    return <MediaItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <UITextInput
        placeholder="Search here"
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          handleSearch();
        }}
      />

      {searchQuery && (
        <UITextView
          text={`Search results for "${searchQuery}"`}
          textStyle={styles.searchTitle}
        />
      )}

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
  searchTitle: {
    fontFamily: FONTS.InterRegular,
    fontSize: 15,
    textAlign: 'center',
    marginVertical: DIMENSIONS.MARGIN,
  },
});

export default MediaScreen;
