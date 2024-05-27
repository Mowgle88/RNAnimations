import React, {useMemo} from 'react';
import {StyleSheet, Dimensions, View, Text, Image, Button} from 'react-native';
import {type CARD_DATA_TYPE} from '../constant';
import {getRandomColor} from '../utils/randomColor';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface CardProps {
  item: CARD_DATA_TYPE;
  onPress: (color: string) => void;
}

const Card: React.FC<CardProps> = ({item, onPress}) => {
  const backgroundColor = useMemo(() => getRandomColor(), []);

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={styles.title}>{item.title}</Text>
      {item.src && (
        <Image source={item.src} resizeMode="cover" style={styles.image} />
      )}
      <Text style={styles.subtitle} numberOfLines={2}>
        {item.text}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title={`${item.button}`}
          onPress={() => onPress(backgroundColor)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  title: {
    margin: 16,
    fontSize: 20,
    color: '#233035',
  },
  image: {
    width: SCREEN_WIDTH - 68,
    height: SCREEN_WIDTH - 68,
    borderRadius: 12,
    marginBottom: 16,
  },
  subtitle: {
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#233035',
  },
  buttonContainer: {
    marginVertical: 16,
  },
});

export default Card;
