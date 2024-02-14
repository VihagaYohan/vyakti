import React, {Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  FlatListProps,
  Pressable,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// components
import {UITextView, UIEmpty} from '../components';

// services
import {fetchAllResources} from '../services/ResourcesService';
import {fetchAllDoctors} from '../services/DoctorService';
import {fetchAllTreatments} from '../services/TreatmentService';
import {fetchAllDiagnose} from '../services/DiagnoseService';

// constants
import {COLORS, DIMENSIONS, FONTS} from '../constants';

// data
import SectionData from '../data/Sections';

// models
import Section from '../models/Sections';
import Resources from '../models/Resources';
import Resource from '../models/Resources';
import Treatment from '../models/Treatments';
import Doctor from '../models/Doctors';

// widgets
import {ResourceItem, DoctorItem, TreatmentItem} from '../widgets';
import DiagnoseItem from './ListItems/DiagnoseItem';
import Diagnose from '../models/Diagnose';

const Segment = () => {
  const [category, setCategory] = useState<number>();
  const [listSource, setListSource] = useState<
    Resource[] | Doctor[] | Treatment[] | Diagnose[] | any[]
  >();
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    getAllResouces();
  }, []);

  useEffect(() => {
    if (category === 0) {
      getAllResouces();
    } else if (category === 1) {
      getAllDoctors();
    } else if (category === 2) {
      getAllTreatments();
    } else if (category === 3) {
      getAllDiagnose();
    } else {
      return;
    }
  }, [category]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const getAllResouces = async () => {
    let response = await fetchAllResources();
    if (response !== undefined && response.length > 0) {
      setListSource(response);
    }
  };

  const getAllDoctors = async () => {
    let response = await fetchAllDoctors();
    if (response !== undefined && response.length > 0) {
      setListSource(response);
    }
  };

  const getAllTreatments = async () => {
    let response = await fetchAllTreatments();
    if (response !== undefined && response.length > 0) {
      setListSource(response);
    }
  };

  const getAllDiagnose = async () => {
    let response = await fetchAllDiagnose();
    if (response !== undefined && response.length > 0) {
      setListSource(response);
    }
  };

  // handle search
  const handleSearch = async () => {
    try {
      if (searchQuery.length > 0) {
        let filteredData = listSource?.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setListSource(filteredData);
      } else {
        if (category === 0) {
          getAllResouces();
        } else if (category === 1) {
          getAllDoctors();
        } else if (category === 2) {
          getAllTreatments();
        } else if (category === 3) {
          getAllDiagnose();
        } else {
          return;
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // render ui
  const SectionItem: ListRenderItem<Section> = ({item, index}) => {
    return (
      <Pressable
        style={[
          styles.sectionContainer,
          {
            backgroundColor:
              category === index
                ? COLORS.secondaryColor
                : COLORS.secondaryBackground,
          },
        ]}
        onPress={() => setCategory(index)}>
        <UITextView
          text={item.title}
          textStyle={{
            ...styles.sectionTitle,
            color: category === index ? COLORS.white : COLORS.secondaryColor,
          }}
        />
      </Pressable>
    );
  };

  const ListItem: ListRenderItem<
    Resources | Doctor | Treatment | Diagnose | any
  > = ({item, index}) => {
    if (category == 0) {
      console.log(category);
      return <ResourceItem item={item} />;
    } else if (category == 1) {
      console.log(category);
      return <DoctorItem item={item} />;
    } else if (category == 2) {
      return <TreatmentItem item={item} />;
    } else if (category === 3) {
      return <DiagnoseItem item={item} />;
    } else {
      return <></>;
    }
  };

  return (
    <View style={{marginVertical: 20}}>
      {/* search field */}
      <View style={styles.searchFieldContainer}>
        <Icon name="search" color={COLORS.grey.grey500} size={20} />
        <TextInput
          placeholder="Search diagnoses, best treatments, doctors"
          style={styles.searchField}
          placeholderTextColor={COLORS.grey.grey500}
          value={searchQuery}
          onChangeText={text => {
            setSearchQuery(text);
          }}
        />
      </View>

      {/* sections category */}
      <FlatList
        data={SectionData}
        keyExtractor={(item, index) => `sections-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <SectionItem
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
      />

      {/* list  */}
      {listSource !== undefined && listSource.length > 0 ? (
        <View>
          <FlatList
            style={{marginVertical: 20}}
            data={listSource}
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey.grey300,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  searchField: {
    flex: 1,
    fontFamily: FONTS.InterRegular,
    color: COLORS.black,
  },
  sectionContainer: {
    backgroundColor: COLORS.secondaryBackground,
    paddingVertical: 10,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.secondaryColor,
  },
  sectionTitle: {
    color: COLORS.secondaryColor,
    fontSize: 14,
  },
});

export default Segment;
