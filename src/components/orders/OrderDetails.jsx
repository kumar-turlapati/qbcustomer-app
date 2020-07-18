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
import { Product, DeleteIcon } from '../../icons/Icons';
import { useState } from 'react';
import CommonAlertView from '../UI/CommonAlertView';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

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
    marginLeft: 16
  },
  ledgerRowTitleStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 12
  }
})

const cartItems = [
  {
    id: 1,
    icon: <Product style={{ height: 90, width: 90 }} />,
    title: 'Grey Solid Suit 1',
    price: '₹2,754',
    quantity: 1,
    discount: '',
    inStock: true,
  },
  {
    id: 2,
    icon: <Product style={{ height: 90, width: 90 }} />,
    title: 'Grey Solid Suit 2',
    price: '₹2,754',
    quantity: 1,
    discount: '50% OFF',
    inStock: true,
  },
  {
    id: 3,
    icon: <Product style={{ height: 90, width: 90 }} />,
    title: 'Grey Solid Suit 3',
    price: '₹2,754',
    quantity: 1,
    discount: '',
    inStock: false,
  },
];

export const OrderDetails = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Order Details'}
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
      <View style={{ backgroundColor: theme.colors.WHITE, borderTopWidth: 1, borderTopColor: theme.colors.BORDER_COLOR }}>
        <Text style={styles.tileTextStyles} >Order ID 1234XYZ</Text>
        <Text style={[styles.tileTextStyles, { color: theme.colors.BLACK_WITH_OPACITY, marginTop: 7, fontWeight: 'normal', fontSize: 14, marginBottom: 23 }]} >Date 05/06/2020</Text>
      </View>
    );
  };

  const renderRow = (item, index) => {
    return (
      <View >
        <View style={theme.viewStyles.rowTopSeperatorStyle} />
        {index === 0 && <View style={{ height: 16 }} />}
        <View style={styles.rowStyles}>
          {item.icon}
          <View style={{ marginLeft: 18, marginTop: 17 }}>
            <Text style={styles.rowTextStyles}> {item.title}</Text>
            <Text
              style={[
                styles.rowTextStyles,
                {
                  color: theme.colors.BLACK_WITH_OPACITY,
                  marginTop: 13,
                  marginLeft: 4,
                },
              ]}>
              Qty {item.quantity}
            </Text>
          </View>
          <View style={{ top: 16, right: 25, position: 'absolute' }}>
            <Text style={[styles.rowTextStyles, { fontWeight: '600' }]}>
              {item.price}
            </Text>
          </View>
        </View>
        {index === cartItems.length - 1 ? (
          <View style={{ height: 16 }} />
        ) : (
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.SEPERATOR_COLOR,
                marginHorizontal: 16,
              }}
            />
          )}
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={cartItems}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderLedger = () => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <View style={[styles.ledgerRowTitleStyle, { marginTop: 23 }]}>
          <Text style={styles.ledgerTextStyles}>Bag Total</Text>
          <Text style={styles.ledgerTextStyles}>₹8,262</Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Bag discount</Text>
          <Text style={[styles.ledgerTextStyles, { color: theme.colors.RED }]}>
            ₹1,377
          </Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Order Total</Text>
          <Text style={styles.ledgerTextStyles}>₹6,885</Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Delivery Charges</Text>
          <Text style={styles.ledgerTextStyles}>₹99</Text>
        </View>
        <View style={{ backgroundColor: theme.colors.BLACK, opacity: 0.1, height: 1, marginTop: 20 }} />
        <View style={[styles.ledgerRowTitleStyle, { marginTop: 13 }]}>
          <Text style={[styles.ledgerTextStyles, { fontWeight: 'bold' }]}>Total</Text>
          <Text style={[styles.ledgerTextStyles, { fontWeight: 'bold' }]}>₹6984</Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'TRACK ORDER'}
        onPressButton={() => {
          navigation.push(ScreenNamesCustomer.TRACKORDER);
        }}
        propStyle={{ marginTop: 34, marginHorizontal: 17, marginBottom: 25 }}
        propTextStyle={{
          fontWeight: 'bold',
          fontSize: 12,
          lineHeight: 22,
          letterSpacing: -0.5,
        }}
      />
    );
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {renderOrderID()}
      {renderListView()}
      {renderLedger()}
      {renderButton()}
    </ScrollView>
  );
};
