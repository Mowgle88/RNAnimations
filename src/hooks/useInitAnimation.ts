import {useEffect, useRef, useState} from 'react';
import {Animated, Dimensions} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const INIT_POSITION = SCREEN_WIDTH / 2;
const INIT_ANIMATION_DURATION = 400;

export const useInitAnimation = (index: number, length: number) => {
  const [loading, setLoading] = useState(true);

  const initPosition = useRef(new Animated.Value(-INIT_POSITION)).current;
  const initScale = useRef(new Animated.Value(0)).current;
  const initRotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startInitAnimate = () => {
      const config = {
        toValue: 1,
        useNativeDriver: false,
        duration: INIT_ANIMATION_DURATION,
        delay: (length - index) * 250,
      };

      Animated.parallel([
        Animated.timing(initPosition, config),
        Animated.timing(initScale, config),
        Animated.timing(initRotate, config),
      ]).start(() => {
        setLoading(false);
      });
    };
    startInitAnimate();
  }, []);

  const initAnimationStyle = () => {
    const currrentRotate = `${5 * index!}deg`;

    const translateX = initPosition.interpolate({
      inputRange: [1, INIT_POSITION / 2],
      outputRange: [0, INIT_POSITION],
    });
    const scale = initScale.interpolate({
      inputRange: [0, 1],
      outputRange: [1.5, index === 0 ? 1 : 0.9],
    });
    const rotate = initRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', `${currrentRotate}`],
    });

    return {
      transform: [{rotate}, {scale}, {translateX}],
    };
  };

  return {
    loading,
    initAnimationStyle,
  };
};
