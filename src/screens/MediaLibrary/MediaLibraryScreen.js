//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../constants';

// create a component
const MediaLibraryScreen = () => {
    return (
        <View style={styles.container}>
            <Text>MediaLibraryScreen</Text>
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
export default MediaLibraryScreen;
