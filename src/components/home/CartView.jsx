import React, {useContext, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  Image,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {DeleteIcon} from '../../icons/Icons';
import {useState} from 'react';
import CommonAlertView from '../UI/CommonAlertView';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {ShoppingCartContext} from '../context/ShoppingCart';
import {
  cdnUrl,
  clientCode,
  restEndPoints,
  requestHeaders,
} from '../../../qbconfig';
import _find from 'lodash/find';
import _upperCase from 'lodash/upperCase';
import axios from 'axios';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  rowStyles: {
    height: 95,
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
    width: 250,
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
  ledgerRowViewStyles: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rowSubViewStyles: {
    height: 30,
    backgroundColor: theme.colors.SNOW,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: 67,
  },
  touchableViewStyles: {
    width: 40,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponViewStyles: {
    marginTop: 10,
    marginHorizontal: 0,
    borderColor: theme.colors.BLACK_WITH_OPACITY_2,
    borderWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  seperatorViewStyle: {
    height: 45,
    width: 1,
    position: 'absolute',
    backgroundColor: theme.colors.BLACK_WITH_OPACITY_2,
    top: 0,
    right: 80,
  },
});

export const CartView = ({route, navigation}) => {
  const [couponText, setCouponText] = useState('');
  // const [showLoader, setShowLoader] = useState(false);
  // const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [orderValues, setOrderValues] = useState({
    cartTotal: 0,
    cartDiscount: 0,
    totalAmount: 0,
  });
  const [discountPercent, setDiscountPercent] = useState(0);
  const [alertMessage, setShowAlertMessage] = useState('');
  const [showCouponAlert, setCouponAlert] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponAlertText, setCouponAlertText] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const {
    cartItems,
    removeItemFromCart,
    loading,
    updateCart,
    businessLocations,
  } = useContext(ShoppingCartContext);

  const {VALIDATE_COUPON} = restEndPoints;

  // console.log(
  //   businessLocations,
  //   'businesslocations in cartview component.....',
  // );

  // const productLocationKey = route.params.productLocation;

  // console.log(cartItems.length, 'cartItems in CartView.jsx');

  // useEffect(() => {
  //   fetchCart();
  // }, []);

  const calculateCart = () => {
    let cartTotal = 0;
    cartItems.forEach((cartItemDetails) => {
      // console.log(cartItemDetails, '----------------');
      const itemQty = parseFloat(cartItemDetails.itemQty);
      const itemRate = parseFloat(cartItemDetails.itemRate);
      const packedQty = parseFloat(cartItemDetails.packedQty);
      cartTotal += parseFloat(itemQty * itemRate * packedQty);
    });
    const discountAmount = parseFloat((cartTotal * discountPercent) / 100);
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

    setOrderValues({
      cartTotal: itemTotalAfterRounding,
      cartDiscount: discountAmountAfterRounding,
      totalAmount: totalAmountAfterRounding,
    });
  };

  const validateCoupon = async () => {
    setCouponAlert(true);
    setCouponLoading(true);
    let orderDetails = [];
    cartItems.forEach((cartItemDetails) => {
      const itemQty = cartItemDetails.itemQty;
      const itemID = cartItemDetails.itemID;
      orderDetails.push({itemID: itemID, itemQty: itemQty});
    });

    try {
      await axios
        .post(
          VALIDATE_COUPON.URL,
          {
            couponCode: couponText,
            orderDetails: orderDetails,
          },
          {headers: requestHeaders},
        )
        .then((apiResponse) => {
          // console.log(apiResponse, 'apiResponse........');
          setCouponLoading(false);
          if (apiResponse.data.status === 'success') {
            setCouponAlertText('Coupon applied successfully :)');
            setDiscountPercent(apiResponse.data.response.discountPercent);
            setCouponApplied(true);
          } else {
            setCouponAlertText(
              'Unable to apply the Coupon. Please try again :(',
            );
          }
        })
        .catch((error) => {
          // console.log(error, 'error..................', error.response.data);
          const errorText = error.response.data.errortext;
          setCouponLoading(false);
          setCouponAlertText(`${errorText} :(`);
        });
    } catch (e) {
      // console.log(e, 'e..................');
      setLoading(false);
      setCouponAlertText('Network error. Please try again.');
    }
  };

  useEffect(() => {
    if (cartItems && cartItems.length <= 0) {
      navigation.push(ScreenNamesCustomer.TABBAR);
    } else if (cartItems && cartItems.length > 0) {
      calculateCart();
    }
  }, [cartItems]);

  useEffect(() => {
    if (couponApplied) {
      calculateCart();
    }
  }, [couponApplied]);

  useEffect(() => {
    if (couponText.length === 0) {
      setDiscountPercent(0);
      setCouponApplied(false);
    }
  }, [couponText]);

  useEffect(() => {
    calculateCart();
  }, [discountPercent]);

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'My Cart'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {}}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {
          navigation.push(ScreenNamesCustomer.WISHLIST);
        }}
      />
    );
  };

  const renderRow = (item, index) => {
    // console.log(item, 'item......');
    // console.log(imageUrl, '---------------', item);
    // const imageUrl = encodeURI(
    //   `${cdnUrl}/${clientCode}/${productLocationKey}/${item.imageName}`,
    // );
    // console.log(businessLocations, '.................................', item);
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
          <Image source={{uri: imageUrl}} style={{height: 95, width: 90}} />
          <View style={{marginLeft: 18, marginTop: 17}}>
            <Text style={styles.rowTextStyles}> {item.itemName}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={styles.rowSubViewStyles}>
                <TouchableOpacity
                  activeOpacity={1}
                  disabled={loading}
                  onPress={() => {
                    setShowAlert(true);
                    const itemQty = parseInt(item.itemQty, 10);
                    if (itemQty > 1) {
                      const cartItem = {
                        cartItems: [
                          {
                            cartItemCode: item.cartItemID,
                            itemQty: parseInt(item.itemQty, 10) - 1,
                          },
                        ],
                      };
                      updateCart(cartItem);
                      setShowAlertMessage('Qty. updated successfully');
                      calculateCart();
                    } else {
                      setShowAlertMessage(
                        'Minimum one unit is required to place the Order. If you wish to delete the item from Cart click on Bin icon.',
                      );
                    }
                  }}>
                  <Text style={{paddingLeft: 8, paddingTop: 4}}>-</Text>
                </TouchableOpacity>
                <TextInput style={{paddingLeft: 4, paddingTop: 4}}>
                  {parseInt(item.itemQty, 10).toFixed(0)}
                </TextInput>
                <TouchableOpacity
                  activeOpacity={1}
                  disabled={loading}
                  onPress={() => {
                    setShowAlert(true);
                    const cartItem = {
                      cartItems: [
                        {
                          cartItemCode: item.cartItemID,
                          itemQty: parseInt(item.itemQty, 10) + 1,
                        },
                      ],
                    };
                    setShowAlertMessage('Qty. updated successfully');
                    updateCart(cartItem);
                    calculateCart();
                  }}>
                  <Text style={{paddingRight: 8, paddingTop: 4}}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                style={styles.touchableViewStyles}
                onPress={() => {
                  setShowAlert(true);
                  const cartItems = {
                    cartItems: [{cartItemCode: item.cartItemID}],
                  };
                  removeItemFromCart(cartItems);
                  setShowAlertMessage('Item removed from Cart successfully.');
                }}>
                <DeleteIcon style={{width: 16, height: 16, marginTop: 15}} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{top: 16, right: 25, position: 'absolute'}}>
            <Text style={[styles.rowTextStyles, {fontWeight: '600'}]}>
              {item.itemRate}
            </Text>
            {/* <Text
              style={[
                styles.rowTextStyles,
                {color: theme.colors.RED, marginTop: 10},
              ]}>
              {item.discount}
            </Text> */}
          </View>
          {/* {!item.inStock && (
            <Text style={styles.outOfStockView}>{'Out of stock'}</Text>
          )} */}
        </View>
        {index === cartItems.length - 1 ? (
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
        data={cartItems}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderCouponView = () => {
    return (
      <View style={{marginTop: 5, marginHorizontal: 16}}>
        <Text style={styles.couponStyle}>COUPON CODE</Text>
        <View style={styles.couponViewStyles}>
          <TextInput
            style={styles.textInputStyles}
            placeholder="Enter the coupon code if you have any"
            onChangeText={(changedText) => {
              setCouponText(changedText);
            }}
            value={couponText}
            maxLength={20}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Text
            onPress={() => {
              validateCoupon();
            }}
            style={{
              fontSize: 16,
              lineHeight: 19,
              color:
                couponText.length < 10 ? theme.colors.BLACK : theme.colors.RED,
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
            disabled={couponText.length < 10 || couponApplied}>
            {couponApplied ? 'Applied' : 'Apply'}
          </Text>
          <View style={styles.seperatorViewStyle} />
        </View>
      </View>
    );
  };

  const renderLedger = () => {
    return (
      <View style={{marginHorizontal: 16}}>
        <View style={[styles.ledgerRowViewStyles, {marginTop: 23}]}>
          <Text style={styles.ledgerTextStyles}>Cart total</Text>
          <Text style={styles.ledgerTextStyles}>
            ₹{orderValues.totalAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.ledgerRowViewStyles}>
          <Text style={styles.ledgerTextStyles}>Discount (-)</Text>
          <Text style={[styles.ledgerTextStyles, {color: theme.colors.RED}]}>
            ₹{orderValues.cartDiscount.toFixed(2)}
          </Text>
        </View>
        {/* <View style={styles.ledgerRowViewStyles}>
          <Text style={styles.ledgerTextStyles}>Gross</Text>
          <Text style={styles.ledgerTextStyles}>₹6,885</Text>
        </View>
        <View style={styles.ledgerRowViewStyles}>
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
        <View style={[styles.ledgerRowViewStyles, {marginTop: 13}]}>
          <Text style={[styles.ledgerTextStyles, {fontWeight: 'bold'}]}>
            Total amount**
          </Text>
          <Text style={[styles.ledgerTextStyles, {fontWeight: 'bold'}]}>
            ₹{orderValues.totalAmount.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.ledgerRowViewStyles, {marginTop: 10}]}>
          <Text style={[styles.ledgerTextStyles, {fontSize: 14}]}>
            **Amount shown here is exclusive of applicable taxes and duties and
            may change at the time of Billing.
          </Text>
        </View>
      </View>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'PLACE ORDER'}
        onPressButton={() => {
          // setShowLoader(true);
          // setShowSuccessAlert(false);
          // setShowAlert(true);
          // setTimeout(() => {
          //   setShowSuccessAlert(true);
          //   setShowLoader(false);
          // }, 1000);
        }}
        propStyle={{marginTop: 34, marginHorizontal: 17, marginBottom: 25}}
        propTextStyle={{
          fontWeight: 'bold',
          fontSize: 12,
          lineHeight: 22,
          letterSpacing: -0.5,
        }}
        disabled
      />
    );
  };

  const renderAlert = () => {
    return (
      <CommonAlertView
        showLoader={loading}
        showSuceessPopup={!loading}
        onPressSuccessButton={() => {
          setShowAlert(false);
        }}
        successTitle={alertMessage}
      />
    );
  };

  const renderAlertForCouponApply = () => {
    return (
      <CommonAlertView
        showLoader={couponLoading}
        showSuceessPopup={!couponLoading}
        onPressSuccessButton={() => {
          setCouponAlert(false);
        }}
        successTitle={couponAlertText}
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
      {renderListView()}
      {renderCouponView()}
      {renderLedger()}
      {renderButton()}
      {showAlert && renderAlert()}
      {showCouponAlert && renderAlertForCouponApply()}
    </ScrollView>
  );
};
