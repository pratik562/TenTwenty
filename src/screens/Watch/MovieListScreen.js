//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants';

// create a component
const MovieListScreen
 = () => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize:20,fontFamily:fonts.poppinsRegular}}>MovieListScreen</Text>
            <Text style={{fontSize:20,fontFamily:fonts.poppinsBold}}>MovieListScreen</Text>
            <Text style={{fontSize:20,fontFamily:fonts.poppinsMedium}}>MovieListScreen</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
});

//make this component available to the app
export default MovieListScreen
;
