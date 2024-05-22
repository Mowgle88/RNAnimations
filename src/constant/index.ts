import {ImageSourcePropType} from 'react-native';

export type CARD_DATA_TYPE = {
  id: number;
  title: string;
  text: string;
  src?: ImageSourcePropType;
  button: string;
};

export const CARDS_DATA: CARD_DATA_TYPE[] = [
  {
    id: 1,
    title: 'Card #1',
    text: 'I can customize the Card further!',
    src: require('../assets/adam-stevens-lqDEC0RaYGk-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 2,
    title: 'Card #2',
    text: 'I can customize the Card further!',
    src: require('../assets/clement-souchet-MT15ScxysK0-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 3,
    title: 'Card #3',
    text: 'I can customize the Card further!',
    src: require('../assets/jack-millard-zjyP-UYI-ko-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 4,
    title: 'Card #4',
    text: 'I can customize the Card further!',
    src: require('../assets/jeremy-bishop-dvACrXUExLs-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 5,
    title: 'Card #5',
    text: 'I can customize the Card further!',
    src: require('../assets/melina-kiefer-U7gbwg2fjCs-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 6,
    title: 'Card #6',
    text: 'I can customize the Card further!',
    src: require('../assets/patrick-EvMearrxas4-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 7,
    title: 'Card #7',
    text: 'I can customize the Card further!',
    src: require('../assets/pigoff-photography-zSGFGTed0zw-unsplash.jpg'),
    button: 'VIEW NOW',
  },
];

export const EMPTY_CARD_DATA = {
  id: 1,
  title: 'All Done',
  text: 'There is no more content here!',
  button: 'SHOW MORE',
};
