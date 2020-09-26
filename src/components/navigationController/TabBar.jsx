import {Home} from '../home/HomeCataogs';
import {NewHome} from '../home/NewHome';
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
import React, {useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ScreenNamesCustomer} from './ScreenNames';

const routeToIcon = {
  Home: <HomeUnselected style={{width: 20, height: 20}} />,
  Catalogs: <CatalogueUnselected style={{width: 20, height: 20}} />,
  Orders: <OrdersUnselected style={{width: 20, height: 20}} />,
  'My Account': <ProfileUnselected style={{width: 20, height: 20}} />,
};

const routeToFocusedIcon = {
  Home: <HomeSelected style={{width: 20, height: 20}} />,
  Catalogs: <CatalogueSelected style={{width: 20, height: 20}} />,
  Orders: <OrdersSelected style={{width: 20, height: 20}} />,
  'My Account': <ProfileSelected style={{width: 20, height: 20}} />,
};

const Tab = createBottomTabNavigator();

export const TabBar = ({route}) => {
  // const catalogCode =
  //   route.params && route.params.catalogCode ? route.params.catalogCode : null;
  return (
    <Tab.Navigator
      initialRouteName={ScreenNamesCustomer.NEWHOME}
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
      <Tab.Screen name={ScreenNamesCustomer.NEWHOME} component={NewHome} />
      <Tab.Screen name={ScreenNamesCustomer.CATALOGUE} component={Catalogue} />
      <Tab.Screen name={ScreenNamesCustomer.ORDER} component={Order} />
      <Tab.Screen name={ScreenNamesCustomer.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};
