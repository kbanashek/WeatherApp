import React, {PureComponent} from 'react';
import {StatusBar, View} from 'react-native';
import AppNavigator from '../navigation/AppNavigator';

export default class RootContainer extends PureComponent {
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <AppNavigator />
      </View>
    );
  }
}
