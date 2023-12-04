import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {colors, contant, fonts, icons} from '../../constants';
import {Buttons, CommonHeader} from '../../components';
import {hp, wp} from '../../utils/scalling';
import {formatDate} from '../../utils/globalFunctions';

const SelectSeatScreen = ({navigation, route}) => {
  const {bookingDetails} = route?.params;
  const [scale, setScale] = useState(1);

  console.log('bookingDetails', bookingDetails);

  const dummyDataSeatting = [
    {
      id: 1,
      icon: require('../../../assets/icons/vip.png'),
      status: 'VIP',
      price: '150$',
    },
    {
      id: 2,
      icon: require('../../../assets/icons/Notavailable.png'),
      status: 'Not available',
    },
    {
      id: 3,
      icon: require('../../../assets/icons/regular.png'),
      status: 'Regular',
      price: bookingDetails?.selectedHall?.price,
    },
    {
      id: 4,
      icon: require('../../../assets/icons/selected.png'),
      status: 'Selected',
    },
  ];
  const zoomIn = () => {
    setScale(scale + 0.1);
  };

  const zoomOut = () => {
    setScale(scale - 0.1);
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Image source={item.icon} style={styles.icon} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.itemText}>{item.status}</Text>
        {item.price && <Text style={styles.priceText}>({item.price})</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: Platform.OS == 'ios' ? hp(3) : hp(0)}}>
        <CommonHeader
          showBackButton
          onBackPress={() => navigation.goBack()}
          title={bookingDetails?.movieDetails?.title}
          titleContainerStyle={styles.titleContainerStyle}
          secodaryTitle={
            'Release Date: ' +
            formatDate(bookingDetails?.movieDetails?.release_date)
          }
          headerContainer={{borderBottomWidth: 1}}
        />
      </View>
      <ScrollView
      style={{marginBottom:hp(7),backgroundColor:'red'}}
        contentContainerStyle={styles.imageContainer}
        maximumZoomScale={4}
        minimumZoomScale={1}
        centerContent
        pinchGestureEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageWrapper}>
          <Image
            source={bookingDetails?.selectedHall?.hall}
            style={[styles.image, {transform: [{scale}]}]}
            resizeMode="contain"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={zoomIn}>
            <Image source={icons.add} style={styles.zoomicons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={zoomOut}>
            <Image source={icons.minus} style={styles.zoomicons} />
          </TouchableOpacity>
        </View>
        <View style={styles.brekerBorder} />
      </ScrollView>
      <View>
      <FlatList
        data={dummyDataSeatting}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />
      <TouchableOpacity
        style={styles.selectedseat}>
        <Text style={{color:colors.fontColor}}>4 /</Text>
        <Text style={styles.itemText}>3 row</Text>
        <Image source={icons.close} style={{height: hp(2), width: hp(2)}} />
      </TouchableOpacity>
      <View style={{flexDirection:'row',backgroundColor:colors.white,marginVertical:hp(2.5)}}>
        <TouchableOpacity style={styles.totalPrice}>
            <Text style={styles.itemText}>{contant.TotalPrice}</Text>
            <Text  style={{color:colors.fontColor}}>{ bookingDetails?.selectedHall?.price}</Text>
        </TouchableOpacity>
        <Buttons SecondaryViewStyle={{flex:1}} type={'secondary'} secondaryTxt={contant.Proceedtopay}  onPressSecondarybutton={()=>{}}/>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dullwhite,
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: hp(100),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    margin: hp(1),
  },
  button: {
    width: hp(5),
    height: hp(5),
    borderRadius: hp(2.5),
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: hp(1),
  },
  buttonText: {
    fontSize: hp(2),
    color: colors.white,
  },
  titleContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft:Platform.OS == 'android' ? hp(-4) : hp(0)
  },
  zoomicons: {
    height: hp(3.5),
    width: hp(3.5),
    margin: hp(0.5),
  },
  brekerBorder: {
    borderWidth: 2,
    width: wp(80),
    borderRadius: hp(0.2),
    borderColor: colors.fontColor,
    marginVertical: hp(1),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: hp(1),
    paddingHorizontal: hp(2),
    width: wp(35),
  },
  icon: {
    width: hp(2.9),
    height: hp(2.8),
    marginRight: 10,
  },
  itemText: {
    fontSize: hp(1.2),
    fontFamily: fonts.poppinsRegular,
    color: colors.gray,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  priceText: {
    fontSize: hp(1.2),
    fontFamily: fonts.poppinsRegular,
    color: colors.gray,
  },
  selectedseat:{
    flexDirection: 'row',
    width: hp(11),
    height: hp(3.6),
    backgroundColor: colors.transparntGray,
    borderRadius: 10,
    alignItems:'center',justifyContent:'space-between',paddingHorizontal:hp(1),
    margin:hp(3.8)
  },
  totalPrice:{
    marginHorizontal: hp(2.4),
    height: hp(5.9),
    backgroundColor: colors.transparntGray,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: hp(1.1),
    paddingHorizontal: hp(2),
  }
});

export default SelectSeatScreen;
