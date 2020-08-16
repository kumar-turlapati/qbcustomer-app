import React from 'react';
import {Dimensions, StyleSheet, View, Text, Linking} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {
  OrderPlaced,
  OrderConfirmed,
  OrderReady,
  OrderDispatched,
} from '../../icons/Icons';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR,
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
    // color: theme.colors.BLACK,
    color: '#228b22',
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

export const TrackOrder = ({route, navigation}) => {
  // console.log(route.params.orderDetails, 'order details.......');
  const orderDate = parse(
    route.params.orderDetails.indentDate,
    'yyyy-MM-dd',
    new Date(),
  );
  const orderCreatedDateTime = parse(
    route.params.orderDetails.createdDate,
    'yyyy-MM-dd HH:mm:ss',
    new Date(),
  );
  const orderUpdatedDate = parse(
    route.params.orderDetails.updatedDate,
    'yyyy-MM-dd HH:mm:ss',
    new Date(),
  );
  const invoiceCreatedDate = parse(
    route.params.orderDetails.invoiceCreatedDate,
    'yyyy-MM-dd HH:mm:ss',
    new Date(),
  );
  const shippingDate = parse(
    route.params.orderDetails.shippingDate,
    'yyyy-MM-dd HH:mm:ss',
    new Date(),
  );
  const orderNo = route.params.orderDetails.indentNo;
  const orderConfirmedStatus =
    parseInt(route.params.orderDetails.indentStatus, 10) === 1;
  const orderCancelledStatus =
    parseInt(route.params.orderDetails.indentStatus, 10) === 2;
  const orderBillingandPackingStatus =
    parseInt(route.params.orderDetails.invoiceNo, 10) > 0;
  const orderShippingStatus =
    route.params.orderDetails.transporterName.length > 0;
  const orderCancelReason =
    route.params.orderDetails.cancelReason.length > 0
      ? `Your order has been cancelled. Reason:${route.params.orderDetails.cancelReason}`
      : 'Your order has been cancelled';
  const transporterName = route.params.orderDetails.transporterName;
  const lrNo = route.params.orderDetails.lrNo;
  const wayBillNo = route.params.orderDetails.wayBillNo;
  // const shippingTrackUrl = 'https://www.google.com/';
  const shippingTrackUrl = route.params.orderDetails.shippingTrackUrl;

  // console.log(
  //   orderUpdatedDate,
  //   route.params.orderDetails.updatedDate,
  //   '----------------------',
  // );

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
      <View
        style={{borderTopWidth: 1, borderTopColor: theme.colors.BORDER_COLOR}}>
        <Text style={styles.tileTextStyles}>Order No. {orderNo}</Text>
        <Text
          style={[
            styles.tileTextStyles,
            {
              color: theme.colors.BLACK_WITH_OPACITY,
              marginTop: 7,
              fontWeight: 'normal',
              fontSize: 14,
              marginBottom: 23,
            },
          ]}>
          {format(orderDate, 'do MMMM yyyy')}
        </Text>
      </View>
    );
  };

  const renderStatus = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
          <OrderPlaced style={{width: 18, height: 24, marginTop: 8}} />
          <View>
            <Text style={styles.titleStyle}>ORDER PLACED</Text>
            <Text style={styles.dateStyle}>
              {format(orderCreatedDateTime, 'do MMMM yyyy, hh:mm aaaa')}
            </Text>
          </View>
        </View>

        {
          orderConfirmedStatus ? (
            <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
              <OrderConfirmed style={{width: 18, height: 24, marginTop: 8}} />
              <View>
                <Text style={styles.titleStyle}>ORDER CONFIRMED</Text>
                <Text style={styles.dateStyle}>
                  {format(orderUpdatedDate, 'do MMMM yyyy, hh:mm aaaa')}
                </Text>
                <Text style={styles.descriptionStyle}>
                  Your order has been confirmed.
                </Text>
              </View>
            </View>
          ) : orderCancelledStatus ? (
            <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
              <OrderConfirmed style={{width: 18, height: 24, marginTop: 8}} />
              <View>
                <Text style={[styles.titleStyle, {color: theme.colors.RED}]}>
                  ORDER CANCELLED
                </Text>
                <Text style={styles.dateStyle}>
                  {format(orderUpdatedDate, 'do MMMM yyyy, hh:mm aaaa')}
                </Text>
                <Text style={styles.descriptionStyle}>{orderCancelReason}</Text>
              </View>
            </View>
          ) : null
          // (
          //   <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
          //     <OrderConfirmed style={{width: 18, height: 24, marginTop: 8}} />
          //     <View>
          //       <Text style={styles.descriptionStyle}>ORDER CONFIRMED</Text>
          //     </View>
          //   </View>
          // )
        }

        {
          orderBillingandPackingStatus ? (
            <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
              <OrderReady
                style={{width: 23, height: 22, marginTop: 8, marginLeft: -2}}
              />
              <View>
                <Text style={[styles.titleStyle, {marginLeft: 26}]}>
                  ORDER READY
                </Text>
                <Text style={[styles.dateStyle, {marginLeft: 26}]}>
                  {format(invoiceCreatedDate, 'do MMMM yyyy, hh:mm aaaa')}
                </Text>
                <Text style={[styles.descriptionStyle, {marginLeft: 26}]}>
                  Your oder is in billing and packing
                </Text>
              </View>
            </View>
          ) : null
          // (
          //   <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
          //     <OrderReady
          //       style={{width: 23, height: 22, marginTop: 8, marginLeft: -2}}
          //     />
          //     <View>
          //       <Text style={[styles.descriptionStyle, {marginLeft: 26}]}>
          //         ORDER READY
          //       </Text>
          //     </View>
          //   </View>
          // )
        }

        {
          orderShippingStatus ? (
            <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
              <OrderDispatched
                style={{width: 28, height: 24, marginTop: 8, marginLeft: -4}}
              />
              <View>
                <Text style={[styles.titleStyle, {marginLeft: 24}]}>
                  ORDER DISPATCHED
                </Text>
                <Text style={[styles.dateStyle, {marginLeft: 24}]}>
                  {format(shippingDate, 'do MMMM yyyy, hh:mm aaaa')}
                </Text>
                <Text style={[styles.descriptionStyle, {marginLeft: 24}]}>
                  Your order has been dispactched through {transporterName} vide
                  transport voucher no.{' '}
                  <Text style={theme.viewStyles.underLineStyle}>{lrNo}</Text>{' '}
                  {wayBillNo.length > 0 && (
                    <Text
                      style={[
                        theme.viewStyles.underLineStyle,
                        {textDecorationLine: 'none'},
                      ]}>
                      <Text style={[styles.descriptionStyle]}>
                        , Way Bill No.
                      </Text>{' '}
                      {wayBillNo}
                    </Text>
                  )}{' '}
                  {shippingTrackUrl.length > 0 ? (
                    <Text
                      style={theme.viewStyles.underLineStyle}
                      onPress={() => Linking.openURL(shippingTrackUrl)}>
                      Track status
                    </Text>
                  ) : null}
                </Text>
              </View>
            </View>
          ) : null
          // (
          //   <View style={{flexDirection: 'row', marginTop: 40, marginLeft: 20}}>
          //     <OrderDispatched
          //       style={{width: 28, height: 24, marginTop: 8, marginLeft: -4}}
          //     />
          //     <View>
          //       <Text style={[styles.descriptionStyle, {marginLeft: 24}]}>
          //         ORDER DISPATCHED
          //       </Text>
          //     </View>
          //   </View>
          // )
        }
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
