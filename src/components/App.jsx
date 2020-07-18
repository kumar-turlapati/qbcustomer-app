/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {AppCustomerNavigator} from './navigationController/Navigation';
import React from 'react';

const App = () => {
  return (
    <NavigationContainer>
      <AppCustomerNavigator />
    </NavigationContainer>
  );
};

export default App;
