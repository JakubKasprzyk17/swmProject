import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArtistDetails, ArtworkDetails } from '_screens';
import { StackNavigatorParamsList, StackRoutes } from '_types';
import React from 'react';

import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator<StackNavigatorParamsList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={StackRoutes.BottomRoutes}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={StackRoutes.BottomRoutes}
        component={BottomNavigator}
      />
      <Stack.Screen
        name={StackRoutes.ArtworkDetails}
        component={ArtworkDetails}
      />
      <Stack.Screen
        name={StackRoutes.ArtistDetails}
        component={ArtistDetails}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
