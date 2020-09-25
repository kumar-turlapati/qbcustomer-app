import {useFocusEffect} from '@react-navigation/native';
import _find from 'lodash/find';
import React, {useCallback, useState, useEffect} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  cdnUrl,
  clientCode,
  restEndPoints,
  clientName,
  requestHeaders,
  contentSections,
} from '../../../qbconfig';
import {Boy, Girl, MainImage, Men, Women} from '../../icons/Icons';
import {colors} from '../../theme/colors';
import {theme} from '../../theme/theme';
import useAsyncStorage from '../customHooks/async';
import {Loader} from '../Loader';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import CommonAlertView from '../UI/CommonAlertView';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import axios from 'axios';
import _pickBy from 'lodash/pickBy';
import _orderBy from 'lodash/orderBy';
import {useDebounce} from 'use-debounce';

const {width, height} = Dimensions.get('window');

// console.log(width / 2, 'width is.....');

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
  dotView: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: colors.WHITE,
    height: 17,
    borderRadius: 10,
  },
  sliderDotStyle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 4,
  },
  getOfferStyles: {
    color: colors.WHITE,
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: -0.41,
    marginTop: 24,
    marginLeft: 34,
  },
  offerTextStyles: {
    color: colors.WHITE,
    fontSize: 40,
    letterSpacing: -0.41,
    marginTop: 0,
    marginLeft: 34,
  },
  pickSideStyles: {
    backgroundColor: colors.WHITE,
    color: colors.RED,
    paddingVertical: 18,
    paddingLeft: 16,
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  brandRowStyles: {
    width: width / 2,
    height: 281,
    // borderRightWidth: 0.5,
    // borderRightColor: colors.SEPERATOR_COLOR,
  },
  genderTextStyles: {
    backgroundColor: colors.BLACK,
    color: colors.WHITE,
    paddingTop: 13,
    paddingLeft: 19,
    paddingBottom: 10,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  viewTextStyles: {
    color: colors.BLACK,
    paddingTop: 13,
    paddingLeft: 12,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  searchRowStyles: {
    height: 44,
    backgroundColor: theme.colors.WHITE,
    width: width,
    borderBottomColor: theme.colors.SEPERATOR_COLOR,
    borderBottomWidth: 0.5,
  },
  searchRowTextStyles: {
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: theme.colors.BLACK,
  },
});

const offerData = [
  {
    id: 1,
    offer: '40%',
    title: 'ON EXCLUSIVE',
    description: 'REYMOND’S COLLECTION',
    mainImage: (
      <MainImage style={{width: '100%', height: 406, position: 'absolute'}} />
    ),
  },
  {
    id: 2,
    offer: '60%',
    title: 'ON EXCLUSIVE',
    description: 'LENIN’S COLLECTION',
    mainImage: (
      <MainImage style={{width: '100%', height: 406, position: 'absolute'}} />
    ),
  },
  {
    id: 3,
    offer: '80%',
    title: 'ON EXCLUSIVE',
    description: 'ARROW’S COLLECTION',
    mainImage: (
      <MainImage style={{width: '100%', height: 406, position: 'absolute'}} />
    ),
  },
  {
    id: 4,
    offer: '100%',
    title: 'ON EXCLUSIVE',
    description: 'J&J’S COLLECTION',
    mainImage: (
      <MainImage style={{width: '100%', height: 406, position: 'absolute'}} />
    ),
  },
];

const genderData = [
  {
    id: 1,
    title: 'Men’s',
    image: <Men style={{width: 189, height: 187}} />,
  },
  {
    id: 2,
    title: 'Women’s',
    image: <Women style={{width: 189, height: 187}} />,
  },
  {
    id: 3,
    title: 'Boy’s',
    image: <Boy style={{width: 189, height: 187}} />,
  },
  {
    id: 4,
    title: 'Girl’s',
    image: <Girl style={{width: 189, height: 187}} />,
  },
];

export const NewHome = ({route, navigation}) => {
  const [showSortView, setShowSortView] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [banners, setBanners] = useState([]);
  const [topBrands, setTopBrands] = useState([]);
  const [hotSellers, setHotSellers] = useState([]);
  const [catsSubcats, setCatsSubcats] = useState([]);
  const [appContentLoading, setAppContentLoading] = useState(true);
  const [catsSubcatsLoading, setCatsSubcatsLoading] = useState(true);
  const [appContentErrorText, setAppContentErrorText] = useState('');
  const [catsSubcatsErrorText, setCatsSubcatsErrorText] = useState('');
  const {storageItem: accessToken, tokenLoading} = useAsyncStorage(
    '@accessToken',
  );
  const {CATS_SUBCATS, APP_CONTENT, CATALOG_ITEMS_AC} = restEndPoints;
  const [searchItemsResult, setSearchItemsResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [debouncedText] = useDebounce(searchText, 1000);

  // console.log(searchData, '-------------------------------');

  const searchItems = async () => {
    // console.log(debouncedText, 'debouncedText is........');
    if (searchText.length >= 3) {
      try {
        await axios
          .get(`${CATALOG_ITEMS_AC.URL}?q=${debouncedText}`, {
            headers: requestHeaders,
          })
          .then((apiResponse) => {
            setSearchData(apiResponse.data);
          })
          .catch((error) => {
            // console.log(error.response, '@@@@@@@@@@@@@@@@@@@@@@@@@@');
          });
      } catch (error) {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        // return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const getCatsSubcats = async () => {
      try {
        await axios
          .get(CATS_SUBCATS.URL, {headers: requestHeaders})
          .then((apiResponse) => {
            setCatsSubcatsLoading(false);
            // console.log(apiResponse.data, 'cats subcats');
            if (apiResponse.data.status === 'success') {
              const response = apiResponse.data.response;
              setCatsSubcats(response);
            } else {
              setCatsSubcatsErrorText('Unable to fetch content :(');
            }
          })
          .catch((error) => {
            // console.log(
            //   error,
            //   '@@@@@@@@@@@@@@@@@@@@@@@@@@',
            // );
            setCatsSubcatsLoading(false);
            setCatsSubcatsErrorText(error.response.data.errortext);
          });
      } catch (error) {
        setCatsSubcatsLoading(false);
        setCatsSubcatsErrorText('Network error. Please try again :(');
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      }
    };

    if (accessToken && accessToken.length > 0) {
      requestHeaders['Access-Token'] = accessToken;
      getCatsSubcats();
    }
  }, [accessToken]);

  useEffect(() => {
    const getAppContent = async () => {
      try {
        await axios
          .get(APP_CONTENT.URL, {headers: requestHeaders})
          .then((apiResponse) => {
            setAppContentLoading(false);
            if (apiResponse.data.status === 'success') {
              const response = apiResponse.data.response;
              let banners = [],
                topBrands = [],
                hotSellers = [];
              response.map((responseDetails) => {
                if (
                  responseDetails.contentCategory ===
                  contentSections.MAIN_BANNER
                )
                  banners.push(responseDetails);
                if (
                  responseDetails.contentCategory === contentSections.TOP_BRANDS
                )
                  topBrands.push(responseDetails);
                if (
                  responseDetails.contentCategory ===
                  contentSections.HOT_SELLERS
                )
                  hotSellers.push(responseDetails);
              });
              setBanners([...banners]);
              setHotSellers([...hotSellers]);
              setTopBrands([...topBrands]);
            } else {
              setAppContentErrorText('No Content available :(');
            }
          })
          .catch((error) => {
            setAppContentLoading(false);
            // console.log(
            //   error,
            //   requestHeaders,
            //   '@@@@@@@@@@@@@@@@@@@@@@@@@@',
            // );
            setAppContentErrorText(error.response.data.errortext);
          });
      } catch (error) {
        setAppContentLoading(false);
        setAppContentErrorText('Network error. Please try again :(');
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
      }
    };
    if (accessToken && accessToken.length > 0) {
      requestHeaders['Access-Token'] = accessToken;
      getAppContent();
    }
  }, [accessToken]);

  const renderHeader = () => {
    return (
      <CommonSearchHeader
        leftSideText={`Welcome to ${clientName}`}
        isSearch={showSearch}
        isTabView
        onPressSearchIcon={() => {
          // console.log('onPressSearchIcon');
          setShowSearch(true);
        }}
        onPressSearchCloseButton={() => {
          // console.log('onPressSearchCloseButton');
          setSearchData([]);
        }}
        onTextChange={(changedText) => {
          setSearchText(changedText);
          if (changedText.length === 0) {
            setSearchData([]);
          } else {
            searchItems();
          }
        }}
        onPressBackButton={() => {
          // console.log('onPressBackButton');
          setSearchData([]);
          setSearchText('');
          setShowSearch(false);
        }}
      />
    );
  };

  const renderRow = (item) => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/categories/${item.imageName}`,
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
          navigation.push(ScreenNamesCustomer.SHOWBRANDS, {
            title: item.title,
          });
        }}>
        <Text style={styles.genderTextStyles}>{item.contentTitle}</Text>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const renderListViewTopBrands = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={topBrands}
        horizontal={true}
        renderItem={({item}) => renderRow(item)}
        keyExtractor={(item) => item.contentCode}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderHeaderComponent = () => {
    return (
      <>
        {renderMainView()}
        <Text style={styles.pickSideStyles}>Pick your side</Text>
      </>
    );
  };

  const renderFlatListPaginationTopBrands = () => {
    return (
      <View>
        <Text style={styles.pickSideStyles}>Top Brands</Text>
      </View>
    );
  };

  const renderFlatListPaginationHotSellers = () => {
    return (
      <View>
        <Text style={styles.pickSideStyles}>Hot Sellers</Text>
      </View>
    );
  };

  const renderListViewHotSellers = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={hotSellers}
        horizontal={true}
        renderItem={({item}) => renderRow(item)}
        keyExtractor={(item) => item.contentCode}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderBrandsList = () => {
    let categories = [];
    catsSubcats.map((catSubCatDetails) => {
      if (parseInt(catSubCatDetails.parentID) === 0)
        categories.push(catSubCatDetails);
    });
    const orderedCategories = _orderBy(categories, ['weight'], ['asc']);
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={orderedCategories}
        numColumns={2}
        renderItem={({item}) => renderBrandRow(item)}
        keyExtractor={(item) => item.categoryCode}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderHeaderComponent()}
        ListFooterComponent={
          (topBrands.length > 0 || hotSellers.length > 0) &&
          renderFooterComponent()
        }
      />
    );
  };

  const renderFooterComponent = () => {
    return (
      <>
        <View
        // style={{
        //   width: '100%',
        //   height: 0.5,
        //   backgroundColor: colors.SEPERATOR_COLOR,
        // }}
        />
        {topBrands.length > 0 && (
          <>
            {renderFlatListPaginationTopBrands()}
            {renderListViewTopBrands()}
          </>
        )}
        {hotSellers.length > 0 && (
          <>
            {renderFlatListPaginationHotSellers()}
            {renderListViewHotSellers()}
          </>
        )}
      </>
    );
  };

  const renderBrandRow = (item) => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/categories/${item.imageName}`,
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
          navigation.push(ScreenNamesCustomer.SHOWBRANDS, {
            title: item.categoryName,
            catsSubcats: catsSubcats,
            categoryId: item.categoryID,
          });
        }}>
        <Text style={styles.genderTextStyles}>{item.categoryName}</Text>
        <Image
          source={{uri: imageUrl}}
          style={{width: width / 2, height: width / 2}}
          resizeMode="contain"
        />
        {/* <Text style={styles.viewTextStyles}>View All Brands</Text> */}
      </TouchableOpacity>
    );
  };

  const renderMainView = () => {
    return (
      <View style={{width: '100%', height: 406}}>
        {renderCarouselView()}
        {!appContentLoading && renderSliderDotView()}
      </View>
    );
  };

  const renderCarouselView = () => {
    return (
      <View style={{position: 'absolute', width: '100%', height: 406, top: 0}}>
        {appContentLoading ? (
          <Loader />
        ) : (
          <Carousel
            onSnapToItem={(slideIndex) => setSlideIndex(slideIndex)}
            data={banners}
            renderItem={renderSliderItem}
            sliderWidth={width}
            itemWidth={width}
            loop
            autoplay
            autoplayDelay={3000}
            autoplayInterval={3000}
            layout="default"
          />
        )}
      </View>
    );
  };

  const renderSliderDotView = () => {
    return (
      <View style={styles.dotView}>
        {offerData.map((_, index) =>
          index == slideIndex
            ? renderDot(true, index)
            : renderDot(false, index),
        )}
      </View>
    );
  };

  const renderDot = (active, index) => (
    <View
      style={[
        styles.sliderDotStyle,
        {
          backgroundColor: active
            ? theme.colors.ACTIVE_CAROUSEL_COLOR
            : theme.colors.ACTIVE_BLACK_CAROUSEL_COLOR,
        },
      ]}
      key={index}
    />
  );

  const renderSliderItem = ({item}) => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/app-content/${item.imageName}`,
    );
    return (
      <>
        <Image
          source={{uri: imageUrl}}
          PlaceholderContent={<Loader />}
          style={{width: '100%', height: 406, position: 'absolute'}}
          resizeMode="stretch"
        />
        {/* {item.mainImage} */}
        {/* {offerData.length > 1 && (
          <>
            <RectangleOverlay
              style={{
                position: 'absolute',
                width: '100%',
                height: 157,
                bottom: 0,
              }}
            />
            <SideRectangle
              style={{
                position: 'absolute',
                width: 174,
                height: 157,
                bottom: 0,
                left: 0,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                width: '100%',
                height: 157,
                bottom: 0,
              }}>
              <View>
                <Text style={styles.getOfferStyles}>GET</Text>
                <Text style={styles.offerTextStyles}>{item.offer}</Text>
                <Text style={[styles.getOfferStyles, {marginTop: 0}]}>OFF</Text>
              </View>
              <View style={{left: 160, position: 'absolute'}}>
                <Text
                  style={[
                    styles.offerTextStyles,
                    {fontSize: 16, marginTop: 50, marginLeft: 0},
                  ]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.offerTextStyles,
                    {fontSize: 15, marginLeft: 0},
                  ]}>
                  {item.description}
                </Text>
              </View>
            </View>
          </>
        )} */}
      </>
    );
  };

  const renderSearchView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          position: 'absolute',
          marginTop: 88,
          height: height - 88,
          backgroundColor: theme.colors.BLACK_WITH_OPACITY_5,
        }}
        data={searchData}
        renderItem={({item}) => renderSearchRow(item)}
        keyExtractor={(item) => item}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderSearchRow = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchRowStyles}
        onPress={() => {
          alert(item);
          // navigation.push(ScreenNamesCustomer.SHOWBRANDS, {
          //   title: item,
          // });
        }}>
        <Text style={styles.searchRowTextStyles}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {!catsSubcatsLoading && renderBrandsList()}
      {showSortView && renderSortView()}
      {showSearch && renderSearchView()}
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
  );
};
