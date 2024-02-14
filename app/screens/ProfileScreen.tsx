import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  FlatList,
  ListRenderItem,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import {UIButton, UITextInput, UITextView} from '../components';

// constants
import {COLORS, FONTS, DIMENSIONS, KEYS} from '../constants';

// services
import AuthServices from '../services/AuthService';
import {fetchAllThoughts, addThought} from '../services/ThoughtsService';
import {Routes} from '../navigation';

type thoughts = {
  description: string;
};

const SIZE = 80;

const ProfileScreen = () => {
  const [url, setUrl] = useState<string>(
    'https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=',
  );
  const [name, setName] = useState<string>('');
  const [list, setList] = useState<string[]>([]);
  const [item, setItem] = useState<string>();

  const navigation = useNavigation();

  useEffect(() => {
    getUser();
    getThoughts();
  }, []);

  useEffect(() => {}, [list]);

  // check storage for user details
  const getUser = async () => {
    try {
      let response = await AuthServices.fetchUser();
      setUrl(response?.user?.photo);
      setName(response?.user?.givenName);
    } catch (e) {
      console.log('Error at getting user details');
    }
  };

  // get all thoughts
  const getThoughts = async () => {
    try {
      let response = await fetchAllThoughts();
      if (response !== undefined && response.length > 0) {
        setList(response);
      }
    } catch (e) {
      console.log('Error at fetching thoughts');
    }
  };

  // add thought
  const addNewThought = async () => {
    try {
      let response = await addThought(item);
      getThoughts();
    } catch (e) {
      console.log('Error at fetching thoughts');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={() => navigation.navigate(Routes.emergency)}>
        <Image
          source={require('../assets/images/settings.png')}
          style={{
            width: 25,
            height: 25,
            resizeMode: 'contain',
            position: 'absolute',
            top: 10,
            right: 20,
          }}
        />
      </Pressable>
      <View style={{alignSelf: 'center'}}>
        <Image source={{uri: url}} style={styles.profileImage} />

        <UITextView
          text={name.toUpperCase()}
          textStyle={{
            fontFamily: FONTS.InterSemiBold,
            fontSize: 20,
            color: COLORS.grey.grey600,
            marginTop: 10,
          }}
        />
      </View>

      <View
        style={{
          paddingHorizontal: DIMENSIONS.PADDING,
          marginTop: DIMENSIONS.PADDING,
        }}>
        <UITextInput
          placeholder="Share your thoughts"
          multiline
          value={item}
          onChangeText={text => setItem(text)}
        />

        <UIButton
          label="Post"
          buttonContainerStyle={{
            paddingVertical: 5,
            width: '50%',
            marginVertical: 10,
          }}
          onClick={() => addNewThought()}
        />
      </View>

      <FlatList
        style={{
          paddingHorizontal: DIMENSIONS.PADDING,
          marginVertical: DIMENSIONS.PADDING * 2,
        }}
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `thoughts-${index}`}
        renderItem={({item, index}) => {
          return (
            <View style={styles.card}>
              <View style={styles.row}>
                <Image
                  source={{uri: url}}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                  }}
                />

                <View>
                  <UITextView
                    text={name.toUpperCase()}
                    textStyle={styles.cardName}
                  />
                </View>
              </View>

              <UITextView
                text={item.description}
                textStyle={styles.description}
              />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: 10,
  },
  bar: {
    height: 70,
    backgroundColor: COLORS.primaryColor,
  },
  profileImage: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  card: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    borderColor: COLORS.grey.grey300,
    paddingHorizontal: DIMENSIONS.PADDING,
    paddingVertical: DIMENSIONS.PADDING,
    flex: 1,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardName: {
    fontFamily: FONTS.InterSemiBold,
    fontSize: 13,
    marginLeft: 10,
    color: COLORS.grey.grey800,
  },
  description: {
    fontFamily: FONTS.InterRegular,
    fontSize: 12,
    color: COLORS.grey.grey500,
    marginVertical: 10,
  },
});

export default ProfileScreen;
