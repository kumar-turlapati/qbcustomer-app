import React, {useEffect, useState, useContext} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {SideArrowIcon} from '../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../qbconfig';
import {Loader} from '../Loader';
import {NoDataMessage} from '../NoDataMessage';
import useAsyncStorage from '../customHooks/async';
import {useIsFocused} from '@react-navigation/native';
// import {ShoppingCartContext} from '../context/ShoppingCart';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR,
  },
  rowViewStyle: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: theme.colors.BORDER_COLOR,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.WHITE,
    marginTop: 2,
  },
  titleTextStyle: {
    ...theme.viewStyles.buttonTextStyles,
    color: theme.colors.BLACK,
    marginTop: 20,
  },
  descriptionTextStyle: {
    ...theme.viewStyles.productListTextStyles,
    fontWeight: 'normal',
    color: theme.colors.BLACK_WITH_OPACITY,
    marginBottom: 10,
  },
});

export const CancelOrder = ({navigation}) => {
  return <></>;
};
