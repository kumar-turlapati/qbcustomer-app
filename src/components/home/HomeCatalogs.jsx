import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {theme} from '../../theme/theme';
import {
  HeartUnSelected,
  HeartSelected,
  CheckIcon,
  UnCheckIcon,
} from '../../icons/Icons';
import CommonHeader from '../UI/CommonHeader';
import {Overlay} from 'react-native-elements';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import axios from 'axios';
import {
  restEndPoints,
  requestHeaders,
  cdnUrl,
  clientCode,
} from '../../../qbconfig';
import {Loader} from '../Loader';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _forEach from 'lodash/forEach';
import _find from 'lodash/find';
import _orderBy from 'lodash/orderBy';
import _remove from 'lodash/remove';
import _compact from 'lodash/compact';
import useAsyncStorage from '../customHooks/async';
import CommonAlertView from '../UI/CommonAlertView';
import Reactotron from 'reactotron-react-native';
import {Image} from 'react-native-elements';
// import {useFocusEffect} from '@react-navigation/native';
// import {CommonActions} from '@react-navigation/native';
import {NoDataMessage} from '../NoDataMessage';
import _trim from 'lodash/trim';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  rowStyles: {
    height: 210,
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
  buttonTouchableStyles: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
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

export const HomeCatalogs = ({route, navigation}) => {
  // const [arrayObjects, setArrayObjects] = useState(clothes);
  const [showSortView, setShowSortView] = useState(false);
  const [lowToHighSelected, setLowToHighSelected] = useState(true);
  const [highToLowSelected, setHighToLowSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [defaultCatalogDetails, setDefaultCatalogDetails] = useState([]);
  const [catalogBrands, setCatalogBrands] = useState([]);
  const [catalogCategories, setCatalogCategories] = useState([]);
  const [catalogColors, setCatalogColors] = useState([]);
  const [catalogSizes, setCatalogSizes] = useState([]);
  const [brandSelected, setBrandSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [colorSelected, setColorSelected] = useState('');
  const [sizeSelected, setSizeSelected] = useState('');
  const [catalogItems, setCatalogItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);
  const [pricing, setPricing] = useState({});
  const [pricingFilterValue, setPricingFilterValue] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const {storageItem: accessToken, tokenLoading} = useAsyncStorage(
    '@accessToken',
  );
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const [catalogBrandName, setCatalogBrandName] = useState('');

  const catalogCode =
    route.params && route.params.catalogCode ? route.params.catalogCode : null;
  const catalogId =
    route.params && route.params.catalogId ? route.params.catalogId : null;
  const fetchBy =
    route.params && route.params.fetchBy ? route.params.fetchBy : 'code';

  // console.log(catalogCode, catalogId, 'catalog inputs......');
  // const accessToken = getAccessToken();
  const {
    CATALOGS,
    CATALOG_DETAILS,
    ADD_ITEM_TO_WISHLIST,
    REMOVE_ITEM_FROM_WISHLIST,
  } = restEndPoints;

  // const isFocused = useIsFocused();
  // const {fetchCart} = useContext(ShoppingCartContext);

  // useEffect(() => {
  //   if (isFocused) fetchCart();
  // }, [isFocused]);

  // console.log(route.params, 'in Home Screen');
  // const catalogCode = route.params;
  // console.log('default catalogcode$$$$$$$$$$$$$$', navigation.params);
  // console.log(brandSelected, categorySelected, '--------------------------');
  // console.log(pricingFilterValue, 'pricing filter value...........');
  // console.log(catalogItems, 'catalog items..........');

  // console.log(
  //   brandSelected,
  //   categorySelected,
  //   sizeSelected,
  //   colorSelected,
  //   'filter properties.....',
  // );

  const getCatalogDetails = async (
    defaultCatalogCode,
    byType,
    requestHeaders,
  ) => {
    setLoading(true);
    // console.log(
    //   defaultCatalogCode,
    //   byType,
    //   CATALOG_DETAILS.URL(defaultCatalogCode, byType),
    // );
    try {
      await axios
        .get(CATALOG_DETAILS.URL(defaultCatalogCode, byType), {
          headers: requestHeaders,
        })
        .then((apiResponse) => {
          setLoading(false);
          // console.log(apiResponse, 'api response.......................');
          if (apiResponse.data.status === 'success') {
            setDefaultCatalogDetails(apiResponse.data.response);
          }
        })
        .catch((error) => {
          // console.log(error.response);
          setLoading(false);
          setShowNoDataMessage(true);
          setErrorMessage('We are sorry. No data available at this moment :)');
          // const errorText = error.response.data.errortext;
          // console.log(errorText);
        });
    } catch (e) {
      // console.log(e);
      setShowNoDataMessage(true);
      setErrorMessage('Network error. Please try again :)');
      setLoading(false);
    }
  };

  const getCatalogs = async (requestHeaders) => {
    setLoading(true);
    try {
      await axios
        .get(CATALOGS.URL, {headers: requestHeaders})
        .then((apiResponse) => {
          setLoading(false);
          // Reactotron.log(apiResponse, 'Api Response in getCatalogs()');
          if (apiResponse.data.status === 'success') {
            const defaultCatalog = apiResponse.data.response.catalogs.find(
              (catalogDetails) => catalogDetails.isDefault === '1',
            );
            const defaultCatalogCode = defaultCatalog
              ? defaultCatalog.catalogCode
              : '';
            getCatalogDetails(defaultCatalogCode, requestHeaders);
          }
        })
        .catch((error) => {
          setLoading(false);
          const errorText = error.response.data.errortext;
          // console.log(errorText);
        });
    } catch {
      setLoading(false);
    }
  };

  const sortItems = (orderBy = '') => {
    // console.log(orderBy, 'orderBy.........');
    if (orderBy !== '') {
      const sortedItems = _orderBy(
        catalogItems,
        [(catalogItems) => parseInt(catalogItems.itemRate, 10)],
        [orderBy],
      );
      setCatalogItems([...sortedItems]);
    }
  };

  // useFocusEffect(
  //   useCallback(() => {
  //     const onBackPress = () => {
  //       BackHandler.exitApp();
  //       // return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  /*
  useEffect(() => {
    if (isFocused && catalogCode && catalogCode.length === 0)
      getCatalogs(requestHeaders);
    // console.log('here are ..........', isFocused, catalogCode);
  }, [isFocused, catalogCode]); */

  useEffect(() => {
    if (accessToken && accessToken.length > 0) {
      // console.log(catalogCode, catalogId, fetchBy);
      // this will set access token across the app.
      // no need of recalling it seperately in all the components
      requestHeaders['Access-Token'] = accessToken;
      if (catalogCode && catalogCode.length > 0) {
        // console.log('here....if');
        getCatalogDetails(catalogCode, 'code', requestHeaders);
      } else if (catalogId && parseInt(catalogId) > 0) {
        // console.log('here....elseif');
        getCatalogDetails(catalogId, 'id', requestHeaders);
      } else {
        // console.log('here....else');
        getCatalogs(requestHeaders);
      }
    }
  }, [accessToken]);

  useEffect(() => {
    if (
      defaultCatalogDetails &&
      defaultCatalogDetails.catalogItems &&
      Object.keys(defaultCatalogDetails.catalogItems).length > 0
    ) {
      // console.log(
      //   Object.keys(defaultCatalogDetails.catalogItems),
      //   Object.keys(defaultCatalogDetails.catalogItems).length,
      //   defaultCatalogDetails.catalogItems,
      // );
      let catalogColorsUnsorted = [],
        catalogSizesUnsorted = [];
      const catalogBrands = _uniq(
        _map(defaultCatalogDetails.catalogItems, 'brandName'),
      );
      const catalogCategories = _uniq(
        _map(defaultCatalogDetails.catalogItems, 'categoryName'),
      );
      defaultCatalogDetails.catalogItems.map((itemDetails) => {
        const color = itemDetails.itemColor;
        const size = itemDetails.itemSize;
        if (color.length > 0) {
          const colorsArray = color.split(',');
          colorsArray.map((color) => {
            catalogColorsUnsorted.push(_trim(color));
          });
        }
        if (size.length > 0) {
          const sizesArray = size.split(',');
          sizesArray.map((size) => {
            catalogSizesUnsorted.push(_trim(size));
          });
        }
      });
      const catalogItems = _compact(
        _map(defaultCatalogDetails.catalogItems, (itemDetails) => {
          if (parseFloat(itemDetails.itemRate) > 0) return itemDetails;
        }),
      );
      const catalogItemsSorted =
        catalogItems.length > 0
          ? _orderBy(
              catalogItems,
              [(catalogItemDetails) => parseFloat(catalogItemDetails.itemRate)],
              ['asc'],
            )
          : [];
      const catalogColors =
        catalogColorsUnsorted.length > 0 ? _uniq(catalogColorsUnsorted) : [];
      const catalogSizes =
        catalogSizesUnsorted.length > 0 ? _uniq(catalogSizesUnsorted) : [];
      const maxItemPrice =
        catalogItems.length > 0
          ? Math.max(...catalogItemsSorted.map((o) => parseInt(o.itemRate)), 1)
          : 0;
      const minItemPrice =
        catalogItems.length > 0
          ? Math.min(...catalogItemsSorted.map((o) => parseInt(o.itemRate)))
          : 0;
      // console.log(
      //   catalogColorsUnsorted,
      //   catalogSizesUnsorted,
      //   'in main component.....',
      // );
      // console.log(minItemPrice, '-----------------');
      // const maxItemPrice = 10000;
      // const minItemPrice = 0;
      // console.log(
      //   defaultCatalogDetails.wishlistItems,
      //   'wishlist items.........',
      // );
      setCatalogBrands(catalogBrands);
      setCatalogCategories(catalogCategories);
      setCatalogItems(catalogItemsSorted);
      setCatalogColors(catalogColors);
      setCatalogSizes(catalogSizes);
      setBusinessLocations(defaultCatalogDetails.businessLocations);
      setWishlistItems(defaultCatalogDetails.wishlistItems);
      setPricing({minimum: minItemPrice, maximum: maxItemPrice});
      setCategoryId(defaultCatalogDetails.categoryID);
      setSubCategoryId(defaultCatalogDetails.subCategoryID);
      setCatalogBrandName(defaultCatalogDetails.brandName);
    }
  }, [defaultCatalogDetails]);

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={
          defaultCatalogDetails.catalogName &&
          defaultCatalogDetails.catalogName.length > 0
            ? defaultCatalogDetails.catalogName.substring(0, 25)
            : ''
        }
        isTabView={false}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
        onPressLeftButton={() => {
          // console.log(categoryId, subCategoryId, '--------------');
          navigation.navigate(ScreenNamesCustomer.CATALOGUE, {
            brandName: catalogBrandName,
            categoryId: categoryId,
            subCategoryId: subCategoryId,
          });
        }}
        isProduct={catalogBrands.length > 0 && catalogCategories.length > 0}
        onPressFilterIcon={() => {
          setShowSortView(false);
          navigation.push(ScreenNamesCustomer.FILTER, {
            catalogBrands: catalogBrands,
            setBrandSelected: (brandSelected) =>
              setBrandSelected(brandSelected),
            catalogCategories: catalogCategories,
            setCategorySelected: (categorySelected) =>
              setCategorySelected(categorySelected),
            pricing: pricing,
            setPricingFilterValue: (pricingFilterValue) =>
              setPricingFilterValue(pricingFilterValue),
            catalogSizes: catalogSizes,
            setSizeSelected: (sizeSelected) => setSizeSelected(sizeSelected),
            catalogColors: catalogColors,
            setColorSelected: (colorSelected) =>
              setColorSelected(colorSelected),
            catalogBrandsSelected: brandSelected,
            catalogCategoriesSelected: categorySelected,
            catalogColorSelected: colorSelected,
            catalogSizeSelected: sizeSelected,
          });
        }}
        onPressSortIcon={() => {
          setShowSortView(!showSortView);
        }}
      />
    );
  };

  const renderRow = (productDetails) => {
    let brandsSelectedArray = [];
    let categoriesSelectedArray = [];
    let sizeSelectedArray = [];
    let colorSelectedArray = [];
    const minimumValue = pricing.minimum;
    if (brandSelected.length > 0)
      brandsSelectedArray = brandSelected.split(',');
    if (categorySelected.length > 0)
      categoriesSelectedArray = categorySelected.split(',');
    if (colorSelected.length > 0) colorSelectedArray = colorSelected.split(',');
    if (sizeSelected.length > 0) sizeSelectedArray = sizeSelected.split(',');
    // console.log(
    //   brandsSelectedArray,
    //   categoriesSelectedArray,
    //   colorSelectedArray,
    //   sizeSelectedArray,
    //   'hello world....',
    // );
    const isBrandFiltered =
      brandsSelectedArray.length > 0
        ? brandsSelectedArray.includes(productDetails.brandName)
        : true;
    const isCategoryFiltered =
      categoriesSelectedArray.length > 0
        ? categoriesSelectedArray.includes(productDetails.categoryName)
        : true;
    const isSizeFiltered =
      sizeSelectedArray.length > 0
        ? sizeSelectedArray.includes(productDetails.itemSize)
        : true;
    const isColorFiltered =
      colorSelectedArray.length > 0
        ? colorSelectedArray.includes(productDetails.itemColor)
        : true;
    const isPricingFilterValidated =
      parseFloat(pricingFilterValue) > 0
        ? parseFloat(productDetails.itemRate) >= minimumValue &&
          parseFloat(productDetails.itemRate) <= parseFloat(pricingFilterValue)
        : true;
    const isItemInWishlist = _find(wishlistItems, {
      itemID: String(productDetails.itemID),
    });
    // console.log(
    //   isPricingFilterValidated,
    //   pricingFilterValue,
    //   parseFloat(productDetails.itemRate) <= parseFloat(pricingFilterValue),
    //   productDetails.itemRate,
    // );
    // console.log(
    //   isItemInWishlist,
    //   'isItemInWishList...........',
    //   productDetails.itemID,
    // );
    const imageLocation = _find(
      businessLocations,
      (locationDetails) =>
        locationDetails.locationID == productDetails.locationID,
    );
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${productDetails.images[0].imageName}`,
    );
    const itemRate = parseFloat(productDetails.itemRate).toFixed(0);
    const mrp = parseFloat(productDetails.mrp).toFixed(0);
    const itemName =
      productDetails.itemName.length > 17
        ? `${productDetails.itemName.substr(0, 16)}...`
        : productDetails.itemName;
    return isCategoryFiltered &&
      isBrandFiltered &&
      isPricingFilterValidated &&
      isColorFiltered &&
      isSizeFiltered &&
      itemRate > 0 ? (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.push(ScreenNamesCustomer.PRODUCTDETAILS, {
            productDetails: productDetails,
            productLocation: imageLocation.locationCode,
            isItemInWishlist: isItemInWishlist ? true : false,
          });
        }}>
        <View style={styles.rowStyles}>
          <Image
            style={{
              width: width / 2 - 24,
              height: 164,
            }}
            source={{uri: imageUrl}}
            PlaceholderContent={<Loader />}
          />
          <Text style={styles.rowTextStyle}>{itemName}</Text>
          {/* {item.specialPrice.length !== 0 ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.specialPriceStyle}>₹{item.specialPrice}</Text>
              <Text style={styles.originalPriceStyle}>
                ₹{item.originalPrice}
              </Text>
              <Text style={styles.discountStyle}>
                {item.discount.toUpperCase()}
              </Text>
            </View>
          ) : ( */}
          <Text style={styles.specialPriceStyle}>
            WHS: ₹{itemRate} {/*/{productDetails.uomName}*/}
            {mrp > 0 && `  MRP: ₹${mrp}`}
          </Text>
          {/* )} */}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.heartIconViewStyles}
            onPress={() => {
              manageItemInWishlist(
                productDetails.itemID,
                isItemInWishlist ? true : false,
              );
            }}
            disabled={wishlistLoading}>
            {isItemInWishlist ? (
              <HeartSelected style={styles.iconHeartStyle} />
            ) : (
              <HeartUnSelected style={styles.iconHeartStyle} />
            )}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ) : (
      <></>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={catalogItems}
        numColumns={2}
        renderItem={({item}) => renderRow(item)}
        keyExtractor={(item) => item.itemName}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const close = () => {
    setShowSortView(false);
  };

  const renderSortView = () => {
    return (
      <Overlay
        onRequestClose={() => close()}
        isVisible={showSortView}
        windowBackgroundColor={theme.colors.BLACK_WITH_OPACITY_8}
        containerStyle={{
          marginBottom: 20,
        }}
        fullScreen
        transparent
        overlayStyle={styles.overlayViewStyle}>
        <View
          style={{
            flexGrow: 1,
            backgroundColor: 'transparent',
          }}>
          {renderHeader()}
          <View style={styles.viewOverlay}>
            <Text style={styles.sortByTextStyle}>SORT BY</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                marginHorizontal: 18,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // console.log(highToLowSelected);
                  setHighToLowSelected(!highToLowSelected);
                  if (!highToLowSelected) {
                    sortItems('desc');
                    setLowToHighSelected(false);
                  }
                }}>
                {highToLowSelected ? (
                  <CheckIcon style={{width: 16, height: 16}} />
                ) : (
                  <UnCheckIcon style={{width: 16, height: 16}} />
                )}
              </TouchableOpacity>
              <Text style={styles.sortPriceTextStyle}>Price - High to Low</Text>
            </View>
            <View
              style={{
                backgroundColor: 'black',
                opacity: 0.2,
                marginHorizontal: 18,
                height: 1,
                marginTop: 15,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginHorizontal: 18,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setLowToHighSelected(!lowToHighSelected);
                  if (!lowToHighSelected) {
                    sortItems('asc');
                    setHighToLowSelected(false);
                  }
                }}>
                {lowToHighSelected ? (
                  <CheckIcon style={{width: 16, height: 16}} />
                ) : (
                  <UnCheckIcon style={{width: 16, height: 16}} />
                )}
              </TouchableOpacity>
              <Text style={[styles.sortPriceTextStyle, {marginTop: 5}]}>
                Price - Low to High
              </Text>
            </View>
          </View>
        </View>
      </Overlay>
    );
  };

  const manageItemInWishlist = async (itemID, wishlistState) => {
    setWishlistLoading(true);
    setShowAlert(true);
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
            setWishlistLoading(false);
            // console.log(apiResponse.data.status);
            if (apiResponse.data.status === 'success') {
              const updatedWishlist = wishlistItems;
              _remove(
                updatedWishlist,
                (wishlistItemDetails) =>
                  parseInt(wishlistItemDetails.itemID, 10) ===
                  parseInt(itemID, 10),
              );
              setAlertText('Product removed from Wishlist successfully :)');
              // console.log(
              //   updatedWishlist,
              //   'updated wishlist is................',
              //   removedItems,
              // );
              setWishlistItems([...updatedWishlist]);
            }
          })
          .catch((error) => {
            setWishlistLoading(false);
            setAlertText('Oops, something went wrong.');
            // console.log(errorText);
            // const errorText = error.response.data.errortext;
            // setApiError(true);
          });
      } catch (e) {
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
              const updatedWishlist = wishlistItems;
              updatedWishlist.push({
                wlItemID: '',
                itemID: itemID,
              });
              setWishlistItems([...updatedWishlist]);
              setAlertText('Product added to Wishlist successfully :)');
            }
          })
          .catch((error) => {
            // console.log(error, 'error text.............');
            setAlertText('Oops, something went wrong :)');
            setWishlistLoading(false);
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

  return loading || tokenLoading ? (
    <Loader />
  ) : showNoDataMessage ? (
    <NoDataMessage message={errorMessage} />
  ) : catalogItems && catalogItems.length > 0 ? (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {showSortView && renderSortView()}
      {showAlert && (
        <CommonAlertView
          showLoader={wishlistLoading}
          showSuceessPopup={!wishlistLoading}
          onPressSuccessButton={() => {
            setShowAlert(false);
          }}
          successTitle={alertText}
        />
      )}
    </View>
  ) : !loading || !tokenLoading ? (
    // <NoDataMessage message="No products are available in this Catalog :(" />
    <></>
  ) : null;
};
