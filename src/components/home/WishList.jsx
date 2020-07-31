import React, {useState, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {theme} from '../../theme/theme';
import {
  Cloth1,
  Cloth2,
  Cloth3,
  Cloth4,
  HeartUnSelected,
  HeartSelected,
} from '../../icons/Icons';
import CommonHeader from '../UI/CommonHeader';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {
  restEndPoints,
  requestHeaders,
  cdnUrl,
  clientCode,
} from '../../../qbconfig';
import useAsyncStorage from '../customHooks/async';
import {Loader} from '../Loader';
import axios from 'axios';
import CommonAlertView from '../UI/CommonAlertView';
import _find from 'lodash/find';
import {ShoppingCartContext} from '../context/ShoppingCart';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  rowStyles: {
    height: 256,
    marginBottom: 16,
    width: width / 2 - 24,
    marginLeft: 16,
  },
  rowTextStyle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: theme.colors.PRODUCT_LIST_TEXT_COLOR,
    marginTop: 2,
  },
  specialPriceStyle: {
    ...theme.viewStyles.productListTextStyles,
  },
  originalPriceStyle: {
    ...theme.viewStyles.productListTextStyles,
    color: theme.colors.PRODUCT_LIST_ORIGINAL_TEXT_COLOR,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  discountStyle: {
    ...theme.viewStyles.productListTextStyles,
    color: theme.colors.PRODUCT_LIST_DISCOUNT_TEXT_COLOR,
    fontWeight: 'normal',
    fontSize: 12,
    marginLeft: 8,
  },
  iconHeartStyle: {
    marginTop: 8,
    marginLeft: 18,
    height: 14,
    width: 14,
  },
  heartIconViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 40,
  },
  viewOverlay: {
    width: '100%',
    height: 127,
    backgroundColor: theme.colors.WHITE,
  },
  sortByTextStyle: {
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.BLACK_WITH_OPACITY,
    marginLeft: 18,
  },
  sortPriceTextStyle: {
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK,
    marginLeft: 4,
    marginTop: 4,
  },
  addToCartStyles: {
    height: 46,
    marginHorizontal: 0,
    marginTop: 8,
    textAlign: 'center',
    borderColor: theme.colors.BLACK,
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
    paddingTop: 10,
  },
  touachableStyles: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seperatorStyle: {
    ...theme.viewStyles.separator,
  },
  overlayViewStyle: {
    padding: 0,
    margin: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    elevation: 0,
  },
});

// const clothes = [
//   {
//     id: 1,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,754',
//     selected: true,
//     icon: (
//       <Cloth1
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 2,
//     name: 'Brown Suit Clothing',
//     originalPrice: '2,500',
//     discount: '',
//     specialPrice: '',
//     selected: true,
//     icon: (
//       <Cloth2
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 3,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,500',
//     discount: '',
//     specialPrice: '2,754',
//     selected: false,
//     icon: (
//       <Cloth3
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 4,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,574',
//     selected: true,
//     icon: (
//       <Cloth4
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 5,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,754',
//     selected: false,
//     icon: (
//       <Cloth1
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 6,
//     name: 'Brown Suit Clothing',
//     originalPrice: '2,500',
//     discount: '',
//     specialPrice: '',
//     selected: false,
//     icon: (
//       <Cloth2
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 7,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,500',
//     discount: '',
//     specialPrice: '2,754',
//     selected: true,
//     icon: (
//       <Cloth3
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 8,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,574',
//     selected: false,
//     icon: (
//       <Cloth4
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 9,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,754',
//     selected: false,
//     icon: (
//       <Cloth1
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 10,
//     name: 'Brown Suit Clothing',
//     originalPrice: '2,500',
//     discount: '',
//     specialPrice: '',
//     selected: false,
//     icon: (
//       <Cloth2
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 11,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,500',
//     discount: '',
//     specialPrice: '2,754',
//     selected: false,
//     icon: (
//       <Cloth3
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 12,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,574',
//     selected: false,
//     icon: (
//       <Cloth4
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 13,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,754',
//     selected: false,
//     icon: (
//       <Cloth1
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 14,
//     name: 'Brown Suit Clothing',
//     originalPrice: '2,500',
//     discount: '',
//     specialPrice: '',
//     selected: false,
//     icon: (
//       <Cloth2
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 15,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,500',
//     discount: '',
//     specialPrice: '2,754',
//     selected: false,
//     icon: (
//       <Cloth3
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
//   {
//     id: 16,
//     name: 'Grey Solid Suit  Clothing',
//     originalPrice: '3,000',
//     discount: '20% off',
//     specialPrice: '2,574',
//     selected: false,
//     icon: (
//       <Cloth4
//         style={{
//           width: width / 2 - 24,
//           height: 164,
//         }}
//       />
//     ),
//   },
// ];

