import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import { Product, DeleteIcon, OrderPlaced, OrderConfirmed, OrderReady, OrderDispatched } from '../../icons/Icons';
import { useState } from 'react';
import CommonAlertView from '../UI/CommonAlertView';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR
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
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 18,
    color: theme.colors.BLACK,
    marginLeft: 30,
  },
  dateStyle: {
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 30,
    color: theme.colors.BLACK_WITH_OPACITY,
  },
  descriptionStyle: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: theme.colors.BLACK,
    fontStyle: 'italic',
    marginLeft: 30,
    marginTop: 5,
    marginRight: 43,
  },
});

export const TrackOrder = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Track Order'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {
          navigation.push(ScreenNamesCustomer.WISHLIST);
        }}
      />
    );
  };

  const renderOrderID = () => {
    return (
      <View style={{ borderTopWidth: 1, borderTopColor: theme.colors.BORDER_COLOR }}>
        <Text style={styles.tileTextStyles} >Order ID 1234XYZ</Text>
        <Text style={[styles.tileTextStyles, { color: theme.colors.BLACK_WITH_OPACITY, marginTop: 7, fontWeight: 'normal', fontSize: 14, marginBottom: 23 }]} >Date 05/06/2020</Text>
      </View>
    );
  };

  const renderStatus = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20 }}>
          <OrderPlaced style={{ width: 18, height: 24, marginTop: 8 }} />
          <View>
            <Text style={styles.titleStyle}>ORDER PLACED</Text>
            <Text style={styles.dateStyle}>Date 05/06/2020 15:30</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20 }}>
          <OrderConfirmed style={{ width: 18, height: 24, marginTop: 8 }} />
          <View>
            <Text style={styles.titleStyle}>ORDER CONFIRMED</Text>
            <Text style={styles.dateStyle}>Date 05/06/2020 15:35</Text>
            <Text style={styles.descriptionStyle}>
              Your order has been cofirmed
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20 }}>
          <OrderReady style={{ width: 23, height: 22, marginTop: 8, marginLeft: -2 }} />
          <View>
            <Text style={[styles.titleStyle, { marginLeft: 26 }]}>ORDER READY</Text>
            <Text style={[styles.dateStyle, { marginLeft: 26 }]}>Date 05/06/2020 21:18</Text>
            <Text style={[styles.descriptionStyle, { marginLeft: 26 }]}>Your oder is in billing and packing</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 40, marginLeft: 20 }}>
          <OrderDispatched style={{ width: 28, height: 24, marginTop: 8, marginLeft: -4 }} />
          <View>
            <Text style={[styles.titleStyle, { marginLeft: 24 }]}>ORDER DISPATCHED</Text>
            <Text style={[styles.dateStyle, { marginLeft: 24 }]}>Date 06/06/2020 15:35PM</Text>
            <Text style={[styles.descriptionStyle, { marginLeft: 24 }]}>Your order has been dispactched vide <Text style={theme.viewStyles.underLineStyle}>848848</Text>  dt. 28-02-2020. <Text style={theme.viewStyles.underLineStyle}>Track status</Text></Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderOrderID()}
      {renderStatus()}
    </View>
  );
};
