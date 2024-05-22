import React from 'react';
import {StyleSheet, View} from 'react-native';
import Deck from './components/Deck';
import {CARDS_DATA} from './constant';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Deck data={CARDS_DATA} onSwipeLeft={() => {}} onSwipeRight={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