export const WishList = ({navigation}) => {
  // const [arrayObjects, setArrayObjects] = useState(clothes);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [showAddToCartAlert, setShowAddToCartAlert] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistAlert, setWishlistAlert] = useState(false);
  const [wishlistAlertText, setWishlistAlertText] = useState('');
  const {GET_ITEMS_FROM_WISHLIST, REMOVE_ITEM_FROM_WISHLIST} = restEndPoints;
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const [loading, setLoading] = useState(false);
  const {addToCart, loading: apiLoading, apiError, apiErrorText} = useContext(
    ShoppingCartContext,
  );

  const getWishlistItems = async () => {
    setLoading(true);
    try {
      await axios
        .get(GET_ITEMS_FROM_WISHLIST.URL(uuid), {headers: requestHeaders})
        .then((apiResponse) => {
          setLoading(false);
          // console.log(apiResponse.data.response, 'response.........');
          if (apiResponse.data.status === 'success') {
            const wlItems = apiResponse.data.response.wlItems;
            if (wlItems && wlItems.length > 0) {
              setWishlistItems(apiResponse.data.response.wlItems);
              setBusinessLocations(apiResponse.data.response.businessLocations);
            } else {
              setShowAlert(true);
              setAlertText('No products are available in your Wishlist');
            }
          } else {
            setShowAlert(true);
            setAlertText('No products are available in Wishlist');
          }
        })
        .catch((error) => {
          setLoading(false);
          setShowAlert(true);
          setAlertText(
            'Unable to fetch Items from your Wishlist at this moment.',
          );
          // console.log(error);
        });
    } catch (e) {
      // console.log(e);
      setLoading(false);
      setShowAlert(true);
      setAlertText('Network error. Please try again.');
    }
  };

  const manageItemInWishlist = async (itemID) => {
    setWishlistLoading(true);
    setWishlistAlert(true);
    try {
      await axios
        .delete(REMOVE_ITEM_FROM_WISHLIST.URL(uuid), {
          headers: requestHeaders,
          data: {wishListItems: [{wlItemCode: itemID}]},
        })
        .then((apiResponse) => {
          setWishlistLoading(false);
          // console.log(apiResponse.data.status);
          if (apiResponse.data.status === 'success') {
            getWishlistItems();
            setWishlistAlertText('Product removed from Wishlist.');
          }
        })
        .catch((error) => {
          // console.log(error);
          setWishlistLoading(false);
          setWishlistAlertText('Oops, something went wrong.');
          // console.log(errorText);
          // const errorText = error.response.data.errortext;
          // setApiError(true);
        });
    } catch (e) {
      // console.log(e);
      setWishlistLoading(false);
      setWishlistAlertText('Network error. Please try again.');
    }
  };

  useEffect(() => {
    if (uuid && uuid.length > 0) {
      getWishlistItems();
    }
  }, [uuid]);

  // useEffect(() => {
  //   if (!apiLoading && !wishlistAlert) {
  //     if (apiError && apiErrorText && apiErrorText.length > 0) {
  //       setAlertText(apiErrorText);
  //     } else {
  //       setAlertText('Product added to Cart successfully :)');
  //     }
  //   }
  // }, [apiError, apiLoading, apiErrorText, wishlistAlert]);

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Wish List'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
      />
    );
  };

  const renderRow = (item) => {
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
    return businessLocations && businessLocations.length > 0 ? (
      <View style={styles.rowStyles}>
        <Image
          source={{uri: imageUrl}}
          style={{
            width: width / 2 - 24,
            height: 164,
          }}
        />
        <Text style={styles.rowTextStyle}>{item.itemName}</Text>
        <Text style={styles.specialPriceStyle}>₹{item.itemRate}</Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.heartIconViewStyles}
          onPress={() => {
            manageItemInWishlist(item.itemID);
          }}>
          <HeartSelected style={styles.iconHeartStyle} />
        </TouchableOpacity>
        <Text
          style={styles.addToCartStyles}
          onPress={() => {
            const cartItem = {
              cartItems: [{itemCode: item.itemID, itemQty: 1}],
            };
            // console.log(cartItem);
            setShowAddToCartAlert(true);
            addToCart(cartItem);
          }}>
          ADD TO CART
        </Text>
      </View>
    ) : null;
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={wishlistItems}
        numColumns={2}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={(item) => item.itemID}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {wishlistItems && wishlistItems.length > 0 && renderListView()}
      {showAlert && (
        <CommonAlertView
          showLoader={false}
          showSuceessPopup={showAlert}
          onPressSuccessButton={() => {
            setShowAlert(false);
            navigation.push(ScreenNamesCustomer.TABBAR);
          }}
          successTitle={alertText}
        />
      )}
      {showAddToCartAlert && (
        <CommonAlertView
          showLoader={apiLoading}
          showSuceessPopup={!apiLoading}
          onPressSuccessButton={() => {
            setShowAddToCartAlert(false);
          }}
          successTitle={alertText}
        />
      )}
      {wishlistAlert && (
        <CommonAlertView
          showLoader={wishlistLoading}
          showSuceessPopup={!wishlistLoading}
          onPressSuccessButton={() => {
            setWishlistAlert(false);
          }}
          successTitle={wishlistAlertText}
        />
      )}
    </View>
  );
};
