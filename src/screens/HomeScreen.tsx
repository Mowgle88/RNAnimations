import React from 'react';
import {StyleSheet, View} from 'react-native';
import Deck from '../components/Deck';
import {CARDS_DATA} from '../constant';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Deck data={CARDS_DATA} onSwipeLeft={() => {}} onSwipeRight={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
