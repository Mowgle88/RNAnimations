import React, {useRef, useState} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {EMPTY_CARD_DATA, type CARD_DATA_TYPE} from '../constant';
import Card from './Card';
import SwipebleView from './SwipebleView';

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
    Animated.parallel([
      Animated.timing(valueOfScale, {
        toValue: 1,
        useNativeDriver: false,
        duration: SECOND_CARD_ANIMATION_DURATION,
      }),
      Animated.timing(valueOfRotate, {
        toValue: 1,
        useNativeDriver: false,
        duration: SECOND_CARD_ANIMATION_DURATION,
      }),
    ]).start(callback);
  };

  const backgroundItemStyle = (cardIndex: number) => {
    const currrentRotate = `${5 * cardIndex}deg`;
    const isSecondCard = cardIndex - index === 1;

    const rotate = isSecondCard
      ? valueOfRotate.interpolate({
          inputRange: [0, 1],
          outputRange: [`${currrentRotate}`, '0deg'],
        })
      : currrentRotate;

    const scale = isSecondCard
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
            onSwipeComplete={onSwipeComplete}
            disabled={i !== index}
            containerStyle={backgroundItemStyle(i)}>
            <Card item={card} onPress={() => {}} />
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
