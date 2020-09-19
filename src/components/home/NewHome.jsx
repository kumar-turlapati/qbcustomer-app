import { useFocusEffect } from '@react-navigation/native';
import _find from 'lodash/find';
import React, { useCallback, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  cdnUrl,
  clientCode
} from '../../../qbconfig';
import {
  Boy,
  Girl,
  HeartSelected,
  HeartUnSelected,
  MainImage,
  Men,
  RectangleOverlay,
  SideRectangle,
  Women
} from '../../icons/Icons';
import { colors } from '../../theme/colors';
import { theme } from '../../theme/theme';
import useAsyncStorage from '../customHooks/async';
import { Loader } from '../Loader';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';
import CommonAlertView from '../UI/CommonAlertView';
import CommonSearchHeader from '../UI/CommonSearchHeader';

const { width, height } = Dimensions.get('window');

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
    borderRadius: 10
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
    marginLeft: 34
  },
  offerTextStyles: {
    color: colors.WHITE,
    fontSize: 40,
    letterSpacing: -0.41,
    marginTop: 0,
    marginLeft: 34
  },
  pickSideStyles: {
    backgroundColor: colors.WHITE,
    color: colors.BLACK,
    paddingVertical: 18,
    paddingLeft: 16,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.41
  },
  brandRowStyles: {
    width: width / 2,
    height: 281,
    borderRightWidth: 0.5,
    borderRightColor: colors.SEPERATOR_COLOR
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
    letterSpacing: - 0.41
  },
  viewTextStyles: {
    color: colors.BLACK,
    paddingTop: 13,
    paddingLeft: 12,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: - 0.41
  },
  searchRowStyles: {
    height: 44,
    backgroundColor: theme.colors.WHITE,
    width: width,
    borderBottomColor: theme.colors.SEPERATOR_COLOR,
    borderBottomWidth: 0.5
  },
  searchRowTextStyles: {
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.408,
    color: theme.colors.BLACK
  }
});

const offerData = [
  {
    id: 1,
    offer: '40%',
    title: 'ON EXCLUSIVE',
    description: 'REYMOND’S COLLECTION',
    mainImage: <MainImage style={{ width: '100%', height: 406, position: 'absolute' }} />
  },
  {
    id: 2,
    offer: '60%',
    title: 'ON EXCLUSIVE',
    description: 'LENIN’S COLLECTION',
    mainImage: <MainImage style={{ width: '100%', height: 406, position: 'absolute' }} />
  },
  {
    id: 3,
    offer: '80%',
    title: 'ON EXCLUSIVE',
    description: 'ARROW’S COLLECTION',
    mainImage: <MainImage style={{ width: '100%', height: 406, position: 'absolute' }} />
  },
  {
    id: 4,
    offer: '100%',
    title: 'ON EXCLUSIVE',
    description: 'J&J’S COLLECTION',
    mainImage: <MainImage style={{ width: '100%', height: 406, position: 'absolute' }} />
  }
]

const genderData = [
  {
    id: 1,
    title: 'Men’s',
    image: <Men style={{ width: 189, height: 187 }} />
  },
  {
    id: 2,
    title: 'Women’s',
    image: <Women style={{ width: 189, height: 187 }} />
  },
  {
    id: 3,
    title: 'Boy’s',
    image: <Boy style={{ width: 189, height: 187 }} />
  },
  {
    id: 4,
    title: 'Girl’s',
    image: <Girl style={{ width: 189, height: 187 }} />
  }
]

