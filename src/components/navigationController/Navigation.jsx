import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../Login';

import {
  ScreenNamesCustomer,
} from './ScreenNames';

export const AppCustomerNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={ScreenNamesCustomer.LOGIN}
      headerMode='none'
      screenOptions={({ route, navigation }) => ({
        headerShown: false,
        gestureEnabled: false,
        // cardOverlayEnabled: true,
        // headerStatusBarHeight:
        //   navigation.dangerouslyGetState().routes.indexOf(route) > 0
        //     ? 0
        //     : undefined,
        // ...TransitionPresets.ModalPresentationIOS,
      })}
      cardStyle={{
        backgroundColor: 'transparent'
      }}
      transitionConfig={
        transitionSpec = {
          duration: 100,
        }
      }
    >
      <Stack.Screen name={ScreenNamesCustomer.LOGIN} component={Login} />
    </Stack.Navigator >
  );
};
