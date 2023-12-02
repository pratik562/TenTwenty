import {Platform, Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const isIos = Platform.OS === 'ios';

export const statusBarHeight = getStatusBarHeight();

export const screenWidth = Dimensions.get('screen').width;

export const screenHeight = Dimensions.get('screen').height;

export const wp = val => widthPercentageToDP(val);

export const hp = val => heightPercentageToDP(val);

export const tabBarHeight = hp(7.88);

export const keyboardType = {
  numeric: 'numeric',
};
