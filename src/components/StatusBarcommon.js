import React from 'react';
import {View, StyleSheet, StatusBar, Platform} from 'react-native';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 34 : StatusBar.currentHeight;
const StatusBarcommon = ({barBackgroundColor, containerstyle}) => {
  return <StatusBar translucent barStyle="light-content" />;
};

export default StatusBarcommon;