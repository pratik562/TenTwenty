import React from 'react';
import {NavigationContainer,getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../screens/Dashboard/DashboardScreen';
import MovieListScreen from '../screens/Watch/MovieListScreen';
import MediaLibraryScreen from '../screens/MediaLibrary/MediaLibraryScreen';
import MoreInfoScreen from '../screens/More/MoreInfoScreen';

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../constants';
import {hp} from '../utils/scalling';
import MovieDetailScreen from '../screens/Watch/MovieDetailsScreen';
import { TabData } from '../helper/dummyData';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const CustomTabBar = ({ state, navigation }) => {

  const handleTabBarPress = (routeName) => {
    navigation.navigate(routeName);
  };

  return (
    <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const tabInfo = TabData[index]; 
      const focused = state.index === index;

      return (
        <TouchableOpacity
          key={route.key}
          style={styles.tabButton}
          onPress={() => handleTabBarPress(route.name)}
        >
          <View style={styles.tabItem}>
            <Image
              source={tabInfo.icon}
              style={[
                styles.iconsStyle,
                { tintColor: focused ? colors.white : colors.darkGray }
              ]}
            />
            <Text
              style={{
                color: focused ? colors.white : colors.darkGray,
                fontFamily: fonts.poppinsSemiBold,
                fontSize: hp(1.2),
                marginTop: 4, 
              }}
            >
              {tabInfo.label}
            </Text>
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
  );
};



const DashboardStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Dashboard" component={DashboardScreen} />
  </Stack.Navigator>
);

const MovieListStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Watch" component={MovieListScreen} />
    <Stack.Screen name="MovieDetail" component={MovieDetailScreen} options={{ tabBarVisible: false }} />
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
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: fonts.poppinsSemiBold,
          fontSize: hp(1.1),
        },
      }}
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
    height: hp(2.2),
    width: hp(2.2),
  },
  tabBar: {
    borderTopLeftRadius: hp(2.0),
    borderTopRightRadius: hp(2.0),
    backgroundColor: colors.darkPurple,
    height: hp(9.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  tabButton: {
    width: hp(9),
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsStyle: {
    height: hp(2.2),
    width: hp(2.2),
    margin:hp(0.5)
  },
  tabItem: {
    alignItems: 'center',
  },
});
