import { NavigatorScreenParams } from '@react-navigation/native';

export enum StackRoutes {
  BottomRoutes = 'BottomRoutes',
  ArtworkDetails = 'ArtworkDetails',
  ArtistDetails = 'ArtistDetails',
}

export enum BottomRoutes {
  Explore = 'Explore',
  Search = 'Search',
  Favourite = 'Favourite',
}

export type StackNavigatorParamsList = {
  [StackRoutes.BottomRoutes]: NavigatorScreenParams<BottomNavigatorParamsList>;
  [StackRoutes.ArtworkDetails]: { id: number };
  [StackRoutes.ArtistDetails]: { id: number };
};

export type BottomNavigatorParamsList = {
  [BottomRoutes.Explore]: undefined;
  [BottomRoutes.Search]: undefined;
  [BottomRoutes.Favourite]: undefined;
};
