import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Animated,
  PanResponder,
  View,
  Dimensions,
} from 'react-native';
import {EMPTY_CARD_DATA, type CARD_DATA_TYPE} from '../constant';
import Card from './Card';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;
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
  const swipePosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const valueOfScale = useRef(new Animated.Value(0)).current;
  const valueOfRotate = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, {dx: swipePosition.x, dy: swipePosition.y}],
        {useNativeDriver: false},
      ),
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const resetPosition = () => {
    Animated.spring(swipePosition, {
      toValue: {x: 0, y: 0},
      useNativeDriver: false,
    }).start();
  };

  const forceSwipe = (direction: string) => {
    const x =
      direction === 'right' ? SCREEN_WIDTH * 1.25 : -SCREEN_WIDTH * 1.25;
    Animated.timing(swipePosition, {
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  };

  const onSwipeComplete = (direction: string) => {
    const item = data[index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

    handleAnimated(() => {
      swipePosition.setValue({x: 0, y: 0});
      valueOfScale.setValue(0);
      valueOfRotate.setValue(0);
      setIndex(prevIndex => prevIndex + 1);
    });
  };

  const handleAnimated = (callback: () => void) => {
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

  const frontCardStyle = () => {
    const rotate = swipePosition.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });

    return {
      transform: [
        {translateX: swipePosition.x},
        {translateY: swipePosition.y},
        {rotate},
      ],
      // ...swipePosition.getLayout(),
      // transform: [{rotate}],
    };
  };

  const backgroundCardStyle = (cardIndex: number) => {
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

        if (i === index) {
          return (
            <Animated.View
              key={card.id}
              style={[styles.cardStyle, frontCardStyle()]}
              {...panResponder.panHandlers}>
              <Card item={card} onPress={() => {}} />
            </Animated.View>
          );
        }

        return (
          <Animated.View
            key={card.id}
            style={[styles.cardStyle, backgroundCardStyle(i)]}>
            <Card item={card} onPress={() => {}} />
          </Animated.View>
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
  cardStyle: {
    flex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});

export default Deck;
