import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { hp } from '../utils/scalling';
import { colors, contant, fonts, icons } from '../constants';

const SearchableHeader = ({ value,onChangeText,onBlur,toggleSearch,searchVisible,onSubmitEditing }) => {
  return (
    <View style={styles.header}>
      {searchVisible ? (
        <View style={styles.searchInputContainer}>
          <Image source={icons.search} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={value}
            onChangeText={onChangeText}
            placeholder={contant.Tvshow}
            placeholderTextColor={colors.gray}
            autoFocus={true}
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
          />
          <TouchableOpacity onPress={toggleSearch}>
            <Image source={icons.close} style={[styles.searchIcon,{height:hp(3),width:hp(3)}]} />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.leftIcon}>
            <Text style={styles.leftIcontest}>Watch</Text>
          </View>

          <TouchableOpacity style={styles.rightIcon} onPress={toggleSearch}>
            <Image source={icons.search} style={styles.searchIcon} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(1.8),
    paddingVertical:hp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    height:hp(6.4),
    backgroundColor:colors.dullGray,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: hp(3.6),
    borderColor: colors.borderColor,
    paddingHorizontal: hp(1.35),
    marginBottom:hp(1.9),
    flex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 5,
    fontFamily:fonts.poppinsRegular,
    borderColor: colors.borderColor,
    borderWidth: 0.5,
    color:colors.fontColor
  },
  searchIcon: {
    height: hp(2.4),
    width: hp(2.4),
    marginLeft: 5,
  },
  leftIcon: {
    marginRight: 'auto',
  },
  leftIcontest:{
    fontSize:hp(1.8),
    fontFamily:fonts.poppinsMedium,
    color:colors.fontColor
  },
  rightIcon: {
    marginLeft: 'auto',
  },
});

export default SearchableHeader;
