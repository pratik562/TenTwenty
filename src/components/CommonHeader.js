import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, fonts, icons } from '../constants';
import { hp } from '../utils/scalling';

const CommonHeader = ({ title, showBackButton, onBackPress }) => {
  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress}>
            <Image source={icons.back} style={styles.backButtonIcons}/>
        </TouchableOpacity>
      )}
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: hp(1.8),
    paddingVertical:hp(2.5),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButtonIcons: {
    height:hp(3.6),
    width:hp(3.6),
    resizeMode:'contain'
  },
  headerTitle: {
    fontSize: hp(1.9),
    fontFamily:fonts.poppinsRegular,
    color:colors.fontColor,
    marginLeft:hp(1.5)
  },
})
