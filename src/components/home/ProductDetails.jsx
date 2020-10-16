import React, {useState, useContext, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import Carousel from 'react-native-snap-carousel';
// import {Product, ProductFullScreen, CrossIcon} from '../../icons/Icons';
import {CrossIcon} from '../../icons/Icons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {ShoppingCartContext} from '../context/ShoppingCart';
import {
  cdnUrl,
  clientCode,
  restEndPoints,
  requestHeaders,
} from '../../../qbconfig';
import CommonAlertView from '../UI/CommonAlertView';
import useAsyncStorage from '../customHooks/async';
import axios from 'axios';
import _startCase from 'lodash/startCase';
import _lowerCase from 'lodash/lowerCase';
import {Image} from 'react-native-elements';
import ImageZoom from 'react-native-image-pan-zoom';
import {checkTokenExpired} from '../../utils/general';

const {width: winWidth, height: winHeight} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  onboardingViewStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 250,
  },
  sliderDotStyle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 4,
  },
  titleViewStyle: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleStyle: {
    ...theme.viewStyles.titleTextStyle,
  },
  instockStyles: {
    ...theme.viewStyles.inStockTextStyle,
  },
  priceStyles: {
    ...theme.viewStyles.priceStyles,
    marginTop: 7,
  },
  textInputStyles: {
    height: 46,
    width: 50,
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.colors.BLACK,
    textAlign: 'center',
  },
  addToCartStyle: {
    ...theme.viewStyles.commonTextStyles,
  },
  descripitonViewStyle: {
    marginHorizontal: 20,
    height: 340,
    marginVertical: 27,
  },
  descriptionTextStyle: {
    marginVertical: 12,
    marginLeft: 21,
    ...theme.viewStyles.commonTextStyles,
  },
  descripitonSubViewStyle: {
    backgroundColor: theme.colors.LIGHT_GRAY,
    opacity: 0.1,
    height: 340,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  renderFullViewDot: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: 60,
    alignSelf: 'center',
    backgroundColor: theme.colors.WHITE,
    borderRadius: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    paddingBottom: 4,
  },
  closeViewStyles: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 20,
    top: Platform.OS === 'ios' ? 55 : 50,
  },
  buyNowStyles: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: theme.colors.RED,
  },
  addToCartStyles: {
    width: winWidth - 260,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: theme.colors.BLACK,
    borderLeftWidth: 2,
  },
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center',
  },
  carouselFullScreenStyles: {
    position: 'absolute',
    width: winWidth,
    height: winHeight,
    backgroundColor: theme.colors.WHITE,
  },
});

