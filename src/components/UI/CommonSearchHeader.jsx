import React, { useContext, useState, useEffect } from 'react';
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
  SmallLogo,
  SearchIcon
} from '../../icons/Icons';
import { theme } from '../../theme/theme';
import { ShoppingCartContext } from '../context/ShoppingCart';

const { height, width } = Dimensions.get('window');

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
    height: 40,
    width: 30,
  },
  iconViewStyles: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 46,
  },
  leftTextStyle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: theme.colors.HEADER_LEFT_TITLE_COLOR,
    marginTop: 8,
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
  searchIconStyles: {
    width: 25,
    height: 25,
    marginTop: 8,
    marginLeft: 10
  },
  searchViewStyles: {
    width: 40,
    height: 40,
    marginTop: 46,
  },
  iconBackStyles: {
    height: 11,
    width: 21,
    marginTop: 8,
    marginLeft: 2,
  },
});

export default CommonSearchHeader = ({
  leftSideText,
  onPressSearchIcon,
  isSearch,
  onPressLeftButton,
  onPressRightButton,
  isProduct,
  isTabView,
  onPressFilterIcon,
  onPressSortIcon,
  isWishList,
  onPressWishListIcon,
  isItemInWishlist,
  disableCart,
}) => {

  const renderHeader = () => {
    return (
      <View style={styles.headerStyles}>
        {!isSearch ?
          <>
            {isTabView ?
              <View style={styles.iconViewStyles}>
                <SmallLogo style={styles.iconStyles} />
                <Text style={styles.leftTextStyle}>{leftSideText}</Text>
              </View>
              :
              <TouchableOpacity
                style={[styles.iconViewStyles, { height: 40, width: 40, }]}
                activeOpacity={1}
                onPress={() => {
                  onPressLeftButton();
                }}>
                <BackIcon style={styles.iconBackStyles} />
              </TouchableOpacity>

            }
            <TouchableOpacity style={styles.searchViewStyles}
              activeOpacity={1}
              onPress={() => {
                onPressSearchIcon();
              }}>
              <SearchIcon style={styles.searchIconStyles} />
            </TouchableOpacity>
          </>
          : null}
      </View>
    );
  };

  return <View style={styles.container}>{renderHeader()}</View>;
};
