import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ImageSourcePropType} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Details: {
    id: number;
    title: string;
    text: string;
    src?: ImageSourcePropType | undefined;
    color: string;
  };
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Details'
>;

export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
