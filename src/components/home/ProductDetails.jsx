import React, {useState, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  Image,
} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import Carousel from 'react-native-snap-carousel';
// import {Product, ProductFullScreen, CrossIcon} from '../../icons/Icons';
import {CrossIcon} from '../../icons/Icons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {ShoppingCartContext} from '../context/ShoppingCart';
import {cdnUrl, clientCode} from '../../../qbconfig';
import CommonAlertView from '../UI/CommonAlertView';

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

// const filterOptions = [
//   {
//     id: 1,
//     icon: <Product />,
//   },
//   {
//     id: 2,
//     icon: <Product />,
//   },
//   {
//     id: 3,
//     icon: <Product />,
//   },
//   {
//     id: 4,
//     icon: <Product />,
//   },
// ];

export const ProductDetails = ({route, navigation}) => {
  // const [arrayObjects, setArrayObjects] = useState(filterOptions);
  const [orderQty, setOrderQty] = useState('1');
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const productImages = route.params.productDetails.images;
  const productLocationKey = route.params.productLocation;
  const productRate = route.params.productDetails.itemRate;
  const productName = route.params.productDetails.itemName;
  const productCode = route.params.productDetails.itemID;
  const productDescription = route.params.productDetails.itemDescription;
  const {addToCart, loading: apiLoading, apiError, apiErrorText} = useContext(
    ShoppingCartContext,
  );
  const buttonDisable = parseInt(orderQty, 10) <= 0;

  // console.log(slideIndex, productImages.length, '---------');
  // console.log(addToCart());

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Product Details'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {}}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {}}
      />
    );
  };

  const renderDot = (active) => (
    <View
      style={[
        styles.sliderDotStyle,
        {
          backgroundColor: active
            ? theme.colors.ACTIVE_CAROUSEL_COLOR
            : theme.colors.IN_ACTIVE_CAROUSEL_COLOR,
        },
      ]}
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
        }}>
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
          index == slideIndex ? renderDot(true) : renderDot(false),
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
        <Image
          source={{uri: imageUrl}}
          style={{width: winWidth, height: winHeight}}
        />
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
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={3000}
          layout={'default'}
        />
      </View>
    );
  };

  const renderCarouselView = () => {
    return (
      <View>
        <Carousel
          onSnapToItem={setSlideIndex}
          data={productImages}
          renderItem={renderSliderItem}
          sliderWidth={winWidth}
          itemWidth={winWidth - 80}
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
        {productImages.map((_, index) =>
          index == slideIndex ? renderDot(true) : renderDot(false),
        )}
      </View>
    );
  };

  const renderTitleAndButton = () => {
    return (
      <View style={styles.titleViewStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleStyle}>{productName}</Text>
          <Text style={styles.instockStyles}>Instock</Text>
        </View>
        <Text style={styles.priceStyles}>₹{productRate}</Text>
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
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buyNowStyles}
            onPress={() => {
              navigation.push(ScreenNamesCustomer.CARTVIEW);
            }}>
            <Text style={[styles.addToCartStyle, {color: theme.colors.WHITE}]}>
              BUY NOW
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderDiscription = () => {
    return (
      <View style={styles.descripitonViewStyle}>
        <View style={styles.descripitonSubViewStyle} />
        <Text style={styles.descriptionTextStyle}>Description</Text>
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
        <View style={{marginLeft: 24, marginTop: 16}}>
          {/* <Text style={styles.addToCartStyle}>{'Size & Fit'}</Text> */}
          <Text style={styles.addToCartStyle}>{productDescription}</Text>
          {/* <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'Fabric Length 3.6m'}
          </Text> */}
        </View>
        {/* <View style={{marginLeft: 24, marginTop: 26}}>
          <Text style={styles.addToCartStyle}>{'Magerial & Care'}</Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'70 % Polyester, 30 % Rayon'}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'Machine Wash'}
          </Text>
        </View>
        <View style={{marginLeft: 24, marginTop: 24}}>
          <Text style={styles.addToCartStyle}>{'Specifications'}</Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'Fabric - Polyester'}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'Fabric2 - Viscose Rayon'}
          </Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'Type - Suit'}
          </Text>
        </View> */}
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {renderCarouselView()}
      {renderSliderDotView()}
      {renderTitleAndButton()}
      {renderDiscription()}
      {showFullScreen && renderImageFullScreen()}
      {showFullScreen && renderSliderFullDotView()}
      {showFullScreen && renderSliderFullClose()}
      {showAlert && (
        <CommonAlertView
          showLoader={apiLoading}
          showSuceessPopup={!apiLoading}
          onPressSuccessButton={() => {
            setShowSuccessAlert(false);
            setShowAlert(false);
          }}
          successTitle="Item added to Cart successfully."
        />
      )}
    </ScrollView>
  );
};
