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
import CommonAlertView from '../UI/CommonAlertView';
import CommonAlertViewYesNo from '../UI/CommonAlertViewYesNo';
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

export const OrderDetails = ({route, navigation}) => {
  const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [apiLoading, setApiLoading] = useState(true);
  const [orderDeleted, setOrderDeleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderValues, setOrderValues] = useState({
    cartTotal: 0,
    cartDiscount: 0,
    totalAmount: 0,
  });
  const {ORDER_DETAILS, CANCEL_ORDER, INVOICE_DETAILS} = restEndPoints;
  const orderCode = route.params.orderCode;

  // console.log(orderCode, orderDetails, orderItems);
  // console.log(orderItems);
  // console.log(orderDetails);
  // console.log(parseFloat(orderDetails.discount), 'order details......');
  console.log('order status is....', orderDetails);

  const calculateCart = () => {
    let cartTotal = 0;
    orderItems.forEach((orderItemDetails) => {
      // console.log(cartItemDetails, '----------------');
      const itemQty = parseFloat(orderItemDetails.itemQty);
      const itemRate = parseFloat(orderItemDetails.itemRate);
      // const packedQty = parseFloat(orderItemDetails.packedQty);
      cartTotal += parseFloat(itemQty * itemRate);
    });
    const discountAmount = parseFloat(orderDetails.discount);
    const itemTotalAfterRounding =
      Math.round((cartTotal + Number.EPSILON) * 100) / 100;
    const discountAmountAfterRounding =
      Math.round((discountAmount + Number.EPSILON) * 100) / 100;
    const totalAmountAfterRounding =
      Math.round(
        (itemTotalAfterRounding -
          discountAmountAfterRounding +
          Number.EPSILON) *
          100,
      ) / 100;

    // console.log(
    //   cartTotal,
    //   discountAmount,
    //   itemTotalAfterRounding,
    //   discountAmountAfterRounding,
    //   totalAmountAfterRounding,
    // );

    setOrderValues({
      cartTotal: itemTotalAfterRounding,
      cartDiscount: discountAmountAfterRounding,
      totalAmount: totalAmountAfterRounding,
    });
  };

  const cancelOrder = async () => {
    setApiLoading(true);
    setShowAlert(true);
    try {
      await axios
        .delete(CANCEL_ORDER.URL(orderCode), {headers: requestHeaders})
        .then((apiResponse) => {
          setApiLoading(false);
          setAlertText('Order cancelled successfully :)');
          setOrderDeleted(true);
        })
        .catch((error) => {
          // console.log(error, 'error is.......');
          const errorText = error.response.data.errortext;
          setApiLoading(false);
          setAlertText(errorText);
        });
    } catch (e) {
      // console.log('catch block', e);
      setApiLoading(false);
      setAlertText('Network error. Please try again :(');
    }
  };

  useEffect(() => {
    if (orderItems.length > 0) calculateCart();
  }, [orderItems]);

  useEffect(() => {
    const getOrderDetails = async () => {
      setOrderDetailsLoading(true);
      try {
        await axios
          .get(ORDER_DETAILS.URL(orderCode), {headers: requestHeaders})
          .then((apiResponse) => {
            setOrderDetailsLoading(false);
            if (apiResponse.data.status === 'success') {
              const orderDetails =
                apiResponse.data.response.orderDetails.tranDetails;
              const orderItems =
                apiResponse.data.response.orderDetails.itemDetails;
              const businessLocations =
                apiResponse.data.response.businessLocations;
              setOrderDetails(orderDetails);
              setOrderItems(orderItems);
              setBusinessLocations(businessLocations);
            } else {
              setErrorMessage('Invalid Order');
              setShowNoDataMessage(true);
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            setErrorMessage(error.response.data.errortext);
            setShowNoDataMessage(true);
          });
      } catch (e) {
        console.log(e);
        setOrderDetailsLoading(false);
        setShowNoDataMessage(true);
        setErrorMessage('Network error. Please try again :(');
      }
    };

    if (orderCode.length > 0) getOrderDetails();
  }, [orderCode]);

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
      <View
        style={{
          backgroundColor: theme.colors.WHITE,
          borderTopWidth: 1,
          borderTopColor: theme.colors.BORDER_COLOR,
        }}>
        <Text style={styles.tileTextStyles}>
          Order No {orderDetails.indentNo}
        </Text>
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
          Date 05/06/2020
        </Text>
      </View>
    );
  };

  const renderRow = (item, index) => {
    const imageLocation = _find(
      businessLocations,
      (locationDetails) =>
        parseInt(locationDetails.locationID, 10) ===
        parseInt(item.locationID, 10),
    );
    const imageUrl = imageLocation
      ? encodeURI(
          `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${item.imageName}`,
        )
      : '';
    return (
      <View>
        <View style={theme.viewStyles.rowTopSeperatorStyle} />
        {index === 0 && <View style={{height: 16}} />}
        <View style={styles.rowStyles}>
          {/* {item.icon} */}
          <Image
            source={{uri: imageUrl}}
            style={{height: 90, width: 90}}
            PlaceholderContent={<Loader />}
          />
          <View style={{marginLeft: 18, marginTop: 17}}>
            <Text style={styles.rowTextStyles}> {item.itemName}</Text>
            <Text
              style={[
                styles.rowTextStyles,
                {
                  color: theme.colors.BLACK_WITH_OPACITY,
                  marginTop: 13,
                  marginLeft: 4,
                },
              ]}>
              Qty - {parseFloat(item.itemQty / item.packedQty).toFixed(0)} *{' '}
              {parseFloat(item.packedQty).toFixed(2)} {_toLower(item.uomName)}
            </Text>
          </View>
          <View style={{top: 16, right: 25, position: 'absolute'}}>
            <Text style={[styles.rowTextStyles, {fontWeight: '600'}]}>
              {parseFloat(item.itemRate).toFixed(2)}/{_toLower(item.uomName)}
            </Text>
          </View>
        </View>
        {index === orderItems.length - 1 ? (
          <View style={{height: 16}} />
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
        data={orderItems}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={(item) => item.galleryID}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderTotals = () => {
    return (
      <View style={{marginHorizontal: 16}}>
        <View style={[styles.ledgerRowTitleStyle, {marginTop: 23}]}>
          <Text style={styles.ledgerTextStyles}>Order total</Text>
          <Text style={styles.ledgerTextStyles}>
            ₹{orderValues.cartTotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Discount (-)</Text>
          <Text style={[styles.ledgerTextStyles, {color: theme.colors.RED}]}>
            ₹{orderValues.cartDiscount.toFixed(2)}
          </Text>
        </View>
        {/* <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Order Total</Text>
          <Text style={styles.ledgerTextStyles}>₹6,885</Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Delivery Charges</Text>
          <Text style={styles.ledgerTextStyles}>₹99</Text>
        </View> */}
        <View
          style={{
            backgroundColor: theme.colors.BLACK,
            opacity: 0.1,
            height: 1,
            marginTop: 20,
          }}
        />
        <View style={[styles.ledgerRowTitleStyle, {marginTop: 13}]}>
          <Text style={[styles.ledgerTextStyles, {fontWeight: 'bold'}]}>
            Total amount
          </Text>
          <Text style={[styles.ledgerTextStyles, {fontWeight: 'bold'}]}>
            ₹{orderValues.totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  const renderButtonCancelOrder = () => {
    return (
      <CommonButton
        buttonTitle="CANCEL ORDER"
        onPressButton={() => {
          setShowConfirmDialog(true);
        }}
        propStyle={{marginTop: 34, marginHorizontal: 17, marginBottom: 15}}
        propTextStyle={{
          fontWeight: 'bold',
          fontSize: 12,
          lineHeight: 22,
          letterSpacing: -0.5,
        }}
        disabled={parseInt(orderDetails.indentStatus, 10) > 0}
        disableButton={parseInt(orderDetails.indentStatus, 10) > 0}
      />
    );
  };

  const renderButtonTrackOrder = () => {
    return (
      <CommonButton
        buttonTitle="TRACK ORDER"
        onPressButton={() => {
          navigation.push(ScreenNamesCustomer.TRACKORDER, {
            orderDetails: orderDetails,
          });
        }}
        propStyle={{marginTop: 7, marginHorizontal: 17, marginBottom: 15}}
        propTextStyle={{
          fontWeight: 'bold',
          fontSize: 12,
          lineHeight: 22,
          letterSpacing: -0.5,
        }}
      />
    );
  };

  const renderButtonViewInvoice = () => {
    return (
      <CommonButton
        buttonTitle="VIEW INVOICE"
        onPressButton={() => {
          navigation.push(ScreenNamesCustomer.VIEWINVOICE);
        }}
        propStyle={{marginTop: 7, marginHorizontal: 17, marginBottom: 15}}
        propTextStyle={{
          fontWeight: 'bold',
          fontSize: 12,
          lineHeight: 22,
          letterSpacing: -0.5,
        }}
        disabled={
          orderDetails &&
          orderDetails.invoiceNo &&
          parseInt(orderDetails.invoiceNo, 10) === 0
        }
        disableButton={
          orderDetails &&
          orderDetails.invoiceNo &&
          parseInt(orderDetails.invoiceNo, 10) === 0
        }
      />
    );
  };

  return orderDetailsLoading ? (
    <Loader />
  ) : showNoDataMessage ? (
    <NoDataMessage message={errorMessage} />
  ) : (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {renderOrderID()}
      {renderListView()}
      {renderTotals()}
      {renderButtonCancelOrder()}
      {renderButtonTrackOrder()}
      {renderButtonViewInvoice()}
      {showAlert && (
        <CommonAlertView
          showLoader={apiLoading}
          showSuceessPopup={!apiLoading}
          onPressSuccessButton={() => {
            setShowAlert(false);
            if (orderDeleted) navigation.navigate(ScreenNamesCustomer.ORDER);
          }}
          successTitle={alertText}
        />
      )}
      {showConfirmDialog && (
        <CommonAlertViewYesNo
          showLoader={false}
          showSuceessPopup
          onPressOkButton={() => {
            setShowConfirmDialog(false);
            cancelOrder();
          }}
          onPressCancelButton={() => {
            setShowConfirmDialog(false);
          }}
          successTitle="Are you sure. You want to Cancel this order?"
        />
      )}
    </ScrollView>
  );
};
