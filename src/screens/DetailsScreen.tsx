import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
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
      <Image source={item.src} resizeMode="cover" style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{item.text}</Text>
      </View>
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
