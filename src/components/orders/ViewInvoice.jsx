import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import CommonButton from '../UI/CommonButton';
// import {Product} from '../../icons/Icons';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {
  restEndPoints,
  requestHeaders,
  cdnUrl,
  clientCode,
} from '../../../qbconfig';
import {Loader} from '../Loader';
import {NoDataMessage} from '../NoDataMessage';
import axios from 'axios';
import _find from 'lodash/find';
import {Image} from 'react-native-elements';
import _toLower from 'lodash/toLower';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  rowStyles: {
    height: 90,
    backgroundColor: theme.colors.WHITE,
    marginHorizontal: 16,
    flexDirection: 'row',
    width: winWidth - 32,
  },
  rowTextStyles: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: theme.colors.BLACK,
  },
  outOfStockView: {
    fontWeight: 'normal',
    fontSize: 12,
    letterSpacing: -0.41,
    color: theme.colors.WHITE,
    paddingHorizontal: 2,
    backgroundColor: theme.colors.RED,
    position: 'absolute',
    left: 8,
    bottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  couponStyle: {
    fontSize: 12,
    color: theme.colors.BLACK,
    opacity: 0.5,
    lineHeight: 14,
  },
  textInputStyles: {
    height: 45,
    width: 150,
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.colors.BLACK,
    paddingLeft: 14,
  },
  ledgerTextStyles: {
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK,
  },
  tileTextStyles: {
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: theme.colors.BLACK,
    marginTop: 24,
    marginLeft: 16,
  },
  ledgerRowTitleStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});

// const cartItems = [
//   {
//     id: 1,
//     icon: <Product style={{height: 90, width: 90}} />,
//     title: 'Grey Solid Suit 1',
//     price: '₹2,754',
//     quantity: 1,
//     discount: '',
//     inStock: true,
//   },
//   {
//     id: 2,
//     icon: <Product style={{height: 90, width: 90}} />,
//     title: 'Grey Solid Suit 2',
//     price: '₹2,754',
//     quantity: 1,
//     discount: '50% OFF',
//     inStock: true,
//   },
//   {
//     id: 3,
//     icon: <Product style={{height: 90, width: 90}} />,
//     title: 'Grey Solid Suit 3',
//     price: '₹2,754',
//     quantity: 1,
//     discount: '',
//     inStock: false,
//   },
// ];

export const ViewInvoice = ({route, navigation}) => {
  return <></>;
};