export const NewHome = ({ route, navigation }) => {
  // const [arrayObjects, setArrayObjects] = useState(clothes);
  const [showSortView, setShowSortView] = useState(false);
  const [lowToHighSelected, setLowToHighSelected] = useState(true);
  const [highToLowSelected, setHighToLowSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [defaultCatalogDetails, setDefaultCatalogDetails] = useState([]);
  const [catalogBrands, setCatalogBrands] = useState([]);
  const [catalogCategories, setCatalogCategories] = useState([]);
  const [brandSelected, setBrandSelected] = useState('');
  const [categorySelected, setCategorySelected] = useState('');
  const [catalogItems, setCatalogItems] = useState([]);
  const [businessLocations, setBusinessLocations] = useState([]);
  const [pricing, setPricing] = useState({});
  const [pricingFilterValue, setPricingFilterValue] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [offersCount, setOffersCount] = useState(2);
  const [searchData, setSearchData] = useState(genderData);

  const { storageItem: uuid } = useAsyncStorage('@uuid');
  const { storageItem: accessToken, tokenLoading } = useAsyncStorage(
    '@accessToken',
  );

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


  const renderHeader = () => {
    return (
      <CommonSearchHeader
        leftSideText={'Shop Name'}
        isSearch={showSearch}
        isTabView={true}
        onPressSearchIcon={() => {
          console.log('onPressSearchIcon')
          setShowSearch(true)
        }}
        onPressSearchCloseButton={() => {
          console.log('onPressSearchCloseButton')
          setSearchData(genderData)
        }}
        onTextChange={(changedText) => {
          console.log('onTextChange', changedText)
          let filteredArray = genderData.filter((str) => {
            return str.title.toLowerCase().indexOf(changedText.toLowerCase()) >= 0;
          });
          setSearchData(filteredArray)
          console.log('filteredArray', filteredArray)
        }}
        onPressBackButton={() => {
          console.log('onPressBackButton')
          setShowSearch(false)
        }}
      />
    );
  };

  const renderRow = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
          navigation.push(ScreenNamesCustomer.SHOWBRANDS, {
            title: item.title
          })
        }}
      >
        <Text style={styles.genderTextStyles}>{item.title}</Text>
        {item.image}
        <Text style={styles.viewTextStyles}>View All Brands</Text>
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
        data={genderData}
        horizontal={true}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
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
  }

  const renderFlatListPagination = () => {
    return (
      <View>
        <Text style={styles.pickSideStyles}>Hot Sellers</Text>
      </View>
    );
  }

  const renderBrandsList = () => {
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={genderData}
        numColumns={2}
        renderItem={({ item }) => renderBrandRow(item)}
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          renderHeaderComponent()
        }
        ListFooterComponent={
          renderFooterComponent()
        }
      />
    );
  }

  const renderFooterComponent = () => {
    return (
      <>
        <View style={{ width: '100%', height: 0.5, backgroundColor: colors.SEPERATOR_COLOR }} />
        {renderFlatListPagination()}
        {renderListView()}
      </>
    );
  }

  const renderBrandRow = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
          navigation.push(ScreenNamesCustomer.SHOWBRANDS, {
            title: item.title
          })
        }}
      >
        <Text style={styles.genderTextStyles}>{item.title}</Text>
        {item.image}
        <Text style={styles.viewTextStyles}>View All Brands</Text>
      </TouchableOpacity>
    )
  }

  const renderMainView = () => {
    return (
      <View style={{ width: '100%', height: 406 }}>
        {/* <MainImage style={{ width: '100%', height: 406 }} /> */}
        {renderCarouselView()}
        {renderSliderDotView()}
      </View>
    );
  }

  const renderCarouselView = () => {
    return (
      <View style={{ position: 'absolute', width: '100%', height: 406, top: 0 }}>
        <Carousel
          onSnapToItem={(slideIndex) => setSlideIndex(slideIndex)}
          data={offerData}
          renderItem={renderSliderItem}
          sliderWidth={width}
          itemWidth={width}
          loop
          autoplay
          autoplayDelay={3000}
          autoplayInterval={3000}
          layout="default"
        />
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

  const renderSliderItem = ({ item }) => {
    return (
      <>
        {item.mainImage}
        {offerData.length > 1 && (
          <>
            <RectangleOverlay style={{ position: 'absolute', width: '100%', height: 157, bottom: 0 }} />
            <SideRectangle style={{ position: 'absolute', width: 174, height: 157, bottom: 0, left: 0 }} />
            <View style={{ flexDirection: 'row', position: 'absolute', width: '100%', height: 157, bottom: 0 }}>
              <View>
                <Text style={styles.getOfferStyles}>GET</Text>
                <Text style={styles.offerTextStyles}>{item.offer}</Text>
                <Text style={[styles.getOfferStyles, { marginTop: 0 }]}>OFF</Text>
              </View>
              <View style={{ left: 160, position: 'absolute' }}>
                <Text style={[styles.offerTextStyles, { fontSize: 16, marginTop: 50, marginLeft: 0 }]}>{item.title}</Text>
                <Text style={[styles.offerTextStyles, { fontSize: 15, marginLeft: 0 }]}>{item.description}</Text>
              </View>
            </View>
          </>
        )
        }

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
          backgroundColor: theme.colors.BLACK_WITH_OPACITY_5
        }}
        data={searchData}
        renderItem={({ item }) => renderSearchRow(item)}
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  const renderSearchRow = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchRowStyles}
        onPress={() => {
          navigation.push(ScreenNamesCustomer.SHOWBRANDS, {
            title: item.title
          })
        }}
      >
        <Text style={styles.searchRowTextStyles}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBrandsList()}
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
