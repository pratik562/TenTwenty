import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { hp } from '../utils/scalling';
import { colors, fonts } from '../constants';


const Buttons = ({
  primaryTxt,
  secondaryTxt,
  type,
  onPressPrimarybutton,
  onPressSecondarybutton,
  PrimaryViewStyle,
  PrimaryTxtStyle,
  SecondaryViewStyle,
  SecondaryTxtStyle,
  children,
  disabled,
  activeOpacity,
}) => {
  return (
    <>
      {type !== undefined && (
        <>
          {type == 'primary' && (
            <TouchableOpacity
              activeOpacity={activeOpacity}
              disabled={disabled}
              style={[
                styles.PrimaryView,
                PrimaryViewStyle,
              ]}
              onPress={onPressPrimarybutton}>
              <View style={{}}>{children}</View>
              <Text style={[styles.PrimaryTxt, PrimaryTxtStyle]}>
                {primaryTxt}
              </Text>
            </TouchableOpacity>
          )}
          {type == 'secondary' && (
            <TouchableOpacity
              
              style={[
                styles.SecondaryView,
                SecondaryViewStyle,
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}
              onPress={onPressSecondarybutton}>
              <View style={{position: 'absolute', left: 10}}>{children}</View>
              <Text style={[styles.SecondaryTxt, SecondaryTxtStyle]}>
                {secondaryTxt}
              </Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  PrimaryView: {
    marginHorizontal: hp(2.4),
    height: hp(5.9),
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: hp(1.1),
    borderWidth: hp(0.2),
    borderColor: colors.lightBlue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(2),
   
  },
  PrimaryTxt: {
    fontSize: hp(2.0),
    textAlign: 'center',
    color: colors.white,
    fontFamily:fonts.poppinsSemiBold
  },
  SecondaryView: {
    marginHorizontal: hp(2.4),
    height: hp(5.9),
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: hp(1.1),
    paddingHorizontal: hp(2),
     // Shadow properties for iOS
     shadowColor: colors.black,
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.3,
     shadowRadius: 2,
     // Elevation for Android
     elevation: 2,
  },
  SecondaryTxt: {
    fontSize: hp(2.0),
    textAlign: 'center',
    color: colors.white,
    fontFamily:fonts.poppinsSemiBold
  },
 
});
