//import liraries
import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { colors, fonts } from '../../constants';
import SearchableHeader from '../../components/SearchableHeader';

// create a component
const MovieListScreen
 = () => {
    return (
        <SafeAreaView style={styles.container}>
            <SearchableHeader/>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dullwhite,
    },
});

export default MovieListScreen
;
