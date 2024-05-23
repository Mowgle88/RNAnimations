import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Root from './navigation/Root';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Root />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
