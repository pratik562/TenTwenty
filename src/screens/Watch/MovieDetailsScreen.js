import React, { useEffect, useState } from 'react';
import {
  View,
  Text,

  StyleSheet,
  Image,
  ImageBackground,

  Platform,
} from 'react-native';
import {Buttons, CommonHeader} from '../../components';
import {colors, contant, fonts, icons} from '../../constants';
import {hp, wp} from '../../utils/scalling';
import {formatDate} from '../../utils/globalFunctions';
import { fetchMovieDetailsById } from '../../helper/apiRequest';

const MovieDetailsScreen = ({route, navigation}) => {
  const movieDetails = route.params?.movie;

  const [isPlaying, setIsPlaying] = useState(false);
  const [movieData ,setMovieData] = useState([])

  useEffect(()=>{
    moviesOverView()
  },[])

  const moviesOverView = async() => {
   const movieDetail = await fetchMovieDetailsById(movieDetails?.id)
   setMovieData(movieDetail)
  }

  const banner = `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`;
  console.log('movieData',movieData)

  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: banner}}
        style={styles.banner}
        resizeMode="stretch">
        <View style={{marginTop: Platform.OS == 'ios' ? hp(3) : hp(0)}}>
          <CommonHeader
            showBackButton
            backButtonIconStyle={{tintColor: colors.white}}
            onBackPress={() => navigation.goBack()}
            title={contant.watch}
            headerTitleStyle={styles.headertitle}
          />
        </View>
        <View style={{alignSelf: 'center', marginTop: Platform.OS == 'ios' ? hp(22) : hp(25)}}>
          <Text style={styles.releaseTitle}>
            {contant.realeseDate}
            {formatDate(movieDetails?.release_date)}
          </Text>
          <Buttons
            type={'secondary'}
            secondaryTxt={contant.getTickets}
            onPressSecondarybutton={() => {}}
          />
          <Buttons
            type={'primary'}
            primaryTxt={contant.WatchTrailer}
            onPressPrimarybutton={() => {}}>
            <Image source={icons.playButton} style={styles.playButtonStyle} />
          </Buttons>
        </View>
      </ImageBackground>

    </View>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  banner: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(57),
  },
  headertitle: {
    fontSize: hp(1.9),
    color: colors.white,
    marginLeft: hp(2.5),
  },
  playButtonStyle: {
    height: hp(1.7),
    width: hp(0.9),
    marginHorizontal: hp(1.5),
  },
  releaseTitle: {
    fontFamily: fonts.poppinsMedium,
    color: colors.white,
    textAlign: 'center',
    marginBottom: hp(1),
  },
});
