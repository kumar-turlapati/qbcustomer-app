import React, {useState, useEffect} from 'react';
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
import {getAccessToken} from '../../utils/general';
import {Loader} from '../Loader';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _forEach from 'lodash/forEach';
import _find from 'lodash/find';

const {height, width} = Dimensions.get('window');

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

const clothes = [
  {
    id: 1,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth1
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 2,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: (
      <Cloth2
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 3,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth3
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 4,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: (
      <Cloth4
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 5,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth1
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 6,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: (
      <Cloth2
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 7,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth3
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 8,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: (
      <Cloth4
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 9,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth1
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 10,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: (
      <Cloth2
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 11,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth3
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 12,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: (
      <Cloth4
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 13,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth1
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 14,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: (
      <Cloth2
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 15,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: (
      <Cloth3
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
  {
    id: 16,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: (
      <Cloth4
        style={{
          width: width / 2 - 24,
          height: 164,
        }}
      />
    ),
  },
];

export const Home = ({navigation}) => {
  const [arrayObjects, setArrayObjects] = useState(clothes);
  const [showSortView, setShowSortView] = useState(false);
  const [lowToHightSelected, setLowToHightSelected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [defaultCatalogDetails, setDefaultCatalogDetails] = useState([]);
  const [catalogBrands, setCatalogBrands] = useState([]);
  const [catalogCategories, setCatalogCategories] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);

  const accessToken = getAccessToken();
  const {CATALOGS, CATALOG_DETAILS} = restEndPoints;

  const getCatalogDetails = async (defaultCatalogCode, requestHeaders) => {
    setLoading(true);
    try {
      await axios
        .get(CATALOG_DETAILS.URL(defaultCatalogCode), {headers: requestHeaders})
        .then((apiResponse) => {
          if (apiResponse.data.status === 'success') {
            setDefaultCatalogDetails(apiResponse.data.response);
          }
          setLoading(false);
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          console.log(errorText);
        });
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getCatalogs = async (requestHeaders) => {
      setLoading(true);
      try {
        await axios
          .get(CATALOGS.URL, {headers: requestHeaders})
          .then((apiResponse) => {
            if (apiResponse.data.status === 'success') {
              const defaultCatalog = apiResponse.data.response.catalogs.find(
                (catalogDetails) => catalogDetails.isDefault === '1',
              );
              const defaultCatalogCode = defaultCatalog
                ? defaultCatalog.catalogCode
                : '';
              getCatalogDetails(defaultCatalogCode, requestHeaders);
            }
            setLoading(false);
          })
          .catch((error) => {
            const errorText = error.response.data.errortext;
            console.log(errorText);
          });
      } catch {
        setLoading(false);
      }
    };
    if (accessToken && accessToken.length > 0) {
      requestHeaders['Access-Token'] = accessToken;
      getCatalogs(requestHeaders);
    }
  }, [accessToken]);

  useEffect(() => {
    if (defaultCatalogDetails) {
      let businessLocations = [];
      const catalogBrands = _uniq(
        _map(defaultCatalogDetails.catalogItems, 'brandName'),
      );
      const catalogCategories = _uniq(
        _map(defaultCatalogDetails.catalogItems, 'categoryName'),
      );
      const catalogItems = defaultCatalogDetails.catalogItems;
      setCatalogBrands(catalogBrands);
      setCatalogCategories(catalogCategories);
      setCatalogItems(catalogItems);
      setBusinessLocations(defaultCatalogDetails.businessLocations);
    }
  }, [defaultCatalogDetails]);

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Products'}
        isTabView={true}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
        isProduct={true}
        onPressFilterIcon={() => {
          setShowSortView(false);
          navigation.push(ScreenNamesCustomer.FILTER);
        }}
        onPressSortIcon={() => {
          setShowSortView(!showSortView);
        }}
      />
    );
  };

  const renderRow = (productDetails) => {
    const imageLocation = _find(
      businessLocations,
      (locationDetails) =>
        locationDetails.locationID == productDetails.locationID,
    );
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/${imageLocation.locationCode}/${productDetails.images[0].imageName}`,
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // navigation.push(ScreenNamesCustomer.PRODUCTDETAILS);
        }}>
        <View style={styles.rowStyles}>
          {/* {item.icon} */}
          <Image
            style={{
              width: '50%',
              height: '50%',
            }}
            source={{uri: imageUrl}}
          />
          <Text style={styles.rowTextStyle}>{productDetails.itemName}</Text>
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
          ) : (
            <Text style={styles.specialPriceStyle}>₹{item.originalPrice}</Text>
          )}
          <TouchableOpacity
            activeOpacity={1}
            style={styles.heartIconViewStyles}
            onPress={() => {
              clothes[index].selected = true;
              setArrayObjects([...clothes]);
            }}>
            {item.selected ? (
              <HeartSelected style={styles.iconHeartStyle} />
            ) : (
              <HeartUnSelected style={styles.iconHeartStyle} />
            )}
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
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
        renderItem={({item}) => {
          renderRow(item);
        }}
        keyExtractor={(item) => item.itemCode}
        removeClippedSubviews={true}
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
                  setLowToHightSelected(false);
                }}>
                {!lowToHightSelected ? (
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
                  setLowToHightSelected(true);
                }}>
                {lowToHightSelected ? (
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

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {catalogItems && catalogItems.length > 0 && renderListView()}
      {showSortView && renderSortView()}
    </View>
  );
};
