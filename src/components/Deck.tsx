import React, {useRef, useState} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {EMPTY_CARD_DATA, type CARD_DATA_TYPE} from '../constant';
import Card from './Card';
import SwipebleView from './SwipebleView';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';

const SECOND_CARD_ANIMATION_DURATION = 400;

interface DeckProps {
  data: CARD_DATA_TYPE[];
  onSwipeRight: (card: CARD_DATA_TYPE) => void;
  onSwipeLeft: (card: CARD_DATA_TYPE) => void;
}

const Deck: React.FC<DeckProps> = ({
  data,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [index, setIndex] = useState(0);

  const currentData = useRef(data);
  const valueOfScale = useRef(new Animated.Value(0)).current;
  const valueOfRotate = useRef(new Animated.Value(0)).current;

  const onSwipeComplete = (direction: string) => {
    const item = data[index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    animateSecondCard(() => {
      valueOfScale.setValue(0);
      valueOfRotate.setValue(0);
      setIndex(prevIndex => prevIndex + 1);
    });
  };

  const animateSecondCard = (callback: () => void) => {
    const config = {
      toValue: 1,
      useNativeDriver: true,
      duration: SECOND_CARD_ANIMATION_DURATION,
    };

    Animated.parallel([
      Animated.timing(valueOfScale, config),
      Animated.timing(valueOfRotate, config),
    ]).start(callback);
  };

  const backgroundItemStyle = (itemIndex: number) => {
    const currrentRotate = `${5 * itemIndex}deg`;
    const isSecondItem = itemIndex - index === 1;

    const rotate = isSecondItem
      ? valueOfRotate.interpolate({
          inputRange: [0, 1],
          outputRange: [`${currrentRotate}`, '0deg'],
        })
      : currrentRotate;

    const scale = isSecondItem
      ? valueOfScale.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        })
      : 0.9;

    return {
      transform: [{scale}, {rotate}],
    };
  };

  const renderCards = () => {
    if (index >= data.length) {
      return renderNoMoreCards();
    }
    return currentData.current
      .map((card, i) => {
        if (i < index) {
          return null;
        }

        return (
          <SwipebleView
            key={card.id}
            index={i}
            length={data.length}
            onSwipeComplete={onSwipeComplete}
            disabled={i !== index}
            containerStyle={backgroundItemStyle(i)}>
            <Card
              item={card}
              onPress={(color: string) => {
                navigation.navigate('Details', {
                  color: color,
                  id: card.id,
                  title: card.title,
                  text: card.text,
                  src: card.src,
                });
              }}
            />
          </SwipebleView>
        );
      })
      .reverse();
  };

  const renderNoMoreCards = () => {
    return (
      <Card
        item={EMPTY_CARD_DATA}
        onPress={() => {
          currentData.current = [...data];
          setIndex(0);
        }}
      />
    );
  };

  return <View style={styles.container}>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Deck;
