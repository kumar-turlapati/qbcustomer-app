import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {
  SideArrowIcon,
  OrderIcon,
  WishListIcon,
  LedgerIcon,
  LogoutIcon,
} from '../../icons/Icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';
import AsyncStorage from '@react-native-community/async-storage';
import packageJson from '../../../package.json';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR,
  },
  rowViewStyle: {
    borderBottomColor: theme.colors.BORDER_COLOR,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.WHITE,
    marginTop: 2,
  },
  titleTextStyle: {
    ...theme.viewStyles.buttonTextStyles,
    color: theme.colors.BLACK,
    marginTop: 24,
  },
  descriptionTextStyle: {
    ...theme.viewStyles.productListTextStyles,
    fontWeight: 'normal',
    color: theme.colors.BLACK_WITH_OPACITY,
    marginBottom: 24,
  },
});

const catalogue = [
  {
    id: 1,
    title: 'Orders',
    description: 'All about your orders',
    icon: <OrderIcon style={{ width: 34, height: 34, marginTop: 30 }} />,
  },
  {
    id: 2,
    title: 'Wishlist',
    description: 'List of what you like to order',
    icon: (
      <WishListIcon
        style={{
          width: 20,
          height: 20,
          marginTop: 35,
          marginLeft: 6,
          marginRight: 8,
        }}
      />
    ),
  },
  {
    id: 3,
    title: 'Ledger',
    description: 'Check your Transactions & Balance',
    icon: (
      <LedgerIcon
        style={{
          width: 24,
          height: 26,
          marginTop: 30,
          marginLeft: 6,
          marginRight: 4,
        }}
      />
    ),
  },
  {
    id: 4,
    title: 'Logout',
    description: 'Exit from the app',
    icon: (
      <LogoutIcon
        style={{
          width: 24,
          height: 26,
          marginTop: 30,
          marginLeft: 6,
          marginRight: 4,
        }}
      />
    ),
  },
];

export const Profile = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText="My Account"
        isTabView={true}
        onPressRightButton={() => { }}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {
          navigation.push(ScreenNamesCustomer.WISHLIST);
        }}
      />
    );
  };

  const renderRow = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (index === 0) {
              navigation.navigate(ScreenNamesCustomer.ORDER);
            } else if (index === 1) {
              navigation.push(ScreenNamesCustomer.WISHLIST);
            } else if (index === 2) {
              navigation.push(ScreenNamesCustomer.LEDGER);
            } else if (index === 3) {
              AsyncStorage.clear();
              navigation.push(ScreenNamesCustomer.LOGIN);
            }
          }}>
          <View style={styles.rowViewStyle}>
            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row' }}>
                {item.icon}
                <View style={{ marginLeft: 30 }}>
                  <Text style={styles.titleTextStyle}>{item.title}</Text>
                  <Text style={styles.descriptionTextStyle}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <SideArrowIcon style={{ width: 24, height: 24, marginTop: 33 }} />
            </View>
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
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderVersion = () => {
    return (
      <View style={{ marginBottom: 20, marginHorizontal: 20 }}>
        <Text style={theme.viewStyles.versionTextStyle}>v {packageJson.version}</Text>
        <Text style={[theme.viewStyles.versionTextStyle, { marginTop: 5 }]}>If you encounter any bugs, delayed deliveries, billing errors or other technical problems on this APP, please call us on 9000377973</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderVersion()}
    </View>
  );
};
