import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Colors } from '_styles';
import { BottomNavigatorParamsList, BottomRoutes } from '_types';
import React from 'react';

const Tab = createBottomTabNavigator<BottomNavigatorParamsList>();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={BottomRoutes.Explore}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={BottomRoutes.Explore}
        component={() => <></>}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="explore"
              size={25}
              color={focused ? Colors.BLACK : Colors.GREY}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomRoutes.Search}
        component={() => <></>}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="search"
              size={25}
              color={focused ? Colors.BLACK : Colors.GREY}
            />
          ),
        }}
      />
      <Tab.Screen
        name={BottomRoutes.Favourite}
        component={() => <></>}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="heart"
              size={25}
              color={focused ? Colors.BLACK : Colors.GREY}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
