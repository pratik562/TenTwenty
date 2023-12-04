import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {Buttons, CommonHeader} from '../../components';
import {colors, contant, fonts} from '../../constants';
import {hp} from '../../utils/scalling';
import {formatDate} from '../../utils/globalFunctions';
import {cinemaHalls} from '../../helper/dummyData';

const BookingScreen = ({route, navigation}) => {
  const movieDetails = route.params?.movieData;

  const [selectedDate, setSelectedDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedHall, setSelectedHall] = useState(null);

  useEffect(() => {
    const initialDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      initialDates.push(date);
    }
    setDates(initialDates);
    setSelectedDate(new Date());
  }, []);

  const handleDatePress = date => {
    setSelectedDate(date);
  };


  const handleSelectSeats = () => {
    const bookingDetails = {
      selectedDate:selectedDate,
      selectedHall:selectedHall,
      movieDetails:movieDetails
    }
    if (selectedDate && selectedHall) {
      // Navigate to SelectSeatScreen with the selected data
      navigation.navigate('SelectSeat', { bookingDetails :bookingDetails});
    } else {
      // Show an alert or perform some action to prompt the user to select both date and hall
      alert('Please select both date and hall');
    }
  };

  const renderDateItem = ({item}) => {
    const isSelected =
      selectedDate && item.getTime() === selectedDate.getTime();
    const monthAbbreviation = item.toLocaleString('default', {month: 'short'});
    return (
      <TouchableOpacity
        style={[
          styles.box,
          {
            backgroundColor: isSelected
              ? colors.lightBlue
              : colors.transparntGray,
            shadowColor: isSelected && colors.black,
            shadowOffset: isSelected && {width: 0, height: 2},
            shadowOpacity: isSelected && 0.3,
            shadowRadius: isSelected && 2,
          },
        ]}
        onPress={() => handleDatePress(item)}>
        <Text
          style={{
            color: isSelected ? colors.white : colors.darkGray,
            fontFamily: fonts.poppinsMedium,
          }}>
          {item.getDate()} {monthAbbreviation}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHallItem = ({item}) => {
    const isSelected = selectedHall && selectedHall.id === item.id;
    return (
      <View>
        <View style={{flexDirection: 'row', marginVertical: hp(1)}}>
          <Text style={styles.hallName}>{item?.time}</Text>
          <Text
            style={[
              styles.hallName,
              {fontFamily: fonts.poppinsRegular, color: colors.dullGrayfont},
            ]}>
            {item?.name}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.hallItem,
            {borderColor: isSelected ? colors.lightBlue : colors.borderColor},
          ]}
          onPress={() => setSelectedHall(item)}>
          <Image source={item.hall} style={styles.hallImage} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginVertical: hp(1)}}>
          <Text style={styles.hallName}>
            <Text  style={styles.hallPrise}>From </Text>
             {item?.price}</Text>
             <Text style={styles.hallName}>
            <Text  style={styles.hallPrise}>or </Text>
             {item?.bonus}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{marginTop: Platform.OS == 'ios' ? hp(3) : hp(0)}}>
        <CommonHeader
          showBackButton
          onBackPress={() => navigation.goBack()}
          title={movieDetails?.title}
          titleContainerStyle={styles.titleContainerStyle}
          headerContainer={{borderBottomWidth:1}}
          secodaryTitle={
            contant.realeseDate + formatDate(movieDetails?.release_date)
          }
        />
      </View>
      <View style={{flex: 1}}>
        <View style={styles.dateView}>
          <Text style={styles.dateText}>{contant?.date}</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            bounces={false}
            horizontal
            data={dates}
            renderItem={renderDateItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.dateButtonsContainer}
          />
        </View>
        <FlatList
        showsHorizontalScrollIndicator={false}
        bounces={false}
          data={cinemaHalls}
          renderItem={renderHallItem}
          keyExtractor={item => item.id.toString()}
          horizontal
          contentContainerStyle={styles.hallList}
        />
      </View>
      <Buttons type={'secondary'} secondaryTxt={contant.SelectSeats}  onPressSecondarybutton={handleSelectSeats}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  box: {
    width: hp(9),
    height: hp(4),
    marginRight: hp(1),
    borderRadius: hp(1.2),
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow properties for iOS
  },
  dateText: {
    fontFamily: fonts.poppinsRegular,
    fontSize: hp(1.9),
    color:colors.fontColor
  },
  dateView: {
    marginHorizontal: hp(4.9),
    marginVertical: hp(2.9),
  },
  dateButtonsContainer: {
    paddingVertical: 5,
  },
  titleContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    marginLeft:Platform.OS == 'android' ? hp(-4) : hp(0)
  },
  //=====
  hallList: {
    marginHorizontal: hp(4.9),
    marginVertical: hp(2.9),
  },
  hallItem: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
    height: hp(20),
    width: hp(30),
    marginRight: hp(2),
    justifyContent: 'center',
  },
  hallImage: {
    height: hp(15),
    width: hp(30),
    resizeMode: 'contain',
    marginBottom: 8,
  },

  hallName: {
    marginRight: hp(1),
    fontFamily: fonts.poppinsSemiBold,
    color: colors.fontColor,
  },
  hallPrise: {
    marginRight: hp(1),
    fontFamily: fonts.poppinsRegular, 
    color: colors.dullGrayfont
  },
});

export default BookingScreen;
