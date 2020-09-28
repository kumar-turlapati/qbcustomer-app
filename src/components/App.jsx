import {NavigationContainer} from '@react-navigation/native';
import {AppCustomerNavigator} from './navigationController/Navigation';
import {ShoppingCartProvider} from './context/ShoppingCart';
import React from 'react';
import codePush from 'react-native-code-push';

if (__DEV__) {
  import('../../ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <NavigationContainer>
        <AppCustomerNavigator />
      </NavigationContainer>
    </ShoppingCartProvider>
  );
};

export default codePush(App);
