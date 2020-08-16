import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
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
import parse from 'date-fns/parse';
import format from 'date-fns/format';
import {toDate, utcToZonedTime} from 'date-fns-tz';

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
  addToCartStyle: {
    ...theme.viewStyles.commonTextStyles,
  },
});

export const ViewInvoice = ({route, navigation}) => {
  const [invoiceDetailsLoading, setInvoiceDetailsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [apiLoading, setApiLoading] = useState(true);

  const {INVOICE_DETAILS} = restEndPoints;
  const orderNo = route.params.orderNo;

  // console.log('order No is.....', orderNo);
  // console.log(orderCode, orderDetails, orderItems);
  // console.log(orderItems);
  // console.log(orderDetails, 'order details.......', route.params);
  // console.log(parseFloat(orderDetails.discount), 'order details......');
  // console.log('order status is....', orderDetails);

  useEffect(() => {
    const getInvoiceDetails = async () => {
      setInvoiceDetailsLoading(true);
      try {
        await axios
          .get(INVOICE_DETAILS.URL(orderNo), {headers: requestHeaders})
          .then((apiResponse) => {
            // console.log(apiResponse.data.response, 'api response is..........');
            setInvoiceDetailsLoading(false);
            if (apiResponse.data.status === 'success') {
              const orderDetails = apiResponse.data.response.orderDetails;
              const orderItems =
                apiResponse.data.response.orderDetails.itemDetails;
              const businessLocations =
                apiResponse.data.response.businessLocations;
              delete orderDetails['itemDetails'];
              setOrderDetails(orderDetails);
              setOrderItems(orderItems);
              setBusinessLocations(businessLocations);
            } else {
              setErrorMessage('Invalid Order :(');
              setShowNoDataMessage(true);
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            setInvoiceDetailsLoading(false);
            setErrorMessage(error.response.data.errortext);
            setShowNoDataMessage(true);
          });
      } catch (e) {
        console.log(e);
        setInvoiceDetailsLoading(false);
        setShowNoDataMessage(true);
        setErrorMessage('Network error. Please try again :(');
      }
    };
    if (orderNo.length > 0) getInvoiceDetails();
  }, [orderNo]);

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
    const orderDate = parse(
      route.params.orderDate,
      'yyyy-MM-dd HH:mm:ss',
      new Date(),
    );
    // console.log(orderDate, 'order date is......');
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
          Date: {format(orderDate, 'do MMMM yyyy')}
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
              Qty - {parseFloat(item.itemQty).toFixed(2)}{' '}
              {_toLower(item.uomName)}
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
    const orderTotal = parseFloat(orderDetails.billAmount).toFixed(2);
    const discountAmount = parseFloat(orderDetails.discountAmount).toFixed(2);
    const taxable = parseFloat(orderTotal - discountAmount).toFixed(2);
    const gst = parseFloat(orderDetails.taxAmount).toFixed(2);
    const roundOff = parseFloat(orderDetails.roundOff).toFixed(2);
    const payable = parseFloat(orderDetails.netPay).toFixed(2);
    const invoiceDate = orderDetails.invoiceDate.split('-').reverse().join('/');

    // const formattedDate = format(invoiceDateLocal, 'do MMMM yyyy');

    // console.log(
    //   orderDetails.createdTime,
    //   invoiceDateLocal,
    //   '------------------------',
    //   parseISO(new Date(invoiceDateLocal)),
    // );

    return (
      <View style={{marginHorizontal: 16}}>
        <View style={[styles.ledgerRowTitleStyle, {marginTop: 23}]}>
          <Text style={styles.ledgerTextStyles}>Order total</Text>
          <Text style={styles.ledgerTextStyles}>₹{orderTotal}</Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Discount (-)</Text>
          <Text style={[styles.ledgerTextStyles, {color: theme.colors.RED}]}>
            ₹{discountAmount}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.BLACK,
            opacity: 0.1,
            height: 1,
            marginTop: 10,
          }}
        />
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Taxable</Text>
          <Text style={styles.ledgerTextStyles}>₹{taxable}</Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>GST (+)</Text>
          <Text style={styles.ledgerTextStyles}>₹{gst}</Text>
        </View>
        <View style={styles.ledgerRowTitleStyle}>
          <Text style={styles.ledgerTextStyles}>Round off (+/-)</Text>
          <Text style={styles.ledgerTextStyles}>₹{roundOff}</Text>
        </View>
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
            Invoice value
          </Text>
          <Text style={[styles.ledgerTextStyles, {fontWeight: 'bold'}]}>
            ₹{payable}
          </Text>
        </View>
        <View style={{marginLeft: 0, marginTop: 5, marginBottom: 10}}>
          <Text
            style={
              (styles.addToCartStyle,
              {
                fontSize: 15,
                color: theme.colors.RED,
                fontStyle: 'normal',
                marginBottom: 20,
              })
            }>
            {`Invoice no.: ${orderDetails.billNo}, dated ${invoiceDate}.`}
          </Text>
        </View>
      </View>
    );
  };

  return invoiceDetailsLoading ? (
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
    </ScrollView>
  );
};
