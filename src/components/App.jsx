import { NavigationContainer } from '@react-navigation/native';
import { AppCustomerNavigator } from './navigationController/Navigation';
import { ShoppingCartProvider } from './context/ShoppingCart';
import React from 'react';
import codePush from 'react-native-code-push';

if (__DEV__) {
  import('../../ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const options = {
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
};

const App = () => {
  return (
    <ShoppingCartProvider>
      <NavigationContainer>
        <AppCustomerNavigator />
      </NavigationContainer>
    </ShoppingCartProvider>
  );
};

export default codePush(options)(App);
