import React, {ReactNode, useRef} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface SlidingViewProps {
  children: ReactNode;
  onSwipeComplete?: (direction: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const SwipebleView: React.FC<SlidingViewProps> = ({
  children,
  onSwipeComplete = () => {},
  containerStyle,
  disabled = false,
}) => {
  const swipePosition = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

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

  const swipeStyle = () => {
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

  if (disabled) {
    return (
      <Animated.View style={[styles.container, containerStyle]}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[styles.container, swipeStyle()]}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: SCREEN_WIDTH,
  },
});

export default SwipebleView;
