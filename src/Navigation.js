import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'
import InputScreen from './screens/InputScreen'
import ResultScreen from './screens/ResultScreen'
import FeaturedScreen from './screens/FeaturedScreen'
import OpenVideo from './screens/OpenVideo';

console.disableYellowBox = true

export default class Navigation extends Component {
  render() {
    return (
      <Navigator />
    );
  }
}

const StackNavigator = createStackNavigator({
  InputScreen: InputScreen,
  ResultScreen: ResultScreen,
  FeaturedScreen: FeaturedScreen,
  OpenVideo: OpenVideo
})

const Navigator = createAppContainer(StackNavigator)

