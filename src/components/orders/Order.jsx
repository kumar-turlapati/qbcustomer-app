import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {
  SideArrowIcon,
  OrderIcon,
  WishListIcon,
  LedgerIcon,
} from '../../icons/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR
  },
  rowViewStyle: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomColor: theme.colors.BORDER_COLOR,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.WHITE,
    marginTop: 2
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

const catalogue = [
  {
    id: 1,
    title: 'Order ID 1234XYZ',
    description: 'Your order has been confirmed',
    amount: '₹6984',
  },
  {
    id: 2,
    title: 'Order ID 1234XYZ',
    description: 'Your order has been confirmed',
    amount: '₹6984',
  },
  {
    id: 3,
    title: 'Order ID 1234XYZ',
    description: 'Your order has been confirmed',
    amount: '₹6984',
  },
  {
    id: 4,
    title: 'Order ID 1234XYZ',
    description: 'Your order has been confirmed',
    amount: '₹6984',
  },
  {
    id: 5,
    title: 'Order ID 1234XYZ',
    description: 'Your order has been confirmed',
    amount: '₹6984',
  },
];

export const Order = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Orders'}
        isTabView={true}
        onPressRightButton={() => { }}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => { }}
      />
    );
  };

  const renderRow = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.push(ScreenNamesCustomer.ORDERDETAILS);
          }}>
          <View style={styles.rowViewStyle}>
            <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
              <View>
                <Text style={styles.titleTextStyle}>{item.title}</Text>
                <Text style={styles.descriptionTextStyle}>
                  {item.description}
                </Text>
              </View>
            </View>
            <SideArrowIcon
              style={{ width: 24, height: 24, marginTop: 23, marginRight: 20 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        data={catalogue}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
    </View>
  );
};
