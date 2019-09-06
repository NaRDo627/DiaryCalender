import React from 'react';
import {
    Text
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from './HomeScreen';
import InputScreen from './InputScreen';

const AppStack = createStackNavigator(
    {
        HomeScreen: HomeScreen,
        InputScreen: InputScreen,
    },
    {
        initialRouteName: "HomeScreen"
    }
);

export default createAppContainer(AppStack);
