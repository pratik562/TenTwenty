//import liraries
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  View,
  Text,
  Keyboard,
} from 'react-native';
import {colors, contant, fonts, icons} from '../../constants';
import {fetchUpcomingMovies} from '../../helper/apiRequest';
import {hp, wp} from '../../utils/scalling';
import { CommonHeader, SearchableHeader } from '../../components';

const MovieListScreen = ({navigation}) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [resultHeader, setResultHeader] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const upcomingMovieData = await fetchUpcomingMovies();
      setUpcomingMovies(upcomingMovieData.results || []);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
    }
  };

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (!searchVisible) {
      setSearchText('');
    }
  };

  const handleDoneEditing = () => {
    if (searchVisible) {
      setSearchVisible(false);
    }
  };

  const handleDonePress = () => {
    Keyboard.dismiss();
    setResultHeader(!resultHeader)
  };


  const handleSearch = async searchText => {
    if (!searchText.trim()) {
      setSearchResults([]);
      setSearchVisible(false); 
      return;
    }

    const filteredMovies = upcomingMovies.filter(
      movie =>
        movie.title.toLowerCase().includes(searchText.toLowerCase()) ||
        movie.overview.toLowerCase().includes(searchText.toLowerCase()),
    );

    setSearchResults(filteredMovies);
    setSearchVisible(true); // Show search results
  };

  const handleInputChange = text => {
    setSearchText(text);
    handleSearch(text);
  };

console.log('searchResults',searchResults)
  return (
    <SafeAreaView style={styles.container}>
     {resultHeader 
     ? <CommonHeader showBackButton title={`${searchResults?.length} ${contant.resultFound}`} onBackPress={()=>{setResultHeader(!resultHeader)}}/> : <SearchableHeader
        value={searchText}
        onChangeText={handleInputChange}
        onBlur={handleDoneEditing}
        toggleSearch={toggleSearch}
        searchVisible={searchVisible}
        onSubmitEditing={handleDonePress}
      />
      }

      <View style={{flex: 1, alignItems: 'center'}}>
        {searchResults?.length != 0  ? (
        <View>
            {searchResults?.length ? 
             <Text style={styles.topResult}>{contant.topResult}</Text>:<></>
            }
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={searchResults}
            style={{ flex:1,}}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.searchResultContainer}
                  onPress={() => {
                    navigation.navigate('MovieDetail', { movie: item })
                  }}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                    style={styles.bannerImage1}
                  />
                  <View style={styles.searchResultText}>
                    <Text numberOfLines={1}
                      style={[
                        styles.bannerMovieName,
                        {
                          color: colors.fontColor,
                          fontSize: hp(1.6),
                          marginHorizontal: hp(1),
                          margin: 0,
                        },
                      ]}>
                      {item.title}
                    </Text>
                    <Text style={styles.category}>crime</Text>
                  </View>
                  <Image source={icons.threedot} style={styles.threedotIcon} />
                </TouchableOpacity>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />
        </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={upcomingMovies.slice(0, 5)}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                    navigation.navigate('MovieDetail', { movie: item })
                }}>
                <View style={styles.bannerContainer}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                    style={styles.bannerImage}
                  />
                  <View style={styles.shadowOverlay} />
                  <View style={styles.bannerTextContainer}>
                    <Text  style={styles.bannerMovieName}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dullwhite,
  },
  topResult:{
    fontFamily:fonts.poppinsRegular,
    fontSize:hp(1.4),
    margin:hp(1.2),
    borderBottomWidth:1,
    borderColor:"rgba(0, 0, 0, 0.11)",
    paddingBottom:hp(1.2)

},

  //-- bottom flatlist
  bannerContainer: {
    height: hp(22),
    width: hp(41),
    borderRadius: 15,
    marginHorizontal: hp(1),
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: 'yellow',
    marginVertical: hp(1),
  },
  bannerImage: {
    height: hp(22),
    width: hp(41),
    resizeMode: 'cover',
    aspectRatio: 1,
    borderRadius: hp(1.2),
  },
  shadowOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerTextContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bannerMovieName: {
    color: colors.white,
    fontSize: hp(2),
    fontFamily: fonts.poppinsRegular,
    margin: hp(1),
  },
  category: {
    color: colors.dullGrayfont,
    fontSize: hp(1.4),
    fontFamily: fonts.poppinsRegular,
    marginHorizontal: hp(1),
  },

  threedotIcon: {
    height: hp(0.5),
    width: hp(2.4),
  },
  searchResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: hp(2),
    marginBottom: hp(1),
    padding: hp(1),
    justifyContent:'space-between',
    width:wp(90)
    
  },
  searchResultText: {
    marginHorizontal: hp(1),
    flex:1,
    
  },
  bannerImage1: {
    height: hp(12),
    width: hp(16),
    resizeMode:'cover',
    borderRadius: hp(1.2),
  },
});
