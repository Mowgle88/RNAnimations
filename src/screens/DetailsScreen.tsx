import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Animated, {FadeInLeft} from 'react-native-reanimated';
import {DetailsScreenRouteProp} from '../navigation/types';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProp>();
  const item = route?.params;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: item.title,
      headerStyle: {
        backgroundColor: item.color,
      },
    });
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: item.color}]}>
      <Animated.Image
        sharedTransitionTag={`${item.id}`}
        source={item.src}
        style={styles.image}
      />
      <Animated.View
        style={styles.textContainer}
        entering={FadeInLeft.duration(400).delay(500)}>
        <Text style={styles.text}>{item.text}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
    borderRadius: 0,
  },
  textContainer: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#233035',
    textAlign: 'justify',
  },
});

export default DetailsScreen;
