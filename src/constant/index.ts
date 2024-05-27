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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. A cras semper auctor neque vitae tempus quam pellentesque nec. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Faucibus vitae aliquet nec ullamcorper sit amet risus.',
    src: require('../assets/adam-stevens-lqDEC0RaYGk-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 2,
    title: 'Card #2',
    text: 'Ultrices neque ornare aenean euismod elementum nisi quis. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Pharetra convallis posuere morbi leo urna molestie at elementum eu. Tristique nulla aliquet enim tortor at auctor urna. Dui sapien eget mi proin sed libero enim sed faucibus. Nisi est sit amet facilisis magna etiam tempor. Euismod in pellentesque massa placerat duis. Facilisis mauris sit amet massa vitae tortor condimentum.!',
    src: require('../assets/clement-souchet-MT15ScxysK0-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 3,
    title: 'Card #3',
    text: 'Eu augue ut lectus arcu. Ut eu sem integer vitae justo eget magna fermentum. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Amet porttitor eget dolor morbi non arcu risus quis. Ut diam quam nulla porttitor massa id neque aliquam. Viverra maecenas accumsan lacus vel facilisis volutpat. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt. Malesuada fames ac turpis egestas',
    src: require('../assets/jack-millard-zjyP-UYI-ko-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 4,
    title: 'Card #4',
    text: 'Viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Mattis enim ut tellus elementum sagittis vitae et leo. Viverra nibh cras pulvinar mattis nunc sed blandit libero volutpat. Fusce ut placerat orci nulla pellentesque dignissim enim. A iaculis at erat pellentesque adipiscing. Gravida rutrum quisque non tellus orci ac auctor',
    src: require('../assets/jeremy-bishop-dvACrXUExLs-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 5,
    title: 'Card #5',
    text: 'Volutpat ac tincidunt vitae semper quis lectus. Parturient montes nascetur ridiculus mus mauris vitae. Vitae turpis massa sed elementum tempus egestas. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Convallis posuere morbi leo urna molestie at elementum. Convallis convallis tellus id interdum velit laoreet id donec ultrices. Sed arcu non odio euismod lacinia at quis. Laoreet sit amet cursus sit.',
    src: require('../assets/melina-kiefer-U7gbwg2fjCs-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 6,
    title: 'Card #6',
    text: 'Faucibus nisl tincidunt eget nullam. Donec et odio pellentesque diam volutpat. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros. Mattis nunc sed blandit libero volutpat sed. Sed arcu non odio euismod lacinia at quis. Egestas sed sed risus pretium quam vulputate dignissim. Nunc vel risus commodo viverra maecenas accumsan lacus vel. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Ut venenatis tellus in metus vulputate eu scelerisque felis. Eget lorem dolor sed viverra ipsum nunc aliquet. ',
    src: require('../assets/patrick-EvMearrxas4-unsplash.jpg'),
    button: 'VIEW NOW',
  },
  {
    id: 7,
    title: 'Card #7',
    text: 'Odio eu feugiat pretium nibh ipsum. Suspendisse potenti nullam ac tortor. Nibh tortor id aliquet lectus proin nibh nisl condimentum. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Nibh ipsum consequat nisl vel pretium lectus',
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
