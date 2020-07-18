import React, {useState} from 'react';
import {Dimensions, StyleSheet, View, Text, TextInput} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import Carousel from 'react-native-snap-carousel';
import {Product, ProductFullScreen, CrossIcon} from '../../icons/Icons';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';

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
});

const filterOptions = [
  {
    id: 1,
    icon: <Product />,
  },
  {
    id: 2,
    icon: <Product />,
  },
  {
    id: 3,
    icon: <Product />,
  },
  {
    id: 4,
    icon: <Product />,
  },
];

export const ProductDetails = ({navigation}) => {
  const [arrayObjects, setArrayObjects] = useState(filterOptions);
  const [quantityText, setQuantityText] = useState('1');
  const [showFullScreen, setShowFullScreen] = useState(false);

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

  const [slideIndex, setSlideIndex] = useState(0);

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

  const renderSliderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setShowFullScreen(true);
        }}>
        <View style={styles.onboardingViewStyles}>
          <Product style={{height: 250, width: winWidth - 80}} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderSliderFullDotView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          top: 60,
          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
          paddingHorizontal: 10,
          position: 'absolute',
          paddingBottom: 4,
        }}>
        {filterOptions.map((_, index) =>
          index == slideIndex ? renderDot(true) : renderDot(false),
        )}
      </View>
    );
  };

  const renderSliderFullClose = () => {
    return (
      <View
        style={{
          width: 30,
          height: 30,
          position: 'absolute',
          right: 20,
          top: 55,
        }}>
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

  const renderSliderFullView = ({item, index}) => {
    return (
      <View>
        <ProductFullScreen style={{width: winWidth, height: winHeight}} />
      </View>
    );
  };

  const renderImageFullScreen = () => {
    return (
      <View
        style={{
          position: 'absolute',
          width: winWidth,
          height: winHeight,
          backgroundColor: 'white',
        }}>
        <Carousel
          onSnapToItem={setSlideIndex}
          data={filterOptions}
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
          data={filterOptions}
          renderItem={renderSliderItem}
          sliderWidth={winWidth}
          itemWidth={winWidth - 80}
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={3000}
          layout={'default'}
        />
      </View>
    );
  };

  const renderSliderDotView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
          alignSelf: 'center',
        }}>
        {filterOptions.map((_, index) =>
          index == slideIndex ? renderDot(true) : renderDot(false),
        )}
      </View>
    );
  };

  const renderTitleAndButton = () => {
    return (
      <View style={styles.titleViewStyle}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleStyle}>Brown Suit Clothing</Text>
          <Text style={styles.instockStyles}>Instock</Text>
        </View>
        <Text style={styles.priceStyles}>₹2,500</Text>
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
              borderColor: 'black',
              borderRadius: 3,
            }}>
            <TextInput
              style={styles.textInputStyles}
              onChangeText={(changedText) => {
                setQuantityText(changedText);
              }}
              value={quantityText}
              maxLength={3}
              onEndEditing={(e) => {}}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={{
                width: 120,
                height: 46,
                alignItems: 'center',
                justifyContent: 'center',
                borderLeftColor: 'black',
                borderLeftWidth: 2,
              }}
              onPress={() => {
                navigation.push(ScreenNamesCustomer.CARTVIEW);
              }}>
              <Text style={styles.addToCartStyle}>ADD TO CART</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={{
              width: 150,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 3,
              backgroundColor: theme.colors.RED,
            }}
            onPress={() => {}}>
            <Text style={[styles.addToCartStyle, {color: 'white'}]}>
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
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.1,
            marginLeft: 25,
            marginTop: 10,
            marginRight: 15,
            height: 1,
          }}
        />
        <View style={{marginLeft: 24, marginTop: 16}}>
          <Text style={styles.addToCartStyle}>{'Size & Fit'}</Text>
          <Text
            style={[
              styles.addToCartStyle,
              {fontWeight: 'normal', marginTop: -5},
            ]}>
            {'Fabric Length 3.6m'}
          </Text>
        </View>
        <View style={{marginLeft: 24, marginTop: 26}}>
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
        </View>
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
    </ScrollView>
  );
};