export const ProductDetails = ({route, navigation}) => {
  const [orderQty, setOrderQty] = useState('1');
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [isItemInWishlist, setIsItemInWishlist] = useState(
    route.params.isItemInWishlist,
  );
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [showAlertWishList, setShowAlertWishList] = useState(false);
  const [disableViewCart, setDisableViewCart] = useState(true);
  const productImages = route.params.productDetails.images;
  const productLocationKey = route.params.productLocation;
  const productRate = route.params.productDetails.itemRate;
  const productName = route.params.productDetails.itemName;
  const productCode = route.params.productDetails.itemID;
  const productDescription = route.params.productDetails.itemDescription;
  const productCategory = route.params.productDetails.categoryName;
  const productBrand = route.params.productDetails.brandName;
  const packedQty = route.params.productDetails.packedQty;
  const productUomName = route.params.productDetails.uomName;
  const brandUrl = route.params.productDetails.brandUrl;
  const mrp = route.params.productDetails.mrp;
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const {ADD_ITEM_TO_WISHLIST, REMOVE_ITEM_FROM_WISHLIST} = restEndPoints;

  // console.log(route.params.productDetails, '---------------------');
  // console.log(slideIndex, 'slide index is....................');
  // console.log(disableViewCart, 'disable view cart is.......................');

  const {
    addToCart,
    loading: apiLoading,
    apiError,
    apiErrorText,
    cartItems,
  } = useContext(ShoppingCartContext);

  useEffect(() => {
    if (apiError) {
      setShowAlert(true);
      setAlertText(apiErrorText);
    }
  }, [apiError]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) setDisableViewCart(false);
    // console.log(cartItems);
  }, [cartItems]);

  const buttonDisable = parseInt(orderQty, 10) <= 0;

  const manageItemInWishlist = async (itemID, wishlistState) => {
    setWishlistLoading(true);
    setShowAlertWishList(true);
    if (wishlistState) {
      // console.log('in delete state', wishlistState);
      // delete the wishlist item
      try {
        await axios
          .delete(REMOVE_ITEM_FROM_WISHLIST.URL(uuid), {
            headers: requestHeaders,
            data: {wishListItems: [{wlItemCode: itemID}]},
          })
          .then((apiResponse) => {
            // console.log(apiResponse.data.status);
            setWishlistLoading(false);
            if (apiResponse.data.status === 'success') {
              setAlertText('Product removed from Wishlist successfully :)');
              setIsItemInWishlist(false);
            }
          })
          .catch((error) => {
            if (checkTokenExpired(error))
              navigation.push(ScreenNamesCustomer.LOGIN);
            setAlertText('Oops, something went wrong.');
            setWishlistLoading(false);
          });
      } catch (e) {
        // console.log(e);
        setWishlistLoading(false);
        setAlertText('Network error. Please try again.');
      }
    } else {
      // add wishlist item
      // console.log('in add state', wishlistState);
      try {
        await axios
          .post(
            ADD_ITEM_TO_WISHLIST.URL(uuid),
            {
              wishListItems: [{itemCode: itemID}],
            },
            {headers: requestHeaders},
          )
          .then((apiResponse) => {
            setWishlistLoading(false);
            if (apiResponse.data.status === 'success') {
              setIsItemInWishlist(true);
              setAlertText('Product added to Wishlist successfully :)');
            }
          })
          .catch((error) => {
            if (checkTokenExpired(error))
              navigation.push(ScreenNamesCustomer.LOGIN);
            setAlertText('Oops, something went wrong.');
            // console.log(error, 'error text.............');
            // setApiError(true);
            // setApiErrorText(errorText);
            // console.log(errorText);
          });
      } catch (e) {
        setWishlistLoading(false);
        setAlertText('Network error. Please try again.');
        // console.log(e);
        // setApiErrorText('Network error. Please try again.');
      }
    }
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Product Details'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
        isProduct={false}
        isWishList
        isItemInWishlist={isItemInWishlist}
        onPressWishListIcon={() =>
          manageItemInWishlist(productCode, isItemInWishlist)
        }
      />
    );
  };

  const renderDot = (active, index) => (
    <View
      style={[
        styles.sliderDotStyle,
        {
          backgroundColor: active
            ? theme.colors.ACTIVE_CAROUSEL_COLOR
            : theme.colors.IN_ACTIVE_CAROUSEL_COLOR,
        },
      ]}
      key={index}
    />
  );

  const renderSliderItem = ({item}) => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/${productLocationKey}/${item.imageName}`,
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={item.hash}
        onPress={() => {
          setShowFullScreen(true);
        }}
        key={item.itemID}>
        <View style={styles.onboardingViewStyles}>
          <Image
            source={{uri: imageUrl}}
            style={{height: 280, width: winWidth - 80}}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSliderFullDotView = () => {
    return (
      <View style={styles.renderFullViewDot}>
        {productImages.map((_, index) =>
          index == slideIndex
            ? renderDot(true, index)
            : renderDot(false, index),
        )}
      </View>
    );
  };

  const renderSliderFullClose = () => {
    return (
      <View style={styles.closeViewStyles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setShowFullScreen(false);
          }}>
          <CrossIcon
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSliderFullView = ({item}) => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/${productLocationKey}/${item.imageName}`,
    );
    return (
      <View>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={winWidth}
          imageHeight={winHeight}>
          <Image
            source={{uri: imageUrl}}
            style={{
              width: winWidth - 50,
              height: winHeight - 150,
              marginLeft: 25,
              marginTop: 80,
            }}
          />
        </ImageZoom>
      </View>
    );
  };

  const renderImageFullScreen = () => {
    return (
      <View style={styles.carouselFullScreenStyles}>
        <Carousel
          onSnapToItem={setSlideIndex}
          data={productImages}
          renderItem={renderSliderFullView}
          sliderWidth={winWidth}
          itemWidth={winWidth}
          sliderHeight={winHeight}
          itemHeight={winHeight}
          loop
          // autoplay
          // autoplayDelay={3000}
          // autoplayInterval={3000}
          layout="default"
          firstItem={slideIndex}
        />
      </View>
    );
  };

  const renderCarouselView = () => {
    return (
      <View>
        <Carousel
          onSnapToItem={(slideIndex) => setSlideIndex(slideIndex)}
          data={productImages}
          renderItem={renderSliderItem}
          sliderWidth={winWidth}
          itemWidth={winWidth - 80}
          loop
          // autoplay
          // autoplayDelay={3000}
          // autoplayInterval={3000}
          layout="default"
        />
      </View>
    );
  };

  const renderSliderDotView = () => {
    return (
      <View style={styles.dotView}>
        {productImages.map((_, index) =>
          index == slideIndex
            ? renderDot(true, index)
            : renderDot(false, index),
        )}
      </View>
    );
  };

  const renderTitleAndButton = () => {
    return (
      <View style={styles.titleViewStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleStyle}>{productName}</Text>
          <Text style={styles.instockStyles}>In stock</Text>
          {brandUrl.length > 0 ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                navigation.push(ScreenNamesCustomer.WEBVIEW, {
                  brandUrl: brandUrl,
                });
              }}>
              <Text
                style={[
                  styles.instockStyles,
                  {backgroundColor: theme.colors.RED},
                ]}>
                3D View
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
        <Text style={styles.priceStyles}>
          WHS: ₹{productRate}
          {'      '}
          {parseFloat(mrp) > 0 ? `MRP: ₹${mrp}` : ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 26,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              borderWidth: 2,
              borderColor: theme.colors.BLACK,
              borderRadius: 3,
            }}>
            <TextInput
              style={styles.textInputStyles}
              onChangeText={(qty) => {
                setOrderQty(qty);
              }}
              value={orderQty}
              maxLength={3}
              onEndEditing={(e) => {}}
              keyboardType="numeric"
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.addToCartStyles}
              onPress={() => {
                const cartItem = {
                  cartItems: [{itemCode: productCode, itemQty: orderQty}],
                };
                setShowAlert(true);
                addToCart(cartItem);
              }}
              disabled={buttonDisable}>
              <Text style={styles.addToCartStyle}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
          <View style={{opacity: disableViewCart ? 0.5 : 1}}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.buyNowStyles]}
              onPress={() => {
                navigation.push(ScreenNamesCustomer.CARTVIEW);
              }}
              disabled={disableViewCart}>
              <Text
                style={[styles.addToCartStyle, {color: theme.colors.WHITE}]}>
                VIEW CART
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View style={styles.descripitonViewStyle}>
        <View style={styles.descripitonSubViewStyle} />
        <Text style={styles.descriptionTextStyle}>About</Text>
        {/* <View
          style={{
            backgroundColor: theme.colors.BLACK,
            opacity: 0.1,
            marginLeft: 25,
            marginTop: 10,
            marginRight: 15,
            height: 1,
          }}
        /> */}
        <View style={{marginLeft: 24, marginTop: 0}}>
          {/* <Text style={styles.addToCartStyle}>{'Size & Fit'}</Text> */}
          <Text style={styles.addToCartStyle}>{productDescription}</Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}></Text>
        </View>
        <View style={{marginLeft: 24, marginTop: 10}}>
          <Text style={styles.addToCartStyle}>Specifications</Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: 1},
            ]}>
            Packed Qty. -{' '}
            {`${parseFloat(packedQty).toFixed(2)} ${_lowerCase(
              productUomName,
            )}`}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            Brand - {_startCase(_lowerCase(productBrand))}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            Category - {_startCase(_lowerCase(productCategory))}
          </Text>
        </View>
        <View style={{marginLeft: 24, marginTop: 10}}>
          <Text style={styles.addToCartStyle}>Billing Information</Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: 1, textAlign: 'justify'},
            ]}>
            {
              'This item will be billed as per the packed qty. given in the specifications. When you add 1 to the cart it will be multiplied with packed qty. and the value will be generated accordingly. Packed qty. may subject to change at the time of billing.'
            }
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={theme.viewStyles.flex}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderCarouselView()}
        {renderSliderDotView()}
        {renderTitleAndButton()}
        {renderDescription()}
        {/* {showFullScreen && renderSliderFullDotView()} */}
      </ScrollView>
      {showFullScreen && renderImageFullScreen()}
      {showFullScreen && renderSliderFullClose()}
      {showAlert && (
        <CommonAlertView
          showLoader={apiLoading}
          showSuceessPopup={!apiLoading}
          onPressSuccessButton={() => {
            setShowAlert(false);
          }}
          successTitle="Product added to Cart successfully."
        />
      )}
      {showAlertWishList && (
        <CommonAlertView
          showLoader={wishlistLoading}
          showSuceessPopup={!wishlistLoading}
          onPressSuccessButton={() => {
            setShowAlertWishList(false);
          }}
          successTitle={alertText}
        />
      )}
    </View>
  );
};
