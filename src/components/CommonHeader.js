import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { colors, fonts, icons } from '../constants';
import { hp } from '../utils/scalling';

const CommonHeader = ({ title, showBackButton, onBackPress,headerTitleStyle,backButtonIconStyle,headerContainer }) => {
  return (
    <View style={[styles.header,{headerContainer}]}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackPress}>
            <Image source={icons.back} style={[styles.backButtonIcons,backButtonIconStyle]}/>
        </TouchableOpacity>
      )}
      <Text style={[styles.headerTitle,headerTitleStyle]}>{title}</Text>
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
