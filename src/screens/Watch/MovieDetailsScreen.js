import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Button,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import {Buttons, CommonHeader} from '../../components';
import {colors, contant, fonts, icons} from '../../constants';
import {hp, wp} from '../../utils/scalling';
import {formatDate} from '../../utils/globalFunctions';
import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";

import {
  fetchMovieDetailsById,
  fetchMovieVideoId,
} from '../../helper/apiRequest';

const MovieDetailsScreen = ({route, navigation}) => {
  const movieDetails = route.params?.movie;

  const [movieData, setMovieData] = useState([]);
  const [movieTrailler, setMovieTrailer] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [playing, setPlaying] = useState(false); 

  useEffect(() => {
    moviesOverView();
  }, []);

  const moviesOverView = async () => {
    const movieDetail = await fetchMovieDetailsById(movieDetails?.id);
    const movieTrailers = await fetchMovieVideoId(movieDetails?.id);

    console.log('movieDetail',movieDetail)
    setMovieTrailer(movieTrailers);
    setMovieData(movieDetail);
  };

const banner = `https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`;

const color = ['#E26CA5', '#15D2BC', '#CD9D0F', '#827D88', '#564CA3', '#61C3F2'];

const getRandomColor = () => {
  return color[Math.floor(Math.random() * color.length)];
};

  const renderItem = ({ item }) => {
    return(
      <View style={[styles.box, { backgroundColor: getRandomColor() }]}>
      <Text style={styles.text}>{item?.name}</Text>
    </View>
    )
  }



  const onStateChange = (state) => {
    if (state === 'ended') {
      setPlaying(false);
      setShowVideoModal(false);
      Alert.alert('Video has finished playing!');
    }
  };

  return (
    <View style={styles.container}>
     {Platform.OS == 'ios' && <StatusBar barStyle={'light-content'}/>}
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
            headerTitleStyle={{color:colors.white}}
            titleContainer={{alignItems:'flex-start'}}
          />
        </View>
          <View
          style={{
            alignSelf: 'center',
            marginTop: Platform.OS == 'ios' ? hp(22) : hp(25),
            width:wp(75)
          }}>
          <Text style={styles.releaseTitle}>
            {contant.realeseDate}
            {formatDate(movieDetails?.release_date)}
          </Text>
          <Buttons
            type={'secondary'}
            secondaryTxt={contant.getTickets}
            onPressSecondarybutton={() => {navigation.navigate('Booking',{movieData:movieData})}}
          />
          <Buttons
            type={'primary'}
            primaryTxt={contant.WatchTrailer}
            onPressPrimarybutton={()=>setShowVideoModal(true)}>
            <Image source={icons.playButton} style={styles.playButtonStyle} />
          </Buttons>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.GenresView}>
          <Text style={styles.Genres}> {contant?.genres}</Text>
          <FlatList
            horizontal
             data={movieData?.genres}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.containe}
          />
        </View>
        <View style={styles.overView}>
          <Text style={styles.Genres}> {contant?.Overview}</Text>
          <Text style={styles.OverViewTxt}> {movieData?.overview}</Text>
        </View>
      </ScrollView>
      <Modal
          visible={showVideoModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setShowVideoModal(false);
                setPlaying(false); // Reset playing state when closing the modal
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <View style={styles.videoContainer}>
              <YoutubePlayer
                height={300}
                play={playing}
                videoId={movieTrailler?.results?.[0]?.key}
                onChangeState={onStateChange}
              />
            </View>
          </View>
        </Modal>
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
  Genres: {
    fontFamily: fonts.poppinsMedium,
    fontSize: hp(1.9),
    color:colors.fontColor
  },
  GenresView: {
    marginHorizontal: hp(4.9),
    marginVertical: hp(2.9),
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  containe: {
    padding: 10,
  },
  box: {
    width:hp(8),
    height: hp(3),
    margin: 5,
    borderRadius: hp(1.9),
    alignItems:'center',
    justifyContent:'center'
  },
  text: {
    color: colors.white,
    fontSize: hp(1.3),
    fontFamily:fonts.poppinsSemiBold
  },
  overView:{
    marginHorizontal: hp(4.9),

  },
  OverViewTxt:{
    color:colors.gray,
    fontFamily:fonts.poppinsRegular,
    fontSize:hp(1.4),
    lineHeight:hp(2),
    textAlign:'justify',
    margin:hp(1)
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Adjust opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: hp(5),
    right: wp(5),
    padding: hp(1),
    backgroundColor: colors.red, // Adjust this color to your preference
    borderRadius: 5,
  },
  closeButtonText: {
    color: colors.white,
    fontSize: hp(1.7),
    fontFamily: fonts.poppinsMedium,
  },
  videoContainer:{
    width:'100%'

  }
});
