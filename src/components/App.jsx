/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {AppCustomerNavigator} from './navigationController/Navigation';
import {ShoppingCartProvider} from './context/ShoppingCart';
import React from 'react';

const App = () => {
  return (
    <ShoppingCartProvider>
      <NavigationContainer>
        <AppCustomerNavigator />
      </NavigationContainer>
    </ShoppingCartProvider>
  );
};

export default App;
