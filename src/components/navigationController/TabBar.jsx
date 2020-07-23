import {Home} from '../home/Home';
import {Catalogue} from '../catalogues/Catalogue';
import {Order} from '../orders/Order';
import {Profile} from '../profile/Profile';
import {
  HomeUnselected,
  CatalogueUnselected,
  OrdersUnselected,
  ProfileUnselected,
  HomeSelected,
  CatalogueSelected,
  OrdersSelected,
  ProfileSelected,
} from '../../icons/Icons';
import {theme} from '../../theme/theme';
import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNamesCustomer} from './ScreenNames';

const routeToIcon = {
  Home: <HomeUnselected style={{width: 20, height: 20}} />,
  Catalogue: <CatalogueUnselected style={{width: 20, height: 20}} />,
  Order: <OrdersUnselected style={{width: 20, height: 20}} />,
  Profile: <ProfileUnselected style={{width: 20, height: 20}} />,
};

const routeToFocusedIcon = {
  Home: <HomeSelected style={{width: 20, height: 20}} />,
  Catalogue: <CatalogueSelected style={{width: 20, height: 20}} />,
  Order: <OrdersSelected style={{width: 20, height: 20}} />,
  Profile: <ProfileSelected style={{width: 20, height: 20}} />,
};

const Tab = createBottomTabNavigator();

export const TabBar = () => {
  return (
    <Tab.Navigator
      initialRouteName={ScreenNamesCustomer.HOME}
      backBehavior="none"
      resetOnBlur="true"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) =>
          focused ? routeToFocusedIcon[route.name] : routeToIcon[route.name],
      })}
      tabBarOptions={{
        activeTintColor: theme.colors.TAB_BAR_ACTIVE_TINT_COLOR,
        inactiveTintColor: theme.colors.TAB_BAR_INACTIVE_TINT_COLOR,
        activeBackgroundColor: theme.colors.WHITE,
        style: {
          ...theme.viewStyles.tabBarOptionStyle,
        },
        labelStyle: {
          ...theme.viewStyles.tabBarStyles,
        },
        iconStyle: {
          ...theme.viewStyles.tabBarIconStyles,
        },
      }}>
      <Tab.Screen name={ScreenNamesCustomer.HOME} component={Home} />
      <Tab.Screen name={ScreenNamesCustomer.CATALOGUE} component={Catalogue} />
      <Tab.Screen name={ScreenNamesCustomer.ORDER} component={Order} />
      <Tab.Screen name={ScreenNamesCustomer.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};
