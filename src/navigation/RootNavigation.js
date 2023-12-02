import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import MovieListScreen from '../screens/Watch/MovieListScreen';
import MediaLibraryScreen from '../screens/MediaLibrary/MediaLibraryScreen';
import MoreInfoScreen from '../screens/More/MoreInfoScreen';

import { Image, StyleSheet } from 'react-native';
import { colors, fonts, icons } from '../constants';
import { hp } from '../utils/scalling';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
);

const MovieListStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}} >
    <Stack.Screen name="Watch" component={MovieListScreen} />
  </Stack.Navigator>
);

const MediaLibraryStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="MediaLibrary" component={MediaLibraryScreen} />
  </Stack.Navigator>
);

const MoreInfoStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="More" component={MoreInfoScreen} />
  </Stack.Navigator>
);

const RootNavigation = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;
            if (route.name === 'Dashboard') {
              iconComponent = <Image source={icons.dots} style={[styles.iconsStyle,{tintColor:focused?colors.white:colors.darkGray}]} />
            } else if (route.name === 'Watch') {
              iconComponent = <Image source={icons.play} style={[styles.iconsStyle,{tintColor:focused?colors.white:colors.darkGray}]}  /> 
            } else if (route.name === 'MediaLibrary') {
              iconComponent =  <Image source={icons.media} style={[styles.iconsStyle,{tintColor:focused?colors.white:colors.darkGray}]} /> 
            } else if (route.name === 'More') {
              iconComponent = <Image source={icons.list} style={[styles.iconsStyle,{tintColor:focused?colors.white:colors.darkGray,height:hp(3)}]} /> 
            }
            return iconComponent;
          },
          headerShown:false,
          
          tabBarStyle: styles.tabbarStyle,
          tabBarLabelStyle:{
            fontFamily:fonts.poppinsSemiBold, 
            fontSize:hp(1.1)
          },

        })
    
    }
        tabBarOptions={{
            activeTintColor: colors.white,
            inactiveTintColor: colors.darkGray,
          }}

      >
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Watch" component={MovieListStack} />
        <Tab.Screen name="MediaLibrary" component={MediaLibraryStack} />
        <Tab.Screen name="More" component={MoreInfoStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
    iconsStyle: {
        height:hp(2.2),
        width:hp(2.2),
    },
    tabbarStyle:{
        backgroundColor: colors.darkPurple,
        borderTopWidth: 0,
        borderTopLeftRadius: hp(2.0),
        borderTopRightRadius: hp(2.0),
        paddingVertical:4
    }
});
