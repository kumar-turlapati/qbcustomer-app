import React, {useEffect, useState} from 'react';
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

export const Order = ({navigation}) => {
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [orders, setOrders] = useState([]);
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const {GET_ALL_ORDERS} = restEndPoints;

  // console.log(orders, 'orders of the customer........');

  useEffect(() => {
    const getOrders = async () => {
      setOrdersLoading(true);
      try {
        await axios
          .get(GET_ALL_ORDERS.URL(uuid), {headers: requestHeaders})
          .then((apiResponse) => {
            setOrdersLoading(false);
            // console.log(apiResponse, '----------------------');
            if (apiResponse.data.status === 'success') {
              setOrders(apiResponse.data.response);
            } else {
              setShowNoDataMessage(true);
            }
          })
          .catch((error) => {
            // console.log(error, '@@@@@@@@@@@@@@@@@@@@@@@@@@', requestHeaders);
            setOrdersLoading(false);
            setShowNoDataMessage(true);
            setErrorMessage('No Orders found :(');
            // setErrorMessage(error.response.data.errortext);
            // setErrorText(error.response.data.errortext);
            // setShowAlert(true);
          });
      } catch {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        setOrdersLoading(false);
        setShowNoDataMessage(true);
        setErrorMessage('Network error. Please try again :(');
      }
    };
    getOrders();
  }, []);

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Orders'}
        isTabView={true}
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

  const renderRow = (item) => {
    // console.log(item, 'item...................');
    const orderStatus = item.indentStatus;
    let orderStatusText = '';
    if (parseInt(orderStatus, 10) === 0)
      orderStatusText = 'Your order is pending for approval.';
    if (parseInt(orderStatus, 10) === 1)
      orderStatusText = 'Your order has been accepted.';
    if (parseInt(orderStatus, 10) === 2)
      orderStatusText = 'Your order has been cancelled.';
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.push(ScreenNamesCustomer.ORDERDETAILS, {
              orderCode: item.indentCode,
            });
          }}>
          <View style={styles.rowViewStyle}>
            <View style={{flexDirection: 'row', marginHorizontal: 20}}>
              <View>
                <Text style={styles.titleTextStyle}>
                  Order No. {item.indentNo}
                </Text>
                <Text style={styles.descriptionTextStyle}>
                  {orderStatusText}
                </Text>
              </View>
            </View>
            <SideArrowIcon
              style={{width: 24, height: 24, marginTop: 23, marginRight: 20}}
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
        data={orders}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={(item) => item.indentCode}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return ordersLoading ? (
    <Loader />
  ) : showNoDataMessage ? (
    <NoDataMessage message={errorMessage} />
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
    </View>
  );
};
