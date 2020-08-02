import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../Login';
import {WalkThroughScreen} from '../WalkThroughScreen';
import {TabBar} from '../navigationController/TabBar';
import {Filter} from '../home/Filter';
import {ProductDetails} from '../home/ProductDetails';
import {CartView} from '../home/CartView';
import {WishList} from '../home/WishList';
import {OrderDetails} from '../orders/OrderDetails';
import {TrackOrder} from '../orders/TrackOrder';
import {Ledger} from '../profile/Ledger';
import {ScreenNamesCustomer} from './ScreenNames';
import useAsyncStorage from '../customHooks/async';

export const AppCustomerNavigator = () => {
  const Stack = createStackNavigator();
  const {storageItem: accessToken} = useAsyncStorage('@accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // console.log(
  //   'access token,',
  //   accessToken,
  //   accessToken && accessToken.length > 0,
  // );

  useEffect(() => {
    if (accessToken && accessToken.length > 0) setIsLoggedIn(true);
  }, [accessToken]);

  return (
    <Stack.Navigator
      initialRouteName={ScreenNamesCustomer.TABBAR}
      headerMode="none"
      screenOptions={() => ({
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
        backgroundColor: 'transparent',
      }}
      transitionConfig={
        (transitionSpec = {
          duration: 100,
        })
      }>
      {isLoggedIn ? (
        <>
          <Stack.Screen name={ScreenNamesCustomer.TABBAR} component={TabBar} />
          <Stack.Screen name={ScreenNamesCustomer.FILTER} component={Filter} />
          <Stack.Screen
            name={ScreenNamesCustomer.PRODUCTDETAILS}
            component={ProductDetails}
          />
          <Stack.Screen
            name={ScreenNamesCustomer.CARTVIEW}
            component={CartView}
          />
          <Stack.Screen
            name={ScreenNamesCustomer.WISHLIST}
            component={WishList}
          />
          <Stack.Screen
            name={ScreenNamesCustomer.ORDERDETAILS}
            component={OrderDetails}
          />
          <Stack.Screen
            name={ScreenNamesCustomer.TRACKORDER}
            component={TrackOrder}
          />
          <Stack.Screen name={ScreenNamesCustomer.LEDGER} component={Ledger} />
          <Stack.Screen name={ScreenNamesCustomer.LOGIN} component={Login} />
          <Stack.Screen
            name={ScreenNamesCustomer.WALKTHROUGHSCREEN}
            component={WalkThroughScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name={ScreenNamesCustomer.LOGIN} component={Login} />
          <Stack.Screen name={ScreenNamesCustomer.TABBAR} component={TabBar} />
          <Stack.Screen
            name={ScreenNamesCustomer.WALKTHROUGHSCREEN}
            component={WalkThroughScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
