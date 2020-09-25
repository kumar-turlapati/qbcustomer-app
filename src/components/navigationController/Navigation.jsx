import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../Login';
import {WalkThroughScreen} from '../WalkThroughScreen';
import {TabBar} from '../navigationController/TabBar';
import {Filter} from '../home/Filter';
import {ProductDetails} from '../home/ProductDetails';
import {ProductDetailsFromSearch} from '../home/ProductDetailsFromSearch';
import {CartView} from '../home/CartView';
import {WishList} from '../home/WishList';
import {OrderDetails} from '../orders/OrderDetails';
import {ProductWebView} from '../home/ProductWebView';
import {TrackOrder} from '../orders/TrackOrder';
import {ViewInvoice} from '../orders/ViewInvoice';
import {Ledger} from '../profile/Ledger';
import {ScreenNamesCustomer} from './ScreenNames';
import useAsyncStorage from '../customHooks/async';
import {Loader} from '../Loader';
import {ShowBrands} from '../home/ShowBrands';
import {NewHome} from '../home/NewHome';
import {HomeCatalogs} from '../home/HomeCataogs';

export const AppCustomerNavigator = () => {
  const Stack = createStackNavigator();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const {storageItem: accessToken, tokenLoading} = useAsyncStorage(
    '@accessToken',
  );

  useEffect(() => {
    if (accessToken && accessToken.length > 0) setIsUserLoggedIn(true);
  }, [accessToken]);

  return tokenLoading ? (
    <Loader />
  ) : (
    <Stack.Navigator
      initialRouteName={
        !tokenLoading
          ? isUserLoggedIn
            ? ScreenNamesCustomer.TABBAR
            : ScreenNamesCustomer.LOGIN
          : null
      }
      headerMode="none"
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}
      cardStyle={{
        backgroundColor: 'transparent',
      }}
      transitionConfig={
        (transitionSpec = {
          duration: 100,
        })
      }>
      <Stack.Screen name={ScreenNamesCustomer.LOGIN} component={Login} />
      <Stack.Screen
        name={ScreenNamesCustomer.WALKTHROUGHSCREEN}
        component={WalkThroughScreen}
      />
      <Stack.Screen name={ScreenNamesCustomer.TABBAR} component={TabBar} />
      <Stack.Screen name={ScreenNamesCustomer.FILTER} component={Filter} />
      <Stack.Screen
        name={ScreenNamesCustomer.PRODUCTDETAILS}
        component={ProductDetails}
      />
      <Stack.Screen
        name={ScreenNamesCustomer.PRODUCTDETAILSFROMSEARCH}
        component={ProductDetailsFromSearch}
      />
      <Stack.Screen name={ScreenNamesCustomer.CARTVIEW} component={CartView} />
      <Stack.Screen name={ScreenNamesCustomer.WISHLIST} component={WishList} />
      <Stack.Screen
        name={ScreenNamesCustomer.ORDERDETAILS}
        component={OrderDetails}
      />
      <Stack.Screen
        name={ScreenNamesCustomer.TRACKORDER}
        component={TrackOrder}
      />
      <Stack.Screen name={ScreenNamesCustomer.LEDGER} component={Ledger} />
      <Stack.Screen
        name={ScreenNamesCustomer.WEBVIEW}
        component={ProductWebView}
      />
      <Stack.Screen
        name={ScreenNamesCustomer.VIEWINVOICE}
        component={ViewInvoice}
      />
      <Stack.Screen
        name={ScreenNamesCustomer.SHOWBRANDS}
        component={ShowBrands}
      />
      <Stack.Screen name={ScreenNamesCustomer.NEWHOME} component={NewHome} />
      <Stack.Screen name={ScreenNamesCustomer.HOME} component={HomeCatalogs} />
    </Stack.Navigator>
  );
};
