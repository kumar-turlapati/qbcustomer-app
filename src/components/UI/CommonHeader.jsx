import React, {useContext, useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackIcon,
  CartIcon,
  FilterIcon,
  SortIcon,
  WishListIcon,
  HeartSelected,
  HeartUnSelected,
} from '../../icons/Icons';
import {theme} from '../../theme/theme';
import {ShoppingCartContext} from '../context/ShoppingCart';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.WHITE,
  },
  headerTextStyles: {
    marginTop: 54,
    height: 20,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  headerStyles: {
    height: 88,
    backgroundColor: theme.colors.WHITE,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 18,
  },
  iconStyles: {
    height: 11,
    width: 21,
    marginTop: 8,
    marginLeft: 2,
  },
  iconViewStyles: {
    height: 44,
    marginTop: 49,
    flexDirection: 'row',
  },
  leftTextStyle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: theme.colors.HEADER_LEFT_TITLE_COLOR,
    marginTop: 2,
  },
  iconTouchStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  rightIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 45,
    marginRight: 5,
  },
  productIconStyles: {
    width: 30,
    marginRight: 7,
    height: 44,
    marginTop: 49,
  },
  iconWishListStyles: {
    height: 20,
    width: 20,
    marginTop: 3,
    marginLeft: 2,
  },
});

export default CommonHeader = ({
  leftSideText,
  onPressLeftButton,
  onPressRightButton,
  isProduct,
  isTabView,
  onPressFilterIcon,
  onPressSortIcon,
  isWishList,
  onPressWishListIcon,
  isItemInWishlist,
}) => {
  const {cartItems} = useContext(ShoppingCartContext);

  const renderHeader = () => {
    return (
      <View style={styles.headerStyles}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            {
              !isTabView && onPressLeftButton();
            }
          }}>
          <View style={styles.iconViewStyles}>
            {!isTabView && <BackIcon style={styles.iconStyles} />}
            <Text
              style={[
                styles.leftTextStyle,
                {
                  marginLeft: isTabView ? 0 : 4,
                },
              ]}>
              {leftSideText}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          {isProduct && (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  onPressSortIcon();
                }}>
                <View style={styles.productIconStyles}>
                  <SortIcon style={styles.iconStyles} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  onPressFilterIcon();
                }}>
                <View style={styles.productIconStyles}>
                  <FilterIcon style={styles.iconStyles} />
                </View>
              </TouchableOpacity>
            </View>
          )}

          {isWishList ? (
            isItemInWishlist ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    onPressWishListIcon();
                  }}>
                  <View style={styles.productIconStyles}>
                    <HeartSelected style={styles.iconWishListStyles} />
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    onPressWishListIcon();
                  }}>
                  <View style={styles.productIconStyles}>
                    <WishListIcon style={styles.iconWishListStyles} />
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}

          {cartItems && cartItems.length > 0 && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                onPressRightButton();
              }}>
              <View style={styles.iconViewStyles}>
                <CartIcon style={styles.iconStyles} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return <View style={styles.container}>{renderHeader()}</View>;
};
